const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

console.log(path.resolve(__dirname));
module.exports = {

  entry: {
    '@babel/polyfill': '@babel/polyfill',
    app: './src/index.js',
  },
  plugins: [
    // vueloader需要的plugin
    // 相关options选项:
    // https://vue-loader.vuejs.org/zh/options.html#transformasseturls
    new VueLoaderPlugin(),
    new CleanWebpackPlugin([path.resolve(__dirname, '../dist')], {
      root: path.resolve(__dirname, '../'),
    }),
    new HtmlWebpackPlugin({
      // 如果设置了templeta 则tile等可能以template配置为主
      // title: 'marjovenprogram',
      // template html 模版html
      // 可以使用ejs jade 等template,需要配置对应loader
      //  详情查看HtmlWebpackPlugin官方
      // template: './index.html',
      template: path.resolve(__dirname, './index.ejs'),
      // ejs template参数
      // 参数可以在ejs文件中以es template字符 :${title}
      // 或者其他查看lodash template相关配置
      templateParameters: {
        title: '系统',
      },
    }),
    new webpack.optimize.SplitChunksPlugin({
      // ************************默认
      chunks: 'all', // 默认async
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      name: 'vendors',
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
      //* **************************/
      // cacheGroups: { // 这里开始设置缓存的 chunks
      //   priority: 0, // 缓存组优先级
      //   app: { // key 为entry中定义的入口名称
      //     chunks: 'all', // 必须三选一： "initial" | "all" | "async"(默认就是异步)
      //     name: 'dom', // 要缓存的 分隔出来的 chunk 名称
      //     minSize: 0,
      //     minChunks: 1,
      //     enforce: true,
      //     reuseExistingChunk: true
      //   }
      // }
    }),
    new webpack.ProvidePlugin({
      _: 'lodash',
    }),
  ],
  output: {
    // filename: '[name].bundle.js',
    path: path.resolve(__dirname, '../dist'),
  },
  resolve: {
    alias: {
      utils: path.resolve(__dirname, '../src/utils'),
      configs: path.resolve(__dirname, '../src/configs'),
      router: path.resolve(__dirname, '../src/router'),
      views: path.resolve(__dirname, '../src/views'),
      styles: path.resolve(__dirname, '../src/styles'),
      images: path.resolve(__dirname, '../src/images'),
      components: path.resolve(__dirname, '../src/components'),
      request: path.resolve(__dirname, '../src/request'),
    },
    // 配置默认import index的文件扩展名
    extensions: ['.js', '.json', '.vue', '.less'],
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            // soucemap作用需要去研究一下
            sourceMap: true,
            // 开启 CSS Modules
            // modules: true,
            // // 自定义生成的类名
            // localIdentName: '[local]_[hash:base64:8]'
          },
        },
      ],
    },
    {
      test: /\.ejs$/,
      loader: 'ejs-loader',
      // query是 loader 也就是lodash.template对应的编译选项
      query: {

      },
    },
    // 编译less为css以下都需要配置
    {
      test: /\.less$/,
      use: [{
        loader: 'style-loader', // creates style nodes from JS strings
      }, {
        loader: 'css-loader', // translates CSS into CommonJS
        options: {
          sourceMap: true,
          // 对less 启用css_module
          // 同时可用于.vue的style内
          // modules: true,
          // localIdentName: '[local]_[hash:base64:8]'
        },
      }, {
        loader: 'less-loader', // compiles Less to CSS
        options: {
          sourceMap: true,
        },
      }, {
        loader: 'sass-resources-loader',
        options: {
          sourceMap: true,
          resources: [
            path.resolve(__dirname, '../src/styles/variables.less'),
          ],
        },
      }],

    },
    {
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {},
      },
    },
    {
      test: /\.vue$/,
      loader: 'vue-loader',
    },
    // 处理资源路径
    {
      test: /\.(png|svg|jpg|gif)$/,
      // use: ['file-loader']
      // 可以用fileloader 和 urlloader
      // urlloader 将limit大小的文件转为dataurl
      // 超过则配置默认file-loader
      use: [{
        loader: 'url-loader',
        options: {
          fallback: 'file-loader',
        },
      }],
    },

    ],

  },
};
