const path = require('path');
const loaders = require('./loaders');
const plugins = require('./plugins');
const resolve = require('./resolve');
const { entry } = require('./path.config');

module.exports = {
  entry,
  module: {
    rules: loaders,
  },
  output: {
    filename: 'js/[name].bundle.js',
    path: path.resolve(__dirname, '../dist'),
  },
  plugins,
  resolve,
};
