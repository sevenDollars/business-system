const path = require('path');
// const webpack = require('webpack');
const cssnano = require('cssnano');
const _HtmlWebpackPlugin = require('html-webpack-plugin'); // eslint-disable-line
const _MiniCssExtractPlugin = require('mini-css-extract-plugin'); // eslint-disable-line
const _StyleLintPlugin = require('stylelint-webpack-plugin'); // eslint-disable-line
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'); // css 压缩
const ZipWebpackPlugin = require('zip-webpack-plugin');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer'); // 优化体积的时候启用
const env = require('./env');

const HtmlWebpackPlugin = new _HtmlWebpackPlugin({
  template: path.resolve(__dirname, '../publish/index.html'),
  filename: 'index.html', // 打包后的文件名
  chunks: ['index', 'reactBase', 'common'],
  inject: true,
  minify: {
    html5: true,
    collapseWhitespace: true, // 是否折叠空白
    preserveLineBreaks: false,
    minifyCSS: true,
    minifyJS: true,
    removeComments: false,
  },
});

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
  // new webpack.ProgressPlugin(),
  HtmlWebpackPlugin,
  MiniCssExtractPlugin,
  StyleLintPlugin,
  new FriendlyErrorsWebpackPlugin(),
  // new BundleAnalyzerPlugin(),
];

const prodPlugins = env === 'production' ? [
  new OptimizeCssAssetsPlugin({
    assetNameRegExp: /\.css$/g,
    cssProcessor: cssnano,
  }),
  new ZipWebpackPlugin({
    filename: 'business.zip',
  }),
  new CleanWebpackPlugin(),
] : [];

module.exports = commonPlugins.concat(prodPlugins);
