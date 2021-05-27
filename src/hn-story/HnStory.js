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

    /** @type {object|undefined} */
    this.story = {};
  }

  render() {
		const { title, url, user, time_ago, points, domain} = this.story;
    return html`
			<h2>${title} <span>(<a href="${url}">${domain}</a>)</span></h2>
			<p>${points} by ${user} ${time_ago}</p>
		`;
  }
}
