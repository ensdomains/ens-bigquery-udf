import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
// import nodePolyfills from 'rollup-plugin-polyfill-node';

export default {
  input: ['src/index.js'],
  output: {
    // format: 'iife',
    file: 'dist/eth-ens-namehash-2-0-8.js',
    // name: 'namehash',
    // external:['namehash'],
    // globals: {
    //   namehash:'Namehash'
    // }
  },
  plugins: [commonjs(), nodeResolve({ browser: true, preferBuiltins:false })]
  // plugins: [nodePolyfills(), commonjs({transformMixedEsModules:true}), nodeResolve({ browser: true })]
};
