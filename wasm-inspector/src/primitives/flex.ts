import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators';

const elementPrefix = document?.currentScript?.attributes.getNamedItem?.('prefix')?.value ?? 'app';

@customElement(elementPrefix + '-flex')
export class FlexElement extends LitElement {
  @property({ type: String })
  direction?: 'row' | 'column';

  @property({ type: Number })
  gap?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13;

  @property({ type: String })
  align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';

  @property({ type: String })
  justify?: 'start' | 'center' | 'end' | 'between' | 'evenly';

  @property({ type: String })
  wrap?: 'wrap' | 'nowrap' | 'reverse';

  private static alignItems = {
    start: 'flex-start',
    center: 'center',
    end: 'flex-end',
    stretch: 'stretch',
    baseline: 'baseline',
  };

  private static justifyContent = {
    start: 'flex-start',
    center: 'center',
    end: 'flex-end',
    between: 'space-between',
    evenly: 'space-evenly',
  };

  private static flexWrap = {
    wrap: 'wrap',
    nowrap: 'nowrap',
    reverse: 'wrap-reverse',
  };

  render() {
    return html`
      <style>
        :host {
          display: flex;
          gap: ${this.gap !== undefined ? `var(--S${this.gap})` : undefined};
          flex-direction: ${this.direction};
          align-items: ${FlexElement.alignItems[this.align!]};
          justify-content: ${FlexElement.justifyContent[this.justify!]};
          flex-wrap: ${FlexElement.flexWrap[this.wrap!]};
        }
      </style>
      <slot></slot>
    `;
  }
}
