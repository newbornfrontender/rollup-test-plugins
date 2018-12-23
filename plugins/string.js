import { createFilter } from 'rollup-pluginutils';

export default ({ include = '', exclude = '' }) => {
  const filter = createFilter(include, exclude);

  return {
    name: 'string',

    transform(code, id) {
      if (!filter(id)) return;

      return {
        code: `export default ${JSON.stringify(code)};`,
      };
    },
  };
};
