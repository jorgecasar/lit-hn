import { nothing } from "lit";

/**
 * @typedef {import('lit').ReactiveControllerHost} ReactiveControllerHost
 */

export class Router {
  /**
   *
   * @param {ReactiveControllerHost} host Reactive controller host
   * @param {object[]} routes Array of routes
   */
  constructor(host, routes) {
    this.host = host;
    this.host.addController(this);
    this.routes = routes;
    this.route = null;
    this.__onClick = this.__onClick.bind(this);
    this.__onPopstate = this.__onPopstate.bind(this);
  }

  hostConnected() {
    this.setupListeners();
    this.locationChanged(window.location);
  }

  hostDisconnected() {
    this.teardownListeners();
  }

  setupListeners() {
    document.body.addEventListener("click", this.__onClick);
    window.addEventListener("popstate", this.__onPopstate);
  }

  teardownListeners() {
    document.body.removeEventListener("click", this.__onClick);
    window.removeEventListener("popstate", this.__onPopstate);
  }

  /**
   *
   * @param {Location} location Current Location
   * @param {Event | null=} e Event that throw location changed
   */
  locationChanged(location, e) {
    const { pathname } = location;
    this.route = this.routes.find((route) => route.path === pathname);
    const { elementDefinitions } = this.route;
    if (elementDefinitions) {
      const { registry = window.customElements } = this.host.constructor;
      Object.entries(elementDefinitions).forEach(([tagName, klass]) => {
        if (!registry.get(tagName)) {
          registry.define(tagName, klass);
        }
      });
    }
    this.host.requestUpdate();
  }

  render() {
    return this.route ? this.route.render() : nothing;
  }

  /**
   * Page received a click
   *
   * @param {Event} e Click event
   */
  __onClick(e) {
    if (
      e.defaultPrevented ||
      e.button !== 0 ||
      e.metaKey ||
      e.ctrlKey ||
      e.shiftKey
    )
      return;
    const anchor = e.composedPath().filter((item) => item.tagName === "A")[0];
    if (
      !anchor ||
      anchor.target ||
      anchor.hasAttribute("download") ||
      anchor.getAttribute("rel") === "external"
    )
      return;

    const { href } = anchor;
    if (!href || href.indexOf("mailto:") !== -1) return;

    const { location } = window;
    const origin = location.origin || `${location.protocol}//${location.host}`;
    if (href.indexOf(origin) !== 0) return;

    e.preventDefault();
    if (href !== location.href) {
      window.history.pushState({}, "", href);
      this.locationChanged(location, e);
    }
  }

  /**
   * Window popstate event
   *
   * @param {Event} e Click event
   */
  __onPopstate(e) {
    this.locationChanged(window.location, e);
  }
}
