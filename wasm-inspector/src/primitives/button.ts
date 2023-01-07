import { LitElement, html, css } from 'lit';
import { customElement, property, query } from 'lit/decorators';

@customElement('app-button')
export class ButtonElement extends LitElement {
  @property({ type: Boolean })
  disabled: boolean = false;

  static formAssociated = true;
  static styles = css`
    /* :host {
      display: flex;
      flex-direction: column;
    } */
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
      width: 100%;
    }

    button:hover {
      background: var(--secondary);
    }
    button:disabled {
      background: var(--prim-light);
    }
  `;

  private internals: ElementInternals;
  private proxyButton?: HTMLElement;

  constructor() {
    super();
    this.internals = this.attachInternals();
  }

  firstUpdated() {
    if (this.internals.form && this.shadowRoot) {
      const element = this.shadowRoot.querySelector<HTMLButtonElement>('#submit-button');

      if (element) {
        // https://github.com/WICG/webcomponents/issues/814
        this.proxyButton = element.cloneNode() as HTMLElement;
        this.proxyButton.hidden = true;
        this.proxyButton.id = this.id;
      }
    }
  }

  onButtonClick(event: Event) {
    if (this.proxyButton && this.internals.form) {
      this.internals.form.append(this.proxyButton);
      this.internals.form.requestSubmit(this.proxyButton);
      this.proxyButton.remove();
    }
  }
  render() {
    return html`
      <button .disabled=${this.disabled} type="submit" id="submit-button" @click="${this.onButtonClick}">
        <slot>button</slot>
      </button>
    `;
  }
}
