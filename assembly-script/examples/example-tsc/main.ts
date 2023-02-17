import { add, set, text } from './build/wasm.js';
import { WASM } from './wasm-loader.js';

async function main(): Promise<void> {
  console.log('Hello Kerbin!');

  console.log();
  console.log('add:', add(10, 20));

  console.log('text:', text());
  set(1);
  console.log('text:', text());

  const imports: WebAssembly.Imports = {
    env: {
      abort(message: any, fileName: any, lineNumber: any, columnNumber: any) {},
    },
  };

  const module = await WASM.compile('build/wasm.wasm');

  console.log({
    exports: WebAssembly.Module.exports(module),
    imports: WebAssembly.Module.imports(module),
  });

  const instance = await WASM.instantiate(module, imports);
  const exports = {
    add: instance.exports.add as typeof add,
    set: instance.exports.set as typeof set,
    text: instance.exports.text as typeof text,
    memory: instance.exports.memory as WebAssembly.Memory,
  };

  exports.set(1);

  const pointerText = exports.text() as any as number;
  const textDecoder = new TextDecoder('utf8');
  const bytes = new Uint8Array(exports.memory.buffer, pointerText, 100);

  console.log('memory:', exports.memory);
  console.log('pointerText:', pointerText);
  console.log('bytes:', bytes);
  console.log('text:', textDecoder.decode(bytes));

  //new URL("wasm.wasm", import.meta.url)
}

main();
