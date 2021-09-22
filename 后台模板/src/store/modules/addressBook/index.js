export default { 
  namespaced: true,
  state: {
    currentTagItem: '1', // 当前项 1 ==> 组织架构 2 ==> 部门
    departmentInfo: {}, // 当前选中的部门信息
    departmentInfoList: {}, // 当前成员所在的部门列表
    tagInfo: {}, // 当前选中的标签信息
    moreTagInfo: {}, // 显示标签tooltip时，存储点击的标签信息
    changeDialog: false, // 是否显示修改部门名对话框
    addChildrenDialog: false, // 是否显示添加子部门对话框
    addTagDialog: false, // 是否显示添加标签对话框
    addDepartmentOrTagDialog: {
      isShow: false,
      title: '选择成员所在库',
      describe: '已选择的部门',
      defaultDepartmentInfo: [],
      defaultTagsInfo: []
    },
    isRefreshTagList: false, // 是否刷新标签列表
    isRefreshDepartment: false, // 是否刷新部门列表
    addressUserInfo: {}, // 通讯录单个成员详细信息()
  },
  mutations: {

    setDepartmentInfo(state, value) {
      state.departmentInfo = value
    },
    
    setCurrentTagItem(state, value) {
      state.currentTagItem = value
    },
    
    setTagInfo(state, value) {
      state.tagInfo = value
    },

    setMoreTagInfo(state, value) {
      state.moreTagInfo = value
    },

    setChangeDialog(state, value) {
      state.changeDialog = value
    },
    
    setAddChildrenDialog(state, value) {
      state.addChildrenDialog = value
    },
    
    setAddTagDialog(state, value) {
      state.addTagDialog = value
    },

    setAddDepartmentOrTagDialog(state, {isShow, title, describe, defaultDepartmentInfo, defaultTagsInfo}) {
      state.addDepartmentOrTagDialog['isShow'] = isShow 
      state.addDepartmentOrTagDialog['defaultDepartmentInfo'] = defaultDepartmentInfo
      state.addDepartmentOrTagDialog['defaultTagsInfo'] = defaultTagsInfo
      state.addDepartmentOrTagDialog['title'] = title
      state.addDepartmentOrTagDialog['describe'] = describe
      console.log(state.addDepartmentOrTagDialog)
    },
    
    setIsRefreshTagList(state, value) {
      state.isRefreshTagList = value
    },

    setIsRefreshDepartmentList(state, value) {
      state.isRefreshDepartment = value
    },

    setAddressUserInfo(state, value) {
      state.addressUserInfo = value
    },

    setDepartmentInfoList(state, value) {
      state.departmentInfoList = value
    }
  },
  actions: {
  }
}