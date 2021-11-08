<template>
  <el-dialog
    width="700px"
    title="交易确认"
    :visible.sync="innerVisible"
    :close-on-click-modal="false"
    append-to-body
  >
    <div class="access-Dialog">
      <p class="access-p">{{ message }}</p>
      <div v-for="item in data" :key="item.wholeSaler">
        <p class="p-tit">{{ item.wholeSaler }}批发商:</p>
        <el-table
          :data="item.data"
          tooltip-effect="dark"
          border
          style="width: 100%;"
          center
          size="mini"
        >
          <el-table-column prop="merchantCode" label="商户代号" />
          <el-table-column
            prop="merchantNum"
            label="商户编号"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            prop="address"
            label="商户地址"
            width="180"
            :show-overflow-tooltip="true"
          />
          <el-table-column prop="purchaseQuantity" label="购买数量（只）" />
        </el-table>
      </div>
    </div>
    <div class="quarantine-line" />
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="cancle">取 消</el-button>
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
  max-height: 500px;
  overflow: hidden;
  overflow: auto;
  font-size: 20px;
  padding: 20px 20px;
  .p-tit {
    line-height: 50px;
    font-size: 16px;
    font-weight: bolder;
  }
}
.access-p {
  font-size: 17px;
  line-height: 30px;
  font-size: 16px;
}
</style>
