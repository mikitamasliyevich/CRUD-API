const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
  mode: 'production',
  target: 'node',
  entry: './app.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.js',
  },
  plugins:
  [
    new CleanWebpackPlugin(),
  ]
    [
      new ESLintPlugin()
    ],
};
