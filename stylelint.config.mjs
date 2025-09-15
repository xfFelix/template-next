/** @type {import('stylelint').Config} */
export default {
  extends: ['stylelint-config-standard-scss', 'stylelint-prettier/recommended'],
  rules: {
    'no-empty-source': null,
    'selector-class-pattern': null,
    'no-descending-specificity': null,
    'no-duplicate-selectors': null,
    'color-function-notation': null,
    'selector-pseudo-class-no-unknown': [
      true,
      {
        'ignorePseudoClasses': ['host', 'global']
      }
    ],
    'at-rule-no-unknown': null,
    'font-family-no-missing-generic-family-keyword': null,
    'prettier/prettier': [
      true,
      {
        'singleQuote': true,
        'tabWidth': 2,
        'printWidth': 100,
        'endOfLine': 'auto'
      }
    ]
  },
  ignoreFiles: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx']
};