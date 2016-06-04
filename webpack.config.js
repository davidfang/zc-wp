/**
 * Created by david_fang on 2016/6/5.
 */
var path = require('path');
var webpack = require('webpack');

var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'app');
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');

module.exports= {
    //页面入口文件配置
    entry: {
        //iindex: path.resolve(APP_PATH, 'index.jsx')//,
        ndex:  './app/index.jsx'//,
        //支持数组形式，将加载数组中的所有模块，但以最后一个模块作为输出
        //page2: ["./entry1", "./entry2"]
    },
    //入口文件输出配置
    output: {
        //path: path.join(BUILD_PATH, "js"),
        //path: BUILD_PATH,
        path: './build/',
        filename: '[name].js'
    },
    //enable dev source map
    devtool: 'eval-source-map',
    //enable dev server
    devServer: {
        historyApiFallback: true,
        hot: true,
        inline: true,
        progress: true
    },

    module: {
        //加载器配置
        loaders: [
            //.css 文件使用 style-loader 和 css-loader 来处理
            { test: /\.css$/, loader: 'style-loader!css-loader' },
            //.js 文件使用 jsx-loader 来编译处理
            { test: /\.(js|jsx)$/, loaders: ["babel"] },
            //.scss 文件使用 style-loader、css-loader 和 sass-loader 来编译处理
            { test: /\.scss$/, loader: 'style!css!sass?sourceMap'},
            //图片文件使用 url-loader 来处理，小于8kb的直接转为base64
            { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'}
        ]
    },
    //插件项
    plugins: [
        //向合并后的文件插入版权信息
        new webpack.BannerPlugin('This file is created by David Fang'),
        //它用于提取多个入口文件的公共脚本部分，然后生成一个 common.js 来方便多页面之间进行复用
        //new webpack.optimize.CommonsChunkPlugin('common.js')
    ],
    //其它解决方案配置
    resolve: {
        //查找module的话从这里开始查找
        //root: [
        //    path.resolve('./app/modules'),
        //    path.resolve('./vendor/modules')
       //],
        //模块别名定义，方便后续直接引用别名，无须多写长长的地址
        //alias: {
        //    AppStore : 'js/stores/AppStores.js',//后续直接 require('AppStore') 即可
        //    ActionType : 'js/actions/ActionType.js',
        //    AppAction : 'js/actions/AppAction.js'
        //},
        //自动扩展文件后缀名，意味着我们require模块可以省略不写后缀名
        extensions: ['', '.js', '.jsx']
    }
}
