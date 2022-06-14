const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
  mode: 'production',
  target: 'node',
  entry: './app.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
  },
  plugins:
  [
    new CleanWebpackPlugin(),
  ]
    [
      new ESLintPlugin()
    ],
};
