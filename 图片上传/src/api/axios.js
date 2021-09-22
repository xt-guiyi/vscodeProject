/*
 * @Description:
 * @Author: 小熊熊
 * @Date: 2020-10-29 18:54:34
 * @LastEditors: 小熊熊
 * @LastEditTime: 2020-11-13 16:28:34
 */
/*
 * axios封装
 * 请求拦截，响应拦截,错误回调统一处理
 */

import axios from 'axios'
import { getQueryString } from '@/utils/url.js'

let baseURLList = new Map([
  ['1045', 'https://alpha-jinjian.fpwan.com'],
  ['1048', 'https://beta-jinjian.fpwan.com'],
  ['1032', 'https://jinjian.fpwan.com'],
])
// base地址
if(baseURLList.has(getQueryString('channelId'))) {
  axios.defaults.baseURL = baseURLList.get(getQueryString('channelId'))
  console.log(baseURLList.get(getQueryString('channelId')))
}else {
  axios.defaults.baseURL = 'https://alpha-jinjian.fpwan.com'
}


// 创建axios实例
const instance = axios.create({ timeout: 10000 })
// 在instance上设置post请求头
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded' 

// 请求拦截器
instance.interceptors.request.use(config => {
  return config
})
// 响应拦截器
instance.interceptors.response.use(
  response => response,
  error => {
    const { response } = error
    if (response) {
      console.log(response)
    } else {
      // 断网处理
      console.log('请连接网络')
    }
    return error
  }
)
export default instance
