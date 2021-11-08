<template>
  <el-dialog
    width="600px"
    :title="title"
    :visible.sync="innerVisible"
    :close-on-click-modal="false"
    append-to-body
  >
    <div class="access-Dialog">
      <p class="access-p" v-html="message" />
    </div>
    <div class="quarantine-line" />
    <span slot="footer" class="dialog-footer">
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
.access-p {
  padding: 0 10px;
  font-size: 17px;
  line-height: 30px;
  text-align: center;
}
</style>
