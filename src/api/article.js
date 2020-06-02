import request from '@/utils/request'
// 商户店铺id
export function fetchId (params) {
  return request({
    url: '/shop',
    method: 'get',
    params: {
      page: params.page
    }
  })
}
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
