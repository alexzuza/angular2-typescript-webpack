var path = require('path');
var webpack = require('webpack');

var HtmlWebpackPlugin = require('html-webpack-plugin');
var LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
var ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');

var precss = require('precss');
var autoprefixer = require('autoprefixer');

var ROOT = path.resolve(__dirname, '..');
function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [ROOT].concat(args));
}

function isWebpackDevServer() {
  return process.argv[1] && !!(/webpack-dev-server/.exec(process.argv[1]));
}

const ENV = process.env.ENV = process.env.NODE_ENV = 'development';


var METADATA = {
  title: 'Angular2 simple example',
  ENV: ENV,
  baseUrl: '/',
  host: 'localhost',
  port: 3000,
  isDevServer: isWebpackDevServer()
};

module.exports = function (options) {
  var isProd = options.env === 'production';

  return {
    entry: {
      'main': './src/main.ts',
      'vendor': './src/vendor.ts'
    },

    resolve: {
      extensions: ['.ts', '.js'],

      modules: [root('src'), root('node_modules')],
    },

    module: {
      rules: [
        {
          test: /\.ts$/,
          use: [
            'awesome-typescript-loader',
            'angular2-template-loader',
            'angular-router-loader',
            '@angularclass/hmr-loader?pretty=' + !isProd + '&prod=' + isProd,
          ]
        },

        {
          test: /\.html$/,
          use: 'raw-loader',
          exclude: [root('src/index.html')]
        },

        {
          test: /\.css/,
          use: ['raw-loader', 'postcss-loader']
        }
      ],
    },

    plugins: [
      new HtmlWebpackPlugin({
        template: 'src/index.html',
        title: METADATA.title,
        chunksSortMode: 'dependency',
        metadata: METADATA,
        inject: 'head'
      }),

      new ContextReplacementPlugin(
        /angular(\\|\/)core(\\|\/)src(\\|\/)linker/,
        root('src'),
        {
          // your Angular Async Route paths relative to this root directory
        }
      ),

      new webpack.optimize.CommonsChunkPlugin({
        name: ['main', 'vendor'],
        minChunks: Infinity
      }),


      new webpack.LoaderOptionsPlugin({})
    ]

  };
}





