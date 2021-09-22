import instance from './request.js'
//权限组列表
export function roleList(data) {
	return instance.post('/Manager/Power/Manager/roleList', data)
}
//创建权限组
export function create(data) {
	return instance.post('/Manager/Power/Role/create', data)
}
//编辑权限组
export function edit(data) {
	return instance.post('/Manager/Power/Role/edit', data)
}
//删除权限组
export function deletes(data) {
	return instance.post('/Manager/Power/Role/delete', data)
}