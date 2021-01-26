import { LitElement, html } from "lit";
import { ScopedRegistryHost } from "@lit-labs/scoped-registry-mixin";

export class HnFooter extends ScopedRegistryHost(LitElement) {
  // eslint-disable-next-line class-methods-use-this
  render() {
    return html`<slot></slot>`;
  }
}
