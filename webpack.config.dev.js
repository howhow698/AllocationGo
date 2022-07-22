const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.config.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    open: true,
    port: 9000,
    hot: true,
    static: {
      directory: path.resolve(__dirname, './dist'),
      publicPath: '/dist',
    },
  },
});
