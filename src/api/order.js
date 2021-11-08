import request from '@/utils/request'

// 商户管理--列表查询
export function postQueryOrdersByRequest(data) {
  return request({
    url: '/management-api/orders/queryOrdersByRequest',
    method: 'post',
    data
  })
}

// 新增订单
export function postAddOrders(data) {
  return request({
    url: '/management-api/orders/addOrders',
    method: 'post',

    data
  })
}

// 新增订单
export function postFindOrdersById(ordersId) {
  return request({
    url: '/management-api/orders/findOrdersById/' + ordersId,
    method: 'post'
  })
}
