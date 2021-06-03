import { html } from "lit";
import { HnStoryList } from "./hn-story-list/HnStoryList.js";

export const routes = [
  {
    path: "/",
    elementDefinitions: {
      "hn-story-list": HnStoryList,
    },
    render: () => html`<hn-story-list feed="news"></hn-story-list>`,
  },
  {
    path: "/ask",
    elementDefinitions: {
      "hn-story-list": HnStoryList,
    },
    render: () => html`<hn-story-list feed="ask"></hn-story-list>`,
  },
];
