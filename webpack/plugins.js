/* eslint-disable no-underscore-dangle */
const path = require('path');
const webpack = require('webpack');
// const _ESLintPlugin = require('eslint-webpack-plugin');
const _MiniCssExtractPlugin = require('mini-css-extract-plugin');
const _StyleLintPlugin = require('stylelint-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
// const { htmlWebpackPlugins } = require('./path');

// const ESLintPlugin = new _ESLintPlugin({
//   overrideConfigFile: path.resolve(__dirname, '../.eslintrc'),
//   context: path.resolve(__dirname, '../src/js'),
//   files: '**/*.js',
// });

const MiniCssExtractPlugin = new _MiniCssExtractPlugin({
  filename: 'css/[name][contenthash:8].css',
  // chunkFilename: '[id].css',
});

const StyleLintPlugin = new _StyleLintPlugin({
  configFile: path.resolve(__dirname, 'stylelint.config.js'),
  context: path.resolve(__dirname, '../src'),
  files: '**/*.less',
});

module.exports = [
  new webpack.ProgressPlugin(),
  MiniCssExtractPlugin,
  StyleLintPlugin,
  new CleanWebpackPlugin(),
  new FriendlyErrorsWebpackPlugin(),
];
