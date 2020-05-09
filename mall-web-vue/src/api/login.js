import request from '@/utils/request'

export function fetchList(params,token) {
  return request({
    url: '/admin/list',
    method: 'get',
    params: {
              access_token:   token ,
              keyword : params.keyword ,
              pageSize :params.pageSize,
              pageNum : params.pageNum
    }
  })
}

export function createAdmin(data,token) {
  return request({
    url: '/admin/register',
    method: 'post',
    data: data,
    params: { access_token: token }
  })
}

export function updateAdmin(id, data,token) {
  return request({
    url: '/admin/update/' + id,
    method: 'post',
    data: data,
    params: { access_token: token }
  })
}

export function updateStatus(id, params,token) {
  return request({
    url: '/admin/updateStatus/' + id,
    method: 'post',
    params: params
  })
}



export function deleteAdmin(id,token) {
  return request({
    url: '/admin/delete/' + id,
    method: 'post',
    params: { access_token: token }
  })
}

export function getRoleByAdmin(id,token) {
  return request({
    url: '/admin/role/' + id,
    method: 'get',
    params: { access_token: token }
  })
}

export function allocRole(data,token) {
  return request({
    url: '/admin/role/update',
    method: 'post',
    data: data,
    params: { access_token: token }
  })
}
