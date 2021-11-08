<template>
  <div class="sidebar-logo-container" :class="{ collapse: collapse }">
    <transition name="sidebarLogoFade">
      <router-link
        v-if="collapse"
        key="collapse"
        class="sidebar-logo-link"
        to="/"
      >
        <div class="logo-content">
          <span v-if="logo" class="svg-container sidebar-logo">
            <svg-icon icon-class="logo" />
          </span>
          <div v-else class="sidebar-title">{{ title }}</div>
        </div>
      </router-link>
      <router-link v-else key="expand" class="sidebar-logo-link" to="/">
        <div class="logo-content">
          <span v-if="logo" class="svg-container sidebar-logo">
            <svg-icon icon-class="logo" />
          </span>
          <div class="sidebar-title">{{ title }}</div>
        </div>
      </router-link>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'SidebarLogo',
  props: {
    collapse: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      title: '顺为经营管控综合平台',
      logo: true
    }
  }
}
</script>

<style lang="scss" scoped>
.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 50px;
  line-height: 50px;
  background: #1f263e;
  text-align: center;
  overflow: hidden;
  .logo-content {
    display: flex;
    justify-content: center;
    align-items: center;
    height: calc(100% - 1px);
    border-bottom: 1px solid rgba(248, 249, 251, 0.3);
  }

  & .sidebar-logo-link {
    height: 100%;
    width: 100%;

    & .sidebar-logo {
      width: 32px;
      height: 32px;
      vertical-align: middle;
      margin-right: 4px;
      overflow: hidden;
      svg {
        width: 100%;
        height: 100%;
        vertical-align: top;
      }
    }

    & .sidebar-title {
      display: inline-block;
      margin: 0;
      color: #fff;
      font-weight: 300;
      line-height: 50px;
      font-size: 14px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
      letter-spacing: 0px;
    }
  }

  &.collapse {
    .sidebar-logo {
      margin-right: 0px;
    }
  }
}
</style>
