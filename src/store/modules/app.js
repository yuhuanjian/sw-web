import Cookies from 'js-cookie'

import router from '@/router'

import userInfos from '@/api/login'
import date from '../modules/user'
const Layout = () =>
    import ('@/layout') // 全局组件

const _import = require('@/router/_import_' + process.env.NODE_ENV)
const state = {
    sidebar: {
        opened: Cookies.get('sidebarStatus') ?
            !!+Cookies.get('sidebarStatus') :
            true,
        withoutAnimation: false
    },
    routers: sessionStorage.getItem('navRouters') ?
        sessionStorage.getItem('navRouters') :
        [],
    navRouters: sessionStorage.getItem('navRouters') ?
        sessionStorage.getItem('navRouters') :
        [],
    currentPathArr: [],
    isKeepAlive: false,
    refreshRouterName: '',
    tagNavList: [{
        label: '概览',
        path: '/',
        name: '概览',
        lastTime: 0
    }]
}
const mutations = {
    TOGGLE_SIDEBAR: state => {
        state.sidebar.opened = !state.sidebar.opened
        state.withoutAnimation = false
        if (state.sidebar.opened) {
            Cookies.set('sidebarStatus', 1)
        } else {
            Cookies.set('sidebarStatus', 0)
        }
    },

    // 左侧菜单
    SET_SIDE_PATH: (state, currentPathArr) => {
        state.currentPathArr = currentPathArr
    },
    CLOSE_SIDEBAR: (state, withoutAnimation) => {
        Cookies.set('sidebarStatus', 0)
        state.sidebar.opened = false
        state.sidebar.withoutAnimation = withoutAnimation
    },
    SET_REFREASH_ROUTER_NAME: (state, name) => {
        state.refreshRouterName = name
    },
    SET_IS_KEEP_LIVE(state, type) {
        state.isKeepAlive = type
    },
    UPDATE_TAG_NAV_LIST(state, data) {
        const isIn = state.tagNavList.some(v => v.name === data.name)
        if (!isIn && data.name !== '登录') {
            state.tagNavList.push(data)
        }
    },
    DELETE_TAG_NAV_LIST(state, data) {
        const index = state.tagNavList.findIndex(v => v.name === data.name)
        state.tagNavList.splice(index, 1)
    },
    CLEAR_ALL_TAG_NAV_LIST(state, data) {
        state.tagNavList = [{
            label: '概览',
            path: '/',
            name: '概览',
            lastTime: 0
        }]
    },
    // 菜单权限
    SET_ALL_MENU_LIST(state, menulist) {
        state.navRouters = menulist
        state.routers = menulist
    }
}

const actions = {
    // 左侧菜单获处理
    setAllMenuList({ commit }, userInfo) {
        /**
         * 初始化路由
         * @param router 路由文件，是一个数组
         */
        function initRouter(router) {
            for (let i = 0; i < router.length; i++) {
                const route = router[i]
                    // 设置一级路由的控件为全局定义的默认控件
                    // delete route['component']
                route.component = Layout
                    // 设置子路由
                route.children && initChildrenRouter(route.children)
            }
            return router
        }
        /**
         * 初始化子路由
         * @param router 子路由数组
         */
        function initChildrenRouter(router) {
            for (let i = 0; i < router.length; i++) {
                const route = router[i]
                    // 初始化子路由的控件
                route.component && (route.component = _import(route.component))
                route.children &&
                    route.children.length &&
                    initChildrenRouter(route.children)
            }
        }
        return new Promise((resolve, reject) => {
            userInfos
                .postGetUserRoutes(date.state.userId)
                .then(response => {
                    const { result, code } = response
                    if (code === 200) {
                        if (result.length) {
                            result.forEach(v => {
                                for (let i = 0; i < v.children[0].children.length; i++) {
                                    if (!v.children[0].children[i].hidden === true) {
                                        v.redirect =
                                            v.path +
                                            '/' +
                                            v.children[0].path +
                                            '/' +
                                            v.children[0].children[i].path
                                        break
                                    }
                                }
                            })
                        }

                        result.unshift({
                            path: '/overview',
                            icon: 'speedometer',
                            name: '概览',
                            redirect: '/overview/statistics',
                            meta: { title: '概览', icon: 'home', breadcrumb: false },
                            children: [{
                                path: 'statistics',
                                name: '概览',
                                component: 'statistics/index',
                                meta: {
                                    title: '概览',
                                    icon: 'home',
                                    breadcrumb: true,
                                    keepAlive: false
                                }
                            }]
                        })
                        const accessedRouters = initRouter(result)

                        accessedRouters.push({
                            path: '*',
                            redirect: '/404',
                            hidden: true
                        })

                        router.addRoutes(accessedRouters)
                        sessionStorage.setItem(
                            'navRouters',
                            JSON.stringify(accessedRouters)
                        )
                        sessionStorage.setItem(
                            'allMenuList',
                            JSON.stringify(accessedRouters)
                        )
                        commit('SET_ALL_MENU_LIST', accessedRouters)
                        resolve()
                    } else {
                        reject(response.data)
                    }
                })
                .catch(error => {
                    reject(error)
                })
        })
    },
    toggleSideBar({ commit }) {
        commit('TOGGLE_SIDEBAR')
    },

    closeSideBar({ commit }, { withoutAnimation }) {
        commit('CLOSE_SIDEBAR', withoutAnimation)
    },
    updateTagNavList({ commit }, dataObj) {
        commit('UPDATE_TAG_NAV_LIST', dataObj)
    },
    setRefreshRouterName({ commit }, name) {
        commit('SET_REFREASH_ROUTER_NAME', name)
    },
    setIsKeepAlive({ commit }, type) {
        commit('SET_IS_KEEP_LIVE', type)
    },
    deleteTagNavList({ commit }, data) {
        commit('DELETE_TAG_NAV_LIST', data)
    },
    closeAllTagNavList({ commit }, type) {
        commit('CLEAR_ALL_TAG_NAV_LIST')
    },
    pushOrUpdateTagNavList({ commit }, type) {}
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}