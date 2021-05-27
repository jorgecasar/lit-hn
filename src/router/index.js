import { Task } from '@lit-labs/task';
import { ReactiveElement, html } from "lit";

/**
 * @param {ReactiveElement} host Host element
 * @param {object} data  Router data
 * @param {object} data.routes  Routes
 * @param {string} data.routeProp  Prop get current route
 * @param {function} data.locationChanged  Prop get current route
 * @returns {Task} Api task controller
 */
export function router(host, { routes, routeProp, locationChanged }) {
	const task = new Task(
    host,
    ([routes, route]) => routes[route] ? routes[route]() : html`Not found`,
    () => [routes, host[routeProp]]
  );

	document.body.addEventListener('click', e => {
		e.preventDefault();
		const anchor = e.composedPath().filter(item => item.tagName === 'A')[0];
		window.history.pushState({}, '', anchor.href);
		locationChanged(window.location);
	});

	window.addEventListener('popstate', e => {
		locationChanged(window.location);
	});

	locationChanged(window.location);
	return task;
}
