/*
import fs from 'fs';
import { main } from './build/interpreter.js';

async function mainTest() {
  //const buffer = fs.readFileSync('./build/debug.wasm');
  const buffer = fs.readFileSync('./build/interpreter.wasm');

  const imports = {
    env: {
      abort: (a, b, c, d) => {
        console.log(a, b, c, d);
      },
      'console.log': console.log,
      memory: [1, 2, 3, 4],
    },
  };

  //const wasm = await WebAssembly.instantiate(new Uint8Array(buffer), sp);
  const module = await WebAssembly.compile(new Uint8Array(buffer), imports);

  console.log({
    exports: WebAssembly.Module.exports(module),
    imports: WebAssembly.Module.imports(module),
  });

  const instance = await WebAssembly.instantiate(module, imports);

  if (instance.exports.main) {
    const result = instance.exports.main();
    const { __getArray } = instance.exports;

    const yy = main();

    console.log('result:', result);
    console.log('result:', yy);
    console.log('export:', instance.exports.memory.buffer);
  }
}

// npx asc assembly/interpreter.ts --target interpreter
// node test.js

mainTest();
*/