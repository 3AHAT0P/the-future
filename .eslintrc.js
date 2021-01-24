module.exports = {
  env: {
    node: true,
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'airbnb-base',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
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
    'import/extensions': ['.ts', '.tsx', '.js', '.jsx', '.json', 'd.ts'],
    'import/resolver': {
      alias: {
        map: [
          ['@/common', './src/common/'],
          ['@/main', './src/main/'],
          ['@/ui', './src/ui/'],
          ['JSX', './src/common/JSX'],
          ['VirtualTree', './src/common/VirtualTree'],
        ],
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
      },
    },
  },
  rules: {
    'max-len': ['error', 120],
    'import/no-unresolved': ['error', { commonjs: true, amd: true, caseSensitive: true }],
    'import/extensions': ['error', {
      js: 'never', jsx: 'never', ts: 'never', tsx: 'never', 'd.ts': 'always',
    }],
    'no-underscore-dangle': ['off'],
    'no-restricted-syntax': ['off'],
    semi: ['off'],
    '@typescript-eslint/semi': ['error'],
    'class-methods-use-this': ['off'],
    'no-void': ['off'],
  },
};
