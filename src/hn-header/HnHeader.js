import { LitElement, html, css } from "lit";
import navStyles from '../styles/nav.js';
import { Router } from "../router/index.js";

export class HnHeader extends LitElement {

	static get styles() {
		return [
			navStyles,
			css`
			:host {
				position: sticky;
				top: 0;
				display:flex;
				align-items: center;
				gap: 1rem;
				padding: 0.5rem;
				background: var(--primary-color-base);
				color: var(--primary-color-contrast);
				box-shadow: 0 2px 4px rgb(0 0 0 / 50%);
				height: 3rem;
			}
			img {
				flex: 0;
				height: 100%;
			}
			h1 {
				margin: 0;
				font-size: 1.2rem;
			}
			@media screen and (min-width: 1024px) {
				:host {
					height: 1.5rem;
				}
			}
		`];
	}

	constructor() {
		super();
		this.router = new Router(this, [
				{
					path: "/:feed?",
					render: params => html`<ul>
						<li>
							${!params.feed || params.feed === 'news' ? html`<span>news</span>` : html`<a href="/">news</a>`}
						</li>
						<li>${params.feed === 'ask' ? html`<span>ask</span>` : html`<a href="/ask">ask</a>`}</li>
					</ul>`
				},
		]);
	}

  // eslint-disable-next-line class-methods-use-this
  render() {
    return html`
		<img src="https://lit.dev/images/flame-favicon.svg" alt="Logo Lit"/>
		<nav>
			<h1>Hacker News Lit</h1>
			${this.router.render()}
		</nav>
			`;
  }
}
