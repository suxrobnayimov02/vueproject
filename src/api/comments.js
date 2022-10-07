import request from '@/utils/request'

export function getComments(query) {
  return request({
    url: '/comments/',
    method: 'get',
    params: query
  })
}


