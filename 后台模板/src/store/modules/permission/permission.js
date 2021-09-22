import { getMenuList } from '@/api/common';
import router,{DyRouter} from '@/routers/index';
import dynamicRouter from '@/routers/dynamicRouter';
import { recursionRouter } from '@/utils/recursionRouter';
import { menuList } from '@/config/asideMenuList'
import Vue from 'vue'

//  基于vuex的权限方案
export default {
  namespaced: true,
  state: {
    permissionList: null,
    sidebarMenu: [],
    currentChildrenMenuPath: '',
  },
  getters: {},
  mutations: {
    SET_PERMISSION(state,routes) {
      state.permissionList = routes;
    },
    CLEAR_PERMISSION(state) {
      state.permissionList = null;
    },
    SET_MENU(state,menu) {
      state.sidebarMenu = menu;
    },
    CLEAR_MENU(state) {
      state.sidebarMenu = [];
    },
    SET_CURRENT_CHILDREN_MENU_NAME(state,value) {
      state.currentChildrenMenuPath = value;
    }
  },
  actions: {
    async FETCH_PERMISSION({commit,state}) {
      // DyRouter子路由
      let MainContainer = DyRouter.find(v => v.path === "/defaultLayout");
      let children = MainContainer.children;
      // 权限接口
      let permissionList = await getMenuList();
      if(permissionList.data.code == 0) {
        // 对比
        let routes = recursionRouter(permissionList.data.data,dynamicRouter)
        children.push(...routes)
      }else {
        Vue.prototype.$message({ showClose: true, message: '没有权限,', type: 'error' })
      }

      // add 菜单项
      menuList.forEach(item => {
        item.children.push(...children.filter(route => route.meta.index == item.index))
      })
      console.log(menuList,'w')
      commit('SET_MENU',menuList)

      //初始化路由
      let initialRoutes = router.options.routes;
      DyRouter.forEach(item => {
        router.addRoute(item)
      })

      commit('SET_PERMISSION',[...initialRoutes,...DyRouter])
    }
  }
}