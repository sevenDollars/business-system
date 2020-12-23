const path = require('path');
const webpack = require('webpack');
const _MiniCssExtractPlugin = require('mini-css-extract-plugin'); // eslint-disable-line
const _StyleLintPlugin = require('stylelint-webpack-plugin'); // eslint-disable-line
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const { htmlWebpackPlugins } = require('./path.config');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer'); // 优化体积的时候启用

// const isDev = process.env.NODE_ENV === 'development';

const MiniCssExtractPlugin = new _MiniCssExtractPlugin({
  filename: 'css/[name][contenthash:8].css',
  // chunkFilename: '[id].css',
});

const StyleLintPlugin = new _StyleLintPlugin({
  configFile: path.resolve(__dirname, 'stylelint.config.js'),
  context: path.resolve(__dirname, '../src'),
  files: '**/*.less',
});

const plugins = [
  new webpack.ProgressPlugin(),
  MiniCssExtractPlugin,
  StyleLintPlugin,
  new CleanWebpackPlugin(),
  new FriendlyErrorsWebpackPlugin(),
  // new BundleAnalyzerPlugin(),
].concat(htmlWebpackPlugins);

module.exports = plugins;
