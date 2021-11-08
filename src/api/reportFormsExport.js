import request from '@/utils/request';

//宰前报表-无害化处理表导出
export function exportReportForms1(params) {
    return (
        process.env.VUE_APP_TARGET_API + process.env.VUE_APP_BASE_API +
        '/management-api/reportFormsExport/exportReportForms1?' +
        params
    )
}

//宰前报表-无害化处理表汇总导出
export function exportReportForms1Gather(params) {
    return (
        process.env.VUE_APP_TARGET_API + process.env.VUE_APP_BASE_API +
        '/management-api/reportFormsExport/exportReportForms1Gather?' +
        params
    )
}

//猪产品无害化处理-无害化处理表导出
export function exportReportForms2(params) {
    return (
        process.env.VUE_APP_TARGET_API + process.env.VUE_APP_BASE_API +
        '/management-api/reportFormsExport/exportReportForms2?' +
        params
    )
}

//猪产品无害化处理-无害化处理表汇总导出
export function exportReportForms2Gather(params) {
    return (
        process.env.VUE_APP_TARGET_API + process.env.VUE_APP_BASE_API +
        '/management-api/reportFormsExport/exportReportForms2Gather?' +
        params
    )
}

//病猪无害化处理-无害化处理表导出
export function exportReportForms3(params) {
    return (
        process.env.VUE_APP_TARGET_API + process.env.VUE_APP_BASE_API +
        '/management-api/reportFormsExport/exportReportForms3?' +
        params
    )
}

//病猪无害化处理-无害化处理表汇总导出
export function exportReportForms3Gather(params) {
    return (
        process.env.VUE_APP_TARGET_API + process.env.VUE_APP_BASE_API +
        '/management-api/reportFormsExport/exportReportForms3Gather?' +
        params
    )
}

//无害化汇总表-无害化处理明细导出
export function exportReportForms5(params) {
    return (
        process.env.VUE_APP_TARGET_API + process.env.VUE_APP_BASE_API +
        '/management-api/reportFormsExport/exportReportForms5?' +
        params
    )
}

//无害化汇总表-无害化处理统计公示表导出
export function exportReportForms4Public(params) {
    return (
        process.env.VUE_APP_TARGET_API + process.env.VUE_APP_BASE_API +
        '/management-api/reportFormsExport/exportReportForms4Public?' +
        params
    )
}

//无害化汇总表-无害化处理汇总表导出
export function exportReportForms4Gather(params) {
    return (
        process.env.VUE_APP_TARGET_API + process.env.VUE_APP_BASE_API +
        '/management-api/reportFormsExport/exportReportForms4Gather?' +
        params
    )
}

//检疫登记表-生猪屠宰和宰后检验表导出
export function exportReportForms7(params) {
    return (
        process.env.VUE_APP_TARGET_API + process.env.VUE_APP_BASE_API +
        '/management-api/reportFormsExport/exportReportForms7?' +
        params
    )
}

//检疫登记表-进厂验收和宰前检验表导出
export function exportReportForms6(params) {
    return (
        process.env.VUE_APP_TARGET_API + process.env.VUE_APP_BASE_API +
        '/management-api/reportFormsExport/exportReportForms6?' +
        params
    )
}