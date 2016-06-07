'use strict';

let path = require('path');
let webpack = require('webpack');
let baseConfig = require('./base');
let defaultSettings = require('./defaults');

// Add needed plugins here
let BowerWebpackPlugin = require('bower-webpack-plugin');

let config = Object.assign({}, baseConfig, {
  entry: {
    //'webpack-dev-server/client?http://127.0.0.1:8000',
    //'webpack/hot/only-dev-server',
    app:'./src/index',
    //设置一个vender数组，里面是第三方库
    venders: ['react','react-dom']
  },
  cache: true,
  devtool: 'eval-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new BowerWebpackPlugin({
      searchResolveModulesDirectories: false
    }),
    //将venders数组下的第三方库统一打包为一个venders.js的文件
    new webpack.optimize.CommonsChunkPlugin('venders', 'venders.js')
  ],
  module: defaultSettings.getDefaultModules()
});

// Add needed loaders to the defaults here
config.module.loaders.push({
  test: /\.(js|jsx)$/,
  loader: 'react-hot!babel-loader',
  include: [].concat(
    config.additionalPaths,
    [ path.join(__dirname, '/../src') ]
  )
});

module.exports = config;
