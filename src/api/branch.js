import request from '@/utils/request'
class BranchAPI {
  // 左侧树状图查询
  branchTree() {
    return request({
      url: '/management-api/branchMana/branchTree',
      method: 'post'
    })
  }
  // 根据网点id获取详情
  getBranchById(id) {
    return request({
      url: `/management-api/branchMana/getBranchById/${id}`,
      method: 'post'
    })
  }
  // 新增或者编辑网点机构
  addOrModifyBranch(data) {
    return request({
      url: `/management-api/branchMana/addOrModifyBranch`,
      method: 'post',
      data
    })
  }
  // 删除网点
  logicDelBranch(id) {
    return request({
      url: `/management-api/branchMana/logicDelBranch/${id}`,
      method: 'post'
    })
  }
  // 所属网点下拉框
  sampleBranchDropDown() {
    return request({
      url: `/management-api/dropDown/sampleBranchDropDown`,
      method: 'post'
    })
  }
}

export default new BranchAPI()
