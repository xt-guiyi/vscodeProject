export default {
  namespaced: true,
  state: {
    userInfo: '',
    token: '',
    platformAppId: '' // 平台应用id
  },
  mutations: {
    userLogin(state, e) {
      state.userInfo = e
    },
    setToken(state, e) {
      state.token = e
    },

    setPlatformAppId(state, e) {
      state.platformAppId = e
    },

  }
}