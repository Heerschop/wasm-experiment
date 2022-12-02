# WASM Experiments

### [AssemblyScript](https://www.assemblyscript.org/getting-started.html)

```bash
cd assembly-script
npm install
npm run asbuild
npm start
```

### [Emscripten C/C++](https://developer.mozilla.org/en-US/docs/WebAssembly/C_to_wasm)

- Make sure the `emsdk` is located in the `emscripten-c\emsdk` directory. [Download and install Emscripten](https://emscripten.org/docs/getting_started/downloads.html)

```bash
cd emscripten-c
source ./emsdk/emsdk_env.sh

emcc hello.c -o hello.html
npx serve .
```

### [Run .NET from JavaScript](https://learn.microsoft.com/en-us/aspnet/core/client-side/dotnet-interop?view=aspnetcore-7.0)

- Make sure the `.NET 7.0 SDK` is located in the `dotnet\dotnet-sdk` directory. [Install the latest version of the .NET SDK.](https://dotnet.microsoft.com/en-us/download/dotnet)
- [**BLOG:** Use .NET from any JavaScript app in .NET 7](https://devblogs.microsoft.com/dotnet/use-net-7-from-any-javascript-app-in-net-7/)

```bash
export PATH=$(pwd)/dotnet/dotnet-sdk:$PATH
code .
cd dotnet

dotnet workload install wasm-tools
dotnet workload install wasm-experimental

dotnet run -c Debug/Release
```

### [Compiling from Rust to WebAssembly](https://developer.mozilla.org/en-US/docs/WebAssembly/Rust_to_wasm)

* [Install Rust](https://www.rust-lang.org/tools/install)

```bash
cd rust

```

### Examples UI

```bash
cd examples-ui
npm install
npm start serve
```

### Resources

- [Mozilla WebAssembly](https://developer.mozilla.org/en-US/docs/WebAssembly)
- [WebAssembly](https://webassembly.org/)
