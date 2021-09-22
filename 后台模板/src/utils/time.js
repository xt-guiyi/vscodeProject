/**
 * 获取年月日时分秒
 * @param {Object} timeStamp 时间戳
 */
export const getAllTime = function (timeStamp) {
	if(!timeStamp) return
	return getYear(timeStamp)+'/'+ getMonthDay(timeStamp)
}

/**
 * 获取年
 * @param {Object} timeStamp 时间戳
 */
export const getYear = function(timeStamp) {
	if(!timeStamp) return
	// 转换成毫秒
	timeStamp = timeStamp * 1000
	const dateTime = new Date(timeStamp)
	return  dateTime.getFullYear(timeStamp)
}

/**
 * 获取月日时分秒
 * @param {Object} timeStamp 时间戳
 */
export const getMonthDay = function (timeStamp) {
	if(!timeStamp) return
	// 转换成毫秒
	timeStamp = timeStamp * 1000
	const dateTime = new Date(timeStamp)
	const month = (dateTime.getMonth() + 1).toString().padStart(2,'0')
	const day = dateTime.getDate().toString().padStart(2,'0')
	const hour = dateTime.getHours()
	const minute = dateTime.getMinutes().toString().padStart(2,'0')
	return `${month}/${day}  ${hour}:${minute}`
}

export const dataTime = function (e) {
	let old = new Date(e)
	let now = new Date();
	let oY = old.getFullYear();
	let oM = old.getMonth()+1
	let oD = old.getDate()
	let oh = old.getHours()
	let om = old.getMinutes()
	if(om < 10){
		om = '0' + om
	}
	let nY = now.getFullYear()
	let nM = now.getMonth()+1
	let nD = now.getDate()
	if(oD === nD && oM === nM && oY === nY) {
		if(oh < 12) {
			return '上午'+oh+':'+om
		}
		if(oh > 12) {
			return '下午'+(oh-12)+':'+om
		}
		if(oh == 12){
			return '中午'+oh+':'+om
		}
	}
	if(oD+1 === nD && oM === nM && oY === nY){
		return '昨天'
	}else{
		return oY+'-'+oM+'-'+oD
	}
}