const path = require('path'); //required to create absolute path
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const postCSSPlugins = [
    require("postcss-simple-vars"), 
    require("postcss-nested"), 
    require("autoprefixer")
];

module.exports = {
    entry: {//one for each page
        'hello-world': './src/hello-world.js',
        'kiwi': './src/kiwi.js'
      },
	output: { // output JS bundle to: build/bundle.js
		path: path.resolve(__dirname, './dist'),
        filename: '[name].bundle.js',
 
        publicPath: ''
	},
    mode: 'development',
    devServer: {
        port: 8000,
        static: {
            directory: path.resolve(__dirname, './dist'),
        },
        devMiddleware: {
            index: 'index.html',
            writeToDisk: true
        }
    },
    module: { // rules and loaders for asset files
        rules: [
            {
                test: /\.(png|jpg)$/,
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: 3 * 1024
                    }
                }
            },
            {
                test: /\.txt/,
                type: 'asset/source'
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    { 
                        loader: "css-loader", 
                        options: { url: false } 
                    },
                    { 
                        loader: "postcss-loader", 
                        options: 
                        { postcssOptions: { plugins: postCSSPlugins } } 
                    }
                ]
            },
            { // transpile ES6/7 to ES5 via babel
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [ '@babel/env' ],
                        plugins: [ '@babel/plugin-transform-class-properties' ]
                    }
                }
            },
            {
                test: /\.hbs$/,
                use: [
                    'handlebars-loader'
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin({ 
            cleanOnceBeforeBuildPatterns: [
                '**/*', // cleans(removes all files) in output directory
               // path.join(process.cwd(), 'build/**/*') // cleans specified directory
            ]
        }),
        new HtmlWebpackPlugin({
                    filename: 'hello-world.html',
                    chunks: ['hello-world'],
                    title: 'Hello world',
                    description: 'Hello world',
                    template: 'src/page-template.hbs',
                    //minify: false
                }),
                new HtmlWebpackPlugin({
                    filename: 'kiwi.html',
                    chunks: ['kiwi'],
                    title: 'Kiwi',
                    description: 'Kiwi',
                    template: 'src/page-template.hbs',
                    //minify: false
                })
    ]
};

  //inject: "body",
            //hash: false