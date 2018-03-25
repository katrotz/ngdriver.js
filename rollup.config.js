import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';

export default {
  input: 'src/ngdriver.module.ts',
  output: {
    name: 'ngdriver',
    file: 'lib/ngdriver.js',
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
      exclude: 'node_modules/**'
    })
  ]
}
