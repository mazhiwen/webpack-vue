const merge = require('webpack-merge');
const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const common = require('./common.js');

// babel-presets-react-app需要配置node babel env
process.env.NODE_ENV = 'development';
process.env.BABEL_ENV = 'development';

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  // devtool: 'eval',
  // 使用 webpack-dev-server
  devServer: {
    // 开发启动服务目录
    contentBase: path.resolve(__dirname, '../dist'),
    // webpack-dev-server热更新
    hot: true,
  },
  plugins: [
    new webpack.NamedModulesPlugin(), // 热更新相关
    new webpack.HotModuleReplacementPlugin(), // 热更新相关
    // 提取css到单独文件的插件
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],
  output: {
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
      // 编译less为css以下都需要配置
      {
        test: /\.(le|c)ss$/,
        use: [
          'vue-style-loader',
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
