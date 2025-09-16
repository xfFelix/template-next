import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [...compat.config({
  extends: ['next/core-web-vitals', 'next/typescript', 'prettier'],
  rules: {
    'react/no-unstable-nested-components': 'off',
    'class-methods-use-this': 'off',
    'func-names': 'off',
    'guard-for-in': 'off',
    'linebreak-style': [
      'error',
      'unix'
    ],
    'max-classes-per-file': 'off',
    'no-cond-assign': [
      'error',
      'except-parens'
    ],
    'no-console': 'off',
    'no-continue': 'off',
    'no-nested-ternary': 'off',
    'no-param-reassign': 'off',
    'no-restricted-exports': 'off',
    'no-restricted-syntax': 'off',
    'react/no-array-index-key': 'error',
    'no-shadow': 'off',
    'no-underscore-dangle': 'off',
    'no-unused-expressions': [
      'error',
      {
        'allowTernary': true,
        'allowShortCircuit': true,
        'allowTaggedTemplates': true,
        'enforceForJSX': false
      }
    ],
    '@typescript-eslint/no-unused-expressions': [
      'error',
      {
        'allowTernary': true,
        'allowShortCircuit': true,
        'allowTaggedTemplates': true,
        'enforceForJSX': false
      }
    ],
    'no-unused-vars': 'off', // handle by `@typescript-eslint/no-unused-vars`
    'prefer-destructuring': 'off',
    'quotes': [
      'error',
      'single'
    ],
    'semi': [
      'error',
      'always'
    ],
    'spaced-comment': [
      'error',
      'always',
      {
        'markers': [
          '/'
        ]
      }
    ],
    'import/extensions': [
      'error',
      'never',
      {
        'json': 'always',
        'css': 'always',
        'svg': 'always',
        'jpeg': 'always',
        'jpg': 'always',
        'png': 'always'
      }
    ],
    'import/prefer-default-export': 'off',
    'import/no-cycle': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/no-unresolved': 'off',
    'import/no-relative-packages': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/control-has-associated-label': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
    'jsx-a11y/media-has-caption': 'off',
    'jsx-a11y/no-noninteractive-element-interactions': 'off',
    'react/function-component-definition': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-no-bind': 'off',
    'react/no-unknown-property': 'off',
    'react/button-has-type': 'off',
    'react/jsx-filename-extension': [
      'error',
      {
        'extensions': [
          '.jsx',
          '.tsx'
        ]
      }
    ],
    'react/jsx-props-no-spreading': 'off',
    'react/no-unused-prop-types': 'off',
    'react/require-default-props': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    // "@typescript-eslint/no-explicit-any": "off",
    'no-use-before-define': [
      'error',
      {
        'functions': false,
        'classes': true,
        'variables': true
      }
    ],
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        'vars': 'all',
        'args': 'after-used',
        'caughtErrors': 'all',
        'ignoreRestSiblings': true,
        'argsIgnorePattern': '^_'
      }
    ],
    '@typescript-eslint/no-var-requires': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
    'react-hooks/exhaustive-deps': 'off',
    'import/no-anonymous-default-export': ['warn', {
      'allowArray': false,
      'allowArrowFunction': false,
      'allowAnonymousClass': false,
      'allowAnonymousFunction': false,
      'allowCallExpression': true, // The true value here is for backward compatibility
      'allowNew': false,
      'allowLiteral': false,
      'allowObject': true
    }],
    '@typescript-eslint/no-empty-object-type': 'off'
  }
}), {
  ignores: [
    'node_modules/**',
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
  ],
}];

export default eslintConfig;
