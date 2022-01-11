const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

/**@type {import('webpack').Configuration} */
const webpackConfiguration = {
  entry: path.resolve(__dirname, 'src/index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js'
  },
  resolve: {
    extensions: [
      '.js'
    ]
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(__dirname, 'public/index.html'),
      filename: 'index.html'
    })
  ]
}

module.exports = {
  ...webpackConfiguration
}