import { html } from "lit";
import { HnStoryList } from "./hn-story-list/HnStoryList.js";

export const routes = [
  {
    path: "/:feed?/:page(\\d+)?",
    elementDefinitions: {
      "hn-story-list": HnStoryList,
    },
    render: params => html`<hn-story-list feed="${params.feed}" page="${params.page}"></hn-story-list>`
  },
];
