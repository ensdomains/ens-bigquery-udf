import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
  input: ['src/ens-normalize.js'],
  output: {
    file: 'dist/ens-normalize.js'
  },
  plugins: [commonjs(), nodeResolve({ browser: true })]
};