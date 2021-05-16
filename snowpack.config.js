/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
    public: "/",
    src: "/_dist_",
  },
  plugins: [
    [
      "@snowpack/plugin-webpack",
      {
        /* webpack options */
        // htmlMinifierOptions: true,
        // sourceMap: false,
        // collapseWhitespace: true,
        // removeComments: true,
        // removeEmptyAttributes: true,
        // removeRedundantAttributes: true,
        // removeScriptTypeAttributes: true,
        // removeStyleLinkTypeAttributes: true,
      },
    ],
    "@snowpack/plugin-svelte",
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
    "@lib": "./src/Apps/ComponentLibrary/components",
    "@components": "./src/components",
    "@scss": "./src/scss/src",
  },
};
