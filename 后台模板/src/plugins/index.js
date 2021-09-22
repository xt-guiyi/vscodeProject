import path from 'path'
import './element/element'
/**
 * @description 加载所有 Plugins
 * @param app 整个应用的实例
 */
export function loadAllPlugins (Vue) {
  const files = require.context('.', true, /\.js$/)
  files.keys().forEach(key => {
    if (key !== './index.js') {
      const name = path.basename(key, '.js')
      if(name === 'index')  Vue.use(files(key).default)
      console.log(name,files.keys(),key)
      
    }
  })
}