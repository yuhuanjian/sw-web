<template>
  <el-dialog
    width="600px"
    title="确认提示"
    :visible.sync="innerVisible"
    :close-on-click-modal="false"
    append-to-body
  >
    <div class="access-Dialog">
      <i class="el-icon-warning" />
      <p>是否移除与当前分边商户的关联关系？</p>
    </div>
    <div class="quarantine-line" />
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancle">取 消</el-button>
      <el-button type="primary" @click="sureNo">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      innerVisible: false,
      index: 0
    }
  },
  methods: {
    cancle() {
      this.innerVisible = false
    },
    sureNo() {
      this.$parent.delSure(this.index)
      this.innerVisible = false
    }
  }
}
</script>

<style lang="scss" scoped>
.access-Dialog {
  width: 100%;
  height: 160px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  i {
    font-size: 50px;
    margin-right: 15px;
    color: red;
  }
}
</style>
