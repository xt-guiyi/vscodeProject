/**
 * @description  res 的数据模型
 * @author 小熊熊
 */

/**
 * 基础模块
 */

class BaseModel {
  constructor({ errno, data, message }) {
    this.errno = errno
    if (data) {
      this.data = data
    }
    this.message = message
  }
}

/**
 * 成功模块
 */

class SuccessModel extends BaseModel {
  constructor(data = {}) {
    super({ errno: 0, data })
  }
}
/**
 * 失败模块
 */
class ErrorModel extends BaseModel {
  constructor({ errno = 0, message }) {
    super({ errno, message })
  }
}

module.exports = {
  SuccessModel,
  ErrorModel,
}
