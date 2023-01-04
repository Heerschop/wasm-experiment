import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('result-element')
export class ResultElement extends LitElement {
  render() {
    return html`<div>result-element</div>`;
  }
}
