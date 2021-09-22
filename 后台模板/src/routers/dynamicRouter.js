const childrenRouter = [
  // 报事管理 --> 报事统计
  {
    path: 'reportingStatistics',
    name: 'reportingStatistics',
    component: () => import(/* webpackChunkName: "reporting-Manage" */ '@/pages/ReportingStatistics/reportingStatistics'),
    meta: {
      index: 1,
      name: '报事统计',
      collectionPath: ['报事管理', '报事统计']
    }
  },
  // 报事管理 --> 类型管理
  {
    path: 'typeManage',
    name: 'typeManage',
    component: () => import(/* webpackChunkName: "reporting-Manage" */ '@/pages/TypeManage/typeManage'),
    redirect: 'typeManage/typeManage',
    children: [
      {
        path: 'typeManage',
        name: 'typeManage',
        component: () => import(/* webpackChunkName: "grid-Manage" */ '@/pages/TypeManage/children/typeManage'),
        meta: {
          index: 3,
          name: '类型管理',
          collectionPath: ['报事管理', '类型管理']
        }
      },
      {
        path: 'typeLibrary',
        name: 'typeLibrary',
        component: () => import(/* webpackChunkName: "grid-Manage" */ '@/pages/TypeManage/children/typeLibrary'),
        meta: {
          index: 3,
          name: '类型库管理',
          collectionPath: ['报事管理', '类型管理', '类型库管理']
        }
      },
    ],
    meta: {
      index: 1,
      name: '类型管理',
      collectionPath: ['报事管理', '类型管理']
    }
  },
  //  网格管理 --> 城市管理
  {
    path: 'cityManage',
    name: 'cityManage',
    component: () => import(/* webpackChunkName: "grid-Manage" */ '@/pages/CityManage/cityManage'),
    redirect: 'cityManage/cityTable',
    children: [
      {
        path: 'cityTable',
        name: 'cityTable',
        component: () => import(/* webpackChunkName: "grid-Manage" */ '@/pages/CityManage/children/cityTable'),
        meta: {
          index: 3,
          name: '城市管理',
          collectionPath: ['网格管理', '城市管理']
        }
      },
      {
        path: 'SystemSettings',
        name: 'SystemSettings',
        component: () => import(/* webpackChunkName: "grid-Manage" */ '@/pages/CityManage/children/systemSettings'),
        meta: {
          index: 3,
          name: '城市管理',
          collectionPath: ['网格管理', '城市管理', '系统配置']
        }
      },
    ],
    meta: {
      index: 2,
      name: '城市管理',
      collectionPath: ['网格管理', '城市管理']
    }
  },
  //  网格管理 --> 小区管理
  {
    path: 'Community',
    name: 'Community',
    component: () => import(/* webpackChunkName: "grid-Manage" */ '@/pages/Community/Community'),
    redirect: 'Community/neighbourhome',
    children: [
      {
        path: 'neighbourhome',
        name: 'neighbourhome',
        component: () => import(/* webpackChunkName: "grid-Manage" */ '@/pages/Community/children/neighbourhome'),
        meta: {
          index: 3,
          name: '小区管理',
          collectionPath: ['网格管理', '小区管理']
        }
      },
      {
        path: 'level',
        name: 'level',
        component: () => import(/* webpackChunkName: "grid-Manage" */ '@/pages/Community/children/level'),
        meta: {
          index: 3,
          name: '小区管理',
          collectionPath: ['网格管理', '小区管理', '部门管理']
        }
      },
      {
        path: 'gridList',
        name: 'gridList',
        component: () => import(/* webpackChunkName: "grid-Manage" */ '@/pages/Community/children/gridList'),
        meta: {
          index: 3,
          name: '小区管理',
          collectionPath: ['网格管理', '小区管理', '网格群管理']
        }
      },
      {
        path: 'residentList',
        name: 'residentList',
        component: () => import(/* webpackChunkName: "grid-Manage" */ '@/pages/Community/children/residentList'),
        meta: {
          index: 3,
          name: '小区管理',
          collectionPath: ['网格管理', '小区管理', '居民列表']
        }
      },
    ],
    meta: {
      index: 2,
      name: '小区管理',
      collectionPath: ['网格管理', '小区管理']
    }
  },

  //  网格管理 --> 物业管理
  {
    path: 'propertyManage',
    name: 'propertyManage',
    component: () => import(/* webpackChunkName: "grid-Manage" */ '@/pages/PropertyManage/propertyManage'),
    meta: {
      index: 2,
      name: '物业管理',
      collectionPath: ['网格管理', '物业管理']
    }
  },

  //  通讯录 --> 成员通讯录
  {
    path: 'memberAddressBook',
    name: 'memberAddressBook',
    redirect: 'memberAddressBook/oneMain',
    component: () => import(/* webpackChunkName: "member-AddressBook" */ '@/pages/MemberAddressBook/memberAddressBook'),
    children: [
      {
        path: 'oneMain',
        name: 'oneMain',
        component: () => import(/* webpackChunkName: "member-AddressBook" */ '@/pages/MemberAddressBook/children/oneMain'),
        meta: {
          index: 2,
          name: '成员通讯录',
          collectionPath: ['通讯录', '成员通讯录']
        }
      },
      {
        path: 'twoMain',
        name: 'twoMain',
        component: () => import(/* webpackChunkName: "member-AddressBook" */ '@/pages/MemberAddressBook/children/twoMain'),
        meta: {
          index: 2,
          name: '成员通讯录',
          collectionPath: ['通讯录', '成员通讯录']
        }
      },
      {
        path: 'addMember',
        name: 'addMember',
        component: () => import(/* webpackChunkName: "member-AddressBook" */ '@/pages/MemberAddressBook/children/addMember'),
        meta: {
          index: 3,
          name: '成员通讯录',
          collectionPath: ['通讯录', '成员通讯录', '添加成员']
        }
      },
      {
        path: 'userDetail',
        name: 'userDetail',
        component: () => import(/* webpackChunkName: "member-AddressBook" */ '@/pages/MemberAddressBook/children/userDetail'),
        meta: {
          index: 3,
          name: '成员通讯录',
          collectionPath: ['通讯录', '成员通讯录', '成员详情']
        }
      },
    ],
    meta: {
      index: 4,
      name: '成员通讯录',
      collectionPath: ['通讯录', '成员通讯录']
    }
  },
  //  管理员管理 --> 管理员列表
  {
    path: 'administratorsList',
    name: 'administratorsList',
    component: () => import(/* webpackChunkName: "role-Manage" */ '@/pages/AdministratorsList/administratorsList'),
    meta: {
      index: 5,
      name: '管理员列表',
      collectionPath: ['管理员管理', '管理员列表']
    }
  },
  //  管理员管理 --> 修改密码
  {
    path: 'changePassword',
    name: 'changePassword',
    component: () => import(/* webpackChunkName: "role-Manage" */ '@/pages/ChangePassword/changePassword'),
    meta: {
      index: 5,
      name: '修改密码',
      collectionPath: ['管理员管理', '修改密码']
    }
  },
  //  管理员管理 --> 权限列表
  {
    path: 'authList',
    name: 'authList',
    component: () => import(/* webpackChunkName: "role-Manage" */ '@/pages/AuthList/authList'),
    meta: {
      index: 5,
      name: '权限列表',
      collectionPath: ['管理员管理', '权限列表']
    }
  },
  //  菜单管理 --> 菜单管理
  {
    path: 'menuManage',
    name: 'menuManage',
    component: () => import(/* webpackChunkName: "role-Manage" */ '@/pages/MenuManage/menuManage'),
    meta: {
      index: 3,
      name: '菜单管理',
      collectionPath: ['菜单管理']
    }
  },
]

export default childrenRouter