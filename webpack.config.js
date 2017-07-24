const path = require('path');

module.exports = {
  entry: path.resolve('www/js/app.js'),

  output: {
    path: path.resolve('www/js/'),
    filename: "index.js",
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
      {
        test: /.json$/, loader: 'json-loader',
      },
    ],
  },

  resolve: {
    alias: {
      _components: path.resolve('www/js/components'),
      _utils: path.resolve('www/js/utils'),
      _styles: path.resolve('www/styles'),
    },
  }
}
