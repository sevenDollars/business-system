const resolve = require('./webpack/resolve');

module.exports = {
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  parser: 'babel-eslint',
  extends: ['airbnb', 'airbnb/hooks'],
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
      },
      webpack: {
        config: {
          resolve,
        },
      },
    },
  },
  rules: {
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: true,
      },
    ],
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.js', '.jsx'],
      },
    ],
  },
};
