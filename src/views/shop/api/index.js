import request from '@/utils/request'
// 获取省
export function bank (params) {
  return request({
    url: '/province',
    method: 'get',
    params: params
  })
}
// 获取市
export function province (params) {
  return request({
    url: '/city/' + params,
    method: 'get'
  })
}
// 一级行业
export function one_industry (params) {
  return request({
    url: '/jd/industry',
    method: 'get',
    params: params
  })
}
// 二级行业
export function two_industry (params) {
  return request({
    url: '/jd/industry/' + params,
    method: 'get',
    params: params
  })
}
export function Logo (params) {
  return request({
    url: '/file/material',
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data: params
  })
}
// 经营类型
export function baseType () {
  return request({
    url: '/base/type',
    method: 'get'
  })
}

// 添加
export function fetchAdd (params) {
  return request({
    url: '/shop',
    method: 'post',
    data: {
      address: params.address,
      two_industry: params.two_industry,
      mobile_phone: params.mobile_phone,
      map_lng: Number(params.map_lng),
      map_lat: Number(params.map_lat),
      shop_name: params.shop_name,
      one_industry: params.one_industry,
      logo: params.logo,
      micro_biz_type: params.micro_biz_type
    }
  })
}

// 商户修改

export function modification (id, params) {
  return request({
    url: '/shop/' + id,
    method: 'put',
    params:
     {
       address: params.address,
       two_industry: params.two_industry,
       mobile_phone: params.mobile_phone,
       map_lng: Number(params.map_lng),
       map_lat: Number(params.map_lat),
       shop_name: params.shop_name,
       one_industry: params.one_industry,
       logo: params.logo,
       micro_biz_type: params.micro_biz_type
     }
  })
}

