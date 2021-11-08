<template>
  <div ref="main" class="dashboard-container">
    <div ref="search" class="search-wrap">
      <el-form :inline="true" :model="formSearch" class="demo-form-inline">
        <el-form-item label="">
          <el-input
            v-model.trim="formSearch.roleName"
            placeholder="请输入角色名称"
          />
        </el-form-item>
        <el-form-item label="">
          <el-select v-model="formSearch.status" placeholder="请选择角色状态">
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
            v-has="'roleMana:query'"
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
          v-has="'roleMana:add'"
          type="primary"
          icon="el-icon-plus"
          @click="add('ruleForm')"
        >新增角色</el-button>
      </div>
      <div>
        <el-button
          type="primary"
          icon="el-icon-upload2"
          @click="exportRole"
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
          prop="roleName"
          label="角色名称"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <p class="p-blue">
              {{ scope.row.roleName }}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          prop="rolerCount"
          label="成员数量"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <p class="p-blue">
              {{ scope.row.rolerCount }}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          prop="status"
          label="角色状态"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <p :class="scope.row.status === 1 ? 'green' : 'red'">
              <span /> {{ scope.row.status === 1 ? '启用' : '停用' }}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          prop="lastOperatedTime"
          label="更新时间"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="branchName"
          label="所属网点"
          :show-overflow-tooltip="true"
        />
        <el-table-column fixed="right" label="操作" width="350">
          <template slot-scope="scope">
            <el-button
              v-has="'roleMana:addUsers'"
              type="text"
              size="small"
              @click="addUser(scope.row)"
            >添加用户</el-button>
            <el-button
              v-has="'roleMana:edit'"
              type="text"
              size="small"
              @click="updata(scope.row)"
            >编辑角色</el-button>
            <el-button
              v-has="'roleMana:setPermissions'"
              type="text"
              size="small"
              @click="lookRoot(scope.row)"
            >设置权限</el-button>
            <el-button
              v-has="'roleMana:startOrStopUsing'"
              type="text"
              size="small"
              @click="changeUserStatus(scope.row)"
            >{{ scope.row.status === 1 ? '停用角色' : '启用角色' }}</el-button>
            <el-button
              v-has="'roleMana:delete'"
              type="text"
              size="small"
              @click="deleteUser(scope.row)"
            >删除角色</el-button>
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
    <!-- 新增编辑 -->
    <add-role ref="addRole" :title="title" :data-addrole="AddroleData" />
    <!-- 停用禁用删除弹框 -->
    <change-user-status
      ref="changeUserStatus"
      :user-status="userStatus"
      :change-data="changeData"
    />
    <!-- 添加用户 -->
    <el-dialog
      width="600px"
      title="添加用户"
      :close-on-click-modal="false"
      :visible.sync="innerVisible"
      append-to-body
    >
      <el-form
        ref="ruleForm"
        :model="dataUser"
        :rules="rules"
        label-width="200px"
        class="demo-ruleForm"
        style="margin-top:50px;margin-bottom:50px"
      >
        <el-form-item
          label="角色名称:"
          :label-width="formLabelWidth"
          prop="roleName"
        >
          <el-input
            v-model.trim="dataUser.roleName"
            autocomplete="off"
            disabled
            placeholder="请输入角色名称"
          />
        </el-form-item>
        <el-form-item
          label="添加员工:"
          :label-width="formLabelWidth"
          prop="userName"
        >
          <el-cascader
            v-model="dataUser.userName"
            style="width: 100%"
            :options="options"
            :props="{ multiple: true, checkStrictly: true }"
            filterable
          />
        </el-form-item>
      </el-form>
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
import addRole from '@/views/user/component/addRole'
import changeUserStatus from '@/views/user/component/changeUserStatus'
import { branchDropDown } from '@/utils/mixin'
export default {
  name: 'Admin',
  components: {
    Pagination,
    TableWrap,
    addRole,
    changeUserStatus
  },
  mixins: [branchDropDown],
  data() {
    var checksshipper = (rule, value, callback) => {
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
    var checkLoginName = (rule, value, callback) => {
      if (value) {
        if (
          /^(?![\d]+$)(?![a-zA-Z]+$)(?![!#$%^&*]+$)[\da-zA-Z!#$%^&*]{6,20}$/.test(
            value
          )
        ) {
          callback()
        } else {
          return callback(
            new Error(
              '登录账号必须为5至20位字母、数字或特殊符号组合，且不能全为特殊符号'
            )
          )
        }
      } else {
        callback()
      }
    }
    return {
      formSearch: {
        roleName: '',
        status: ''
      },
      total: 200,
      rules: {},
      listQuery: {
        page: 1,
        limit: 10
      },
      dialogFormVisible: false,
      ruleForm: {},
      tableData: [],
      innerVisible: false,
      title: '',
      AddroleData: {},
      userStatus: '',
      changeData: {},
      dataUser: {},
      formLabelWidth: '120px',
      options: []
    }
  },
  created() {
    this.getList()
  },
  methods: {
    // 添加用户保存
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const data = {
            id: this.dataUser.id,
            userIds: this.flatten(this.dataUser.userName)
          }
          userAdmin.postAddUserw(data).then(res => {
            this.innerVisible = false
            this.$message.success('添加成功')
            this.reset()
          })
        } else {
          return false
        }
      })
    },
    // 降维
    flatten(arr) {
      return [].concat(
        ...arr.map(x => (Array.isArray(x) ? this.flatten(x) : x))
      )
    },
    resetForm() {
      this.innerVisible = false
    },
    // 停用角色
    changeUserStatus(obj) {
      obj.status === 1
        ? (this.userStatus = '停用角色')
        : (this.userStatus = '启用角色')
      obj.status === 1
        ? (this.$refs.changeUserStatus.colorIcon = 'color:red !important')
        : (this.$refs.changeUserStatus.colorIcon = 'color:#20e064 !important')
      this.changeData = {
        flag: obj.status === 1 ? 2 : 1,
        id: obj.id,
        message: obj.status === 1 ? '停用当前选中角色？' : '启用当前选中角色？'
      }
      this.$refs.changeUserStatus.innerVisible = true
    },
    // 添加用户
    addUser(obj) {
      userAdmin.postOpenAddRoleUserWindow(obj.id).then(res => {
        this.dataUser = res.result
        this.options = []
        if (res.result.addedUsers) {
          const data = []
          res.result.addedUsers.forEach(v => {
            data.push([v.userId])
          })
          this.dataUser.userName = data
        }
        // this.dataUser.userName
        if (res.result.toAddUsers) {
          res.result.toAddUsers.forEach(v => {
            this.options.push({
              label: v.userCode + v.userName,
              value: v.userId
            })
          })
        }
        this.innerVisible = true
      })
    },
    // 编辑角色
    updata(obj) {
      this.title = '编辑角色'
      this.AddroleData = {
        id: obj.id,
        roleName: obj.roleName
      }
      this.$refs.addRole.innerVisible = true
    },
    // 设置权限
    lookRoot(obj) {
      localStorage.setItem('roleId', obj.id)
      this.$router.push({
        path: 'setRoot',
        query: {
          id: obj.id,
          roleName: obj.roleName
        }
      })
    },
    // 删除角色
    deleteUser(obj) {
      if (Number(obj.rolerCount) > 0) {
        this.$message.error('角色无法删除')
        return
      }
      this.userStatus = '删除角色'
      this.$refs.changeUserStatus.colorIcon = 'color:red !important'
      this.changeData = {
        flag: 3,
        id: obj.id,
        message: '删除当前选中角色？'
      }
      this.$refs.changeUserStatus.innerVisible = true
    },
    // 导出
    exportRole: _.debounce(function() {
      window.location.href = userAdmin.getuserexportRoleListByRequest(
        `roleName=${this.formSearch.roleName}&status=${this.formSearch.status}&branchId=${this.formSearch.branchId}`
      )
    }, 500),
    // 新增角色
    add(formName) {
      this.title = '新增角色'
      this.AddroleData = {
        id: '',
        roleName: ''
      }
      this.ruleForm = {
        userName: ''
      }
      this.$refs.addRole.reset('ruleForm')
      this.$refs.addRole.innerVisible = true
    },
    reset() {
      for (const key in this.formSearch) {
        this.formSearch[key] = ''
      }
      this.formSearch.branchId = localStorage.getItem('userTypeSW') === '0' ? '' : localStorage.getItem('nowbranchDropDown')

      this.getList()
    },
    // 查询
    inquire(formSearch) {
      const data = {
        pageNum: 1,
        pageSize: 10,
        roleName: this.formSearch.roleName,
        branchId: this.formSearch.branchId,
        status:
          this.formSearch.status === '' ? null : Number(this.formSearch.status)
      }
      userAdmin.postrolequeryRoleListByRequest(data).then(res => {
        this.tableData = res.result.list
        this.total = res.result.total
        this.listQuery = {
          page: 1,
          limit: 10
        }
      })
    },
    getList() {
      const data = {
        pageNum: this.listQuery.page,
        pageSize: this.listQuery.limit,
        roleName: this.formSearch.roleName,
        branchId: this.formSearch.branchId,
        status:
          this.formSearch.status === '' ? null : Number(this.formSearch.status)
      }
      userAdmin.postrolequeryRoleListByRequest(data).then(res => {
        this.tableData = res.result.list
        this.total = res.result.total
      })
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/.el-dialog .el-dialog__footer {
  padding-bottom: 15px;
}
.search-wrap {
  /deep/.el-input {
    width: 200px !important;
    margin-right: 15px;
  }
}

/deep/.el-select {
  width: 100%;
}
</style>
