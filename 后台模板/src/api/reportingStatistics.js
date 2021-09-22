import instance from './request.js'

// 报事列表		/Manager/Report/reportList
export function reportList(data) {
	return instance.post('Manager/Report/reportList', data)
}

// 报事导出		/Manager/Report/exportList
export function exportList(data) {
	return instance.get('Manager/Report/exportList', {
		params:data
	})
}

// 报事类型列表		/Manager/Report/exportList
export function classList(data) {
	return instance.post('/Manager/Report/classList', data)
}


