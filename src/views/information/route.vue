<template>
  <div ref="main" class="dashboard-container">
    <div ref="search" class="search-wrap">
      <el-form :inline="true" :model="formSearch" class="demo-form-inline">
        <el-form-item label="">
          <el-input v-model="formSearch.code" placeholder="请输入路由编号" />
        </el-form-item>
        <el-form-item label="">
          <el-input v-model="formSearch.name" placeholder="请输入路由名称" />
        </el-form-item>
        <el-form-item label="">
          <el-select v-model="formSearch.status" placeholder="请选择路由状态">
            <el-option label="启用" value="1" />
            <el-option label="停用" value="2" />
          </el-select>
        </el-form-item>
        <el-form-item label="">
          <el-select v-model="formSearch.branchId" filterable :disabled="isshowBtn!=='0'" placeholder="请选择网点机构" @change="changeBranch">
            <el-option
              v-for="item in branchList"
              :key="item.id"
              :label="item.branchName"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button
            v-has="'routeMana:query'"
            type="primary"
            icon="el-icon-search"
            @click="inquire(formSearch)"
          >查询</el-button>
          <el-button
            type="primary"
            icon="el-icon-refresh"
            plain
            @click="reset"
          >重置</el-button>
        </el-form-item>
      </el-form>
      <div class="line-s" />
    </div>

    <div ref="action" class="action-wrap">
      <div>
        <el-button
          v-has="'routeMana:add'"
          type="primary"
          icon="el-icon-plus"
          @click="add('ruleForm')"
        >新增</el-button>
        <el-button
          v-has="'routeMana:delete'"
          type="primary"
          plain
          icon="el-icon-delete-solid"
          :disabled="routeIds.length > 0 ? false : true"
          @click="innerVisible = true"
        >删除</el-button>
      </div>
      <div>
        <el-button
          v-has="'routeMana:export'"
          type="primary"
          icon="el-icon-upload2"
          @click="exportExecl"
        >导出</el-button>
      </div>
    </div>
    <TableWrap>
      <el-table
        :data="tableData"
        border
        stripe
        style="width: 100%"
        height="100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column
          prop="code"
          label="路由编号"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <p class="p-blue">
              {{ scope.row.code }}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="路由名称"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <p class="p-blue">
              {{ scope.row.name }}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          prop="routeOrder"
          label="排序值"
          :show-overflow-tooltip="true"
        />
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <p :class="scope.row.status === 1 ? 'green' : 'red'">
              <span /> {{ scope.row.status === 1 ? '启用' : '停用' }}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          prop="createdTime"
          label="创建时间"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="branchName"
          label="所属网点"
          :show-overflow-tooltip="true"
        />
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="detail(scope.row)"
            >详情</el-button>
            <el-button
              v-has="'routeMana:edit'"
              type="text"
              size="small"
              @click="handleClick(scope.row)"
            >编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination
        v-show="total > 0"
        :total="total"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.limit"
        @pagination="getList"
      />
    </TableWrap>
    <!-- 详情和编辑 -->
    <el-dialog
      width="600px"
      title="删除"
      :visible.sync="innerVisible"
      :close-on-click-modal="false"
      append-to-body
    >
      <div class="access-Dialog">
        <i class="el-icon-warning" />
        <p>是否确定删除当前选中路由？</p>
      </div>
      <div class="quarantine-line" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancle">取 消</el-button>
        <el-button type="primary" @click="sureNo">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      :title="addtype === 1 ? '新增' : addtype === 2 ? '编辑' : '详情'"
      :close-on-click-modal="false"
      :visible.sync="dialogFormVisible"
      width="1000px"
    >
      <div class="diver-t">
        <el-form
          ref="ruleForm"
          :model="ruleForm"
          :rules="rules"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item
            label="路由名称:"
            :label-width="formLabelWidth"
            prop="name"
          >
            <el-input
              v-model="ruleForm.name"
              width="160px"
              placeholder="请输入路由名称"
              @input="change($event)"
            />
          </el-form-item>

          <el-form-item
            label="排序值:"
            :label-width="formLabelWidth"
            prop="routeOrder"
          >
            <el-input
              v-model="ruleForm.routeOrder"
              width="160px"
              placeholder="请输入排序值"
              @input="change($event)"
            />
          </el-form-item>
          <el-form-item
            label="状态:"
            prop="status"
            :label-width="formLabelWidth"
          >
            <el-radio-group v-model="ruleForm.status">
              <el-radio :label="1">启用</el-radio>
              <el-radio :label="2">停用</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </div>
      <div
        v-if="addtype !== 3"
        class="cont-btn"
        style="width: 100%; text-align: right; margin-bottom: 20px"
      >
        <el-button type="primary" @click="addForm()">新增</el-button>
      </div>
      <div class="detailinfo-wrap">
        <el-table
          :data="detailsData"
          tooltip-effect="dark"
          border
          height="350px"
          style="width: 100%; overflow: auto"
          center
          size="mini"
        >
          <el-table-column
            prop="merchantCode"
            width="180"
            :show-overflow-tooltip="true"
          >
            <template slot="header" slot-scope="scope">
              <p><span style="color:red;margin-right:5px">*</span>商户代号</p>
            </template>
            <template slot-scope="scope">
              <el-select
                v-model="scope.row.merchantCode"
                filterable
                :disabled="isSeletion"
                clearable
                @change="handleCommand($event, scope.$index)"
                @focus="clickCmerchantCode(scope.$index)"
              >
                <el-option
                  v-for="(item, index) in restaurants"
                  :key="index"
                  :label="item.merchantCode"
                  :value="JSON.stringify(item)"
                  :index="index"
                />
                <span slot="empty">
                  <p style=" text-align: center;line-height: 50px;">
                    {{ titleMessage }}
                  </p>
                </span>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column
            prop="merchantNum"
            label="商户编号"
            width="180"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            prop="merchantName"
            label="商户名称"
            width="180"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            prop="type"
            label="商户类型"
            width="180"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              {{
                scope.row.type === 1
                  ? '大客户'
                  : scope.row.type === 2
                    ? '散户'
                    : ''
              }}
            </template>
          </el-table-column>
          <el-table-column
            prop="address"
            label="商户地址"
            :show-overflow-tooltip="true"
          />
          <el-table-column v-if="addtype !== 3" fixed="right" label="操作">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click="delinfo(scope.row)"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="resetForm('ruleForm')">取 消</el-button>
        <el-button
          v-if="addtype !== 3"
          type="primary"
          @click="submitForm('ruleForm')"
        >保存</el-button>
        <el-button
          v-if="addtype === 3"
          type="primary"
          @click="resetForm('ruleForm')"
        >确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import TableWrap from '@/components/TableWrap'
import Pagination from '@/components/pagination'
import {
  postSelectRoutesByRequest,
  postAddOrUpdateRoute,
  postDelRoute,
  postRouteDetail,
  postDropDownMerchant,
  postexportRoutesByRequest
} from '@/api/merchant'
import orderApi from '@/api/orderApi'
import _ from 'lodash'
import { branchDropDown } from '@/utils/mixin'
export default {
  name: 'Admin',
  components: {
    Pagination,
    TableWrap
  },
  mixins: [branchDropDown],
  data() {
    var checksname = (rule, value, callback) => {
      if (/^[0-9a-zA-Z\u4e00-\u9fa5]{1,20}$/.test(value)) {
        callback()
      } else {
        return callback(new Error('请输入1-20位字母、数字或文本'))
      }
    }
    var checksrouteOrder = (rule, value, callback) => {
      if (/^[0-9]{1,4}$/.test(value)) {
        callback()
      } else {
        return callback(new Error('请输入1-4位的数字'))
      }
    }
    return {
      formSearch: {
        code: '',
        name: '',
        status: ''
      },
      addtype: '',
      total: 200,
      rules: {
        name: [
          { required: true, message: '请输入路由名称', trigger: 'blur' },
          { validator: checksname, trigger: 'change' }
        ],
        routeOrder: [
          { required: true, message: '请输入排序值', trigger: 'blur' },
          { validator: checksrouteOrder, trigger: 'change' }
        ],
        status: [{ required: true, message: '请选择状态', trigger: 'change' }]
      },
      listQuery: {
        page: 1,
        limit: 10
      },
      routeIds: [], // 选中数据id
      merchantList: [], // 商户列表
      merchantNumList: [], // 商户编号列表
      merchantCodeList: [], // 商户代号列表列表
      resourceData: '',
      formLabelWidth: '120px',
      dialogFormVisible: false,
      ruleForm: {
        name: '',
        routeOrder: '',
        status: ''
      },
      tableData: [],
      orderNumber: '2020121515',
      newtableData: [],
      oldtableData: [],
      innerVisible: false,
      detailsData: [],
      isSeletion: false,

      restaurants: [],
      titleMessage: '',
      istrue: true
    }
  },
  created() {
    this.getList()

    // this.DownMerchant()
  },

  methods: {
    clickCmerchantCode(idx) {
      if (this.restaurants.length === 1) {
        if (this.restaurants[0].merchantCode == '') {
          this.restaurants = []
          this.titleMessage = '无匹配数据'
          return
        }
      }
      if (this.restaurants.length === 0) {
        this.restaurants = []
      } else {
        this.restaurants = this.merchantCodeList

        this.detailsData.forEach((v, i) => {
          this.restaurants = this.restaurants.filter(
            o => o.merchantCode != v.merchantCode
          )
        })
        this.merchantCodeList.forEach(v => {
          if (this.detailsData[idx].merchantCode === v.merchantCode) {
            this.restaurants.unshift(v)
          }
        })
        if (this.restaurants.length) {
          this.restaurants = this.uniqueArray(this.restaurants, 'merchantCode')
        }
        this.$forceUpdate()
      }

      if (this.restaurants.length > 0) {
        this.titleMessage = ''
      } else {
        this.titleMessage = '无匹配数据'
      }
    },
    handleCommand(val, idx) {
      val = JSON.parse(val)
      this.detailsData.splice(idx, 1, val)
    },
    // 导出

    exportExecl: _.debounce(function() {
      window.location.href = postexportRoutesByRequest(
        `name=${this.formSearch.name}&code=${this.formSearch.code}&status=${this.formSearch.status}&branchId=${this.formSearch.branchId}`
      )
    }, 500),
    // 获取商户下拉  商户代号  商户编号
    DownMerchant() {
      postDropDownMerchant({}).then(res => {
        this.restaurants = res.result
        this.merchantCodeList = res.result
      })
    },

    // 解决input无法输入情况
    change(e) {
      this.$forceUpdate()
    },
    cancle() {
      this.innerVisible = false
    },

    // 获取选中数据id列表
    handleSelectionChange(val) {
      this.routeIds = val.map(x => {
        return x.id
      })
    },
    // 确认删除所选路由
    sureNo() {
      this.innerVisible = false
      postDelRoute({
        routeIds: this.routeIds
      }).then(res => {
        this.$message.success('删除成功')
        this.getList()
      })
    },
    search(val, key) {
      this.newtableData = []
      if (this.timer) {
        clearTimeout(this.timer)
      }
      this.timer = setTimeout(() => {
        this.tableData = this.oldtableData
        this.tableData.forEach(item => {
          if (item[key].indexOf(val) > -1) {
            this.newtableData.push(item)
          }
        })
        this.tableData = this.newtableData
      }, 200)
    },
    // 重置
    reset() {
      for (const key in this.formSearch) {
        this.formSearch[key] = ''
      }
      this.formSearch.branchId = localStorage.getItem('userTypeSW') === '0' ? '' : localStorage.getItem('nowbranchDropDown')
      this.inquire()
    },
    // 查询
    inquire(formSearch) {
      postSelectRoutesByRequest({
        ...this.formSearch,
        pageNum: 1,
        pageSize: 10
      }).then(res => {
        this.total = Number(res.result.total)
        if (res.result.list) {
          this.tableData = res.result.list
        } else {
          this.tableData = []
        }
        this.listQuery = {
          page: 1,
          limit: 10
        }
      })
    },
    // 新增
    add(formName) {
      this.istrue = true
      orderApi.postdroprouteMerchantDropDown().then(res => {
        this.restaurants = res.result
        this.merchantCodeList = res.result
      })
      this.isSeletion = false
      this.addtype = 1
      this.dialogFormVisible = true
      this.ruleForm = {
        name: '',
        routeOrder: '',
        status: ''
      }
      this.detailsData = []
      this.detailsData.push({
        address: '',
        merchantCode: '',
        merchantId: '',
        merchantName: '',
        merchantNum: '',
        tel: '',
        type: ''
      })
      this.$refs[formName] && this.$refs[formName].resetFields()
      this.ruleForm.status = 1
    },
    // 新增-新增
    addForm() {
      this.detailsData.push({
        address: '',
        merchantCode: '',
        merchantId: '',
        merchantName: '',
        merchantNum: '',
        tel: '',
        type: ''
      })
    },
    // 列表删除数据
    delinfo(val) {
      if (this.istrue) {
        this.restaurants = [...this.detailsData]
        this.istrue = false
      } else {
      }
      this.detailsData.splice(this.detailsData.indexOf(val), 1)
      this.restaurants = [...this.restaurants, ...this.merchantCodeList]
      this.merchantCodeList = this.restaurants
      this.restaurants = this.uniqueArray(this.restaurants, 'merchantCode')

      this.detailsData.forEach((v, i) => {
        this.restaurants = this.restaurants.filter(
          o => o.merchantCode != v.merchantCode
        )
      })
    },
    uniqueArray(array, key) {
      var result = [array[0]]
      for (var i = 1; i < array.length; i++) {
        var item = array[i]
        var repeat = false
        for (var j = 0; j < result.length; j++) {
          if (item[key] == result[j][key]) {
            repeat = true
            break
          }
        }
        if (!repeat) {
          result.push(item)
        }
      }
      return result
    },
    // 详情
    detail(row) {
      this.addtype = 3
      this.isSeletion = true
      postRouteDetail(row.id).then(res => {
        this.detailsData = res.result.merchants
      })
      this.ruleForm.name = row.name
      this.ruleForm.routeOrder = row.routeOrder
      this.ruleForm.status = row.status

      this.dialogFormVisible = true
    },

    // 编辑
    handleClick(row) {
      this.istrue = true

      this.addtype = 2
      this.isSeletion = false
      postRouteDetail(row.id).then(res => {
        orderApi.postdroprouteMerchantDropDown().then(res => {
          this.restaurants = res.result
          this.merchantCodeList = res.result
          this.dialogFormVisible = true
          this.restaurants = this.merchantCodeList
          this.detailsData.forEach((v, i) => {
            this.restaurants = this.restaurants.filter(
              o => o.merchantCode != v.merchantCode
            )
          })
        })
        this.detailsData = res.result.merchants
      })
      this.ruleForm.name = row.name
      this.ruleForm.routeOrder = row.routeOrder
      this.ruleForm.status = row.status
      this.ruleForm.id = row.id
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const isSure = this.detailsData.every(v => v.merchantCode != '')
          if (isSure) {
            var merchantIdsarr = this.detailsData.map(v => v.merchantId)
            postAddOrUpdateRoute({
              ...this.ruleForm,
              merchantIds: merchantIdsarr
            }).then(res => {
              this.$message.success('保存成功')
              this.formSearch.name = ''
              this.formSearch.code = ''
              this.formSearch.status = ''
              this.getList()
              this.dialogFormVisible = false

              this.detailsData = []
            })
          } else {
            this.$message.error('商户代号不能为空')
          }
        } else {
          return false
        }
      })
    },
    resetForm(formName) {
      this.dialogFormVisible = false
      this.$refs[formName] && this.$refs[formName].resetFields()
      this.detailsData = []
    },
    getList() {
      postSelectRoutesByRequest({
        ...this.formSearch,
        pageNum: this.listQuery.page,
        pageSize: this.listQuery.limit
      }).then(res => {
        this.total = Number(res.result.total)

        if (res.result.list) {
          this.tableData = res.result.list
        } else {
          this.tableData = []
        }
      })
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
.diver-t {
  margin-top: 25px;
  /deep/.el-form-item {
    margin: auto;
    width: 80%;
    margin-bottom: 22px;
  }
  /deep/.el-form-item__error {
    left: 18px;
  }
  /deep/.el-form-item__label {
    margin-right: 15px;
  }
  /deep/.el-input {
    width: 90% !important;
  }
}
/deep/.el-table .el-table__fixed-header-wrapper .has-gutter tr {
  background-color: #67c23a !important;
}
/deep/.el-table-column--selection {
  /deep/.cell {
    text-align: center;
  }
}
/deep/.el-dialog .el-dialog__footer {
  padding-bottom: 15px;
}
.search-wrap {
  /deep/.el-input {
    width: 200px !important;
    margin-right: 15px;
  }
}

.quarantine-line {
  width: 100%;
  height: 1px;
  background-color: #e8e8e8;
  margin: 0 auto;
  margin-bottom: 5px;
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
.quarantine-top {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}
.quarantine-topbo {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.quarantine-cen1 {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
}
/deep/.el-table td,
.el-table th {
  padding: 9px 0;
  min-width: 0;
  box-sizing: border-box;
  text-overflow: ellipsis;
  vertical-align: middle;
  position: relative;
  text-align: left;
}
/deep/.el-dialog__header {
  // background-color: #d9e0df;
  padding: 15px 20px 10px;
}
/deep/.el-dialog__body {
  padding: 0px 30px;
}

/deep/.el-select {
  width: 100%;
}

.from-bottom {
  position: absolute;
  bottom: 0;
  right: 30px;
}
.detailinfo-wrap {
  max-height: 500px;
  width: 100%;
  overflow-y: auto;
}
.router-info {
  display: flex;
  margin: 8px 0;
  p {
    margin-right: 20px;
    padding-left: 10px;
    color: $bc;
  }
}
.btn-wrap {
  display: flex;
  justify-content: flex-end;
  button {
    margin: 10px;
  }
}
.l14 {
  margin: 10px 0;
}
.car-from {
  .el-select .el-input.is-disabled .el-input__inner {
  }
}
.demo-ruleForm {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>
