import request from '@/utils/request';

//宰前报表-无害化处理表查询
export function queryReportForms1(data) {
    return request({
        url: '/management-api/reportForms/queryReportForms1',
        method: 'post',
        data
    });
}

//猪产品无害化处理-无害化处理表查询
export function queryReportForms2(data) {
    return request({
        url: '/management-api/reportForms/queryReportForms2',
        method: 'post',
        data
    });
}

//病猪无害化处理-无害化处理表查询
export function queryReportForms3(data) {
    return request({
        url: '/management-api/reportForms/queryReportForms3',
        method: 'post',
        data
    });
}

//无害化汇总表-无害化处理统计查询
export function queryReportForms4(data) {
    return request({
        url: '/management-api/reportForms/queryReportForms4',
        method: 'post',
        data
    });
}

//无害化汇总表-无害化处理明细查询
export function queryReportForms5(data) {
    return request({
        url: '/management-api/reportForms/queryReportForms5',
        method: 'post',
        data
    });
}

//检疫登记表-进厂验收和宰前检验表查询
export function queryReportForms6(data) {
    return request({
        url: '/management-api/reportForms/queryReportForms6',
        method: 'post',
        data
    });
}

//检疫登记表-生猪屠宰和宰后检验表查询
export function queryReportForms7(data) {
    return request({
        url: '/management-api/reportForms/queryReportForms7',
        method: 'post',
        data
    });
}