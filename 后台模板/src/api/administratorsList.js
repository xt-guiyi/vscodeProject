import instance from './request.js'
//管理员列表
export function pageList(data) {
	return instance.post('/Manager/Power/Manager/pageList', data)
}

//添加管理员
export function create(data) {
	return instance.post('/Manager/Power/Manager/create', data)
}

//编辑管理员
export function edit(data) {
	return instance.post('/Manager/Power/Manager/edit', data)
}

//删除管理员
export function deletes(data) {
	return instance.post('/Manager/Power/Manager/delete', data)
}