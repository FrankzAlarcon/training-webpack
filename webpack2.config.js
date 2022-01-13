const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const Dotenv = require('dotenv-webpack');

/**@type {import('webpack').Configuration} */
const webpackConfiguration = {
  entry: path.resolve(__dirname, 'src/index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    assetModuleFilename: 'assets/images/[hash][ext]',
    filename: 'main.js'
  },
  resolve: {
    extensions: [
      '.js'
    ],
    alias: {
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@styles': path.resolve(__dirname, 'src/styles'),
      '@templates': path.resolve(__dirname, 'src/templates'),
      '@images': path.resolve(__dirname, 'src/assets/images'),
    }
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      },
      {
        test: /\.png$/,
        type: 'asset/resource'
      },
      {
        test: /\.(woff|woff2)$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/fonts/[name][ext]'
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(__dirname, 'public/index.html'),
      filename: 'index.html'
    }),
    new MiniCssExtractPlugin(),
    new Dotenv()
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerWebpackPlugin(),
      new TerserWebpackPlugin()
    ]
  }
}

module.exports = {
  ...webpackConfiguration
}