import { minify } from 'terser';

export default (options = {}) => ({
  name: 'terser',

  renderChunk: (code) => minify(code, options),
});
