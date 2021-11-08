<template>
  <div ref="main" class="dashboard-container detail-con">
    <!-- <div class="quarantine-Top">
      <p>检疫管理</p>
      <span><span>*</span>为必填项</span>
    </div> -->
    <div ref="search">
      <headerxq title="检疫详情" routepush="access" :header-list="headerList" />
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
        <el-tab-pane label="异常详情" name="second" style="height:100%">
          <el-table
            :data="dataTables3"
            border
            style="width: 100%"
            height="82%"
            stripe
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
    <!-- <div class="accss-bottom">
      <el-button type="primary" @click="goback">返回</el-button>
    </div> -->
  </div>
</template>

<script>
import TableWrap from '@/components/TableWrap'
import headerxq from './components/headerxq'
import Pagination from '@/components/pagination'
import {
  postAllowEntQuarQueryFileByOrderId,
  postQuarantinequeryAbnormalInfo
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
      total: 200,
      listQuery: {
        page: 1,
        limit: 10
      },
      imgList: [],
      dataTables3: [],
      listTab: [
        {
          title: '非洲猪瘟抽样检测',
          name: 'first'
        },
        {
          title: '异常详情',
          name: 'second'
        }
      ],
      activeName: 'first',
      orderNumber: '2020121515',
      farm: '小猪猪安乐养殖场',
      shipper: '黑犀牛',
      wholesale: 'xxx批发商',
      enterData: '2020-12-22 17:15:15',
      enterNumber: 50,
      abnormalNumber: 5,
      prepareNumber: 45,
      quantityNumber: 45,
      status: '准出检疫-通过',
      ladingNumber: '202012010231',
      orderPlate: '粤XPS060',
      headerList: {},
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
    this.getList()
  },
  methods: {
    handleClick(tab, event) {},
    getList() {
      postQuarantinequeryAbnormalInfo({
        orderId: this.detailsMessage.id,
        quarType: 1,
        pageNum: this.listQuery.page,
        pageSize: this.listQuery.limit
      }).then(res => {
        this.$nextTick(() => {
          this.total = res.result.total
        })
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
.accss-bottom {
  width: 100%;
  text-align: center;
  /deep/.el-button {
    margin: 0 auto;
  }
}
.topmarg {
  margin-top: 20px;
}
.img-wrap {
  height: calc(100% - 50px);
  overflow: auto;
  p {
    line-height: 30px;
    text-align: center;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .el-col {
    margin-bottom: 26px;
  }
}
/deep/.el-tabs__content {
  height: 550px;
}
.quarantine-tabtitle {
  width: 100%;
  text-align: center;
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
  font-size: 16px;
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
</style>
