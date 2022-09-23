import request from '@/utils/request'

export function login(data) {
  return request({
    url: 'login',
    method: 'post',
    data
  })
}
export function logout() {
  return request({
    url: 'logout',
    method: 'get'
  })
}
export function index(query) {
  return request({
    url: '/roles',
    method: 'get',
    params: query
  })
}
export function show(id) {
  return request({
    url: '/roles/' + id,
    method: 'get'
  })
}

export function store(role) {
  return request({
    url: 'roles?include=Permissions',
    method: 'post',
    data: role
  })
}

export function update(role) {
  return request({
    url: 'roles/' + role.id,
    method: 'put',
    data: role.data
  })
}

export function getInfo() {
  return request({
    url: '/auth/get-info',
    method: 'post'
  })
}
export function destroy(id) {
  return request({
    url: 'users/' + id,
    method: 'delete'
  })
}
