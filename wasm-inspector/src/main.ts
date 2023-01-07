async function loadWasmModule(url: string): Promise<WebAssembly.Module> {
  const response = await fetch(url);
  const buffer = await response.arrayBuffer();

  return WebAssembly.compile(buffer);
}

async function onLoadModuleClick(url: string): Promise<{}> {
  try {
    console.log('Loading module:', url);

    const module = await loadWasmModule(url);

    return {
      exports: WebAssembly.Module.exports(module),
      imports: WebAssembly.Module.imports(module),
    };
  } catch (error) {
    return {
      error: error,
    };
  }
}

async function onInstantiateClick(url: string): Promise<{}> {
  try {
    console.log('Loading module:', url);

    const module = await loadWasmModule(url);
    const instance = await WebAssembly.instantiate(module);

    if (instance.exports.add) {
      const result = (instance.exports.add as CallableFunction)(10, 20);

      console.log('result:', result);
    }

    if (instance.exports.mul) {
      const result = (instance.exports.mul as CallableFunction)(10, 20);

      console.log('result:', result);
    }

    return {
      module: {
        exports: WebAssembly.Module.exports(module),
        imports: WebAssembly.Module.imports(module),
      },
      instance: {
        exports: instance.exports,
      },
    };
  } catch (error: any) {
    console.log(error);
    return {
      error: `${error}`,
    };
  }
}
async function onUploadWasmClick(url: string): Promise<{}> {
  return {};
}

export async function onClickSubmit(event: SubmitEvent) {
  const actionLookup: { [name: string]: ((file: string) => Promise<{}>) | undefined } = {
    'load-module': onLoadModuleClick,
    instantiate: onInstantiateClick,
    'upload-wasm': onUploadWasmClick,
  };

  if (event.submitter?.id && event.target) {
    const handler = actionLookup[event.submitter.id];
    const elements: HTMLInputElement[] = Object.values(event.target);

    if (handler !== undefined) {
      const resultElement = elements.find((item) => item.id === 'result-text');

      const values = elements
        .filter((element) => element.checked)
        .map((element) => ({
          value: element.value,
        }));

      if (values.length > 0 && resultElement) {
        const result = await handler('examples/' + values[0].value);

        resultElement.value = JSON.stringify(result, null, 2);
      }
    }
  }

  return false;
}
