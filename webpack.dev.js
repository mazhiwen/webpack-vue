const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');

// babel-presets-react-app需要配置node babel env
process.env.NODE_ENV = 'development';
process.env.BABEL_ENV = 'development';

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  // devtool: 'eval',
  //使用 webpack-dev-server
  devServer:{
    //开发启动服务目录
    contentBase: './dist',
    //webpack-dev-server热更新
    hot: true
  },
  plugins:[
    new webpack.NamedModulesPlugin(),//热更新相关
    new webpack.HotModuleReplacementPlugin()//热更新相关
  ],
  output:{
    filename: '[name].bundle.js'
  },

});