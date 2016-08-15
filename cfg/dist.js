'use strict';

let path = require('path');
let webpack = require('webpack');

let baseConfig = require('./base');
let defaultSettings = require('./defaults');

// Add needed plugins here
let BowerWebpackPlugin = require('bower-webpack-plugin');

let config = Object.assign({}, baseConfig, {
  entry: {
    app:path.join(__dirname, '../src/app'),
    //设置一个vender数组，里面是第三方库
    venders: ['react','react-dom'],
    //d3:['d3'],
    //reactStockcharts:['react-stockcharts']
    //'react': ['react'],
    //'reactDom': ['react-dom']
  },
  cache: false,
  devtool: 'source-map',
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    }),
    new BowerWebpackPlugin({
      searchResolveModulesDirectories: false
    }),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.NoErrorsPlugin(),
    //将venders数组下的第三方库统一打包为一个venders.js的文件
    new webpack.optimize.CommonsChunkPlugin('venders', 'venders.js')
    //new webpack.optimize.CommonsChunkPlugin({names: ['react', 'reactDom'], filename: '[name].js'})
  ],
  module: defaultSettings.getDefaultModules()
});

// Add needed loaders to the defaults here
config.module.loaders.push({
  test: /\.(js|jsx)$/,
  loader: 'babel-loader',
  include: [].concat(
    config.additionalPaths,
    [ path.join(__dirname, '/../src') ]
  )
});

module.exports = config;
