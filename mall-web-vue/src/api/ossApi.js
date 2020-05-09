import request from '@/utils/request'

/**
 * oss分页
 */
export function page(params,token) {
  return request({
    url: '/oss/page',
    method: 'get',
    params: {
      access_token: token ,
      keyword : params.keyword ,
      pageSize :params.pageSize,
      pageNum : params.pageNum
    }
  })
}

/**
 *  oos 云存储 更新 新增
 * @param data
 * @param token
 * @returns {AxiosPromise}
 */
export function save(data,token) {
  return request({
    url : '/oss/save',
    method : 'post',
    data : data,
    params : {
      access_token: token
    }
  })
}

/**
 * oss 云存储 删除
 * @param id
 * @param token
 * @returns {AxiosPromise}
 */
export function deleteOne(id,token) {
  return request({
    url : '/oss/delete/'+id,
    method : 'post',
    params : {
      access_token: token
    }
  })
}
