import request from '@/utils/request'

export function fetchList(parentId, params,token) {
  return request({
    url: '/menu/list/' + parentId,
    method: 'get',
    params: {
      access_token: token ,
      keyword : params.parentId ,
      pageSize :params.pageSize,
      pageNum : params.pageNum
    }
  })
}

export function deleteMenu(id,token) {
  return request({
    url: '/menu/delete/' + id,
    method: 'post',
    params: { access_token: token }
  })
}

export function createMenu(data,token) {
  return request({
    url: '/menu/create',
    method: 'post',
    data: data,
    params: { access_token: token }
  })
}

export function updateMenu(id, data,token) {
  return request({
    url: '/menu/update/' + id,
    method: 'post',
    data: data,
    params: { access_token: token }
  })
}

export function getMenu(id,token) {
  return request({
    url: '/menu/' + id,
    method: 'get',
    params: { access_token: token }
  })
}

export function updateHidden(id, params) {
  return request({
    url: '/menu/updateHidden/' + id,
    method: 'post',
    params: params
  })
}

export function fetchTreeList(token) {
  return request({
    url: '/menu/treeList',
    method: 'get',
    params: { access_token: token }
  })
}

