import request from '@/utils/request'

class Static {
  // 业务统计
  postBusinessStatistics(data) {
    return request({
      url: '/management-api/overview/businessStatistics',
      method: 'post',
      headers: {
        'content-Type': 'application/x-www-form-urlencoded'
      },
      data
    })
  }
  // 概览--调度统计
  postselectDispatchStatistics(data) {
    return request({
      url: '/management-api/overview/selectDispatchStatistics',
      method: 'post',
      data
    })
  }
  // 概览--生猪统计
  postlivePigStatistics(data) {
    return request({
      url: '/management-api/overview/livePigStatistics',
      method: 'post',
      data
    })
  }
  // 概览--检疫统计
  postquarantineStatistics(data) {
    return request({
      url: '/management-api/overview/quarantineStatistics',
      method: 'post',
      data
    })
  }
}
export default new Static()
