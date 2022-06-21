const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
	entry: {
		app: ['./demo/sample.js', './src/index.js'],
	},
	plugins: [
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: './demo/index.html',
		}),
	],
	mode: 'development',
	devtool: 'inline-source-map',
	devServer: {
		contentBase: './demo',
		port: 8080
	},
});
