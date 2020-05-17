module.exports = {
  env: {
    browser: true,
    es2017: true,
    commonjs: true,
    node: true,
  },
  extends: 'eslint:recommended',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'script',
  },
  rules: {
    'no-console': 'off',
    indent: ['error', 2],
    'linebreak-style': ['error', 'windows'],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
  },
};
