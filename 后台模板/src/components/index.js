import path from 'path'
/**
 * @description 加载所有 Components
 * @param app 整个应用的实例
 */
export function loadAllComponents (Vue) {
  const files = require.context('.', true, /\.vue$/)
  files.keys().forEach(key => {
    if (key !== './index.js') {
      const name = path.basename(key, '.vue')
      Vue.component(name, files(key).default)
    }
  })
}