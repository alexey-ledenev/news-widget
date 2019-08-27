module.exports = {
  configureWebpack: {
    optimization: {
      splitChunks: false,
    },
  },
  css: {
    extract: false,
  },
  // filenameHashing: false,
  // chainWebpack: (config) => {
  //   config.plugins.delete('html');
  //   config.plugins.delete('preload');
  //   config.plugins.delete('prefetch');
  // },
  productionSourceMap: false,
};
