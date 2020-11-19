const path = require('path');
const webpack = require('webpack');
// const proxy = require('./proxy.config');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const OptimizeCssPlugin = require('optimize-css-assets-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
console.log('isDev===', isDev);

const config = {
  entry: {
    // index: ['react-hot-loader/patch', './src/index.js'],
    index: './src/index.js',
  },
  output: {
    filename: 'js/[name].bundle.[hash:6].js', // 考虑到CDN缓存的问题，一般文件名加上hash
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/', //通常是CDN地址
  },
  mode: isDev ? 'development' : 'production',
  devServer: {
    port: '3000', // 端口号，默认是8080
    open: true,
    hot: true,
    contentBase: './dist',
    // inline: true, // 默认开启 inline 模式，如果设置为false,开启 iframe 模式
    stats: 'errors-only', // 终端仅打印 error
    // clientLogLevel: 'silent', // 日志等级
    // contentBase: './dist',
    // publicPath: '/'
    // compress: true, //是否启用 gzip 压缩
    // proxy,
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(c|le)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: function () {
                return [require('autoprefixer')()];
              },
            },
          },
          'less-loader',
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.(js|jsx)$/,
        use: ['babel-loader'],
        exclude: /node_modules/,
      },
      {
        test: /.tsx?$/i,
        exclude: [/node_modules/],
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
            },
          },
          {
            loader: 'ifdef-loader',
            options: {
              'ifdef-verbose': false,
              DEBUG: false,
            },
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        include: path.resolve(__dirname, 'src'),
        type: 'asset/resource',
        generator: {
          // limit: 10240, //10K
          // esModule: false,
          filename: 'assets/images/[name].[hash:6][ext]',
        },
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        // test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/inline',
        generator: {
          filename: 'assets/fonts/[name].[hash:6].[ext]',
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      // title: 'output出口管理',
      // filename: 'index.html', // 打包后的文件名
      template: path.resolve(__dirname, './public/index.html'),
      // hash: false,
      // inject: 'body',
      // minify: {
      //   // removeAttributeQuotes: false, //是否删除属性的双引号
      //   collapseWhitespace: true, //是否折叠空白
      // },
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
    }),
    new webpack.DefinePlugin({
      DEV: isDev ? 'development' : 'production',
    }),
    // CSS压缩
    // new OptimizeCssPlugin(),
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      component: path.resolve(__dirname, './src/component'),
      common: path.resolve(__dirname, './src/common'),
      config: path.resolve(__dirname, './src/config'),
      utils: path.resolve(__dirname, './src/utils'),
      service: path.resolve(__dirname, './src/service'),
      model: path.resolve(__dirname, './src/model'),
    },
  },
};

module.exports = config;
