module.exports = {
  extends: [
    'plugin:@next/next/recommended',
    'plugin:jest/recommended',
    'plugin:storybook/recommended',
  ],
  plugins: ['testing-library', 'jest'],
  overrides: [
    {
      files: ['**/?(*.)+(spec|test).[jt]s?(x)'],
      extends: ['plugin:testing-library/react'],
    },
  ],
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
    parser: '@babel/eslint-parser',
  },
  rules: {
    'react/react-in-jsx-scope': 'off',
    'linebreak-style': 0,
    'no-unneeded-ternary': 'off',
  },
};
