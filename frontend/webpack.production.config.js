const path = require('path');
const webpack = require('webpack');
const TransferWebpackPlugin = require('transfer-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  entry: path.resolve(__dirname, './src/index.jsx'),
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'index.jsx'
  },
  module: {
    loaders: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: [{
            loader: 'babel-loader',
            options: { presets: ['react', 'es2016'] },
          }],
        }],
   
  },
  plugins: [
    new HtmlWebpackPlugin({ template: 'src/public/index.html' }),
    new webpack.NoEmitOnErrorsPlugin(),
    new UglifyJsPlugin(),
    new TransferWebpackPlugin([
      { from: 'src/public' },
    ], '.'),
    new webpack.DefinePlugin({
      'process.env': {
        ENDPOINT: JSON.stringify(process.env.ENDPOINT || 'http://0.0.0.0:9000/api'),
      },
    }),
  ],
};