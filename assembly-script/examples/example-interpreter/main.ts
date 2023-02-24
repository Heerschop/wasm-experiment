import { example } from './build/interpreter.js';
import { hexDump } from '../debugging.js';



async function main(): Promise<void> {
  console.log('Hello Kerbin!');

  example();
}

main();
