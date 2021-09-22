import instance from './request.js'

// 部门列表
export function getDepartmentList (data) {
  return instance.post('/Manager/AddressBook/departmentList', data)
}

// 标签列表
export function getTagList (data) {
  return instance.post('/Manager/AddressBook/tagList', data)
}

// 部门用户列表
export function getDepartmentUserList (data) {
  return instance.post('/Manager/AddressBook/departmentUserList', data)
}

// 标签详情
export function getTagDetail (data) {
  return instance.post('/Manager/AddressBook/tagDetail', data)
}

// 用户详情
export function getUser (data) {
  return instance.post('/Manager/AddressBook/getUser', data)
}

// 部门创建
export function departmentCreate (data) {
  return instance.post('/Manager/AddressBook/departmentCreate', data)
}

// 部门编辑
export function departmentEdit (data) {
  return instance.post('/Manager/AddressBook/departmentEdit', data)
}

// 部门删除
export function departmentDelete (data) {
  return instance.post('/Manager/AddressBook/departmentDelete', data)
}

// 添加标签
export function addTagCreate (data) {
  return instance.post('/Manager/AddressBook/tagCreate', data)
}

// 标签编辑
export function tagEdit (data) {
  return instance.post('/Manager/AddressBook/tagEdit', data)
}

// 标签删除
export function tagDelete (data) {
  return instance.post('/Manager/AddressBook/tagDelete', data)
}

// 用户创建
export function addUser (data) {
  return instance.post('/Manager/AddressBook/addUser', data)
}

// 用户编辑
export function editUser (data) {
  return instance.post('/Manager/AddressBook/editUser', data)
}

// 用户删除
export function deleteUser (data) {
  return instance.post('/Manager/AddressBook/deleteUser', data)
} 
