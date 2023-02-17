export function add(a: i32, b: i32): i32 {
  return a + b;
}

const values: string[] = ['Hello WASM!', 'Hello Kerbin!'];
let selected = 0;

export function set(index: i32): void {
  selected = index;
}

export function text(): string {
  return values[selected];
}
