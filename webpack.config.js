var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './web/index.jsx',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
    {
      test: /\.jsx$/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015', 'stage-0', 'react']
      }
    }, {
      test: /\.js$/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015', 'stage-0']
      }
    }
    ]
  },
  resolve: {
    alias: {
      data: path.resolve(__dirname, 'data'),
      web: path.resolve(__dirname, 'web'),
    },
    extensions: [ '.js', '.jsx' ],
  },
  stats: {
    colors: true
  },
  plugins: [
    new HtmlWebpackPlugin()
  ],
  devtool: 'source-map'
}
