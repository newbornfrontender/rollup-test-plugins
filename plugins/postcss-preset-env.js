import { createFilter } from 'rollup-pluginutils';
import postcssPresetEnv from 'postcss-preset-env';
import { minify } from 'csso';

const production = !process.env.ROLLUP_WATCH;

export default (options = {}) => {
  const include = '**/*.css';
  const exclude = '';

  const filter = createFilter(include, exclude);

  return {
    name: 'postcss-preset-env',

    transform(code, id) {
      if (!filter(id)) return;

      return postcssPresetEnv
        .process(code, { from: id }, options)
        .then(({ css }) => ({
          code: `export default ${JSON.stringify(
            production ? minify(css).css : css,
          )};`,
        }));
    },
  };
};
