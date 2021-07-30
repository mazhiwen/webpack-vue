const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackTagsPlugin = require('html-webpack-tags-plugin');
const colors = require('colors');
const TerserPlugin = require('terser-webpack-plugin');


let API_ENV = '';

const argv = JSON.parse(process.env.npm_config_argv).original;
const APIENVIndex = argv.findIndex(value => value.includes('--API_ENV'));
if (APIENVIndex > 0) {
  [, API_ENV] = argv[APIENVIndex].split('=');
}
console.log(colors.rainbow(`> API_ENV为:${API_ENV}`));


// __webpack_public_path__ = `'https://dasd.com/web/'`;

console.log(22);
// console.log(require('../dist/vendor-manifest.json'));

module.exports = {

  entry: {
    // '@babel/polyfill': '@babel/polyfill',
    app: './src/index.ts',
    // app1: './src/index1.ts',
  },
  plugins: [

    new webpack.DefinePlugin({
      'webpack.API_ENV': JSON.stringify(API_ENV),
    }),
    // dllplugin 搭配 build:dll
    // html 加下面脚本
    // <script type="text/javascript" src="./vendor.dll.js"></script>
    // new webpack.DllReferencePlugin({
    //   manifest: require('../dist/vendor-manifest.json'),
    // }),
    // vueloader需要的plugin
    // 相关options选项:
    // https://vue-loader.vuejs.org/zh/options.html#transformasseturls
    new VueLoaderPlugin(),
    new CleanWebpackPlugin([path.resolve(__dirname, '../dist')], {
      root: path.resolve(__dirname, '../'),
    }),
    new CopyWebpackPlugin([
      {
        from: './webpackConfig/public/*',
        to: path.resolve(__dirname, '../dist'),
        flatten: true,
      },
    ]),
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
    new HtmlWebpackTagsPlugin({
      // 生产环境开启这个选项 并且配置path 为 cdn地址
      // usePublicPath: false,
      // path: 'http://cdn.test/echarts.min.js',
      tags: [
        {
          path: 'echarts.min.js',
        },
      ],
      append: false,
    }),
    new webpack.optimize.SplitChunksPlugin({
      // ************************默认
      chunks: 'all', // 默认async
      minSize: 30000,
      // maxSize: 500000,
      minChunks: 1,
      maxAsyncRequests: 6,
      maxInitialRequests: 4,
      name: 'vendors',
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          name: 'vendors',
        },
        element: {
          chunks: 'all',
          name: `element-ui`,
          test: /[\\/]element-ui[\\/]/,
          priority: 0,
        },
        default: {
          name: 'default',
          minChunks: 2,
          priority: -20,
          chunks: 'initial',
          reuseExistingChunk: true,
        },
        // default: {
        //   name: 'default',
        //   minChunks: 2,
        //   priority: -20,
        //   chunks: 'all',
        //   // reuseExistingChunk: true,
        // },
      },
    }),
    new webpack.ProvidePlugin({
      _: 'lodash',
    }),

  ],
  output: {
    // filename: '[name].bundle.js',
    path: path.resolve(__dirname, '../dist'),
    // publicPath: '/base/',
    publicPath: '/',
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
      filters: path.resolve(__dirname, '../src/filters'),
      request: path.resolve(__dirname, '../src/request'),
      static: path.resolve(__dirname, '../src/static'),
    },
    // 配置默认import index的文件扩展名
    extensions: ['.ts', '.js', '.vue', '.less', '.css', '.json'],
  },
  externals: {
    videojss: 'videojs'
  },
  module: {
    // noParse: (content) => {
    //   console.log(1111, content, /oparse/.test(content), content.includes('noparse'));
    //   return /oparse/.test(content);
    // },
    rules: [
      {
        test: /\.ejs$/,
        loader: 'ejs-loader',
        // query是 loader 也就是lodash.template对应的编译选项
        query: {

        },
      },
      { test: /\.tsx?$/,
        loader: "ts-loader",
        options: {
          appendTsSuffixTo: [/\.vue$/],
        }
      },
      {
        test: /\.js$/,
        // exclude: /(node_modules|bower_components)/,
        include: /(node_modules\/vue-editor-mar|src)/,
        use: {
          loader: 'babel-loader',
          options: {
            rootMode: 'upward',
          },
        },
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      // 处理资源路径
      {
        test: /\.(png|svg|jpg|gif|woff|ttf|eot)$/,
        // use: ['file-loader']
        // 可以用fileloader 和 urlloader
        // urlloader 将limit大小的文件转为dataurl
        // 超过则配置默认file-loader
        oneOf: [
          {
            // resourceQuery: /external/, // foo.css?external
            include: [
              path.resolve(__dirname, '../src/static'),
            ],
            use: {
              loader: 'file-loader',
              options: {
                name: '[name].[contenthash].[ext]',
                outputPath: 'static/',
                publicPath: 'static/',
              },
            },
          },
          {
            use: [{
              loader: 'url-loader',
              options: {
                fallback: 'file-loader',
              },
            }],
          },
        ],
      },

    ],

  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        chunkFilter: (chunk) => {
          // Exclude uglification for the `SYSOUTCONFIG` chunk
          if (chunk.name === 'SYSOUTCONFIG') {
            return false;
          }
          return true;
        },
      }),
    ],
  },
};
