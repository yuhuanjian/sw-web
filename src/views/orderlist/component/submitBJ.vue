<template>
  <el-dialog
    width="700px"
    title="交易数小于分边数"
    :close-on-click-modal="false"
    :visible.sync="innerVisible"
    append-to-body
  >
    <div class="access-Dialog">
      <div v-for="(item, index) in data" :key="index">
        <p class="access-p">{{ item.wholeSaler }}批发商:</p>
        <p
          v-for="list in item.data"
          :key="list.merchantCode"
          class=" access-p1"
        >
          {{ list.merchantCode }}录入的交易数小于分边数，请检查录入的交易信息
        </p>
      </div>
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
      title: '',
      data: []
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
  font-size: 20px;
  padding: 40px 15px;
  max-height: 500px;
  overflow: hidden;
  overflow: auto;
}
.access-p {
  padding: 0 10px;
  font-size: 17px;

  line-height: 30px;
}
.access-p1 {
  padding: 0 10px;
  font-size: 15px;
  text-indent: 2em;
  line-height: 30px;
}
</style>
