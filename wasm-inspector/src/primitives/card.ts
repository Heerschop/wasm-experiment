import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators';

const elementPrefix = document?.currentScript?.attributes.getNamedItem?.('prefix')?.value ?? 'app';

@customElement(elementPrefix + '-card')
export class CardElement extends LitElement {
  @property() header = '';

  static styles = css`
    :host {
      display: flex;
    }

    div {
      display: flex;
      box-sizing: border-box;
      flex-direction: column;
      background: var(--prim-dark);
      border-radius: var(--S2);
      margin: var(--S7);
      padding: var(--S9);
      min-width: 40rem;
      box-shadow: 0 0 20px rgba(0, 0, 0, 0.4);
      gap: var(--S5);
    }

    .header::slotted(h1) {
      color: var(--prim-text);
      text-align: center;
      font-weight: 200;
      margin-top: 0px;
      margin-bottom: var(--S7);
    }
  `;

  render() {
    return html`
      <div>
        <slot class="header" name="header"></slot>
        <slot></slot>
      </div>
    `;
  }
}
