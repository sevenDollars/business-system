// const isDev = process.env.NODE_ENV === 'development';
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const JSLoaders = {
  test: /\.js$/,
  include: path.resolve(__dirname, '../src'),
  use: ['babel-loader', 'eslint-loader'],
};

const CSSLoader = {
  test: /\.(c|le)ss$/i,
  include: path.resolve(__dirname, '../src'),
  use: [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {
        publicPath: path.resolve(__dirname, '../dist/css/'),
      },
    },
    {
      loader: 'css-loader',
      options: { importLoaders: 1 },
    },
    {
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          config: path.resolve(__dirname, 'postcss.config.js'),
        },
      },
    },
    'less-loader',
  ],
};

const IMGLoaders = {
  test: /\.(png|svg|jpg|jpeg|gif)$/i,
  include: path.resolve(__dirname, '../src'),
  type: 'asset/resource',
  generator: {
    // limit: 10240, //10K
    // esModule: false,
    filename: 'assets/images/[name]_[hash:8][ext]',
  },
};

const FONTLoaders = {
  test: /\.(woff(2)?|eot|ttf|otf|svg|)$/i,
  include: path.resolve(__dirname, '../src'),
  type: 'asset/inline',
  generator: {
    filename: 'assets/fonts/[name]_[hash:8][ext]',
  },
};

module.exports = [JSLoaders, CSSLoader, IMGLoaders, FONTLoaders];
