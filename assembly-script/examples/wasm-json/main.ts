import { add, text } from './build/wasm.js';
import { instance } from './build/wasm.js';

console.log('hi');

const result = add(2, 3);
console.log(result);

const textResult = text();
console.log(textResult);

// const aa = (instance.exports as any).text();
// console.log(aa);
console.log(instance);
