module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  chainWebpack: config => {
    config.performance
      .maxEntrypointSize(900000)
      .maxAssetSize(900000)
  },
  // devServer: {
  //   proxy: 'http://api.ternakmart.id/',
  // }
}
