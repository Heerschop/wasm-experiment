// Opcodes
export const NOP = 0x00;
export const HLT = 0x01;
export const JMP = 0x02;
export const CJP = 0x03;
export const CAL = 0x04;
export const RET = 0x05;
export const SET = 0x06;
export const NEW = 0x07;
export const LOC = 0x08;
export const INP = 0x09;
export const SCO = 0x0a;
export const NUL = 0x0b;
export const GET = 0x0c;
export const CEQ = 0x0d;
export const CNE = 0x0e;
export const CGT = 0x0f;
export const CGE = 0x10;
export const CLT = 0x11;
export const CLE = 0x12;
export const AND = 0x13;
export const IOR = 0x14;
export const XOR = 0x15;
export const NOT = 0x16;
export const ADD = 0x17;
export const SUB = 0x18;
export const MUL = 0x19;
export const DIV = 0x1a;

// class Controller {
//   ip: i32;
//   local: Array<i32>;
//   input: Array<i32>;
//   scope: Array<i32>;
//   callStack: Array<i32>;
//   dataStack: Array<i32>;

//   constructor() {
//     this.ip = 0;
//     this.local = new Array<i32>(0);
//     this.input = new Array<i32>(0);
//     this.scope = new Array<i32>(0);
//     this.callStack = new Array<i32>(0);
//     this.dataStack = new Array<i32>(0);
//   }
// }

// type Resolver = (opcodes: Array<i32>) => Array<i32>;
// type Operation = (opcodes: Array<i32>) => void;

// function interpreter(opcodes: Array<i32>): Controller {
//   const NULL_STORAGE = new Array<i32>(0);
//   const controller = new Controller();
//   const memory = controller;

//   // const resolvers = new Array<Resolver>(0);
//   const resolvers: Array<Resolver | null> = [
//     null,
//     null,
//     null,
//     null,
//     null,
//     null,
//     null,
//     /*NEW:07*/ (opcodes) => {
//       return [];
//     },
//     /*LOC:08*/ (opcodes) => {
//       return memory.local;
//     },
//     /*INP:09*/ (opcodes) => {
//       return memory.input;
//     },
//     /*SCO:0a*/ (opcodes) => {
//       return memory.scope;
//     },
//     /*NUL:0b*/ (opcodes) => {
//       return NULL_STORAGE;
//     },
//   ];

//   const operations: Array<Operation | null> = [
//     /*NOP:00*/ (opcodes) => {},
//     /*HLT:01*/ (opcodes) => {
//       controller.ip = Number.MAX_SAFE_INTEGER;
//     },
//     /*JMP:02*/ (opcodes) => {
//       //let opcode;
//       //const address = (opcode = opcodes[controller.ip++]).constructor === Array ? resolvers[opcode[0] as Opcode]!(opcode) : opcode;
//       //controller.ip = address;
//     },
//   ];

//   while (controller.ip < opcodes.length) {
//     operations[opcodes[controller.ip++]]!(opcodes);
//   }

//   return controller;
// }


class Command {

}

class Resolver extends Command {

}

class Operation extends Command {

}

// class console {
//   static log:(s: string)=> void=consoleLog;
// }

export function example(): Int32Array {
  const opcodes: Array<Command> = [
    new Command(),
    new Resolver(),
    new Command(),
  ];

  //interpreter(opcodes);

  console.log('bbbb');

  return new Int32Array(10);
}
