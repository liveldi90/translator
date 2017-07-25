var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');

module.exports = {
  entry: path.resolve('www/js/app.js'),

  output: {
    path: path.resolve('www/build/'),
    filename: "main.js",
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        loader: [ 'style-loader', 'css-loader' ],
        // loader: ExtractTextPlugin.extract({
        //   fallback: 'style-loader',
        //   use: [ 'css-loader', 'postcss-loader' ],
        // })
      },
      {
        test: /.json$/, loader: 'json-loader',
      },
      {
        test: /\.(png|woff|woff2|jpg|eot|ttf|svg|gif)$/,
        loader: 'url-loader?limit=10000',
      },
    ],
  },

  plugins: [
  ],

  resolve: {
    alias: {
      _components: path.resolve('www/js/components'),
      _utils: path.resolve('www/js/utils'),
      _styles: path.resolve('www/css'),
    },
  }
}
