import request from '@/utils/request'

export function login (username, password) {
  console.log(username)
  return request({
    // url: '/vue-element-admin/user/login',
    // method: 'post',
    // data: {
    //   username: username,
    //   password: password
    // }
    url: '/merchants/login',
    method: 'post',
    data: {
      phone: username,
      password: password
    }

  })
}

export function getInfo (token) {
  // console.log(token)
  // const roles = {
  //   0: 'admin'
  // }
  // return roles
  // axios.get('vue-element-admin/user/info').then(res => {
  //   return res
  // }).catch(err => {
  //   return err
  // })
  return request({
    url: '/vue-element-admin/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout () {
  return request({
    url: '/vue-element-admin/user/logout',
    method: 'post'
  })
}
