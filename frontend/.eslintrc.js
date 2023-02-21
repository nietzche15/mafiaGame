module.exports = {
  extends: ['airbnb', 'prettier'],
  rules: {
    'linebreak-style': 0,
    'no-console': 'off',
    'no-unused-vars': 'warn',
    'default-param-last': 'off',
    'arrow-body-style': 'off',
    'react/function-component-definition': 'off',
    'react/prop-types': 'off',
    'react/no-array-index-key': 'off',
  },
  parserOptions: {
    exmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
};
