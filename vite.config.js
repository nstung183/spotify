const { resolve } = require("path");

import path from "path";
const { defineConfig } = require("vite");
const legacy = require("@vitejs/plugin-legacy");

module.exports = defineConfig({
  plugins: [
    legacy({
      targets: ["defaults", "not IE 11"]
    })
  ],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
      }
    }
  }
});
