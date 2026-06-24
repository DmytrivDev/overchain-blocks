const glob = require("glob");
const defaultConfig = require("@wordpress/scripts/config/webpack.config");
const path = require("path");
const fs = require("fs");
const RemoveEmptyScriptsPlugin = require("webpack-remove-empty-scripts");

const plugins = defaultConfig.plugins.filter(
  (p) => p.constructor.name !== "CleanWebpackPlugin",
);

// Auto-discover all blocks with index.js
const blockEntries = glob
  .sync("blocks/**/index.js", { cwd: __dirname })
  .reduce((acc, file) => {
    const name = path.dirname(file).replace("blocks/", "");
    acc[`${name}/index`] = path.resolve(__dirname, file);
    return acc;
  }, {});

module.exports = {
  ...defaultConfig,
  entry: {
    ...blockEntries,
    blocks: path.resolve(__dirname, "resources/scss/blocks.scss"),
    editor: path.resolve(__dirname, "resources/scss/editor.scss"),
    "blocks-scripts": path.resolve(__dirname, "resources/js/blocks.js"),
  },
  output: {
    ...defaultConfig.output,
    path: path.resolve(__dirname, "build"),
    filename: "[name].js",
  },
  plugins: [
    ...plugins,
    new RemoveEmptyScriptsPlugin({
      extensions: ["scss", "css", "sass", "less"],
    }),
  ],
  snapshot: {
    managedPaths: [],
  },
};
