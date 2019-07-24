// rollup.config.js
import nodeResolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs'
import postcss from 'rollup-plugin-postcss'

export default {
  input: 'src/index.jsx',
  output: {
    file: 'dist/bundle.js',
    format: 'umd',
    name: 'formik-reactstrap-widgets'
  },
  plugins: [
    // pass custom options to the resolve plugin
    nodeResolve({
      extensions: ['.js', '.jsx']
    }),
    commonjs(),
    postcss(),
    babel({
      babelrc: false,
      presets: [
        [
          '@babel/env',
          {
            loose: true,
            modules: false,
            targets: {
              ie: 9
            }
          }
        ],
        '@babel/react'
      ],
    })
  ],
  // indicate which modules should be treated as external
  external: ['react', 'react-dom']
};