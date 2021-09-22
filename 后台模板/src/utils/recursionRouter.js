/**
 * 
 * @param {Array} userRouter 用户可访问的路由清单
 * @param {*} allRouter 全部路由数据
 * @returns 用户对应权限的路由数据
 */
export function recursionRouter(userRouter = [],allRouter = []) {
  var realRoutes = []
  allRouter.forEach((v) => {
    userRouter.forEach((item) => {
      if(item.name === v.name) {
        realRoutes.push(v)
      }
    })
  })
  return realRoutes;
}