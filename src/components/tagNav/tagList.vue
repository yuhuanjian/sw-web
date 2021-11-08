<template>
  <div class="tagList bot1">
    <scroll-pane ref="scrollPane" class="tags-view-wrapper">
      &nbsp;
      <div
        v-for="(item, index) in list"
        :key="index"
        ref="tags"
        :data-path="item.path"
        :data-name="item.name"
        @click="changeOn(item)"
      >
        <!-- <template v-if="$route.name === item.name">
          <el-tag
            v-if="item.name === '首页'"
            color="#fff"
            class="tags"
            :data-name="item.name"
          >
            {{ item.label }}
          </el-tag>
          <el-tag
            v-else
            color="#fff"
            closable
            class="tags"
            :data-name="item.name"
            @close.stop.prevent="handleClose(item)"
          >
            {{ item.label }}
          </el-tag>
        </template> -->
        <template>
          <el-tag
            v-if="item.name === '概览'"
            :class="[$route.name === item.name ? 'select-nav' : '', 'tags']"
            :data-name="item.name"
          >
            {{ item.label }}
          </el-tag>
          <el-tag
            v-else
            closable
            :class="[$route.name === item.name ? 'select-nav' : '', 'tags']"
            :data-name="item.name"
            @close.stop.prevent="handleClose(item)"
          >
            {{ item.label }}
          </el-tag>
        </template>
      </div>
    </scroll-pane>
    <i class="el-icon-close closeAll" @click="closeAllTag" />
  </div>
</template>
<script>
import scrollPane from '@/components/tagNav/scrollPane'
export default {
  name: 'TagList',
  components: {
    scrollPane
  },
  data() {
    return {}
  },
  computed: {
    list() {
      return this.$store.getters.tagNavList
    }
  },
  watch: {
    $route: {
      handler: function() {
        this.$nextTick(() => {
          this.updateTag()
        })
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    // 新增或者更新标签数组
    updateTag: function() {
      const nowRouter = this.$route
      const obj = {
        label: nowRouter.meta.tagName || nowRouter.meta.title,
        path: nowRouter.fullPath,
        name: nowRouter.name,
        lastTime: new Date().getTime()
      }

      this.$store.dispatch('app/updateTagNavList', obj)
      this.moveToCurrentTag()
    },
    // 关闭指定标签
    handleClose: function(item) {
      this.$store.dispatch('app/deleteTagNavList', item)
      const parentsTag = [...this.list].sort((a, b) => {
        return b.lastTime - a.lastTime
      })[0]
      // 跳转为缓存
      this.$store.dispatch('app/setIsKeepAlive', true)
      this.$router.push({
        path: parentsTag.path
      })
      this.moveToCurrentTag()
    },
    // 切换至标签上
    changeOn: function(item) {
      // 跳转为缓存
      this.$store.dispatch('app/setIsKeepAlive', true)
      this.$router.push({
        path: item.path
      })
      this.moveToCurrentTag()
    },
    // 滚动条移动到对应的标签
    moveToCurrentTag: function() {
      this.$nextTick(() => {
        const tags = this.$refs['tags']
        for (const tag of tags) {
          if (tag.dataset.name === this.$route.name) {
            this.$refs.scrollPane.moveToTarget(tag)
            break
          }
        }
      })
    },
    // 关闭所有
    closeAllTag: function() {
      this.$store.dispatch('app/closeAllTagNavList')
      this.updateTag()
    }
  }
}
</script>
<style lang="scss" scoped>
.tagList {
  height: 42px;
  padding: 0 30px;
  * {
    box-sizing: border-box;
  }
  // box-shadow: 0px 1px 6px rgba(72, 89, 102, 0.1);
  .closeAll {
    float: right;
    position: absolute;
    top: 11px;
    font-size: 20px;
    color: #8a8a8a;
    right: 30px;
    cursor: pointer;
    transition: all 1s;
    &:hover {
      transform: rotate(180deg);
    }
  }
}
</style>
