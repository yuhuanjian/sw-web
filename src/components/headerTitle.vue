<template>
  <div class="sub-title-bar">
    <p class="sub-t">{{ title }}</p>
    <el-button type="primary" @click="goback(routepush)">返回</el-button>
  </div>
</template>
<script>
export default {
  props: ['title', 'routepush'],
  methods: {
    goback(e) {
      const nowRouter = this.$route
      const obj = {
        label: nowRouter.meta.tagName || nowRouter.meta.title,
        path: nowRouter.path,
        name: nowRouter.name,
        lastTime: new Date().getTime()
      }
      this.$store.dispatch('app/deleteTagNavList', obj)
      this.$router.push({
        path: e
      })
    }
  }
}
</script>

<style></style>
