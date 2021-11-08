
// 配送调度
import request from '@/utils/request'
class DistributionAPI {
  // 列表数据
  PostqueryDistributionOrderByRequest(data) {
    return request({
      url: '/management-api/distributionOrderMana/queryDistributionOrderByRequest',
      method: 'post',
      data
    })
  }
  // 配载保存
  PostDispatch(data) {
    return request({
      url: '/management-api/distributionOrderMana/dispatch',
      method: 'post',
      data
    })
  }
  // 编辑调度单配载保存
  PostEditDistributionOrder(data) {
    return request({
      url: '/management-api/distributionOrderMana/editDistributionOrder',
      method: 'post',
      data
    })
  }
  // 编辑调度单拼车保存
  PostEditShareDistributionOrder(data) {
    return request({
      url: '/management-api/distributionOrderMana/editShareDistributionOrder',
      method: 'post',
      data
    })
  }
  // 获取调度tab数据
  PostDispatchWindow(data) {
    return request({
      url: '/management-api/distributionOrderMana/dispatchWindow',
      method: 'post',
      data
    })
  }
  // 配送车辆列表 flag是否拼车 0否 1是
  PostDispatchVehicleDropDown(flag) {
    return request({
      url: '/management-api/distributionOrderMana/dispatchVehicleDropDown/' + flag,
      method: 'post'
    })
  }
  // 根据车辆id查询当天该车辆配送单号列表
  PostDispatchedOrderNumber(distributionOrderId) {
    return request({
      url: '/management-api/distributionOrderMana/dispatchedOrderNumber/ ' + distributionOrderId,
      method: 'post'
    })
  }
  // 配送司机列表 flag是否拼车 0否 1是
  PostDriver(flag) {
    return request({
      url: '/management-api/dropDown/driver',
      method: 'post'
    })
  }
  // 屠宰单管理-导出
  gettExportDispatchOrder(params) {
    return (process.env.VUE_APP_TARGET_API + process.env.VUE_APP_BASE_API +
      '/management-api/distributionOrderMana/exportDistributionOrderByRequest?' +
      params)
  }
}

export default new DistributionAPI()
