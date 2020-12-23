const { merge } = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin'); // js 压缩
// webpack5 暂时不支持speed-measure-webpack-plugin
// const SpeedMeasureWebpackPlugin = require('speed-measure-webpack-plugin');

// const smp = new SpeedMeasureWebpackPlugin();
const common = require('./webpack.common');

const webpackConfig = merge(common, {
  mode: 'production',
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
      }),
    ],
    splitChunks: {
      cacheGroups: {
        reactBase: {
          name: 'reactBase',
          test: /(react|react-dom)/,
          chunks: 'all',
          priority: 10,
        },
        common: {
          name: 'common',
          chunks: 'all',
          priority: 2,
          minChunks: 1,
        },
      },
    },
  },
});

module.exports = webpackConfig;
