'use strict';

const webpack = require('webpack');
const helpers = require('./helpers');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const stylusLoader = require('stylus-loader');
// const webpackMerge = require('webpack-merge');
const CopyWebpackPlugin = require("copy-webpack-plugin");
//
const nib = require('nib');
const config = require('./config/config');

module.exports = {
  entry: {
    'app': './src/index'
  },

  output: {
    path: helpers.root('dist'),
    publicPath: '/',
    filename: 'build/[name].[hash].js',
    chunkFilename: 'build/[id].[hash].chunk.js'
  },

  resolve: {
    extensions: ['*', '.js', '.styl', '.css'],
    alias: {
      styles: helpers.root('src/assets/css')
    }
  },

  module: {
    rules: [
      {
        test: /\.js?$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract(
          { fallback: 'style-loader', use: 'css-loader' }
        )
      },
      {
        test: /\.styl$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'stylus-loader'
          }
        ],
        exclude: helpers.root('src', 'app')
      },
      {
        test: /\.styl$/,
        use: ["raw-loader", "stylus-loader"],
        include: helpers.root('src', 'app')
      },
      {
        test: /\.(svg|woff|woff2|ttf|eot)$/,
        use: 'file-loader?name=assets/fonts/[name].[ext]'
      },
    ]
  },

  plugins: [
    new stylusLoader.OptionsPlugin({
      default: {
        use: [nib()],
      }
    }),
    new ExtractTextPlugin({filename: 'assets/css/[name].css', allChunks: true}),

    new CopyWebpackPlugin([
      { from: helpers.root('node_modules/font-awesome/fonts/'), to: 'assets/fonts'},
    ],{
      debug:true
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      chunks: ['app'],
      minChunks: function (module) {
        // this assumes your vendor imports exist in the node_modules directory
        return module.context && module.context.indexOf('node_modules') !== -1;
      }
    }),
        new webpack.optimize.CommonsChunkPlugin({
      name: 'polyfills'
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
  ],

  devServer: {
    contentBase: helpers.root('dist'),
    historyApiFallback: true,
    stats: 'minimal',
    publicPath: '/',
    compress: true,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    },
    hot: true,
    port: config.port
  }
};
