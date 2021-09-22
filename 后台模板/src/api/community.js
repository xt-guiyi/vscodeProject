import instance from './request.js'

//小区列表
export function getCommunityList (data) {
  return instance.post('/Manager/Community/getCommunity', data)
}
 
//获取小区名
export function getCommunityLetter (data) {
  return instance.post('/Manager/Community/getCommunityLetter', data)
}

//搜索小区
export function searchCommunity (data) {
  return instance.post('/Manager/Community/searchCommunity', data)
}