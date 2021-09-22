import instance from './request.js'

//社区列表
export function getPropertyList (data) {
    return instance.post('/Manager/Property/getPropertyList', data)
}

//编辑社区
export function editProperty (data) {
    return instance.post('/Manager/Property/editProperty', data)
}

//添加社区联系人
export function addPropertyContact (data) {
    return instance.post('/Manager/Property/addPropertyContact', data)
}

//搜索小区
export function searchCommunity (data) {
    return instance.post('/Manager/Property/searchCommunity', data)
}