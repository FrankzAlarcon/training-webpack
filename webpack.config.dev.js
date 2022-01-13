const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');

/** @type {import('webpack').Configuration} */
const configuration = {
  //punto de entrada de la app
  entry: path.resolve(__dirname, 'src/index.js'),
  //punto de salida
  output: {
    //direccion de carpeta de salida
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    assetModuleFilename: 'assets/images/[name][ext]'
  },
  mode: 'development',//modo desarrollo
  watch: true,//espiar cambios
  resolve: {
    //extensiones que reconocerá webpack
    extensions: [
      '.js'
    ],
    alias: {//alias para distintas carpetas
      '@utils': path.resolve(__dirname, 'src/utils/'),
      '@templates': path.resolve(__dirname, 'src/templates/'),
      '@styles': path.resolve(__dirname, 'src/styles/'),
      '@images': path.resolve(__dirname, 'src/assets/images/')
    }
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
        test: /\.css$/,//extensiones de estilos que se usan en el proyecto
        use: [//Se puede especificar un arreglo
          MiniCssExtractPlugin.loader,//loaders
          'css-loader'//css-loader
        ]
      },
      {
        //loader de imagenes por defecto de webpack
        test: /\.png/,//extensiones de imagenes que se usan
        type: 'asset/resource'//tipo
      },
      {
        test: /\.(woff|woff2)$/,//extensiones de los archivos de fuentes
        type: 'asset/resource',//type que se utiliza en webpack
        generator: {
          filename: 'assets/fonts/[name][ext]'//nombre del archivo de salida
        }
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
    //mini-css-extract-plugin, se hace require y se instancia
    new MiniCssExtractPlugin({
      filename: '[name].css'//nombre del archivo de salida
    }),
    //copy-plugin, se hace require y se instacia
    new CopyPlugin({
      patterns: [//especifica los archivos que se copiaran
        {
          //desde que path se copiará
          from: path.resolve(__dirname, 'src', 'assets/images'),
          to: 'assets/images'//direccion dentro de dist
        }
      ]
    }),
    new Dotenv()
  ]
}
module.exports = {
  ...configuration
};