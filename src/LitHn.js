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
			--primary-color: #325cff;
			--primary-color-contrast: #fff;
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
      <hn-footer> Footer </hn-footer>
    `;
  }
}
