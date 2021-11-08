<template>
  <div ref="main" class="dashboard-container detail-con">
    <div ref="search">
      <headerxq title="检疫录入" routepush="access" :header-list="headerList" />
    </div>
    <hr ref="action" class="wrap-line topmarg">
    <TableWrap>
      <div class="access" style="height: 95%">
        <div class="access-header">
          <p class="bt">非洲猪瘟抽样检测</p>
          <div class="access-bt">
            <el-button
              type="primary"
              icon="el-icon-delete"
              plain
              @click="deleteAccess"
            >{{ '删     除' }}</el-button>
            <el-button
              type="primary"
              :disabled="ISdisabled"
              @click="accessgo"
            >录入结果</el-button>
            <el-upload
              class="avatar-uploader"
              action=""
              :show-file-list="false"
              :before-upload="beforeAvatarUpload"
              :on-success="success"
              :on-change="changeFun"
              :http-request="handlePost"
            >
              <el-button type="primary" icon="el-icon-upload">上传</el-button>
            </el-upload>
            <!-- <el-button type="primary" icon="el-icon-upload" @click="goback">上传</el-button> -->
          </div>
        </div>
        <div class="img-wrap-sf">
          <el-checkbox-group v-model="checkList" @change="checkListChange">
            <div
              v-for="(item, index) in imgList"
              :key="index"
              class="img-wrap-s"
            >
              <el-checkbox :label="item.id">{{ '' }}</el-checkbox>
              <div class="img-wrap-sp" style="width:90%">
                <img height="200" width="80%" :src="item.attachmentUrl" alt>
                <p class="img--p">{{ item.attachmentName }}</p>
                <!-- <p class="img--p">{{ item.createdTime }}</p> -->
              </div>
            </div>
          </el-checkbox-group>
        </div>
      </div>
      <div class="slauhhter-btn">
        <!-- <el-button type="primary" @click="submitForma">保存</el-button>
        <el-button @click="resetForm">取消</el-button> -->
      </div>
    </TableWrap>
    <el-dialog title="检疫录入" width="600px" :visible.sync="isshowDialog"  :close-on-click-modal="false">
      <el-dialog
        width="600px"
        title="检疫录入"
        :visible.sync="innerVisible"
        :close-on-click-modal="false"
        append-to-body
      >
        <div class="access-Dialog">
          <i class="el-icon-warning" />
          <p>检疫不通过的订单将被锁定并无法继续进行，是否确认检疫不通过？</p>
        </div>
        <div class="quarantine-line" />
        <span slot="footer" class="dialog-footer">
          <el-button @click="cancle">取 消</el-button>
          <el-button type="primary" @click="sureNo">确 定</el-button>
        </span>
      </el-dialog>
      <div class="quarantine-xq22">检疫是否通过?</div>
      <div class="quarantine-line" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetForm">不通过</el-button>
        <el-button type="primary" @click="submitForm">通 过</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import headerxq from './components/headerxq'
import TableWrap from '@/components/TableWrap'
import {
  postQuarantineSaveCheckResult,
  postAllowEntQuarUploadFile,
  postAllowEntQuarQueryFileByOrderId,
  allowEntQuardeleteFile,
  postuploadFile
} from '@/api/jyzyy'
import { postFindOrdersById } from '@/api/order.js'

export default {
  components: {
    TableWrap,
    headerxq
  },
  data() {
    return {
      dataimg: {
        fileType: 1,
        orderId: ''
      },
      activeName: 'first',
      formUp: {
        name: '',
        type: '',
        orderId: '',
        fileUrl: ''
      },

      imgList: [
        {
          url: 'https://i.loli.net/2020/12/25/ZAqGliKCaHR3Mo2.jpg',
          name: '测试图片',
          date: '2020-12-11 12:32:55'
        }
      ],
      isshowDialog: false,
      innerVisible: false,
      headerList: {},
      ISdisabled: false,
      checkList: [],
      detailsMessage: {}
    }
  },
  created() {
    this.detailsMessage = JSON.parse(localStorage.getItem('detailsMessage'))
    this.dataimg.orderId = this.detailsMessage.id
    postFindOrdersById(this.detailsMessage.id).then(res => {
      this.headerList = res.result
      this.headerList.wholesaler = this.$route.query.wholesaler
    })
    postAllowEntQuarQueryFileByOrderId(this.detailsMessage.id).then(res => {
      this.imgList = res.result
    })
  },
  methods: {
    checkListChange(o) {},
    deleteAccess() {
      if (this.checkList.length === 0) {
        this.$message.error('请最少选择一项删除！')
      } else {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            allowEntQuardeleteFile(this.checkList).then(res => {
              postAllowEntQuarQueryFileByOrderId(this.detailsMessage.id).then(
                res => {
                  this.imgList = res.result
                }
              )
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
            })
          })
          .catch(() => {})
      }
    },
    getList() {},
    handleClick(tab, event) {},
    accessgo() {
      this.isshowDialog = true
    },

    submitForm() {
      postQuarantineSaveCheckResult({
        orderId: this.detailsMessage.id,
        quarantineResult: 1,
        quarType: 1
      }).then(res => {
        this.ISdisabled = true
        this.isshowDialog = false
        const nowRouter = this.$route
        const obj = {
          label: nowRouter.meta.tagName || nowRouter.meta.title,
          path: nowRouter.path,
          name: nowRouter.name,
          lastTime: new Date().getTime()
        }
        this.$store.dispatch('app/deleteTagNavList', obj)
        this.$router.push({
          path: 'access'
        })
      })
    },
    resetForm() {
      this.isshowDialog = false
      this.innerVisible = true
    },
    cancle() {
      this.innerVisible = false
    },
    sureNo() {
      // this.innerVisible = false
      // this.isshowDialog = false
      // this.getList()
      postQuarantineSaveCheckResult({
        orderId: this.detailsMessage.id,
        quarantineResult: 0,
        quarType: 1
      }).then(res => {
        this.isshowDialog = false
        this.innerVisible = false
        const nowRouter = this.$route
        const obj = {
          label: nowRouter.meta.tagName || nowRouter.meta.title,
          path: nowRouter.path,
          name: nowRouter.name,
          lastTime: new Date().getTime()
        }
        this.$store.dispatch('app/deleteTagNavList', obj)
        this.$router.push({
          path: 'access'
        })
      })
    },
    submitForma() {
      this.getList()
      setTimeout(() => {
        this.$message.success('保存成功')
        this.$router.push({
          path: 'access'
        })
      }, 1000)
    },
    // 上传change 的时候
    changeFun(file, fileList) {},
    goback() {},
    // 点击上传
    uploadFun() {
      this.reset()
      this.dialogFormVisible = true
    },
    handlePost(file) {
      var uploadData = new FormData()
      uploadData.append('fileType', 1)
      uploadData.append('orderId', this.dataimg.orderId)
      uploadData.append('file', file.file)
      postuploadFile(uploadData).then(res => {
        this.$message.success('上传成功')
        postAllowEntQuarQueryFileByOrderId(this.detailsMessage.id).then(res => {
          this.imgList = res.result
          this.getList()
        })
      })
    },
    // 上传成功
    success(data, file, fileList) {},
    // 上传之前校验
    beforeAvatarUpload(file) {
      const isJPG =
        file.type === 'image/jpeg' ||
        file.type === 'image/png' ||
        file.type === 'image/gif'
      const isLt2M = file.size / 1024 / 1024 < 10
      if (!isJPG) {
        this.$message.error('上传图片仅支持PNG\JPEG\JPG\GIF格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 10MB!')
      }
      return isJPG && isLt2M
    }
  }
}
</script>

<style lang="scss" scoped>
.img--p {
  width: 100%;
  height: 20px;
  color: black;
  text-align: center;
  margin-top: 5px;
  font-size: 10px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.img-wrap-sp {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}
.img-wrap-s {
  width: 20%;
  display: flex;
  flex-shrink: 0;
  justify-content: space-between;
  margin-bottom: 20px;
  // margin-right: 30px;
}
.img-wrap-sf {
  height: 85%;
  overflow: hidden;
  overflow: auto;
}
/deep/.el-checkbox-group {
  width: 100%;
  display: flex;

  flex-wrap: wrap;
}
.bt {
  border-bottom: 2px solid #409eff;
  line-height: 30px;
}
.slauhhter-btn {
  margin-left: 0px !important;
  text-align: center;
  margin-top: 15px;
}
.table-wrap {
  padding: 0px !important;
}
.access-Dialog {
  width: 100%;
  height: 160px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  font-size: 20px;
  i {
    font-size: 50px;
    margin-right: 15px;
    color: red;
  }
}
/deep/.el-dialog__header {
  // background-color: #d9e0df;
  padding: 15px 20px 10px;
}
/deep/.el-dialog__body {
  padding: 0px 30px;
}
/deep/.el-dialog .el-dialog__footer {
  padding-bottom: 15px;
}
.access {
  &-header {
    width: 100%;
    height: 55px;
    margin: 0 auto;
    display: flex;
    // margin-bottom: 15px
    justify-content: space-between;
    flex-direction: row;
    align-items: center;
    div {
      width: 20%;
      margin-left: 20px;
      display: flex;
      justify-content: space-around;
    }
    p {
      color: #4285f4;
      font-size: 16px;
    }
  }
  &-bt {
    /deep/.el-button {
      height: 40px;
    }
  }
}
.quarantine-line {
  width: 100%;
  height: 1px;
  background-color: #e8e8e8;
  margin: 0 auto;
  margin-bottom: 5px;
}
.img-wrap {
  height: calc(100% - 50px);
  overflow: auto;
  p {
    line-height: 30px;
    text-align: center;
  }
  .el-col {
    margin-bottom: 26px;
  }
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
.quarantine-xq22 {
  line-height: 150px;
  font-size: 20px;
  font-weight: lighter;
}
</style>
