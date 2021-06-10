import { Route } from "./route.js";
/**
 * @typedef {import('lit').ReactiveController} ReactiveController
 * @typedef {import('lit').ReactiveControllerHost} ReactiveControllerHost
 */

const __list = new Set();

/**
 * Page received a click
 *
 * @param {MouseEvent} e Click event
 */
 const onClick = e => {
	if(e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey ) {
		return;
	}
	const anchor = /** @type {HTMLAnchorElement} */(e.composedPath().filter(target => target.tagName === "A")[0]);
	if (!anchor || anchor.target || anchor.hasAttribute("download") || anchor.getAttribute("rel") === "external") {
		return;
	}

	const { href } = anchor;
	if (!href || href.indexOf("mailto:") !== -1) {
		return;
	}

	const { location } = window;
	const origin = location.origin || `${location.protocol}//${location.host}`;
	if (href.indexOf(origin) !== 0) return;
	e.preventDefault();
	if (href !== location.href) {
		window.history.pushState({}, "", href);
		__list.forEach(instance => instance.locationChanged(location, e));
	}
}

/**
 * Window popstate event
 *
 * @param {Event} e Click event
 */
const onPopstate = (e) => {
	__list.forEach((router) => router.locationChanged(window.location, e));
};

/**
 *
 * @param {Router} instance Router instance
 */
const setupListeners = (instance) => {
	if(__list.size === 0) {
		document.body.addEventListener("click", onClick);
		window.addEventListener("popstate", onPopstate);
	}
	__list.add(instance);
};

/**
 *
 * @param {Router} instance Router instance
 */
const teardownListeners = (instance) => {
	__list.delete(instance);
	if(__list.size === 0) {
		document.body.removeEventListener("click", onClick);
		window.removeEventListener("popstate", onPopstate);
	}
};

/**
 * @implements {ReactiveController}
 */
export class Router {
	/**
	 *
	 * @param {ReactiveControllerHost} host Reactive controller host
	 * @param {Route[]} routes Array of routes
	 */
	constructor(host, routes = []) {
		this.host = host;
		/** @type {Route[]} */
		this.routes = [];
		this.addRoutes(routes);
		this.host.addController(this);
	}

	static get list() {
		return __list;
	}

	hostConnected() {
		setupListeners(this);
		this.locationChanged(window.location);
	}

	hostDisconnected() {
		teardownListeners(this);
	}

	render() {
		return this.route ? this.route.render(this.route.params) : null;
	}

	registerElementDefinitions() {
		const elementDefinitions = this.route?.elementDefinitions || {};
		const { registry = window.customElements } = this.constructor;
		Object.entries(elementDefinitions).forEach(([tagName, klass]) => {
			if (!registry.get(tagName)) {
				registry.define(tagName, klass);
			}
		});
	}

	/**
	 *
	 * @param {Location} location Current Location
	 */
	locationChanged(location) {
		this.route = this.matchRoute(location);
		this.registerElementDefinitions();
		this.host.requestUpdate();
	}

	/**
	 *
	 * @param {Route[]} routes Routes array
	 */
	addRoutes(routes) {
		routes.forEach(route => this.addRoute(route));
	}

	/**
	 *
	 * @param {Route} route route definition
	 */
	addRoute(route) {
		this.routes.push(new Route(route));
	}

	/**
	 *
	 * @param {Location} location Location instance
	 * @returns {Route | undefined} route that match
	 */
	matchRoute(location) {
		return this.routes.find((route) => route.match(location));
	}
}
