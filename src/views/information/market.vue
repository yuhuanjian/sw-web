<template>
  <div ref="main" class="dashboard-container">
    <div ref="search" class="search-wrap">
      <el-form
        ref="formSearch"
        :inline="true"
        :model="formSearch"
        class="demo-form-inline"
      >
        <el-form-item label="" prop="code">
          <el-input v-model="formSearch.code" placeholder="请输入市场编号" />
        </el-form-item>
        <el-form-item label="" prop="name">
          <el-input v-model="formSearch.name" placeholder="请输入市场名称" />
        </el-form-item>

        <el-form-item label="" prop="status">
          <el-select v-model="formSearch.status" placeholder="请选择市场状态">
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
            v-has="'marcketMana:query'"
            type="primary"
            icon="el-icon-search"
            @click="inquire('formSearch')"
          >查询</el-button>
          <el-button
            type="primary"
            icon="el-icon-refresh"
            plain
            @click="reset('formSearch')"
          >重置</el-button>
        </el-form-item>
      </el-form>
      <div class="line-s" />
    </div>

    <div ref="action" class="action-wrap">
      <div>
        <el-button
          v-has="'marcketMana:add'"
          type="primary"
          icon="el-icon-plus"
          @click="add()"
        >新增</el-button>
        <el-button
          v-has="'marcketMana:delete'"
          type="primary"
          :disabled="SelectionList.length > 0 ? false : true"
          plain
          icon="el-icon-delete-solid"
          @click="innerVisible = true"
        >删除</el-button>
      </div>
      <div>
        <el-button
          v-has="'marcketMana:export'"
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
          label="市场编号"
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
          label="市场名称"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <p class="p-blue">
              {{ scope.row.name }}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          prop="address"
          label="市场地址"
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
              v-has="'marcketMana:edit'"
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
    <el-dialog
      width="600px"
      title="删除"
      :close-on-click-modal="false"
      :visible.sync="innerVisible"
      append-to-body
    >
      <div class="access-Dialog">
        <i class="el-icon-warning" />
        <p>是否确定删除当前选中市场？</p>
      </div>
      <div class="quarantine-line" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancle">取 消</el-button>
        <el-button type="primary" @click="sureNo">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      :title="addtype === 1 ? '新增' : '编辑'"
      :close-on-click-modal="false"
      :visible.sync="dialogFormVisible"
      width="35%"
    >
      <div class="diver-t">
        <el-form
          ref="ruleForm"
          :model="ruleForm"
          :rules="rules"
          label-width="200px"
          class="demo-ruleForm"
        >
          <el-form-item
            label="市场名称:"
            :label-width="formLabelWidth"
            prop="name"
          >
            <el-input
              v-model="ruleForm.name"
              autocomplete="off"
              placeholder="请输入市场名称"
            />
          </el-form-item>

          <el-form-item
            label="市场地址:"
            :label-width="formLabelWidth"
            prop="address"
          >
            <el-input
              v-model="ruleForm.address"
              autocomplete="off"
              placeholder="请输入市场地址"
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
      <div class="quarantine-line" />
      <span slot="footer" class="dialog-footer">
        <el-button
          @click="
            resetForm('ruleForm')
            dialogFormVisible = false
          "
        >取 消</el-button>
        <el-button
          type="primary"
          @click="submitForm('ruleForm')"
        >保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import TableWrap from '@/components/TableWrap'
import Pagination from '@/components/pagination'
import {
  postQueryMarcketByRequest,
  postAddOrUpdateMarcket,
  postDeleteMarcket,
  postExportMarckets
} from '@/api/merchant'
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
    var checksZhong = (rule, value, callback) => {
      if (value) {
        if (/^[\u4e00-\u9fa5]{2,20}$/.test(value)) {
          callback()
        } else {
          return callback(new Error('请填写2-20位的中文'))
        }
      } else {
        callback()
      }
    }
    var checksnum = (rule, value, callback) => {
      if (value) {
        if (/^[0-9a-zA-Z\u4e00-\u9fa5]{2,20}$/.test(value)) {
          callback()
        } else {
          return callback(new Error('请填写2-20位的中文、字母和数字'))
        }
      } else {
        callback()
      }
    }
    var checkpickupDriverPhone = (rule, value, callback) => {
      if (value) {
        if (/^[1][0-9]{10}$/.test(value)) {
          callback()
        } else {
          return callback(new Error('请输入11位的数字，首位为1'))
        }
      } else {
        callback()
      }
    }
    var checkaddress = (rule, value, callback) => {
      if (value) {
        if (/^[\u4e00-\u9fa5]{2,50}$/.test(value)) {
          callback()
        } else {
          return callback(new Error('请填写2-50位的中文'))
        }
      } else {
        callback()
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
      id: 1, // 选中数据的id
      rules: {
        name: [
          { required: true, message: '请输入市场名称', trigger: 'change' },
          { validator: checksZhong, trigger: 'change' }
        ],
        address: [
          { required: false, message: '请输入市场地址', trigger: 'change' },
          { validator: checkaddress, trigger: 'change' }
        ],
        status: [{ required: true, message: '请选择状态', trigger: 'change' }]
      },
      listQuery: {
        page: 1,
        limit: 10
      },
      resourceData: '',
      formLabelWidth: '120px',
      dialogFormVisible: false,
      ruleForm: {
        name: '',
        address: '',
        status: '',
        id: ''
      },
      tableData: [],
      orderNumber: '2020121515',
      newtableData: [],
      oldtableData: [],
      innerVisible: false,
      SelectionList: []
    }
  },
  created() {
    this.getList()
    // this.oldtableData = this.tableData
  },

  methods: {
    // 多选框
    handleSelectionChange(val) {
      this.SelectionList = val
    },
    cancle() {
      this.innerVisible = false
    },
    sureNo() {
      var dataArr = []
      this.SelectionList.forEach(v => {
        dataArr.push(v.id)
      })
      postDeleteMarcket(dataArr).then(res => {
        this.innerVisible = false
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
    reset(formName) {
      for (const key in this.formSearch) {
        this.formSearch[key] = ''
      }
      this.formSearch.branchId = localStorage.getItem('userTypeSW') === '0' ? '' : localStorage.getItem('nowbranchDropDown')
      this.resetForm(formName)
      this.inquire()
    },
    inquire(formSearch) {
      postQueryMarcketByRequest({
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
    add() {
      this.addtype = 1
      this.dialogFormVisible = true
      this.ruleForm = {
        name: '',
        address: '',
        status: '',
        id: ''
      }
      this.resetForm('ruleForm')
      this.ruleForm.status = 1
    },
    // 编辑
    handleClick(row) {
      this.addtype = 2

      this.dialogFormVisible = true
      this.ruleForm.name = row.name
      this.ruleForm.address = row.address
      this.ruleForm.status = row.status
      this.ruleForm.id = row.id
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          postAddOrUpdateMarcket({
            ...this.ruleForm
          }).then(res => {
            if (res.result) {
              this.$message.success('保存成功')
              for (const key in this.formSearch) {
                this.formSearch[key] = ''
              }
              this.getList()
              this.dialogFormVisible = false
            } else {
              this.$message.error('市场名称已存在')
            }
          })
        } else {
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName] && this.$refs[formName].resetFields()
    },
    getList() {
      postQueryMarcketByRequest({
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
    },
    // 导出

    exportExecl: _.debounce(function() {
      window.location.href = postExportMarckets(
        `name=${this.formSearch.name}&code=${this.formSearch.code}&status=${this.formSearch.status}&branchId=${this.formSearch.branchId}`
      )
    }, 500)
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
    width: 95% !important;
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
</style>
