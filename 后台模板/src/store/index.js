import Vue from 'vue'
import Vuex from 'vuex'
import modules from './modules/index'
import createPersistedState from "vuex-persistedstate"
Vue.use(Vuex)

export default new Vuex.Store({
  modules,
  plugins: [createPersistedState({
    key: 'gridAdmin',
    paths: ['user','permission.currentChildrenMenuPath', 'addressBook']

  })]
})
