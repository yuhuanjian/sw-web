<template>
  <div id="app" class="app-main">
    <router-view>
      <router-view />
    </router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
@import '@/styles/resetBase.scss';
</style>
