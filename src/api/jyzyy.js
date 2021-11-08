import request from '@/utils/request'

// 检疫管理-查询
export function postQuarantineGetQuarantineInfo(data) {
    return request({
        url: '/management-api/quarantine/getQuarantineInfo',
        method: 'post',
        data
    })
}

// 检疫管理-新增异常
export function postQuarantineSaveAbnormalInfo(data) {
    return request({
        url: '/management-api/quarantine/saveAbnormalInfo',
        method: 'post',
        data
    })
}
// 查询异常接口
export function postQuarantinequeryAbnormalInfo(data) {
    return request({
        url: '/management-api/quarantine/queryAbnormalInfo',
        method: 'post',
        data
    })
}

// 检疫管理导出接口
export function GetQuarantineexportQuarantineInfo(params) {
    return (
        process.env.VUE_APP_TARGET_API + process.env.VUE_APP_BASE_API +
        '/management-api/quarantine/exportQuarantineInfo?' +
        params
    )
}
// 检疫-准入准宰准出检疫-录入结果
export function postQuarantineSaveCheckResult(data) {
    return request({
        url: '/management-api/quarantine/saveCheckResult',
        method: 'post',

        data
    })
}

// 检疫-准入检疫详情-查询文件
export function postAllowEntQuarQueryFileByOrderId(data) {
    return request({
        url: '/management-api/allowEntQuar/queryFileByOrderId/' + data,
        method: 'post',
        headers: {
            'content-Type': 'application/x-www-form-urlencoded'
        }
    })
}

// 检疫-准入检疫-上传文件
export function postAllowEntQuarUploadFile(data) {
    return request({
        url: '/management-api/allowEntQuar/uploadFile',
        method: 'post',
        headers: {
            'content-Type': 'multipart/form-data'
        },
        data
    })
}
// 新增或编辑批发商
export function postWholesaleraddOrUpdateWholesaler(data) {
    return request({
        url: '/management-api/wholesaler/addOrUpdateWholesaler',
        method: 'post',

        data
    })
}

// 批发商管理--列表查询
export function postWholesalerqueryWholesalerListWithPage(data) {
    return request({
        url: '/management-api/wholesaler/queryWholesalerByRequest',
        method: 'post',

        data
    })
}

// 删除批发商
export function postWholesalerdeleteWholesaler(data) {
    return request({
        url: '/management-api/wholesaler/deleteWholesaler',
        method: 'post',

        data
    })
}
// 批发商管理-导出

export function postWholesalerexportWholesalers(params) {
    return (
        process.env.VUE_APP_TARGET_API + process.env.VUE_APP_BASE_API +
        '/management-api/wholesaler/exportWholesalers?' +
        params
    )
}

// 新增和编辑司机
export function postDriveraddOrUpdateDriver(data) {
    return request({
        url: '/management-api/driver/addOrUpdateDriver',
        method: 'post',
        data
    })
}

// 删除司机
export function postDriverdeleteDriver(data) {
    return request({
        url: '/management-api/driver/deleteDriver',
        method: 'post',

        data
    })
}
// 司机管理-导出
export function postDriverexportDrivers(params) {
    // return request({
    //         url: '/management-api/driver/exportDrivers',
    //         method: 'post',
    //         data
    //     })
    //   return process.env.VUE_APP_TARGET_API + '/management-api/driver/exportDrivers?' + data
    return (
        process.env.VUE_APP_TARGET_API + process.env.VUE_APP_BASE_API +
        '/management-api/driver/exportDrivers?' +
        params
    )
}
// 司机管理-列表查询
export function postDriverqueryDriversByRequest(data) {
    return request({
        url: '/management-api/driver/queryDriversByRequest',
        method: 'post',

        data
    })
}

// 新增和编辑车辆
export function postVehicleSaveOrUpdate(data) {
    return request({
        url: '/management-api/vehicle/addOrUpdateVehicle',
        method: 'post',
        data
    })
}

// 车辆管理--列表查询
export function postVehiclequeryVehicleListWithPage(data) {
    return request({
        url: '/management-api/vehicle/queryVehiclesByRequest',
        method: 'post',
        data
    })
}

// 删除车辆信息
export function postVehicledeleteVehicle(data) {
    return request({
        url: '/management-api/vehicle/deleteVehicle',
        method: 'post',

        data
    })
}

// 车辆-导出
export function postDriverexportexportVehicles(params) {
    return (
        process.env.VUE_APP_TARGET_API + process.env.VUE_APP_BASE_API +
        '/management-api/vehicle/exportVehicles?' +
        params
    )
}

// 准宰检疫-瘦肉精检测详情

export function postallowKillQuarquerySampleInsRecInfo(data) {
    return request({
        url: '/management-api/allowKillQuar/querySampleInsRecInfo/' + data,
        method: 'post',
        headers: {
            'content-Type': 'application/x-www-form-urlencoded'
        }
    })
}
// 准宰检疫-非洲猪瘟检测详情
export function postallowKillQuarquerySwFeverDeInfo(data) {
    return request({
        url: '/management-api/allowKillQuar/querySwFeverDeInfo/' + data,
        method: 'post',
        headers: {
            'content-Type': 'application/x-www-form-urlencoded'
        }
    })
}
// 准宰检疫-非洲猪瘟检测详情
export function postallowKillquerysampleInsRecordInfoByOrderId(data) {
    return request({
        url: '/management-api/allowKillQuar/querysampleInsRecordInfoByOrderId/' + data,
        method: 'post',
        headers: {
            'content-Type': 'application/x-www-form-urlencoded'
        }
    })
}
// 养殖场下拉框
export function dropDownfarm() {
    return request({
        url: '/management-api/dropDown/farm',
        method: 'post'
    })
}
// 批发商下拉框
export function dropDownwholesaler() {
    return request({
        url: '/management-api/dropDown/wholesaler',
        method: 'post'
    })
}
// 准宰检疫-准宰按钮触发接口
export function allowKillQuarallowKillTrigger(data) {
    return request({
        url: '/management-api/allowKillQuar/allowKillTrigger',
        method: 'post',
        data
    })
}
// 司机下拉框
export function dropDowndriver() {
    return request({
        url: '/management-api/dropDown/driver',
        method: 'post'
    })
}
// 生猪编号下拉框
export function dropDownlivePigNum(data) {
    return request({
        url: '/management-api/dropDown/livePigNum',
        method: 'post',
        data
    })
}
// 检疫-准入检疫-删除
export function allowEntQuardeleteFile(data) {
    return request({
        url: '/management-api/allowEntQuar/deleteFile',
        method: 'post',
        data
    })
}
// 准宰检疫-检疫打印的数据结构
export function allowKillQuarquarPrint(data) {
    return request({
        url: '/management-api/allowKillQuar/quarPrint',
        method: 'post',
        data
    })
}
// 准宰检疫-瘦肉精检测登记
export function allowKillQuarsaveSampleInsRecInfo(data) {
    return request({
        url: '/management-api/allowKillQuar/saveSampleInsRecInfo',
        method: 'post',
        data
    })
}
// 准宰检疫-非洲猪瘟检测登记
export function allowKillQuarsaveSwFeverDeInfo(data) {
    return request({
        url: '/management-api/allowKillQuar/saveSwFeverDeInfo',
        method: 'post',
        data
    })
}
// ---
export function postuploadFile(data) {
    return request({
        url: '/management-api/allowEntQuar/uploadFile',
        method: 'post',
        headers: {
            'content-Type': 'multipart/form-data'
        },
        data
    })
}
// 用户下拉框
export function postdropDownuser(data) {
    return request({
        url: '/management-api/dropDown/user',
        method: 'post'
    })
}

//检疫管理-非洲猪瘟导出
export function exportASF(params) {
    return (
        process.env.VUE_APP_TARGET_API + process.env.VUE_APP_BASE_API +
        '/management-api/allowKillQuar/exportASF?' +
        params
    )
}

//检疫管理-瘦肉精检测登记导出
export function exportClenbuterol(params) {
    return (
        process.env.VUE_APP_TARGET_API + process.env.VUE_APP_BASE_API +
        '/management-api/allowKillQuar/exportClenbuterol?' +
        params
    )
}