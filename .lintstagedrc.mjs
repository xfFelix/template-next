import path from 'path';

const buildEslintCommand = (filenames) =>
  `next lint --fix --file ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(' --file ')}`;

const buildStylelintCommand = (filenames) =>
  `stylelint --fix ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(' ')}`;


export default {
  '*.{js,jsx,ts,tsx}': [buildEslintCommand],
  '*.{css,scss}': buildStylelintCommand
};