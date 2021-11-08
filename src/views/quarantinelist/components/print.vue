<template>
  <div class="printss" style="padding:20px 50px">
    <div class="footer-test">
      <span>( 第 ___ 几页,共 ___ 页 ) 抽样人签名：</span>
      <span>官方兽医签名：</span>
    </div>
    <div
      v-show="saveSwFeverDeReqDtos.length > 0 ? true : false"
      style="margin-top:10px;"
    >
      <table
        border="1"
        class="pure-table pure-table-bordered"
        style="width:100%"
      >
        <caption align="top" style="margin-left: 450px;">
          顺德区农产品非洲猪瘟检测登记
        </caption>
        <thead>
          <tr style="text-align:center">
            <th>序号</th>
            <th>检测日期</th>
            <th>货主姓名</th>
            <th>车牌号码</th>
            <th>来源（产地）</th>
            <th>动物检疫合格证号</th>
            <th>同批次屠宰量</th>
            <th>采样数量</th>
            <th>样品编号</th>
            <th>采样地点</th>
            <th>采样类型</th>
            <th>试剂生产厂家</th>
            <th>试剂批号</th>
            <th>检测方法</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in saveSwFeverDeReqDtos"
            :key="index"
            style="text-align:center"
          >
            <td>{{ index + 1 }}</td>
            <td>{{ item.detectionDate }}</td>
            <td>{{ item.shipper }}</td>
            <td>{{ item.plateNumbers }}</td>
            <td>{{ item.origin.replace(/,/g, '') }}</td>
            <td>{{ item.quarantineCertificateNum }}</td>
            <td>{{ item.sameBatchNum }}</td>
            <td>{{ item.sampleNum }}</td>
            <td>{{ item.specimenNo }}</td>
            <td>
              {{
                item.sampleLocation === 1
                  ? '入厂前'
                  : item.sampleLocation === 2
                    ? '屠宰前'
                    : '待宰前'
              }}
            </td>
            <td>{{ item.sampleType }}</td>
            <td>{{ item.reagentManufacturer }}</td>
            <td>{{ item.reagentBatchNum }}</td>
            <td>{{ item.detectionMethod }}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td><div class="footer" /></td>
          </tr>
        </tfoot>
      </table>
    </div>
    <div v-show="albuterols.length > 0 ? true : false" style="margin-top:20px;">
      <div class="quarantine-tabtitle" />
      <table
        border="1"
        class="pure-table pure-table-bordered"
        style="width:100%"
      >
        <caption align="top" style="margin-left: 350px;">
          顺德区农产品（沙丁胺醇）项抽样检测记录表
        </caption>
        <thead>
          <tr>
            <th>抽样日期</th>
            <th>
              {{ albuterols.length > 0 ? albuterols[0].sampleDate : '' }}
            </th>
            <th>抽样单位</th>
            <th>
              {{ albuterols.length > 0 ? albuterols[0].sampleUnit : '' }}
            </th>
            <th>抽样人</th>
            <th>{{ albuterols.length > 0 ? albuterols[0].sampler : '' }}</th>
            <th>核对人</th>
            <th>{{ albuterols.length > 0 ? albuterols[0].collator : '' }}</th>
          </tr>
        </thead>
      </table>
      <table
        border="1"
        class="pure-table pure-table-bordered"
        style="width:100%"
      >
        <thead>
          <tr>
            <th rowspan="2">序号</th>
            <th rowspan="2">样品名称</th>
            <th rowspan="2">样品编号</th>
            <th rowspan="2">抽样数量</th>
            <th rowspan="2">抽样基数</th>
            <th rowspan="2">抽样地点</th>
            <th colspan="3" style="text-align:center;">样品来源</th>
            <th rowspan="2">样品类型</th>
            <th rowspan="2">受检单位，联系电话</th>
            <th rowspan="2">受检人</th>
            <th rowspan="2">检测结果</th>
            <th rowspan="2">处理方式</th>
            <th rowspan="2">备注</th>
          </tr>
          <tr>
            <!-- <th rowspan="2">序号</th> -->
            <!-- <th>样品名称</th> -->
            <!-- <th>样品编号</th> -->
            <!-- <th>抽样数量</th> -->
            <!-- <th>抽样基数</th> -->
            <!-- <th>抽样地点</th> -->
            <th style="border-top:1px solid black;">省</th>
            <th style="border-top:1px solid black;">市</th>
            <th style="border-top:1px solid black;">区</th>
            <!-- <th>样品类型</th> -->
            <!-- <th>受检单位，联系电话</th> -->
            <!-- <th>受检人</th> -->
            <!-- <th>检测结果</th> -->
            <!-- <th>处理方式</th> -->
            <!-- <th>备注</th> -->
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in albuterols" :key="item.index">
            <td>{{ index + 1 }}</td>
            <td>{{ item.specimenName }}</td>
            <td>{{ item.specimenNo }}</td>
            <td>{{ item.sampleNum }}</td>
            <td>{{ item.sampleCardinality }}</td>
            <td>{{ item.sampleLocation }}</td>
            <!-- //------------------------------------------ -->
            <td>{{ item.specimenSource.sheng }}</td>
            <td>{{ item.specimenSource.shi }}</td>
            <td>{{ item.specimenSource.qu }}</td>
            <!-- //------------------------------------------ -->

            <td>{{ item.specimenType }}</td>
            <td>{{ item.unitInspectedTelephone }}</td>
            <td>{{ item.inspectedPeople }}</td>
            <td>{{ item.detectionConsequence === 1 ? '阴性' : '阳性' }}</td>
            <td>{{ item.disposeManner }}</td>
            <td>{{ item.comment }}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td><div class="footer" /></td>
          </tr>
        </tfoot>
      </table>
    </div>
    <div
      v-show="ractopamines.length > 0 ? true : false"
      style="margin-top:20px;"
    >
      <div class="quarantine-tabtitle" />
      <table
        border="1"
        class="pure-table pure-table-bordered"
        style="width:100%"
      >
        <caption align="top" style="margin-left: 330px;">
          顺德区农产品（莱克多巴胺）项抽样检测记录表
        </caption>

        <thead>
          <tr>
            <th>抽样日期</th>
            <th>
              {{ ractopamines.length > 0 ? ractopamines[0].sampleDate : '' }}
            </th>
            <th>抽样单位</th>
            <th>
              {{ ractopamines.length > 0 ? ractopamines[0].sampleUnit : '' }}
            </th>
            <th>抽样人</th>
            <th>
              {{ ractopamines.length > 0 ? ractopamines[0].sampler : '' }}
            </th>
            <th>核对人</th>
            <th>
              {{ ractopamines.length > 0 ? ractopamines[0].collator : '' }}
            </th>
          </tr>
        </thead>
      </table>
      <table
        border="1"
        class="pure-table pure-table-bordered"
        style="width:100%"
      >
        <thead>
          <tr>
            <th rowspan="2">序号</th>
            <th rowspan="2">样品名称</th>
            <th rowspan="2">样品编号</th>
            <th rowspan="2">抽样数量</th>
            <th rowspan="2">抽样基数</th>
            <th rowspan="2">抽样地点</th>
            <th colspan="3" style="text-align:center;">样品来源</th>
            <th rowspan="2">样品类型</th>
            <th rowspan="2">受检单位，联系电话</th>
            <th rowspan="2">受检人</th>
            <th rowspan="2">检测结果</th>
            <th rowspan="2">处理方式</th>
            <th rowspan="2">备注</th>
          </tr>
          <tr>
            <!-- <th rowspan="2">序号</th> -->
            <!-- <th>样品名称</th> -->
            <!-- <th>样品编号</th> -->
            <!-- <th>抽样数量</th> -->
            <!-- <th>抽样基数</th> -->
            <!-- <th>抽样地点</th> -->
            <th style="border-top:1px solid black;">省</th>
            <th style="border-top:1px solid black;">市</th>
            <th style="border-top:1px solid black;">区</th>
            <!-- <th>样品类型</th> -->
            <!-- <th>受检单位，联系电话</th> -->
            <!-- <th>受检人</th> -->
            <!-- <th>检测结果</th> -->
            <!-- <th>处理方式</th> -->
            <!-- <th>备注</th> -->
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in ractopamines" :key="item.index">
            <td>{{ index + 1 }}</td>
            <td>{{ item.specimenName }}</td>
            <td>{{ item.specimenNo }}</td>
            <td>{{ item.sampleNum }}</td>
            <td>{{ item.sampleCardinality }}</td>
            <td>{{ item.sampleLocation }}</td>
            <!-- //------------------------------------------ -->
            <td>{{ item.specimenSource.sheng }}</td>
            <td>{{ item.specimenSource.shi }}</td>
            <td>{{ item.specimenSource.qu }}</td>
            <!-- //------------------------------------------ -->
            <td>{{ item.specimenType }}</td>
            <td>{{ item.unitInspectedTelephone }}</td>
            <td>{{ item.inspectedPeople }}</td>
            <td>{{ item.detectionConsequence === 1 ? '阴性' : '阳性' }}</td>

            <td>{{ item.disposeManner }}</td>
            <td>{{ item.comment }}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td><div class="footer" /></td>
          </tr>
        </tfoot>
      </table>
    </div>
    <div v-show="clens.length > 0 ? true : false" style="margin-top:20px;">
      <div class="quarantine-tabtitle" />
      <table
        border="1"
        class="pure-table pure-table-bordered"
        style="width:100%"
      >
        <caption align="top" style="margin-left: 310px;">
          顺德区农产品（盐酸克伦特罗）项抽样检测记录表
        </caption>
        <thead>
          <tr>
            <th>抽样日期</th>
            <th>{{ clens.length > 0 ? clens[0].sampleDate : '' }}</th>
            <th>抽样单位</th>
            <th>{{ clens.length > 0 ? clens[0].sampleUnit : '' }}</th>
            <th>抽样人</th>
            <th>{{ clens.length > 0 ? clens[0].sampler : '' }}</th>
            <th>核对人</th>
            <th>{{ clens.length > 0 ? clens[0].collator : '' }}</th>
          </tr>
        </thead>
      </table>
      <table
        border="1"
        class="pure-table pure-table-bordered"
        style="width:100%"
      >
        <thead>
          <tr>
            <th rowspan="2">序号</th>
            <th rowspan="2">样品名称</th>
            <th rowspan="2">样品编号</th>
            <th rowspan="2">抽样数量</th>
            <th rowspan="2">抽样基数</th>
            <th rowspan="2">抽样地点</th>
            <th colspan="3" style="text-align:center;">样品来源</th>
            <th rowspan="2">样品类型</th>
            <th rowspan="2">受检单位，联系电话</th>
            <th rowspan="2">受检人</th>
            <th rowspan="2">检测结果</th>
            <th rowspan="2">处理方式</th>
            <th rowspan="2">备注</th>
          </tr>
          <tr>
            <!-- <th rowspan="2">序号</th> -->
            <!-- <th>样品名称</th> -->
            <!-- <th>样品编号</th> -->
            <!-- <th>抽样数量</th> -->
            <!-- <th>抽样基数</th> -->
            <!-- <th>抽样地点</th> -->
            <th style="border-top:1px solid black;">省</th>
            <th style="border-top:1px solid black;">市</th>
            <th style="border-top:1px solid black;">区</th>
            <!-- <th>样品类型</th> -->
            <!-- <th>受检单位，联系电话</th> -->
            <!-- <th>受检人</th> -->
            <!-- <th>检测结果</th> -->
            <!-- <th>处理方式</th> -->
            <!-- <th>备注</th> -->
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in clens" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ item.specimenName }}</td>
            <td>{{ item.specimenNo }}</td>
            <td>{{ item.sampleNum }}</td>
            <td>{{ item.sampleCardinality }}</td>
            <td>{{ item.sampleLocation }}</td>
            <!-- //------------------------------------------ -->
            <td>{{ item.specimenSource.sheng }}</td>
            <td>{{ item.specimenSource.shi }}</td>
            <td>{{ item.specimenSource.qu }}</td>
            <!-- //------------------------------------------ -->
            <td>{{ item.specimenType }}</td>
            <td>{{ item.unitInspectedTelephone }}</td>
            <td>{{ item.inspectedPeople }}</td>
            <td>{{ item.detectionConsequence === 1 ? '阴性' : '阳性' }}</td>
            <td>{{ item.disposeManner }}</td>
            <td>{{ item.comment }}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td><div class="footer" /></td>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>
</template>
<script>
// import Table from './table'
export default {
  props: {
    isPrint: Array,
    albuterols: Array,
    clens: Array,
    ractopamines: Array,
    saveSwFeverDeReqDtos: Array
  },
  data() {
    return {
      w: '1500px',

      dataTables3: []
    }
  },
  watch: {},
  created() {},
  methods: {}
}
</script>
<style scoped lang="scss">
@page {
  size: auto;
  margin: 0mm;
}

@media print {
  .footer {
    height: 0;
    font: italic 85%/1 arial, sans-serif;
    -webkit-transform-origin-x: 0;
    -webkit-transform: scale(2);
  }

  .footer-test {
    margin-left: 400px;
    font: italic 85%/1 arial, sans-serif;
    padding: 1em 0;
    -webkit-transform-origin-x: 0;
    -webkit-transform: scale(2);
    span {
      margin-right: 100px;
    }
  }
  .footer-test {
    position: fixed;
    bottom: 0;
    border: none;
  }
  tfoot {
    display: table-footer-group;
    border: none !important;
  }
  .pure-table-bordered tfoot {
    border: 1px solid #ffffff !important;
  }
  .pure-table-bordered tfoot > tr {
    border: 1px solid #ffffff !important;
  }
  .pure-table-bordered tfoot > td {
    border: 1px solid #ffffff !important;
  }
  .pure-table-bordered tfoot .footer {
    border: 1px solid #ffffff !important;
  }
}

table {
  border-collapse: collapse;
  border-spacing: 0;
}
.pager {
  page-break-after: always;
}
td,
th {
  padding: 0;
  display: table-cell;
  vertical-align: middle;
}

.pure-table {
  border-collapse: collapse;
  border-spacing: 0;
  empty-cells: show;
  // border: 1px solid black;
}

.pure-table caption {
  width: 100%;
  color: #000;
  font: italic 85%/1 arial, sans-serif;
  padding: 1em 0;
  -webkit-transform-origin-x: 0;
  -webkit-transform: scale(2.5);
  margin-bottom: 15px;
  font-weight: bold;
  text-align: left;
}

.pure-table td,
.pure-table th {
  border-left: 1px solid black;
  border-width: 0 0 0 1px;
  font-size: inherit;
  margin: 0;
  overflow: visible;
  padding: 0.5em 1em;
  display: table-cell;
  vertical-align: middle;
}
.pure-table tfoot {
  border: 1px solid #ffffff !important;
  text-align: left;
  vertical-align: bottom;
  tr {
    border: 1px solid #ffffff !important;
    td {
      height: 50px;
      border: 1px solid #ffffff !important;
    }
  }
}
.pure-table-bordered tfoot {
  border: 1px solid #ffffff !important;
}
.pure-table-bordered tfoot > tr {
  border: 1px solid #ffffff !important;
}
.pure-table-bordered tfoot > td {
  border: 1px solid #ffffff !important;
}
.pure-table-bordered tfoot .footer {
  border: 1px solid #ffffff !important;
}
.pure-table thead {
  background-color: #ffffff;
  border-bottom: 1px solid black;
  color: #000;
  text-align: left;
  vertical-align: bottom;
}

.pure-table td {
  background-color: transparent;
  // border-bottom: 1px solid black;
  height: 30px;
}

.pure-table-bordered td {
  // border-bottom: 1px solid black;
}
.pure-table-bordered tbody td {
  // border-bottom: 1px solid #ffffff !important;
}
.pure-table-bordered tfoot > tr:last-child > td {
  border: 1px solid white !important;
  border-bottom-width: 0;
}
.quarantine-tabtitle {
  width: 100%;
  text-align: center;
  margin-bottom: 20px;
  margin-top: 50px;
}
</style>
