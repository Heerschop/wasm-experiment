# WASM Experiments

### [AssemblyScript](https://www.assemblyscript.org/getting-started.html)

```bash
cd assembly-script
npm run asbuild
npm start
```

### [Emscripten C/C++](https://developer.mozilla.org/en-US/docs/WebAssembly/C_to_wasm)
```bash
cd emscripten-c
source ./emsdk/emsdk_env.sh

emcc hello.c -o hello.html
npx serve .
```

### Resources

- [Mozilla WebAssembly](https://developer.mozilla.org/en-US/docs/WebAssembly)
- [WebAssembly](https://webassembly.org/)
