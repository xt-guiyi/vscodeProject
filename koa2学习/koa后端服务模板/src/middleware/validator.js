/**
 * @description json schema 验证中间件
 * @author 小熊熊
 */
const { ErrorModel } = require('../model/ResModel')
const { jsonSchemaFileInfo } = require('../model/ErrorInfo')

function genValidator(validatorFn) {
  async function validator(ctx, next) {
    const data = ctx.request.body
    const error = validatorFn(data)
    if (error) {
      ctx.body = new ErrorModel(jsonSchemaFileInfo)
      return
    }
    // 验证成功
    await next()
  }
  return validator
}

module.exports = {
  genValidator,
}
