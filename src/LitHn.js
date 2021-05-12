import { ScopedRegistryHost } from "@lit-labs/scoped-registry-mixin";
import { LitElement, html } from "lit";
import { HnFooter } from "./hn-footer/HnFooter.js";
import { HnHeader } from "./hn-header/HnHeader.js";
import { HnTopstories } from "./hn-topstories/HnTopstories.js";

export class LitHn extends ScopedRegistryHost(LitElement) {
  static get elementDefinitions() {
    return {
      "hn-footer": HnFooter,
      "hn-header": HnHeader,
      "hn-topstories": HnTopstories,
    };
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    return html`
      <hn-header> Header </hn-header>
      <main>
        <hn-topstories></hn-topstories>
      </main>
      <hn-footer> Footer </hn-footer>
    `;
  }
}
