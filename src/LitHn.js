import { ScopedRegistryHost } from "@lit-labs/scoped-registry-mixin";
import { LitElement, html } from "lit";
import { HnFooter } from "./hn-footer/HnFooter.js";
import { HnHeader } from "./hn-header/HnHeader.js";
import { Router } from "./router/index.js";
import { routes } from "./routes.js";

export class LitHn extends ScopedRegistryHost(LitElement) {
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
      <hn-header
        >Hacker News
        <nav>
          <ul>
            <li><a href="./">news</a></li>
            <li><a href="./ask">ask</a></li>
          </ul>
        </nav>
      </hn-header>
      <main>${this.router.render()}</main>
      <hn-footer> Footer </hn-footer>
    `;
  }
}
