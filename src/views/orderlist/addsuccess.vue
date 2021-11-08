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
    <!-- <div ref="search" class="search-wrap" /> -->
    <div class="content">
      <img src="../../assets/success.png" alt="">
      <div class="title">添加成功 ！</div>
      <div class="btn">
        <el-button type="primary" @click="toAdd()">继续新增</el-button>
        <el-button @click="toOrderList()">返回订单列表</el-button>
      </div>
    </div>
  </div>
</template>

<script>
// import Pagination from '@/components/pagination'
// import TableWrap from '@/components/TableWrap'
export default {
  components: {
    // Pagination,
    // TableWrap
  },
  data() {
    return {}
  },
  mounted() {
    this.getList()
  },

  methods: {
    // 取消
    toOrderList() {
      const nowRouter = this.$route
      const obj = {
        label: nowRouter.meta.tagName || nowRouter.meta.title,
        path: nowRouter.path,
        name: nowRouter.name,
        lastTime: new Date().getTime()
      }
      this.$store.dispatch('app/deleteTagNavList', obj)
      this.$router.push({
        path: 'ordermanager'
      })
    },
    toAdd() {
      this.$router.push({
        path: 'addorder'
      })
    },
    getList() {}
  }
}
</script>

<style lang="scss" scoped>
/deep/.dashboard-container {
  //  height: 100%;
  padding: 0 0 20px 0;
}
.content {
  //   display: flex;
  //   flex-direction: column;
  //   justify-content: center;
  text-align: center;
  img {
    margin-top: 160px;
    width: 102px;
    height: 102px;
  }
  .title {
    font-size: 24px;
    font-family: PingFangSC-Medium;
    line-height: 32px;
    color: rgba(0, 0, 0, 0.85);
    opacity: 1;
    margin-top: 20px;
  }
  .btn {
    margin-top: 70px;
  }
}
</style>
