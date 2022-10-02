import request from '@/utils/request'

export function getComments(query) {
  return request({
    url: '/comments/',
    method: 'get',
    params: query
  })
}

export function getComments_id(id) {
	return request({
		url: 'comments/' + id,
		method: 'get'
	})
}

