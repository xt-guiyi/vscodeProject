/**
 * @description 加载所有 Filters
 * @param app 整个应用的实例
 */
export function loadAllFilters (Vue) {
  const files = require.context('.', true, /\.js$/)
  console.log(122)
  files.keys().forEach(key => {
    if (key !== './index.js') files(key).default(Vue)
  })
}