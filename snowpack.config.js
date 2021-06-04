/** @type {import("snowpack").SnowpackUserConfig } */
const isDev = process.env.NODE_ENV === 'development';

module.exports = {
	mount: {
		public: '/',
		src: '/_dist_',
	},
	plugins: isDev
		? ['@snowpack/plugin-svelte']
		: [
				// CONVERT SVELTE TO ROLLOUT FORMAT
				'@snowpack/plugin-svelte',
				// FIRST, BUNDLE THE PROJECT WITH ROLLUP
				[
					'snowpack-plugin-rollup-bundle',
					{
						emitHtmlFiles: true,
						preserveSourceFiles: false,
						entrypoints: 'build/index.js',
					},
				],
				// COPY ASSET FOLDERS *find a better method for this*
				[
					'snowpack-plugin-copy',
					{
						patterns: [
							{
								source: 'package.json',
								destination: 'build/',
							},
							{
								source: 'package.json',
								destination: 'public/',
							},
							{
								source: 'public/images/bg/**',
								destination: 'build/images/bg/',
							},
							{
								source: 'public/images/emotions/**',
								destination: 'build/images/emotions/',
							},
							{
								source: 'public/images/favicon/**',
								destination: 'build/images/favicon/',
							},
							{
								source: 'public/images/logo/**',
								destination: 'build/images/logo/',
							},
							{
								source: 'public/images/profile/**',
								destination: 'build/images/profile/',
							},
							{
								source: 'public/manifest.json',
								destination: 'build/',
							},
							{
								source: 'public/pwabuilder-sw.js',
								destination: 'build/',
							},
						],
					},
				],
				// OPTIMIZE FILES/FOLDERS
				['snowpack-plugin-optimize'],
				// OPTIMIZE IMAGES
				[
					'snowpack-plugin-imagemin',
					{
						/* see "Plugin Options" below */
						include: ['**/*.jpg', '**/*.png'],
						plugins: [
							require('imagemin-mozjpeg')({ quality: 90, progressive: true }),
							require('imagemin-optipng')({ optimizationLevel: 7 }),
						],
					},
				],
		  ],
	install: [
		/* ... */
	],
	installOptions: {
		/* ... */
	},
	devOptions: {
		/* ... */
	},
	buildOptions: {
		/* ... */
	},
	proxy: {
		/* ... */
	},
	alias: {
		'@lib': './src/Apps/ComponentLibrary/libraryComponents',
		'@components': './src/components',
		'@base': './src/components/@Base',
		'@cards': './src/components/@Cards',
		'@core': './src/components/@Core',
		'@form': './src/components/@Form',
		'@images': './src/components/@Images',
		'@layout': './src/components/@Layout',
		'@shopping': './src/components/@Shopping',
		'@socialmedia': './src/components/@SocialMedia',
		'@utility': './src/components/@Utility',
		'@examples': './src/components/@Examples',
		'@unsorted': './src/components/@Unsorted',

		'@js': './src/js',
		'@store': './src/stores',
		'@scss': './src/scss',
	},
};
