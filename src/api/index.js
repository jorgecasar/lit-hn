import { Task } from "@lit-labs/task";
import { ReactiveElement } from "lit";
import { apiUrl } from "./config/index.js";

/**
 * @param {ReactiveElement} host Host element
 * @param {object} data fetch data
 * @param {string} data.feed feed name
 * @param {number} data.page page number
 * @returns {Task} Api task controller
 */
export function fetchFeeds(host, { feed = 'news', page = 1} ) {
  return new Task(
    host,
    (async ([feed, page]) => (await fetch(`${apiUrl}/${feed}/${page}.json`)).json()),
    () => [feed, page]
  );
}
