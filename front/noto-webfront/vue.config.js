module.exports = {
  devServer: {
    disableHostCheck: true,
    hot: true,
    proxy: process.env.VUE_APP_PROXY,
    // proxy: /*process.env.VUE_APP_URL*/ "http://localhost:84/api",
  },

  pluginOptions: {
    i18n: {
      locale: "en",
      fallbackLocale: "en",
      localeDir: "no",
      enableInSFC: false,
      includeLocales: false,
      enableBridge: true,
    },
  },
};
