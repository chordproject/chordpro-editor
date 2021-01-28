const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: {
        app: './src/index.js'
    },
    plugins: [
        new CleanWebpackPlugin(),
    ],
    output: {
        filename: 'chordproject-editor.bundle.js',
        path: path.resolve(__dirname, 'dist'),
        library: 'ChordProjectEditor',
        libraryTarget: 'umd'
    },
    module: {
        rules: [{
            test: /\.m?js$/,
            exclude: /(node_modules)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
            }
        }]
    }
};