import { LitElement, html, css } from "lit";
import { ScopedRegistryHost } from "@lit-labs/scoped-registry-mixin";
import { Task } from "@lit-labs/task";
import { fetchFeeds } from "../api/index.js";
import { HnStory } from "../hn-story/HnStory.js";

export class HnStoryList extends ScopedRegistryHost(LitElement) {
	static get elementDefinitions() {
		return {
			"hn-story": HnStory,
		};
	}

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
			color: #828282;
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
		this.feed = "news";
		this.page = 1;
	}

	connectedCallback() {
		super.connectedCallback();
		const { feed, page } = this;
		this.api = fetchFeeds(this, { feed, page });
	}

	/**
	*
	* @returns {object} html template
	*/
	renderError() {
		return html`Error`;
	}

	/**
	*
	* @returns {object} html template
	*/
	renderPending() {
		return html`Loading...`;
	}

	/**
	*
	* @param {object[]} result stories
	* @returns {object} html template
	*/
	renderComplete(result) {
		return html`<ol start="${(this.page - 1) * 30 + 1}">
		${result.map(story => html`<li><hn-story .story="${story}"></hn-story></li>`)}
		</ol>`
	}

	render() {
		return this.api.render({
			error: () => this.renderError(),
			pending: () => this.renderPending(),
			complete: result => this.renderComplete(result)
		});
	}
}
