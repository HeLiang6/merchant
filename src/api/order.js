import request from '@/utils/request'

// 订单列表
export function fetchList (params) {
  return request({
    url: '/order',
    method: 'get',
    params: params,
  })
}

// 同步订单
export function orderSync (id) {
  return request({
    url: '/orderSync/' + id,
    method: 'get',
  })
}

export function orderClose (id) {
  return request({
    url: '/order/close/' + id,
    method: 'put',
  })
}

export function orderCancel (id) {
  return request({
    url: '/order/cancel/' + id,
    method: 'put',
  })
}

export function orderRefund (id) {
  return request({
    url: '/order/refund/' + id,
    method: 'put',
  })
}

