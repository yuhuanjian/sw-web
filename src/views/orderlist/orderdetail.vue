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
  <div ref="main" class="dashboard-container">
    <!-- 查询 -->
    <!-- <div ref="search" class="search-wrap" /> -->
    <div class="sub-title-bar" style="padding:0 50px">
      <div style="font-size:20px;font-weight:bold;">订单详情</div>
      <el-button type="primary" @click="back()">返回</el-button>
    </div>
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
              <span class="cont-title"> 养殖场名称： </span>
              <span class="cont-right"> {{ order.farmName }} </span>
            </div>
            <div class="cont-content">
              <span class="cont-title"> 所属批发商： </span>
              <span class="cont-right"> {{ order.wholesaler }} </span>
            </div>
            <div class="cont-content">
              <span class="cont-title"> 进厂时间： </span>
              <span class="cont-right"> {{ order.enterTime }} </span>
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
          </div>
          <div class="cont-shang">
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
              <span class="cont-title"> 进厂数量（只）： </span>
              <span class="cont-right"> {{ order.enterNum }} </span>
            </div>
            <div class="cont-content">
              <span class="cont-title"> 实际进厂数量（只）： </span>
              <span class="cont-right"> {{ order.practicalEnterNum }} </span>
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
    <div class="line-img">
      <div class="line-bg" @click="showf()">
        <img src="../../assets/down.png" alt="">
      </div>
    </div>

    <div v-if="show" class="content" style="margin-left: 80px">
      <div class="title">
        <div class="title-right">
          <div class="shu" />
          <div>动物检疫合格证信息</div>
        </div>
      </div>

      <div class="content-cont">
        <div class="cont-shang">
          <div class="cont-content">
            <span class="cont-title"> 货主姓名： </span>
            <span class="cont-right"> {{ order.shipper }} </span>
          </div>
          <div class="cont-content">
            <span class="cont-title"> 动物检疫合格证号码： </span>
            <span class="cont-right">
              {{ order.quarantineCertificateNum }}
            </span>
          </div>
          <div class="cont-content">
            <span class="cont-title"> 产地： </span>
            <span class="cont-right"> {{ order.origin }} </span>
          </div>
        </div>
      </div>
    </div>
    <div v-if="show" class="content" style="margin-left: 80px">
      <div class="title">
        <div class="title-right">
          <div class="shu" />
          <div>物流信息</div>
        </div>
      </div>

      <div class="content-cont">
        <div class="cont-shang">
          <div class="cont-content">
            <span class="cont-title"> 提货单号： </span>
            <span class="cont-right"> {{ order.pickupOddNum }} </span>
          </div>
          <div class="cont-content">
            <span class="cont-title"> 提货车牌号： </span>
            <span class="cont-right"> {{ order.pickupPlateNumbers }} </span>
          </div>
          <div class="cont-content">
            <span class="cont-title"> 提货司机： </span>
            <span class="cont-right"> {{ order.pickupDriver }} </span>
          </div>
          <div class="cont-content">
            <span class="cont-title"> 司机联系方式： </span>
            <span class="cont-right"> {{ order.pickupDriverPhone }} </span>
          </div>
        </div>
        <div class="cont-shang">
          <div class="cont-content">
            <span class="cont-title"> 配送单号： </span>
            <span class="cont-right"> {{ order.orderNumber }} </span>
          </div>
        </div>
      </div>
    </div>
    <div class="table">
      <div class="table-cont">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="交易详情" name="first">
            <!-- <TableWrap> -->
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
                  v-has="'ordersMana:query'"
                  type="primary"
                  icon="el-icon-search"
                  @click="submitForm('formSearch')"
                >查询</el-button>
                <el-button
                  type="primary"
                  icon="el-icon-refresh"
                  plain
                  @click="resetForm('formSearch')"
                >重置</el-button>
              </div>
              <div class="div-p">交易数量(只):{{ tradeQuantity }}</div>
            </el-form>
            <el-table
              height="350px"
              :data="tableData1"
              border
              stripe
              style="width: 100%"
            >
              <el-table-column type="index" width="50" label="序号" />
              <el-table-column
                prop="wholesalerName"
                label="批发商名称"
                :show-overflow-tooltip="true"
              />
              <el-table-column
                prop="merchantCode"
                label="商户代号"
                :show-overflow-tooltip="true"
              />
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
              />
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
            <!-- </TableWrap> -->
          </el-tab-pane>
          <el-tab-pane label="异常详情" name="second">
            <!-- <TableWrap> -->
            <el-table
              height="400px"
              :data="tableData2"
              border
              style="width: 100%"
            >
              <el-table-column type="index" label="序号" width="50px" />
              <el-table-column
                prop="livePigNum"
                label="生猪编号"
                :show-overflow-tooltip="true"
              />
              <el-table-column
                prop="abnormalDate"
                label="异常日期"
                :show-overflow-tooltip="true"
              />
              <el-table-column
                prop="abnormalType"
                label="异常类型"
                :show-overflow-tooltip="true"
              >
                <template slot-scope="scope">
                  {{
                    scope.row.abnormalType === 1
                      ? '卸车前死亡'
                      : scope.row.abnormalType === 2
                        ? '急宰'
                        : scope.row.abnormalType === 3
                          ? '急宰不合格'
                          : scope.row.abnormalType === 4
                            ? '待宰前死亡'
                            : scope.row.abnormalType === 5
                              ? '检疫不合格'
                              : '病料'
                  }}
                </template>
              </el-table-column>
              <el-table-column
                prop="disposeCause"
                label="处理原因"
                :show-overflow-tooltip="true"
              />
              <el-table-column
                prop="disposeManner"
                label="处理方式"
                :show-overflow-tooltip="true"
              />
              <el-table-column
                prop="epidemicMaterials"
                label="是否计入病料"
                :show-overflow-tooltip="true"
              >
                <template slot-scope="scope">
                  {{ scope.row.epidemicMaterials === 1 ? '是' : '否' }}
                </template>
              </el-table-column>
              <el-table-column
                prop="illWeight"
                label="病料重量（公斤）"
                :show-overflow-tooltip="true"
              />
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
// import Pagination from '@/components/pagination'
// import TableWrap from '@/components/TableWrap'
import OrderApi from '@/api/orderApi'
import HeaderTitle from '../../components/headerTitle.vue'
import { dropDownwholesaler } from '@/api/jyzyy'
export default {
  components: {
    HeaderTitle
    // Pagination,
    // TableWrap
  },
  data() {
    return {
      activeName: 'first',
      order: {},
      tradeQuantity: '0',
      show: false,
      TableHeight: '300px',
      listQuery: {
        page: 1,
        limit: 20
      },
      ruleForm: {},
      time: '',
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        resourceData: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      tableData1: [],
      tableData2: [],
      wholesalerList: [],
      restaurants: [],
      formSearch: {}
    }
  },
  created() {
    OrderApi.postorderqueryOrderDetails(
      `orderId=${localStorage.getItem('orderId')}`
    ).then(res => {
      this.order = res.result
      this.order.origin = this.order.origin.replace(/,/g, ' ')
      this.tableData2 = res.result.abnormalDetailDTOList
      this.tableData1 = res.result.tradeParticularsDTOList
      this.order.wholesaler = this.$route.query.wholesaler
    })
    OrderApi.postqueryAllRoutedMerchant().then(res => {
      this.restaurants = res.result
    })
    dropDownwholesaler().then(res => {
      this.wholesalerList = res.result
    })
    this.submitForm()
    this.getList()
  },
  mounted() {},

  methods: {
    submitForm() {
      const data = {
        ...this.formSearch,
        orderId: localStorage.getItem('orderId')
      }
      OrderApi.postqueryTradeByRequest(data).then(res => {
        this.tableData1 = res.result.tradeParticularsDTOS
        this.tradeQuantity = res.result.tradeQuantity
      })
    },
    resetForm() {
      this.formSearch = {}
      this.submitForm()
    },
    getList() {},
    back() {
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
    showf() {
      if (this.show === true) {
        this.show = false
      } else {
        this.show = true
      }
    },
    handleClick() {}
  }
}
</script>

<style lang="scss" scoped>
.cont-right {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.demo-form-inline {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  .el-form-item {
    margin-bottom: 0 !important;
  }
  .btn-c {
    flex: 0 30%;
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
  // height: 163px;
  padding-bottom: 20px;
}
/deep/.action-wrap {
  display: flex;
  justify-content: space-between;
  margin-top: 24px;
  margin-left: 50px;
  margin-right: 60px;
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
  margin-left: 20px;
}
.title {
  //   display: flex;
  //   flex-direction: row;
  //   justify-content: space-between;
  //   align-items: center;
  width: 200px;
  height: 40px;
  line-height: 40px;
  margin-left: 20px;
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
    width: 19%;
    margin-right: 50px;
    display: flex;
    color: rgba(0, 0, 0, 0.45);
    .cont-title {
      white-space: nowrap;
    }
  }
}
.table {
  margin-top: 24px;
  margin-left: 50px;
  margin-right: 60px;
}
.table-cont {
  margin-left: 50px;
  margin-right: 60px;
  margin-top: 22px;
}
.btn {
  width: 100%;
  text-align: center;
  margin-top: 30px;
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
