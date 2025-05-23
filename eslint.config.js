/* eslint-disable no-underscore-dangle */
const pluginQuery = require('@tanstack/eslint-plugin-query');
const typescriptEslint = require('@typescript-eslint/eslint-plugin');
const tsParser = require('@typescript-eslint/parser');
const { defineConfig } = require('eslint/config');
const importPlugin = require('eslint-plugin-import');
const jsxA11Y = require('eslint-plugin-jsx-a11y');
const prettier = require('eslint-plugin-prettier');
const react = require('eslint-plugin-react');
const reactHooks = require('eslint-plugin-react-hooks');
const globals = require('globals');

module.exports = [
  reactHooks.configs['recommended-latest'],
  ...pluginQuery.configs['flat/recommended'],
  defineConfig({
    files: ['**/*.js', '**/*.ts', '**/*.tsx'],
    plugins: {
      react,
      prettier,
      import: importPlugin,
      'jsx-a11y': jsxA11Y,
      '@typescript-eslint': typescriptEslint,
    },
    languageOptions: { globals: { ...globals.browser, ...globals.node }, parser: tsParser },
    settings: {
      react: { version: 'detect' },
      'import/extensions': ['.js', '.ts', '.tsx', '.json'],
      'import/resolver': { node: { extensions: ['.js', '.ts', '.tsx', '.json'] } },
      'import/ignore': ['node_modules', '\.(scss|svg|json)$'],
    },
    rules: {
      curly: ['error', 'multi-line'],
      'arrow-body-style': ['error'],
      strict: ['error', 'never'],
      'no-useless-computed-key': ['error'],
      'no-useless-rename': ['error'],
      'no-var': ['error'],
      'object-shorthand': ['error'],
      'prefer-const': ['error'],
      'prefer-rest-params': ['error'],
      'prefer-spread': ['error'],
      'prefer-template': ['error'],
      'no-delete-var': ['error'],
      'no-shadow': ['error'],
      'no-shadow-restricted-names': ['error'],
      'no-undef-init': ['error'],
      'new-cap': ['error'],
      'no-bitwise': ['error'],
      'no-lonely-if': ['error'],
      'no-multi-assign': ['error'],
      'no-nested-ternary': ['error'],
      'no-unneeded-ternary': ['error', { defaultAssignment: false }],
      'one-var': ['error', 'never'],
      'operator-assignment': ['error', 'never'],
      'prefer-exponentiation-operator': ['error'],
      'prefer-object-spread': ['error'],
      'for-direction': ['error'],
      'getter-return': ['error'],
      'no-async-promise-executor': ['error'],
      'no-compare-neg-zero': ['error'],
      'no-cond-assign': ['error', 'always'],
      'no-console': ['warn'],
      'no-constant-condition': ['warn'],
      'no-control-regex': ['error'],
      'no-debugger': ['warn'],
      'no-dupe-else-if': ['error'],
      'no-duplicate-case': ['error'],
      'no-empty': ['error'],
      'no-empty-character-class': ['error'],
      'no-ex-assign': ['error'],
      'no-extra-boolean-cast': ['error', { enforceForLogicalOperands: true }],
      'no-inner-declarations': ['error'],
      'no-invalid-regexp': ['error'],
      'no-irregular-whitespace': ['error', { skipStrings: false }],
      'no-loss-of-precision': ['error'],
      'no-misleading-character-class': ['error'],
      'no-promise-executor-return': ['error'],
      'no-prototype-builtins': ['error'],
      'no-regex-spaces': ['error'],
      'no-sparse-arrays': ['error'],
      'no-unsafe-finally': ['error'],
      'no-unsafe-optional-chaining': ['error', { disallowArithmeticOperators: true }],
      'no-useless-backreference': ['error'],
      'use-isnan': ['error', { enforceForIndexOf: true }],
      'valid-typeof': ['error', { requireStringLiterals: true }],
      'array-callback-return': ['error'],
      'block-scoped-var': ['error'],
      'consistent-return': ['error'],
      'default-case': ['error'],
      'default-case-last': ['error'],
      'default-param-last': ['error'],
      'dot-notation': ['error'],
      eqeqeq: ['error'],
      'guard-for-in': ['error'],
      'no-alert': ['warn'],
      'no-case-declarations': ['error'],
      'no-else-return': ['error', { allowElseIf: false }],
      'no-empty-pattern': ['error'],
      'no-eval': ['error'],
      'no-extend-native': ['error'],
      'no-fallthrough': ['error'],
      'no-global-assign': ['error'],
      'no-implicit-coercion': ['error', { disallowTemplateShorthand: true }],
      'no-implied-eval': ['error'],
      'no-lone-blocks': ['error'],
      'no-multi-str': ['error'],
      'no-new': ['error'],
      'no-new-func': ['error'],
      'no-new-wrappers': ['error'],
      'no-octal': ['error'],
      'no-proto': ['error'],
      'no-return-assign': ['error', 'always'],
      'no-script-url': ['error'],
      'no-self-assign': ['error'],
      'no-self-compare': ['error'],
      'no-sequences': ['error', { allowInParentheses: false }],
      'no-throw-literal': ['error'],
      'no-unused-expressions': ['error'],
      'no-useless-catch': ['error'],
      'no-useless-concat': ['error'],
      'no-useless-escape': ['error'],
      'no-useless-return': ['error'],
      'no-void': ['error'],
      'prefer-promise-reject-errors': ['error'],
      'prefer-regex-literals': ['error', { disallowRedundantWrapping: true }],
      'require-await': ['error'],
      'no-underscore-dangle': [
        'error',
        {
          enforceInMethodNames: true,
          allowFunctionParams: false,
          enforceInClassFields: true,
          allowInArrayDestructuring: false,
          allowInObjectDestructuring: false,
        },
      ],
      'no-restricted-properties': [
        'error',
        {
          object: 'global',
          property: 'isFinite',
          message: 'Use Number.isFinite instead',
        },
        {
          object: 'self',
          property: 'isFinite',
          message: 'Use Number.isFinite instead',
        },
        {
          object: 'window',
          property: 'isFinite',
          message: 'Use Number.isFinite instead',
        },
        {
          object: 'global',
          property: 'isNaN',
          message: 'Use Number.isNaN instead',
        },
        {
          object: 'self',
          property: 'isNaN',
          message: 'Use Number.isNaN instead',
        },
        {
          object: 'window',
          property: 'isNaN',
          message: 'Use Number.isNaN instead',
        },
      ],
      'no-restricted-globals': [
        'error',
        { name: 'isFinite', message: 'Use Number.isFinite instead' },
        { name: 'isNaN', message: 'Use Number.isNaN instead' },
        'addEventListener',
        'blur',
        'close',
        'closed',
        'confirm',
        'defaultStatus',
        'defaultstatus',
        'event',
        'external',
        'find',
        'focus',
        'frameElement',
        'frames',
        'history',
        'innerHeight',
        'innerWidth',
        'length',
        'location',
        'locationbar',
        'menubar',
        'moveBy',
        'moveTo',
        'name',
        'onblur',
        'onerror',
        'onfocus',
        'onload',
        'onresize',
        'onunload',
        'open',
        'opener',
        'opera',
        'outerHeight',
        'outerWidth',
        'pageXOffset',
        'pageYOffset',
        'parent',
        'print',
        'removeEventListener',
        'resizeBy',
        'resizeTo',
        'screen',
        'screenLeft',
        'screenTop',
        'screenX',
        'screenY',
        'scroll',
        'scrollbars',
        'scrollBy',
        'scrollTo',
        'scrollX',
        'scrollY',
        'self',
        'status',
        'statusbar',
        'stop',
        'toolbar',
        'top',
      ],

      // prettier
      'prettier/prettier': ['error'],

      // react
      'react/jsx-no-useless-fragment': ['error', { allowExpressions: true }],
      'react/no-unstable-nested-components': ['error', { allowAsProps: true }],
      'react/jsx-boolean-value': ['error'],
      'react/jsx-no-duplicate-props': ['error'],
      'react/no-deprecated': ['error'],
      'react/self-closing-comp': ['error'],
      'react/jsx-no-comment-textnodes': ['error'],
      'react/no-children-prop': ['error'],
      'react/void-dom-elements-no-children': ['error'],
      'react/jsx-curly-brace-presence': ['error'],
      'react/button-has-type': ['error'],
      'react/jsx-fragments': ['error', 'syntax'],
      'react/jsx-no-constructed-context-values': ['error'],
      'react-hooks/rules-of-hooks': ['error'],
      'react-hooks/exhaustive-deps': ['error'],

      // import
      'import/no-duplicates': ['error'],
      'import/newline-after-import': ['error'],
      'import/no-named-default': ['error'],
      'import/no-self-import': ['error'],
      'import/no-cycle': ['error', { maxDepth: 1 }],
      'import/no-useless-path-segments': ['error', { noUselessIndex: true, commonjs: true }],
      'import/order': [
        'error',
        {
          named: true,
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],

      // jsx-a11y
      'jsx-a11y/alt-text': [
        'error',
        { elements: ['img', 'object', 'area', 'input[type="image"]'] },
      ],
      'jsx-a11y/anchor-has-content': ['error'],
      'jsx-a11y/anchor-is-valid': [
        'error',
        {
          components: ['Link'],
          specialLink: ['to'],
          aspects: ['noHref', 'invalidHref', 'preferButton'],
        },
      ],
      'jsx-a11y/aria-activedescendant-has-tabindex': ['error'],
      'jsx-a11y/aria-props': ['error'],
      'jsx-a11y/aria-proptypes': ['error'],
      'jsx-a11y/aria-role': ['error'],
      'jsx-a11y/aria-unsupported-elements': ['error'],
      'jsx-a11y/autocomplete-valid': ['error'],
      'jsx-a11y/click-events-have-key-events': ['error'],
      'jsx-a11y/heading-has-content': ['error'],
      'jsx-a11y/html-has-lang': ['error'],
      'jsx-a11y/iframe-has-title': ['error'],
      'jsx-a11y/img-redundant-alt': ['error'],
      'jsx-a11y/interactive-supports-focus': ['error'],
      'jsx-a11y/lang': ['error'],
      'jsx-a11y/mouse-events-have-key-events': ['error'],
      'jsx-a11y/no-access-key': ['error'],
      'jsx-a11y/no-aria-hidden-on-focusable': ['error'],
      'jsx-a11y/no-distracting-elements': ['error', { elements: ['marquee', 'blink'] }],
      'jsx-a11y/no-interactive-element-to-noninteractive-role': [
        'error',
        { tr: ['none', 'presentation'] },
      ],
      'jsx-a11y/no-noninteractive-element-interactions': [
        'error',
        { handlers: ['onClick', 'onMouseDown', 'onMouseUp', 'onKeyPress', 'onKeyDown', 'onKeyUp'] },
      ],
      'jsx-a11y/no-noninteractive-element-to-interactive-role': [
        'error',
        {
          ul: ['listbox', 'menu', 'menubar', 'radiogroup', 'tablist', 'tree', 'treegrid'],
          ol: ['listbox', 'menu', 'menubar', 'radiogroup', 'tablist', 'tree', 'treegrid'],
          li: ['menuitem', 'option', 'row', 'tab', 'treeitem'],
          table: ['grid'],
          td: ['gridcell'],
        },
      ],
      'jsx-a11y/no-noninteractive-tabindex': ['error', { roles: ['tabpanel'] }],
      'jsx-a11y/no-redundant-roles': ['error'],
      'jsx-a11y/no-static-element-interactions': [
        'error',
        { handlers: ['onClick', 'onMouseDown', 'onMouseUp', 'onKeyPress', 'onKeyDown', 'onKeyUp'] },
      ],
      'jsx-a11y/prefer-tag-over-role': ['error'],
      'jsx-a11y/role-has-required-aria-props': ['error'],
      'jsx-a11y/role-supports-aria-props': ['error'],
      'jsx-a11y/scope': ['error'],
      'jsx-a11y/tabindex-no-positive': ['error'],

      // @typescript-eslint
      '@typescript-eslint/method-signature-style': ['error'],
      '@typescript-eslint/no-array-constructor': ['error'],
      '@typescript-eslint/no-explicit-any': ['error'],
      '@typescript-eslint/no-non-null-assertion': 'error',
      '@typescript-eslint/no-unused-vars': ['warn', { varsIgnorePattern: '^_' }],
      '@typescript-eslint/prefer-as-const': ['error'],
      '@typescript-eslint/no-unsafe-declaration-merging': 'error',
    },
  }),
];
