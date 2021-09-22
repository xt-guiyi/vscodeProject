export default { 
  namespaced: true,
  state: {
    addMemberDialog: {
      title: '',
      isShow: false
    }
  },
  mutations: {

    
    setAddMemberDialog(state, { title, isShow}) {
      state.addMemberDialog['title'] = title
      state.addMemberDialog['isShow'] = isShow
      console.log(state.addMemberDialog)
    },
  },

  actions: {
  }
}