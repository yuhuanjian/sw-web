<template>
  <div ref="main" class="dashboard-container detail-con">
    <!-- <div class="quarantine-Top">
      <p>检疫管理</p>
      <span><span>*</span>为必填项</span>
    </div> -->
    <div ref="search">
      <headerxq title="检疫详情" routepush="rootjy" :header-list="headerList" />
    </div>
    <hr ref="action" class="wrap-line topmarg ">
    <TableWrap>
      <el-tabs
        v-model="activeName"
        style="height:100%"
        @tab-click="handleClick"
      >
        <el-tab-pane label="非洲猪瘟抽样检测" name="first" style="height:100%">
          <el-row :gutter="20" class="img-wrap">
            <el-col v-for="(item, index) in imgList" :key="index" :span="4">
              <img height="200" width="100%" :src="item.attachmentUrl" alt="">
              <p>{{ item.attachmentName }}</p>
              <!-- <p>{{ item.createdTime }}</p> -->
            </el-col>
            <div
              v-if="imgList.length === 0"
              style="text-align:center;margin-top:150px;color:#ccc;font-size:14px"
            >
              暂无数据
            </div>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="非洲猪瘟检测登记" name="second" style="height:100%">
          <el-table
            :data="tableData"
            border
            style="width: 100%"
            stripe
            height="95%"
          >
            <el-table-column
              prop="detectionDate"
              label="检测日期"
              width="180"
            />
            <el-table-column
              prop="shipper"
              label="货主姓名"
              :show-overflow-tooltip="true"
            />
            <el-table-column
              prop="plateNumbers"
              label="车牌号码"
              width="160"
              :show-overflow-tooltip="true"
            />
            <el-table-column
              prop="origin"
              label="来源（产地）"
              :show-overflow-tooltip="true"
            >
              <el-table-column
                prop="province"
                label="省"
                :show-overflow-tooltip="true"
                width="120"
              >
                <template slot-scope="scope">
                  {{ scope.row.origin.split(',')[0] }}
                </template>
              </el-table-column>
              <el-table-column
                prop="city"
                label="市"
                width="120"
                :show-overflow-tooltip="true"
              >
                <template slot-scope="scope">
                  {{ scope.row.origin.split(',')[1] }}
                </template>
              </el-table-column>
              <el-table-column
                prop="address"
                label="区"
                width="150"
                :show-overflow-tooltip="true"
              >
                <template slot-scope="scope">
                  {{ scope.row.origin.split(',')[2] }}
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column
              prop="quarantineCertificateNum"
              label="动物检疫合格证号"
              :show-overflow-tooltip="true"
            />
            <el-table-column
              prop="sameBatchNum"
              label="同批次屠宰量"
              :show-overflow-tooltip="true"
            />
            <el-table-column
              prop="sampleNum"
              label="采样数量"
              :show-overflow-tooltip="true"
            />
            <el-table-column
              prop="specimenNo"
              label="样品编号"
              :show-overflow-tooltip="true"
            />
            <el-table-column
              prop="sampleLocation"
              label="采样地点"
              :show-overflow-tooltip="true"
            >
              <template slot-scope="scope">
                <p v-if="scope.row.sampleLocation == 1">入厂前</p>
                <p v-if="scope.row.sampleLocation == 2">屠宰前</p>
                <p v-if="scope.row.sampleLocation == 3">待宰前</p>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="沙丁胺醇检测登记" name="third" style="height:100%">
          <div class="quarantine-tabtitle">
            顺德区农产品（沙丁胺醇）项抽样检测记录表
          </div>
          <div class="table-top">
            <el-table border style="width: 100%">
              <el-table-column prop="sampleDate" label="抽样日期" width="180" />
              <el-table-column align="center">
                <template slot="header" slot-scope="scope">
                  {{ tab.sampleDate }}
                </template>
              </el-table-column>
              <el-table-column prop="sampleUnit" label="抽样单位" />
              <el-table-column align="center">
                <template slot="header" slot-scope="scope">
                  {{ tab.sampleUnit }}
                </template>
              </el-table-column>

              <el-table-column prop="sampler" label="抽样人" />

              <el-table-column align="center">
                <template slot="header" slot-scope="scope">
                  {{ tab.sampler }}
                </template>
              </el-table-column>
              <el-table-column prop="collator" label="核对人" />
              <el-table-column align="center">
                <template slot="header" slot-scope="scope">
                  {{ tab.collator }}
                </template>
              </el-table-column>
            </el-table>
          </div>
          <el-table
            :data="dataTables"
            border
            style="width: 100%"
            stripe
            height="75%"
          >
            <el-table-column type="index" label="序号" width="50" />
            <el-table-column
              prop="specimenName"
              label="样品名称"
              :show-overflow-tooltip="true"
            />
            <el-table-column
              prop="specimenNo"
              label="样品编号"
              width="180"
              :show-overflow-tooltip="true"
            />
            <el-table-column
              prop="sampleNum"
              label="抽样数量"
              :show-overflow-tooltip="true"
            />
            <el-table-column
              prop="sampleCardinality"
              label="抽样基数"
              :show-overflow-tooltip="true"
            />
            <el-table-column
              prop="sampleLocation"
              label="抽样地点"
              :show-overflow-tooltip="true"
            />
            <el-table-column
              prop="specimenSource"
              label="样品来源"
              width="200"
              :show-overflow-tooltip="true"
            ><el-table-column
               prop="province"
               label="省"
               :show-overflow-tooltip="true"
               width="120"
             >
               <template slot-scope="scope">
                 {{ scope.row.specimenSource.split(',')[0] }}
               </template>
             </el-table-column>
              <el-table-column
                prop="city"
                label="市"
                width="120"
                :show-overflow-tooltip="true"
              >
                <template slot-scope="scope">
                  {{ scope.row.specimenSource.split(',')[1] }}
                </template>
              </el-table-column>
              <el-table-column
                prop="address"
                label="区"
                width="150"
                :show-overflow-tooltip="true"
              >
                <template slot-scope="scope">
                  {{ scope.row.specimenSource.split(',')[2] }}
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column
              prop="specimenType"
              label="样品类型"
              :show-overflow-tooltip="true"
            />
            <el-table-column
              prop="unitInspectedTelephone"
              label="受检单位，联系电话"
              width="200"
              :show-overflow-tooltip="true"
            />
            <el-table-column
              prop="inspectedPeople"
              label="受检人"
              :show-overflow-tooltip="true"
            />
            <el-table-column
              prop="detectionConsequence"
              label="检测结果"
              :show-overflow-tooltip="true"
            >
              <template slot-scope="scope">
                {{ scope.row.detectionConsequence === 1 ? '阴性' : '阳性' }}
              </template>
            </el-table-column>
            <el-table-column
              prop="disposeManner"
              label="处理方式"
              :show-overflow-tooltip="true"
            />
            <el-table-column
              prop="comment"
              label="备注"
              width="150"
              :show-overflow-tooltip="true"
            />
          </el-table>
        </el-tab-pane>
        <el-tab-pane
          label="莱克多巴胺检测登记"
          name="fourth"
          style="height:100%"
        >
          <div class="quarantine-tabtitle">
            顺德区农产品（莱克多巴胺）项抽样检测记录表
          </div>
          <div class="table-top">
            <el-table border style="width: 100%">
              <el-table-column prop="sampleDate" label="抽样日期" width="180" />
              <el-table-column align="center">
                <template slot="header" slot-scope="scope">
                  {{ tab.sampleDate }}
                </template>
              </el-table-column>
              <el-table-column prop="sampleUnit" label="抽样单位" />
              <el-table-column align="center">
                <template slot="header" slot-scope="scope">
                  {{ tab.sampleUnit }}
                </template>
              </el-table-column>

              <el-table-column prop="sampler" label="抽样人" />

              <el-table-column align="center">
                <template slot="header" slot-scope="scope">
                  {{ tab.sampler }}
                </template>
              </el-table-column>
              <el-table-column prop="collator" label="核对人" />
              <el-table-column align="center">
                <template slot="header" slot-scope="scope">
                  {{ tab.collator }}
                </template>
              </el-table-column>
            </el-table>
          </div>
          <el-table
            :data="dataTables1"
            border
            style="width: 100%"
            stripe
            height="75%"
          >
            <el-table-column type="index" label="序号" width="50" />
            <el-table-column
              prop="specimenName"
              label="样品名称"
              :show-overflow-tooltip="true"
            />
            <el-table-column
              prop="specimenNo"
              label="样品编号"
              width="150"
              :show-overflow-tooltip="true"
            />
            <el-table-column
              prop="sampleNum"
              label="抽样数量"
              :show-overflow-tooltip="true"
            />
            <el-table-column
              prop="sampleCardinality"
              label="抽样基数"
              :show-overflow-tooltip="true"
            />
            <el-table-column
              prop="sampleLocation"
              label="抽样地点"
              :show-overflow-tooltip="true"
            />
            <el-table-column
              prop="specimenSource"
              label="样品来源"
              width="200"
              :show-overflow-tooltip="true"
            >
              <el-table-column
                prop="province"
                label="省"
                :show-overflow-tooltip="true"
                width="120"
              >
                <template slot-scope="scope">
                  {{ scope.row.specimenSource.split(',')[0] }}
                </template>
              </el-table-column>
              <el-table-column
                prop="city"
                label="市"
                width="120"
                :show-overflow-tooltip="true"
              >
                <template slot-scope="scope">
                  {{ scope.row.specimenSource.split(',')[1] }}
                </template>
              </el-table-column>
              <el-table-column
                prop="address"
                label="区"
                width="150"
                :show-overflow-tooltip="true"
              >
                <template slot-scope="scope">
                  {{ scope.row.specimenSource.split(',')[2] }}
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column
              prop="specimenType"
              label="样品类型"
              :show-overflow-tooltip="true"
            />
            <el-table-column
              prop="unitInspectedTelephone"
              label="受检单位，联系电话"
              width="200"
              :show-overflow-tooltip="true"
            />
            <el-table-column
              prop="inspectedPeople"
              label="受检人"
              :show-overflow-tooltip="true"
            />
            <el-table-column
              prop="detectionConsequence"
              label="检测结果"
              :show-overflow-tooltip="true"
            >
              <template slot-scope="scope">
                {{ scope.row.detectionConsequence === 1 ? '阴性' : '阳性' }}
              </template>
            </el-table-column>
            <el-table-column
              prop="disposeManner"
              label="处理方式"
              :show-overflow-tooltip="true"
            />
            <el-table-column
              prop="comment"
              label="备注"
              width="150"
              :show-overflow-tooltip="true"
            />
          </el-table>
        </el-tab-pane>
        <el-tab-pane
          label="盐酸克伦特罗检测登记"
          name="five"
          style="height:100%"
        >
          <div class="quarantine-tabtitle">
            顺德区农产品（盐酸克伦特罗）项抽样检测记录表
          </div>
          <div class="table-top">
            <el-table border style="width: 100%">
              <el-table-column prop="sampleDate" label="抽样日期" width="180" />
              <el-table-column align="center">
                <template slot="header" slot-scope="scope">
                  {{ tab.sampleDate }}
                </template>
              </el-table-column>
              <el-table-column prop="sampleUnit" label="抽样单位" />
              <el-table-column align="center">
                <template slot="header" slot-scope="scope">
                  {{ tab.sampleUnit }}
                </template>
              </el-table-column>

              <el-table-column prop="sampler" label="抽样人" />

              <el-table-column align="center">
                <template slot="header" slot-scope="scope">
                  {{ tab.sampler }}
                </template>
              </el-table-column>
              <el-table-column prop="collator" label="核对人" />
              <el-table-column align="center">
                <template slot="header" slot-scope="scope">
                  {{ tab.collator }}
                </template>
              </el-table-column>
            </el-table>
          </div>
          <el-table
            :data="dataTables2"
            border
            style="width: 100%"
            stripe
            height="75%"
          >
            <el-table-column type="index" label="序号" width="50" />
            <el-table-column
              prop="specimenName"
              label="样品名称"
              :show-overflow-tooltip="true"
            />
            <el-table-column
              prop="specimenNo"
              label="样品编号"
              width="150"
              :show-overflow-tooltip="true"
            />
            <el-table-column
              prop="sampleNum"
              label="抽样数量"
              :show-overflow-tooltip="true"
            />
            <el-table-column
              prop="sampleCardinality"
              label="抽样基数"
              :show-overflow-tooltip="true"
            />
            <el-table-column
              prop="sampleLocation"
              label="抽样地点"
              :show-overflow-tooltip="true"
            />
            <el-table-column
              prop="specimenSource"
              label="样品来源"
              :show-overflow-tooltip="true"
              width="200"
            >
              <el-table-column
                prop="province"
                label="省"
                :show-overflow-tooltip="true"
                width="120"
              >
                <template slot-scope="scope">
                  {{ scope.row.specimenSource.split(',')[0] }}
                </template>
              </el-table-column>
              <el-table-column
                prop="city"
                label="市"
                width="120"
                :show-overflow-tooltip="true"
              >
                <template slot-scope="scope">
                  {{ scope.row.specimenSource.split(',')[1] }}
                </template>
              </el-table-column>
              <el-table-column
                prop="address"
                label="区"
                width="150"
                :show-overflow-tooltip="true"
              >
                <template slot-scope="scope">
                  {{ scope.row.specimenSource.split(',')[2] }}
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column
              prop="specimenType"
              label="样品类型"
              :show-overflow-tooltip="true"
            />
            <el-table-column
              prop="unitInspectedTelephone"
              label="受检单位，联系电话"
              width="200"
              :show-overflow-tooltip="true"
            />
            <el-table-column
              prop="inspectedPeople"
              label="受检人"
              :show-overflow-tooltip="true"
            />
            <el-table-column
              prop="detectionConsequence"
              label="检测结果"
              :show-overflow-tooltip="true"
            >
              <template slot-scope="scope">
                {{ scope.row.detectionConsequence === 1 ? '阴性' : '阳性' }}
              </template>
            </el-table-column>
            <el-table-column
              prop="disposeManner"
              label="处理方式"
              :show-overflow-tooltip="true"
            />
            <el-table-column
              prop="comment"
              label="备注"
              width="150"
              :show-overflow-tooltip="true"
            />
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="异常详情" name="six" style="height:100%">
          <el-table
            :data="dataTables3"
            border
            style="width: 100%"
            stripe
            height="82%"
          >
            <el-table-column type="index" label="序号" width="50" />
            <el-table-column
              prop="livePigNum"
              label="生猪编号"
              width="180"
              :show-overflow-tooltip="true"
            />
            <el-table-column
              prop="abnormalDate"
              label="异常日期"
              width="180"
              :show-overflow-tooltip="true"
            />
            <el-table-column
              prop="abnormalType"
              label="异常类型"
              :show-overflow-tooltip="true"
            >
              <template slot-scope="scope">
                <p v-if="scope.row.abnormalType === 1">卸车前死亡</p>
                <p v-if="scope.row.abnormalType === 2">急宰</p>
                <p v-if="scope.row.abnormalType === 3">急宰不合格</p>
                <p v-if="scope.row.abnormalType === 4">待宰前死亡</p>
                <p v-if="scope.row.abnormalType === 5">检疫不合格</p>
                <p v-if="scope.row.abnormalType === 6">病料</p>
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
                <p v-if="scope.row.epidemicMaterials === 1">是</p>
                <p v-if="scope.row.epidemicMaterials === 2">否</p>
              </template>
            </el-table-column>
            <el-table-column
              prop="convertNum"
              label="折合头数"
              :show-overflow-tooltip="true"
            />
            <el-table-column
              prop="illWeight"
              label="病料重量（公斤）"
              width="200"
            />
          </el-table>
          <pagination
            v-show="total > 0"
            :total="total"
            :page.sync="listQuery.page"
            :limit.sync="listQuery.limit"
            @pagination="getList"
          />
        </el-tab-pane>
      </el-tabs>
    </TableWrap>
  </div>
</template>

<script>
import TableWrap from '@/components/TableWrap'
import headerxq from './components/headerxq'
import Pagination from '@/components/pagination'
import {
  postQuarantinequeryAbnormalInfo,
  postallowKillQuarquerySampleInsRecInfo,
  postAllowEntQuarQueryFileByOrderId,
  postallowKillQuarquerySwFeverDeInfo
} from '@/api/jyzyy'
import { postFindOrdersById } from '@/api/order.js'
export default {
  components: {
    TableWrap,
    headerxq,
    Pagination
  },
  data() {
    return {
      listQuery: {
        page: 1,
        limit: 10
      },
      total: 200,
      dataTables1: [],
      dataTables2: [],
      dataTables3: [
        {
          livePigNum: 'ASD11151',
          abnormalDate: '2020-12-23 09:59:00',
          abnormalType: '待宰前死亡',
          disposeCause: '死亡',
          disposeManner: '高温处理',
          epidemicMaterials: '否',
          convertNum: '1',
          illWeight: '150kg'
        }
      ],
      listTab: [
        {
          title: '非洲猪瘟抽样检测',
          name: 'first'
        },
        {
          title: '非洲猪瘟检测登记',
          name: 'second'
        },
        {
          title: '沙丁胺醇检测登记',
          name: 'third'
        },
        {
          title: '莱克多巴胺检测登记',
          name: 'fourth'
        },
        {
          title: '盐酸克伦特罗检测登记',
          name: 'five'
        },
        {
          title: '异常详情',
          name: 'six'
        }
      ],
      dataTables: [],
      tableData: [],
      formUp: {
        name: '',
        type: '',
        orderId: '',
        fileUrl: ''
      },
      imgList: [],
      activeName: 'first',
      orderNumber: '',
      farm: '',
      shipper: '',
      wholesale: '',
      enterData: '',
      enterNumber: 0,
      abnormalNumber: 0,
      prepareNumber: 0,
      quantityNumber: 0,
      status: '',
      ladingNumber: '',
      orderPlate: '',
      headerList: {},
      tab: {},
      detailsMessage: {}
    }
  },
  created() {
    this.detailsMessage = JSON.parse(localStorage.getItem('detailsMessage'))

    postFindOrdersById(this.detailsMessage.id).then(res => {
      this.headerList = res.result
      this.headerList.wholesaler = this.$route.query.wholesaler
    })
    postAllowEntQuarQueryFileByOrderId(this.detailsMessage.id).then(res => {
      this.imgList = res.result
    })
    postallowKillQuarquerySwFeverDeInfo(this.detailsMessage.id).then(res => {
      if (res.result.orderId == null) {
      } else {
        this.tableData = [res.result]
      }
    })
    this.getList()
    postallowKillQuarquerySampleInsRecInfo(this.detailsMessage.id).then(res => {
      this.dataTables = res.result.specimenNoType1
      this.dataTables1 = res.result.specimenNoType3
      this.dataTables2 = res.result.specimenNoType2
      this.tab = res.result
    })
  },
  methods: {
    handleClick(tab, event) {},
    getList() {
      postQuarantinequeryAbnormalInfo({
        orderId: this.detailsMessage.id,
        quarType: null,
        pageNum: this.listQuery.page,
        pageSize: this.listQuery.limit
      }).then(res => {
        this.total = res.result.total
        this.dataTables3 = res.result.list
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.table-wrap {
  padding: 0px !important;
}
.topmarg {
  margin-top: 20px;
}
.table-top {
  /deep/.el-table__empty-block {
    display: none;
  }
}
/deep/.el-tabs__content {
  height: 500px;
}
.quarantine-tabtitle {
  width: 100%;
  text-align: center;
  margin-bottom: 10px;
}
.quarantine-first {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  img {
    width: 15%;
    margin-right: 15px;
    flex-shrink: 0;
    margin-bottom: 15px;
  }
}
.quarantine-Top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  line-height: 40px;
  margin-bottom: 10px;
  p {
    font-size: 18px;
    font-weight: bold;
  }
  span {
    font-size: 14px;
    color: #485966;
    span {
      color: red;
    }
  }
}
.quarantine-line {
  width: 100%;
  height: 1px;
  background-color: #e8e8e8;
  margin: 0 auto;
  margin-bottom: 20px;
}
.quarantine-line1 {
  width: 100%;
  height: 1px;
  background-color: #e8e8e8;
  margin: 0 auto;
  margin-bottom: 10px;
  margin-top: 20px;
}
.quarantine-xq {
  margin-top: 15px;
  font-size: 18px;
  display: flex;
  align-items: center;
  span {
    height: 20px;
    width: 5px;
    display: inline-block;
    background-color: blue;
    margin-right: 5px;
  }
}
.quarantine-xq1 {
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;
  padding: 0 7px;
  .quarantine-xq2 {
    display: flex;
    justify-content: space-between;
    width: 25%;
    p:nth-of-type(1) {
      width: 50%;
      text-align: right;
    }
    p:nth-of-type(2) {
      width: 40%;
      // text-align: right;
    }
  }
}
.img-wrap {
  height: calc(100% - 50px);
  overflow: auto;
  p {
    line-height: 30px;
    text-align: center;
  }
  .el-col {
    margin-bottom: 26px;
  }
}
</style>
