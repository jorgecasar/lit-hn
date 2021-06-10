import { LitElement, html, css } from "lit";
import { Router } from "./router/index.js";
import { routes } from "./routes.js";
import "./hn-footer/hn-footer.js";
import "./hn-header/hn-header.js";

export class LitHn extends LitElement {

	static get styles() {
		return css`
		:host {
			--primary-color-base: #325cff;
			--primary-color-contrast: #fff;
			--surface-0-color-base: #fff;
			--surface-0-color-contrast: #333;
			overflow: hidden;
			height: 100%;
			display: flex;
			flex-direction: column;
			background: var(--surface-0-color-base);
			color: var(--surface-0-color-contrast);
		}
		main {
			padding: 1rem 0.5rem;
			overflow-y: auto;
			flex: 1;
		}
		`;
	}

  constructor() {
    super();
    this.router = new Router(this, routes);
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    return html`
      <hn-header></hn-header>
      <main>${this.router.render()}</main>
      <hn-footer></hn-footer>
    `;
  }
}
