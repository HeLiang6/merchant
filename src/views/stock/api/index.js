import request from '@/utils/request'
// import qs from 'qs'

// export function city() {
//   return request({
//     url: '/province',
//     methods: 'get'
//   })
// }
export function type () {
  return request({
    url: '/base/type',
    method: 'get'
  })
}
// 上传文件
export function Img (params) {
  return request({
    url: '/file/material',
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data: params
  })
}
// 营业执照图片上传
export function license (params) {
  return request({
    url: '/file/license',
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data: params
  })
}
// 上传银行卡
export function bankCard (params) {
  return request({
    url: '/file/bankCard',
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data: params
  })
}
// 身份证正面上传
export function idCardFront (params) {
  return request({
    url: '/file/idCardFront',
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data: params
  })
}
// 身份证反面上传
export function idCardBack (params) {
  return request({
    url: '/file/idCardBack',
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data: params
  })
}

// 获取银行省
export function bank (params) {
  return request({
    url: '/province',
    method: 'get',
    params: params
  })
}
// 获取银行市
export function province (params) {
  return request({
    url: '/city/' + params,
    method: 'get'
  })
}
// 获取银行区
export function bankarea (params) {
  return request({
    url: '/area/' + params,
    method: 'get'
  })
}
// 获取银行列表
export function bank_name () {
  return request({
    url: '/bank',
    method: 'get'
  })
}
// 获取银行分行
export function bank_branch (params) {
  return request({
    url: '/bank/' + params,
    method: 'get'
  })
}
// 提交
export function sub (params) {
  return request({
    url: '/material',
    method: 'post',
    data: params
  })
}

// 商户进件保存
export function save (params) {
  return request({
    url: '/material',
    method: 'put',
    data: params
  })
}

// 获取商户进件信息
export function gain (params) {
  return request({
    url: '/material',
    method: 'get',
    params: params
  })
}
