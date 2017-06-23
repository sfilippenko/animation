const webpack = require('webpack');
const path = require('path');

const NODE_ENV = process.env.NODE_ENV;

module.exports = {
    devtool: NODE_ENV === 'production' ? false : 'source-map',
    entry: ['./src/index'],
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js',
        publicPath: '/assets/'
    },

    resolve: {
        extensions: ['.js', '.jsx']
    },

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                include: path.join(__dirname, 'src'),
                use: [
                    {loader: 'babel-loader'}
                ]
            },
            {
                test: /\.s?css$/,
                use: [
                    {loader: "style-loader"},
                    {loader: "css-loader"},
                    {loader: "sass-loader"}
                ]
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                include: path.join(__dirname, 'images'),
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192
                        }
                    }
                ]
            }
        ]
    }
};