/*
 * @Author: hewenke
 * @Date: 2020-05-11 15:15:13
 * @LastEditTime: 2020-05-19 11:09:05
 * @LastEditors: hewenke
 * @Description: info
 * @FilePath: \ylm-kanban\src\utils\request.js
 * @永無bug
 */
import axios from 'axios'
import { Message, Loading } from 'element-ui'

import store from '@/store'
import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})
console.log(process.env.VUE_APP_BASE_API)
let loading = null // 定义loading变量
const startLoading = () => {
  loading = Loading.service({
    lock: true,
    text: '加载中……',
    background: 'rgba(0, 0, 0,0.1)'
  })
}
// 结束 取消loading加载
const endLoading = () => {
  loading.close()
}
let needLoadingRequestCount = 0 // 声明一个变量
const showFullScreenLoading = () => {
  if (needLoadingRequestCount === 0) {
    // 当等于0时证明第一次请求 这时开启loading
    startLoading()
  }
  needLoadingRequestCount++ // 全局变量值++
}
const tryHideFullScreenLoading = () => {
  if (needLoadingRequestCount <= 0) return // 小于等于0 证明没有开启loading 此时return
  needLoadingRequestCount-- // 正常响应后 全局变量 --
  if (needLoadingRequestCount === 0) {
    // 等于0 时证明全部加载完毕 此时结束loading 加载
    endLoading()
  }
}
// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    if (config.method === 'get') {
      //  给data赋值以绕过if判断
      // config.headers['Content-Type'] = 'multipart/form-data'
      config.data = true
    }
    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['Authorization'] = getToken()
    }
    showFullScreenLoading()
    return config
  },
  error => {
    // do something with request error

    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
     * If you want to get http information such as headers or status
     * Please return  response => response
     */

  /**
     * Determine the request status by custom code
     * Here is just an example
     * You can also judge the status by HTTP Status Code
     */
  response => {
    const res = response.data
    tryHideFullScreenLoading()
    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== 200) {
      if (
        res.code === 100007 ||
                res.code === 100010 ||
                res.code === 100008 ||
                res.code === 100009 ||
                res.code === 100011
      ) {
        return res
      } else {
        if (res.code === 10500) {
          Message({
            message: res.message || 'Error',
            type: 'error',
            duration: 5 * 1000
          })
          return
        }
      }
      if (res.code === 401) {
        // Message({
        //     message: res.message || 'Error',
        //     type: 'error',
        //     duration: 5 * 1000
        // })
        store.dispatch('user/resetToken').then(() => {
          location.reload()
          // goLogin()
        })
        return
      }
      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === 403 || res.code === 50014) {
        Message({
          message: res.message || 'Error',
          type: 'error',
          duration: 5 * 1000
        })
      } else {
        Message({
          message: res.message || 'Error',
          type: 'error',
          duration: 5 * 1000
        })
      }
      return Promise.reject(new Error(res.msg || 'Error'))
    } else {
      return res
    }
  },
  error => {
    Message({
      message: error,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
