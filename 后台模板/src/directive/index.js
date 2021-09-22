import path from 'path'
/**
 * @description 加载所有 Directive  
 * @param app 整个应用的实例
 */
export function loadAllDirective (Vue) {
  const files = require.context('.', true, /\.js$/)
  files.keys().forEach(key => {
    if (key !== './index.js') {
      const name = path.basename(key, '.js')
      Vue.directive(name, files(key).default)
    }
  })
}

