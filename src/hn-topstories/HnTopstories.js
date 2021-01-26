import { LitElement, html } from "lit";
import { ScopedRegistryHost } from "@lit-labs/scoped-registry-mixin";
import { topStories } from "../api/topStories.js";

export class HnTopstories extends ScopedRegistryHost(LitElement) {
  constructor() {
    super();
    this.api = topStories(this);
  }

  render() {
    return html`
      ${this.api.render({
        initial: () => import("../hn-story/hn-story.js"),
        pending: () => html`Loading topstories...`,
        complete: (result) => html`<ol>
          ${result.map(
            (/** @type {string} */ key) =>
              html`<li><hn-story key="${key}"></hn-story></li>`
          )}
        </ol>`,
      })}
    `;
  }
}
