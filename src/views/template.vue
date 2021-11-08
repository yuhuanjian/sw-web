<template>
  <div class="parent-template">
    <div>
      <router-view>
        <router-view />
      </router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Template'
}
</script>
<style lang="scss">
.main-container > .parent-template {
  height: calc(100% - 42px);
  padding: 12px 30px;
  background-color: #f5f7f9;
  > div {
    height: 100%;
    background-color: #f5f7f9;
    box-shadow: 0px 1px 6px rgba(72, 89, 102, 0.1);
  }
}
</style>
