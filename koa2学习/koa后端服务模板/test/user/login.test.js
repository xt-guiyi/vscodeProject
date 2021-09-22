/**
 * @description user api test
 * @author 小熊熊
 */
const Server = require('../server')

// 用户信息
const userName = `u_${Date.now()}`
const password = `p_${Date.now()}`
const testUser = {
  userName,
  password,
  nickname: userName,
  gender: 1,
}
// 存储cookie
let COOKIE = ''

// 注册
test('注册一个用户,应该成功', async () => {
  const res = await Server.post('/api/user/register').send(testUser)
  expect(res.body.errno).toBe(0)
})

// 重复注册
test('重复注册用户应该失败', async () => {
  const res = await Server.post('/api/user/register').send(testUser)
  expect(res.body.errno).not.toBe(0)
})

// 查询用户是否存在

test('查询注册用户,应该存在 ', async () => {
  const res = await Server.post('/api/user/isExist').send({ userName })
  expect(res.body.errno).toBe(0)
})

//  json schema 检查
test('json schema 检测非法格式', async () => {
  const res = await Server.post('/api/user/register').send({
    userName: 'xt_gui_yi',
    password: 12,
    gender: 'mall',
  })
  expect(res.body.errno).not.toBe(0)
})

// 登录

test('登录应该成功', async () => {
  const res = await Server.post('/api/user/login').send({ userName, password })
  expect(res.body.errno).toBe(0)
  // 获取COOKIE

  COOKIE = res.headers['set-cookie'].join(';')
})

//删除
test('删除用户应该成功', async () => {
  const res = await Server.post('/api/user/delete')
    .set('cookie', COOKIE)
    .send({ userName })
  expect(res.body.errno).toBe(0)
})

// 再次查询用户应该不存在
test('查询注册用户,应该存在 ', async () => {
  const res = await Server.post('/api/user/isExist').send({ userName })
  expect(res.body.errno).not.toBe(0)
})
