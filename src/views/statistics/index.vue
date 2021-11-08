<!--
 * @Author: your name
 * @Date: 2020-05-27 18:43:25
 * @LastEditTime: 2020-05-27 18:44:34
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \smart_space_admin\src\views\dashboard\index.vue
-->
<template>
  <div class="parent-template">
    <div>
      <div class="dashboard-container  detail-con">

        <div class="item-con">
          <div class="sub-title-bar bob1">
            <p class="sub-t">业务统计</p>
            <el-select v-model="branchId" filterable :disabled="isshowBtn!=='0'" placeholder="总部" @change="changeEcharts">
              <el-option
                v-for="item in branchList"
                :key="item.id"
                :label="item.branchName"
                :value="item.id"
              />
            </el-select>
          </div>
          <div class="item_charts">
            <div id="businessCharts" class="line-bar" />
            <div class="text-bar">
              <!-- 横线 -->
              <div class="line-l" />
              <!-- 竖线 -->
              <div class="line-v" />
              <div @click="goRouter('/informations/information/merchant')">
                <div class="each-bar">
                  <span class="t">商户总数：</span>
                  <span class="m d">
                    <span class="num">{{ businessData.merchantCount }}</span>
                    <i
                      v-if="businessData.merchantisshowADD"
                      class="el-icon-top green"
                    />
                    <i
                      v-if="!businessData.merchantisshowADD"
                      class="el-icon-bottom red"
                    />
                    <span
                      v-if="businessData.merchantisshowADD"
                      class="green"
                    >+</span>
                    <span
                      :class="businessData.merchantisshowADD ? 'green' : 'red'"
                    >{{ businessData.merchantincreaseCount }}</span>
                  </span>
                </div>
                <div class="rate-bar">
                  <span>较{{ monthNow }}月同比{{
                    businessData.merchantisshowADD ? '增长' : '降低'
                  }}：</span>
                  <span
                    :class="businessData.merchantisshowADD ? 'green' : 'red'"
                  >{{ businessData.merchanincreasePercentum }}</span>
                </div>
              </div>
              <div
                class="pl30"
                @click="goRouter('/informations/information/wholesaler')"
              >
                <div class="each-bar">
                  <span class="t">批发商总数：</span>
                  <span class="m r">
                    <span class="num">{{ businessData.wholesalerCount }}</span>
                    <i
                      v-if="businessData.wholesalerisshowADD"
                      class="el-icon-top green"
                    />
                    <i
                      v-if="!businessData.wholesalerisshowADD"
                      class="el-icon-bottom red"
                    />
                    <span
                      v-if="businessData.wholesalerisshowADD"
                      class="green"
                    >+</span>
                    <span
                      :class="
                        businessData.wholesalerisshowADD ? 'green' : 'red'
                      "
                    >{{ businessData.wholesalerincreaseCount }}</span>
                  </span>
                </div>
                <div class="rate-bar">
                  <span>较{{ monthNow }}月同比{{
                    businessData.wholesalerisshowADD ? '增长' : '降低'
                  }}：</span>
                  <span
                    :class="businessData.wholesalerisshowADD ? 'green' : 'red'"
                  >{{ businessData.wholesalerincreasePercentum }}</span>
                </div>
              </div>
              <div @click="goRouter('/informations/information/driver')">
                <div class="each-bar">
                  <span class="t">司机总数：</span>
                  <span class="m c">
                    <span class="num">{{ businessData.driverCount }}</span>
                    <i
                      v-if="businessData.driverisshowADD"
                      class="el-icon-top green"
                    />
                    <i
                      v-if="!businessData.driverisshowADD"
                      class="el-icon-bottom red"
                    />
                    <span
                      v-if="businessData.driverisshowADD"
                      class="green"
                    >+</span>
                    <span
                      :class="businessData.driverisshowADD ? 'green' : 'red'"
                    >{{ businessData.driverincreaseCount }}</span>
                  </span>
                </div>
                <div class="rate-bar">
                  <span>较{{ monthNow }}月同比{{
                    businessData.driverisshowADD ? '增长' : '降低'
                  }}：</span>
                  <span
                    :class="businessData.driverisshowADD ? 'green' : 'red'"
                  >{{ businessData.driverincreasePercentum }}</span>
                </div>
              </div>
              <div
                class="pl30"
                @click="goRouter('/informations/information/farm')"
              >
                <div class="each-bar">
                  <span class="t">养殖场总数：</span>
                  <span class="m h">
                    <span class="num">{{ businessData.farmCount }}</span>
                    <i
                      v-if="businessData.farmisshowADD"
                      class="el-icon-top green"
                    />
                    <i
                      v-if="!businessData.farmisshowADD"
                      class="el-icon-bottom red"
                    />
                    <span
                      v-if="businessData.farmisshowADD"
                      class="green"
                    >+</span>
                    <span
                      :class="businessData.farmisshowADD ? 'green' : 'red'"
                    >{{ businessData.farmincreaseCount }}</span>
                  </span>
                </div>
                <div class="rate-bar">
                  <span>较{{ monthNow }}月同比{{
                    businessData.farmisshowADD ? '增长' : '降低'
                  }}：</span>
                  <span :class="businessData.farmisshowADD ? 'green' : 'red'">{{
                    businessData.farmincreasePercentum
                  }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="item-con">
          <div class="sub-title-bar bob1">
            <p class="sub-t">检疫统计</p>
            <div>
              <el-button size="mini" @click="getData('today')">今日</el-button>
              <el-button size="mini" @click="getData('week')">本周</el-button>
              <el-button size="mini" @click="getData('mouth')">本月</el-button>
              <el-button size="mini" @click="getData('year')">本年</el-button>
              <el-date-picker
                v-model="QuarantineD"
                class="mgr20"
                type="daterange"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                size="mini"
                @change="getData('Userdata')"
              />
            </div>
          </div>
          <div class="item_charts item_chartsss">
            <div class="l3">
              <div class="l-l">
                <p class="l18 mgb30">
                  准入检疫：
                </p>
                <p
                  v-for="(item, index) in showQuarantineData[0]"
                  :key="index"
                  class="mgb15"
                >
                  <span class="title">
                    {{ item.name }}({{ index === 2 ? '公斤' : '只' }})：
                  </span>
                  <span
                    :class="
                      index === 0 ? 'co-o' : index === 1 ? 'co-p' : 'co-q'
                    "
                  >
                    {{ item.value }}
                  </span>
                </p>
              </div>
              <div id="businessPie0" class="l-r" />
              <div
                class="more"
                @click="toMore('/quarantine/quarantinelist/access')"
              >
                更多>
              </div>
            </div>
            <div class="l3">
              <div class="l-l">
                <p class="l18 mgb30">
                  准宰检疫：
                </p>
                <p
                  v-for="(item, index) in showQuarantineData[1]"
                  :key="index"
                  class="mgb15"
                >
                  <span class="title">
                    {{ item.name }}({{ index === 2 ? '公斤' : '只' }})：
                  </span>
                  <span
                    :class="
                      index === 0 ? 'co-o' : index === 1 ? 'co-p' : 'co-q'
                    "
                  >
                    {{ item.value }}
                  </span>
                </p>
              </div>
              <div id="businessPie1" class="l-r" />
              <div
                class="more"
                @click="toMore('/quarantine/quarantinelist/slaughter')"
              >
                更多>
              </div>
            </div>
            <div class="l3">
              <div class="l-l">
                <p class="l18 mgb30">
                  准出检疫：
                </p>
                <p
                  v-for="(item, index) in showQuarantineData[2]"
                  :key="index"
                  class="mgb15"
                >
                  <span class="title">
                    {{ item.name }}({{ index === 2 ? '公斤' : '只' }})：
                  </span>
                  <span
                    :class="
                      index === 0 ? 'co-o' : index === 1 ? 'co-p' : 'co-q'
                    "
                  >
                    {{ item.value }}
                  </span>
                </p>
              </div>
              <div id="businessPie2" class="l-r" />
              <div
                class="more"
                @click="toMore('/quarantine/quarantinelist/out')"
              >
                更多>
              </div>
            </div>
          </div>
          <div class="jy-btn">
            <span>生猪无害化处理总数（只）:</span>
            <span class="blue-jy">{{ livePigharmlessTreatment }}</span>
            <span>病料无害化处理总数（公斤）:</span>
            <span class="blue-jy">{{ illharmlessTreatment }}</span>
          </div>
        </div>
        <div class="item-con" style="flex: 0 0 100%">
          <div class="sub-title-bar bob1">
            <p class="sub-t">调度统计</p>
            <div>
              <el-button
                size="mini"
                @click="getSerizeData('today')"
              >今日</el-button>
              <el-button
                size="mini"
                @click="getSerizeData('week')"
              >本周</el-button>
              <el-button
                size="mini"
                @click="getSerizeData('mouth')"
              >本月</el-button>
              <el-button
                size="mini"
                @click="getSerizeData('year')"
              >本年</el-button>
              <el-date-picker
                v-model="DipshDate"
                class="mgr20"
                type="daterange"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                size="mini"
                @change="getSerizeData('Userdata')"
              />
            </div>
          </div>
          <div class="item_charts" style="flex-wrap:wrap">
            <div class="info-list">
              <p class="">
                <span class="title">
                  实际进厂数：
                </span>
                <span class="co-o">
                  {{ Dipach.practicalEnterNum }}
                </span>
              </p>
              <p class="">
                <span class="title">
                  预配载数：
                </span>
                <span class="co-o">
                  {{ Dipach.preDistributeNum }}
                </span>
              </p>
              <p class="">
                <span class="title">
                  已调度数：
                </span>
                <span class="co-p">
                  {{ Dipach.dispatchedNum }}
                </span>
              </p>
              <p class="">
                <span class="title">
                  未调度数：
                </span>
                <span class="co-q">
                  {{ Dipach.toDispatchNum }}
                </span>
              </p>
              <p class="">
                <span class="title">
                  配载车次：
                </span>
                <span class="co-p">
                  {{ Dipach.stowageNum }}
                </span>
              </p>
            </div>
            <div id="serizeLine" class="charts-con" />
          </div>
        </div>
        <div class="item-con item-cons" style="flex: 0 0 100%">
          <div class="sub-title-bar bob1">
            <p class="sub-t">生猪统计</p>
            <div>
              <el-button
                size="mini"
                @click="getPigData('today')"
              >今日</el-button>
              <el-button
                size="mini"
                @click="getPigData('week')"
              >本周</el-button>
              <el-button
                size="mini"
                @click="getPigData('mouth')"
              >本月</el-button>
              <el-button
                size="mini"
                @click="getPigData('year')"
              >本年</el-button>
              <el-date-picker
                v-model="pigDate"
                class="mgr20"
                type="daterange"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                size="mini"
                @change="getPigData('Userdata')"
              />
            </div>
          </div>
          <div class="item_charts">
            <div class="l3" style="width:100%;flex:0 0 100%;">
              <div class="l-l" style="flex:0 0 20%">
                <p class="l18 mgb30">
                  生猪来源地区数量统计（只）：
                </p>
                <p class="mgb15">
                  <span class="title">
                    本市数量：
                  </span>
                  <span class="co-o">
                    {{ liveData.cityCount }}
                  </span>
                </p>
                <p class="mgb15">
                  <span class="title">
                    省内市外数量：
                  </span>
                  <span class="co-p">
                    {{ liveData.outSideCityCount }}
                  </span>
                </p>
                <p class="mgb15">
                  <span class="title">
                    省外数量：
                  </span>
                  <span class="co-q">
                    {{ liveData.outSideProvinceCount }}
                  </span>
                </p>
              </div>
              <div id="pigPie" class="l-rs" style="flex: 0 0 40%" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Static from '@/api/Static'
import getTimeSpan from '@/utils/getTimeSpan'
import { branchDropDown } from '@/utils/mixin'
var moment = require('moment')
moment().format()
export default {
  name: 'Admin',
  mixins: [branchDropDown],
  data() {
    return {
      businessDate: '',
      colorObj: [
        'rgba(91, 143, 249, .95)', // 蓝色
        'rgba(90, 216, 166, .95)', // 绿色
        'rgba(244, 102, 74, .95)', // 橙色
        'rgba(93, 112, 146, .95)' // 灰色
      ],
      // 检疫统计数据
      quarantineData: {},
      livePigData: {},
      liveData: [],
      showQuarantineData: [],
      dispatch: {},
      weekDurtion: [],
      dayDurtion: [],
      yearDurtion: [],
      monthDurtion: [],
      monthNow: '',
      businessData: {},
      businessEchartsData: [],
      DispatchstartDate: '',
      DispatchendDate: '',
      Dipach: {},
      DipshDate: '',
      pigDate: '',
      QuarantineD: '',
      businessEchartsDataX: [],
      livePigharmlessTreatment: '',
      illharmlessTreatment: '',
      jyTime: [],
      branchId: localStorage.getItem('nowbranchDropDown')
    }
  },
  created() {
    // this.func()
  },
  activated() {
    this.branchId = localStorage.getItem('userTypeSW') === '0' ? '' : localStorage.getItem('nowbranchDropDown')
    this.QuarantineD = ''
    this.pigDate = ''
    this.DipshDate = ''
    this.monthDurtion = getTimeSpan('month', 'YYYY-MM-DD HH:mm:ss')
    this.jyTime = this.monthDurtion
    // 业务统计
    this.func()
    // 检疫统计
    this.quarantineDataDTOS(this.monthDurtion[0], this.monthDurtion[1])
    // 调度统计
    this.postselectDispatchStatisticsd(
      this.monthDurtion[0],
      this.monthDurtion[1]
    )
    // 生猪统计
    this.postlivePigStatistics(this.monthDurtion[0], this.monthDurtion[1])
  },
  methods: {
    changeEcharts(val) {
      this.quarantineDataDTOS(this.monthDurtion[0], this.monthDurtion[1])
      this.func()
      // 调度统计
      this.postselectDispatchStatisticsd(
        this.monthDurtion[0],
        this.monthDurtion[1]
      )
      // 生猪统计
      this.postlivePigStatistics(this.monthDurtion[0], this.monthDurtion[1])
    },
    toMore(router) {
      console.log(this.jyTime)
      this.$router.push({
        path: router,
        query: {
          time: JSON.stringify(this.jyTime),
          branchId: this.branchId
        }
      })
    },
    goRouter(router) {
      this.$router.push({
        path: router,
        query: {
          branchId: this.branchId
        }
      })
    },
    // 生猪统计
    postlivePigStatistics(startDate, endDate) {
      const data = {
        branchId: this.branchId,
        startTime: startDate,
        endTime: endDate
      }

      this.livePigData = []
      Static.postlivePigStatistics(data).then(res => {
        this.liveData = res.result

        this.livePigData = [
          { value: this.liveData.cityCount, name: '本市数量' },
          { value: this.liveData.outSideCityCount, name: '省内市外数量' },
          { value: this.liveData.outSideProvinceCount, name: '省外数量' }
        ]
        const is0 = this.livePigData.every(v => v.value == 0)
        if (!is0) {
          this.livePigData = this.livePigData.filter(v => v.value != 0)
        }
        this.livepig(this.livePigData)
      })
    },
    postselectDispatchStatisticsd(startDate, endDate) {
      const data = {
        branchId: this.branchId,
        startDate: startDate,
        endDate: endDate
      }
      Static.postselectDispatchStatistics(data).then(res => {
        this.Dipach = res.result
        this.dispatch.date = res.result.tables.map(v => {
          return v.abscissaItem
        })
        this.dispatch.data = res.result.tables.map(v => {
          return v.ordinate
        })
        this.serizeLine(this.dispatch)
      })
    },
    func() {
      this.weekDurtion = getTimeSpan('week', 'YYYY-MM-DD HH:mm:ss')
      this.dayDurtion = getTimeSpan('today', 'YYYY-MM-DD HH:mm:ss')
      this.yearDurtion = getTimeSpan('year', 'YYYY-MM-DD HH:mm:ss')
      this.monthDurtion = getTimeSpan('month', 'YYYY-MM-DD HH:mm:ss')
      this.monthNow = moment().get('month')
      this.monthNow === 0 ? (this.monthNow = 12) : ''
      Static.postBusinessStatistics(`branchId=${this.branchId}`).then(res => {
        if (res.result.datumStatistics.length) {
          this.businessData = {
            merchantCount: res.result.datumStatistics[0].totalCount,
            merchantincreaseCount: res.result.datumStatistics[0].increaseCount,
            merchanincreasePercentum:
              res.result.datumStatistics[0].increasePercentum,
            wholesalerCount: res.result.datumStatistics[1].totalCount,
            wholesalerincreaseCount:
              res.result.datumStatistics[1].increaseCount,
            wholesalerincreasePercentum:
              res.result.datumStatistics[1].increasePercentum,
            driverCount: res.result.datumStatistics[2].totalCount,
            driverincreaseCount: res.result.datumStatistics[2].increaseCount,
            driverincreasePercentum:
              res.result.datumStatistics[2].increasePercentum,
            farmCount: res.result.datumStatistics[3].totalCount,
            farmincreaseCount: res.result.datumStatistics[3].increaseCount,
            farmincreasePercentum:
              res.result.datumStatistics[3].increasePercentum
          }

          String(this.businessData.merchantincreaseCount).substr(0, 1) === '-'
            ? (this.businessData.merchantisshowADD = false)
            : (this.businessData.merchantisshowADD = true)
          String(this.businessData.wholesalerincreaseCount).substr(0, 1) === '-'
            ? (this.businessData.wholesalerisshowADD = false)
            : (this.businessData.wholesalerisshowADD = true)
          String(this.businessData.driverincreaseCount).substr(0, 1) === '-'
            ? (this.businessData.driverisshowADD = false)
            : (this.businessData.driverisshowADD = true)
          String(this.businessData.farmincreaseCount).substr(0, 1) === '-'
            ? (this.businessData.farmisshowADD = false)
            : (this.businessData.farmisshowADD = true)
        }

        this.businessEchartsData = res.result.dataStatistics.map(v => {
          return Object.values(v)
        })
        this.businessEchartsDataX = res.result.dataStatistics.map(v => {
          return v.month
        })

        this.business()
      })
    },
    // 业务统计
    business() {
      // 基于准备好的dom，初始化echarts实例

      const myChart = this.$echarts.init(
        document.getElementById('businessCharts')
      )
      // 绘制图表
      var dataOptions = [
        '商户数量',
        '司机数量',
        '批发商数量',
        '养殖场数量'
      ].map((v, i) => {
        return {
          itemStyle: {
            color: this.colorObj[i],
            showBackground: true
          },
          name: v,
          type: 'bar',
          barWidth: '20%',
          barGap: 0
        }
      })

      const option = {
        tooltip: {
          trigger: 'axis',
          backgroundColor: '#fff',
          textStyle: {
            color: 'rgba(0, 0, 0, .65)',
            fontSize: 12
          },
          formatter: params => {
            // 获取xAxis data中的数据
            let dataStr = `<div><p style="font-weight:bold;margin:0 8px 5px;">${params[0].name}</p></div>`
            params.forEach((item, i) => {
              dataStr += `<div>
          <div style="margin: 0 8px;">
            <span style="display:inline-block;margin-right:5px;width:10px;height:10px;background-color:${
  item.color
};"></span>
            <span>${item.seriesName}</span>
            <span style="float:right;color:#000000;margin-left:20px;">${
  item.data[i + 1]
}</span>
          </div>
        </div>`
            })
            return dataStr
          },
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'line' // 默认为直线，可选为：'line' | 'shadow'
          }
        },

        legend: {
          data: ['商户数量', '司机数量', '批发商数量', '养殖场数量'],
          left: '0%',
          top: 30,
          itemHeight: 8,
          itemWidth: 8,
          itemGap: 16,
          textStyle: {
            color: 'rgba(0, 0, 0, .65)',
            fontSize: 12,
            padding: [4, 0, 0, 5]
          }
        },
        grid: {
          top: 80,
          left: '3%',
          right: '5%',
          bottom: '0',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: this.businessEchartsDataX,
          axisLine: {
            lineStyle: {
              color: 'rgba(0, 0, 0, .15)'
            }
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            color: 'rgba(0, 0, 0, .45)'
          }
        },
        calculable: true,
        yAxis: {
          name: '数量',
          nameLocation: 'center',
          nameGap: 30,
          nameTextStyle: {
            color: 'rgba(0, 0, 0, .65)',
            padding: [0, 15]
          },
          type: 'value',
          splitLine: {
            show: true,
            lineStyle: {
              color: 'rgba(0, 0, 0, .15)'
            }
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: '#21bcfe'
            }
          },
          axisTick: {
            show: false,
            color: '#ccc'
          },
          axisLabel: {
            color: 'rgba(0, 0, 0, .45)'
          }
        },
        dataset: {
          source: this.businessEchartsData
        },
        // series: dataOptions
        series: [...dataOptions]
      }
      myChart.setOption(option)
      window.addEventListener('resize', function() {
        myChart.resize()
      })
    },
    // 检疫统计
    quarantineDataDTOS(startDate, endDate) {
      const data = {
        branchId: this.branchId,
        startTime: startDate,
        endTime: endDate
      }
      Static.postquarantineStatistics(data).then(res => {
        this.quarantineData = res.result.quarantineDataDTOS.map(v => {
          return [
            { value: v.passCount, name: '检疫通过数' },
            { value: v.abnormalCount, name: '检疫异常数' }
          ]
        })
        this.showQuarantineData = res.result.quarantineDataDTOS.map(v => {
          return [
            { value: v.passCount, name: '检疫通过数' },
            { value: v.abnormalCount, name: '检疫异常数' },
            { value: v.illWeight, name: '病料重量' }
          ]
        })

        this.illharmlessTreatment = res.result.illharmlessTreatment
        this.livePigharmlessTreatment = res.result.livePigharmlessTreatment
        const is0 = this.quarantineData[0].every(v => v.value == 0)
        const is1 = this.quarantineData[1].every(v => v.value == 0)
        const is2 = this.quarantineData[2].every(v => v.value == 0)

        if (!is0) {
          this.quarantineData[0] = this.quarantineData[0].filter(
            v => v.value != 0
          )
        }
        if (!is1) {
          this.quarantineData[1] = this.quarantineData[1].filter(
            v => v.value != 0
          )
        }
        if (!is2) {
          this.quarantineData[2] = this.quarantineData[2].filter(
            v => v.value != 0
          )
        }
        this.quarantine(this.quarantineData)
      })
    },
    // 检疫统计
    quarantine(res) {
      const _this = this
      const myChart = this.$echarts.init(
        document.getElementById('businessPie0')
      )
      const myChart1 = this.$echarts.init(
        document.getElementById('businessPie1')
      )
      const myChart2 = this.$echarts.init(
        document.getElementById('businessPie2')
      )
      function setOption(quarantineData) {
        const le = ['检疫通过数', ' 检疫异常数', '生猪死亡数']
        var data = quarantineData.map((v, i) => {
          let index = i
          if (v.name === '检疫通过数') {
            index = 1
          } else if (v.name === '检疫异常数') {
            index = 0
          } else {
            index = 2
          }
          v.itemStyle = { color: _this.colorObj[index] }
          return v
        })
        return {
          tooltip: {
            trigger: 'item',
            formatter: parmas => {
              const str = `<div><p style="color:#ccc">${parmas.data.name}</p><div style="display:flex;align-items: center;margin-top:5px"><span style="display:block;width:10px;height:10px;border-radius: 50%;background-color:${parmas.color};margin-right:5px;"></span>${parmas.data.value}只<span style="margin-left:20px;">${parmas.percent}%</span></div></div>`
              return str
            },
            backgroundColor: '#fff',
            textStyle: {
              color: 'rgba(0, 0, 0, .65)',
              fontSize: 10
            }
          },
          grid: {
            top: 80,
            left: '0%',
            right: '5%',
            bottom: '0',
            containLabel: true
          },
          series: [
            {
              type: 'pie',
              radius: '90%',
              center: ['50%', '50%'],
              minAngle: 5,
              height: '75%',
              avoidLabelOverlap: true,
              label: {
                position: 'outer',
                alignTo: 'edge',
                normal: {
                  formatter(v) {
                    let text = v.percent + '%'
                    return (text = `${text}\n`)
                  },

                  rich: {
                    time: {
                      fontSize: 10,
                      color: '#999'
                    }
                  },
                  textStyle: {
                    // 字体大小
                    fontSize: 12
                  }
                }
              },
              labelLine: {
                lineStyle: {
                  color: '#848484'
                }
              },
              data: data,
              animation: false,
              left: 0,
              top: 30,
              right: 0,
              bottom: 0
            }
          ]
        }
      }
      myChart.setOption(setOption(res[0]))
      myChart1.setOption(setOption(res[1]))
      myChart2.setOption(setOption(res[2]))
      window.addEventListener('resize', function() {
        myChart.resize()
        myChart1.resize()
        myChart2.resize()
      })
    },
    // 调度统计
    serizeLine(list = '') {
      const res = list || {
        date: this.dispatch.date.slice(0, 31),
        data: this.dispatch.data.slice(0, 31)
      }
      const myChart = this.$echarts.init(document.getElementById('serizeLine'))
      // 绘制图表
      const option = {
        title: {
          padding: [0, 10, 20, 0],
          text: '调度数趋势',
          textStyle: {
            color: 'rgba(0, 0, 0, 0.65)',
            fontSize: 14,
            fontFamily: 'sans-serif'
          }
        },
        tooltip: {
          trigger: 'axis',
          backgroundColor: '#fff',
          textStyle: {
            color: 'rgba(0, 0, 0, .65)',
            fontSize: 12
          },
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'line' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          show: false,
          data: ['调度数']
        },
        grid: {
          top: 30,
          left: '0%',
          right: '3%',
          bottom: '0',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: res.date,
          axisLine: {
            lineStyle: {
              color: 'rgba(0, 0, 0, .15)'
            }
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            color: 'rgba(0, 0, 0, .45)'
          }
        },
        calculable: true,
        yAxis: {
          // name: '',
          // nameLocation: 'center',
          // nameGap: 30,
          // nameTextStyle: {
          //   color: 'rgba(0, 0, 0, .65)',
          //   padding: [0, 15]

          // },
          type: 'value',
          splitLine: {
            show: true,
            lineStyle: {
              color: 'rgba(0, 0, 0, .15)'
            }
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: '#21bcfe'
            }
          },
          axisTick: {
            show: false,
            color: '#ccc'
          },
          axisLabel: {
            color: 'rgba(0, 0, 0, .45)'
          }
        },
        // series: dataOptions
        series: [
          {
            data: res.data,
            type: 'line',
            symbol: 'circle',
            symbolSize: 5,
            itemStyle: {
              color: 'rgba(91, 143, 249, 1)'
            }
          }
        ]
      }
      myChart.setOption(option)
      window.addEventListener('resize', function() {
        myChart.resize()
      })
    },
    // -------------------
    getSerizeData(dataType) {
      this.weekDurtion = getTimeSpan('week', 'YYYY-MM-DD HH:mm:ss')
      this.dayDurtion = getTimeSpan('today', 'YYYY-MM-DD HH:mm:ss')
      this.yearDurtion = getTimeSpan('year', 'YYYY-MM-DD HH:mm:ss')
      this.monthDurtion = getTimeSpan('month', 'YYYY-MM-DD HH:mm:ss')
      if (dataType === 'today') {
        this.postselectDispatchStatisticsd(
          this.dayDurtion[0],
          this.dayDurtion[1]
        )
      } else if (dataType === 'week') {
        this.postselectDispatchStatisticsd(
          this.weekDurtion[0],
          this.weekDurtion[1]
        )
      } else if (dataType === 'mouth') {
        this.postselectDispatchStatisticsd(
          this.monthDurtion[0],
          this.monthDurtion[1]
        )
      } else if (dataType === 'Userdata') {
        this.postselectDispatchStatisticsd(
          this.DipshDate[0] + ' 00:00:00',
          this.DipshDate[1] + ' 23:59:59'
        )
      } else {
        this.postselectDispatchStatisticsd(
          this.yearDurtion[0],
          this.yearDurtion[1]
        )
      }
    },
    // 生猪统计
    livepig(res) {
      const _this = this

      const myChart = this.$echarts.init(document.getElementById('pigPie'))
      function setOption() {
        const le = ['本市数量', ' 省内市外数量', '省外数量']
        var data = res.map((v, i) => {
          let index = i
          if (v.name === '本市数量') {
            index = 1
          } else if (v.name === '省内市外数量') {
            index = 0
          } else {
            index = 2
          }
          v.itemStyle = { color: _this.colorObj[index] }
          return v
        })
        return {
          tooltip: {
            trigger: 'item',
            formatter: parmas => {
              const str = `<div><p style="color:#ccc">${parmas.data.name}</p><div style="display:flex;align-items: center;margin-top:5px"><span style="display:block;width:10px;height:10px;border-radius: 50%;background-color:${parmas.color};margin-right:5px;"></span>${parmas.data.value}只<span style="margin-left:20px;">${parmas.percent}%</span></div></div>`
              return str
            },
            backgroundColor: '#fff',
            textStyle: {
              color: 'rgba(0, 0, 0, .65)',
              fontSize: 12
            }
          },
          legend: {
            show: false
          },
          series: [
            {
              type: 'pie',
              radius: '90%',
              center: ['50%', '50%'],
              minAngle: 5,
              height: '80%',
              avoidLabelOverlap: true,
              label: {
                position: 'outer',
                normal: {
                  formatter(v) {
                    let text = v.name + ':' + v.percent + '%'
                    return (text = `${text}\n`)
                  },
                  textStyle: {
                    // 字体大小
                    fontSize: 12
                  }
                }
              },
              labelLine: {
                lineStyle: {
                  color: '#848484'
                }
              },
              data: data,
              animation: false,
              left: 0,
              top: 40,
              right: 0,
              bottom: 0
            }
          ]
        }
      }
      myChart.setOption(setOption('123'))
      window.addEventListener('resize', function() {
        myChart.resize()
      })
    },
    getData(dataType) {
      this.weekDurtion = getTimeSpan('week', 'YYYY-MM-DD HH:mm:ss')
      this.dayDurtion = getTimeSpan('today', 'YYYY-MM-DD HH:mm:ss')
      this.yearDurtion = getTimeSpan('year', 'YYYY-MM-DD HH:mm:ss')
      this.monthDurtion = getTimeSpan('month', 'YYYY-MM-DD HH:mm:ss')
      if (dataType === 'today') {
        this.jyTime = this.dayDurtion
        this.quarantineDataDTOS(this.dayDurtion[0], this.dayDurtion[1])
      } else if (dataType === 'week') {
        this.jyTime = this.weekDurtion

        this.quarantineDataDTOS(this.weekDurtion[0], this.weekDurtion[1])
      } else if (dataType === 'mouth') {
        this.jyTime = this.monthDurtion

        this.quarantineDataDTOS(this.monthDurtion[0], this.monthDurtion[1])
      } else if (dataType === 'Userdata') {
        this.jyTime = [
          this.QuarantineD[0] + ' 00:00:00',
          this.QuarantineD[1] + ' 23:59:59'
        ]
        this.quarantineDataDTOS(
          this.QuarantineD[0] + ' 00:00:00',
          this.QuarantineD[1] + ' 23:59:59'
        )
      } else {
        this.jyTime = this.yearDurtion
        this.quarantineDataDTOS(this.yearDurtion[0], this.yearDurtion[1])
      }
    },
    getPigData(dataType) {
      this.weekDurtion = getTimeSpan('week', 'YYYY-MM-DD HH:mm:ss')
      this.dayDurtion = getTimeSpan('today', 'YYYY-MM-DD HH:mm:ss')
      this.yearDurtion = getTimeSpan('year', 'YYYY-MM-DD HH:mm:ss')
      this.monthDurtion = getTimeSpan('month', 'YYYY-MM-DD HH:mm:ss')
      if (dataType === 'today') {
        this.postlivePigStatistics(this.dayDurtion[0], this.dayDurtion[1])
      } else if (dataType === 'week') {
        this.postlivePigStatistics(this.weekDurtion[0], this.weekDurtion[1])
      } else if (dataType === 'mouth') {
        this.postlivePigStatistics(this.monthDurtion[0], this.monthDurtion[1])
      } else if (dataType === 'Userdata') {
        this.postlivePigStatistics(
          this.pigDate[0] + ' 00:00:00',
          this.pigDate[1] + ' 23:59:59'
        )
      } else {
        this.postlivePigStatistics(this.yearDurtion[0], this.yearDurtion[1])
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.more {
  position: absolute;
  right: 20px;
  color: rgb(0, 140, 255);
  cursor: pointer;
}
.jy-btn {
  margin-top: 5px;

  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;

  .blue-jy {
    font-size: 25px;
    margin: 0 15px;
    color: rgb(0, 140, 255);
  }
}
.red {
  display: inline-block;
  color: red;
}
.green {
  display: inline-block;

  color: #62daaa;
}
.detail-con {
  display: flex;
  flex-wrap: wrap;
}
.item_chartsss {
  height: calc(100% - 100px) !important;
  display: flex;
}

.item-con {
  flex: 0 0 100%;
  height: 370px;
  .item_charts {
    height: calc(100% - 70px);
    display: flex;
    .line-bar {
      width: 60%;
    }

    //业务统计
    .text-bar {
      .line-l,
      .line-v {
        position: absolute;
        background: #e8e8e8;
      }
      .line-l {
        width: 96%;
        top: 51%;
        right: 5%;
        height: 1px;
      }
      .line-v {
        height: 80%;
        width: 1px;
        left: 49%;
        top: 11%;
      }
      display: flex;
      flex-wrap: wrap;
      position: relative;
      > div {
        flex: 0 0 50%;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        align-content: center;
      }
      .c {
        color: #62daaa;
      }
      .r {
        color: rgba(244, 109, 83, 1);
      }
      .d {
        color: rgba(99, 148, 249, 1);
      }
      .h {
        color: rgba(93, 112, 146, 0.95);
      }
      width: 40%;
      .each-bar {
        flex: 0 0 100%;
        margin-bottom: 10px;
        .t {
          font-size: 16px;
          color: #000;
        }
        .m {
          margin-left: 5px;
          .num {
            font-size: 32px;
            letter-spacing: 0px;
          }
        }
      }
      .rate-bar {
        flex: 0 0 100%;
        font-size: 14px;
        color: rgba(0, 0, 0, 0.65);
      }
    }

    // 检疫统计
    .l3 {
      flex: 0 0 33.33%;
      display: flex;
      padding-top: 26px;
      position: relative;
      .l-l {
        flex: 0 0 35%;
        height: calc(100%);
        .mgb15 {
          .title {
            font-size: 15px;
            color: rgba(0, 0, 0, 0.85);
          }
          .info {
            font-size: 20px;
          }
        }
      }
      .l-r {
        flex: 0 0 65%;
        height: calc(100%);
      }
    }
    .l-rs {
      flex: 0 0 65%;
      height: calc(120%);
    }
    //调度统计
    .info-list {
      width: 100%;
      flex: 0 0 100%;
      height: 18px;
      margin: 20px 0;
      display: flex;
      justify-content: flex-start;
      p {
        flex: 0 0 20%;
      }
    }
    .charts-con {
      flex: 0 0 100%;
      height: calc(100% - 58px);
    }
  }
  .sub-title-bar {
    button {
      color: rgba(66, 133, 244, 1);
    }
    .el-date-editor--daterange.el-input__inner {
      width: 250px;
    }
  }
}
.pl30 {
  padding-left: 30px;
}
.mgr20 {
  margin-left: 20px;
}
.mgb30 {
  margin-bottom: 30px;
}
.mgb15 {
  margin-bottom: 15px;
}
.co-o {
  color: rgba(90, 216, 166, 1);
}
.co-p {
  color: rgba(91, 143, 249, 1);
}
.co-q {
  color: rgba(244, 109, 83, 1);
}
</style>
