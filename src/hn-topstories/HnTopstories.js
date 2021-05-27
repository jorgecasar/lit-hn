import { LitElement, html } from "lit";
import { ScopedRegistryHost } from "@lit-labs/scoped-registry-mixin";
import { topStories } from "../api/topStories.js";
import { HnStory } from "../hn-story/HnStory.js";

export class HnTopstories extends ScopedRegistryHost(LitElement) {
  static get elementDefinitions() {
    return {
      "hn-story": HnStory,
    };
  }

  constructor() {
    super();
    this.api = topStories(this);
  }

  render() {
    return html`
      ${this.api.render({
        pending: () => html`Loading topstories...`,
        complete: (result) => html`<ol>
          ${result.map(
            (/** @type {object} */ story) =>
              html`<li><hn-story .story="${story}"></hn-story></li>`
          )}
        </ol>`,
      })}
    `;
  }
}
