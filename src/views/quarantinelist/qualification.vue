<template>
  <div ref="main" class="dashboard-container">
    <!-- <div class="quarantine-Top">
      <p>检疫管理</p>
      <span><span>*</span>为必填项</span>
    </div>
    <div class="quarantine-line" /> -->
    <div ref="search" class="search-wrap">
      <el-form :inline="true" :model="formSearch" class="demo-form-inline">
        <el-form-item label="">
          <el-select v-model="formSearch.input1" placeholder="请选择商户代号">
            <el-option label="11121002101" value="1" />
            <el-option label="11121002102" value="2" />
          </el-select>
        </el-form-item>
        <el-form-item label="">
          <el-select v-model="formSearch.input2" placeholder="请选择商户名称">
            <el-option label="生猪厂" value="1" />
            <el-option label="生猪厂1" value="2" />
          </el-select>
        </el-form-item>
        <el-form-item label="">
          <el-select v-model="formSearch.input3" placeholder="请选择商户编号">
            <el-option label="1210" value="1" />
            <el-option label="1210" value="2" />
          </el-select>
        </el-form-item>
        <el-form-item label="">
          <el-date-picker
            v-model="formSearch.input4"
            type="date"
            placeholder="进厂日期"
            style="width: 100%"
          />
        </el-form-item>

        <el-form-item>
          <el-button
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
          type="primary"
          icon="el-icon-printer"
          plain
          @click="dialogFormVisible = true"
        >打印</el-button>
      </div>
      <div>
        <el-button
          type="primary"
          icon="el-icon-download"
          plain
          @click="isshowDialog = true"
        >导入</el-button>
      </div>
    </div>
    <TableWrap>
      <div class="quarantine-center" style="height: 100%">
        <el-table
          v-loading="listLoading"
          :data="tableData"
          border
          stripe
          style="width: 100%"
          height="100%"
        >
          <el-table-column type="selection" width="55" />
          <el-table-column prop="number" label="商户代号" />
          <el-table-column prop="name" label="商户名称" />
          <el-table-column prop="shopNumber" label="商户编号" />
          <el-table-column prop="buyNum" label="购买数量（只）" width="150" />
          <el-table-column prop="buyData" label="购买日期" width="200" />
          <el-table-column fixed="right" label="操作" width="150">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click="handleClick(scope.row)"
              >详情</el-button>
              <el-button
                type="text"
                size="small"
                @click="dialogFormVisible = true"
              >录入合格证</el-button>
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
      </div>
    </TableWrap>
    <el-dialog title="合格证导入" :visible.sync="isshowDialog" :close-on-click-modal="false">
      <div class="quarantine-xq22">
        <el-form
          ref="ruleForm"
          :model="ruleForm"
          :rules="rules"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item
            label="选择文件"
            :label-width="formLabelWidth"
            prop="fileUrl"
          >
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :before-upload="beforeAvatarUpload"
              accept="image/*"
              :on-success="success"
              :on-change="changeFun"
            >
              <img
                v-if="ruleForm.fileUrl"
                width="178"
                height="178"
                :src="ruleForm.fileUrl"
                class="avatar"
              >
              <i v-else class="el-icon-plus avatar-uploader-icon" />
              <div slot="tip" class="el-upload__tip">
                导入动物检疫合格证号模板文件，系统自动生成肉品品质检疫合格证
              </div>
            </el-upload>
          </el-form-item>
          <el-form-item
            label="肉品品质检疫合格证号:"
            label-width="200px"
            prop="name"
          >
            <el-input
              v-model="ruleForm.name"
              autocomplete="off"
              placeholder="请输入肉品品质检疫合格证号:"
            />
          </el-form-item>
          <!-- <div class="from-bottom">
              <el-form-item>
                <el-button
                  type="primary"
                  @click="resetForm('ruleForm')"
                >取消</el-button>
                <el-button @click="submitForm('ruleForm')">确定</el-button>
              </el-form-item>
            </div> -->
        </el-form>
      </div>
      <!-- <el-progress :text-inside="true" :stroke-width="26" :percentage="70" /> -->
      <!-- <div class="quarantine-line2" /> -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetForm('ruleForm')">取 消</el-button>
        <el-button
          type="primary"
          @click="submitForm('ruleForm')"
        >确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="合格证录入" :close-on-click-modal="false" :visible.sync="dialogFormVisible">
      <div class="quarantine-xq">
        <span />
        <p>商户信息</p>
      </div>
      <div class="quarantine-xq1">
        <div class="quarantine-xq2">
          <p>商户代号:</p>
          <p>{{ orderNumber }}</p>
        </div>
        <div class="quarantine-xq2">
          <p>商户名称:</p>
          <p>{{ orderName }}</p>
        </div>
        <div class="quarantine-xq2">
          <p>购买数量(只):</p>
          <p>{{ orderNum }}</p>
        </div>
      </div>
      <div class="quarantine-xq1">
        <div class="quarantine-xq2">
          <p>商户编号:</p>
          <p>{{ orderNumberBian }}</p>
        </div>
      </div>
      <div class="quarantine-line1" />
      <div class="quarantine-xq22">
        <el-form
          ref="ruleForms"
          :model="ruleForms"
          :rules="rules"
          label-width="150px"
          class="demo-ruleForm"
        >
          <el-form-item
            label="动物检疫合格证号:"
            :label-width="formLabelWidth"
            prop="number"
          >
            <el-input
              v-model="ruleForms.number"
              autocomplete="off"
              placeholder="请输入动物检疫合格证号"
            />
          </el-form-item>
        </el-form>
      </div>
      <div class="quarantine-line" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetForm('ruleForms')">取 消</el-button>
        <el-button
          type="primary"
          @click="submitForm('ruleForms')"
        >保存</el-button>
      </span>
    </el-dialog>
    <el-dialog title="详情" :close-on-click-modal="false" :visible.sync="dialogFormVisibleXQ">
      <div class="quarantine-xq">
        <span />
        <p>商户信息</p>
      </div>
      <div class="quarantine-message">
        <div class="quarantine-messagef">
          <p>商户代号:</p>
          <p>{{ orderNumber }}</p>
        </div>
        <div class="quarantine-messagef">
          <p>商户名称:</p>
          <p>{{ orderName }}</p>
        </div>
        <div class="quarantine-messagef">
          <p>商户编号:</p>
          <p>{{ orderNumberBian }}</p>
        </div>
        <div class="quarantine-messagef">
          <p>购买数量(只):</p>
          <p>{{ orderNum }}</p>
        </div>
        <div class="quarantine-messagef">
          <p>购买日期:</p>
          <p>{{ buyData }}</p>
        </div>
      </div>
      <div style="height:300px;margin-top:15px;">
        <el-table
          :data="XQmessage"
          border
          stripe
          style="width: 100%"
          height="100%"
        >
          <el-table-column prop="pigNumber" label="生猪编号" />
          <el-table-column prop="animateNumber" label="动物检疫合格证号" />
          <el-table-column prop="rNumber" label="肉品品质检疫合格证号" />
        </el-table>
      </div>
      <div class="quarantine-line" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetFormXQ">取 消</el-button>
        <el-button type="primary" @click="submitFormXQ">保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import TableWrap from '@/components/TableWrap'
import Pagination from '@/components/pagination'

export default {
  name: 'Admin',
  components: {
    Pagination,
    TableWrap
  },
  data() {
    return {
      isshowDialogTwo: false,
      listLoading: true,
      formSearch: {},
      dialogFormVisibleXQ: false,
      isshowDialog: false,
      XQmessage: [
        {
          pigNumber: '20122488660001',
          animateNumber: '309587500',
          rNumber: 'A13160402'
        },
        {
          pigNumber: '20122488660001',
          animateNumber: '309587500',
          rNumber: 'A13160402'
        },
        {
          pigNumber: '20122488660001',
          animateNumber: '309587500',
          rNumber: 'A13160402'
        },
        {
          pigNumber: '20122488660001',
          animateNumber: '309587500',
          rNumber: 'A13160402'
        },
        {
          pigNumber: '20122488660001',
          animateNumber: '309587500',
          rNumber: 'A13160402'
        },
        {
          pigNumber: '20122488660001',
          animateNumber: '309587500',
          rNumber: 'A13160402'
        },
        {
          pigNumber: '20122488660001',
          animateNumber: '309587500',
          rNumber: 'A13160402'
        }
      ],
      formUp: {
        name: '',
        type: '',
        orderId: '',
        fileUrl: ''
      },
      total: 200,
      rules: {
        name: [
          {
            required: true,
            message: '请输入肉品品质检疫合格证号',
            trigger: 'change'
          },
          {
            min: 3,
            max: 25,
            message: '长度在 3 到 25个字符',
            trigger: 'change'
          }
        ],
        resourceData: [
          { required: true, message: '请输入活动名称', trigger: 'change' },
          {
            min: 3,
            max: 5,
            message: '长度在 3 到 5 个字符',
            trigger: 'change'
          }
        ],
        fileUrl: [
          {
            required: true,
            message: '请选择选择文件',
            trigger: 'change'
          }
        ],
        number: [
          {
            required: true,
            message: '请输入动物检疫合格证号',
            trigger: 'change'
          }
        ]
      },
      listQuery: {
        page: 1,
        limit: 20
      },
      input1: '',
      resourceData: '',
      formLabelWidth: '150px',
      dialogFormVisible: false,
      ruleForms: {
        number: ''
      },
      ruleForm: {
        name: '',
        fileUrl: ''
      },

      tableData: [],
      newtableData: [],
      oldtableData: [],
      orderNumber: '林黑仔',
      orderName: '2020215155',
      orderNum: '12',
      orderNumberBian: '2020121515',
      buyData: '2020-12-24'
    }
  },
  created() {
    this.oldtableData = this.tableData
    setTimeout(() => {
      this.listLoading = false
    }, 1000)
  },

  methods: {
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
      this.getList()
      this.tableData = this.oldtableData
    },
    inquire(formSearch) {},
    handleClick(row) {
      this.dialogFormVisibleXQ = true
    },
    // 详情弹框保存
    submitFormXQ() {
      this.dialogFormVisibleXQ = false
    },
    // 详情弹框取消
    resetFormXQ() {
      this.dialogFormVisibleXQ = false
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.getList()
          setTimeout(() => {
            this.$message.success('导入成功')
            this.dialogFormVisible = false
          }, 1000)
          this.isshowDialog = false
        } else {
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.isshowDialog = false
      this.dialogFormVisible = false
    },
    getList() {
      this.listLoading = true
      setTimeout(() => {
        this.listLoading = false
      }, 1000)
    },
    // 上传change 的时候
    changeFun() {
      this.ruleForm.fileUrl =
        'https://gd2.alicdn.com/imgextra/i2/2448721589/O1CN01lHfOqG1NbnzLZq6Cm_!!2448721589.jpg'
      // this.$message.success('上传成功')
      // this.$message.success('上传成功')
    },
    // 点击上传
    uploadFun() {
      this.reset()
      this.dialogFormVisible = true
    },
    // 上传成功
    success(data) {
      if (data.code === 200 && data.data) {
        this.ruleForm.fileUrl = data.data.src
        // this.$message.success('上传成功')
      } else {
        // this.$message.error('上传失败')
      }
    },
    // 上传之前校验
    beforeAvatarUpload(file) {
      const testImg = /^image\/(png|jpg|jpeg)$/.test(file.type)
      // const isLt2M = file.size / 1024 / 1024 < 3
      if (!testImg) {
        this.$message.error('上传头像图片只能是 png|jpg|jpeg 格式!')
      }
      // if (!isLt2M) {
      //   this.$message.error('上传头像图片大小不能超过 3MB!')
      // }
      // return isLt2M
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/.el-table-column--selection {
  /deep/.cell {
    text-align: center;
  }
}
.search-wrap {
  /deep/.el-input {
    width: 200px !important;
    margin-right: 15px;
  }
}

/deep/.el-form-item__label {
  width: 400px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  text-align: left;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
  margin-top: 20px;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
  margin-top: 20px;
}
/deep/.el-upload__tip {
  text-align: left;
}
.quarantine-line {
  width: 100%;
  height: 1px;
  background-color: #e8e8e8;
  margin: 0 auto;
}
/deep/.el-dialog .el-dialog__footer {
  padding-bottom: 15px;
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
.quarantine-message {
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;
  padding: 0 7px;
  .quarantine-messagef {
    display: flex;
    justify-content: space-between;
    width: 20%;
    font-size: 14px;
    color: #000000;
    opacity: 0.4;
    font-family: PingFang SC;
    p:nth-of-type(1) {
      width: 50%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    p:nth-of-type(2) {
      width: 50%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      // text-align: right;
    }
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
    font-size: 14px;
    color: #000000;
    opacity: 0.4;
    font-family: PingFang SC;
    p:nth-of-type(1) {
      width: 50%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    p:nth-of-type(2) {
      width: 50%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      // text-align: right;
    }
  }
}
.quarantine-line1 {
  width: 100%;
  height: 1px;
  background-color: #e8e8e8;
  margin-top: 15px;
  margin-bottom: 15px;
}
/deep/.el-select {
  width: 100%;
}
.quarantine-xq22 {
  /deep/.el-input {
    width: 100% !important;
  }
}

.quarantine-xq22 {
  /deep/.el-form {
    width: 80%;
    // height: 300px;
    margin: 0 auto;
    /deep/.el-form-item__label {
      padding: 0 20px 0 0;
    }
  }
}
/deep/.el-upload {
  display: inline-block;
  text-align: left;
  cursor: pointer;
  width: 100%;
  outline: 0;
}
.from-bottom {
  /deep/.el-form-item__content {
    line-height: 40px;

    position: relative;
    font-size: 14px;
    margin-bottom: 15px;
    text-align: right;
  }
}

.quarantine-line2 {
  position: absolute;
  bottom: 70px;
  left: 0;
  right: 0;
  height: 1px;
  width: 100%;
  background-color: #e8e8e8;
}
</style>
