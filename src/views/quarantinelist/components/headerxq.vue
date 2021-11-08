<template>
  <div>
    <header-title :title="title" :routepush="routepush" />
    <div class="quarantine-line" />
    <div class="quarantine-xq">
      <p class="l18">订单详情</p>
    </div>
    <div class="quarantine-xq1">
      <div class="quarantine-xq2">
        <p>订单编号：</p>
        <p>{{ headerList.orderNum }}</p>
      </div>
      <div class="quarantine-xq2">
        <p>养殖场名称：</p>
        <p>{{ headerList.farmName }}</p>
      </div>
      <div class="quarantine-xq2">
        <p>货主：</p>
        <p>{{ headerList.shipper }}</p>
      </div>
      <div class="quarantine-xq2">
        <p>所属批发商：</p>
        <p>{{ headerList.wholesaler }}</p>
      </div>
    </div>
    <div class="quarantine-xq1">
      <div class="quarantine-xq2">
        <p>进厂日期：</p>
        <p>{{ headerList.enterTime }}</p>
      </div>
      <div class="quarantine-xq2">
        <p>实际进厂数量(只)：</p>
        <p>{{ headerList.practicalEnterNum }}</p>
      </div>
      <div class="quarantine-xq2">
        <p>异常数量(只)：</p>
        <p style="color:#F5222D;">{{ headerList.abnormalNum }}</p>
      </div>
      <div class="quarantine-xq2">
        <p>准宰数量(只)：</p>
        <p>{{ headerList.allowKillNum }}</p>
      </div>
    </div>
    <div class="quarantine-xq1">
      <div class="quarantine-xq2">
        <p>合格数量(只)：</p>
        <p>{{ headerList.qualifiedNum }}</p>
      </div>
      <div class="quarantine-xq2">
        <p>检疫状态：</p>
        <p>
          {{
            headerList.quarantineStatus === 1
              ? '准入检疫-等待'
              : headerList.quarantineStatus === 2
                ? '准入检疫-通过'
                : headerList.quarantineStatus === 3
                  ? '准入检疫-异常'
                  : headerList.quarantineStatus === 4
                    ? '准宰检疫-等待'
                    : headerList.quarantineStatus === 5
                      ? '准宰检疫-通过'
                      : headerList.quarantineStatus === 6
                        ? '准宰检疫-异常'
                        : headerList.quarantineStatus === 7
                          ? '准出检疫-等待'
                          : headerList.quarantineStatus === 8
                            ? '准出检疫-通过'
                            : headerList.quarantineStatus === 9
                              ? '准出检疫-异常'
                              : ''
          }}
        </p>
      </div>
      <div class="quarantine-xq2">
        <p>提货单号：</p>
        <p>{{ headerList.pickupOddNum }}</p>
      </div>
      <div class="quarantine-xq2">
        <p>提货车牌号：</p>
        <p>{{ headerList.pickupPlateNumbers }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import headerTitle from '@/components/headerTitle'
export default {
  components: {
    headerTitle
  },
  props: ['title', 'routepush', 'headerList'],
  data() {
    return {}
  },
  created() {},
  methods: {
    goback(e) {
      this.$router.push({
        path: e
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.quarantine-Top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  line-height: 54px;
  /deep/.el-button {
    width: 64px;
    height: 35px;
    line-height: 0 !important;
    text-align: center !important;
    padding: 0;
  }
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
.quarantine-line {
  width: 100%;
  height: 1px;
  background-color: #e8e8e8;
  margin: 0 auto;
  margin-bottom: 20px;
}
.quarantine-line1 {
  width: 100%;
  height: 1px;
  background-color: #e8e8e8;
  margin: 0 auto;
  margin-bottom: 10px;
  margin-top: 20px;
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
    // justify-content: space-between;
    width: 25%;
    font-size: 14px;
    color: #000000;
    opacity: 0.4;
    font-family: PingFang SC;
    p:nth-of-type(1) {
      // width: 51%;
      text-align: right;
      margin-right: 15px;
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
</style>
