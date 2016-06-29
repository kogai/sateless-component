const webpack = require('webpack');

const webpackConfig = {
  cache: !process.env.CI,
  devtool: 'inline-source-map',
  entry: {
    vendor: [
      'react',
      'react-dom',
    ],
    app: "./src/app.tsx",
  },
  output: {
    filename: "[name].bundle.js",
    path: './dist',
  },
  devtool: "inline-source-map",

  resolve: {
    extensions: ['', '.ts', ".tsx", ".js"],
  },

  module: {
    loaders: [
      { test: /\.tsx?$/, loader: "ts-loader" }
    ],
    preLoaders: [
      { test: /\.js$/, loader: "source-map-loader" }
    ]
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
