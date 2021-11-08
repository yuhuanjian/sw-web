<template>
  <el-dialog
    width="600px"
    title="删除"
    :close-on-click-modal="false"
    :visible.sync="innerVisible"
    append-to-body
    :before-close="handleClose"
  >
    <div class="access-Dialog">
      <i class="el-icon-warning" />
      <p>分类下存在相关资料,无法删除</p>
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
  props: {
    idsArr: {
      type: Array
    }
  },
  data() {
    return {
      innerVisible: false,
      title: ''
    }
  },
  methods: {
    cancle() {
      this.$parent.handleClose()
      this.innerVisible = false
    },
    sureNo() {
      this.$parent.handleClose()
      this.innerVisible = false
    },
    handleClose() {
      this.$parent.handleClose()
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
