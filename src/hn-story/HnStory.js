import { LitElement, html } from "lit";

export class HnStory extends LitElement {
  static get properties() {
    return {
      story: {
        type: Object,
      },
    };
  }

  constructor() {
    super();

    /** @type {Object|undefined} */
    this.story = {};
  }

  render() {
    return html` <div>id: ${this.story.id}</div> `;
  }
}
