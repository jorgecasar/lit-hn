import { LitElement, html } from "lit";

export class HnStory extends LitElement {
  static get properties() {
    return {
      key: {
        type: String,
      },
    };
  }

  constructor() {
    super();

    /** @type {string|undefined} */
    this.key = undefined;
  }

  render() {
    return html` <div>Key: ${this.key}</div> `;
  }
}
