const path = require('path');
const webpack = require('webpack');
const cssnano = require('cssnano');
const _MiniCssExtractPlugin = require('mini-css-extract-plugin'); // eslint-disable-line
const _StyleLintPlugin = require('stylelint-webpack-plugin'); // eslint-disable-line
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'); // css 压缩
const ZipWebpackPlugin = require('zip-webpack-plugin');
const { htmlWebpackPlugins } = require('./path.config');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer'); // 优化体积的时候启用

const production = process.env.NODE_ENV === 'production';

const MiniCssExtractPlugin = new _MiniCssExtractPlugin({
  filename: 'css/[name][contenthash:8].css',
  chunkFilename: '[id].css',
});

const StyleLintPlugin = new _StyleLintPlugin({
  configFile: path.resolve(__dirname, 'stylelint.config.js'),
  context: path.resolve(__dirname, '../src'),
  files: '**/*.less',
});

const commonPlugins = [
  new webpack.ProgressPlugin(),
  MiniCssExtractPlugin,
  StyleLintPlugin,
  new CleanWebpackPlugin(),
  new FriendlyErrorsWebpackPlugin(),
  // new BundleAnalyzerPlugin(),
].concat(htmlWebpackPlugins);

const prodPlugins = production
  ? [
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: cssnano,
    }),
    new ZipWebpackPlugin({
      filename: 'business.zip',
    }),
  ]
  : [];

module.exports = commonPlugins.concat(prodPlugins);
