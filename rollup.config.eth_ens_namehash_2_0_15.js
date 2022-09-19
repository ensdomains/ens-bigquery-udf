import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
// import nodePolyfills from 'rollup-plugin-polyfill-node';

export default {
  input: ['src/eth-ens-namehash-2-0-15.js'],
  output: {
    file: 'dist/eth-ens-namehash-2-0-15.js',
  },
  plugins: [commonjs(), nodeResolve({ browser: true, preferBuiltins:false })]
};
