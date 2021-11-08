<template>
  <div ref="main" class="dashboard-container">
    <div ref="search" class="search-wrap">
      <el-form :inline="true" :model="formSearch" class="demo-form-inline">
        <el-form-item label="">
          <el-input v-model="formSearch.num" placeholder="请输入商户编号" />
        </el-form-item>
        <el-form-item label="">
          <el-input v-model="formSearch.name" placeholder="请输入商户名称" />
        </el-form-item>
        <el-form-item label="">
          <el-input v-model="formSearch.code" placeholder="请输入商户代号" />
        </el-form-item>
        <el-form-item label="">
          <el-input v-model="formSearch.tel" placeholder="请输入联系方式" />
        </el-form-item>
        <el-form-item label="">
          <el-select v-model="formSearch.type" placeholder="请选择商户类型">
            <el-option label="大客户" value="1" />
            <el-option label="散户" value="2" />
          </el-select>
        </el-form-item>
        <el-form-item label="">
          <el-select v-model="formSearch.status" placeholder="请选择商户状态">
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
            v-has="'merchantMana:query'"
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
          v-has="'merchantMana:add'"
          type="primary"
          icon="el-icon-plus"
          @click="add('ruleForm')"
        >新增</el-button>
        <el-button
          v-has="'merchantMana:delete'"
          type="primary"
          plain
          icon="el-icon-delete-solid"
          :disabled="SelectionList.length > 0 ? false : true"
          @click="innerVisible = true"
        >删除</el-button>
      </div>
      <div>
        <el-button
          v-has="'merchantMana:export'"
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
          prop="num"
          label="商户编号"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="code"
          label="商户代号"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="name"
          label="商户名称"
          :show-overflow-tooltip="true"
        />
        <el-table-column prop="type" label="商户类型">
          <template slot-scope="scope">
            <p>{{ scope.row.type === 1 ? '大客户' : '散户' }}</p>
          </template>
        </el-table-column>
        <el-table-column
          prop="tel"
          label="联系方式"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="address"
          label="商户地址"
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
          width="160"
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
              v-has="'merchantMana:edit'"
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
      :visible.sync="innerVisible"
      :close-on-click-modal="false"
      append-to-body
    >
      <div class="access-Dialog">
        <i class="el-icon-warning" />
        <p>是否确定删除当前选中商户？</p>
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
      width="700px"
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
            label="商户编号:"
            :label-width="formLabelWidth"
            prop="num"
          >
            <el-input
              v-model="ruleForm.num"
              autocomplete="off"
              placeholder="请输入商户编号"
            />
          </el-form-item>
          <el-form-item
            label="商户名称:"
            :label-width="formLabelWidth"
            prop="name"
          >
            <el-input
              v-model="ruleForm.name"
              autocomplete="off"
              placeholder="请输入商户名称"
            />
          </el-form-item>
          <el-form-item
            label="商户代号:"
            :label-width="formLabelWidth"
            prop="code"
          >
            <el-input
              v-model="ruleForm.code"
              autocomplete="off"
              placeholder="请输入商户代号"
            />
          </el-form-item>
          <el-form-item
            label="商户类型:"
            :label-width="formLabelWidth"
            prop="type"
          >
            <el-select v-model="ruleForm.type" placeholder="请选择商户类型">
              <el-option label="大客户" :value="1" />
              <el-option label="散户" :value="2" />
            </el-select>
          </el-form-item>
          <el-form-item
            label="联系方式:"
            :label-width="formLabelWidth"
            prop="tel"
          >
            <el-input
              v-model="ruleForm.tel"
              autocomplete="off"
              placeholder="请输入联系方式"
            />
          </el-form-item>
          <el-form-item
            label="商户地址:"
            :label-width="formLabelWidth"
            prop="address"
          >
            <el-input
              v-model="ruleForm.address"
              autocomplete="off"
              placeholder="请输入商户地址"
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
        <el-button @click="resetForm('ruleForm')">取 消</el-button>
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
  postMerchantQueryMerchantListWithPage,
  postMerchantSaveOrUpdate,
  postMerchantDeleteMerchant,
  postMerchantExportMarchants
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
        if (/^[0-9a-zA-Z\u4e00-\u9fa5]{1,20}$/.test(value)) {
          callback()
        } else {
          return callback(new Error('请填写1-20位的中文、字母和数字'))
        }
      } else {
        callback()
      }
    }
    var checksnum = (rule, value, callback) => {
      if (value) {
        if (/^[0-9a-zA-Z\u4e00-\u9fa5]{1,20}$/.test(value)) {
          callback()
        } else {
          return callback(new Error('请填写1-20位的中文、字母和数字'))
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
        if (/^[a-zA-Z0-9-\u4e00-\u9fa5]{2,50}$/.test(value)) {
          callback()
        } else {
          if (
            /^[a-zA-Z0-9-\u4e00-\u9fa5]{2,}$/.test(value) &&
            value.length > 50
          ) {
            return callback(new Error('地址长度为2至50位'))
          } else if (
            !/^[a-zA-Z0-9-\u4e00-\u9fa5]{2,}$/.test(value) &&
            value.length > 50
          ) {
            return callback(new Error('输入格式错误'))
          } else {
            return callback(new Error('输入格式错误'))
          }
        }
      } else {
        callback()
      }
    }
    var check4 = (rule, value, callback) => {
      if (/^[0-9a-zA-Z]{5}$/.test(value)) {
        callback()
      } else {
        return callback(new Error('商户编号长度为5位字母或数字'))
      }
    }
    return {
      formSearch: {
        num: '', // 商户编号
        name: '', // 商户名称
        code: '', // 商户代号
        tel: '', // 联系方式
        type: '', // 商户类型  1大客户 2散户
        status: '' // 状态： 1启用 2停用
      },
      addtype: '',
      total: 200,
      listQuery: {
        page: 1,
        limit: 10
      },
      id: 1, // 选中数据的id
      rules: {
        name: [
          { required: true, message: '请输入商户名称', trigger: 'change' },
          { validator: checksZhong, trigger: 'change' }
        ],

        code: [
          { required: true, message: '请输入商户代号', trigger: 'change' },
          { validator: checksnum, trigger: 'change' }
        ],

        type: [
          { required: true, message: '请选择商户类型', trigger: 'change' }
        ],
        num: [
          { required: true, message: '请输入商户编号', trigger: 'change' },
          { validator: check4, trigger: 'change' }
        ],
        address: [
          { required: true, message: '请输入商户地址', trigger: 'change' },
          { validator: checkaddress, trigger: 'change' }
        ],
        tel: [
          { required: true, message: '请输入联系方式', trigger: 'change' },
          { validator: checkpickupDriverPhone, trigger: 'change' }
        ],
        status: [{ required: true, message: '请选择状态', trigger: 'change' }]
      },
      resourceData: '',
      formLabelWidth: '120px',
      dialogFormVisible: false,
      ruleForm: {
        num: '', // 商户编号
        id: '', // 商户id
        address: '', // 商户地址
        name: '', // 商户名称
        code: '', // 商户代号
        tel: '', // 联系方式
        type: '', // 商户类型  1大客户 2散户
        status: '' // 状态： 1启用 2停用
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
    var tel = 1881039913
    tel = '' + tel
    var tel1 = tel.replace(tel.substring(3, 7), '****')
    if (this.$route.query.branchId || this.$route.query.branchId == '') {
      this.formSearch.branchId = this.$route.query.branchId
    }

    this.getList()
    this.oldtableData = this.tableData
  },

  methods: {
    // 多选框
    handleSelectionChange(val) {
      this.SelectionList = val
    },
    cancle() {
      this.innerVisible = false
    },
    // 删除
    sureNo() {
      var dataArr = []
      this.SelectionList.forEach(v => {
        dataArr.push(v.id)
      })
      postMerchantDeleteMerchant(dataArr).then(res => {
        this.$message.success('删除成功')
        this.innerVisible = false
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
    reset() {
      this.formSearch = {}
      this.formSearch.branchId = localStorage.getItem('userTypeSW') === '0' ? '' : localStorage.getItem('nowbranchDropDown')
      this.inquire()
    },
    inquire(formSearch) {
      postMerchantQueryMerchantListWithPage({
        ...this.formSearch,
        pageNum: 1,
        pageSize: 10
      }).then(res => {
        this.total = res.result.total

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
      this.addtype = 1
      this.dialogFormVisible = true
      this.ruleForm = {
        // num: '', // 商户编号
        id: '', // 商户id
        address: '', // 商户地址
        name: '', // 商户名称
        code: '', // 商户代号
        tel: '', // 联系方式
        type: '', // 商户类型  1大客户 2散户
        status: '' // 状态： 1启用 2停用
      }
      this.$refs[formName] && this.$refs[formName].resetFields()
      this.ruleForm.status = 1
    },

    // 编辑
    handleClick(row) {
      this.addtype = 2
      this.dialogFormVisible = true
      this.ruleForm.num = row.num
      this.ruleForm.name = row.name
      this.ruleForm.code = row.code
      this.ruleForm.tel = row.tel
      this.ruleForm.type = row.type
      this.ruleForm.address = row.address
      this.ruleForm.status = row.status
      this.ruleForm.id = row.id
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          postMerchantSaveOrUpdate({
            ...this.ruleForm,
            status: Number(this.ruleForm.status),
            type: Number(this.ruleForm.type)
          }).then(res => {
            if (res.result) {
              this.$message.success('保存成功')
              for (const key in this.formSearch) {
                this.formSearch[key] = ''
              }
              this.getList()
              this.dialogFormVisible = false
            } else {
              this.$message.error('商户代号已存在')
            }
          })
        } else {
          return false
        }
      })
    },
    resetForm(formName) {
      this.dialogFormVisible = false

      this.$refs[formName] && this.$refs[formName].resetFields()
    },
    // 获取数据列表
    getList() {
      postMerchantQueryMerchantListWithPage({
        ...this.formSearch,
        pageNum: this.listQuery.page,
        pageSize: this.listQuery.limit
      }).then(res => {
        this.total = res.result.total

        if (res.result.list) {
          this.tableData = res.result.list
        } else {
          this.tableData = []
        }
      })
    },
    // 导出

    exportExecl: _.debounce(function() {
      window.location.href = postMerchantExportMarchants(
        `num=${this.formSearch.num}&name=${this.formSearch.name}&code=${this.formSearch.code}&tel=${this.formSearch.tel}&type=${this.formSearch.type}&status=${this.formSearch.status}&branchId=${this.formSearch.branchId}`
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
  //   /deep/.el-form-item__error{
  //     left: 18px;
  //   }
  //   /deep/.el-form-item__label{
  //     margin-right: 15px;
  //   }
  //   /deep/.el-input{
  //     width: 98% !important;
  //   }
  //    /deep/.el-select .el-input{
  //     width: 98% !important;
  //   }
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
  //   padding: 0px 30px;
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
