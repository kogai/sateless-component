const webpack = require('webpack');

const webpackConfig = {
  cache: !process.env.CI,
  devtool: 'inline-source-map',
  entry: {
    app: "./app",
  },
  output: {
    filename: "[name].bundle.js",
    path: './dist',
  },
  resolve: {
    extensions: ['', '.js'],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
    new webpack.optimize.DedupePlugin(),
    // new webpack.optimize.UglifyJsPlugin(),
  ],
};

module.exports = webpackConfig;
