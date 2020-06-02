// 获取银行省
import request from '@/utils/request'
import qs from 'querystring'

export function province () {
  return request({
    url: '/province',
    method: 'get',
  })
}

// 获取银行市
export function city (params) {
  return request({
    url: '/city/' + params,
    method: 'get',
  })
}

// 获取银行区
export function area (params) {
  return request({
    url: '/area/' + params,
    method: 'get',
  })
}

// 获取银行列表
export function bank () {
  return request({
    url: '/bank',
    method: 'get',
  })
}

// 获取银行分行
export function bank_branch (params) {
  return request({
    url: '/bank/' + params,
    method: 'get',
  })
}

// 获取商户进件信息
export function gain () {
  return request({
    url: '/material',
    method: 'get',
  })
}

// 商户进件保存
export function save (params) {
  return request({
    url: '/material',
    method: 'put',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: qs.encode(params),
  })
}

// 提交
export function sub (params) {
  return request({
    url: '/material',
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: qs.encode(params),
  })
}
