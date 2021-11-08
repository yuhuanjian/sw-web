import request from '@/utils/request'

// 屠宰单管理-列表查询
export function postQueryButcherOrderByRequest(data) {
  return request({
    url: '/management-api/butchOrder/queryButcherOrderByRequest',
    method: 'post',
    data
  })
}

// 屠宰单管理-新增/修改保存数据
export function postAddOrUpdateButcherOrder(data) {
  return request({
    url: '/management-api/butchOrder/addOrUpdateButcherOrder',
    method: 'post',
    data
  })
}

// 屠宰单管理-详情
export function postButcherOrderDetail(id) {
  return request({
    url: '/management-api/butchOrder/butcherOrderDetail/' + id,
    method: 'post'
  })
}

// 屠宰单管理-导出
export function gettExportButcherOrder(params) {
  return (process.env.VUE_APP_TARGET_API + process.env.VUE_APP_BASE_API +
    '/management-api/butchOrder/exportButcherOrder?' +
    params)
}

// 市场下拉框
export function postDropDownMarcket(data) {
  return request({
    url: '/management-api/dropDown/marcket',
    method: 'post',
    data
  })
}
