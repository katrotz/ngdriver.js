import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import { uglify } from "rollup-plugin-uglify";

const production = process.env.BUILD === 'production';

export default {
  input: 'src/ngdriver.module.ts',
  output: {
    name: 'ngdriver',
    file: `lib/ngdriver${production ? '.min' : ''}.js`,
    format: 'umd',
    sourcemap: true,
    globals: {
      angular: 'angular',
      'driver.js': 'Driver'
    }
  },
  external: [ 'angular', 'driver.js' ],
  plugins: [
    resolve({
      extensions: [ '.ts', '.js', '.json' ]
    }),
    babel({
      extensions: [ '.ts', '.js', '.json' ]
    }),
    production && uglify()
  ]
}
