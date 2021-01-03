const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    vendor: [
      'vue-router', 'vuex', 'vue/dist/vue.common.js',
      'vue/dist/vue.js',
      'vue',
    ],
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].dll.js',
    library: '[name]_library',
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.resolve(__dirname, '../dist', '[name]-manifest.json'),
      name: '[name]_library',
    }),
    // 替换为正常的
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: {
    //     warnings: false
    //   }
    // })
  ],
};
