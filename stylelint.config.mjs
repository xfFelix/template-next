/** @type {import('stylelint').Config} */
export default {
  extends: ['stylelint-config-standard', 'stylelint-config-rational-order', 'stylelint-config-standard-scss', 'stylelint-config-prettier'],
  plugins: ['stylelint-order'],
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
    'font-family-no-missing-generic-family-keyword': null
  },
  ignoreFiles: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx']
};