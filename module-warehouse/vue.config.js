const webpack = require('webpack');
const APP_NAME = require('./package.json').name;
const PORT = require('./package.json').devPort;

module.exports = {
  publicPath: `/${APP_NAME}/`,

  css: {
    extract: false
  },

  productionSourceMap: false,

  chainWebpack: (config) => {
    config.externals({
      vue: 'Vue'
    });

    config.output
      .filename('main.js')
      .chunkFilename('[name].[chunkhash:8].js')
      .jsonpFunction(`webpackJsonp-${APP_NAME}`)
      .library(`app-${APP_NAME}`)
      .libraryExport('default')
      .libraryTarget('umd');

    config.optimization.splitChunks(false);

    config.plugin('define').use(webpack.DefinePlugin, [{
      'process.env.VUE_APP_NAME': JSON.stringify(APP_NAME)
    }]);

    config.plugins
      .delete('html')
      .delete('preload')
      .delete('prefetch');
  },

  devServer: {
    port: PORT,
    headers: {
      "Access-Control-Allow-Origin": "*"
    }
  }
};
