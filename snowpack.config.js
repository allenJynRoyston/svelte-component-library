/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
    public: "/",
    src: "/_dist_",
  },
  plugins: [
    [
      "snowpack-plugin-rollup-bundle",
      {
        emitHtmlFiles: true,
        preserveSourceFiles: false,
        entrypoints: "build/index.js",
      },
    ],
    // ["snowpack-plugin-optimize"],
    [
      "snowpack-plugin-copy",
      {
        patterns: [
          {
            source: "public/images/bg/**",
            destination: "build/images/bg/",
          },
          {
            source: "public/images/emotions/**",
            destination: "build/images/emotions/",
          },
          {
            source: "public/images/favicon/**",
            destination: "build/images/favicon/",
          },
          {
            source: "public/images/logo/**",
            destination: "build/images/logo/",
          },
          {
            source: "public/images/profile/**",
            destination: "build/images/profile/",
          },
        ],
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
