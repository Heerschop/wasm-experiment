async function loadWasmModule(url: string): Promise<WebAssembly.Module> {
  const response = await fetch(url);
  const buffer = await response.arrayBuffer();

  return WebAssembly.compile(buffer);
}

async function onLoadModuleClick(url: string): Promise<{}> {
  console.log('Loading module:', url);

  const module = await loadWasmModule(url);

  return {
    exports: WebAssembly.Module.exports(module),
    imports: WebAssembly.Module.imports(module)
  };
}

async function onInstantiateClick(url: string): Promise<{}> {
  return {};
}
async function onUploadWasmClick(url: string): Promise<{}> {
  return {};
}

async function onClickSubmit(event: SubmitEvent) {
  const actionLookup: { [name: string]: ((file: string) => Promise<{}>) | undefined } = {
    'load-module': onLoadModuleClick,
    'instantiate': onInstantiateClick,
    'upload-wasm': onUploadWasmClick
  };

  if (event.submitter?.id && event.target) {
    const handler = actionLookup[event.submitter.id];
    const elements: HTMLInputElement[] = Object.values(event.target);

    if (handler !== undefined) {
      const resultElement = elements.find(item => item.id === 'result-text');

      console.log('resultElement:', resultElement);

      const values = elements
        .filter(element => element.checked)
        .map(element => ({
          value: element.value
        }));

      if (values.length > 0 && resultElement) {
        const result = await handler('examples/' + values[0].value);

        resultElement.value = JSON.stringify(result, null, 2);
      }
    }
  }

  return false;
}