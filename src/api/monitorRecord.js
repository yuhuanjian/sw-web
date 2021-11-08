import request from '@/utils/request'

class MonitorRecord {
  // 监控-监控记录-查询记录
  postmonitorRecordqueryMonitorRecord(data) {
    return request({
      url: '/management-api/monitorRecord/queryMonitorRecord',
      method: 'post',
      data
    })
  }
  // 新增资料分类(ID为null)，编辑(传入ID值)
  postmonitorRecordaddMonitorType(data) {
    return request({
      url: '/management-api/monitorType/addMonitorType',
      method: 'post',
      data
    })
  }
  // 监控-监控记录-上传文件
  postmonitorRecorduploadFile(data) {
    return request({
      url: '/management-api/monitorRecord/uploadFile',
      method: 'post',
      headers: {
        'content-Type': 'multipart/form-data'
      },
      data
    })
  }
  // 删除监控记录
  postmonitorRecorddeleteMonitor(data) {
    return request({
      url: '/management-api/monitorRecord/deleteMonitor',
      method: 'post',
      data
    })
  }
  // 查询资料分类
  postmonitorRecordqueryMonitorType(data) {
    return request({
      url: '/management-api/monitorType/queryMonitorType',
      method: 'post',
      data
    })
  }
  // 删除资料分类
  postmonitorRecorddeleteMonitorType(data) {
    return request({
      url: '/management-api/monitorType/deleteMonitorType',
      method: 'post',
      data
    })
  }
  // 查询资料分类详情
  postmonitorRecordqueryMonitorTypeDetail(data) {
    return request({
      url: '/management-api/monitorType/queryMonitorTypeDetail',
      method: 'post',
      headers: {
        'content-Type': 'application/x-www-form-urlencoded'
      },
      data
    })
  }
  // 查询资料分类信息详情

  postmonitorTypequeryMonitorTypeDetailInfo(data) {
    return request({
      url: '/management-api/monitorType/queryMonitorTypeDetailInfo',
      method: 'post',
      headers: {
        'content-Type': 'application/x-www-form-urlencoded'
      },
      data
    })
  }
  // 30天内订单下拉框
  postdropDownorderThirty() {
    return request({
      url: '/management-api/dropDown/orderThirty',
      method: 'post'
    })
  }
}
export default new MonitorRecord()
