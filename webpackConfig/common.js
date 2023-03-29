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


console.log(22);

module.exports = {

  entry: {
    app: './src/index.ts',
  },
  plugins: [

    new webpack.DefinePlugin({
      'webpack.API_ENV': JSON.stringify(API_ENV),
    }),
    new VueLoaderPlugin(),
    new CleanWebpackPlugin([path.resolve(__dirname, '../dist')], {
      root: path.resolve(__dirname, '../'),
    }),
    new CopyWebpackPlugin([
    ]),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './index.ejs'),
      templateParameters: {
        title: '系统',
      },
    }),
    new HtmlWebpackTagsPlugin({
      tags: [
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
          name: 'element-ui',
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
      },
    }),
    new webpack.ProvidePlugin({
      _: 'lodash',
    }),

  ],
  output: {
    path: path.resolve(__dirname, '../dist'),
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
    extensions: ['.ts', '.js', '.vue', '.less', '.css', '.json'],
  },
  externals: {
    videojss: 'videojs',
  },
  module: {

    rules: [
      {
        test: /\.ejs$/,
        loader: 'ejs-loader',
        query: {

        },
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          appendTsSuffixTo: [/\.vue$/],
        },
      },
      {
        test: /\.js$/,
        // include: /(node_modules\/vue-editor-mar|src)/,
        include: [path.resolve('src'),
          path.resolve('node_modules/three'),
        ],

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
      {
        test: /\.(png|svg|jpg|gif|woff|ttf|eot)$/,
        oneOf: [
          {
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
          if (chunk.name === 'SYSOUTCONFIG') {
            return false;
          }
          return true;
        },
      }),
    ],
  },
};
