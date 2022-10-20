import request from '@/utils/request'

export function index(query) {
  return request({
    url: 'https://jsonplaceholder.typicode.com/comments',
    method: 'get',
    params: query
  })
}

export function show(id) {
  return request({
    url: 'https://jsonplaceholder.typicode.com/comments/' + id,
    method: 'get'
  })
}

export function store(data) {
  return request({
    url: 'https://jsonplaceholder.typicode.com/comments',
    method: 'post',
    data
  })
}

export function update(data) {
  return request({
    url: 'https://jsonplaceholder.typicode.com/comments/' + data.id,
    method: 'put',
    data: data
  })
}


