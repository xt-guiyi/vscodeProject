/**
 * @description  user model test
 * @author 小熊熊
 */

const { User } = require('../../src/db/model/index')

test('User 模型的各个属性，符合预期 ', () => {
  // build 会构建一个内存的User实例，但是不会提交到数据库中
  const user = User.build({
    userName: 'zs',
    password: 1234566,
    nickname: '张三',
    picture: './xxx',
    city: '北京',
  })
  expect(user.userName).toBe('zs')
  expect(user.password).toBe(1234566)
  expect(user.nickname).toBe('张三')
  expect(user.picture).toBe('./xxx')
  expect(user.city).toBe('北京')
})
