const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

/** @type {import('webpack').Configuration} */
const configuration = {
  //punto de entrada de la app
  entry: path.resolve(__dirname, 'src/index.js'),
  //punto de salida
  output: {
    //direccion de carpeta de salida
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js'
  },
  resolve: {
    //extensiones que reconocerá webpack
    extensions: [
      '.js'
    ]
  },
  //Configuracion de babel
  module: {
    rules: [
      {
        test: /\.m?js$/,//extensiones que babel transpilará
        exclude: /node_modules/,//excepto node_modules
        use: {//para añadir el loader de babel
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      }
    ]
  },
  //seccion de plugins
  plugins: [
    //html-webpack-plugin, se hace require y se instancia
    new HtmlWebpackPlugin({
      inject: 'body',//insertar elementos
      template: path.resolve(__dirname, 'public/index.html'),//archivo html que se compilará
      filename: 'index.html'//nombre del archivo de salida
    }),
    new MiniCssExtractPlugin({
      filename: 'main.css'
    })
  ]
}
module.exports = {
  ...configuration
};