/*
 * @Description:
 * @Author: 小熊熊
 * @Date: 2020-10-29 18:54:34
 * @LastEditors: 小熊熊
 * @LastEditTime: 2020-11-13 16:28:34
 */
import axios from 'axios'
import qs from 'qs'
import store from '@/store/index'
import { requestUrl } from '@/config/env.js'

const instance = axios.create({
  timeout: 10000,
  baseURL: requestUrl
})
// 请求拦截器
instance.interceptors.request.use(config => {
  let platformAppId;
  // console.log(112,config)

  if(config.url !== '/Manager/PlatformApp/platformAppList' && config.url !== '/Manager/Report/copyClassLibrary') {
    platformAppId = store.state.user.platformAppId
  }
  if(config.method === 'get') {
    config.params = {
      token: store.state.user.token,
      platformAppId: platformAppId,
      ...config.params 
    }
  }else {
    config.data = qs.stringify({
      token: store.state.user.token,
      platformAppId: platformAppId,
      ...config.data 
    })
  }
  // console.log()
  return config
})


// 响应拦截器
instance.interceptors.response.use(
  response => response,
  error => {
    const { response } = error
    if (response) {
      // console.log(response)
    } else {
      // console.log('wrong')
    }
    return error
  }
)


export default instance
