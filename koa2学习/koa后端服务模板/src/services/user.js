/**
 * @description user service
 * @author 小熊熊
 */
const { User } = require('../db/model/index')
const { formateUser } = require('./_formate')

/**
 * 查询用户是否存在
 * @param { string } userName 用户名
 * @param {string } password 密码
 */
async function getUserInfo(userName, password) {
  // 查询条件
  let whereOpt = {
    userName,
  }
  if (password) {
    whereOpt = { userName, password }
  }
  // 查询
  const result = await User.findOne({
    attributes: ['id', 'userName', 'nickname', 'picture', 'city'],
    where: whereOpt,
  })
  if (result == null) {
    return result
  }
  //格式化
  const formate = formateUser(result.dataValues)
  return formate
}

/**
 * 创建用户
 * @param { string } userName 用户名
 * @param {string } password 密码
 * @param {string } garden 性别
 */
async function createUser({ userName, password, gender = 3, nickName }) {
  const result = await User.create({
    userName,
    password,
    nickname: nickName ? nickName : 'userName',
    gender,
  })
  const data = result.dataValues

  // 自己关注自己（为了方便首页获取数据）
  // addFollower(data.id, data.id)

  return data
}

/**
 * 删除用户
 * @param {string} userName 用户名
 */
async function deleteUser(userName) {
  const result = await User.destroy({
    where: {
      userName,
    },
  })
  return result > 0
}

module.exports = {
  getUserInfo,
  createUser,
  deleteUser,
}
