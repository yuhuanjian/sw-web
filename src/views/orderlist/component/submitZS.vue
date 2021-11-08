<template>
  <el-dialog
    width="700px"
    title="剩余交易数不为整数"
    :close-on-click-modal="false"
    :visible.sync="innerVisible"
    append-to-body
  >
    <div class="access-Dialog">
      <div v-for="(item, index) in data" :key="index">
        <p class="access-p">{{ item.wholeSaler }}批发商:</p>
        <p class="access-p1">
          {{
            item.data.join('、')
          }}商户分边后剩余交易数不为整数，请检查分边数据或交易数量
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
      data: [],
      arr: []
    }
  },
  watch: {
    data() {
      this.data.forEach(v => {
        v.data = v.data.map(z => z.merchantCode)
      })
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
