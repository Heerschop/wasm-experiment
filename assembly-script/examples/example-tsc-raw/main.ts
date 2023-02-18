import { PathLike } from 'node:fs';
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

  const { exports, instance } = await instantiate(module, imports);
  {
    exports.set(0);
    console.log('text:', exports.text());
    exports.set(1);
    console.log('text:', exports.text());
  }

  console.log();
  console.log();

  {
    //const instance = await WebAssembly.instantiate(module, imports);
    const exports = {
      add: instance.exports.add as typeof __AdaptedExports.add,
      set: instance.exports.set as typeof __AdaptedExports.set,
      text: instance.exports.text as () => number,
      memory: instance.exports.memory as WebAssembly.Memory,
    };
    //exports.set(1);

    const pointerText = exports.text() as any as number;
    const textDecoder = new TextDecoder('utf8');
    const bytes = new Uint8Array(exports.memory.buffer, pointerText, 100);

    console.log('pointerText:', pointerText);
    console.log('bytes:', bytes);
    console.log('text:', textDecoder.decode(bytes));
  }
}
main();
