const merge = require('webpack-merge');
// const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common.js');
const webpack = require('webpack');


// babel-presets-react-app需要配置node babel env
process.env.NODE_ENV = 'production';
process.env.BABEL_ENV = 'production';

module.exports = merge(common, {
  //生产环境 跟踪bug  source-map浪费资源，可以适当去掉,设置为none
  devtool: 'source-map',
  plugins: [
    // new UglifyJSPlugin({
    //   //生产环境 跟踪bug
    //   sourceMap: true
    // }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ],
  output:{
    filename: '[name].[chunkhash].js',
  },  
  //mode 会执行uglyfyjs
  mode: "production"
});