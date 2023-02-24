const colors = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  orange: '\x1b[38;2;255;165;0m',
  blue: '\x1b[94m',
  cyan: '\x1b[36m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  normal: '\x1b[0m',
};

function dumpLine(bytes: ArrayLike<number>, start: number, end: number, textDecoder: TextDecoder, columnCount: number, columnWidth: number): number {
  const length = columnWidth * columnCount;
  let data = '';
  let text = '';

  const address = Math.floor(start / length) * length;

  for (let index = 0; index < length; index++) {
    const offset = address + index;
    const byte = offset >= start && offset < end ? bytes[offset] : undefined;

    if (index % columnWidth === 0) {
      data += '   ';
      text += '  ';
    }
    if (byte !== undefined) {
      const value = textDecoder.decode(Uint8Array.of(byte), { stream: true });
      text += value.replace(/[\u0000-\u001F\u007F-\u009F\�]/g, '.')[0] ?? '.';

      data += byte.toString(16).padStart(2, '0') + ' ';
    } else {
      text += ' ';
      data += '   ';
    }
  }

  console.log(
    `${colors.bold + address.toString(16).padStart(8, '0') + colors.normal} ` +
      `${colors.dim + data + colors.normal}   ` +
      `${colors.bold + '|' + text + '  |' + colors.normal}`,
  );

  return address + length;
}

export function hexDump(bytes: ArrayLike<number>): void;
export function hexDump(bytes: ArrayLike<number>, decoder: string): void;
export function hexDump(bytes: ArrayLike<number>, offset: number): void;
export function hexDump(bytes: ArrayLike<number>, offset: number, length: number): void;
export function hexDump(bytes: ArrayLike<number>, offset: number, decoder: string): void;
export function hexDump(bytes: ArrayLike<number>, offset: number, length: number, decoder: string): void;
export function hexDump(bytes: ArrayLike<number>, decoder: string, columnCount: number): void;
export function hexDump(bytes: ArrayLike<number>, decoder: string, columnCount: number, columnWidth: number): void;
export function hexDump(bytes: ArrayLike<number>, offset: number, decoder: string, columnCount: number): void;
export function hexDump(bytes: ArrayLike<number>, offset: number, decoder: string, columnCount: number, columnWidth: number): void;
export function hexDump(bytes: ArrayLike<number>, offset: number, length: number, decoder: string, columnCount: number): void;
export function hexDump(bytes: ArrayLike<number>, offset: number, length: number, decoder: string, columnCount: number, columnWidth: number): void;
export function hexDump(
  bytes: ArrayLike<number>,
  arg1: string | number = 'ascii',
  arg2: string | number = 'ascii',
  arg3: string | number = 'ascii',
  arg4?: number,
  arg5?: number,
): void {
  let offset = 0;
  let length = bytes.length;
  let decoder = 'ascii';
  let columnWidth = 8;
  let columnCount = 4;

  if (typeof arg1 === 'string') {
    decoder = arg1;
    if (typeof arg2 === 'number') columnCount = arg2;
    if (typeof arg3 === 'number') columnWidth = arg3;
  } else if (typeof arg2 === 'string') {
    decoder = arg2;
    if (typeof arg1 === 'number') offset = arg1;
    if (typeof arg3 === 'number') columnCount = arg3;
    if (typeof arg4 === 'number') columnWidth = arg4;
  } else if (typeof arg3 === 'string') {
    decoder = arg3;
    if (typeof arg1 === 'number') offset = arg1;
    if (typeof arg2 === 'number') length = arg2;
    if (typeof arg4 === 'number') columnCount = arg4;
    if (typeof arg5 === 'number') columnWidth = arg5;
  } else {
    if (typeof arg1 === 'number') offset = arg1;
    if (typeof arg2 === 'number') length = arg2;
  }

  const end = length === undefined ? bytes.length : offset + length;
  const textDecoder = new TextDecoder(decoder, { ignoreBOM: false, fatal: false });

  while (offset < end) {
    offset = dumpLine(bytes, offset, end, textDecoder, columnCount, columnWidth);
  }
}
