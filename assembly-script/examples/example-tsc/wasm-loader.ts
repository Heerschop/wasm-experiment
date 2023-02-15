import { PathLike } from 'node:fs';

export class WASM {
  public static async compile(path: PathLike): Promise<WebAssembly.Module> {
    if (path instanceof URL) {
      return WebAssembly.compileStreaming(fetch(path as URL));
    }

    return WebAssembly.compile(await (await import('node:fs/promises')).readFile(path));
  }

  public static instantiate(
    module: WebAssembly.Module,
    imports: WebAssembly.Imports = {}
  ): Promise<WebAssembly.Instance> {
    return WebAssembly.instantiate(module, imports);
  }
}
