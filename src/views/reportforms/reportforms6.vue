<!-- 检疫登记表-进厂验收和宰前检验表 -->
<template>
  <div ref="main" class="dashboard-container">
    <div ref="search" class="search-wrap">      
      <el-form :inline="true" :model="formSearch" class="demo-form-inline">
        <el-form-item>
          <el-date-picker v-model="formSearch.enterTime" type="date" value-format="yyyy-MM-dd HH:mm:ss" placeholder="进厂日期"/>
        </el-form-item>
        <el-form-item label="">
          <el-input v-model="formSearch.shipper" placeholder="请输入货主名称"/>
        </el-form-item>
        <el-form-item label="">
          <el-select v-model="formSearch.branchId" filterable :disabled="isshowBtn!=='0'" placeholder="请选择网点机构" @change="changeBranch">
            <el-option v-for="item in branchList" :key="item.id" :label="item.branchName" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="getList" >查询</el-button>
          <el-button type="primary" icon="el-icon-refresh" plain @click="reset" >重置</el-button>
        </el-form-item>
      </el-form>
      <div class="line-s" />
    </div>

    <div ref="action" class="action-wrap">
      <div/>
      <div>
        <el-button type="primary" icon="el-icon-upload2" @click="exportReportForms" >导出</el-button>
      </div>
    </div>
    <TableWrap>
      <el-table :data="tableData" border stripe style="width: 100%" height="100%">
        <el-table-column prop="enterTime" label="进厂日期" :show-overflow-tooltip="true"/>
        <el-table-column prop="shipper" label="货主" :show-overflow-tooltip="true"/>
        <el-table-column prop="practicalEnterNum" label="进厂数量" :show-overflow-tooltip="true"/>
        <el-table-column prop="origin" label="产地" :show-overflow-tooltip="true"/>
        <el-table-column prop="quarantineCertificateNum" label="动物检疫合格证明编号" :show-overflow-tooltip="true"/>
        <el-table-column prop="preKillPigNum" label="待宰前死亡生猪头数（头）" :show-overflow-tooltip="true"/>
        <el-table-column prop="urgentKillNum" label="急宰数量（头）" :show-overflow-tooltip="true"/>
        <el-table-column prop="disposeSickPigNum" label="病害猪处理数量（头）" :show-overflow-tooltip="true"/>
        <el-table-column prop="disposeCause" label="无害化处理原因及方式" :show-overflow-tooltip="true"/>
        <el-table-column prop="killNum" label="准宰数量（头）" :show-overflow-tooltip="true"/>
        <el-table-column prop="branchName"  label="网点机构" :show-overflow-tooltip="true"/>
      </el-table>
      <pagination v-show="total > 0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList"/>
    </TableWrap>    
  </div>
</template>

<script>
import TableWrap from '@/components/TableWrap';
import Pagination from '@/components/pagination';
import {
  queryReportForms6
} from '@/api/reportForms';
import {
  exportReportForms6
} from '@/api/reportFormsExport';
import { getKeyStr } from '@/utils/Data';
import _ from 'lodash';
import { branchDropDown } from '@/utils/mixin';
export default {
  name: 'Admin',
  components: {
    Pagination,
    TableWrap
  },
  mixins: [branchDropDown],
  data() {    
    return {
      formSearch: {
        enterTime: '',
        shipper: ''
      },
      total: 200,      
      listQuery: {
        page: 1,
        limit: 10
      },
      formLabelWidth: '120px',
      tableData: [],
      newtableData: [],
      oldtableData: [],
      innerVisible: false,
      SelectionList: []
    }
  },
  created() {
    this.oldtableData = this.tableData
    this.getList()
  },
  methods: {
    //导出
    exportReportForms: _.debounce(function () {
      window.location.href = exportReportForms6(
        `enterTime=${this.formSearch.enterTime}&shipper=${this.formSearch.shipper}&branchId=${this.formSearch.branchId}`
      )
    },500),
    // 多选框
    handleSelectionChange(val) {
      this.SelectionList = val
    },
    reset() {
      for (const key in this.formSearch) {
        this.formSearch[key] = ''
      }
      this.formSearch.branchId = localStorage.getItem('userTypeSW') === '0' ? '' : localStorage.getItem('nowbranchDropDown');
      this.listQuery.page = 1;
      this.listQuery.limit = 10;
      this.getList();
    },
    getList() {
      queryReportForms6({
        branchId: this.formSearch.branchId,
        enterTime: this.formSearch.enterTime,
        shipper: this.formSearch.shipper,
        pageNum: this.listQuery.page,
        pageSize: this.listQuery.limit
      }).then(res => {
        this.$nextTick(() => {
          this.total = res.result.total
        })
        this.tableData = res.result.list
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.access-Dialog {
  width: 100%;
  height: 160px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  i {
    font-size: 50px;
    margin-right: 15px;
    color: red;
  }
}
.diver-t {
  margin-top: 25px;
  /deep/.el-form-item {
    margin: auto;
    width: 80%;
    margin-bottom: 22px;
  }
  /deep/.el-form-item__error {
    left: 18px;
  }

  /deep/.el-input {
    width: 95% !important;
  }
}
/deep/.el-table .el-table__fixed-header-wrapper .has-gutter tr {
  background-color: #67c23a !important;
}
/deep/.el-table-column--selection {
  /deep/.cell {
    text-align: center;
  }
}
/deep/.el-dialog .el-dialog__footer {
  padding-bottom: 15px;
}
.search-wrap {
  /deep/.el-input {
    width: 200px !important;
    margin-right: 15px;
  }
}

.quarantine-line {
  width: 100%;
  height: 1px;
  background-color: #e8e8e8;
  margin: 0 auto;
  margin-bottom: 5px;
}
.quarantine-Top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  line-height: 40px;
  margin-bottom: 10px;
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
.quarantine-top {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}
.quarantine-topbo {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.quarantine-cen1 {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
}
/deep/.el-table td,
.el-table th {
  padding: 9px 0;
  min-width: 0;
  box-sizing: border-box;
  text-overflow: ellipsis;
  vertical-align: middle;
  position: relative;
  text-align: left;
}
/deep/.el-dialog__header {
  // background-color: #d9e0df;
  padding: 15px 20px 10px;
}
/deep/.el-dialog__body {
  padding: 0px 30px;
}

/deep/.el-select {
  width: 100%;
}

.from-bottom {
  position: absolute;
  bottom: 0;
  right: 30px;
}
</style>
