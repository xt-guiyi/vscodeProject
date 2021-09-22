import Vue from 'vue'
import App from './App.vue'
import router from './routers'
import store from './store'
// 导入全局样式
import './assets/scss/global.scss'
import './routers/permission.js'
import  { loadAllComponents } from './components/index'
import  { loadAllPlugins } from './plugins/index'
import  { loadAllDirective } from './directive/index'
import  { loadAllFilters } from './filters/index'

Vue.config.productionTip = false
// 加载组件
loadAllComponents(Vue)
// 加载插件
loadAllPlugins(Vue)
// 加载指令
loadAllDirective(Vue)
// 加载过滤器
loadAllFilters(Vue)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
