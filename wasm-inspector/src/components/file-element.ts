import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';

const elementPrefix = document?.currentScript?.attributes.getNamedItem?.('prefix')?.value ?? 'app';

@customElement(elementPrefix + '-file-element')
export class FileElement extends LitElement {
  render() {
    return html` <div>file-element</div> `;
  }
}
