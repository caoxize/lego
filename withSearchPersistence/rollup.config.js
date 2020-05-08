import clear from 'rollup-plugin-clear';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';

export default [
  {
    input: 'src/index.jsx',
    external: ['react', 'react-dom', 'prop-types', 'core-js'],
    output: {
      file: 'lib/bundle.js',
      format: 'cjs',
    },
    plugins: [
      clear({
        targets: ['lib', 'dist'],
      }),
      resolve(),
      commonjs(),
      babel({
        exclude: 'node_modules/**',
      }),
      terser(),
    ],
  },
];
