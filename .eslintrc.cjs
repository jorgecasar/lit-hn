module.exports = {
	extends: [
		"@open-wc/eslint-config",
		"eslint-config-prettier",
		"plugin:jsdoc/recommended"
	],
	plugins: [
		"jsdoc"
	],
	parserOptions: {
		ecmaVersion: 2020,
	}
};
