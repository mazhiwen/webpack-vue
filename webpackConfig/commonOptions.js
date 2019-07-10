const path = require('path');

const commonCssLoader = [{
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
},
// css处理loader
// 相关配置在 postcss.config.js文件
{
  loader: 'postcss-loader',
  options: {
    ident: 'postcss',
    config: {
      path: './webpackConfig/',
    },
  },
}, {
  loader: 'less-loader', // compiles Less to CSS
  options: {
    sourceMap: true,
  },
}, {
  // vue单页面组件less变量全局loader
  loader: 'sass-resources-loader',
  options: {
    sourceMap: true,
    resources: [
      path.resolve(__dirname, '../src/styles/variables.less'),
    ],
  },
},
];


module.exports = {
  commonCssLoader,
};
