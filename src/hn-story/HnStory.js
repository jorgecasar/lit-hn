import { LitElement, html, css, nothing } from "lit";

export class HnStory extends LitElement {
  static get properties() {
    return {
      story: {
        type: Object,
      },
    };
  }

	static get styles() {
		return css`
		:host {
			display: flex;
			flex-direction: column;
			gap: 0.2rem;
		}

		h2, p {
			margin: 0;
		}

		h2 {
			font-size: 1rem;
			font-weight: 400;
		}
		p, span, a {
			color: #828282;
			font-size: 0.8rem;
		}

		a {
			text-decoration: none;
		}
		`;
	}

  constructor() {
    super();

    /** @type {object|undefined} */
    this.story = {};
  }

  render() {
    const { title, url, user, time_ago, points, domain } = this.story;
    return html`
      <h2>
        ${title}${domain
          ? html`<span> (<a href="${url}">${domain}</a>)</span>`
          : nothing}
      </h2>
      <p>${points} by ${user} ${time_ago}</p>
    `;
  }
}
