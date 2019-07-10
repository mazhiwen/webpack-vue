const merge = require('webpack-merge');
// const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const common = require('./common.js');


// babel-presets-react-app需要配置node babel env
process.env.NODE_ENV = 'production';
process.env.BABEL_ENV = 'production';
module.exports = merge(common, {
  // mode 会执行uglyfyjs
  mode: 'production',
  // 生产环境 跟踪bug  source-map浪费资源，可以适当去掉,设置为none
  devtool: 'source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
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
          {
            loader: 'css-loader', // translates CSS into CommonJS
            options: {
              sourceMap: true,
              // 对less 启用css_module
              // 同时可用于.vue的style内
              // 开启 CSS Modules
              // modules: true,
              // 自定义生成的类名
              // localIdentName: '[local]_[hash:base64:8]'
            },
          }, {
            loader: 'less-loader', // compiles Less to CSS
            options: {
              sourceMap: true,
            },
          },
          {
            // vue单页面组件less变量全局loader
            loader: 'sass-resources-loader',
            options: {
              sourceMap: true,
              resources: [
                path.resolve(__dirname, '../src/styles/variables.less'),
              ],
            },
          },
        ],

      },
    ],
  },
});
