import fs from 'node:fs/promises';
import { instantiate, __AdaptedExports } from './build/wasm.js';

async function main(): Promise<void> {
  const buffer = await fs.readFile('build/wasm.wasm');
  const module = await WebAssembly.compile(buffer);

  console.log({
    exports: WebAssembly.Module.exports(module),
    imports: WebAssembly.Module.imports(module),
  });

  const imports = {
    env: {
      abort(message: any, fileName: any, lineNumber: any, columnNumber: any) {},
    },
  };

  const exports = await instantiate(module, imports);
  const { add, set, text, memory } = exports;

  console.log();
  console.log('add:', add(10, 20));

  set(0);
  console.log('text:', text());
  set(1);
  console.log('text:', text());

  console.log();
  console.log();

  {
    const instance = exports.instance;
    const members = {
      add: instance.exports.add as typeof __AdaptedExports.add,
      set: instance.exports.set as typeof __AdaptedExports.set,
      text: instance.exports.text as () => number,
      memory: instance.exports.memory as WebAssembly.Memory,
    };

    const pointerText = members.text();
    const textDecoder = new TextDecoder('utf8');
    const bytes = new Uint8Array(members.memory.buffer, pointerText, 100);

    console.log('memory:', memory === members.memory);
    console.log('pointerText:', pointerText);
    console.log('bytes:', bytes);
    console.log('text:', textDecoder.decode(bytes));
  }
}
main();
/*
import * as exports from './build/wasm.js';

const { add, set, text, memory } = exports;

async function main(): Promise<void> {
  console.log('Hello Kerbin!');

  console.log();
  console.log('add:', add(10, 20));

  set(0);
  console.log('text:', text());
  set(1);
  console.log('text:', text());

  console.log();
  console.log();

  {
    const instance = exports.instance;
    const members = {
      add: instance.exports.add as typeof add,
      set: instance.exports.set as typeof set,
      text: instance.exports.text as () => number,
      memory: instance.exports.memory as WebAssembly.Memory,
    };

    const pointerText = members.text();
    const textDecoder = new TextDecoder('utf8');
    const bytes = new Uint8Array(members.memory.buffer, pointerText, 100);

    console.log('memory:', memory === members.memory);
    console.log('pointerText:', pointerText);
    console.log('bytes:', bytes);
    console.log('text:', textDecoder.decode(bytes));
  }
}

main();
*/
