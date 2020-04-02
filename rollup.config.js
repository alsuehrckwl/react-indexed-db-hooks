import babel from 'rollup-plugin-babel';
import pkg from './package.json';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import minify from 'rollup-plugin-babel-minify';

const extensions = ['.js'];

process.env.BABEL_ENV = 'production'

export default {
  input: './src/index.js', 
  plugins: [
    peerDepsExternal(),
    babel({ extensions, include: ['src/**/*'], runtimeHelpers: true }),
    minify()
  ],
  output: [
    {
      file: pkg.module,
      format: 'es'
    }
  ]
};
