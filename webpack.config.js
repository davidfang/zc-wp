/**
 * Created by david_fang on 2016/6/5.
 */
var path = require('path');
var webpack = require('webpack');

var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'app');
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');
var IMG_PATH = path.resolve(ROOT_PATH, 'img');

module.exports = {
    entry:'./entry.js',
    output:{
        path: __dirname,
        filename: 'bundle.js'
    },
    module: {
        loaders:[
            {test: /\.css$/, loader: 'style!css'}
        ]
    },
    plugins:[
        new webpack.BannerPlugin('This file is created by 方明旺')
    ]
}