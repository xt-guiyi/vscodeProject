/**
 * @description user api 路由
 * @author 小熊熊
 */

const Router = require('koa-router')()
const {
  isExist,
  register,
  login,
  deleteCurUser,
} = require('../../controller/user')
const userValidate = require('../../validator/user')
const { genValidator } = require('../../middleware/validator')
const { loginCheck } = require('../../middleware/loginChecks')
const { isTest } = require('../../utils/env')

Router.prefix('/api/user')

// 注册
Router.post('/register', genValidator(userValidate), async (ctx) => {
  const { userName, password, gender } = ctx.request.body
  ctx.body = await register({ userName, password, gender })
})
// 用户是否存在
Router.post('/isExist', async (ctx) => {
  const { userName } = ctx.request.body
  ctx.body = await isExist(userName)
})
// 登录
Router.post('/login', async (ctx) => {
  const { userName, password } = ctx.request.body
  ctx.body = await login({ ctx, userName, password })
})
//删除
Router.post('/delete', loginCheck, async (ctx) => {
  // 测试环境
  if (isTest) {
    const { userName } = ctx.request.body
    ctx.body = await deleteCurUser(userName)
  }
})

module.exports = Router
