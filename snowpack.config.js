/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
    public: "/",
    src: "/_dist_",
  },
  plugins: [
    // FIRST, BUNDLE THE PROJECT WITH ROLLUP
    [
      "snowpack-plugin-rollup-bundle",
      {
        emitHtmlFiles: true,
        preserveSourceFiles: false,
        entrypoints: "build/index.js",
      },
    ],
    // COPY ASSET FOLDERS
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
          {
            source: "public/manifest.json",
            destination: "build/",
          },
        ],
      },
    ],
    // OPTIMIZE FILES/FOLDERS
    ["snowpack-plugin-optimize"],
    // OPTIMIZE IMAGES
    [
      "snowpack-plugin-imagemin",
      {
        /* see "Plugin Options" below */
        include: ["**/*.jpg", "**/*.png"],
        plugins: [
          require("imagemin-mozjpeg")({ quality: 90, progressive: true }),
          require("imagemin-optipng")({ optimizationLevel: 7 }),
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
