import request from '@/utils/request'

export function listAllCate(token) {
  return request({
    url: '/resourceCategory/listAll',
    method: 'get',
    params: { access_token: token }
  })
}

export function createResourceCategory(data,token) {
  return request({
    url: '/resourceCategory/create',
    method: 'post',
    data: data,
    params: { access_token: token }
  })
}

export function updateResourceCategory(id, data,token) {
  return request({
    url: '/resourceCategory/update/' + id,
    method: 'post',
    data: data,
    params: { access_token: token }
  })
}

export function deleteResourceCategory(id,token) {
  return request({
    url: '/resourceCategory/delete/' + id,
    method: 'post',
    params: { access_token: token }
  })
}
