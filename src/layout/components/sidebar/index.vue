<!--
 * @Author: your name
 * @Date: 2020-05-27 16:35:17
 * @LastEditTime: 2020-05-27 18:38:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \smart_space_admin\src\layout\components\NavBar.vue
-->

<template>
  <div :class="{ 'has-logo': showLogo }">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item
          v-for="route in routes"
          :key="route.name + route.path"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'

export default {
  name: 'SideBar',
  components: { SidebarItem, Logo },
  props: {
    pathName: {
      type: String,
      default: 'home'
    }
  },
  computed: {
    ...mapGetters(['sidebar', 'permission_routers']),
    routes() {
      const a = this.permission_routers.filter(v => {
        if (v.path.indexOf(this.pathName) > -1) {
        }
        return v.path.indexOf(this.pathName) > -1
      })
      console.log(a)
      return a
    },
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      console.log(meta, path)
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }

      return path
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>
<style lang="scss">
.sidebar-container
  ul[role='menubar']
  > div
  > li[role='menuitem']
  > div.el-submenu__title {
  display: none !important;
}
.sidebar-container
  ul[role='menubar']
  > div
  > li[role='menuitem']
  > ul[role='menu'] {
  display: block !important;
}
</style>
