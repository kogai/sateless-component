const webpack = require('webpack');
const webpackConfig = require('webpack.config');
const isCI = process.env.CI;

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      '{,*/}*.spec.{ts,tsx}',
    ],
    exclude: [],
    preprocessors: {
      ['{,*/}*.spec.{ts,tsx}']: ['webpack', 'coverage'],
    },
    reporters: ['mocha', 'coverage'],
    mochaReporter: {
      ignoreSkipped: true,
    },
    port: 9876,
    colors: true,
    logLevel: isCI ? config.LOG_DEBUG : config.LOG_INFO,
    browsers: [/*'Chrome', 'Firefox', 'Opera', 'IE', 'Safari', */'PhantomJS'],
    autoWatch: !isCI,
    singleRun: isCI,
    concurrency: Infinity,
    plugins: [
      require('karma-webpack'),
      require('karma-jasmine'),
      require('karma-mocha-reporter'),
      require('karma-phantomjs-launcher'),
      require('karma-coverage'),
    ],

    webpack: {
      cache: webpackConfig.cache,
      devtool: webpackConfig.devtool,
      module: webpackConfig.module,
      resolve: webpackConfig.resolve,
      plugins: webpackConfig.plugins
        .filter((p) => !(p instanceof webpack.optimize.CommonsChunkPlugin)),
    },
    webpackMiddleware: {
      quiet: true,
      noInfo: true,
    },
    coverageReporter: {
      type : 'lcov',
      dir : isCI ? process.env.CIRCLE_ARTIFACTS : 'coverage',
    }
  })
}
