
<template>
  <div class="table-wrap" :style="'height:'+TableHeight">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'TableWrap',
  data() {
    return {
      TableHeight: '300px'
    }
  },
  mounted() {
    const _this = this
    this.getTableHeight()
    window.addEventListener('resize', () => { _this.getTableHeight(_this) }, false)
  },
  destroyed() {
    window.onresize = null
  },
  methods: {
    getTableHeight(ele = this) {
      this.$nextTick(() => {
        const $p = ele.$parent.$refs
        const sh = $p.search && $p.search.offsetHeight
        const ah = $p.action && $p.action.offsetHeight
        const mh = $p.main && $p.main.offsetHeight
        this.TableHeight = mh - ah - sh - 76 + 'px'
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
