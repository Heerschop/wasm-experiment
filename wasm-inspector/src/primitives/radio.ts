import { LitElement, html, css } from 'lit';
import { customElement, property, query } from 'lit/decorators';

declare global {
  interface HTMLInputElement {
    checkedChange?: (value: boolean) => void;
  }
}

@customElement('app-radio')
export class RadioElement extends LitElement {
  @property({ type: Boolean })
  checked: boolean = false;

  @property({ type: Boolean })
  disabled: boolean = false;

  @property({ type: String })
  public name: string = '';

  @property({ type: String })
  public value: string = '';

  static formAssociated = true;

  static styles = css`
    .checkmark {
      height: 25px;
      width: 25px;
      background-color: #eee;
      border-radius: 50%;
    }

    .radio-button {
      display: block;
      position: relative;
      padding-left: 35px;
      margin-bottom: 12px;
      cursor: pointer;
      font-size: 22px;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      color: var(--sec-light);
    }

    .radio-button input {
      position: absolute;
      opacity: 0;
      cursor: pointer;
    }

    .checkmark {
      position: absolute;
      top: 0;
      left: 0;
      height: 25px;
      width: 25px;
      background-color: var(--prim-text);
      border-radius: 50%;
    }

    .radio-button:hover input ~ .checkmark {
      background-color: #ccc;
    }

    .radio-button input:checked ~ .checkmark {
      background-color: var(--sec-light);
    }

    .checkmark:after {
      content: '';
      position: absolute;
      display: none;
    }

    .radio-button input:checked ~ .checkmark:after {
      display: block;
    }
    .radio-button input:disabled ~ .checkmark {
      background: var(--prim-light);
    }

    .radio-button .checkmark:after {
      top: 9px;
      left: 9px;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: var(--prim-text);
    }
  `;

  private internals: ElementInternals;
  private proxyInput?: HTMLInputElement;

  constructor() {
    super();
    this.internals = this.attachInternals();
  }

  firstUpdated() {
    if (this.internals && this.shadowRoot) {
      const element = this.shadowRoot.querySelector<HTMLInputElement>('#input-element');

      if (element && this.internals.form) {
        this.proxyInput = element.cloneNode() as HTMLInputElement;
        this.proxyInput.style.position = 'absolute';
        this.proxyInput.style.opacity = '0';

        this.proxyInput.checkedChange = (value: boolean) => (this.checked = value);

        this.proxyInput.onchange = (event) => {
          const elements = document.querySelectorAll<HTMLInputElement>('input[type="radio"]');

          for (let index = 0; index < elements.length; index++) {
            const element = elements[index];

            element.checkedChange?.(element.checked);
          }
        };

        this.internals.form.append(this.proxyInput);
      }
    }
  }
  onChange(event: Event) {
    const checked = event.target instanceof HTMLInputElement && event.target.checked;

    if (this.checked !== checked && this.proxyInput) {
      this.proxyInput.checked = checked;
      this.proxyInput.onchange?.(event);
    }
  }
  render() {
    return html`
      <label class="radio-button">
        <slot>radio</slot>
        <input
          id="input-element"
          type="radio"
          .name=${this.name}
          .value=${this.value}
          .checked=${this.checked}
          @change=${this.onChange}
          .disabled=${this.disabled}
        />
        <span class="checkmark"></span>
      </label>
    `;
  }
}
