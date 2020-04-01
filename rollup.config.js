import babel from 'rollup-plugin-babel';
import pkg from './package.json';

const extensions = ['.js'];

// process.env.BABEL_ENV = 'production'

export default {
  input: './src/index.js', 
  plugins: [
    babel({ extensions, include: ['src/**/*'], runtimeHelpers: true }),
  ],
  output: [
    {
      file: pkg.module,
      format: 'es'
    }
  ]
};
