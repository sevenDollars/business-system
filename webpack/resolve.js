const path = require('path');

module.exports = {
  // 配置解析别名
  extensions: ['.js', '.jsx', '.json'],
  alias: {
    common: path.resolve(__dirname, '../src/common'),
  },
};
