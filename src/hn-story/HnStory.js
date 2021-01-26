import { LitElement, html } from "lit";
import { ScopedRegistryHost } from "@lit-labs/scoped-registry-mixin";

export class HnStory extends ScopedRegistryHost(LitElement) {
  static get properties() {
    return {
      key: {
        type: String,
      },
    };
  }

  render() {
    return html` <div>Key: ${this.key}</div> `;
  }
}
