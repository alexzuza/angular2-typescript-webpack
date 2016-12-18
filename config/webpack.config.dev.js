var path = require('path');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.config.base.js');


const DefinePlugin = require('webpack/lib/DefinePlugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');

function hasProcessFlag(flag) {
  return process.argv.join('').indexOf(flag) > -1;
}

var ROOT = path.resolve(__dirname, '..');
function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [ROOT].concat(args));
}

const ENV = process.env.ENV = process.env.NODE_ENV = 'development';
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3000;
const HMR = hasProcessFlag('hot');

const METADATA = webpackMerge(commonConfig({env: ENV}).metadata, {
  host: HOST,
  port: PORT,
  ENV: ENV,
  HMR: HMR
});

module.exports = function (options) {
  return webpackMerge(commonConfig({env: ENV}), {

    devtool: 'source-map', // devtool: 'source-map',
    
    output: {
      path: root('dist'),

      filename: '[name].bundle.js',

      sourceMapFilename: '[name].map',

      chunkFilename: '[id].chunk.js',

      library: 'ang_[name]',

      libraryTarget: 'var',
    },


    plugins: [
      new DefinePlugin({
        'ENV': JSON.stringify(METADATA.ENV),
        'HMR': METADATA.HMR,
        'process.env': {
          'ENV': JSON.stringify(METADATA.ENV),
          'NODE_ENV': JSON.stringify(METADATA.ENV),
          'HMR': METADATA.HMR,
        }
      }),

      new LoaderOptionsPlugin({
        debug: true,
        options: {

        }
      }),

    ],
    
    devServer: {
      port: METADATA.port,
      host: METADATA.host,
      historyApiFallback: true,
      watchOptions: {
        aggregateTimeout: 300,
        poll: 1000
      }
    }

  });
}
