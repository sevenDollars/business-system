const path = require('path');
const glob = require('glob');
const webpack = require('webpack');
// const proxy = require('./proxy.config');
// 自动把JS 加载到html文件里面去
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// // 删除之前的打包记录
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// 压缩css
const OptimizeCssPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');

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
  mode: 'production',
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
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: path.resolve(__dirname, '../dist/css/'),
            },
          },
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
    new OptimizeCssPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackExternalsPlugin({
      externals: [
        {
          module: 'react',
          entry: 'https://unpkg.com/react@17/umd/react.production.min.js',
          global: 'React',
        },
        {
          module: 'react-dom',
          entry: 'https://unpkg.com/react-dom@17/umd/react-dom.production.min.js',
          global: 'ReactDOM',
        },
      ],
    }),
  ].concat(htmlWebpackPlugins),
};
