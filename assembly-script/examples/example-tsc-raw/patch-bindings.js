import fs from 'node:fs/promises';
import path from 'path';

//fs.readFileSync()
const colors = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  orange: '\x1b[38;2;255;165;0m',
  blue: '\x1b[94m',
  cyan: '\x1b[36m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  normal: '\x1b[0m',
};

const PATCHED = 0;
const DESIRED = 1;
const SKIPPED = 2;
const ERROR = 3;

async function patchBindings(handle) {
  const buffer = await handle.readFile();
  const text = buffer.toLocaleString();

  if (text.includes('const instance')) return DESIRED;

  let patched = text.replace(
    /(\s*)const\s*\{\s*(\w+)\s*\}(\s*=\s*await\s+WebAssembly\.instantiate\s*\(\s*module\s*,\s*adaptedImports\s*\)\s*;)/g,
    '$1const instance$3$1const $2 = Object.setPrototypeOf({instance: instance}, instance.exports);'
  );

  patched = patched.replace(
    /(\n} = await \(async url => instantiate\()/g,
    ',\n  instance$1'
  );

  if (text !== patched) {
    handle.write(patched, 0);

    return PATCHED;
  }

  return SKIPPED;
}

async function patchTypeings(handle) {
  const buffer = await handle.readFile();
  const text = buffer.toLocaleString();

  if (text.includes('const instance: WebAssembly.Instance;')) return DESIRED;

  let patched = text.replace(
    /(declare namespace __AdaptedExports {)/g,
    '$1\n  /** Exported instance */\n  export const instance: WebAssembly.Instance;'
  );

  if (text === patched) {
    patched = text.replace(
      /(export declare const memory: WebAssembly\.Memory;)/g,
      '$1\n/** Exported instance */\nexport declare const instance: WebAssembly.Instance;\n'
    );
  }

  if (text !== patched) {
    handle.write(patched, 0);

    return PATCHED;
  }

  return SKIPPED;
}

async function patchFile(fileName) {
  const parsed = path.parse(fileName);
  const bindings = path.join(parsed.dir, parsed.name + parsed.ext);
  const typeings = path.join(parsed.dir, parsed.name + '.d.ts');
  const status = {
    [PATCHED]: `[ ${colors.bold + colors.yellow + 'patched' + colors.normal} ]`,
    [DESIRED]: `[ ${colors.bold + colors.green + 'desired' + colors.normal} ]`,
    [SKIPPED]: `[ ${colors.bold + colors.orange + 'skipped' + colors.normal} ]`,
    [ERROR]: `[ ${colors.bold + colors.red + ' error ' + colors.normal} ]`,
  };

  try {
    process.stdout.write('\r' + bindings.padEnd(40));
    const bindingsHandle = await fs.open(bindings, 'r+');
    process.stdout.write('\r' + typeings.padEnd(40));
    const typeingsHandle = await fs.open(typeings, 'r+');

    process.stdout.write('\r' + bindings.padEnd(40));
    process.stdout.write(status[await patchBindings(bindingsHandle)] + '\n');

    process.stdout.write('\r' + typeings.padEnd(40));
    process.stdout.write(status[await patchTypeings(typeingsHandle)] + '\n');

    bindingsHandle.close();
    typeingsHandle.close();
  } catch (error) {
    process.stdout.write(status[ERROR] + ` ${colors.dim + (error.message || error) + colors.normal}\n`);
  }
}

async function main(argv) {
  if (argv.length <= 2) {
    console.log('Usage:');
    console.log('    node patch-bindings.js ./build/*.js');

    return;
  }

  for (let index = 2; index < argv.length; index++) {
    await patchFile(argv[index]);
  }
}

main(process.argv);
