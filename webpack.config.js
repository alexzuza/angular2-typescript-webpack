var path = require('path');
var webpack = require('webpack');

var HtmlWebpackPlugin = require('html-webpack-plugin');
var DefinePlugin = require('webpack/lib/DefinePlugin');

var precss       = require('precss');
var autoprefixer = require('autoprefixer');

function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [__dirname].concat(args));
}
function hasProcessFlag(flag) {
  return process.argv.join('').indexOf(flag) > -1;
}

const ENV = process.env.ENV = process.env.NODE_ENV = 'development';
const HMR = hasProcessFlag('hot');

var METADATA = {
  title: 'Angular2 simple example',
  ENV: ENV,
  baseUrl: '/',
  host: 'localhost',
  port: '3000',
};

module.exports = {
  metadata: METADATA,

  entry: {
    'main': './src/start.ts',
    'vendor': './src/vendor.ts'
  },

  debug: true,

  devtool: 'source-map',

  output: {
    path: root('dist'),

    filename: '[name].bundle.js',

    sourceMapFilename: '[name].map',

    chunkFilename: '[id].chunk.js'
  },

  resolve: {
    extensions: ['', '.ts', '.js'],

    root: root('src'),

    modulesDirectories: ['node_modules']
  },

  module: {
    loaders: [
      {
        test: /\.ts$/,
        loader: 'awesome-typescript-loader'
      },

      {
        test: /\.html$/,
        loader: 'raw-loader',
        exclude: [root('src/index.html')]
      },

      {
        test: /\.css/,
        exclude: /node_modules/,
        loader: 'raw-loader!postcss-loader'
      }
    ],

    postcss: function () {
      return [precss, autoprefixer];
    }
  },

  plugins: [
    new DefinePlugin({
      'ENV': JSON.stringify(ENV),
      'HMR': HMR
    }),

    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: ['main', 'vendor'],
      minChunks: Infinity
    })
  ],

  devServer: {
    port: METADATA.port,
    historyApiFallback: true,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    }
  }
}