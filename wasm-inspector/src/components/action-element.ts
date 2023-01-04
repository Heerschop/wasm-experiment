import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('action-element')
export class ActionElement extends LitElement {
  render() {
    return html` <div>action-element</div> `;
  }
}
