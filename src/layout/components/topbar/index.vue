<!--
 * @Author: your name
 * @Date: 2020-05-27 16:35:17
 * @LastEditTime: 2020-05-27 16:55:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \smart_space_admin\src\layout\components\NavBar.vue
-->
<template>
  <div class="clearfix">
    <!-- <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" /> -->
    <el-menu
      :default-active="activeMenu"
      class="el-menu-bar"
      mode="horizontal"
      :background-color="variables.navBg"
      :text-color="variables.textColor"
      :active-text-color="variables.activeTextColor"
      @select="handleSelect"
    >
      <TopItemNav />
    </el-menu>

    <div class="right-menu">
      <div class="avatar-wrapper">
        <img src="@/assets/head_img.png" class="user-avatar">
      </div>
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <span class="name">{{ $store.state.user.name }}</span>
          <i class="el-icon-caret-bottom" trigger="click" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item />
          </router-link>
          <el-dropdown-item divided @click.native="logout">
            <span style="display:block;">退出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <i class="el-icon-switch-button close" @click="logout" />
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import TopItemNav from './TopItemNav'
import variables from '@/styles/variables.scss'
// import Hamburger from '@/components/Hamburger'
export default {
  components: {
    TopItemNav
    // Hamburger
  },
  data() {
    return {
      activeMenu: ''
    }
  },
  computed: {
    ...mapGetters(['sidebar', 'avatar']),
    variables() {
      return variables
    },
    routes() {
      return this.$router.options.routes
    }
    // activeMenu() {
    //   const route = this.$route
    //   const { meta, path } = route
    //   const selectMenu = path.split('/')[1]
    //   // if set path, the sidebar will highlight the path you set
    //   if (meta.activeMenu) {
    //     return meta.activeMenu
    //   }
    //   this.$emit('select', selectMenu)

    //   return selectMenu
    // }
  },
  watch: {
    $route(to, from) {
      this.activeMenu = to.path.split('/')[1]
    }
  },
  beforeMount() {
    this.activeMenu = this.$route.path.split('/')[1]
  },
  methods: {
    handleSelect(key, keyPath) {
      this.$emit('select', keyPath[0])
    },
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  }
}
</script>
<style lang="scss">
.hamburger-container {
  * {
    box-sizing: border-box;
  }
  line-height: 50px;
  height: 100%;
  float: left;
  cursor: pointer;
  transition: background 0.3s;
  -webkit-tap-highlight-color: transparent;

  &:hover {
    background: rgba(0, 0, 0, 0.025);
  }
}

.breadcrumb-container {
  float: left;
}
.right-menu {
  float: right;
  line-height: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  .close {
    margin-right: 30px;
    font-size: 20px;
    color: #1f263e;
    cursor: pointer;
  }
  .avatar-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    .name {
      margin-left: 20px;
      font-size: 20px;
      color: #1f263e;
    }
  }
  &:focus {
    outline: none;
  }

  .right-menu-item {
    display: inline-block;
    padding: 0 8px;
    height: 100%;
    font-size: 18px;
    color: #5a5e66;
    vertical-align: text-bottom;

    &.hover-effect {
      cursor: pointer;
      transition: background 0.3s;

      &:hover {
        background: rgba(0, 0, 0, 0.025);
      }
    }
  }

  .avatar-container {
    margin-right: 30px;

    .avatar-wrapper {
      position: relative;
      .user-avatar {
        cursor: pointer;
        width: 40px;
        height: 40px;
        border-radius: 10px;
      }

      .el-icon-caret-bottom {
        cursor: pointer;
        position: absolute;
        right: -20px;
        top: 20px;
        font-size: 12px;
      }
    }
  }
}
</style>
