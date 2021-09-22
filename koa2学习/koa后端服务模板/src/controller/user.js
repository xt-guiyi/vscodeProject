/**
 * @description user controller
 * @author 小熊熊
 */
const { getUserInfo, createUser, deleteUser } = require('../services/user')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const {
  registerUserNameExistInfo,
  registerUserNameNotExistInfo,
  registerFailInfo,
  loginFailInfo,
  deleteUserFailInfo,
} = require('../model/ErrorInfo')
const doCrypto = require('../utils/cryp')

/**
 * 验证用户是否存在
 * @param {string} userName 用户名
 */
async function isExist(userName) {
  const userInfo = await getUserInfo(userName)
  if (userInfo) {
    return new SuccessModel(userInfo)
  } else {
    return new ErrorModel(registerUserNameNotExistInfo)
  }
}

/**
 * 注册用户
 * @param {string} userName 用户名
 * @param {number} password 用户名
 * @param {string} garden 用户名
 */
async function register({ userName, password, garden }) {
  const userInfo = await getUserInfo(userName)
  if (userInfo) {
    // 用户已存在
    return new ErrorModel(registerUserNameExistInfo)
  }
  try {
    await createUser({ userName, password: doCrypto(password), garden })
    return new SuccessModel()
  } catch (error) {
    return new ErrorModel(registerFailInfo)
  }
}

/**
 * 登录账号
 * @param {string} userName 用户名
 * @param {number} password 用户名
 */
async function login({ ctx, userName, password }) {
  let userInfo = await getUserInfo(userName, doCrypto(password))
  if (userInfo) {
    ctx.session.userInfo = userInfo
    return new SuccessModel(userInfo)
  } else {
    return new ErrorModel(loginFailInfo)
  }
}

/**
 * 删除当前用户
 * @param {string} userName 用户名
 */
async function deleteCurUser(userName) {
  const isSuccess = await deleteUser(userName)
  if (isSuccess) {
    return new SuccessModel()
  } else {
    return new ErrorModel(deleteUserFailInfo)
  }
}

module.exports = {
  isExist,
  register,
  login,
  deleteCurUser,
}
