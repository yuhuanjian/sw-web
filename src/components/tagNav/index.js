import Vue from 'vue'
// 按模块划分的路由文件数组，这里就是导航会出现的几个页面
import constantRoutes from '@/router/index'
// config里取得组件前缀
import config from './config'

const allRouterName = []
const getName = arr => {
  arr.forEach(item => {
    if (item.name) {
      allRouterName.push(item.name)
    }
    if (item.children && item.children.length > 0) {
      getName(item.children)
    }
  })
}
getName(constantRoutes.options.routes)

// 以下注释来自官网:
// <keep-alive>匹配首先检查组件自身的 name 选项
// 如果 name 选项不可用，则匹配它的局部注册名称 (父组件 components 选项的键值)。
// 匿名组件不能被匹配。
allRouterName.forEach(i => {
  Vue.component(config.componentsPrefix + i, () =>
    import('@/components/tagNav/view.vue')
  )
})
