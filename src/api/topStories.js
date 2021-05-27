import { Task } from "@lit-labs/task";
import { ReactiveElement } from "lit";
import { apiUrl } from "./config/index.js";

/**
 * @param {ReactiveElement} host Host element
 * @returns {Task} Api task controller
 */
export function topStories(host) {
  return new Task(
    host,
    async ([url]) =>
      (
        await fetch(`${url}/news/1.json`)
      ).json(),
    () => [apiUrl]
  );
}
