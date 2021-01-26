import { Task } from "@lit-labs/task";
import { ReactiveControllerHost } from "lit";
import { apiUrl } from "./config/index.js";

/**
 * @param {ReactiveControllerHost} host Host element
 * @returns {Task} Api task controller
 */
export function topStories(host) {
  return new Task(
    host,
    async ([url]) =>
      (
        await fetch(`${url}/topstories.json?limitToFirst=30&orderBy=%22$key%22`)
      ).json(),
    () => [apiUrl]
  );
}
