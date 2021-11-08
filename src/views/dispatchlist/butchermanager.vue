<template>
  <div ref="main" class="dashboard-container">
    <!-- 查询 -->
    <div ref="search" class="search-wrap">
      <el-form :inline="true" :model="formSearch" class="demo-form-inline">
        <el-form-item label="">
          <el-input
            v-model="formSearch.butcherCode"
            placeholder="请输入屠宰单编号"
          />
        </el-form-item>
        <el-form-item label="">
          <el-date-picker
            v-model="formSearch.date"
            type="daterange"
            format="yyyy - MM - dd "
            value-format="yyyy-MM-dd"
            start-placeholder="生成开始日期"
            end-placeholder="生成结束日期"
            style="width: 100%"
          />
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
            v-has="'butcherOrderMana:query'"
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
        </el-form-item>
      </el-form>
      <div class="line-s" />
    </div>
    <!-- 列表操作 -->
    <div ref="action" class="action-wrap">
      <div>
        <el-button
          v-has="'butcherOrderMana:add'"
          type="primary"
          @click="setListFun"
        >屠宰单配置</el-button>
      </div>
      <el-button
        v-has="'butcherOrderMana:export'"
        type="primary"
        @click="exPort"
      >导出</el-button>
    </div>
    <TableWrap>
      <el-table
        height="100%"
        :data="tableData"
        border
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="100" />
        <el-table-column
          prop="butcherCode"
          label="屠宰单编号"
          min-width="30%"
        />
        <el-table-column prop="createdTime" label="生成日期" min-width="30%" />
        <el-table-column
          prop="branchName"
          label="所属网点"
          :show-overflow-tooltip="true"
        />
        <el-table-column prop="order" label="操作" min-width="30%">
          <template slot-scope="scope">
            <span
              v-has="'butcherOrderMana:detail'"
              class="ac-text"
              @click="getDetails(scope.row)"
            >详情</span>
            <span
              v-has="'butcherOrderMana:edit'"
              class="ac-text"
              @click="eidtItem(scope.row)"
            >编辑</span>
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

    <el-dialog
      :title="title"
      destroy-on-close
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
      width="800px"
    >
      <el-button
        v-if="title !== '屠宰单详情'"
        type="primary"
        class="mrb15 fr"
        style="margin-top:15px;margin-bottom:15px"
        size="mini"
        @click="toAdd"
      >新增</el-button>
      <div
        v-if="title === '屠宰单详情'"
        style="margin-top:15px;margin-bottom:15px"
      />
      <el-form
        ref="formUp"
        :model="{}"
        :class="[title === '屠宰单详情' ? 'disabled-from' : '']"
        :disabled="title === '屠宰单详情'"
      >
        <el-table
          :data="addList"
          tooltip-effect="dark"
          border
          style="width: 100%"
          center
          size="mini"
        >
          <el-table-column label="序号" min-width="10%">
            <template slot-scope="scope">
              {{ scope.$index + 1 }}
            </template>
          </el-table-column>
          <el-table-column prop="codeName" label="市场名称" min-width="20%">
            <template slot-scope="scope">
              <el-select
                v-model="scope.row.marckerId"
                filterable
                size="mini"
                placeholder="市场名称"
                :disabled="ismarckerId"
                @change="setTablelList($event, scope.$index)"
              >
                <el-option
                  v-for="item in marktList"
                  :key="item.index"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </template>
          </el-table-column>
          <el-table-column
            prop="marcketCode"
            label="市场编号"
            min-width="20%"
          />
          <el-table-column prop="butcherTime" label="屠宰时间" min-width="30%">
            <template slot-scope="scope">
              <el-date-picker
                v-model="scope.row.butcherTime"
                type="datetime"
                size="mini"
                style="width:100%"
                placeholder="选择日期时间"
                default-time="22:00:00"
                :clearable="false"
                value-format="yyyy-MM-dd HH:mm:ss"
              />
            </template>
          </el-table-column>
          <el-table-column
            v-if="title !== '屠宰单详情'"
            prop="businessAddress"
            label="操作"
            min-width="20%"
          >
            <template slot-scope="scope">
              <span
                class="ac-text"
                @click="delAddList(scope.$index)"
              >删除</span>
            </template>
          </el-table-column>
        </el-table>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit('formUp')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from '@/components/pagination'
import TableWrap from '@/components/TableWrap'
import {
  postQueryButcherOrderByRequest,
  postAddOrUpdateButcherOrder,
  postButcherOrderDetail,
  gettExportButcherOrder,
  postDropDownMarcket
} from '@/api/dispatch'
import _ from 'lodash'
import { branchDropDown } from '@/utils/mixin'
export default {
  components: {
    Pagination,
    TableWrap
  },
  mixins: [branchDropDown],
  data() {
    return {
      title: '新增屠宰单',
      defaultDate:
        new Date().getFullYear() +
        '-' +
        (new Date().getMonth() + 1) +
        '-' +
        new Date().getDate() +
        ' 22:00:00',
      addList: [{}],
      ruleForm: {},
      dialogFormVisible: false,
      formLabelWidth: '150px',
      total: 200,
      formSearch: {
        butcherCode: '',
        date: ''
      },
      orderId: '',
      listLoading: true,
      TableHeight: '300px',
      listQuery: {
        page: 1,
        limit: 10
      },
      tableData: [],
      marktList: [], // 市场列表
      multipleSelection: [], // 选中的data
      ismarckerId: false
    }
  },
  mounted() {
    this.getList()
    this.getMarktList()
  },

  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    setTablelList(data, index) {
      const item = this.marktList.filter(v => v.id === data)
      this.addList[index].marcketCode = item[0].code
      this.addList[index].marckerId = data
    },
    // 获取市场列表
    getMarktList() {
      postDropDownMarcket({}).then(res => {
        this.marktList = res.result
      })
    },
    exPort: _.debounce(function() {
      const createdTimeEnd =
        (this.formSearch.date && this.formSearch.date[1]) || ''
      const createdTimeStart =
        (this.formSearch.date && this.formSearch.date[0]) || ''
      const butcherOrderIds = this.multipleSelection.map(v => v.id).join(',')
      window.location.href = gettExportButcherOrder(
        `butcherCode=${this.formSearch.butcherCode}&createdTimeStart=${createdTimeStart}&createdTimeEnd=${createdTimeEnd}&butcherOrderIds=${butcherOrderIds}&branchId=${this.formSearch.branchId}`
      )
    }, 500),
    // 提交配置屠宰单
    submit(formName) {
      const _this = this
      this.$refs[formName].validate(valid => {
        if (valid) {
          debugger
          if (!_this.addList.length) {
            this.$message.warning('至少填写一条数据')
            return false
          }
          let index = 0
          const emptyItem = _this.addList.filter((v, i) => {
            if (!v.marckerId) {
              index = i
              return v
            }
          })
          if (emptyItem.length) {
            this.$message.error(`请选择第${index + 1}条屠宰单市场名称`)
            return false
          }

          if (this.title === '屠宰单详情') {
          } else {
            postAddOrUpdateButcherOrder({
              id: this.orderId,
              marckets: this.addList
            }).then(res => {
              if (this.title === '屠宰单详情') {
              } else {
                this.$message.success('配置成功')
              }
              this.getList()
            })
          }
          this.dialogFormVisible = false
        } else {
          return false
        }
      })
    },
    toAdd() {
      this.ismarckerId = false
      this.addList.push({ butcherTime: '' })
    },
    delAddList(val) {
      this.addList.splice(val, 1)
    },
    reset() {
      this.formSearch.butcherCode = ''
      this.formSearch.date = ''
      this.getList()
    },
    // 新增屠宰单
    setListFun() {
      this.ismarckerId = false

      this.title = '新增屠宰单'
      this.orderId = ''
      this.dialogFormVisible = true
      this.addList = []
      this.addList.push({ butcherTime: '' })
    },
    submitForm() {
      var createdTimeStart = ''
      var createdTimeEnd = ''
      if (this.formSearch.date) {
        createdTimeEnd = this.formSearch.date[1]
        createdTimeStart = this.formSearch.date[0]
      } else {
        createdTimeEnd = ''
        createdTimeStart = ''
      }
      postQueryButcherOrderByRequest({
        branchId: this.formSearch.branchId,
        butcherCode: this.formSearch.butcherCode,
        createdTimeEnd: createdTimeEnd,
        createdTimeStart: createdTimeStart,
        pageNum: 1,
        pageSize: 10
      }).then(res => {
        this.tableData = res.result.list
        this.total = res.result.total
        this.listQuery = {
          page: 1,
          limit: 10
        }
      })
    },
    resetForm() {
      for (const key in this.formSearch) {
        this.formSearch[key] = ''
      }
      this.formSearch.branchId = localStorage.getItem('userTypeSW') === '0' ? '' : localStorage.getItem('nowbranchDropDown')
      this.submitForm()
    },
    getList() {
      var createdTimeStart = ''
      var createdTimeEnd = ''
      if (this.formSearch.date) {
        createdTimeEnd = this.formSearch.date[1]
        createdTimeStart = this.formSearch.date[0]
      } else {
        createdTimeEnd = ''
        createdTimeStart = ''
      }
      postQueryButcherOrderByRequest({
        branchId: this.formSearch.branchId,
        butcherCode: this.formSearch.butcherCode,
        createdTimeEnd: createdTimeEnd,
        createdTimeStart: createdTimeStart,
        pageNum: this.listQuery.page,
        pageSize: this.listQuery.limit
      }).then(res => {
        this.tableData = res.result.list
        this.total = res.result.total
      })

      // setTimeout(() => {
      //   this.listLoading = false
      // }, 1000)
    },
    getDetails(e) {
      this.ismarckerId = true

      this.title = '屠宰单详情'
      postButcherOrderDetail(e.id).then(res => {
        this.addList = res.result
      })
      this.dialogFormVisible = true
    },
    eidtItem(e) {
      this.title = '编辑屠宰单'
      this.ismarckerId = false

      this.orderId = e.id
      postButcherOrderDetail(e.id).then(res => {
        this.addList = res.result
      })
      this.dialogFormVisible = true
    }
  }
}
</script>
