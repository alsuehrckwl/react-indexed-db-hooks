import babel from 'rollup-plugin-babel';
import pkg from './package.json';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';

const extensions = ['.js'];

// process.env.BABEL_ENV = 'production'

export default {
  input: './src/index.js', 
  plugins: [
    peerDepsExternal(),
    babel({ extensions, include: ['src/**/*'], runtimeHelpers: true }),
  ],
  output: [
    {
      file: pkg.module,
      format: 'es'
    }
  ]
};
