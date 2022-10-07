import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/posts',
    method: 'get',
    params: query
  })
}

export function fetchArticle(id) {
  return request({
    url: '/posts',
    method: 'get',
    params: { id }
  })
}

export function createArticle(data) {
  return request({
    url: '/posts',
    method: 'post',
    data
  })
}

export function updateArticle(data) {
  return request({
    url: '/posts',
    method: 'post',
    data
  })
}

export function fetchPostArticle(id) {
  return request({
    url: '/posts/',
    method: 'get',
    params: { id }
  })
}


