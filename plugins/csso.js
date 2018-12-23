import { createFilter } from 'rollup-pluginutils';
import { minify } from 'csso';

export default (options = {}) => {
  const include = '**/*.css';
  const exclude = '';

  const filter = createFilter(include, exclude);

  return {
    name: 'csso',

    generateBundle: (code) => minify(code, options).css,
  };
};
