const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
require('dotenv').config();

const PATHS = {
  src: path.join(__dirname, './app/'),
  dist: path.join(__dirname, './dist/'),
  assets: 'assets/'
}

module.exports = {
  mode: 'production',
  //devtool: 'cheap-module-eval-source-map',
  entry: {
    app: './app/entry.js',
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].bundle.js',
  },
  devServer: {
    stats: 'errors-only',
    host: process.env.HOST,
    disableHostCheck: true,
    hot: true,
    port: process.env.PORT,
    historyApiFallback: true,
    overlay: {
      warnings: true,
      errors: true
    },
    contentBase: [
      path.join(__dirname, './dist/'),
    ],
    headers: {},
    proxy: {
      '/api': {
        target: 'https://api.ru/',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/api',
        },
      },
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        loader: 'file-loader',
        options: {
          name: 'font/[name].[ext]',
        }
      },
      {
        test: /\.(png|svg|jpg|gif|webp)$/,
        loader: 'file-loader',
        options: {
          name: 'img/[name].[ext]',
        }
      },
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[name]__[local]___[hash:base64:5]'
            }
          },
          'sass-loader'
        ]
      },
      {
        test: /\.(html)$/,
        loader: 'html-loader'
      },
      {
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: '/node_modules/'
      }
    ]
  },
  resolve: { 
    alias: {
      '~': PATHS.src,
      vue: 'vue/dist/vue.esm.js' 
    } 
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './app/index.html',
      showErrors: true,
      inject: true,
      chunks: ['app']
    }),
    new webpack.SourceMapDevToolPlugin({
      filename: "[file].map"
    }),
  ]
};