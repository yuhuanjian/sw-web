<!--
 * @Author: your name
 * @Date: 2020-05-27 13:39:13
 * @LastEditTime: 2020-05-27 16:39:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \smart_space_admin\src\layout\index.vue
-->
<template>
  <div :class="classObj">
    <!-- 顶部导航 -->
    <div class="navbar-container">
      <NavBar @select="selectMenu" />
    </div>

    <!-- 左侧导航 -->
    <div class="sidebar-container">
      <SideBar :path-name="menuActiveName" />
    </div>
    <!-- 内容区域 -->
    <div class="main-container">
      <tag-list />
      <keep-alive>
        <router-view />
      </keep-alive>
    </div>
  </div>
</template>
<script>
import NavBar from './components/topbar'
import SideBar from './components/sidebar'
import tagList from '@/components/tagNav/tagList'

export default {
  name: 'Layout',
  components: {
    NavBar,
    SideBar,
    tagList
  },
  data() {
    return {
      menuActiveName: 'home'
    }
  },
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mainWrap: true
      }
    }
  },
  watch: {
    $route(to, from) {
      this.menuActiveName = to.path.split('/')[1]
    }
  },
  beforeMount() {
    this.menuActiveName = this.$route.path.split('/')[1]
  },
  methods: {
    selectMenu(name) {
      this.menuActiveName = name
    }
  }
}
</script>
<style lang="scss">
.sidebar-container {
  -webkit-transition: width 0.28s;
  transition: width 0.28s;
  height: 100%;
  position: fixed;
  font-size: 0px;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 1001;
  overflow: hidden;
}
.hideSidebar .navbar-container {
  width: calc(100% - 54px);
  margin-left: 54px;
}
.hideSidebar
  .sidebar-container
  ul[role='menubar']
  > div
  > li[role='menuitem']
  > div.el-submenu__title {
  display: block !important;
}
</style>
