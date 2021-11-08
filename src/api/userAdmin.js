import request from '@/utils/request'

class userAdmin {
  // 用户管理-导出
  getuserexportUsers(params) {
    return (
      process.env.VUE_APP_TARGET_API + process.env.VUE_APP_BASE_API +
                '/management-api/user/exportUsers?' +
                params
    )
  }
  // 角色列表导出
  getuserexportRoleListByRequest(params) {
    return (
      process.env.VUE_APP_TARGET_API + process.env.VUE_APP_BASE_API +
                '/management-api/exportRoleListByRequest?' +
                params
    )
  }
  // 角色管理-列表查询
  postrolequeryRoleListByRequest(data) {
    return request({
      url: '/management-api/role/queryRoleListByRequest',
      method: 'post',
      data
    })
  }
  // 角色管理-新增/编辑角色
  postroleaddOrModRole(data) {
    return request({
      url: '/management-api/role/addOrModRole',
      method: 'post',
      data
    })
  }
  // 角色管理-启用/禁用/删除角色
  postrolechangeRole(data) {
    return request({
      url: '/management-api/role/changeRole',
      method: 'post',
      data
    })
  }
  // 角色管理-设置权限-操作权限
  postrolequeryRoleMenus(data) {
    return request({
      url: '/management-api/role/queryRoleMenus/' + data,
      method: 'post',
      headers: {
        'content-Type': 'application/x-www-form-urlencoded'
      }
    })
  }
  // 角色管理-设置权限-成员列表
  postrolequeryRoleUser(data, data1, data2) {
    return request({
      url: '/management-api/role/queryRoleUser/' +
                    data +
                    '/' +
                    data1 +
                    '/' +
                    data2,
      method: 'post',
      headers: {
        'content-Type': 'application/x-www-form-urlencoded'
      }
    })
  }
  // 角色管理-设置权限-保存
  postroleaddMenu(data) {
    return request({
      url: '/management-api/role/addMenu',
      method: 'post',
      data
    })
  }
  // 角色管理-添加用户弹窗
  postOpenAddRoleUserWindow(data) {
    return request({
      url: '/management-api/role/openAddRoleUserWindow/' + data,
      method: 'post',
      headers: {
        'content-Type': 'application/x-www-form-urlencoded'
      }
    })
  }
  // 角色管理-添加用户-确定
  postAddUserw(data) {
    return request({
      url: '/management-api/role/addUser',
      method: 'post',
      data
    })
  }
  // 角色下拉框
  postdropDownrole() {
    return request({
      url: '/management-api/dropDown/role',
      method: 'post'
    })
  }
  // 用户管理-列表查询
  postqueryUsersByRequest(data) {
    return request({
      url: '/management-api/user/queryUsersByRequest',
      method: 'post',
      data
    })
  }
  // 用户管理-新增/编辑用户
  postaddOrUpdateUser(data) {
    return request({
      url: '/management-api/user/addOrUpdateUser',
      method: 'post',
      data
    })
  }
  // 用户管理-停用/启用/删除用户 重置密码
  postupdateUser(data) {
    return request({
      url: '/management-api/user/updateUser',
      method: 'post',
      data
    })
  }
  // 用户管理-查看权限
  postqueryUserMenus(data) {
    return request({
      url: '/management-api/user/queryUserMenus/' + data,
      method: 'post',
      headers: {
        'content-Type': 'application/x-www-form-urlencoded'
      }
    })
  }
}
export default new userAdmin()
