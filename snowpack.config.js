/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
	mount: {
		public: '/',
		src: '/_dist_',
	},
	plugins: ['@snowpack/plugin-svelte'],
	routes: [
		/* Enable an SPA Fallback in development: */
		{ match: 'routes', src: '.*', dest: '/index.html' },
	],
	optimize: {
		bundle: true,
		minify: true,
		target: 'es2018',
	},
	packageOptions: {
		/* ... */
	},
	devOptions: {
		/* ... */
	},
	buildOptions: {
		/* ... */
	},
	alias: {
		'@lib': './src/Apps/ComponentLibrary/components',
		'@components': './src/components',
	},
};
