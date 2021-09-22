import instance from './request.js'
//网格层次
export function levelList(data) {
	return instance.post('Manager/Community/getCommunityLevel', data)
}

// 小区列表excel导出
export function getExcelCommunity(data) {
	console.log(data)
	return instance.get('Manager/Community/getExcelCommunity', {
		params: data,
	})
}

// 添加小区
export function addCommunity(data) {
	return instance.post('Manager/Community/addCommunity', data)
}

// 用户搜索
export function userSearch(data) {
	return instance.post('Manager/Community/searchUser', data)
}
// 小区管理员状态更新
export function statusUpdate(data) {
	return instance.post('Manager/Community/updateUserStatus', data)
}

// 网格列表	
export function getCommunityGridUser(data) {
	return instance.post('Manager/Community/getCommunityGridUser', data)
}

// 网格导出	
export function getExcelCommunityGridUser(data) {
	return instance.get('Manager/Community/getExcelCommunityGridUser', {
		params: data
	})
}

// 网格搜索	
export function searchUserInfo(data) {
	return instance.post('Manager/Community/searchUserInfo', data)
}

// 添加小宁机器人
export function addRobot(data) {
	return instance.post('Manager/Community/addRobot', data)
}
// 社区可授权层级用户列表
export function authorizedUserList(data) {
	return instance.post('/Manager/Community/authorizedUserList', data)
}

// 添加成员到一级()
export function addUserOneLevel(data) {
	return instance.post('Manager/Community/addUserOneLevel', data)
}

// 添加成员二级()
export function addUserTwoLevel(data) {
	return instance.post('Manager/Community/addUserTwoLevel', data)
}

// 添加成员到三级（人大代表）
export function addUserSupervisor(data) {
	return instance.post('Manager/Community/addUserSupervisor', data)
}

// 当前层级已存在的标签
export function getCommunityLevelTag(data) {
	return instance.post('/Manager/Community/getCommunityLevelTag', data)
}

// 编辑社区层级标签
export function communityLevelTagEdit(data) {
	return instance.post('/Manager/Community/communityLevelTagEdit', data)
}

// 获取当前网格员的群名和群连接
export function getGroupUserInfo(data) {
	return instance.post('Manager/Community/getGroupUserInfo', data)
}
// 群主列表
export function getGroupLeaderList(data) {
	return instance.post('Manager/Community/getGroupLeaderList', data)
}
// 更新群主
export function updateGroupLeader(data) {
	return instance.post('Manager/Community/updateGroupLeader', data)
}

// 小区用户列表
export function getUserList(data) {
	return instance.post('Manager/Community/getUserList', data)
}
// 搜索网格小区用户
export function searchUserGroup(data) {
	return instance.post('Manager/Community/searchUserGroup', data)
}







