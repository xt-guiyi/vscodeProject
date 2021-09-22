import instance from './axios'
import qs from 'qs'

// 登录
export function login (data) {
  return instance.post('Login/checkLogin', qs.stringify(data))
}

// 代理录入商户资料
export function setProxyMerchantInformation(data){
  return instance.post('EnterMerchantInfo/add', qs.stringify(data))
}

// 农行录入商户信息
export function setBankMerchantInformation(data){
  return instance.post('EnterMerchantInfo/nonghangAdd', qs.stringify(data))
}

// 获取已提交、待处理的列表展示
export function getList(data){
  return instance.post('EnterMerchantInfo/getList', qs.stringify(data))
}

// 批量处理待处理列表，
export function setEnterMerchantInfo(data){
  return instance.post('EnterMerchantInfo/updateNonghang', qs.stringify(data))
}