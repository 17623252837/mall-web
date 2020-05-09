import request from '@/utils/request'

export function fetchList(params,token) {
  return request({
    url: '/role/list',
    method: 'get',
    params: { access_token: token ,
      keyword : params.keyword ,
      pageSize :params.pageSize,
      pageNum : params.pageNum
    }
  })
}

export function createRole(data,token) {
  return request({
    url: '/role/create',
    method: 'post',
    data: data ,
    params: { access_token: token }
  })
}

export function updateRole(id, data,token) {
  return request({
    url: '/role/update/' + id,
    method: 'post',
    data: data,
    params: { access_token: token }
  })
}

export function updateStatus(id, params,token) {
  return request({
    url: '/role/updateStatus/' + id,
    method: 'post',
    params: params,
  })
}

export function deleteRole(data,token) {
  return request({
    url:'/role/delete',
    method:'post',
    data:data,
    params: { access_token: token }
  })
}

  export function fetchAllRoleList(token) {
  return request({
    url: '/role/listAll',
    method: 'get',
    params: { access_token: token }
  })
}

export function listMenuByRole(roleId,token) {
  return request({
    url: '/role/listMenu/'+roleId,
    method: 'get',
    params: { access_token: token }
  })
}

export function listResourceByRole(roleId,token) {
  return request({
    url: '/role/listResource/'+roleId,
    method: 'get',
    params: { access_token: token }
  })
}

export function allocMenu(data,token) {
  return request({
    url: '/role/allocMenu',
    method: 'post',
    data:data,
    params: { access_token: token }
  })
}

export function allocResource(data,token) {
  return request({
    url: '/role/allocResource',
    method: 'post',
    data:data,
    params: { access_token: token }
  })
}
