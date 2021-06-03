import { LitElement, html, css } from "lit";
import { ScopedRegistryHost } from "@lit-labs/scoped-registry-mixin";

export class HnHeader extends ScopedRegistryHost(LitElement) {

	static get styles() {
		return css`
			:host {
				position: sticky;
				top: 0;
				display:flex;
				align-items: center;
				gap: 1rem;
				padding: 0.5rem;
				background: var(--primary-color);
				color: var(--primary-color-contrast);
			}
			img {
				flex: 0;
				height: 3.25rem;
    		width: 2.6rem;
			}
			nav {
				flex: 1 0 auto;
				display: flex;
				flex-direction: column;
				gap: 0.5rem;
			}
			h1 {
				margin: 0;
				font-size: 1.2rem;
			}
			ul {
				margin: 0;
				padding: 0;
				list-style: none;
				display: flex;
				gap: 0.5rem;
			}

			li:not(:last-child)  {
				padding-right: 0.5rem;
				border-right: 1px solid var(--primary-color-contrast);
			}

			a {
				color: var(--primary-color-contrast);
				text-decoration: none;
			}
		`;
	}

  // eslint-disable-next-line class-methods-use-this
  render() {
    return html`
		<img src="https://lit.dev/images/flame-favicon.svg" alt="Logo Lit"/>
		<nav>
			<h1>Hacker News Lit</h1>
			<ul>
				<li><a href="./">news</a></li>
				<li><a href="./ask">ask</a></li>
			</ul>
		</nav>
			`;
  }
}
