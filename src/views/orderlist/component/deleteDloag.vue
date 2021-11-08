<template>
  <el-dialog
    width="600px"
    :title="title"
    :close-on-click-modal="false"
    :visible.sync="innerVisible"
    append-to-body
  >
    <div class="access-Dialog">
      <i class="el-icon-warning" />
      <p>{{ message }}</p>
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
    userStatus: {
      type: String,
      default: ''
    },
    changeData: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      innerVisible: false,
      colorIcon: '',
      message: '',
      title: ''
    }
  },
  methods: {
    cancle() {
      this.innerVisible = false
    },
    sureNo() {
      this.$emit('confirmDel')
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
