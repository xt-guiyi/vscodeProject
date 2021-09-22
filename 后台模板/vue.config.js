const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}

function addStyleResource (rule) {
  rule.use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [
        path.resolve(__dirname, './src/assets/scss/mixin.scss'),
      ],
    })
}

module.exports = {
  publicPath: '/gridAdmin/',
  css: {
    extract: false
  },

  chainWebpack: config => {
    config.plugin('html').tap(args => {
      args[0].title = '方片网格管理后台'
      return args
    })
    config.resolve.alias
    .set('@', resolve('src'))
    .set('components', resolve('src/components'))
    .set('composable', resolve('src/composable'))
    .set('api', resolve('src/api'))
    .set('utils', resolve('src/utils'))
    .set('assets', resolve('src/assets'))
    .set('layout', resolve('src/layout'))

    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    types.forEach(type => addStyleResource(config.module.rule('scss').oneOf(type)))
  },

  css: {
    extract: false
  }
};