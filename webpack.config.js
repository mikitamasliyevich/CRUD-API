const path = require('path');

module.exports = {
  entry: "./app.ts",
  output: {
    filename: "./bundle.js",
  },
  target: 'node',
  devtool: "source-map",
  resolve: {
    extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"],
  },
  module: {
    rules: [
      { test: /\.tsx?$/, loader: "ts-loader" },
      { test: /\.js$/, loader: "source-map-loader" },
    ],
  },
};
