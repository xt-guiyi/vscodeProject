import instance from './request.js'
//报事类型列表
export function classList(data) {
	return instance.post('/Manager/Report/classList', data)
}
//创建报事类型
export function classCreate(data) {
	return instance.post('/Manager/Report/classCreate', data)
}
//报事类编辑
export function classEdit(data) {
	return instance.post('/Manager/Report/classEdit', data)
}
//报事类型库列表
export function classLibraryList(data) {
	return instance.post('/Manager/Report/classLibraryList', data)
}
// 类型库类型列表
export function typeList(data) {
	return instance.post('Manager/Report/typeList', data)
}
// 创建类型库
export function classLibraryCreate(data) {
	return instance.post('/Manager/Report/classLibraryCreate', data)
}
// 创建类型库类型
export function classLibraryConfigCreate(data) {
	return instance.post('/Manager/Report/classLibraryConfigCreate', data)
}
// 编辑类型库类型
export function classLibraryConfigEdit(data) {
	return instance.post('/Manager/Report/classLibraryConfigEdit', data)
}
// 复制类型库配置
export function copyClassLibrary(data) {
	return instance.post('/Manager/Report/copyClassLibrary', data)
}