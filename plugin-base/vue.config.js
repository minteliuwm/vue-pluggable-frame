const webpack = require('webpack');
const APP_NAME = require('./package.json').name;
const PORT = require('./package.json').devPort;

const PROXY = {
  '^/module-job': {
    target: 'http://localhost:9091/'
  },
  '^/module-warehouse': {
    target: 'http://localhost:9092/'
  }
};

module.exports = {
  publicPath: '/',

  productionSourceMap: false,

  configureWebpack: {
    externals: {
      vue: 'Vue'
    },

    plugins: [
      new webpack.DefinePlugin({
        'process.env.VUE_APP_NAME': JSON.stringify(APP_NAME)
      })
    ]
  },

  devServer: {
    port: PORT,
    proxy: PROXY
  }
};
