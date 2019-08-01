const merge = require('webpack-merge');
// const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const common = require('./common.js');
const commonOptions = require('./commonOptions');

// babel-presets-react-app需要配置node babel env
process.env.NODE_ENV = 'production';
process.env.BABEL_ENV = 'production';
module.exports = merge(common, {
  // mode 会执行uglyfyjs
  mode: 'production',
  // 生产环境 跟踪bug  source-map浪费资源，可以适当去掉,设置为none
  devtool: 'source-map',
  plugins: [

    // 提取css到单独文件的插件
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].[hash].css',
      chunkFilename: '[id].[hash].css',
    }),
  ],
  output: {
    filename: '[name].[chunkhash].js',
  },
  module: {
    rules: [
      // 编译less为css以下都需要配置
      {
        test: /\.(le|c)ss$/,
        use: [
          // 提取css到单独文件的loader
          // MiniCssExtractPlugin 需要在plugin再声明plugin
          MiniCssExtractPlugin.loader,
          ...commonOptions.commonCssLoader,
        ],

      },
    ],
  },
});
