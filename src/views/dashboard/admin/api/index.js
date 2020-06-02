import request from '@/utils/request'
// 订单统计
export function order () {
  return request({
    url: '/static',
    method: 'get'
  })
}
// 订单统计表
export function orderList (params) {
  return request({
    url: '/static/' + params.timeType,
    method: 'get'
  })
}

