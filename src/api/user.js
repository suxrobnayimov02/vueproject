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
    url: '/posts',
    method: 'get',
    params: query
  })
}
export function show(id) {
  return request({
    url: '/posts/' + id,
    method: 'get'
  })
}

export function store(role) {
  return request({
    url: 'posts?include=Permissions',
    method: 'post',
    data: role
  })
}

export function update(data) {
  return request({
    url: 'posts',
    method: 'put',
    data: data
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
