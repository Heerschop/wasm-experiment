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

### [Run .NET from JavaScript](https://learn.microsoft.com/en-us/aspnet/core/client-side/dotnet-interop?view=aspnetcore-7.0)

- [**BLOG:** Use .NET from any JavaScript app in .NET 7](https://devblogs.microsoft.com/dotnet/use-net-7-from-any-javascript-app-in-net-7/)

```bash
export PATH=$(pwd)/dotnet/dotnet-sdk:$PATH
code .
cd dotnet

dotnet workload install wasm-tools
dotnet workload install wasm-experimental

dotnet run -c Debug/Release
```

### Resources

- [Mozilla WebAssembly](https://developer.mozilla.org/en-US/docs/WebAssembly)
- [WebAssembly](https://webassembly.org/)
