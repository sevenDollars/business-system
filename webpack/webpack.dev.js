const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    port: '3000', // 端口号，默认是8080
    open: true,
    hot: true,
    stats: 'errors-only', // 终端仅打印 error
    contentBase: path.join(__dirname, '../dist'),
    // proxy
  },
});
