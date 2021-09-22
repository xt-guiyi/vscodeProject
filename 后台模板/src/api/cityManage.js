import instance from './request.js'
//城市列表
export function pageList(data) {
	return instance.post('Manager/PlatformApp/pageList', data)
}


//城市搜索
export function searchCitys(data) {
	return instance.post('Manager/PlatformApp/searchCity', data)
}
//获取城市名
export function getCityList(data) {
	return instance.post('Manager/PlatformApp/getCityList', data)
}
//添加城市
export function addCity(data) {
	return instance.post('Manager/PlatformApp/addCity', data)
}

//获取系统配置
export function editCityConfigure(data) {
	return instance.post('Manager/PlatformApp/editCityConfigure', data)
}

//更新系统配置
export function updateCityConfigure(data) {
	return instance.post('Manager/PlatformApp/updateCityConfigure', data)
}

//获取权限
export function getRoleRoute(data) {
	return instance.post('Manager/PlatformApp/getRoleRoute', data)
}

//添加层级权限
export function addRoleRoute(data) {
	return instance.post('Manager/PlatformApp/addRoleRoute', data)
}

//编辑层级权限
export function editRoleRoute(data) {
	return instance.post('Manager/PlatformApp/editRoleRoute', data)
}

//更新层级权限
export function updateRoleRoute(data) {
	return instance.post('Manager/PlatformApp/updateRoleRoute', data)
}

// 删除层级权限
export function deleteLevel(data) {
	return instance.post('Manager/PlatformApp/deleteLevel', data)
}