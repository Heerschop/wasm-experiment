async function onClickAssemblyScript() {
  console.log('onClickAssemblyScript');

  const module = await loadWasmModule('examples/assembly-script.wasm');

  console.log(module);
}

async function onClickEmscripten() {
  console.log('onClickEmscripten');

  const module = await loadWasmModule('examples/emscripten-c.wasm');

  console.log(module);
}

async function onClickDotnet() {
  console.log('onClickDotnet');

  const module = await loadWasmModule('examples/dotnet.wasm');

  console.log(module);
}

async function loadWasmModule(url: string) {
  const response = await fetch(url);
  const buffer = await response.arrayBuffer();

  return WebAssembly.compile(buffer);
}
