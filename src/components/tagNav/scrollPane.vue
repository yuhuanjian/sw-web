<template>
  <div
    ref="scrollContainer"
    class="scroll-container bdt bdb"
    @wheel.prevent="handleScroll"
  >
    <div
      ref="scrollWrapper"
      class="scroll-wrapper"
      :style="{left: left + 'px'}"
    >
      <slot />
    </div>
  </div>
</template>
<script>
export default {
  name: 'ScrollPane',
  data() {
    return {
      left: 0
    }
  },
  methods: {
    handleScroll(e) {
      const eventDelta = e.wheelDelta || -e.deltaY * 3 // wheelDelta:-120;deltaY:-120
      const $container = this.$refs.scrollContainer // 外面的container
      const $containerWidth = $container.offsetWidth // 外面的container的宽度
      const $wrapper = this.$refs.scrollWrapper // 里面
      const $wrapperWidth = $wrapper.offsetWidth // 里面的宽度
      if (eventDelta > 0) {
        this.left = Math.min(0, this.left + eventDelta) // min() 方法可返回指定的数字中带有最低值的数字。
      } else {
        if ($containerWidth < $wrapperWidth) {
          if (
            this.left >= -($wrapperWidth - $containerWidth)
          ) {
            this.left = Math.max(
              this.left + eventDelta,
              $containerWidth - $wrapperWidth
            )
          }
        } else {
          this.left = 0
        }
      }
    },
    moveToTarget($target) {
      const $container = this.$refs.scrollContainer
      const $containerWidth = $container.offsetWidth
      const $targetLeft = $target.offsetLeft
      const $targetWidth = $target.offsetWidth
      if ($targetLeft <= -this.left) {
        // tag in the left
        this.left = -$targetLeft
      } else if (
        $targetLeft > -this.left &&
                $targetLeft + $targetWidth <
                    -this.left + $containerWidth
      ) {
        // tag in the current view
                // eslint-disable-line
      } else {
        this.left = -(
          $targetLeft - ($containerWidth - $targetWidth)
        )
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.scroll-container {
    white-space: nowrap;
    position: relative;
    overflow: hidden;;
    width: 100%;
    height: 41px;

    .bdb{border-bottom: 1px solid #EAEBEE;}
    .bdt{border-top: 1px solid #EAEBEE;}
    .el-tag{
      height:41px;
      line-height: 41px;
      padding:0 20px;
      background-color: #fff;
      color:#000;
      border:none;
      border-radius: 0;
      font-size: 14px;
      cursor: pointer;
      .el-tag__close{
        color:#000;
        font-size: 16px;
        &:hover{
          color:#fff;
        }
      }

    }
    .select-nav{
      background-color: #1890FF;
      color:#fff;
      .el-icon-close::before{
        color:#fff;
        font-size: 16px;
      }
    }
    .scroll-wrapper {
        position: absolute;
        display: flex;
        >div{
         border-right:1px solid  #EAEBEE;
        &:first-child{
         border-left:1px solid #EAEBEE;
      }
    }
    }
}
</style>
