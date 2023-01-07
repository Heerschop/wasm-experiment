import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';

const elementPrefix = document?.currentScript?.attributes.getNamedItem?.('prefix')?.value ?? 'app';

@customElement(elementPrefix + '-action-element')
export class ActionElement extends LitElement {
  render() {
    return html` <div>action-element</div> `;
  }
}
