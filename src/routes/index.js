import { html } from 'lit';

export const routes = {
	'/': () => html`<hn-news></hn-news>`,
	'/ask': () => html`<hn-ask></hn-ask>`,
};
