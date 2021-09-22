import instance from './request.js'

// 登录(mock模拟)
export function login (data) {
  return instance.post('/Manager/accountLogin', data)
}

// 权限菜单
export function getMenuList (data) {
  return instance.post('/Manager/getMenuList', data)
}

// 获取oos配置
export function getOssJsConfig (data) {
  return instance.post('/getOSSJsConfig', data)
}

// 获取平台应用列表
export function getPlatformAppList (data) {
  return instance.post('/Manager/PlatformApp/platformAppList', data)
}
