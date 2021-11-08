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
        <el-col :span="6">
          <span>分类名称：</span>
          <span>2020年2月准入检疫</span>
        </el-col>
        <el-col :span="6">
          <span>创建时间：</span>
          <span>2020-12-12 12:12:12</span>
        </el-col>
        <el-col :span="6">
          <span>状态：</span>
          <span>停用</span>
        </el-col>
        <el-col :span="6"><div class="grid-content " /></el-col>
      </el-row>
    </div>
    <hr ref="action" class="wrap-line mrb26 ">
    <TableWrap>
      <el-tabs
        v-model="activeName"
        style="height:100%"
        @tab-click="handleClick"
      >
        <el-tab-pane label="图片" name="first" style="height:100%">
          <el-row :gutter="20" class="img-wrap">
            <el-col v-for="(item, index) in imgList" :key="index" :span="4">
              <img height="200" width="100%" :src="item.url" alt="">
              <p>{{ item.name }}</p>
              <p>{{ item.date }}</p>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane style="height:100%" label="视频" name="second">
          <el-row :gutter="20" class="img-wrap">
            <el-col v-for="(item, index) in imgList" :key="index" :span="4">
              <img height="200" width="100%" :src="item.url" alt="">
              <p>{{ item.name.replace('图片', '视频') }}</p>
              <p>{{ item.date }}</p>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
    </TableWrap>

    <!-- 列表操作 -->
  </div>
</template>

<script>
import TableWrap from '@/components/TableWrap'
import headerTitle from '@/components/headerTitle'
export default {
  components: {
    TableWrap,
    headerTitle
  },
  data() {
    return {
      activeName: 'first',
      imgList: [
        {
          url:
            'https://gd2.alicdn.com/imgextra/i2/2448721589/O1CN01lHfOqG1NbnzLZq6Cm_!!2448721589.jpg',
          name: '测试图片',
          date: '2020-12-11 12:32:55'
        },
        {
          url:
            'https://gd2.alicdn.com/imgextra/i2/2448721589/O1CN01lHfOqG1NbnzLZq6Cm_!!2448721589.jpg',
          name: '测试图片',
          date: '2020-12-11 12:32:55'
        },
        {
          url:
            'https://gd2.alicdn.com/imgextra/i2/2448721589/O1CN01lHfOqG1NbnzLZq6Cm_!!2448721589.jpg',
          name: '测试图片',
          date: '2020-12-11 12:32:55'
        },
        {
          url:
            'https://gd2.alicdn.com/imgextra/i2/2448721589/O1CN01lHfOqG1NbnzLZq6Cm_!!2448721589.jpg',
          name: '测试图片',
          date: '2020-12-11 12:32:55'
        },
        {
          url:
            'https://gd2.alicdn.com/imgextra/i2/2448721589/O1CN01lHfOqG1NbnzLZq6Cm_!!2448721589.jpg',
          name: '测试图片',
          date: '2020-12-11 12:32:55'
        },
        {
          url:
            'https://gd2.alicdn.com/imgextra/i2/2448721589/O1CN01lHfOqG1NbnzLZq6Cm_!!2448721589.jpg',
          name: '测试图片',
          date: '2020-12-11 12:32:55'
        },
        {
          url:
            'https://gd2.alicdn.com/imgextra/i2/2448721589/O1CN01lHfOqG1NbnzLZq6Cm_!!2448721589.jpg',
          name: '测试图片',
          date: '2020-12-11 12:32:55'
        },
        {
          url:
            'https://gd2.alicdn.com/imgextra/i2/2448721589/O1CN01lHfOqG1NbnzLZq6Cm_!!2448721589.jpg',
          name: '测试图片',
          date: '2020-12-11 12:32:55'
        },
        {
          url:
            'https://gd2.alicdn.com/imgextra/i2/2448721589/O1CN01lHfOqG1NbnzLZq6Cm_!!2448721589.jpg',
          name: '测试图片',
          date: '2020-12-11 12:32:55'
        },
        {
          url:
            'https://gd2.alicdn.com/imgextra/i2/2448721589/O1CN01lHfOqG1NbnzLZq6Cm_!!2448721589.jpg',
          name: '测试图片',
          date: '2020-12-11 12:32:55'
        },
        {
          url:
            'https://gd2.alicdn.com/imgextra/i2/2448721589/O1CN01lHfOqG1NbnzLZq6Cm_!!2448721589.jpg',
          name: '测试图片',
          date: '2020-12-11 12:32:55'
        },
        {
          url:
            'https://gd2.alicdn.com/imgextra/i2/2448721589/O1CN01lHfOqG1NbnzLZq6Cm_!!2448721589.jpg',
          name: '测试图片',
          date: '2020-12-11 12:32:55'
        },
        {
          url:
            'https://gd2.alicdn.com/imgextra/i2/2448721589/O1CN01lHfOqG1NbnzLZq6Cm_!!2448721589.jpg',
          name: '测试图片',
          date: '2020-12-11 12:32:55'
        },
        {
          url:
            'https://gd2.alicdn.com/imgextra/i2/2448721589/O1CN01lHfOqG1NbnzLZq6Cm_!!2448721589.jpg',
          name: '测试图片',
          date: '2020-12-11 12:32:55'
        },
        {
          url:
            'https://gd2.alicdn.com/imgextra/i2/2448721589/O1CN01lHfOqG1NbnzLZq6Cm_!!2448721589.jpg',
          name: '测试图片',
          date: '2020-12-11 12:32:55'
        },
        {
          url:
            'https://gd2.alicdn.com/imgextra/i2/2448721589/O1CN01lHfOqG1NbnzLZq6Cm_!!2448721589.jpg',
          name: '测试图片',
          date: '2020-12-11 12:32:55'
        },
        {
          url:
            'https://gd2.alicdn.com/imgextra/i2/2448721589/O1CN01lHfOqG1NbnzLZq6Cm_!!2448721589.jpg',
          name: '测试图片',
          date: '2020-12-11 12:32:55'
        },
        {
          url:
            'https://gd2.alicdn.com/imgextra/i2/2448721589/O1CN01lHfOqG1NbnzLZq6Cm_!!2448721589.jpg',
          name: '测试图片',
          date: '2020-12-11 12:32:55'
        },
        {
          url:
            'https://gd2.alicdn.com/imgextra/i2/2448721589/O1CN01lHfOqG1NbnzLZq6Cm_!!2448721589.jpg',
          name: '测试图片',
          date: '2020-12-11 12:32:55'
        },
        {
          url:
            'https://gd2.alicdn.com/imgextra/i2/2448721589/O1CN01lHfOqG1NbnzLZq6Cm_!!2448721589.jpg',
          name: '测试图片',
          date: '2020-12-11 12:32:55'
        },
        {
          url:
            'https://gd2.alicdn.com/imgextra/i2/2448721589/O1CN01lHfOqG1NbnzLZq6Cm_!!2448721589.jpg',
          name: '测试图片',
          date: '2020-12-11 12:32:55'
        },
        {
          url:
            'https://gd2.alicdn.com/imgextra/i2/2448721589/O1CN01lHfOqG1NbnzLZq6Cm_!!2448721589.jpg',
          name: '测试图片',
          date: '2020-12-11 12:32:55'
        },
        {
          url:
            'https://gd2.alicdn.com/imgextra/i2/2448721589/O1CN01lHfOqG1NbnzLZq6Cm_!!2448721589.jpg',
          name: '测试图片',
          date: '2020-12-11 12:32:55'
        }
      ]
    }
  },
  methods: {
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
</style>
