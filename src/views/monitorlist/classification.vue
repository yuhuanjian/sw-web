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
    <div ref="search" class="search-wrap">
      <el-form :inline="true" :model="formSearch" class="demo-form-inline">
        <el-form-item label="">
          <el-input
            v-model.trim="formSearch.name"
            placeholder="请输入分类名称"
          />
        </el-form-item>
        <el-form-item label="">
          <el-select v-model="formSearch.status" placeholder="分组状态">
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
            v-has="'monitorType:query'"
            type="primary"
            icon="el-icon-search"
            @click="submitForm('formSearch')"
          >查询</el-button>
          <el-button
            type="primary"
            plain
            icon="el-icon-refresh"
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
          v-has="'monitorType:upload'"
          type="primary"
          icon="el-icon-plus"
          @click="add('formUp')"
        >新增</el-button>
        <el-button
          v-has="'monitorType:delete'"
          icon="el-icon-delete"
          :disabled="multipleSelection.length === 0 ? true : false"
          plain
          @click="deleteData('formUp')"
        >删除</el-button>
      </div>
      <div />
    </div>
    <TableWrap>
      <el-table
        ref="tableFrom"
        height="100%"
        :data="tableData"
        border
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column
          prop="name"
          label="分组名称"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="createdTime"
          label="创建时间"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="status"
          label="状态"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <p
              :class="
                scope.row.status === 1 ? 'root-status-s' : 'root-status-r'
              "
            >
              <span />
              {{ scope.row.status === 1 ? '启用' : '停用' }}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          prop="branchName"
          label="所属网点"
          :show-overflow-tooltip="true"
        />
        <el-table-column fixed="right" label="操作" min-width="120">
          <template slot-scope="scope">
            <span
              v-has="'monitorType:detail'"
              class="ac-text"
              @click="getDetails(scope.row)"
            >详情</span>
            <span
              v-has="'monitorType:edit'"
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
      :title="titleType ? '新增分类' : '编辑分类'"
      destroy-on-close
      :close-on-click-modal="false"
      :visible.sync="dialogFormVisible"
      width="600px"
      :before-close="handleClose"
    >
      <el-form
        ref="formUp"
        :model="formUp"
        :rules="formRule"
        style="margin-top:20px"
      >
        <el-form-item
          label="分类名称"
          :label-width="formLabelWidth"
          prop="name"
        >
          <el-input
            v-model="formUp.name"
            placeholder="请输入分类名称"
            style="width:300px;"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth" prop="status">
          <el-radio-group v-model="formUp.status">
            <el-radio :label="1">启用</el-radio>
            <el-radio :label="2">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancle">取 消</el-button>
        <el-button type="primary" @click="submit('formUp')">保 存</el-button>
      </div>
    </el-dialog>
    <deletes ref="delete" :ids-arr="idsArr" />
    <delete-no ref="deleteNo" />
  </div>
</template>

<script>
import Pagination from '@/components/pagination'
import TableWrap from '@/components/TableWrap'
import monitorRecord from '@/api/monitorRecord'
import deletes from '@/views/monitorlist/component/delete'
import deleteNo from '@/views/monitorlist/component/deleteNo'
import { branchDropDown } from '@/utils/mixin'
export default {
  components: {
    Pagination,
    TableWrap,
    deletes,
    deleteNo
  },
  mixins: [branchDropDown],
  data() {
    var check20 = (rule, value, callback) => {
      if (value) {
        if (/^.{1,20}$/.test(value)) {
          callback()
        } else {
          return callback(new Error('请填写1-20位的文本'))
        }
      } else {
        callback()
      }
    }
    return {
      formUp: {
        name: '',
        status: null,
        id: null
      },
      dialogFormVisible: false,
      formLabelWidth: '150px',
      formRule: {
        name: [
          { required: true, message: '请输入分类名称', trigger: 'change' },
          { validator: check20, trigger: 'change' }
        ],
        status: [{ required: true, message: '请选择状态', trigger: 'change' }]
      },
      total: 200,
      formSearch: {
        name: '',
        status: null
      },
      listLoading: true,
      TableHeight: '300px',
      listQuery: {
        page: 1,
        limit: 10
      },
      tableData: [],
      titleType: true,
      idsArr: [],
      multipleSelection: []
    }
  },
  mounted() {
    this.getList()
  },

  methods: {
    add(formName) {
      this.formUp = {
        name: '',
        status: 1,
        id: null
      }
      this.$refs[formName] && this.$refs[formName].resetFields()
      this.dialogFormVisible = true
    },
    deleteData() {
      this.idsArr = this.multipleSelection.map(v => v.id)
      this.$refs.delete.title = '分类'
      const isDel = this.multipleSelection.map(v => v.haveAnyRecord)
      const isDelto = isDel.every(v => v === 0)
      if (isDelto) {
        this.$refs.delete.innerVisible = true
      } else {
        this.$refs.deleteNo.innerVisible = true
      }
    },
    deleteFunction() {
      const data = {
        ids: this.idsArr
      }
      monitorRecord.postmonitorRecorddeleteMonitorType(data).then(res => {
        this.$message.success(res.result)
        this.handleClose()
        this.resetForm()
      })
    },
    handleClose() {
      this.dialogFormVisible = false
      this.$refs.delete.innerVisible = false
      this.$refs.tableFrom.clearSelection()
    },
    // 选择删除
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    submit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          monitorRecord
            .postmonitorRecordaddMonitorType(this.formUp)
            .then(res => {
              this.$message.success(res.result)
              this.dialogFormVisible = false
              this.resetForm()
            })
        } else {
          return false
        }
      })
    },
    cancle() {
      this.handleClose()
    },
    reset() {
      this.formUp = {
        name: '',
        type: '',
        orderId: '',
        fileUrl: ''
      }
    },
    submitForm() {
      const data = {
        ...this.formSearch,
        pageNum: 1,
        pageSize: 10
      }
      monitorRecord.postmonitorRecordqueryMonitorType(data).then(res => {
        this.tableData = res.result.list
        this.$nextTick(() => {
          this.total = res.result.total
        })
        this.listQuery = {
          page: 1,
          limit: 10
        }
      })
    },
    resetForm() {
      this.formSearch = {
        name: '',
        status: null,
        branchId: localStorage.getItem('userTypeSW') === '0' ? '' : localStorage.getItem('nowbranchDropDown')
      }

      this.submitForm()
    },
    getList() {
      const data = {
        ...this.formSearch,
        pageNum: this.listQuery.page,
        pageSize: this.listQuery.limit
      }
      monitorRecord.postmonitorRecordqueryMonitorType(data).then(res => {
        this.tableData = res.result.list
        this.$nextTick(() => {
          this.total = res.result.total
        })
      })
    },
    getDetails(obj) {
      localStorage.setItem('monitId', obj.id)
      this.$router.push({
        path: '/monitor/monitorlist/classDetails',
        query: {
          monitId: obj.id
        }
      })
    },
    // 编辑
    eidtItem(obj) {
      this.formUp.name = obj.name
      this.formUp.status = obj.status
      this.formUp.id = obj.id
      this.titleType = false
      this.dialogFormVisible = true
    }
  }
}
</script>

<style lang="scss" scoped></style>
