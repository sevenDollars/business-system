const path = require('path');
const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// 动态获取多页面打包路径
const setMPI = () => {
  const entry = {};
  const htmlWebpackPlugins = [];
  const entryFiles = glob.sync(path.resolve(__dirname, '../publish/*'));

  Object.keys(entryFiles).forEach((index) => {
    const entryFile = entryFiles[index];
    const match = entryFile.match(/publish\/(.*)\.html/);
    const pageName = match && match[1];

    entry[pageName] = path.resolve(__dirname, `../src/${pageName}/index.js`);
    htmlWebpackPlugins.push(
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, `../publish/${pageName}.html`),
        filename: `${pageName}.html`, // 打包后的文件名
        chunks: ['reactBase', 'common', pageName],
        inject: true,
        minify: {
          html5: true,
          collapseWhitespace: true, // 是否折叠空白
          preserveLineBreaks: false,
          minifyCSS: true,
          minifyJS: true,
          removeComments: false,
        },
      }),
    );
  });

  return { entry, htmlWebpackPlugins };
};

module.exports = setMPI();
