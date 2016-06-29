const webpack = require('webpack');

const webpackConfig = {
  cache: !process.env.CI,
  devtool: 'source-map',
  entry: {
    vendor: [
      'react',
      'react-dom',
      'lodash',
    ],
    app: "./src/app.tsx",
  },
  output: {
    filename: "[name].bundle.js",
    path: './dist',
  },

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
    new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.bundle.js"),
  ],
};

if (process.env.NODE_ENV === "production") {
  webpackConfig.plugins.push(new webpack.optimize.UglifyJsPlugin({
    output: {
      comments: false,
    },
    compress: {
      unused: true,
      dead_code: true,
      warnings: false,
      drop_console: true,
    },
  }));
}

module.exports = webpackConfig;
