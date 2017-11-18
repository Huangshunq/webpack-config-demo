const path = require('path');
const webpack = require('webpack');
const HtmlwebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// 路径
const ROOT_PATH = path.resolve(__dirname);
const APP_PATH = path.resolve(ROOT_PATH, 'app');
const BUILD_PATH = path.resolve(ROOT_PATH, 'build');
const TEM_PATH = path.resolve(APP_PATH, 'templates');

module.exports = {
    // 项目的文件夹，可以直接用文件夹名称，默认会找 index.js，也可以确定是哪个文件名字
    entry: {
        "pageA": path.resolve(APP_PATH, 'pageA'),
        "pageB": path.resolve(APP_PATH, 'pageB'),
        // 添加要打包在 vendors 里面的库
        vendors: ['jquery', 'moment']
    },
    //输出的文件名，根据 entry的入口文件名称生成多个js文件
    output: {
        path: BUILD_PATH,
        filename: '[name]/js/[name].[hash].js',
        publicPath: '/'
    },
    // webpack-dev-server
    devServer: { // 如果没有 devServer 选项， 则以默认配置开启调试服务器，根目录为项目根目录
        contentBase: "./index",//本地服务器所默认加载的页面所在的目录，404时展现的目录下页面源于此
        historyApiFallback: true, //不跳转
        port: "8888",//设置默认监听端口，如果省略，默认为”8080“
        hot: true,
        inline: true, //实时刷新
        open: true //自动打开浏览器
    },
    // 配置 loader
    module: {
        loaders: [
            {
                test: /\.(jsx|js)$/,
                include: APP_PATH,
                exclude: /node_modules/,
                use: {
                    loader: 'jshint-loader',
                    options: {
                        // 配置 jshint 的选项，支持 es6 的校验
                        esnext: true
                    }
                },
                enforce: 'pre'
            },
            {
                test: /\.(jsx|js)$/,
                loader: 'babel-loader',
                include: APP_PATH,
                query: {
                    presets: ['es2015']
                }
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'url-loader?limit=40000'
            },
            {
                test: /\.scss$/,
                // 提取 css 文件
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                }),
                // 不提取 css 文件的做法
                // loaders: ['style-loader', 'css-loader?sourceMap', 'sass-loader?sourceMap'],
                include: APP_PATH
            }
        ]
    },
    // 会自动生成一个 html文件
    plugins: [
        // 使用 uglifyjs 压缩你的代码
        new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            mangle: true
        }),
        // 打包 vendors
        new webpack.optimize.CommonsChunkPlugin({
            name:'vendors',
            filename:'public/vendors.js'
        }),
        new HtmlwebpackPlugin({
            title: 'pageA',
            template: path.resolve(TEM_PATH, 'pageA.html'),
            filename: 'pageA/pageA.html',
            //chunks这个参数告诉插件要引用entry里面的哪几个入口
            chunks: ['pageA', 'vendors'],
            //要把script插入到标签里
            inject: 'body'
        }),
        new HtmlwebpackPlugin({
            title: 'pageB',
            template: path.resolve(TEM_PATH, 'pageB.html'),
            filename: 'pageB/pageB.html',
            chunks: ['pageB', 'vendors'],
            inject: 'body'
        }),
        // 提取 css 为一个文件
        new ExtractTextPlugin({
            filename: '[name]/css/style.css'
        })
    ],
    devtool: 'eval-source-map'
};
