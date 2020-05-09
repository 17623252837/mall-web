import request from '@/utils/request'

export function fetchList(params,token) {
  return request({
    url: '/resource/list',
    method: 'get',
    params: {
      access_token: token ,
      categoryId : params.categoryId ,
      nameKeyword : params.nameKeyword,
      urlKeyword : params.urlKeyword,
      pageSize :params.pageSize,
      pageNum : params.pageNum
    }
  })
}

export function createResource(data,token) {
  return request({
    url: '/resource/create',
    method: 'post',
    data: data,
    params: { access_token: token }
  })
}

export function updateResource(id, data,token) {
  return request({
    url: '/resource/update/' + id,
    method: 'post',
    data: data,
    params: { access_token: token }
  })
}

export function deleteResource(id,token) {
  return request({
    url: '/resource/delete/' + id,
    method: 'post',
    params: { access_token: token }
  })
}

export function fetchAllResourceList(token) {
  return request({
    url: '/resource/listAll',
    method: 'get',
    params: { access_token: token }
  })
}
