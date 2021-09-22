import router from './index'
import store from '@/store/index'

//路由守卫-拦截登录
router.beforeEach(async (to,from,next) => {
    // 没有登录
  if(!store.state.user.userInfo) {
    // 如果不需要权限
    if(to.matched.length > 0 && !to.matched.some(e => e.meta.requiresAuth)) {
      next()
    }else {
      // 否则进入登录页
      next({
        path: '/login'
      })
    }
  }else {
    // 如果登录过，
    // 如果没有permissionList数据(刷新了页面或第一次请求)，则请求权限，保存权限数据，
    if(!store.state.permission.permissionList) {
      await store.dispatch("permission/FETCH_PERMISSION")
        next(to)
    }else {
      // 如果有权限，登录过，就不让它回到登录页 
      if(to.path !== "/login") {
        next()
      }else {
        next(from.fullPath)
      }
    }
  }
})