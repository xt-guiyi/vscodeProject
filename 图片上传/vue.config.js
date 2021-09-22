module.exports = {
  publicPath: '/fpagbank/',

  chainWebpack: config => {
    config.plugin('html').tap(args => {
      args[0].title = '方片农行进件工具'
      return args
    })
  },

  css: {
    extract: false
  }
};