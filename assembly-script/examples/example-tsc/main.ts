import { add, text } from './build/wasm.js';

async function main(): Promise<void> {
  console.log('Hello Kerbin!');

  console.log();
  console.log('add:', add(10, 20));
  console.log('text:', text());
}

main();
