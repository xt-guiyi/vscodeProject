/**
 * @description 登陆验证的中间件
 * @author 小熊熊
 */
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { loginCheckFailInfo } = require('../model/ErrorInfo')

// api登录验证中间件
async function loginCheck(ctx, next) {
  if (ctx.session && ctx.session.userInfo) {
    //已登录

    await next()
    return
  }
  ctx.body = new ErrorModel(loginCheckFailInfo)
}

// 页面登录验证中间件
async function loginRedirect(ctx, next) {
  if (ctx.session && ctx.session.userInfo) {
    //已登录
    await next()
    return
  }
  let curUrl = ctx.url
  ctx.redirect('/login?url=' + encodeURIComponent(curUrl))
}

module.exports = {
  loginCheck,
  loginRedirect,
}
