<!--顶部导航-->
<template>
  <div>
    <!-- 这里显示 index 小于 maxItem 的内容 -->
    <div v-for="item in currentPathArr" :key="item.path" :href="item.path">
      <div v-if="!item.hidden">
        <!-- <el-menu-item :index="item.path.split('/')[1]" :name="item.path.split('/')[1]">
          {{ item.name }}
        </el-menu-item> -->
        <el-menu-item
          :index="item.path.split('/')[1]"
          :name="item.path.split('/')[1]"
        >
          <router-link :to="item.path">
            {{ item.name }}
          </router-link>
        </el-menu-item>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {}
  },
  computed: {
    currentPathArr() {
      console.log('currentPathArr', this.$store.state.app.navRouters)
      return this.$store.state.app.navRouters
    }
  },
  mounted() {}
}
</script>
