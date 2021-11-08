import request from '@/utils/request'

class OrderApi {
  // 订单管理--列表查询
  postAddOrdersqueryOrdersByRequest(data) {
    return request({
      url: '/management-api/orders/queryOrdersByRequest',
      method: 'post',
      data
    })
  }
  // 订单管理--导出
  postordersrexportOrders(params) {
    return (
      process.env.VUE_APP_TARGET_API + process.env.VUE_APP_BASE_API +
                '/management-api/orders/exportOrders?' +
                params
    )
  }
  // 商户下拉框
  postdropDownmerchant(data) {
    return request({
      url: '/management-api/dropDown/merchant',
      method: 'post',
      data
    })
  }
  // 商户下拉框2
  postdroprouteMerchantDropDown() {
    return request({
      url: '/management-api/dropDown/routeMerchantDropDown',
      method: 'post'
    })
  }
  // 订单管理--交易
  postorderssaveCertificateManagementInfo(data) {
    return request({
      url: '/management-api/orders/saveCertificateManagementInfo',
      method: 'post',
      data
    })
  }
  // 订单管理--详情
  postorderqueryOrderDetails(data) {
    return request({
      url: '/management-api/orders/queryOrderDetails',
      method: 'post',
      headers: {
        'content-Type': 'application/x-www-form-urlencoded'
      },
      data
    })
  }
  // 订单管理--编辑
  postorderqueryOrdereditOrders(data) {
    return request({
      url: '/management-api/orders/editOrders',
      method: 'post',

      data
    })
  }

  // 区域管理省
  postareagetProvince() {
    return request({
      url: '/management-api/area/getProvince',
      method: 'post'
    })
  }
  // 区域管理市
  postareagetgetCity(data) {
    return request({
      url: '/management-api/area/getCity',
      method: 'post',
      headers: {
        'content-Type': 'application/x-www-form-urlencoded'
      },
      data
    })
  }
  // 区域管理区县
  postareagetgetCounty(data) {
    return request({
      url: '/management-api/area/getCounty',
      method: 'post',
      headers: {
        'content-Type': 'application/x-www-form-urlencoded'
      },
      data
    })
  }
  // 已关联路由的商户下拉框
  postqueryAllRoutedMerchant() {
    return request({
      url: '/management-api/dropDown/queryAllRoutedMerchant',
      method: 'post'
    })
  }
  // 订单管理--交易编辑/详情条件查询
  postqueryTradeByRequest(data) {
    return request({
      url: '/management-api/orders/queryTradeByRequest',
      method: 'post',
      data
    })
  }
  // 订单管理--订单信息编辑
  editOrderInformation(data) {
    return request({
      url: '/management-api/orders/editOrderInformation',
      method: 'post',
      data
    })
  }
  // 订单管理--交易
  saveCertificateManagementInfo(data) {
    return request({
      url: '/management-api/orders/saveCertificateManagementInfo',
      method: 'post',
      data
    })
  }
  // 订单管理--交易
  updateWholesalerInfo(data) {
    return request({
      url: '/management-api/orders/updateWholesalerInfo',
      method: 'post',
      data
    })
  }
}
export default new OrderApi()
