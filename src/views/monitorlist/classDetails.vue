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
  <div ref="main" class="dashboard-container  detail-con">
    <div ref="search">
      <header-title title="分类详情" routepush="classification" />
      <div class="quarantine-line" />
      <p class="l18">分类信息</p>
      <el-row :gutter="20" class="info-wrap">
        <el-col :span="6" style="display: flex;">
          <p>分类名称：</p>
          <p>{{ info.name }}</p>
        </el-col>
        <el-col :span="6" style="display: flex;">
          <p>创建时间：</p>
          <p>{{ info.createdTime }}</p>
        </el-col>
        <el-col :span="6" style="display: flex;">
          <p>状态：</p>
          <p>{{ info.status === 1 ? '启用' : '停用' }}</p>
        </el-col>
      </el-row>
    </div>
    <hr ref="action" class="wrap-line mrb26 ">
    <TableWrap>
      <el-row :gutter="20" class="img-wrap">
        <el-col
          v-for="(item, index) in imgList"
          :key="index"
          :span="4"
          style="position: relative;"
        >
          <div @mouseenter="mouseoverFun(item)" @mouseleave="mouseoutFun(item)">
            <img height="200" width="100%" :src="item.videoUrl" alt="">
            <div
              v-show="item.isshow"
              class="details-b"
              @click="LookDetails(item)"
            >
              <p>查看详情</p>
            </div>
          </div>
          <p class="p-name">{{ item.fileName }}</p>
          <p class="p-name">{{ item.uploadTime }}</p>
        </el-col>
        <p v-if="!imgList.length" class="image-p">暂无数据</p>
      </el-row>
    </TableWrap>
    <ImageDetails ref="ImageDetails" :image-details="imageDetails" />

    <!-- 列表操作 -->
  </div>
</template>

<script>
import TableWrap from '@/components/TableWrap'
import headerTitle from '@/components/headerTitle'
import monitorRecord from '@/api/monitorRecord'
import ImageDetails from '@/views/monitorlist/component/ImageDetails'

export default {
  components: {
    TableWrap,
    headerTitle,
    ImageDetails
  },
  data() {
    return {
      activeName: 'first',
      imgList: [],
      monitorTypeId: '',
      isshow: false,
      imageDetails: {},
      info: {}
    }
  },
  created() {
    this.monitorTypeId = localStorage.getItem('monitId')
    monitorRecord
      .postmonitorTypequeryMonitorTypeDetailInfo(
        `monitorTypeId=${this.monitorTypeId}`
      )
      .then(res => {
        this.info = res.result[0]
      })
    this.postmonitorRecordqueryMonitorTypeDetails()
  },
  methods: {
    LookDetails(val) {
      val.name = val.fileName
      val.monitorCoverUrl = val.videoUrl

      this.imageDetails = val
      this.$refs.ImageDetails.innerVisible = true
    },
    mouseoverFun(val) {
      this.$set(val, 'isshow', true)
    },
    mouseoutFun(val) {
      this.$set(val, 'isshow', false)
    },
    postmonitorRecordqueryMonitorTypeDetails() {
      const data = `monitorTypeId=${this.monitorTypeId}`
      monitorRecord.postmonitorRecordqueryMonitorTypeDetail(data).then(res => {
        this.imgList = res.result
      })
    },
    handleClick(tab, event) {}
  }
}
</script>

<style lang="scss" scoped>
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
.image-p {
  color: #ccc;
  margin-top: 150px;
}
.details-b {
  width: 100%;
  height: 200px;
  position: absolute;
  top: 0;
  left: 0;
  text-align: center;
  background-color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  p {
    line-height: 200px;
    color: rgb(58, 58, 58);
  }
}
.p-name {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.65);
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
