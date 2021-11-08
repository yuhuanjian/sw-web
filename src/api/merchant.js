import request from '@/utils/request'

// 商户管理--分页查询
export function postMerchantQueryMerchantListWithPage(data) {
  return request({
    url: '/management-api/merchant/queryMerchantByRequest',
    method: 'post',
    data
  })
}

// 新增或编辑商户信息
export function postMerchantSaveOrUpdate(data) {
  return request({
    url: '/management-api/merchant/addOrUpdateMerchant',
    method: 'post',

    data
  })
}

// 删除商户信息
export function postMerchantDeleteMerchant(data) {
  return request({
    url: '/management-api/merchant/deleteMerchant',
    method: 'post',

    data
  })
}

// 商户管理-导出
export function postMerchantExportMarchants(params) {
  return (
    process.env.VUE_APP_TARGET_API + process.env.VUE_APP_BASE_API +
        '/management-api/merchant/exportMarchants?' +
        params
  )
}

// 养殖场管理--列表查询
export function postFarmQueryFarmByRequest(data) {
  return request({
    url: '/management-api/farm/queryFarmByRequest',
    method: 'post',
    data
  })
}

// 养殖场管理--新增或编辑
export function postFarmAddOrUpdateFarm(data) {
  return request({
    url: '/management-api/farm/addOrUpdateFarm',
    method: 'post',

    data
  })
}

// 删除养殖场
export function postDeleteFarm(data) {
  return request({
    url: '/management-api/farm/deleteFarm',
    method: 'post',
    data
  })
}

// 养殖场管理-导出
export function postExportFarms(params) {
  return (
    process.env.VUE_APP_TARGET_API + process.env.VUE_APP_BASE_API +
        '/management-api/farm/exportFarms?' +
        params
  )
}

// 市场管理--列表查询
export function postQueryMarcketByRequest(data) {
  return request({
    url: '/management-api/marcket/queryMarcketByRequest',
    method: 'post',
    data
  })
}

// 市场管理--新增或编辑
export function postAddOrUpdateMarcket(data) {
  return request({
    url: '/management-api/marcket/addOrUpdateMarcket',
    method: 'post',

    data
  })
}

// 删除市场
export function postDeleteMarcket(data) {
  return request({
    url: '/management-api/marcket/deleteMarcket',
    method: 'post',

    data
  })
}

// 市场管理-导出
export function postExportMarckets(params) {
  return (
    process.env.VUE_APP_TARGET_API + process.env.VUE_APP_BASE_API +
        '/management-api/marcket/exportMarckets?' +
        params
  )
}
// 路由管理-导出
export function postexportRoutesByRequest(params) {
  return (
    process.env.VUE_APP_TARGET_API + process.env.VUE_APP_BASE_API +
        '/management-api/routeManagement/exportRoutesByRequest?' +
        params
  )
}
// 路由管理--列表查询
export function postSelectRoutesByRequest(data) {
  return request({
    url: '/management-api/routeManagement/selectRoutesByRequest',
    method: 'post',
    data
  })
}

// 路由管理--新增或编辑
export function postAddOrUpdateRoute(data) {
  return request({
    url: '/management-api/routeManagement/addOrUpdateRoute',
    method: 'post',

    data
  })
}

// 删除路由
export function postDelRoute(data) {
  return request({
    url: '/management-api/routeManagement/logicDelRoute',
    method: 'post',

    data
  })
}

// 路由详情
export function postRouteDetail(routeId) {
  return request({
    url: '/management-api/routeManagement/routeDetail/' + routeId,
    method: 'post'
  })
}

// 商户下拉

export function postDropDownMerchant(data) {
  return request({
    url: '/management-api/dropDown/merchant',
    method: 'post',

    data
  })
}
