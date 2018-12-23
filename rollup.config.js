import nodeResolve from 'rollup-plugin-node-resolve';

// import postcssPresetEnv from './plugins/postcss-preset-env';
// import csso from './plugins/csso';
import terser from './plugins/terser';

const production = !process.env.ROLLUP_WATCH;

export default () => {
  const file = 'index';

  return {
    input: `input/${file}.js`,
    output: {
      format: 'esm',
      file: `output/${file}.js`,
    },
    plugins: [
      nodeResolve({
        jsnext: true,
        browser: true,
        modulesOnly: true,
      }),
      compileAndMinifyCSS({
        stage: 0,
        features: {
          'nesting-rules': {},
        },
        autoprefixer: production && {
          grid: true,
        },
      }),
      // production && csso(),
      production &&
        terser({
          mangle: {
            module: true,
          },
        }),
    ],
  };
};

import { createFilter } from 'rollup-pluginutils';
import postcssPresetEnv from 'postcss-preset-env';
import { minify as cssoMinify } from 'csso';

const isProd = !process.env.ROLLUP_WATCH;

function compileAndMinifyCSS(options = {}) {
  const filter = createFilter('**/*.css', '')

  return {
    transform(code, id) {
      if (!filter(id)) return;

      return postcssPresetEnv.process(code, { from: id }, options).then(({ css }) => ({
          code: `export default ${JSON.stringify(
            isProd ? cssoMinify(css).css : css,
          )};`,
        }))
    },
  };
}

// -----------------------------------------------------------------------------

// import { rollup } from 'rollup';
// import { async } from 'q';

// rollup({
//   input: `input/index.js`,
//   plugins: [
//     nodeResolve({
//       jsnext: true,
//       browser: true,
//       modulesOnly: true,
//     }),
//     htmlnano(),
//     postcss(),
//     production && terser(),
//   ],
//   experimentalCodeSplitting: true
// }).then({
//   output: {
//     format: 'esm',
//     dir: 'output',
//   },
// });

// async function build() {
//   const bundle = await rollup({
//     input: `input/index.js`,
//     plugins: [
//       nodeResolve({
//         jsnext: true,
//         browser: true,
//         modulesOnly: true,
//       }),
//       htmlnano(),
//       postcss(),
//       production && terser(),
//     ],
//     experimentalCodeSplitting: true,
//   });

//   await bundle.write({
//     output: {
//       format: 'esm',
//       dir: 'output',
//     },
//   });
// }

// build();
