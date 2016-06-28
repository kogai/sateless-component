const webpackConfig = require('webpack.config');

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['mocha'],
    files: [
      // 'node_modules/babel-polyfill/dist/polyfill.js',
      '*.spec.js'
    ],
    exclude: [
    ],
    preprocessors: {
      ['*.js']: ['webpack']
    },
    reporters: ['mocha', 'coverage'],
    mochaReporter: {
      ignoreSkipped: true,
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: [/*'Chrome', 'Firefox', 'Opera', 'IE', 'Safari', */'PhantomJS'],
    singleRun: false,
    concurrency: Infinity,
    plugins: [
      require('karma-webpack'),
      require('karma-mocha'),
      require('karma-mocha-reporter'),
      require('karma-coverage'),
      require('karma-phantomjs-launcher'),
    ],
    webpack: webpackConfig,
    /*
    webpack: {
      cache: webpackConfig.cache,
      devtool: webpackConfig.devtool,
      resolve: webpackConfig.resolve,
      plugins: webpackConfig.plugins,
      module: webpackConfig.module,
      // node: {
      //   fs: 'empty',
      // },
    },
    */
    webpackMiddleware: {
      noInfo: true,
    },
  })
}
