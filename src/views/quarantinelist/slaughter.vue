<!--
 * @Author: your name
 * @Date: 2020-05-27 18:43:25
 * @LastEditTime: 2020-05-27 18:44:34
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \smart_space_admin\src\views\dashboard\index.vue
-->
<template>
  <div ref="main" class="dashboard-container">
    <div ref="search" class="search-wrap">
      <el-form :inline="true" :model="formSearch" class="demo-form-inline">
        <el-row>
        <el-form-item label="">
          <el-input
            v-model="formSearch.orderNum"
            placeholder="请输入订单编号"
          />
        </el-form-item>
        <el-form-item label="">
          <el-input v-model="formSearch.shipper" placeholder="请输入货主名称" />
        </el-form-item>
        <el-form-item label="">
          <el-select
            v-model="formSearch.quarantineStatus"
            placeholder="检疫状态"
          >
            <el-option label="准宰检疫-等待" value="4" />
            <el-option label="准宰检疫-通过" value="5" />
            <el-option label="准宰检疫-异常" value="6" />
          </el-select>
        </el-form-item>
        <el-form-item label="">
          <el-select
            v-model="formSearch.wholesaler"
            placeholder="所属批发商"
            filterable
          >
            <el-option
              v-for="(item, index) in wholesalerList"
              :key="index"
              :label="item.name"
              :value="item.name"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="text" @click="showSearch = !showSearch">{{showSearch?"收起":"展开"}}<i :class="showSearch?'el-icon-arrow-up':'el-icon-arrow-down'"></i></el-button>
          <el-button
            v-has="'allowKillQuarantine:query'"
            type="primary"
            icon="el-icon-search"
            @click="inquire(formSearch)"
          >查询</el-button>
          <el-button
            type="primary"
            icon="el-icon-refresh"
            plain
            @click="reset"
          >重置</el-button>
        </el-form-item>
        </el-row>

        <el-form-item label="" v-show="showSearch">
          <el-select
            v-model="formSearch.farmName"
            placeholder="养殖场名称"
            filterable
          >
            <el-option
              v-for="(item, index) in farmNameList"
              :key="index"
              :label="item.name"
              :value="item.name"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="" v-show="showSearch">
          <el-input
            v-model="formSearch.pickupPlateNumbers"
            placeholder="请输入车牌号"
          />
        </el-form-item>
        <el-form-item label="" v-show="showSearch">
          <el-input
            v-model="formSearch.pickupOddNum"
            placeholder="请输入提货单号"
          />
        </el-form-item>
        <el-form-item label="" v-show="showSearch">
          <el-date-picker
            v-model="formSearch.enterTime"
            type="daterange"
            format="yyyy - MM - dd "
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="进厂开始日期"
            end-placeholder="进厂结束日期"
          />
        </el-form-item>
        <el-form-item label="" v-show="showSearch">
          <el-select v-model="formSearch.branchId" filterable :disabled="isshowBtn!=='0'" placeholder="请选择网点机构" @change="changeBranch">
            <el-option
              v-for="item in branchList"
              :key="item.id"
              :label="item.branchName"
              :value="item.id"
            />
          </el-select>
        </el-form-item>        
      </el-form>
      <div class="line-s" />
    </div>
    <div ref="action" class="action-wrap">
      <div>
        <el-button
          v-has="'allowKillQuarantine:print'"
          type="primary"
          icon="el-icon-printer"
          @click="QuarantineprintEvent"
        >检疫打印</el-button>
        <!-- <el-button
          type="primary"
          icon="el-icon-printer"
          @click="Mustkillprint = true"
        >准宰打印</el-button> -->
        <el-button
          type="primary"
          :disabled="SelectionList.length > 0 ? false : true"
          @click="MustkillSurese"
        >准宰</el-button>
      </div>
      <div>
        <el-button
          v-has="'allowKillQuarantine:export'"
          type="primary"
          icon="el-icon-upload2"
          @click="exportZY"
        >导出</el-button>
      </div>
    </div>
    <TableWrap>
      <el-table
        ref="multipleTable"
        :data="tableData"
        border
        stripe
        style="width: 100%"
        height="100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column
          prop="orderNum"
          label="订单编号"
          min-width="150"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <p class="p-blue">
              {{ scope.row.orderNum }}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          prop="farmName"
          label="养殖场名称"
          min-width="150"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <p class="p-blue">
              {{ scope.row.farmName }}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          prop="shipper"
          label="货主"
          min-width="120"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="wholesalerList"
          label="所属批发商"
          min-width="150"
          :show-overflow-tooltip="true"
        />
        <el-table-column prop="enterTime" label="进厂日期" min-width="150" />
        <el-table-column
          prop="branchName"
          label="所属网点"
          min-width="130"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="practicalEnterNum"
          label="实际进厂数量(只)"
          min-width="130"
        />
        <el-table-column
          prop="abnormalNum"
          label="异常数量(只)"
          min-width="120"
        />
        <el-table-column
          prop="allowKillNum"
          label="准宰数量(只)"
          min-width="120"
        />
        <el-table-column
          prop="qualifiedNum"
          label="合格数量(只)"
          min-width="120"
        />
        <el-table-column label="检疫状态" min-width="150">
          <template slot-scope="scope">
            <p v-if="scope.row.quarantineStatus === 4" class="root-status-f">
              <span /> {{ scope.row.state }}
            </p>
            <p v-if="scope.row.quarantineStatus === 5" class="root-status-s">
              <span /> {{ scope.row.state }}
            </p>
            <p v-if="scope.row.quarantineStatus === 6" class="root-status-r">
              <span /> {{ scope.row.state }}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          prop="pickupOddNum"
          label="提货单号"
          min-width="200"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="pickupPlateNumbers"
          label="提货车牌号"
          min-width="100"
        />
        <el-table-column fixed="right" label="操作" min-width="150">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.quarantineStatus === 4"
              v-has="'allowKillQuarantine:add'"
              type="text"
              size="small"
              @click="handleClick(scope.row)"
            >检疫录入</el-button>
            <el-button
              v-if="scope.row.quarantineStatus != 4"
              v-has="'allowKillQuarantine:detail'"
              type="text"
              size="small"
              @click="handleClick(scope.row)"
            >检疫详情</el-button>
            <el-button
              v-if="scope.row.quarantineStatus !== 6"
              v-has="'allowKillQuarantine:abnormalImput'"
              type="text"
              size="small"
              @click="addAbnormal(scope.row, 'ruleForm')"
            >新增异常</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination
        v-show="total > 0"
        :total="total"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.limit"
        @pagination="getList"
      />
    </TableWrap>
    <el-dialog title="新增异常" :close-on-click-modal="false" :visible.sync="dialogFormVisible">
      <div class="quarantine-xq">
        <span />
        <p>订单详情</p>
      </div>
      <div class="quarantine-xq1">
        <div class="quarantine-xq2">
          <p>订单编号：</p>
          <p>{{ orderNum }}</p>
        </div>
        <div class="quarantine-xq2">
          <p>所属批发商：</p>
          <p>{{ wholesaler }}</p>
        </div>
        <div class="quarantine-xq2">
          <p>货主：</p>
          <p>{{ shipper }}</p>
        </div>
      </div>
      <div class="quarantine-xq1">
        <div class="quarantine-xq2">
          <p>进厂日期：</p>
          <p>{{ enterTime }}</p>
        </div>
      </div>
      <div class="quarantine-line1" />
      <div class="quarantine-xq22">
        <el-form
          ref="ruleForm"
          :model="ruleForm"
          :rules="rules"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item
            label="异常类型:"
            :label-width="formLabelWidth"
            prop="abnormalType"
          >
            <el-select v-model="ruleForm.abnormalType" placeholder="请选择">
              <el-option label="急宰" value="2" />
              <el-option label="急宰不合格" value="3" />
              <el-option label="待宰前死亡" value="4" />
            </el-select>
          </el-form-item>
          <el-form-item
            label="生猪编号:"
            :label-width="formLabelWidth"
            prop="livePigNum"
          >
            <el-cascader
              v-model="ruleForm.livePigNum"
              style="width: 100%"
              :options="options"
              :props="{ multiple: true, checkStrictly: true }"
              filterable
            />
          </el-form-item>
          <el-form-item
            label="异常日期:"
            prop="abnormalDate"
            :label-width="formLabelWidth"
          >
            <el-radio-group v-model="ruleForm.abnormalDate">
              <el-radio label="进厂当日" />
              <el-radio label="进厂次日" />
            </el-radio-group>
          </el-form-item>
          <el-form-item
            label="处理原因:"
            :label-width="formLabelWidth"
            prop="disposeCause"
          >
            <el-input
              v-model="ruleForm.disposeCause"
              autocomplete="off"
              placeholder="请输入处理原因"
            />
          </el-form-item>
          <el-form-item
            label="处理方式:"
            :label-width="formLabelWidth"
            prop="disposeManner"
          >
            <el-input
              v-model="ruleForm.disposeManner"
              autocomplete="off"
              placeholder="请输入处理方式"
            />
          </el-form-item>
          <el-form-item
            label="是否计入病料:"
            prop="epidemicMaterials"
            :label-width="formLabelWidth"
          >
            <el-radio-group v-model="ruleForm.epidemicMaterials">
              <el-radio label="是" />
              <el-radio label="否" />
            </el-radio-group>
          </el-form-item>
          <div v-if="ruleForm.epidemicMaterials === '是'">
            <el-form-item
              label="病料重量(公斤):"
              prop="illWeight"
              :label-width="formLabelWidth"
            >
              <el-input
                v-model="ruleForm.illWeight"
                autocomplete="off"
                placeholder="请输入病料重量"
              />
            </el-form-item>
          </div>
        </el-form>
      </div>
      <div class="quarantine-line" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetForm('ruleForm')">取 消</el-button>
        <el-button
          type="primary"
          @click="submitForm('ruleForm')"
        >保存</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="检疫打印"
      :visible.sync="Quarantineprint"
      :close-on-click-modal="false"
      width="60%"
      :before-close="handleClose"
    >
      <div class="quarantine-xq">
        <span />
        <p>选择需要打印的表格</p>
      </div>
      <div style="height: 300px; margin-top: 15px">
        <el-table
          :data="printSureT"
          border
          stripe
          style="width: 100%"
          height="100%"
        >
          <el-table-column
            prop="orderNum"
            label="订单编号"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            prop="wholesalerList"
            label="所属批发商"
            :show-overflow-tooltip="true"
          />
          <el-table-column :show-overflow-tooltip="true">
            <template slot="header" slot-scope="scope">
              <el-checkbox
                v-model="Allchecks"
                :indeterminate="isIndeterminates"
                @change="handleCheckAllChanges"
              >全选</el-checkbox>
            </template>
            <template slot-scope="scope">
              <el-checkbox-group
                v-model="checks"
                @change="handleCheckedCitiesChanges"
              >
                <el-checkbox :label="scope.row.id">{{
                  scope.row.Allchecks
                }}</el-checkbox>
              </el-checkbox-group>
            </template>
          </el-table-column>
          <el-table-column :show-overflow-tooltip="true">
            <template slot="header" slot-scope="scope">
              <el-checkbox
                v-model="Allcheckf"
                :indeterminate="isIndeterminatef"
                @change="handleCheckAllChangef"
              >全选</el-checkbox>
            </template>
            <template slot-scope="scope">
              <el-checkbox-group
                v-model="checkf"
                @change="handleCheckedCitiesChangef"
              >
                <el-checkbox :label="scope.row.id">{{
                  scope.row.Allcheckf
                }}</el-checkbox>
              </el-checkbox-group>
            </template>
          </el-table-column>
          <el-table-column :show-overflow-tooltip="true">
            <template slot="header" slot-scope="scope">
              <el-checkbox
                v-model="Allcheckw"
                :indeterminate="isIndeterminatew"
                @change="handleCheckAllChangew"
              >全选</el-checkbox>
            </template>
            <template slot-scope="scope">
              <el-checkbox-group
                v-model="checkw"
                @change="handleCheckedCitiesChangew"
              >
                <el-checkbox :label="scope.row.id">{{
                  scope.row.Allcheckw
                }}</el-checkbox>
              </el-checkbox-group>
            </template>
          </el-table-column>
          <el-table-column :show-overflow-tooltip="true">
            <template slot="header" slot-scope="scope">
              <el-checkbox
                v-model="Allcheckz"
                :indeterminate="isIndeterminatez"
                @change="handleCheckAllChangez"
              >全选</el-checkbox>
            </template>
            <template slot-scope="scope">
              <el-checkbox-group
                v-model="checkz"
                @change="handleCheckedCitiesChangez"
              >
                <el-checkbox :label="scope.row.id">{{
                  scope.row.Allcheckz
                }}</el-checkbox>
              </el-checkbox-group>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="quarantine-line" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="closePrint('ruleFormMustkill')">取 消</el-button>
        <el-button type="primary" @click="print">打印</el-button>
      </span>
    </el-dialog>
    <el-dialog title="准宰打印" :close-on-click-modal="false" :visible.sync="Mustkillprint">
      <div class="diver-t">
        <el-form
          ref="ruleFormMustkill"
          :model="ruleFormMustkill"
          :rules="rules"
          label-width="200px"
          class="demo-ruleForm"
        >
          <el-form-item
            label="打印日期:"
            :label-width="formLabelWidth"
            prop="DataPrint"
          >
            <el-date-picker
              v-model="ruleFormMustkill.DataPrint"
              type="date"
              placeholder="请选择日期"
            />
          </el-form-item>
          <el-form-item
            label="检疫员姓名:"
            :label-width="formLabelWidth"
            prop="nameJy"
          >
            <el-input
              v-model="ruleFormMustkill.nameJy"
              autocomplete="off"
              placeholder="请输入检疫员姓名"
            />
          </el-form-item>
        </el-form>
      </div>
      <div class="quarantine-line" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="closePrint('ruleFormMustkill')">取 消</el-button>
        <el-button
          type="primary"
          @click="Mustkillprints('ruleFormMustkill')"
        >打印</el-button>
      </span>
    </el-dialog>
    <el-dialog title="准宰确认" :close-on-click-modal="false" :visible.sync="MustkillSure">
      <div class="diver-t">
        <div class="tuMustkillSure">是否批准目前勾选订单进入屠宰环节？</div>
        <el-form
          ref="ruleFormMustkillSure"
          :model="ruleFormMustkillSure"
          :rules="rules"
          label-width="200px"
          class="demo-ruleForm"
        >
          <el-form-item
            label="屠宰负责人:"
            :label-width="formLabelWidth"
            prop="killUser"
          >
            <el-input
              v-model="ruleFormMustkillSure.killUser"
              autocomplete="off"
              placeholder="请输入屠宰负责人"
            />
          </el-form-item>
        </el-form>
      </div>
      <div class="quarantine-line" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="closePrint('ruleFormMustkillSure')">取 消</el-button>
        <el-button
          type="primary"
          @click="MustkillSures('ruleFormMustkillSure')"
        >确定</el-button>
      </span>
    </el-dialog>
    <!-- v-if="isshowPrint" -->
    <div v-if="isshowPrint" style="margin-top: 500px">
      <div id="print" ref="print">
        <Print
          :is-print="isPrint"
          :albuterols="albuterols"
          :clens="clens"
          :ractopamines="ractopamines"
          :save-sw-fever-de-req-dtos="saveSwFeverDeReqDtos"
        />
      </div>
    </div>
    <div v-if="isshowPrintZZ" style="margin-top: 500px">
      <div id="prints" ref="prints">
        <jobOrder :is-print="isPrint" :table-data-print="tableDataPrint" />
      </div>
    </div>
  </div>
</template>

<script>
// 打印
import { addDate, PrintObjGet } from '@/utils/Data'
import printJS from 'print-js'

import Print from './components/print'
import TableWrap from '@/components/TableWrap'
import Pagination from '@/components/pagination'
import jobOrder from './components/jobOrder'
import { branchDropDown } from '@/utils/mixin'
import {
  postQuarantineGetQuarantineInfo,
  postQuarantineSaveAbnormalInfo,
  GetQuarantineexportQuarantineInfo,
  dropDownfarm,
  dropDownwholesaler,
  allowKillQuarallowKillTrigger,
  dropDownlivePigNum,
  allowKillQuarquarPrint
} from '@/api/jyzyy'
import _ from 'lodash'

export default {
  name: 'Admin',
  components: {
    Pagination,
    TableWrap,
    Print,
    jobOrder
  },
  mixins: [branchDropDown],
  data() {
    var checkNum = (rule, value, callback) => {
      if (/^\d{1,5}$/.test(value)) {
        callback()
      } else {
        return callback(new Error('请填写1-5位的数字'))
      }
    }
    var checkillWeight = (rule, value, callback) => {
      if (/^\d{2,5}$/.test(value)) {
        callback()
      } else {
        return callback(new Error('请填写2-5位的数字'))
      }
    }
    var checknameJy = (rule, value, callback) => {
      if (/^[\u4e00-\u9fa5]{2,20}$/.test(value)) {
        callback()
      } else {
        return callback(new Error('检疫员名称长度为2至20位'))
      }
    }
    return {
      farmNameList: [],
      ruleFormMustkillSure: {
        killUser: ''
      },
      ruleFormMustkill: {
        DataPrint: '',
        nameJy: ''
      },
      checks: [],
      isPrint: [],
      checkf: [],
      checkw: [],
      checkz: [],
      Allchecks: false,
      Allcheckf: false,
      Allcheckw: false,
      Allcheckz: false,
      checked: false,
      isIndeterminates: false,
      isIndeterminatef: false,
      isIndeterminatew: false,
      isIndeterminatez: false,
      isshowPrint: false,
      printSureT: [],
      Quarantineprint: false,
      Mustkillprint: false,
      MustkillSure: false,

      formSearch: {
        enterTime: '',
        farmName: '',
        orderNum: '',
        pickupOddNum: '',
        pickupPlateNumbers: '',
        quarantineStatus: '',
        shipper: '',
        wholesaler: ''
      },
      total: 200,
      rules: {
        killUser: [{ message: '请输入屠宰负责人', trigger: 'change' }],
        abnormalType: [
          { required: true, message: '请选择异常类型', trigger: 'change' }
        ],
        livePigNum: [
          { required: true, message: '请输入生猪编号', trigger: 'change' }
        ],
        abnormalDate: [
          { required: true, message: '请选择异常日期', trigger: 'change' }
        ],
        disposeCause: [
          { required: true, message: '请输入处理原因', trigger: 'change' },
          { min: 2, max: 20, message: '请填写2-20位的字符', trigger: 'change' }
        ],
        disposeManner: [
          { required: true, message: '请输入处理方式', trigger: 'change' },
          { min: 2, max: 20, message: '请填写2-20位的字符', trigger: 'change' }
        ],
        epidemicMaterials: [
          { required: true, message: '请选择是否计入病料', trigger: 'change' }
        ],
        illWeight: [
          { required: true, message: '请输入病料重量', trigger: 'change' },
          { validator: checkillWeight, trigger: 'change' }
        ],
        abnormalNum: [
          { required: true, message: '请输入异常数量', trigger: 'change' },
          { validator: checkNum, trigger: 'change' }
        ],
        nameJy: [
          { required: true, message: '请输入检疫员姓名', trigger: 'change' },
          { validator: checknameJy, trigger: 'change' }
        ]
      },
      listQuery: {
        page: 1,
        limit: 10
      },
      input1: '',
      resourceData: '',
      formLabelWidth: '140px',
      dialogFormVisible: false,
      ruleForm: {
        abnormalType: '',
        livePigNum: '',
        abnormalDate: '',
        disposeCause: '',
        disposeManner: '',
        epidemicMaterials: '',
        illWeight: ''
      },
      tableDataPrint: [],
      albuterols: [],
      clens: [],
      ractopamines: [],
      saveSwFeverDeReqDtos: [],
      tableData: [],
      orderNumber: '2020121515',
      orderId: '202015154',
      wholesaler: '',
      shipper: '',
      enterTime: '',
      newtableData: [],
      oldtableData: [],
      SelectionList: [],
      wholesalerList: [],
      options: [],
      isshowPrintZZ: false,
      arrData: [],
      orderNum: '',
      showSearch: false
    }
  },
  created() {
    dropDownfarm().then(res => {
      this.farmNameList = res.result
    })
    dropDownwholesaler().then(res => {
      this.wholesalerList = res.result
    })
    if (this.$route.query.time) {
      var arr = []
      JSON.parse(this.$route.query.time).forEach(v => {
        arr.push(v.split(' ')[0])
      })
      this.formSearch.enterTime = arr
    }
    if (this.$route.query.branchId || this.$route.query.branchId == '') {
      this.formSearch.branchId = this.$route.query.branchId
    }
    this.getList()
  },
  activated() {
    dropDownfarm().then(res => {
      this.farmNameList = res.result
    })
    dropDownwholesaler().then(res => {
      this.wholesalerList = res.result
    })
    if (this.$route.query.time) {
      var arr = []
      JSON.parse(this.$route.query.time).forEach(v => {
        arr.push(v.split(' ')[0])
      })
      this.formSearch.enterTime = arr
    }
    this.getList()
  },
  methods: {
    MustkillSurese() {
      this.MustkillSure = true
      this.ruleFormMustkillSure.killUser = ''
    },
    QuarantineprintEvent() {
      if (this.SelectionList.length > 0) {
        const listNew = [this.printSureT[0]]
        this.printSureT.shift()
        this.printSureT.forEach(v => {
          const l = listNew.filter(
            i =>
              i.pickupPlateNumbers === v.pickupPlateNumbers &&
              i.enterTime === v.enterTime
          )
          if (!l.length) {
            listNew.push(v)
          }
        })
        console.log(listNew)
        this.printSureT = listNew

        this.Quarantineprint = true
      } else {
        this.$message.error('请选择一项再进行打印')
      }
      this.checks = []
      this.checkf = []
      this.checkw = []
      this.checkz = []
      this.Allchecks = false
      this.Allcheckf = false
      this.Allcheckw = false
      this.Allcheckz = false
      this.isIndeterminates = false
      this.isIndeterminatef = false
      this.isIndeterminatew = false
      this.isIndeterminatez = false
    },
    // 导出

    exportZY: _.debounce(function() {
      window.location.href = GetQuarantineexportQuarantineInfo(
        `enterTimeStart=${
          this.formSearch.enterTime
            ? this.formSearch.enterTime[0] + ' 00:00:00'
            : ''
        }&enterTimeEnd=${
          this.formSearch.enterTime
            ? this.formSearch.enterTime[1] + ' 23:59:59'
            : ''
        }&farmName=${this.formSearch.farmName}&orderNum=${
          this.formSearch.orderNum
        }&pickupOddNum=${this.formSearch.pickupOddNum}&pickupPlateNumbers=${
          this.formSearch.pickupPlateNumbers
        }&quarantineStatus=${this.formSearch.quarantineStatus}&shipper=${
          this.formSearch.shipper
        }&wholesaler=${this.formSearch.wholesaler}&quarType=2&branchId=${this.formSearch.branchId}`
      )
    }, 500),
    // 打印
    print() {
      this.checks.length === 0
        ? this.isPrint.push(false)
        : this.isPrint.push(true)
      this.checkf.length === 0
        ? this.isPrint.push(false)
        : this.isPrint.push(true)
      this.checkw.length === 0
        ? this.isPrint.push(false)
        : this.isPrint.push(true)
      this.checkz.length === 0
        ? this.isPrint.push(false)
        : this.isPrint.push(true)
      var quarPrintList = []
      this.checks.forEach(v => {
        quarPrintList.push({
          orderId: v,
          printType: 4
        })
      })
      this.checkf.forEach(v => {
        quarPrintList.push({
          orderId: v,
          printType: 1
        })
      })
      this.checkw.forEach(v => {
        quarPrintList.push({
          orderId: v,
          printType: 3
        })
      })
      this.checkz.forEach(v => {
        quarPrintList.push({
          orderId: v,
          printType: 2
        })
      })
      allowKillQuarquarPrint(quarPrintList).then(res => {
        this.albuterols = res.result.albuterols
        if (this.albuterols.length > 0) {
          this.albuterols.forEach(v => {
            var location = v.specimenSource.split(',')
            v.specimenSource = {
              sheng: location[0],
              shi: location[1],
              qu: location[2]
            }
          })
        }

        this.clens = res.result.clens
        if (this.clens.length > 0) {
          this.clens.forEach(v => {
            var location = v.specimenSource.split(',')
            v.specimenSource = {
              sheng: location[0],
              shi: location[1],
              qu: location[2]
            }
          })
        }
        this.ractopamines = res.result.ractopamines
        if (this.ractopamines.length > 0) {
          this.ractopamines.forEach(v => {
            var location = v.specimenSource.split(',')
            v.specimenSource = {
              sheng: location[0],
              shi: location[1],
              qu: location[2]
            }
          })
        }
        this.isshowPrint = true
        this.saveSwFeverDeReqDtos = res.result.saveSwFeverDeReqDtos

        // const style =
        //   '@page {margin:0 10mm}@media print {td{height:50px;line-height}}'
        this.$nextTick(() => {
          // print(this.$refs.print)
          this.$print(this.$refs.print)
          // printJS({
          //   printable: 'print',
          //   maxWidth: '1500px',
          //   type: 'html',
          //   // style,
          //   targetStyles: ['*'],
          //   ignoreElements: ['no-print', 'bc', 'gb'],
          //   onPrintDialogClose: a => {
          //     clearInterval(focuser)
          //     this.Quarantineprint = false
          //     this.$message.success('打印成功，正在打印中···')
          //     this.$refs.multipleTable.clearSelection()
          //   }
          // })
          // this.isPrint = []
        })
      })
    },
    MustkillSures(fromname) {
      this.$refs[fromname].validate(valid => {
        if (valid) {
          const arrKillTrigger = []
          this.SelectionList.forEach(v => {
            arrKillTrigger.push({
              killUser: this.ruleFormMustkillSure.killUser,
              orderId: v.id
            })
          })
          allowKillQuarallowKillTrigger(arrKillTrigger).then(res => {
            if (res.message === '操作成功') {
              this.$message.success('准宰确认成功')
            }
            this.getList()
            this.MustkillSure = false
          })
        } else {
          return false
        }
      })
    },
    // 准宰打印弹框
    Mustkillprints(fromname) {
      this.$refs[fromname].validate(valid => {
        if (valid) {
          this.isshowPrintZZ = true
          this.$nextTick(() => {
            printJS({
              printable: 'prints',
              maxWidth: '1000px',
              type: 'html',
              targetStyles: ['*'],
              ignoreElements: ['no-print', 'bc', 'gb']
            })
          })
        } else {
          return false
        }
      })
    },
    // 关闭打印弹框
    closePrint(formName) {
      this.Quarantineprint = false
      this.Mustkillprint = false
      this.MustkillSure = false
      this.$refs.multipleTable.clearSelection()
      // this.$refs[formName].resetFields()
    },
    handleClose() {
      this.Quarantineprint = false
      this.Mustkillprint = false
      this.MustkillSure = false
      this.$refs.multipleTable.clearSelection()
    },
    // 全选s
    handleCheckAllChanges(val) {
      if (val) {
        this.checks = []
        this.printSureT.forEach((v, i) => {
          this.checks.push(v.id)
        })
      } else {
        this.checks = []
      }
      this.isIndeterminates = false
    },
    // 全选f
    handleCheckAllChangef(val) {
      if (val) {
        this.checkf = []
        this.printSureT.forEach((v, i) => {
          this.checkf.push(v.id)
        })
      } else {
        this.checkf = []
      }
      this.isIndeterminatef = false
    },
    // 全选w
    handleCheckAllChangew(val) {
      if (val) {
        this.checkw = []
        this.printSureT.forEach((v, i) => {
          this.checkw.push(v.id)
        })
      } else {
        this.checkw = []
      }
      this.isIndeterminatew = false
    },
    // 全选z
    handleCheckAllChangez(val) {
      if (val) {
        this.checkz = []
        this.printSureT.forEach((v, i) => {
          this.checkz.push(v.id)
        })
      } else {
        this.checkz = []
      }
      this.isIndeterminatez = false
    },
    // 点击多选框选择打印的表格
    handleCheckedCitiesChanges(val) {
      this.Allchecks = val.length === this.printSureT.length
      this.isIndeterminates =
        val.length > 0 && val.length < this.printSureT.length
    },
    handleCheckedCitiesChangef(val) {
      this.Allcheckf = val.length === this.printSureT.length
      this.isIndeterminatef =
        val.length > 0 && val.length < this.printSureT.length
    },
    handleCheckedCitiesChangew(val) {
      this.Allcheckw = val.length === this.printSureT.length
      this.isIndeterminatew =
        val.length > 0 && val.length < this.printSureT.length
    },
    handleCheckedCitiesChangez(val) {
      this.Allcheckz = val.length === this.printSureT.length
      this.isIndeterminatez =
        val.length > 0 && val.length < this.printSureT.length
    },
    // 多选框  准宰检疫
    handleSelectionChange(val) {
      this.SelectionList = val

      this.printSureT = PrintObjGet(this.SelectionList, {
        Allchecks: '非洲猪瘟检测登记表',
        Allcheckf: '沙丁胺醇检测登记表',
        Allcheckw: '莱克多巴胺检测登记表',
        Allcheckz: '盐酸克伦特罗检测登记表'
      })
    },
    // 去重
    uniqueArray(array, key) {
      var result = [array[0]]
      for (var i = 1; i < array.length; i++) {
        var item = array[i]
        var repeat = false
        for (var j = 0; j < result.length; j++) {
          if (item[key] == result[j][key]) {
            repeat = true
            break
          }
        }
        if (!repeat) {
          result.push(item)
        }
      }
      return result
    },
    // 添加
    addAbnormal(obj, formName) {
      this.ruleForm = {
        abnormalType: '',
        livePigNum: '',
        abnormalDate: '',
        disposeCause: '',
        disposeManner: '',
        epidemicMaterials: '',
        illWeight: ''
      }
      this.options = []
      const data = {
        orderId: obj.id
      }
      dropDownlivePigNum(data).then(res => {
        this.dialogFormVisible = true
        res.result.forEach(v => {
          this.options.push({
            value: v.livePigNum,
            label: v.livePigNum
          })
        })
      })
      this.$refs[formName] && this.$refs[formName].resetFields()
      this.orderId = obj.id
      this.orderNum = obj.orderNum

      this.wholesaler = obj.wholesalerList
      this.shipper = obj.shipper
      this.enterTime = obj.enterTime
    },
    reset() {
      for (const key in this.formSearch) {
        this.formSearch[key] = ''
      }
      this.formSearch.branchId = localStorage.getItem('userTypeSW') === '0' ? '' : localStorage.getItem('nowbranchDropDown')

      this.inquire()
      this.tableData = this.oldtableData
    },
    inquire(formSearch) {
      postQuarantineGetQuarantineInfo({
        branchId: this.formSearch.branchId,
        enterTimeStart:
          this.formSearch.enterTime === ''
            ? ''
            : this.formSearch.enterTime[0] + ' 00:00:00',
        enterTimeEnd:
          this.formSearch.enterTime === ''
            ? ''
            : this.formSearch.enterTime[1] + ' 23:59:59',
        farmName: this.formSearch.farmName,
        orderNum: this.formSearch.orderNum,
        pageNum: 1,
        pageSize: 10,
        pickupOddNum: this.formSearch.pickupOddNum,
        pickupPlateNumbers: this.formSearch.pickupPlateNumbers,
        quarantineStatus:
          this.formSearch.quarantineStatus === ''
            ? null
            : Number(this.formSearch.quarantineStatus),
        quarType: 2,
        shipper: this.formSearch.shipper,
        wholesaler: this.formSearch.wholesaler
      }).then(res => {
        this.tableData = res.result.list
        this.$nextTick(() => {
          this.total = Number(res.result.total)
        })

        this.listQuery = {
          page: 1,
          limit: 10
        }
        this.tableData.forEach((v, i) => {
          v['state'] =
            v.quarantineStatus === 1
              ? '准入检疫-等待'
              : v.quarantineStatus === 2
                ? '准入检疫-通过'
                : v.quarantineStatus === 3
                  ? '准入检疫-异常'
                  : v.quarantineStatus === 4
                    ? '准宰检疫-等待'
                    : v.quarantineStatus === 5
                      ? '准宰检疫-通过'
                      : v.quarantineStatus === 6
                        ? '准宰检疫-异常'
                        : v.quarantineStatus === 7
                          ? '准出检疫-等待'
                          : v.quarantineStatus === 8
                            ? '准出检疫-通过'
                            : v.quarantineStatus === 9
                              ? '准出检疫-异常'
                              : ''
        })
      })
    },
    handleClick(row) {
      if (row.quarantineStatus !== 4) {
        var detailsMessages = {
          id: row.id,
          orderNum: row.orderNum,
          farmName: row.farmName,
          shipper: row.shipper,
          wholesaler: row.wholesaler,
          enterTime: row.enterTime,
          practicalEnterNum: row.practicalEnterNum,
          abnormalNum: row.abnormalNum,
          allowKillNum: row.allowKillNum,
          qualifiedNum: row.qualifiedNum,
          quarantineStatus: row.quarantineStatus,
          state: row.state,
          pickupOddNum: row.pickupOddNum,
          pickupPlateNumbers: row.pickupPlateNumbers,
          accessXqOrLr: row.accessXqOrLr
        }
        localStorage.setItem('detailsMessage', JSON.stringify(detailsMessages))
        this.$router.push({
          path: 'slaughterXq',
          query: {
            wholesaler: row.wholesalerList
          }
        })
      } else {
        var detailsMessage = {
          id: row.id,
          orderNum: row.orderNum,
          farmName: row.farmName,
          shipper: row.shipper,
          origin: row.origin,
          quarantineCertificateNum: row.quarantineCertificateNum,
          wholesaler: row.wholesaler,
          enterTime: row.enterTime,
          practicalEnterNum: row.practicalEnterNum,
          abnormalNum: row.abnormalNum,
          allowKillNum: row.allowKillNum,
          qualifiedNum: row.qualifiedNum,
          quarantineStatus: row.quarantineStatus,
          state: row.state,
          pickupOddNum: row.pickupOddNum,
          pickupPlateNumbers: row.pickupPlateNumbers,
          accessXqOrLr: row.accessXqOrLr,
          originEntity: JSON.stringify(row.originEntity),
          enterNum: row.enterNum
        }
        localStorage.setItem('detailsMessage-s', JSON.stringify(detailsMessage))
        localStorage.removeItem('ruleFormData')
        localStorage.removeItem('ruleFormData1')
        localStorage.removeItem('isLrU')

        this.$router.push({
          path: 'slaughterLR',
          query: {
            wholesaler: row.wholesalerList
          }
        })
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          var abData = this.enterTime
          if (this.ruleForm.abnormalDate === '进厂当日') {
            abData = this.enterTime
          } else {
            abData = addDate(this.enterTime, 1)
          }
          var livePigNumList = []
          this.ruleForm.livePigNum.forEach(v => {
            livePigNumList.push(v[0])
          })
          var epidemicMaterialsY =
            this.ruleForm.epidemicMaterials === '是' ? 1 : 2
          postQuarantineSaveAbnormalInfo({
            abnormalDate: abData + ' ' + '00:00:00',
            abnormalType: Number(this.ruleForm.abnormalType),
            disposeCause: this.ruleForm.disposeCause,
            disposeManner: this.ruleForm.disposeManner,
            epidemicMaterials: Number(epidemicMaterialsY),
            livePigNum: livePigNumList.join(' '),
            orderId: this.orderId,
            sequence: 2,
            illWeight: this.ruleForm.illWeight
          }).then(res => {
            this.$message.success('保存成功')
            this.getList()
            this.$refs[formName].resetFields()
            this.dialogFormVisible = false
          })
        } else {
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.dialogFormVisible = false
    },
    getList(obj) {
      postQuarantineGetQuarantineInfo({
        branchId: this.formSearch.branchId,
        enterTimeStart:
          this.formSearch.enterTime === ''
            ? ''
            : this.formSearch.enterTime[0] + ' 00:00:00',
        enterTimeEnd:
          this.formSearch.enterTime === ''
            ? ''
            : this.formSearch.enterTime[1] + ' 23:59:59',
        farmName: this.formSearch.farmName,
        orderNum: this.formSearch.orderNum,
        pageNum: this.listQuery.page,
        pageSize: this.listQuery.limit,
        pickupOddNum: this.formSearch.pickupOddNum,
        pickupPlateNumbers: this.formSearch.pickupPlateNumbers,
        quarantineStatus:
          this.formSearch.quarantineStatus === ''
            ? null
            : Number(this.formSearch.quarantineStatus),
        quarType: 2,
        shipper: this.formSearch.shipper,
        wholesaler: this.formSearch.wholesaler
      }).then(res => {
        this.tableData = res.result.list
        this.$nextTick(() => {
          this.total = Number(res.result.total)
        })

        this.tableData.forEach((v, i) => {
          v['state'] =
            v.quarantineStatus === 1
              ? '准入检疫-等待'
              : v.quarantineStatus === 2
                ? '准入检疫-通过'
                : v.quarantineStatus === 3
                  ? '准入检疫-异常'
                  : v.quarantineStatus === 4
                    ? '准宰检疫-等待'
                    : v.quarantineStatus === 5
                      ? '准宰检疫-通过'
                      : v.quarantineStatus === 6
                        ? '准宰检疫-异常'
                        : v.quarantineStatus === 7
                          ? '准出检疫-等待'
                          : v.quarantineStatus === 8
                            ? '准出检疫-通过'
                            : v.quarantineStatus === 9
                              ? '准出检疫-异常'
                              : ''
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
h1 {
  font-weight: 400;
  font-size: 30px;
}
.el-popper /deep/.el-cascader-menu__list {
  position: relative;
  min-height: 100%;
  width: 350px !important;
  margin: 0;
  padding: 6px 0;
  list-style: none;
  box-sizing: border-box;
}
.tuMustkillSure {
  line-height: 80px;
  font-size: 20px;
  text-align: center;
}
.diver-t {
  margin-top: 25px;
  /deep/.el-form-item {
    margin: auto;
    width: 80%;
    margin-bottom: 22px;
  }
  /deep/.el-input {
    width: 95% !important;
  }
}
.dashboard-container {
  overflow: hidden !important;
}
@page {
  size: auto A4 landscape; /*portrait： 纵向打印,  landscape: 横向*/
}
@media print {
  /deep/.el-table th {
    text-align: center !important;
  }
  /deep/tbody {
    text-align: center;
    border: 1px solid #000 !important;
  }
  /deep/th {
    border: 1px solid #000 !important;
  }
  /deep/td {
    border: 1px solid #000 !important;
  }
}
ul {
  list-style: none;
  display: flex;
  justify-content: space-between;
}
/deep/.el-dialog .el-dialog__footer {
  padding-bottom: 15px;
}
/deep/.el-table-column--selection {
  /deep/.cell {
    text-align: center;
  }
}
.search-wrap {
  /deep/.el-input {
    width: 200px !important;
    margin-right: 15px;
  }
}

.quarantine-line {
  width: 95%;
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
    width: 30%;
    font-size: 14px;
    color: #000000;
    opacity: 0.4;
    font-family: PingFang SC;
    p:nth-of-type(1) {
      // width: 45%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    p:nth-of-type(2) {
      width: 55%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      // text-align: right;
    }
  }
}
.quarantine-line1 {
  width: 100%;
  height: 1px;
  background-color: #e8e8e8;
  margin-top: 15px;
  margin-bottom: 15px;
}
// /deep/.el-select {
//   width: 100%;
// }
/deep/.el-dialog {
  /deep/.el-input {
    width: 100% !important;
  }
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
.quarantine-line1 {
  width: 100%;
  height: 1px;
  background-color: #e8e8e8;
  margin-top: 15px;
  margin-bottom: 15px;
}

.quarantine-xq22 {
  height: 380px;
  overflow: hidden;
  overflow: auto;
  /deep/.el-form {
    width: 80%;
    height: auto;
    margin: 0 auto;
    /deep/.el-form-item__label {
      padding: 0 20px 0 0;
    }
  }
}

.from-bottom {
  position: absolute;
  bottom: 0;
  right: 30px;
}
.quarantine-line2 {
  position: absolute;
  bottom: 80px;
  left: 0;
  right: 0;
  height: 1px;
  width: 100%;
  background-color: #e8e8e8;
}
</style>
