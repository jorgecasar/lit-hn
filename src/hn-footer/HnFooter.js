import { LitElement, html, css } from "lit";
import navStyles from '../styles/nav.js';

export class HnFooter extends LitElement {

	static get styles() {
		return [navStyles,
		css`
		:host {
			display: block;
			background: var(--primary-color-base);
			color: var(--primary-color-contrast);
			padding: 0.5rem;
			box-shadow: 0 -2px 4px rgb(0 0 0 / 50%);
		}
		p {
			margin: 0;
		}
		nav{
			align-items: center;
		}
		ul {
			justify-content: center;
		}
		`];
	}

  // eslint-disable-next-line class-methods-use-this
  render() {
    return html`<nav>
			<p>Made with 🔥 by Jorge del Casar</p>
			<ul>
				<li><a href="https://github.com/jorgecasar/lit-hn">Github</a></li>
				<li><a href="http://lit.dev/">Lit.dev</a></li>
			</ul>
		</nav>`;
  }
}
