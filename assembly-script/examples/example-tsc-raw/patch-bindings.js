import fs from 'node:fs/promises';
import path from 'path';

//fs.readFileSync()
const colors = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[94m',
  cyan: '\x1b[36m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  normal: '\x1b[0m',
};

async function patchBindings(handle) {
  const buffer = await handle.readFile();
  const text = buffer.toLocaleString();
  let patched = text.replace(
    /(\s*)const\s*\{\s*(\w+)\s*\}(\s*=\s*await\s+WebAssembly\.instantiate\s*\(\s*module\s*,\s*adaptedImports\s*\)\s*;)/g,
    '$1const instance$3$1const { $2 } = instance;'
  );

  patched = patched.replace(/(\s*)return\s+(adaptedExports)\s*;/g, '$1return { exports: $2, instance: instance };');

  if (text !== patched) {
    handle.write(patched, 0);

    return true;
  }

  return false;
}

async function patchTypeings(handle) {
  const buffer = await handle.readFile();
  const text = buffer.toLocaleString();
  let patched = text.replace(/: Promise<(typeof \w+)>;/g, ': Promise<{ exports: $1; instance: Instance }>;');

  if (text !== patched) {
    handle.write(patched, 0);

    return true;
  }

  return false;
}

async function patchFile(fileName) {
  const parsed = path.parse(fileName);
  const bindings = path.join(parsed.dir, parsed.name + parsed.ext);
  const typeings = path.join(parsed.dir, parsed.name + '.d.ts');
  const statusPatched = colors.bold + colors.yellow + 'patched' + colors.normal;
  const statusDesired = colors.bold + colors.green + 'desired' + colors.normal;
  const statusError = colors.bold + colors.red + ' error ' + colors.normal;

  try {
    process.stdout.write('\r' + bindings.padEnd(40));
    const bindingsHandle = await fs.open(bindings, 'r+');
    process.stdout.write('\r' + typeings.padEnd(40));
    const typeingsHandle = await fs.open(typeings, 'r+');

    process.stdout.write('\r' + bindings.padEnd(40));
    if (await patchBindings(bindingsHandle)) {
      process.stdout.write(`[ ${statusPatched} ]\n`);
    } else {
      process.stdout.write(`[ ${statusDesired} ]\n`);
    }

    process.stdout.write('\r' + typeings.padEnd(40));
    if (await patchTypeings(typeingsHandle)) {
      process.stdout.write(`[ ${statusPatched} ]\n`);
    } else {
      process.stdout.write(`[ ${statusDesired} ]\n`);
    }
    bindingsHandle.close();
    typeingsHandle.close();
  } catch (error) {
    process.stdout.write(`[ ${statusError} ] ${colors.dim + (error.message || error) + colors.normal}\n`);
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
