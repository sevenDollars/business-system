const path = require('path');
const loaders = require('./loaders');
const plugins = require('./plugins');
const resolve = require('./resolve');

module.exports = {
  entry: {
    index: path.resolve(__dirname, '../src/index.js'),
  },
  module: {
    rules: loaders,
  },
  output: {
    filename: 'js/[name][chunkhash:8].bundle.js',
    path: path.resolve(__dirname, '../dist'),
  },
  plugins,
  resolve,
};
