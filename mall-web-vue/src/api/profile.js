import request from '@/utils/request'

// 获取用户信息
export function info(id,token) {
  return request({
    url: '/profile/info/'+id,
    method: 'get',
    params: { access_token: token }
  })
}

// 更新用户信息
export function update(data,token) {
  return request({
    url : '/profile/update',
    method: 'post',
    data : data,
    params: { access_token: token }
  })
}
