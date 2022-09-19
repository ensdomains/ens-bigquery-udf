import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
  input: ['src/index.js'],
  output: {
    file: 'dist/eth-ens-namehash-2-0-8.js',
  },
  plugins: [commonjs(), nodeResolve({ browser: true, preferBuiltins:false })]
};
