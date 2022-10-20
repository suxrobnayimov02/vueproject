import request from '@/utils/request'

export function getPosts(query) {
  return request({
    url: 'https://jsonplaceholder.typicode.com/posts',
    method: 'get',
    params: query
  })
}


