const webpack = require('webpack');
const webpackConfig = require('webpack.config');

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      '{,*/}*.spec.{ts,tsx}',
    ],
    exclude: [],
    preprocessors: {
      ['{,*/}*.spec.{ts,tsx}']: ['webpack'],
    },
    reporters: ['mocha'],
    mochaReporter: {
      ignoreSkipped: true,
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    // logLevel: config.LOG_DEBUG,
    autoWatch: true,
    browsers: [/*'Chrome', 'Firefox', 'Opera', 'IE', 'Safari', */'PhantomJS'],
    singleRun: false,
    concurrency: Infinity,
    plugins: [
      require('karma-webpack'),
      require('karma-jasmine'),
      require('karma-mocha-reporter'),
      require('karma-phantomjs-launcher'),
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
  })
}
