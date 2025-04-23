module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true, // For React projects
    },
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:prettier/recommended',
  ],
  plugins: ['@typescript-eslint'],
  rules: {
    // Disallow semicolons
    semi: ['error', 'never'],
    // Allow semicolons in certain rare cases where they are necessary
    '@typescript-eslint/semi': [
      'error',
      'never',
      { beforeStatementContinuationChars: 'always' },
    ],
  },
}
