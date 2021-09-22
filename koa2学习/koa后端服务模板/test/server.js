/**
 * @description jest server
 * @author 小熊熊
 */
const request = require('supertest')
const server = require('../src/app').callback()

module.exports = request(server)
