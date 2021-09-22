import instance from './request.js'

//菜单管理
export function pageList (data) {
    return instance.post('Manager/Power/Menu/list', data)
}
//创建菜单
export function create (data) {
    return instance.post('/Manager/Power/Menu/create', data)
}
//编辑菜单
export function edit (data) {
    return instance.post('/Manager/Power/Menu/edit', data)
}
//删除菜单
export function deletes (data) {
    return instance.post('/Manager/Power/Menu/delete', data)
}