import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';

const elementPrefix = document?.currentScript?.attributes.getNamedItem?.('prefix')?.value ?? 'app';

@customElement(elementPrefix + '-result-element')
export class ResultElement extends LitElement {
  render() {
    return html`<div>result-element</div>`;
  }
}
