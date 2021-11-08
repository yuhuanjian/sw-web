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
            placeholder="请输入资料名称"
          />
        </el-form-item>
        <el-form-item label="">
          <el-input
            v-model.trim="formSearch.orderId"
            placeholder="请输入订单编号"
          />
        </el-form-item>
        <el-form-item label="">
          <el-select v-model="formSearch.monitorTypeId" placeholder="所属分类">
            <el-option
              v-for="(item, index) in monitorTypeIdList"
              :key="index"
              :label="item.name"
              :value="item.id"
            />
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
            v-has="'monitoringLog:query'"
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
          v-has="'monitoringLog:upload'"
          type="primary"
          icon="el-icon-upload2"
          @click="uploadFun('formUp')"
        >
          上传</el-button>
        <el-button
          v-has="'monitoringLog:delete'"
          :disabled="multipleSelection.length === 0 ? true : false"
          icon="el-icon-delete"
          plain
          @click="delListFun"
        >删除</el-button>
      </div>
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
        <el-table-column prop="monitorCoverUrl" label="资料封面" width="200">
          <template slot-scope="scope">
            <div style="width:100%;text-align:center">
              <img
                style="width:150px;height:120px;"
                :src="scope.row.monitorCoverUrl"
                alt=""
              >
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="资料名称"
          width="180"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <p class="p-blue">
              {{ scope.row.name }}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          prop="uploadTime"
          label="上传时间"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="monitorTypeName"
          label="所属分类"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="branchName"
          label="所属网点"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="orderNum"
          label="关联订单编号"
          :show-overflow-tooltip="true"
        />
        <el-table-column prop="order" label="操作">
          <template slot-scope="scope">
            <el-button
              v-has="'monitoringLog:detail'"
              type="text"
              size="small"
              @click="toDetail(scope.row)"
            >详情</el-button>
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
      title="上传资料"
      destroy-on-close
      :close-on-click-modal="false"
      :visible.sync="dialogFormVisible"
      width="736px"
      :before-close="handleClose"
    >
      <el-form
        ref="formUp"
        :model="formUp"
        :rules="formRule"
        style="margin-top:20px"
      >
        <el-form-item
          label="资料名称"
          :label-width="formLabelWidth"
          prop="name"
        >
          <el-input
            v-model.trim="formUp.name"
            placeholder="请输入资料名称"
            style="width:300px;"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item
          label="所属分组"
          :label-width="formLabelWidth"
          prop="monitorTypeId"
        >
          <el-select
            v-model="formUp.monitorTypeId"
            placeholder="请选择资料类型"
            style="width:300px;"
          >
            <el-option
              v-for="(item, index) in monitorTypeIdList"
              :key="index"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="选择关联订单"
          prop="orderId"
          :label-width="formLabelWidth"
        >
          <el-select
            v-model="formUp.orderId"
            filterable
            style="width:300px;"
            placeholder="请选择关联订单"
          >
            <el-option
              v-for="item in orderIdList"
              :key="item.id"
              :label="item.orderNum"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          ref="uploadxls"
          label="选择文件"
          :label-width="formLabelWidth"
          prop="fileUrl"
        >
          <el-upload
            ref="uploadxls"
            class="avatar-uploader"
            action="/api/management-api/monitorRecord/uploadFile"
            :show-file-list="false"
            :before-remove="beforeRemove"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeuploadCoverUrl"
            :on-change="changeImage"
          >
            <img
              v-if="formUp.fileUrl"
              width="178"
              height="178"
              :src="formUp.fileUrl"
              class="avatar"
            >
            <i v-else class="el-icon-plus avatar-uploader-icon" />
            <div slot="tip" class="el-upload__tip">
              选择本地图片，图片支持jpg/png/jpeg格式，大小不超过10M
            </div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancle">取 消</el-button>
        <el-button type="primary" @click="submit('formUp')">保 存</el-button>
      </div>
    </el-dialog>
    <deletes ref="delete" :ids-arr="idsArr" />
    <ImageDetails ref="ImageDetails" :image-details="imageDetails" />
  </div>
</template>

<script>
import Pagination from '@/components/pagination'
import TableWrap from '@/components/TableWrap'
import monitorRecord from '@/api/monitorRecord'
import deletes from '@/views/monitorlist/component/delete'
import ImageDetails from '@/views/monitorlist/component/ImageDetails'
import { branchDropDown } from '@/utils/mixin'
export default {
  components: {
    Pagination,
    TableWrap,
    deletes,
    ImageDetails
  },
  mixins: [branchDropDown],
  data() {
    var check30 = (rule, value, callback) => {
      if (value) {
        if (/^.{1,30}$/.test(value)) {
          callback()
        } else {
          return callback(new Error('请填写1-30位的文本'))
        }
      } else {
        callback()
      }
    }
    var checkupdata = (rule, value, callback) => {
      if (value) {
        callback()
      } else {
        return callback(new Error('请选择文件'))
      }
    }
    return {
      multipleSelection: [],
      formUp: {
        name: '',
        monitorTypeId: '',
        orderId: '',
        fileUrl: ''
      },
      dialogFormVisible: false,
      formLabelWidth: '250px',
      formRule: {
        name: [
          { required: false, message: '请输入资料名称', trigger: 'change' },
          { validator: check30, trigger: 'change' }
        ],
        monitorTypeId: [
          { required: true, message: '请选择所属分组', trigger: 'change' }
        ],
        orderId: [
          {
            required: false,
            message: '请选择选择关联订单',
            trigger: 'change'
          }
        ],
        fileUrl: [
          {
            required: true,
            message: '请选择文件'
          }
        ]
      },
      total: 200,
      formSearch: {
        name: '',
        monitorTypeId: '',
        orderId: ''
      },
      listLoading: true,
      TableHeight: '300px',
      listQuery: {
        page: 1,
        limit: 10
      },
      tableData: [],
      monitorTypeIdList: [],
      file: '',
      idsArr: [],
      imageDetails: {},
      orderIdList: []
    }
  },
  created() {
    monitorRecord.postdropDownorderThirty().then(res => {
      this.orderIdList = res.result
    })
  },
  mounted() {
    this.getList()
    this.postmonitorRecordqueryMonitorTypes()
  },

  methods: {
    toDetail(val) {
      this.imageDetails = JSON.parse(JSON.stringify(val))
      this.imageDetails.name = this.imageDetails.fileName
      this.$refs.ImageDetails.innerVisible = true
    },
    deleteData() {},
    // 查询资料分类
    postmonitorRecordqueryMonitorTypes() {
      monitorRecord
        .postmonitorRecordqueryMonitorType({ status: 1 })
        .then(res => {
          this.monitorTypeIdList = res.result.list
        })
    },
    // 选择删除
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleClose() {
      this.dialogFormVisible = false
      this.$refs.delete.innerVisible = false
      this.$refs.tableFrom.clearSelection()
    },
    cancle() {
      this.handleClose()
    },
    // 上传资料
    submit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          var uploadData = new FormData()
          uploadData.append('file', this.file.raw)
          uploadData.append('monitorTypeId', this.formUp.monitorTypeId)
          uploadData.append('name', this.formUp.name)
          uploadData.append('orderId', this.formUp.orderId)
          monitorRecord.postmonitorRecorduploadFile(uploadData).then(res => {
            this.$message.success('添加成功')
            this.handleClose()
            this.resetForm()
          })
        } else {
          return false
        }
      })
    },
    reset() {
      this.formUp = {
        name: '',
        monitorTypeId: '',
        orderId: '',
        fileUrl: ''
      }
    },
    // 点击上传
    uploadFun(formName) {
      this.reset()
      this.$refs[formName] && this.$refs[formName].resetFields()
      this.dialogFormVisible = true
    },
    handleAvatarSuccess(res, file) {
      this.file = file
      this.formUp.fileUrl = URL.createObjectURL(file.raw)
      // 校验图片上传
      this.$refs.uploadxls.clearValidate()
    },
    deleteFunction() {
      const data = {
        ids: this.idsArr
      }
      monitorRecord.postmonitorRecorddeleteMonitor(data).then(res => {
        this.$message.success('删除成功')
        this.getList()
        this.handleClose()
      })
    },
    delListFun() {
      if (!this.multipleSelection.length) {
        this.$message.warning('请选择删除的数据')
        return false
      }
      this.idsArr = this.multipleSelection.map(v => v.id)
      this.$refs.delete.title = '资料'
      this.$refs.delete.innerVisible = true
    },
    // 上传成功
    // 上传校验
    beforeuploadCoverUrl(file) {
      const isJPG =
        file.type === 'image/jpeg' ||
        file.type === 'image/png' ||
        file.type === 'image/jpg'
      const isLt2M = file.size / 1024 / 1024 < 10

      if (!isJPG) {
        this.$message.error('上传图片仅支持PNG\JPEG\JPG\jpg格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 10MB!')
      }
      return isJPG && isLt2M // && isSize
    },
    handlePostCover(file) {},

    beforeRemove() {},
    changeImage() {},
    submitForm() {
      const data = {
        ...this.formSearch,
        pageNum: 1,
        pageSize: 10
      }
      monitorRecord.postmonitorRecordqueryMonitorRecord(data).then(res => {
        this.tableData = res.result.list
        this.total = res.result.total
        this.listQuery = {
          page: 1,
          limit: 10
        }
      })
    },
    resetForm() {
      this.formSearch = {
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
      monitorRecord.postmonitorRecordqueryMonitorRecord(data).then(res => {
        this.tableData = res.result.list
        this.total = res.result.total
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-container .avatar-uploader /deep/.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 104px !important;
  height: 104px !important;
  background-color: rgba(0, 0, 0, 0.02);
  line-height: 104px !important;
  text-align: center;
  border: 1px dashed #ccc;
}
</style>
