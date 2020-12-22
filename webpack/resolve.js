const path = require('path');

module.exports = {
  // 配置解析别名
  extensions: ['.js', '.jsx', '.json'],
  alias: {
    // '@': path.resolve(__dirname, './src'),
    // components: path.resolve(__dirname, './src/components'),
    common: path.resolve(__dirname, '../src/common'),
    // views: path.resolve(__dirname, './src/views'),
  },
};
