module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
  ],
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['@/common', './src/common/'],
          ['@/main', './src/main/'],
          ['@/ui', './src/ui/'],
          ["VirtualTree", "src/ui/VirtualTree"],
        ],
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json']
      },
    },
  },
  rules: {
    'max-len': [2, 120],
    'import/no-unresolved': [2, 'ignorePackages', {
      js: 'never',
      ts: 'never',
    }],
  },
};
