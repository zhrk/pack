module.exports = {
  env: {
    browser: true,
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.ts', '.tsx', '.json'],
      },
    },
    'import/extensions': ['.js', '.ts', '.tsx', '.json'],
  },
  extends: [
    'airbnb',
    'airbnb/hooks',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:@tanstack/eslint-plugin-query/recommended',
  ],
  plugins: ['react', 'jsx-a11y', 'import', 'prettier', '@typescript-eslint', '@tanstack/query'],
  rules: {
    'prettier/prettier': 'error',
    camelcase: 'off',
    'no-param-reassign': 'off',
    curly: ['error', 'multi-line'],
    'import/extensions': 'off',
    'react/prop-types': 'off',
    'react/require-default-props': 'off',
    'react/no-unused-prop-types': 'off',
    'react/jsx-filename-extension': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/no-array-index-key': 'off',
    'react/function-component-definition': 'off',
    'react/jsx-no-useless-fragment': [
      2,
      {
        allowExpressions: true,
      },
    ],
    'react/no-unstable-nested-components': [
      'error',
      {
        allowAsProps: true,
      },
    ],
    'import/prefer-default-export': 'off',
    'no-restricted-exports': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        varsIgnorePattern: '^_',
      },
    ],
    '@typescript-eslint/method-signature-style': ['error', 'property'],
    'arrow-body-style': [
      'error',
      'as-needed',
      {
        requireReturnForObjectLiteral: false,
      },
    ],
    'react/prefer-exact-props': 'off',
    'import/no-relative-packages': 'off',
    'import/named': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/no-import-module-exports': 'off',
    'import/no-cycle': [
      2,
      {
        maxDepth: 1,
      },
    ],
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
  },
};
