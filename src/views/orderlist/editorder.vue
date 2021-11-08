<!--
import { setTimeout } from 'timers';
 * @Author: your name
 * @Date: 2020-05-27 18:43:25
 * @LastEditTime: 2020-05-27 18:44:34
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \smart_space_admin\src\views\dashboard\index.vue
-->
<template>
  <div ref="main" class="dashboard-container detail-con">
    <header-title title="订单编辑" routepush="/order/orderlist/ordermanager" />
    <div class="quarantine-line" />
    <!-- 列表操作 -->
    <div ref="action" class="action-wrap">
      <div class="content" style="border-bottom: 1px solid #e8e8e8">
        <div class="title">
          <div class="title-right">
            <div class="shu" />
            <div>订单信息</div>
          </div>
        </div>
        <div class="content-cont">
          <div class="cont-shang">
            <div class="cont-content">
              <span class="cont-title"> 订单编号： </span>
              <span class="cont-right"> {{ order.orderNum }} </span>
            </div>
            <div class="cont-content">
              <span class="cont-title"> 订单状态： </span>
              <span class="cont-right">
                {{
                  order.orderStatus === 1
                    ? '新订单'
                    : order.orderStatus === 2
                      ? '提货中'
                      : order.orderStatus === 3
                        ? '提货完成'
                        : order.orderStatus === 4
                          ? '准入检疫完成'
                          : order.orderStatus === 5
                            ? '交易完成'
                            : order.orderStatus === 6
                              ? '准宰检疫完成'
                              : order.orderStatus === 7
                                ? '准出检疫完成'
                                : order.orderStatus === 8
                                  ? '配送中'
                                  : '订单完成'
                }}
              </span>
            </div>
            <div class="cont-content">
              <span class="cont-title"> 检疫状态： </span>
              <span
                class="cont-right"
              >{{
                order.quarantineStatus === 1
                  ? '准入检疫-等待'
                  : order.quarantineStatus === 2
                    ? '准入检疫-通过'
                    : order.quarantineStatus === 3
                      ? '准入检疫-异常'
                      : order.quarantineStatus === 4
                        ? '准宰检疫-等待'
                        : order.quarantineStatus === 5
                          ? '准宰检疫-通过'
                          : order.quarantineStatus === 6
                            ? '准宰检疫-异常'
                            : order.quarantineStatus === 7
                              ? '准出检疫-等待'
                              : order.quarantineStatus === 8
                                ? '准出检疫-通过'
                                : '准出检疫-异常'
              }}
              </span>
            </div>
            <div class="cont-content">
              <span class="cont-title"> 调度状态： </span>
              <span class="cont-right">
                {{
                  order.dispathStatus === 1
                    ? '提货未调度'
                    : order.dispathStatus === 2
                      ? '提货已调度'
                      : order.dispathStatus === 3
                        ? '配送未调度'
                        : '配送已调度'
                }}
              </span>
            </div>
            <div class="cont-content">
              <span class="cont-title"> 运输状态： </span>
              <span class="cont-right">
                {{
                  order.transportationStatus === 1
                    ? '新提货单'
                    : order.transportationStatus === 2
                      ? '准备提货'
                      : order.transportationStatus === 3
                        ? '提货中'
                        : order.transportationStatus === 4
                          ? '提货完成'
                          : order.transportationStatus === 5
                            ? '等待配送'
                            : order.transportationStatus === 6
                              ? '新送货单'
                              : order.transportationStatus === 7
                                ? '准备送货'
                                : order.transportationStatus === 8
                                  ? '送货中'
                                  : '送货完成'
                }}
              </span>
            </div>
            <div class="cont-content">
              <span class="cont-title"> 异常数量（只）： </span>
              <span class="cont-right" style="color: red">
                {{ order.abnormalNum }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="table">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="订单编辑" name="first">
          <fromOrder ref="fromOrder" />
        </el-tab-pane>
        <el-tab-pane label="交易编辑" name="second">
          <div class="table-cont">
            <el-form
              :inline="true"
              :model="formSearch"
              class="demo-form-inline"
            >
              <el-form-item label="">
                <el-select
                  v-model="formSearch.wholesalerId"
                  placeholder="请选择所属批发商"
                  filterable
                >
                  <el-option
                    v-for="(item, index) in wholesalerList"
                    :key="index"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
              <el-form-item label="">
                <el-select
                  v-model="formSearch.merchantId"
                  placeholder="请选择商户代号"
                  filterable
                >
                  <el-option
                    v-for="(item, index) in restaurants"
                    :key="index"
                    :label="item.merchantCode"
                    :value="item.merchantId"
                  />
                </el-select>
              </el-form-item>
              <div class="btn-c">
                <el-button
                  v-if="order.orderStatus === 5"
                  type="primary"
                  @click="updataWholer('form')"
                >修改批发商</el-button>
                <el-button
                  type="primary"
                  icon="el-icon-search"
                  @click="inquire('formSearch')"
                >查询</el-button>
                <el-button
                  type="primary"
                  icon="el-icon-refresh"
                  plain
                  @click="restinquire('formSearch')"
                >重置</el-button>
              </div>
              <div class="div-p">交易数量(只):{{ tradeQuantity }}</div>
            </el-form>
            <el-table
              ref="table"
              height="350px"
              :data="tableData"
              border
              style="width: 100%"
              @selection-change="handleSelectionChange"
            >
              <el-table-column type="selection" width="55" />
              <el-table-column type="index" width="50" label="序号" />
              <el-table-column
                prop="wholesalerName"
                label="批发商名称"
                :show-overflow-tooltip="true"
              />

              <el-table-column prop="merchantCode" label="商户代号">
                <template slot-scope="scope">
                  <el-select
                    v-model="scope.row.merchantCode"
                    filterable
                    placeholder="请选择"
                    :disabled="order.orderStatus !== 5"
                    @change="handleCommand($event, scope.$index)"
                  >
                    <el-option
                      v-for="(item, index) in restaurants"
                      :key="index"
                      :label="item.merchantCode"
                      :value="JSON.stringify(item)"
                    />
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column
                prop="merchantName"
                label="交易商户"
                :show-overflow-tooltip="true"
              />
              <el-table-column
                prop="merchantNum"
                label="商户编号"
                :show-overflow-tooltip="true"
              />
              <el-table-column
                prop="type"
                label="商户类型"
                :show-overflow-tooltip="true"
              >
                <template slot-scope="scope">
                  {{ scope.row.type }}
                </template>
              </el-table-column>
              <el-table-column
                prop="merchantAddress"
                label="商户地址"
                :show-overflow-tooltip="true"
              />
              <el-table-column
                prop="livePigNum"
                label="生猪编号"
                :show-overflow-tooltip="true"
              />
            </el-table>
            <div v-if="order.orderStatus === 5" class="btn">
              <el-button
                type="primary"
                @click="submitForm('formSearch')"
              >提交</el-button>
              <el-button @click="resetForm('formSearch')">取消</el-button>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <el-dialog
      width="600px"
      title="修改批发商"
      :close-on-click-modal="false"
      :visible.sync="innerVisible"
      append-to-body
      :before-close="close"
    >
      <div class="access-Dialog">
        <el-form ref="form" :model="form" :rules="rules" label-width="200px">
          <el-form-item label="批发商名称:" prop="wholesaler">
            <el-select
              v-model="form.wholesaler"
              placeholder="请选择所属批发商"
              filterable
            >
              <el-option
                v-for="(item, index) in wholesalerList"
                :key="index"
                :label="item.name"
                :value="JSON.stringify(item)"
              />
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div class="quarantine-line" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancle">取 消</el-button>
        <el-button type="primary" @click="sureNo('form')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// import Pagination from '@/components/pagination'
// import TableWrap from '@/components/TableWrap'
import headerTitle from '@/components/headerTitle'
import OrderApi from '@/api/orderApi'
import fromOrder from '@/views/orderlist/component/fromOrder'
import { dropDownwholesaler } from '@/api/jyzyy'

export default {
  components: {
    // Pagination,
    // TableWrap,
    headerTitle,
    fromOrder
  },
  data() {
    return {
      activeName: 'first',
      order: {},
      formSearch: {},
      form: {},
      tradeQuantity: '0',
      innerVisible: false,
      TableHeight: '300px',
      listQuery: {
        page: 1,
        limit: 20
      },
      show: false,
      ruleForm: {},
      time: '',
      num: 20,
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        resourceData: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        wholesaler: [
          { required: true, message: '请选择批发商名称', trigger: 'change' }
        ]
      },
      tableData: [],
      restaurants: [],
      titleMessage: '',
      merchantCodeList: [],
      tableDataOld: [],
      wholesalerList: [],
      SelectionData: []
    }
  },
  created() {
    OrderApi.postorderqueryOrderDetails(
      `orderId=${localStorage.getItem('orderId')}`
    ).then(res => {
      this.order = res.result
      this.$refs.fromOrder.ruleForm = res.result
      this.$refs.fromOrder.getCitys()
      this.order.origin = this.order.origin.replace(/,/g, ' ')
      this.tableData = res.result.tradeParticularsDTOList
      this.inquire()
      this.tableDataOld = [...res.result.tradeParticularsDTOList]
      localStorage.setItem(
        'tradeParticularsDTOList',
        JSON.stringify(this.tableDataOld)
      )
    })
    OrderApi.postqueryAllRoutedMerchant().then(res => {
      this.restaurants = res.result
      this.merchantCodeList = res.result
    })

    dropDownwholesaler().then(res => {
      this.wholesalerList = res.result
    })
    this.getList()
  },

  methods: {
    sureNo(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const oldData = JSON.parse(JSON.stringify(this.SelectionData))
          const data = this.SelectionData.map((v, i) => {
            return {
              livePigNum: v.livePigNum,
              wholesalerId: JSON.parse(this.form.wholesaler).id,
              wholesalerIdOld: oldData[i].wholesalerId,
              orderId: localStorage.getItem('orderId')
            }
          })
          console.log(data)
          OrderApi.updateWholesalerInfo(data).then(res => {
            this.$message.success('修改成功')
            this.restinquire()
            // this.SelectionData.forEach(v => {
            //   v.wholesalerName = JSON.parse(this.form.wholesaler).name
            //   v.wholesalerId = JSON.parse(this.form.wholesaler).id
            // })
            this.close()
          })
        } else {
          return false
        }
      })
    },
    close() {
      this.innerVisible = false
      this.$refs.table.clearSelection()
    },
    cancle() {
      this.close()
    },
    handleSelectionChange(val, idx) {
      this.SelectionData = val
    },
    updataWholer(formName) {
      if (this.SelectionData.length === 0) {
        this.$message.warning('请至少选择一项')
        return
      }
      this.$refs[formName] && this.$refs[formName].resetFields()
      this.innerVisible = true
    },
    inquire() {
      const data = {
        ...this.formSearch,
        orderId: localStorage.getItem('orderId')
      }
      OrderApi.postqueryTradeByRequest(data).then(res => {
        this.tableData = res.result.tradeParticularsDTOS
        this.tradeQuantity = res.result.tradeQuantity
      })
    },
    restinquire() {
      this.formSearch = {}
      this.inquire()
    },
    handleClick() {
      this.$refs.table.clearSelection()
    },
    clickCmerchantCode(idx) {
      this.restaurants = this.merchantCodeList
      this.tableData.forEach((v, i) => {
        this.restaurants = this.restaurants.filter(
          o => o.merchantCode != v.merchantCode
        )
      })
      this.merchantCodeList.forEach(v => {
        if (this.tableData[idx].merchantCode === v.merchantCode) {
          this.restaurants.unshift(v)
        }
      })
      if (this.restaurants.length > 0) {
        this.titleMessage = ''
      } else {
        this.titleMessage = '无匹配数据'
      }
    },
    submitForm() {
      const isKong = this.tableData.every(v => v.code != '')
      if (isKong) {
        var dataOrders = []
        // var OldeId = this.tableDataOld.map(v => v.merchantId)
        const arrs = JSON.parse(localStorage.getItem('tradeParticularsDTOList'))
        console.log('arrs', arrs)
        console.log('arrs', this.tableData)

        this.tableData.forEach((v, i) => {
          if (
            v.merchantCode != arrs[i].merchantCode ||
            v.wholesalerName != arrs[i].wholesalerName
          ) {
            dataOrders.push({
              wholesalerName: v.wholesalerName,
              wholesalerId: v.wholesalerId,
              livePigNum: v.livePigNum,
              merchantIdNew: v.merchantId,
              merchantIdOld: arrs[i].merchantId
            })
          }
        })
        console.log('arrs', dataOrders)

        const data = {
          merchantInfos: dataOrders,
          orderId: localStorage.getItem('orderId')
        }
        OrderApi.postorderqueryOrdereditOrders(data).then(res => {
          const nowRouter = this.$route
          const obj = {
            label: nowRouter.meta.tagName || nowRouter.meta.title,
            path: nowRouter.path,
            name: nowRouter.name,
            lastTime: new Date().getTime()
          }
          this.$store.dispatch('app/deleteTagNavList', obj)
          this.$router.push({
            path: 'ordermanager'
          })
        })
      } else {
        this.$message.error('商户代号不能为空！')
      }
    },

    handleCommand(val, idx) {
      val = JSON.parse(val)
      this.tableData[idx].merchantCode = val.merchantCode
      this.tableData[idx].merchantName = val.merchantName
      this.tableData[idx].merchantId = val.merchantId
      this.tableData[idx].merchantAddress = val.address
      this.tableData[idx].type = val.type === 1 ? '大客户' : '散户'
      this.tableData[idx].merchantNum = val.merchantNum
      // this.tableData.splice(idx, 1, val)
    },
    resetForm() {
      const nowRouter = this.$route
      const obj = {
        label: nowRouter.meta.tagName || nowRouter.meta.title,
        path: nowRouter.path,
        name: nowRouter.name,
        lastTime: new Date().getTime()
      }
      this.$store.dispatch('app/deleteTagNavList', obj)
      this.$router.push({
        path: 'ordermanager'
      })
    },
    getList() {},
    showf() {
      if (this.show === true) {
        this.show = false
      } else {
        this.show = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.access-Dialog {
  padding: 40px 0 20px 0;
}
.demo-form-inline {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  .el-form-item {
    margin-bottom: 0 !important;
  }
  .btn-c {
    flex: 0 40%;
  }
  .div-p {
    flex: 0 30%;
    text-align: right;
  }
}
/deep/.dashboard-container {
  //  height: 100%;
  padding: 0 0 20px 0;
}
.content {
  width: 100%;
  //   height: 163px;
  padding-bottom: 20px;
}
/deep/.action-wrap {
  display: flex;
  justify-content: space-between;
  margin-top: 24px;
  padding: 24px 30px 10px;
}
.top {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 69px;
  line-height: 69px;
  margin-top: -10px;
  margin-left: 40px;
  margin-right: 60px;
  border-bottom: 1px solid #e8e8e8;
}
.content-cont {
  //   margin-left: 20px;
}
.title {
  //   display: flex;
  //   flex-direction: row;
  //   justify-content: space-between;
  //   align-items: center;
  width: 200px;
  height: 40px;
  line-height: 40px;
  // margin-left: 50px;
  //   text-align: right;
  .title-right {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .shu {
    width: 2px;
    height: 20px;
    background: #4285f4;
    opacity: 1;
    margin-right: 5px;
  }
}
.cont-shang {
  display: flex;
  flex-direction: row;
  justify-content: left;
  margin-top: 26px;
  font-size: 14px;
  font-family: PingFang SC;
  font-weight: 400;
  .content-title {
    color: rgba(0, 0, 0, 0.65);
  }
  .cont-content {
    margin-right: 50px;
    display: flex;
    color: rgba(0, 0, 0, 0.45);
    .cont-title {
      white-space: nowrap;
    }
  }
}
.table {
  margin-left: 30px;
}
.table-cont {
  margin-top: 22px;
}
.btn {
  width: 100%;
  text-align: center;
  margin-top: 30px;
  margin-bottom: 20px;
}
.line-img {
  text-align: center;
  margin-top: -30px;
  .line-bg {
    display: inline-block;
    width: 30px;
    height: 20px;
    background: #fff;
  }
  img {
    width: 30px;
    height: 20px;
  }
}
</style>
