import { Task, initialState } from "@lit-labs/task";
import { ReactiveElement } from "lit";
import { apiUrl } from "./config/index.js";

/**
 * @param {ReactiveElement} host Host element
 * @param {object} data fetch data
 * @param {string} data.feed feed name
 * @param {number} data.page page number
 * @returns {Task} Api task controller
 */

export class FeedsController {
	/**
	 *
	 * @param {ReactiveControllerHost} host
	 */
	constructor(host) {
		this.host = host;
		this.task = this.createTask();
	}

	/**
	 *
	 * @returns {Task} task
	 */
	createTask() {
		return new Task(
			this.host,
			async ([feed, page]) => {
				if (!feed.trim()) {
					return initialState;
				}
				const response = await fetch(`${apiUrl}/${feed}/${page}.json`);
				const result = await response.json();
				const { error } = result;
        if (error !== undefined) {
          throw new Error(error);
        }
        return result;
			},
			() => [
				this.host.feed,
				this.host.page
			]
		)
	}

	/**
	 *
	 * @param {StatusRenderer} renderFunctions render functions
	 * @returns {any} Template
	 */
	render(renderFunctions) {
    return this.task.render(renderFunctions);
  }
}
