import path from 'path';

const buildEslintCommand = (filenames) =>
  `eslint --fix ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(' ')}`;

const buildStylelintCommand = (filenames) =>
  `stylelint --fix ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(' ')}`;


export default {
  '*.{js,jsx,ts,tsx}': [buildEslintCommand],
  '*.{css,scss}': buildStylelintCommand
};