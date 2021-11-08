<template>
  <el-dialog
    width="600px"
    :title="userStatus"
    :close-on-click-modal="false"
    :visible.sync="innerVisible"
    append-to-body
  >
    <div class="access-Dialog">
      <i class="el-icon-warning" :style="colorIcon" />
      <p>是否确定{{ changeData.message }}</p>
    </div>
    <div class="quarantine-line" />
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancle">取 消</el-button>
      <el-button type="primary" @click="sureNo">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import userAdmin from '@/api/userAdmin'
export default {
  props: {
    userStatus: {
      type: String,
      default: ''
    },
    changeData: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      innerVisible: false,
      colorIcon: ''
    }
  },
  methods: {
    cancle() {
      this.innerVisible = false
    },
    sureNo() {
      const data = {
        flag: this.changeData.flag,
        id: this.changeData.id
      }
      userAdmin.postrolechangeRole(data).then(res => {
        this.innerVisible = false
        if (this.changeData.flag === 3) {
          this.$message.success('角色删除成功')
        } else {
          this.$message.success(res.result)
        }

        this.$parent.reset()
      })
      // this.$parent.changeStatus()
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
</style>
