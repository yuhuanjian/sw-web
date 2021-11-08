<template>
  <div :style="'width:' + w" class="printss">
    <div class="title" style="font-size:50px">
      <p style="font-size:*width:50px;">准宰通知单</p>
    </div>
  </div>
</template>
<script>
// import Table from './table'
export default {
  props: {
    isPrint: Array,
    tableDataPrint: Array
  },
  data() {
    return {
      w: '1500px'
    }
  },
  created() {},
  methods: {}
}
</script>
<style scoped lang="scss">
.title {
  text-align: center;
  font-weight: bolder;
}
</style>
