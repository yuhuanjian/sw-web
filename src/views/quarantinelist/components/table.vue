<template>
  <div style="height:100%;">
    <div class="table-top">
      <el-table border style="width: 100%">
        <el-table-column prop="date" label="抽样日期" width="180" />
        <el-table-column prop="people" label="2020.09.30" width="180" />
        <el-table-column prop="plate" label="抽样单位" />
        <el-table-column prop="address" label="德莱公司" />
        <el-table-column prop="hgNumber" label="抽样人" />
        <el-table-column prop="pigNumber" label="张三丰" />
        <el-table-column prop="SamplingNumber" label="核对人" />
        <el-table-column prop="sampleNumber" label="张无忌" />
      </el-table>
    </div>
    <el-table v-loading="isloading" :data="dataTable" border style="height: 100%;width:100%" stripe>
      <el-table-column type="index" label="序号" width="50" />
      <el-table-column prop="name" label="样品名称" width="180" />
      <el-table-column prop="number" label="样品编号" width="180" />
      <el-table-column prop="sampleNumber" label="抽样数量" />
      <el-table-column prop="sampleNums" label="抽样基数" />
      <el-table-column prop="address" label="抽样地点" />
      <el-table-column prop="sampleAddress" label="样品来源" />
      <el-table-column prop="SamplingType" label="样品类型" />
      <el-table-column prop="tele" label="受检单位，联系电话" width="200" />
      <el-table-column prop="people" label="受检人" />
      <el-table-column prop="results" label="检测结果" />
      <el-table-column prop="processMode" label="处理方式" />
      <el-table-column prop="remark" label="备注" />
    </el-table>
  </div>
</template>

<script>
export default {
  props: ['dataTable', 'isloading'],
  data() {
    return {
    }
  },
  created() {}
}
</script>

<style lang="scss" scoped>
.table-top {
  /deep/.el-table__empty-block {
    display: none;
  }
}
</style>

