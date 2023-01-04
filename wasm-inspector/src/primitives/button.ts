import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators';

@customElement('app-button')
export class ButtonElement extends LitElement {

  static styles = css`
    button {
      display: block;
      background: var(--sec-light);
      color: var(--primary);
      font-weight: 600;
      padding: 15px 20px;
      border-radius: 5px;
      box-shadow: rgba(0, 0, 0, 0.9);
      transition: all 200ms ease-in-out;
      text-decoration: none;
      border: none;
      font-size: var(--S6);
      cursor: pointer;
    }

    button:hover {
      background: var(--secondary);
    }
    button:disabled {
      background: var(--prim-light);
    }
  `;

  render() {
    return html` <button>Hello from button.ts</button> `;
  }
}
