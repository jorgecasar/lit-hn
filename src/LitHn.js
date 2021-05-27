import { ScopedRegistryHost } from "@lit-labs/scoped-registry-mixin";
import { LitElement, html } from "lit";
import { HnFooter } from "./hn-footer/HnFooter.js";
import { HnHeader } from "./hn-header/HnHeader.js";
import { HnNews } from "./hn-news/HnNews.js";
import { HnAsk } from "./hn-ask/HnAsk.js";
import { router } from './router/index.js';
import { routes } from './routes/index.js';

export class LitHn extends ScopedRegistryHost(LitElement) {

	static get elementDefinitions() {
		return {
			"hn-footer": HnFooter,
			"hn-header": HnHeader,
			"hn-news": HnNews,
			"hn-ask": HnAsk,
		};
	}

	static get properties() {
		return {
			route: { type: String }
		}
	}

	constructor() {
		super();
		this.locationChanged = this.locationChanged.bind(this);
		this.router = router(this, {
			routes,
			routeProp: 'route',
			locationChanged: this.locationChanged
		});
	}

	locationChanged(location) {
		this.route = location.pathname;
	}

	// eslint-disable-next-line class-methods-use-this
	render() {
		return html`
		<hn-header>Hacker News
		<nav>
			<ul>
				<li><a href="./">news</a></li>
				<li><a href="./ask">ask</a></li>
			</ul>
		</nav>

		</hn-header>
		<main>
			${this.router.render({
        pending: () => html`Loading page...`,
        complete: result => result,
      })}
		</main>
		<hn-footer> Footer </hn-footer>
		`;
	}
}
