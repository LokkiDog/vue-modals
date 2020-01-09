module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/vue/modals/'
    : '/vue/modals/',
  assetsDir: '',
  productionSourceMap: false,
  filenameHashing: true
}
