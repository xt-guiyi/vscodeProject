
// 加载所有模块
let modules = {}
const files = require.context('.', true, /\.js$/)
files.keys().forEach(key => {
  if (key !== './index.js') {
    const path = key.replace(/(\.\/|\.js)/g, '')
    const [dir, name] = path.split('/')
    if(name === 'index' && !modules[dir]) {
      modules[dir] = files(key).default
    }
  }
})

export default modules