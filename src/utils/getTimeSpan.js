var moment = require('moment')
moment().format()
    // 日期计算
function getTimeSpan(timeType, format) {
    if (format == null || format === '') {
        format = 'YYYY.MM.DD HH:mm:ss'
    }
    var timeSpan = []
    if (timeType === 'today') {
        // 当天
        timeSpan[0] = moment(new Date())
            .startOf('day')
            .format(format)
        timeSpan[1] = moment(new Date()).format(format)
            // timeSpan[1] = moment(new Date()).endOf('day').format(format);
    } else if (timeType === 'week') {
        // 本周
        timeSpan[0] = moment(new Date())
            .startOf('isoweek')
            .format(format)
        timeSpan[1] = moment(new Date())
            .endOf('isoweek')
            .format(format)
    } else if (timeType === 'month') {
        // 本月
        timeSpan[0] = moment(new Date())
            .startOf('month')
            .format(format)
        timeSpan[1] = moment(new Date())
            .endOf('month')
            .format(format)
    } else if (timeType === 'year') {
        // 本年
        timeSpan[0] = moment(new Date())
            .startOf('year')
            .format(format)
        timeSpan[1] = moment(new Date())
            .endOf('year')
            .format(format)
    } else if (timeType === 'season') {
        // 本季
        timeSpan[0] = moment(new Date())
            .startOf('quarter')
            .format(format)
        timeSpan[1] = moment(new Date()).format(format)
    } else {
        // 近N天、近N月、近N年
        var regex = /(\d+)([ymdYMD])/g
        var found = regex.exec(timeType)
        var num = found[1]
        var unit = found[2]
        if (unit === 'y' || unit === 'Y') {
            timeSpan[1] = moment(new Date()).format(format)
            timeSpan[0] = moment(new Date())
                .add(1 - num, 'years')
                .startOf('day')
                .format(format)
        } else if (unit === 'm' || unit === 'M') {
            timeSpan[1] = moment(new Date()).format(format)
            timeSpan[0] = moment(new Date())
                .add(1 - num, 'months')
                .startOf('day')
                .format(format)
        } else if (unit === 'd' || unit === 'D') {
            timeSpan[1] = moment(new Date()).format(format)
            timeSpan[0] = moment(new Date())
                .add(1 - num, 'days')
                .startOf('day')
                .format(format)
        }
    }
    return timeSpan
}
export default getTimeSpan