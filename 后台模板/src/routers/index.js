import Vue from 'vue'
import VueRouter from 'vue-router'
import defaultLayout from '@/layout/default'
import Login from '@/pages/Login/login'
import error from '@/pages/Error/404'
import Home from '@/pages/Home/home'
Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
return originalPush.call(this, location).catch(err => err)
}

// 没登录之前固定路由
const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  }
]

// 登录之后固定路由
export const DyRouter = [
  {
    path: '/',
    redirect: '/defaultLayout',
  },
  {
    path: '/defaultLayout',
    name: 'defaultLayout',
    component: defaultLayout,
    redirect: '/defaultLayout/home',
    children: [
      {
        path: 'home',
        name: 'home',
        component: Home,
        meta: { 
          index: null,
        }
      },
    ]
  },
  {
    path: '*',
    name: 'error',
    component: error
  }
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes,
})

export default router
