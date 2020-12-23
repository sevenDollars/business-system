// const isDev = process.env.NODE_ENV === 'development';
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const threadLoader = require('thread-loader');

const workerPool = {
  workers: 2, // 产生的 worker 的数量，默认是 (cpu 核心数 - 1)
  workerParallelJobs: 50, // 一个 worker 进程中并行执行工作的数量，默认20
  workerNodeArgs: ['--max-old-space-size=1024'], // 额外的 node 参数，避免内存溢出
  poolRespawn: false,
  poolTimeout: 2000, // 闲置时定时删除 worker 进程，默认为 500ms，可以设置为无穷大， 这样在监视模式(--watch)下可以保持 worker 持续存在
  poolParallelJobs: 50,
  // name: 'my-pool',
};

// 每个 worker 大概都要花费 600ms，为了防止启动 worker 时的高延迟，对 worker 池预热。
threadLoader.warmup(workerPool, ['babel-loader', 'eslint-loader']);
threadLoader.warmup(workerPool, ['css-loader', 'postcss-loader']);

const JSLoaders = {
  test: /\.js$/,
  include: path.resolve(__dirname, '../src'),
  use: [
    'cache-loader',
    {
      loader: 'thread-loader',
      options: workerPool,
    },
    'babel-loader',
    'eslint-loader',
  ],
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
      loader: 'thread-loader',
      options: workerPool,
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
