<template>
  <el-dialog
    width="800px"
    title="详情"
    :close-on-click-modal="false"
    :visible.sync="innerVisible"
    append-to-body
  >
    <div class="access-Dialog">
      <el-image
        :src="imageDetails.monitorCoverUrl"
        style="width:100%;max-height:500px"
      >
        <div slot="error" class="image-slot">
          <i class="el-icon-picture-outline" />
        </div>
      </el-image>
      <div class="details">
        <p>图片名称: {{ imageDetails.name }}</p>
        <p>上传时间: {{ imageDetails.uploadTime }}</p>
        <p>
          关联订单:
          {{
            imageDetails.orderNum === null
              ? '无关联订单'
              : imageDetails.orderNum
          }}
        </p>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" size="mini" @click="cancle">关闭</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  props: {
    imageDetails: {
      type: Object
    }
  },
  data() {
    return {
      innerVisible: false
    }
  },
  methods: {
    cancle() {
      this.innerVisible = false
    }
  }
}
</script>

<style lang="scss" scoped>
.access-Dialog {
  padding: 30px 10px 0 10px;
}
.details {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.45);
  p {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
</style>
