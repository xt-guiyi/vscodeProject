import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../pages/Home.vue'
import { weChatShare } from '@/utils/share.js'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/localPlayWriteMaterial',
    name: 'LocalPlayWriteMaterial',
    component: () => import(/* webpackChunkName: "localPlayWriteMaterial" */ '../pages/LocalPlayWriteMaterial.vue'),
    meta: {
      requireAuth: true,
      authorityType: '1',
      title: '代理填写资料入口页'
    },
  },
  {
    path: '/localPlayBusinessmanBaseInfo',
    name: 'LocalPlayBusinessmanBaseInfo',
    component: () => import(/* webpackChunkName: "localPlayWriteMaterial" */ '../pages/LocalPlayBusinessmanBaseInfo.vue'),
    meta: {
      requireAuth: true,
      authorityType: '1',
      title: '代理填写资料基本页'
    }
  },
  {
    path: '/localPlayBusinessmanImageInfo',
    name: 'LocalPlayBusinessmanImageInfo',
    component: () => import(/* webpackChunkName: "localPlayWriteMaterial" */ '../pages/LocalPlayBusinessmanImageInfo.vue'),
    meta: {
      requireAuth: true,
      authorityType: '1',
      title: '代理填写资料图片页'
    }
  },
  {
    path: '/LocalPlayBusinessmanImageTwoInfo',
    name: 'LocalPlayBusinessmanImageTwoInfo',
    component: () => import(/* webpackChunkName: "localPlayWriteMaterial" */ '../pages/LocalPlayBusinessmanImageTwoInfo.vue'),
    meta: {
      requireAuth: true,
      authorityType: '1',
      title: '代理填写协议图片页'
    }
  },
  {
    path: '/bankWriteMaterial',
    name: 'BankWriteMaterial',
    component: () => import(/* webpackChunkName: "bankWriteMaterial" */ '../pages/BankWriteMaterial.vue'),
    meta: {
      requireAuth: true,
      authorityType: '2',
      title: '农行录入商户页'
    }
  },
  {
    path: '/bankSpecialMerchants',
    name: 'BankSpecialMerchants',
    component: () => import(/* webpackChunkName: "bankSpecialMerchants" */ '../pages/BankSpecialMerchants.vue'),
    meta: {
      requireAuth: true,
      authorityType: '3',
      title: '农行特约商户页'
    }
  }
]

const router = new VueRouter({
  routes,
})

// 鉴权
// 简单弄一下
router.beforeEach((to, from, next) => {
  if (to.matched.some(res => res.meta.requireAuth)) {
  console.log()
    let authorityType = to.matched.map(item => item.meta.authorityType)
    if(sessionStorage.getItem(`userInfo_${authorityType[0]}`)) {
      next()
    }else {
      next({ name: 'Home'})
    }
  }else {
    next()
  }
})

// 微信分享函数调用
router.afterEach((to, from) => {
  if(FPHDSdk.getBrowserType() === 'weixin') {
    weChatShare()
  }
})
export default router
