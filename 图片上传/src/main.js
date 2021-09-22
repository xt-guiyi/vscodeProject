import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/vant.js'
import './assets/scss/global.scss'
import { getQueryString } from '@/utils/url.js'

Vue.config.productionTip = false

console.log(getQueryString('channelId'))
// 判断环境
if(FPHDSdk.getBrowserType() === 'weixin') {
  FPHDSdk.login({ channelId: getQueryString('channelId') , login: '' }, ()=>{});
}


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
