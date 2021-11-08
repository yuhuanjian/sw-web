<template>
  <div ref="main" class="dashboard-container">
    <div ref="search" class="search-wrap">
      <el-form :inline="true" :model="formSearch" class="demo-form-inline">
        <el-form-item label="">
          <el-input
            v-model.trim="formSearch.userCode"
            placeholder="请输入员工编号"
          />
        </el-form-item>
        <el-form-item label="">
          <el-input
            v-model.trim="formSearch.userName"
            placeholder="请输入姓名"
          />
        </el-form-item>
        <el-form-item label="">
          <el-input
            v-model.trim="formSearch.mobileNo"
            placeholder="请输入手机号码"
          />
        </el-form-item>
        <el-form-item label="">
          <el-select v-model="formSearch.roleIds" placeholder="请选择角色">
            <el-option
              v-for="item in roleList"
              :key="item.id"
              :label="item.roleName"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="">
          <el-select v-model="formSearch.status" placeholder="请选择账号状态">
            <el-option label="启用" :value="1" />
            <el-option label="停用" :value="2" />
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
            v-has="'usersMana:query'"
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
          v-has="'usersMana:add'"
          type="primary"
          icon="el-icon-plus"
          @click="addWholes('ruleForm')"
        >新增员工</el-button>
      </div>
      <div>
        <el-button
          v-has="'usersMana:export'"
          type="primary"
          icon="el-icon-upload2"
          @click="exportWholesalers"
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
      >
        <el-table-column type="index" label="序号" width="55" />
        <el-table-column
          prop="userCode"
          label="员工编号"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <p class="p-blue">
              {{ scope.row.userCode }}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          prop="userName"
          label="姓名"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <p class="p-blue">
              {{ scope.row.userName }}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          prop="branchName"
          label="所属网点"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <p class="p-blue">
              {{ scope.row.branchName }}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          prop="roleName"
          label="角色"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="mobileNo"
          label="手机"
          :show-overflow-tooltip="true"
        />

        <el-table-column
          prop="status"
          label="账号状态"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <p :class="scope.row.status === 1 ? 'green' : 'red'">
              <span /> {{ scope.row.status === 1 ? '启用' : '停用' }}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          prop="createdTime"
          label="添加时间"
          width="200px"
          :show-overflow-tooltip="true"
        />
        <el-table-column fixed="right" label="操作" width="300">
          <template slot-scope="scope">
            <el-button
              v-has="'usersMana:startOrStopUsing'"
              type="text"
              size="small"
              @click="changeUserStatus(scope.row)"
            >{{ scope.row.status === 1 ? '停用员工' : '启用员工' }}</el-button>
            <el-button
              v-has="'usersMana:resetPassword'"
              type="text"
              size="small"
              @click="restPassWord(scope.row)"
            >重置密码</el-button>
            <el-button
              v-has="'usersMana:edit'"
              type="text"
              size="small"
              @click="updata(scope.row)"
            >编辑</el-button>
            <el-button
              v-has="'usersMana:viewPermissions'"
              type="text"
              size="small"
              @click="lookRoot(scope.row)"
            >查看权限</el-button>
            <el-button
              v-has="'usersMana:delete'"
              type="text"
              size="small"
              @click="deleteUser(scope.row)"
            >删除</el-button>
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
    <change-user
      ref="changeUserStatus"
      :user-status="userStatus"
      :change-data="changeData"
    />
    <el-dialog
      :title="titleUser"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
      width="750px"
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
            label="用户姓名:"
            :label-width="formLabelWidth"
            prop="userName"
          >
            <el-input
              v-model.trim="ruleForm.userName"
              autocomplete="off"
              placeholder="请输入用户姓名"
            />
          </el-form-item>
          <el-form-item
            label="手机号码:"
            :label-width="formLabelWidth"
            prop="mobileNo"
          >
            <el-input
              v-model.trim="ruleForm.mobileNo"
              autocomplete="off"
              placeholder="请输入手机号码"
            />
          </el-form-item>
          <el-form-item
            label="登录账号:"
            :label-width="formLabelWidth"
            prop="loginName"
          >
            <el-input
              v-model.trim="ruleForm.loginName"
              autocomplete="off"
              placeholder="请输入登录账号"
            />
          </el-form-item>
          <el-form-item
            label="登录密码:"
            :label-width="formLabelWidth"
            prop="loginPwd"
          >
            <el-input
              v-if="titleUser === '编辑员工'"
              v-model.trim="ruleForm.loginPwd"
              type="password"
              auto-complete="new-password"
              placeholder="请输入登录密码"
              @focus="restPWD"
            />
            <el-input
              v-if="titleUser === '新增员工'"
              v-model.trim="ruleForm.loginPwd"
              auto-complete="new-password"
              placeholder="请输入登录密码"
              @focus="restPWD"
            />
          </el-form-item>
          <el-form-item
            label="网点机构:"
            :label-width="formLabelWidth"
            prop="branchId"
          >
            <el-select v-model="ruleForm.branchId" filterable :disabled="isshowBtn!=='0'" placeholder="请选择网点机构" @change="changeBranch">
              <el-option
                v-for="item in branchListA"
                :key="item.id"
                :label="item.branchName"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item
            label="当前角色:"
            :label-width="formLabelWidth"
            prop="roleIds"
          >
            <el-cascader
              v-model="ruleForm.roleIds"
              style="width: 100%"
              :options="options"
              :props="{ multiple: true, checkStrictly: true }"
              filterable
            />
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
import _ from 'lodash'
import userAdmin from '@/api/userAdmin'
const Base64 = require('js-base64').Base64
import { branchDropDown } from '@/utils/mixin'
import changeUser from '@/views/user/component/changeUser'
export default {
  name: 'Admin',
  components: {
    Pagination,
    TableWrap,
    changeUser
  },
  mixins: [branchDropDown],
  data() {
    var checkPhone = (rule, value, callback) => {
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
    var checks20 = (rule, value, callback) => {
      if (value) {
        if (/^.{2,20}$/.test(value)) {
          callback()
        } else {
          return callback(new Error('请填写2-20位的文本'))
        }
      } else {
        callback()
      }
    }
    var checkLoginName = (rule, value, callback) => {
      if (value) {
        if (/^[_,.%?!]{5,20}$/.test(value)) {
          return callback(
            new Error(
              '登录账号必须为5至20位字母、数字或特殊符号组合，且不能全为特殊符号'
            )
          )
        } else {
          if (/^[0-9a-zA-Z_,.%?!]{5,20}$/.test(value)) {
            callback()
          } else {
            return callback(
              new Error(
                '登录账号必须为5至20位字母、数字或特殊符号组合，且不能全为特殊符号'
              )
            )
          }
        }
      } else {
        callback()
      }
    }
    var checksPWD = (rule, value, callback) => {
      if (value) {
        if (/^[_,.%?!]{6,20}$/.test(value)) {
          return callback(
            new Error(
              '填写6-20位数的密码，可包含字母、数字、特殊符号,且不能全为特殊符号'
            )
          )
        } else {
          if (/^[0-9a-zA-Z_,.%?!]{6,20}$/.test(value)) {
            callback()
          } else {
            return callback(
              new Error('填写6-20位数的密码，可包含字母、数字、特殊符号')
            )
          }
        }
      } else {
        callback()
      }
    }
    return {
      formSearch: {
        userCode: '',
        userName: '',
        roleIds: '',
        mobileNo: '',
        status: ''
      },
      total: 200,
      rules: {
        userName: [
          { required: true, message: '请输入用户姓名', trigger: 'change' },
          { validator: checks20, trigger: 'change' }
        ],
        mobileNo: [
          { required: true, message: '请输入手机号码', trigger: 'change' },
          { validator: checkPhone, trigger: 'change' }
        ],
        loginName: [
          { required: true, message: '请输入登录账号', trigger: 'change' },
          { validator: checkLoginName, trigger: 'change' }
        ],
        loginPwd: [
          { required: true, message: '请输入登录密码', trigger: 'change' },
          { validator: checksPWD, trigger: 'change' }
        ],
        roleIds: [
          { required: true, message: '请选择当前角色', trigger: 'change' }
        ],
        branchId: [
          { required: true, message: '请选择网点机构', trigger: 'change' }
        ]
      },
      listQuery: {
        page: 1,
        limit: 10
      },
      formLabelWidth: '120px',
      dialogFormVisible: false,
      ruleForm: {
        loginName: '',
        loginPwd: '',
        mobileNo: '',
        roleIds: [],
        userName: '',
        branchId: localStorage.getItem('nowbranchDropDown')
      },
      tableData: [],
      innerVisible: false,
      titleUser: '',
      roleList: [],
      options: [],
      changeData: {},
      userStatus: ''
    }
  },
  async created() {
    userAdmin.postdropDownrole().then(res => {
      this.roleList = res.result
    })
    this.getList()
  },
  methods: {
    restPWD() {
      if (this.titleUser === '编辑员工') {
        this.ruleForm.loginPwd = ''
      } else {
      }
    },
    // 停用禁用员工
    changeUserStatus(obj) {
      obj.status === 1
        ? (this.userStatus = '停用员工')
        : (this.userStatus = '启用员工')
      obj.status === 1
        ? (this.$refs.changeUserStatus.colorIcon = 'color:red !important')
        : (this.$refs.changeUserStatus.colorIcon = 'color:#20e064 !important')

      this.changeData = {
        flag: obj.status === 1 ? 2 : 1,
        id: obj.id,
        message: obj.status === 1 ? '停用当前选中员工？' : '启用当前选中员工？'
      }
      this.$refs.changeUserStatus.innerVisible = true
    },
    // 重置密码
    restPassWord(obj) {
      this.userStatus = '重置密码'
      this.$refs.changeUserStatus.colorIcon = 'color:red !important'
      this.changeData = {
        flag: 3,
        id: obj.id,
        message: '重置当前选中员工的账号密码？'
      }
      this.$refs.changeUserStatus.innerVisible = true
    },
    // 编辑
    updata(obj) {
      this.options = []
      this.roleList.forEach(v => {
        this.options.push({
          label: v.roleName,
          value: v.id
        })
      })
      this.titleUser = '编辑员工'
      this.dialogFormVisible = true
      this.ruleForm = obj
      this.ruleForm.roleIds = obj.roleIds.map(v => [v])
      // this.ruleForm.loginPwd = '110000'
      this.$set(this.ruleForm, 'loginPwd', '110000')
    },
    // 查看权限
    lookRoot(obj) {
      localStorage.setItem('usersId', obj.id)
      this.$router.push({
        path: 'lookRoot',
        query: {
          id: obj.id
        }
      })
    },
    // 删除
    deleteUser(obj) {
      this.userStatus = '删除员工'
      this.$refs.changeUserStatus.colorIcon = 'color:red !important'
      this.changeData = {
        flag: 4,
        id: obj.id,
        message: '删除当前选中员工？'
      }
      this.$refs.changeUserStatus.innerVisible = true
    },
    // 导出
    exportWholesalers: _.debounce(function() {
      window.location.href = userAdmin.getuserexportUsers(
        `userCode=${this.formSearch.userCode}&userName=${this.formSearch.userName}&mobileNo=${this.formSearch.mobileNo}&status=${this.formSearch.status}&roleIds=${this.formSearch.roleIds}&branchId=${this.formSearch.branchId}`
      )
    }, 500),
    // 新增
    addWholes(formName) {
      this.titleUser = '新增员工'
      this.ruleForm = {
        loginName: '',
        loginPwd: '123456',
        mobileNo: '',
        roleIds: [],
        userName: '',
        branchId: localStorage.getItem('nowbranchDropDown')
      }

      this.options = []
      this.roleList.forEach(v => {
        this.options.push({
          label: v.roleName,
          value: v.id
        })
      })
      this.$refs[formName] && this.$refs[formName].resetFields()
      this.dialogFormVisible = true
    },
    cancle() {
      this.innerVisible = false
    },

    reset() {
      for (const key in this.formSearch) {
        this.formSearch[key] = ''
      }
      this.formSearch.branchId = localStorage.getItem('userTypeSW') === '0' ? '' : localStorage.getItem('nowbranchDropDown')
      this.inquire()
    },
    // 查询批发商
    inquire(formSearch) {
      const data = {
        ...this.formSearch,
        pageNum: 1,
        pageSize: 10,
        roleIds: this.formSearch.roleIds === '' ? [] : [this.formSearch.roleIds]
      }
      userAdmin.postqueryUsersByRequest(data).then(res => {
        this.tableData = res.result.list
        this.total = res.result.total
        this.listQuery = {
          page: 1,
          limit: 10
        }
      })
    },
    handleClick(row) {
      this.dialogFormVisible = true
      this.titleUser = '编辑'
      this.ruleForm.name = row.name
      this.ruleForm.contactName = row.contactName
      this.ruleForm.tel = row.tel
      this.ruleForm.address = row.address
      this.ruleForm.status = row.status
      this.ruleForm.id = row.id
    },
    // 新增和编辑
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const passWord = Base64.encode(this.ruleForm.loginPwd)
          var roleIdsArr = []
          this.ruleForm.roleIds.forEach(v => {
            roleIdsArr.push(v[0])
          })
          var pwd = ''
          if (this.ruleForm.loginPwd === '110000') {
            pwd = ''
          } else {
            pwd = this.ruleForm.loginPwd
          }
          const data = {
            id: this.ruleForm.id === '' ? null : this.ruleForm.id,
            loginName: this.ruleForm.loginName,
            loginPwd: pwd === '' ? '' : passWord,
            mobileNo: this.ruleForm.mobileNo,
            roleIds: roleIdsArr,
            userName: this.ruleForm.userName,
            branchId: this.ruleForm.branchId
          }
          userAdmin.postaddOrUpdateUser(data).then(res => {
            if (res.code === 10500) {
            } else {
              if (this.titleUser === '新增员工') {
                this.$message.success('新增成功')
              } else {
                this.$message.success('编辑成功')
              }
              this.dialogFormVisible = false
              this.reset()
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
    getList() {
      const data = {
        ...this.formSearch,
        pageNum: this.listQuery.page,
        pageSize: this.listQuery.limit,
        roleIds: this.formSearch.roleIds === '' ? [] : [this.formSearch.roleIds]
      }
      userAdmin.postqueryUsersByRequest(data).then(res => {
        this.tableData = res.result.list
        this.total = res.result.total
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
}
.diver-t {
  margin-top: 25px;
  /deep/.el-form-item {
    margin: auto;
    width: 80%;
    margin-bottom: 22px;
  }
  /deep/.el-form-item__error {
    // left: 18px;
  }
  /deep/.el-form-item__label {
    // margin-right: 15px;
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
