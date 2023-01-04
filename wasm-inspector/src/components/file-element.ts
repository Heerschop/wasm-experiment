import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('file-element')
export class FileElement extends LitElement {
  render() {
    return html` <div>file-element</div> `;
  }
}
