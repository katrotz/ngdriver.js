module.exports = function(config, specificOptions) {
  config.set({
    files: [
      'node_modules/driver.js/dist/driver.min.css',
      'node_modules/driver.js/dist/driver.min.js',
      'node_modules/angular/angular.js',
      'node_modules/angular-mocks/angular-mocks.js',
      {
        pattern: 'src/ngdriver.module.ts',
        watched: false
      },
      {
        pattern: 'test/**/*.spec.js',
        watched: false
      }
    ],
    preprocessors: {
      'src/**/*.ts': ['rollup'],
      'test/**/*.spec.js': ['rollup']
    },
    rollupPreprocessor: {
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
        require('rollup-plugin-node-resolve')({
          extensions: [ '.ts', '.js', '.json' ]
        }),
        require('rollup-plugin-babel')({
          extensions: [ '.ts', '.js', '.json' ]
        })
      ]
    },
    mime: {
      'text/x-typescript': ['ts','tsx']
    },
    frameworks: ['jasmine'],
    autoWatch: true,
    logLevel: config.LOG_INFO,
    logColors: true,
    browsers: [
      'ChromeHeadless'
      // 'Chrome'
    ],
    browserDisconnectTimeout: 10000,
    browserDisconnectTolerance: 2,
    browserNoActivityTimeout: 30000,
    reporters: [
      // 'dots',
      'progress'
    ],
    specReporter: {
      maxLogLines: 5,             // limit number of lines logged per test
      suppressErrorSummary: true, // do not print error summary
      suppressFailed: false,      // do not print information about failed tests
      suppressPassed: true,      // do not print information about passed tests
      suppressSkipped: false,      // do not print information about skipped tests
      showSpecTiming: false,      // print the time elapsed for each spec
      failFast: false              // test would finish with error when a first fail occurs.
    }
  });
};