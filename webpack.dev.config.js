const path = require('path');
const glob = require('glob');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// 动态获取多页面打包路径
const setMPA = () => {
  const entry = {};
  const htmlWebpackPlugins = [];
  const entryFiles = glob.sync(path.resolve(__dirname, 'publish/*'));

  Object.keys(entryFiles).map((index) => {
    const entryFile = entryFiles[index];
    const match = entryFile.match(/publish\/(.*)\.html/);
    const pageName = match && match[1];

    entry[pageName] = path.resolve(__dirname, `src/${pageName}/index.js`);
    htmlWebpackPlugins.push(
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, `publish/${pageName}.html`),
        filename: `${pageName}.html`, // 打包后的文件名
        chunks: [pageName],
        inject: true,
        minify: {
          html5: true,
          collapseWhitespace: true, //是否折叠空白
          preserveLineBreaks: false,
          minifyCSS: true,
          minifyJS: true,
          removeComments: false,
        },
      })
    );
  });

  return { entry, htmlWebpackPlugins };
};

const { entry, htmlWebpackPlugins } = setMPA();

module.exports = {
  entry,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name]_[chunkhash:8].js',
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src'),
        use: 'babel-loader',
      },
      {
        test: /\.less$/,
        include: path.resolve(__dirname, 'src'),
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                config: path.resolve(__dirname, 'webpack/postcss.config.js'),
              },
            },
          },
          'less-loader',
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        include: path.resolve(__dirname, 'src'),
        type: 'asset/resource',
        generator: {
          // limit: 10240, //10K
          // esModule: false,
          filename: 'assets/images/[name]_[hash:8][ext]',
        },
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/i,
        type: 'asset/inline',
        generator: {
          filename: 'assets/fonts/[name]_[hash:8][ext]',
        },
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name][contenthash:8].css',
    }),
  ].concat(htmlWebpackPlugins),
  devServer: {
    port: '3000', // 端口号，默认是8080
    open: true,
    hot: true,
    stats: 'errors-only', // 终端仅打印 error
    // proxy
  },
  devtool: "source-map"
  // webpack文件监听，缺陷是监听变化重新打包后，需手动刷新浏览器
  // watch: true, // 默认 false，不开启
  // watchOptions: { // 只有开启监听模式时，watchOptions才有意义
  //   ignored: /node_modules/, // 默认为空，不监听的文件或者文件夹，支持正则匹配
  //   aggregateTimeout: 300, // 默认300ms，监听到变化后悔等300ms再去执行
  //   poll: 1000 // 判断文件是否发生变化是通过不停询问系统指定文件有没有变化实现的，默认每秒问1000次
  // }
};
