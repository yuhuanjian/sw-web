export const addDate = function(date, days) {
    if (days == undefined || days == '') {
        days = 1
    }
    var date = new Date(date)
    date.setDate(date.getDate() + days)
    var month = date.getMonth() + 1
    var day = date.getDate()
    var mm = "'" + month + "'"
    var dd = "'" + day + "'"
        // 单位数前面加0
    if (mm.length == 3) {
        month = '0' + month
    }
    if (dd.length == 3) {
        day = '0' + day
    }
    var time = date.getFullYear() + '-' + month + '-' + day
    return time
}

// 提取某个key
export const getKey = function(arr, key) {
        var newarr = []
        arr.forEach((v, i) => {
            newarr.push(v[key])
        })
        return newarr
    }
    // 提取多个key组成新的对象数组  arrfifiter一个数组（需要的key值）
export const getKeyAll = function(arr, arrfifiter) {
        var newarr = []
        var obj = {}
        arr.forEach((v, i) => {
            arrfifiter.forEach(item => {
                obj[item] = v[item]
            })
            newarr.push(obj)
            obj = {}
        })
        return newarr
    }
    // 逗号隔开
export const getKeyStr = function(arr, key) {
    var newarr = []
    arr.forEach((v, i) => {
        newarr.push(v[key])
    })
    var str = newarr.join(',')
    return str
}

// 往json数组中每一项添加键值对
export const PrintObjGet = function(arrObj, addObj) {
        arrObj.forEach((v, i) => {
            for (const key in addObj) {
                v[key] = addObj[key]
            }
        })
        return arrObj
    }
    // 获取当前日期 xxxx-xx-xx xx:xx:xx
export const getFormatDate = function() {
    var date = new Date()
    var month = date.getMonth() + 1
    var strDate = date.getDate()
    var hours = date.getHours()
    var mintins = date.getMinutes()
    var second = date.getSeconds()

    if (month >= 1 && month <= 9) {
        month = '0' + month
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = '0' + strDate
    }
    if (hours >= 0 && hours <= 9) {
        hours = '0' + hours
    }
    if (mintins >= 0 && mintins <= 9) {
        mintins = '0' + mintins
    }
    if (second >= 0 && second <= 9) {
        second = '0' + second
    }
    var currentDate =
        date.getFullYear() +
        '-' +
        month +
        '-' +
        strDate +
        ' ' +
        hours +
        ':' +
        mintins +
        ':' +
        second
    return currentDate
}

/*
 * JSON数组去重
 * @param: [array] json Array
 * @param: [string] 唯一的key名，根据此键名进行去重
 */
export const uniqueArray = function(array, key) {
    var result = [array[0]]
    for (var i = 1; i < array.length; i++) {
        var item = array[i]
        var repeat = false
        for (var j = 0; j < result.length; j++) {
            if (item[key] == result[j][key]) {
                repeat = true
                break
            }
        }
        if (!repeat) {
            result.push(item)
        }
    }
    return result
}