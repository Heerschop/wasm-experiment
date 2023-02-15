import { add } from './build/wasm';

async function main(): Promise<void> {
  console.log('Hello Kerbin!');

  console.log();
  console.log('add:', add(10, 20));
}

main();
