import { LitElement, html, css } from "lit";
import { Task } from "@lit-labs/task";
import { FeedsController } from "../api/index.js";
import "../hn-story/hn-story.js";

export class HnStoryList extends LitElement {
	static get styles() {
		return css`
		:host {
			display: block;
		}
		ol {
			display: flex;
			flex-direction: column;
			gap: 0.5rem;
			margin: 0;
			padding-inline-start: 2rem;
		}
		li::marker {
			color: #595959;
		}

		a {
			display: inline-block;
			color: #595959;
			text-decoration: none;
			margin-block-start: 1rem;
			margin-inline-start: 2rem;
		}
		`;
	}

	static get properties() {
		return {
			feed: {
				type: String
			},
			page: {
				type: Number
			},
			api: {
				type: Task,
				state: true
			}
		}
	}

	constructor() {
		super();
		this.feed = 'news';
		this.page = 1;
		this.api = new FeedsController(this);
	}

	update(propChanged) {
		super.update(propChanged);
		this.feed = this.feed || 'news';
		this.page = this.page || 1;
	}

	/**
	 *
	 * @returns {object} html template
	 */
	renderError() {
		return html`Error loading ${this.feed} page ${this.page}`;
	}

	/**
	 *
	 * @returns {object} html template
	 */
	renderPending() {
		return html`Loading ${this.feed} page ${this.page}...`;
	}

	/**
	 *
	 * @param {object[]} result stories
	 * @returns {object} html template
	 */
	renderComplete(result) {
		return [
			result.length ? this.renderList(result) : this.renderEmpty(),
			result.length === 30 ? this.renderLoadMore(): ''
		];
	}

	renderList(result) {
		return html`<ol start="${(this.page - 1) * 30 + 1}">
			${result.map(story => html`<li><hn-story .story="${story}"></hn-story></li>`)}
		</ol>`;
	}

	renderEmpty() {
		return "There are no rsoults";
	}

	renderLoadMore() {
		return html`<a href="/${this.feed}/${this.page+1}/">Load more</a>`;
	}

	render() {
		return this.api.render({
			error: () => this.renderError(),
			pending: () => this.renderPending(),
			complete: result => this.renderComplete(result)
		});
	}
}
