const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  publicPath: "./",
  configureWebpack: {
    devtool: "inline-source-map",
    resolve: {
      fallback: {
        path: require.resolve("path-browserify"),
        fs: require.resolve("fs-promise-polyfill"),
      },
    },
  },
  devServer: {
    headers: { "Access-Control-Allow-Origin": "*" },
  },
});
