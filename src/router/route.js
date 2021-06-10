import { pathToRegexp } from "path-to-regexp";

/**
 * @typedef {import('path-to-regexp').Path} Path
 * @typedef {import('path-to-regexp').Key} Key
 * @typedef {import('path-to-regexp').TokensToRegexpOptions} TokensToRegexpOptions
 * @typedef {import('path-to-regexp').ParseOptions} ParseOptions
 */

/**
 * @typedef {Object.<string, object>} ElementDefinitionsMap Element Definition map

 */


/**
 * Class that represent a Route
 *
 * @property {object} params - Route params
 * @property {ElementDefinitionsMap} elementDefinitions - Custom element definition for lazy registry
 */
export class Route {
	/**
	 *
	 * @param {object} data constructor data
	 * @param {Path} data.path A string, array of strings, or a regular expression.
	 * @param {Key[]} data.keys An array to populate with keys found in the path.
	 * @param {TokensToRegexpOptions | ParseOptions} data.options constructor data
	 * @param {ElementDefinitionsMap} data.elementDefinitions Custom element definition for lazy registry
	 * @param {Function} data.render Render function
	 */
	constructor({
		path,
		keys = [],
		options = {},
		elementDefinitions = {},
		render,
	}) {
		this.path = path === "*" ? "(.*)" : path;
		this.keys = keys;
		this.options = options;
		this.elementDefinitions = elementDefinitions;
		this.render = render;
		this.regexp = pathToRegexp(this.path, this.keys, this.options);
		this.params = {};
		this.search = {};
	}

	/**
	 *
	 * @param {Location} location Location instance
	 * @returns {boolean} True if route match
	 */
	match(location) {
		this.params = {};
		this.search = {};
		const { pathname, search } = location;
		const m = this.regexp.exec(decodeURIComponent(pathname));
		if (!m) {
			return false;
		}
		for (let i = 1, len = m.length; i < len; i += 1) {
			const key = this.keys[i - 1];
			const value = m[i] ? decodeURIComponent(m[i]) : m[i];
			if (
				value !== undefined ||
				!Object.prototype.hasOwnProperty.call(this.params, key.name)
			) {
				this.params[key.name] = value;
			}
		}
		if (search) {
			const searchParams = new URLSearchParams(search);
			for(const [key, value] of searchParams) {
				this.search[key] = value;
			}
		}

		return true;
	}
}
