<template>
  <div>
    <el-dialog
      width="700px"
      title="选择分边商户"
      :visible.sync="innerVisible"
      :close-on-click-modal="false"
      append-to-body
      :before-close="close"
    >
      <div class="access-Dialog">
        <p class="p">选择与当前商户共同分边的商户代号：</p>
        <span class="p">已选择商户：</span>
        <span v-if="addMerchantPigDetailsRequestDto.length === 0">
          --
        </span>
        <div
          v-for="(item, index) in addMerchantPigDetailsRequestDto"
          :key="item.merchantCode"
          class="merchat-div"
        >
          <el-select
            v-model="item.merchantCode"
            filterable
            :disabled="item.isNo === '2'"
            size="small"
            placeholder="请选择商户"
            @change="handleCommand1($event, index)"
            @focus="clickCmerchantCode1(index)"
          >
            <el-option
              v-for="(val, idx) in restaurants"
              :key="val.merchantCode"
              :label="val.merchantCode"
              :value="JSON.stringify(val)"
            />
            <span slot="empty">
              <p style=" text-align: center;line-height: 50px;">
                {{ titleMessage }}
              </p>
            </span>
          </el-select>
          <div>
            <span>分边数量：</span>
            <el-input-number
              v-model="item.divideNumber"
              :min="1"
              disabled
              size="small"
              :step-strictly="true"
            />
            <!-- :disabled="item.isNo === '2'" -->
          </div>
          <div class="btn-img">
            <img
              v-if="item.isNo !== '2'"
              src="@/assets/image/re.png"
              alt=""
              @click="dels(index)"
            >
          </div>
        </div>
        <p class="p">选择其他商户：</p>
        <div
          v-for="(item, index) in merchatList"
          :key="index"
          class="merchat-div"
        >
          <el-select
            v-model="item.merchantCode"
            filterable
            size="small"
            placeholder="请选择"
            @change="handleCommand($event, index)"
            @focus="clickCmerchantCode(index)"
          >
            <el-option
              v-for="(val, idx) in restaurants"
              :key="idx"
              :label="val.merchantCode"
              :value="JSON.stringify(val)"
            />
            <span slot="empty">
              <p style=" text-align: center;line-height: 50px;">
                {{ titleMessage }}
              </p>
            </span>
          </el-select>
          <div>
            <span>分边数量：</span>
            <el-input-number
              v-model="item.divideNumber"
              :min="1"
              disabled
              label="描述文字"
              size="small"
              :step-strictly="true"
            />
          </div>
          <div class="btn-img">
            <img src="@/assets/image/ad.png" alt="" @click="add">
            <img
              v-if="index > 0"
              src="@/assets/image/re.png"
              alt=""
              @click="del(index)"
            >
          </div>
        </div>
      </div>
      <div class="quarantine-line" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancle">取 消</el-button>
        <el-button type="primary" @click="sure">确 定</el-button>
      </span>
    </el-dialog>
    <suerDel ref="suerDel" />
  </div>
</template>

<script>
import OrderApi from '@/api/orderApi'
import suerDel from '@/views/orderlist/component/suerDel'
export default {
  components: {
    suerDel
  },
  props: {},
  data() {
    return {
      innerVisible: false,
      colorIcon: '',
      message: '',
      restaurants: [],
      merchantCodeList: [],
      merchatList: [
        {
          merchantCode: '',
          merchantId: '',
          merchantNum: '',
          divideNumber: 1,
          isNo: '1'
        }
      ],
      titleMessage: '',
      addMerchantPigDetailsRequestDto: [],
      fatherCode: '',
      merchatAllData: [],
      fatherNum: ''
    }
  },
  watch: {
    fatherCode(val) {
      this.fun(val)
    }
  },
  mounted() {
    // OrderApi.postqueryAllRoutedMerchant().then(res => {
    //   this.restaurants = res.result
    //   this.merchantCodeList = res.result
    // })
  },
  methods: {
    fun(val) {
      this.restaurants = this.merchantCodeList
      this.restaurants = this.restaurants.filter(v => v.merchantCode !== val)
      this.merchantCodeList = this.restaurants.filter(
        v => v.merchantCode !== val
      )
    },
    add() {
      this.merchatList.push({
        merchantCode: '',
        merchantId: '',
        merchantNum: '',
        divideNumber: 1,
        isNo: '1',
        son: ''
      })
    },
    rest() {
      this.merchatList = [
        {
          merchantCode: '',
          merchantId: '',
          merchantNum: '',
          divideNumber: 1,
          isNo: '1',
          son: ''
        }
      ]
    },
    del(index) {
      this.merchatList.splice(index, 1)
    },
    delSure(index) {
      this.addMerchantPigDetailsRequestDto.splice(index, 1)
      this.$refs.suerDel.innerVisible = false
    },
    dels(index) {
      this.$refs.suerDel.innerVisible = true
      this.$refs.suerDel.index = index
      // this.addMerchantPigDetailsRequestDto.splice(index, 1)
    },
    clickCmerchantCode(idx) {
      this.restaurants = this.merchantCodeList
      var data = JSON.parse(
        JSON.stringify([
          ...this.merchatList,
          ...this.addMerchantPigDetailsRequestDto
        ])
      )
      data.forEach((v, i) => {
        this.restaurants = this.restaurants.filter(
          o => o.merchantCode != v.merchantCode
        )
      })
      this.merchantCodeList.forEach(v => {
        if (data[idx].merchantCode === v.merchantCode) {
          this.restaurants.unshift(v)
        }
      })
      if (this.restaurants.length > 0) {
        this.titleMessage = ''
      } else {
        this.titleMessage = '无匹配数据'
      }
    },
    clickCmerchantCode1(idx) {
      this.restaurants = this.merchantCodeList

      var data = JSON.parse(
        JSON.stringify([
          ...this.merchatList,
          ...this.addMerchantPigDetailsRequestDto
        ])
      )

      data = data.filter(v => v.merchantCode !== '')
      data.forEach((v, i) => {
        this.restaurants = this.restaurants.filter(
          o => o.merchantCode != v.merchantCode
        )
      })

      this.merchantCodeList.forEach(v => {
        if (data[idx].merchantCode === v.merchantCode) {
          this.restaurants.unshift(v)
        }
      })
      if (this.restaurants.length > 0) {
        this.titleMessage = ''
      } else {
        this.titleMessage = '无匹配数据'
      }
    },
    handleCommand(val, idx) {
      this.merchatList[idx].merchantId = JSON.parse(val).merchantId
      this.merchatList[idx].merchantNum = JSON.parse(val).merchantNum

      this.merchatList[idx].son = JSON.parse(val).merchantCode
      this.merchatList[idx].merchantCode = JSON.parse(val).merchantCode
      const find = this.restaurants.findIndex(v => v.merchantCode === val)
      this.restaurants.splice(find, 1)
    },
    handleCommand1(val, idx) {
      this.addMerchantPigDetailsRequestDto[idx].merchantId = JSON.parse(
        val
      ).merchantId
      this.addMerchantPigDetailsRequestDto[idx].merchantNum = JSON.parse(
        val
      ).merchantNum
      this.addMerchantPigDetailsRequestDto[idx].son = JSON.parse(
        val
      ).merchantCode
      this.addMerchantPigDetailsRequestDto[idx].merchantCode = JSON.parse(
        val
      ).merchantCode
      const find = this.restaurants.findIndex(v => v.merchantCode === val)
      this.restaurants.splice(find, 1)
    },
    cancle() {
      this.$emit('confirmCancle')
      this.innerVisible = false
    },
    close() {
      this.$emit('confirmCancle')
      this.innerVisible = false
    },
    sure() {
      // const is = this.merchatList.every(v => v.merchantCode !== '')
      this.merchatList = this.merchatList.filter(v => v.merchantCode !== '')
      console.log(11)
      console.log(this.addMerchantPigDetailsRequestDto)

      const data = [
        ...this.merchatList,
        ...this.addMerchantPigDetailsRequestDto
      ]
      if (data.length > 0) {
        var sum = 0
        data.forEach(q => {
          sum += q.divideNumber
        })
        if (sum / 2 > Number(this.fatherNum)) {
          if (this.merchatList.length === 0) {
            this.rest()
          }
          this.$message.warning(
            `${this.fatherCode}录入的交易数小于分边数，请检查录入的交易信息`
          )
          return
        }
      }
      this.$emit('confirmPoints', JSON.parse(JSON.stringify(data)))
    }
  }
}
</script>

<style lang="scss" scoped>
.btn-img {
  display: flex;
  width: 80px;
  justify-content: space-between;
}
.access-Dialog {
  width: 100%;
  max-height: 400px;
  overflow: hidden;
  overflow: auto;
  font-size: 15px;
  padding: 15px 20px;
  .p {
    line-height: 30px;
  }
  .merchat-div {
    width: 90%;
    margin: auto;
    margin-bottom: 10px;
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
