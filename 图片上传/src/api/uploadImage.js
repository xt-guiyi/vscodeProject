import instance from './axios'
import qs from 'qs'
import { getQueryString } from '@/utils/url.js'

let baseURLList = new Map([
  ['1045', 'https://alpha-api.fpwan.com'],
  ['1048', 'https://beta-api.fpwan.com'],
  ['1032', 'https://api.fpwan.com'],
])
let baseURL = ''
// base地址
if(baseURLList.has(getQueryString('channelId'))) {
  baseURL = baseURLList.get(getQueryString('channelId'))
}else {
  baseURL = 'https://alpha-api.fpwan.com'
}

/**
 * 获取oss配置
 * @param { Number } type 类型,应使用默认值
 */
export function ossConfig(type=3) {
  return instance.get('Extend/Oss/JsConfig', {
    params: {
      type: 3
    },
    baseURL: baseURL
  })
}

/**
 * 上传图片
 * @param { String } url oss上传地址
 * @param { Record<string, unknown> } params 上传参数
 * @returns { String } 图片链接
 */
export  function uploadImage(url, params) {
  return instance.post(url, params, { baseURL: baseURL })
}

/**
 * 阿里云oss图片解析
 * @param { String } imgUrl 
 */
export  function ImageResolve(imgUrl) {
  return instance.post('Agent/ReadImage', qs.stringify({url: imgUrl}), { baseURL: baseURL })
}