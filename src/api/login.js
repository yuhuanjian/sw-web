import request from '@/utils/request'

class userInfos {
  // 获取公钥
  postAusergetPublicKey() {
    return request({
      url: '/management-api/user/auth/getPublicKey',
      method: 'get'
    })
  }
  // 登录
  postuserlogin(data) {
    return request({
      url: '/management-api/user/login',
      method: 'post',
      data
    })
  }
  // 退出登录
  logout() {
    return request({
      url: '/management-api/user/logout',
      method: 'post'
    })
  }
  // 获取路由树
  postGetUserRoutes(data) {
    return request({
      url: '/management-api/user/getUserRoutes/' + data,
      method: 'post',
      headers: {
        'content-Type': 'application/x-www-form-urlencoded'
      }
    })
  }
}
export default new userInfos()
