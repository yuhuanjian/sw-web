import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './permission.js'
import has from '@/utils/v-isRoot'
// 引入echarts
import echarts from 'echarts'

Vue.prototype.$echarts = echarts
import print from '@/utils/print'
Vue.use(print)
import '@/styles/index.scss'
// element.ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

Vue.config.productionTip = false
import Print from '@/utils/print.js'
Vue.use(Print)
    // 插件
import $F from './utils/global' // 引入
Vue.use($F) // 添加
    // svg
import '@/icons'

new Vue({
    el: '#app',
    router,
    store,
    print,
    render: h => h(App)
}).$mount('#app')