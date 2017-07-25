var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');

module.exports = {
  entry: path.resolve('www/js/app.js'),

  output: {
    path: path.resolve('www/build/'),
    filename: 'main.js',
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        loader: [ 'style-loader', 'css-loader' ],
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [ 'css-loader', 'postcss-loader' ],
        })
      },
      {
        test: /.json$/, loader: 'json-loader',
      }
    ],
  },

  plugins: [
    new ExtractTextPlugin('styles.css')
  ],

  resolve: {
    alias: {
      _components: path.resolve('www/js/components'),
      _utils: path.resolve('www/js/utils'),
      _styles: path.resolve('www/css'),
    },
  }
}
