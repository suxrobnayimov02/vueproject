import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: 'https://jsonplaceholder.typicode.com/posts',
    method: 'get',
    params: query
  })
}

export function fetchArticle(id) {
  return request({
    url: 'https://jsonplaceholder.typicode.com/posts',
    method: 'get',
    params: { id }
  })
}

export function createArticle(data) {
  return request({
    url: 'https://jsonplaceholder.typicode.com/posts',
    method: 'post',
    data
  })
}

export function updateArticle(data) {
  return request({
    url: 'https://jsonplaceholder.typicode.com/posts',
    method: 'post',
    data
  })
}

export function fetchPostArticle(id) {
  return request({
    url: 'https://jsonplaceholder.typicode.com/posts/',
    method: 'get',
    params: { id }
  })
}


