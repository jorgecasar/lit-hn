import { html } from "lit";
import { HnNews } from "./hn-news/HnNews.js";
import { HnAsk } from "./hn-ask/HnAsk.js";

export const routes = [
  {
    path: "/",
    elementDefinitions: {
      "hn-news": HnNews,
    },
    render: () => html`<hn-news></hn-news>`,
  },
  {
    path: "/ask",
    elementDefinitions: {
      "hn-ask": HnAsk,
    },
    render: () => html`<hn-ask></hn-ask>`,
  },
];
