import { ScopedRegistryHost } from "@lit-labs/scoped-registry-mixin";
import { LitElement, html } from "lit";
import { HnFooter } from "./hn-footer/HnFooter.js";
import { HnHeader } from "./hn-header/HnHeader.js";
import { HnNews } from "./hn-news/HnNews.js";
import { HnAsk } from "./hn-ask/HnAsk.js";

export class LitHn extends ScopedRegistryHost(LitElement) {
  static get elementDefinitions() {
    return {
      "hn-footer": HnFooter,
      "hn-header": HnHeader,
      "hn-news": HnNews,
			"hn-ask": HnAsk,
    };
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    return html`
      <hn-header> Header </hn-header>
      <main>
        <hn-news></hn-news>
				<!-- <hn-ask></hn-ask> -->
      </main>
      <hn-footer> Footer </hn-footer>
    `;
  }
}
