import { ScopedRegistryHost } from "@lit-labs/scoped-registry-mixin";
import { LitElement, html, css } from "lit";
import { HnFooter } from "./hn-footer/HnFooter.js";
import { HnHeader } from "./hn-header/HnHeader.js";
import { Router } from "./router/index.js";
import { routes } from "./routes.js";

export class LitHn extends ScopedRegistryHost(LitElement) {

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

  static get elementDefinitions() {
    return {
      "hn-footer": HnFooter,
      "hn-header": HnHeader,
    };
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
