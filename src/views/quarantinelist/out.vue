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
    <!-- <div class="quarantine-Top">
      <p>检疫管理</p>
      <span><span>*</span>为必填项</span>
    </div>-->
    <!-- <div class="quarantine-line" /> -->
    <div ref="search" class="search-wrap">
      <el-form :inline="true" :model="formSearch" class="demo-form-inline">
        <el-row>
        <el-form-item label>
          <el-input
            v-model="formSearch.orderNum"
            placeholder="请输入订单编号"
          />
        </el-form-item>
        <el-form-item label>
          <el-input v-model="formSearch.shipper" placeholder="请输入货主名称" />
        </el-form-item>
        <el-form-item label>
          <el-select
            v-model="formSearch.quarantineStatus"
            placeholder="检疫状态"
          >
            <el-option label="准出检疫-等待" value="7" />
            <el-option label="准出检疫-通过" value="8" />
            <el-option label="准出检疫-异常" value="9" />
          </el-select>
        </el-form-item>
        <el-form-item label>
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
            v-has="'allowOutQuarantine:query'"
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
        <el-form-item label v-show="showSearch">
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
        <el-form-item label v-show="showSearch">
          <el-input
            v-model="formSearch.pickupPlateNumbers"
            placeholder="请输入车牌号"
          />
        </el-form-item>
        <el-form-item label v-show="showSearch">
          <el-input
            v-model="formSearch.pickupOddNum"
            placeholder="请输入提货单号"
          />
        </el-form-item>
        <el-form-item label v-show="showSearch">
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
        <!-- <el-button type="primary" icon="el-icon-printer" plain @click="dialogFormVisible=true">打印</el-button> -->
        <!-- <el-button type="primary" icon="el-icon-plus" @click="dialogFormVisible=true">新增异常</el-button> -->
      </div>
      <div>
        <el-button
          v-has="'allowOutQuarantine:export'"
          type="primary"
          icon="el-icon-upload2"
          @click="exportZY"
        >导出</el-button>
      </div>
    </div>
    <TableWrap>
      <el-table
        :data="tableData"
        border
        stripe
        style="width: 100%"
        height="100%"
      >
        <el-table-column type="index" align="center" label="序号" width="55" />
        <el-table-column
          prop="orderNum"
          label="订单编号"
          min-width="150"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <p class="p-blue">{{ scope.row.orderNum }}</p>
          </template>
        </el-table-column>
        <el-table-column
          prop="farmName"
          label="养殖场名称"
          min-width="150"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <p class="p-blue">{{ scope.row.farmName }}</p>
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
            <p v-if="scope.row.quarantineStatus === 7" class="root-status-f">
              <span />
              {{ scope.row.state }}
            </p>
            <p v-if="scope.row.quarantineStatus === 8" class="root-status-s">
              <span />
              {{ scope.row.state }}
            </p>
            <p v-if="scope.row.quarantineStatus === 9" class="root-status-r">
              <span />
              {{ scope.row.state }}
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
        <el-table-column fixed="right" label="操作" width="150">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.quarantineStatus === 7"
              v-has="'allowOutQuarantine:add'"
              type="text"
              size="small"
              @click="handleClick(scope.row)"
            >检疫录入
            </el-button>
            <el-button
              v-if="scope.row.quarantineStatus != 7"
              v-has="'allowOutQuarantine:detail'"
              type="text"
              size="small"
              @click="handleClick(scope.row)"
            >检疫详情
            </el-button>
            <el-button
              v-if="scope.row.quarantineStatus !== 9"
              v-has="'allowOutQuarantine:abnormalInput'"
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
            <el-select
              v-model="ruleForm.abnormalType"
              placeholder="请选择"
              @change="changeabnormalType"
            >
              <el-option label="检疫不合格" value="5" />
              <el-option label="病料" value="6" />
            </el-select>
          </el-form-item>
          <el-form-item
            v-if="ruleForm.abnormalType != 6"
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
              clearable
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
            v-if="ruleForm.abnormalType != 6"
            label="是否计入病料:"
            prop="epidemicMaterials"
            :label-width="formLabelWidth"
          >
            <el-radio-group v-model="ruleForm.epidemicMaterials">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="2">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <div
            v-if="
              ruleForm.epidemicMaterials === 1 || ruleForm.abnormalType == 6
            "
          >
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
    <el-dialog title="检疫录入" :close-on-click-modal="false" :visible.sync="isshowOut">
      <div class="quarantine-xq">
        <p class="l18">订单详情</p>
      </div>
      <div class="quarantine-xq1">
        <div class="quarantine-xq2">
          <p>订单编号：</p>
          <p>{{ orderNum }}</p>
        </div>
        <div class="quarantine-xq2">
          <p>养殖场名称：</p>
          <p>{{ farm }}</p>
        </div>

        <div class="quarantine-xq2">
          <p>所属批发商：</p>
          <p>{{ wholesale }}</p>
        </div>
      </div>
      <div class="quarantine-xq1">
        <div class="quarantine-xq2">
          <p>生猪数量：</p>
          <p>{{ pignum }}</p>
        </div>
      </div>
      <el-dialog
        width="600px"
        title="检疫录入"
        :visible.sync="innerVisible"
        :close-on-click-modal="false"
        append-to-body
      >
        <div class="access-Dialog">
          <i class="el-icon-warning" />
          <p>检疫不通过的订单将被锁定并无法继续进行，是否确认检疫不通过？</p>
        </div>
        <div class="quarantine-line" />
        <span slot="footer" class="dialog-footer">
          <el-button @click="cancle">取 消</el-button>
          <el-button type="primary" @click="sureNo">确 定</el-button>
        </span>
      </el-dialog>
      <div class="quarantine-line1" />
      <div class="quarantine-text">当前所选订单准出检疫是否通过？</div>
      <div class="quarantine-line1" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="close">不通过</el-button>
        <el-button type="primary" @click="sure">通 过</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { addDate, uniqueArray } from '@/utils/Data'

import TableWrap from '@/components/TableWrap'
import Pagination from '@/components/pagination'
import { branchDropDown } from '@/utils/mixin'
import {
  postQuarantineGetQuarantineInfo,
  postQuarantineSaveAbnormalInfo,
  GetQuarantineexportQuarantineInfo,
  dropDownfarm,
  dropDownwholesaler,
  dropDownlivePigNum
} from '@/api/jyzyy'
import { postQuarantineSaveCheckResult } from '@/api/jyzyy'
import _ from 'lodash'

export default {
  name: 'Admin',
  components: {
    Pagination,
    TableWrap
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
    return {
      farmNameList: [],

      innerVisible: false,

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
      isshowOut: false,
      orderNumb: '2020121515',
      farm: '',
      wholesale: '',
      pignum: 0,
      total: 200,
      rules: {
        nameboss: [
          { required: true, message: '请输入屠宰负责人', trigger: 'change' }
        ],
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
        ]
      },
      listQuery: {
        page: 1,
        limit: 10
      },
      input1: '',
      resourceData: '',
      formLabelWidth: '120px',
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
      tableData: [],
      newtableData: [],
      oldtableData: [],
      orderNumber: '2020121515',
      orderId: '202015154',
      wholesaler: '',
      shipper: '',
      enterTime: '',
      orderidC: '',
      orderNum: '',
      wholesalerList: [],
      options: [],
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
    if (this.$route.query.branchId || this.$route.query.branchId == '') {
      this.formSearch.branchId = this.$route.query.branchId
    }
    this.getList()
  },
  methods: {
    changeabnormalType() {
      this.ruleForm.epidemicMaterials = ''
    },
    // 多选框
    handleSelectionChange(val) {
      this.SelectionList = val
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
        }&wholesaler=${this.formSearch.wholesaler}&quarType=3&branchId=${this.formSearch.branchId}`
      )
    }, 500),
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
      this.orderId = obj.id
      this.orderNum = obj.orderNum
      this.wholesaler = obj.wholesalerList
      this.shipper = obj.shipper
      this.enterTime = obj.enterTime
      this.$refs[formName] && this.$refs[formName].resetFields()
    },
    cancle() {
      this.innerVisible = false
    },
    sureNo() {
      postQuarantineSaveCheckResult({
        orderId: this.orderidC,
        quarantineResult: 0,
        quarType: 3
      }).then(res => {
        this.innerVisible = false
        this.getList()
      })
    },
    reset() {
      for (const key in this.formSearch) {
        this.formSearch[key] = ''
      }
      this.formSearch.branchId = localStorage.getItem('userTypeSW') === '0' ? '' : localStorage.getItem('nowbranchDropDown')

      this.inquire()
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
        quarType: 3,
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
    close() {
      this.innerVisible = true
      this.isshowOut = false
    },
    noPass() {
      this.isshowOut = false
    },
    sure() {
      postQuarantineSaveCheckResult({
        orderId: this.orderidC,
        quarantineResult: 1,
        quarType: 3
      }).then(res => {
        this.isshowOut = false
        this.getList()
        this.$message.success('已通过')
      })
    },
    handleClick(row) {
      if (row.quarantineStatus !== 7) {
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
          path: 'outXq',
          query: {
            wholesaler: row.wholesalerList,
            id: row.id
          }
        })
      } else {
        this.orderNum = row.orderNum
        this.farm = row.farmName
        this.wholesale = row.wholesalerList
        this.pignum = row.qualifiedNum
        this.orderidC = row.id
        this.isshowOut = true
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
          if (this.ruleForm.livePigNum == '') {
          } else {
            this.ruleForm.livePigNum.forEach(v => {
              livePigNumList.push(v[0])
            })
          }

          postQuarantineSaveAbnormalInfo({
            abnormalDate: abData + ' ' + '00:00:00',
            abnormalType: Number(this.ruleForm.abnormalType),
            disposeCause: this.ruleForm.disposeCause,
            disposeManner: this.ruleForm.disposeManner,
            epidemicMaterials: this.ruleForm.epidemicMaterials,
            livePigNum:
              this.ruleForm.livePigNum == '' ? '' : livePigNumList.join(' '),
            orderId: this.orderId,
            sequence: 3, // 不确定,
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
        quarType: 3,
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
/deep/.el-table-column--selection {
  /deep/.cell {
    text-align: center;
  }
}
/deep/.el-dialog .el-dialog__footer {
  padding-bottom: 15px;
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
.quarantine-text {
  width: 100%;
  line-height: 100px;
  font-size: 20px;
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

.quarantine-line1 {
  width: 100%;
  height: 1px;
  background-color: #e8e8e8;
  margin-top: 15px;
  margin-bottom: 15px;
}
/deep/.el-select {
  width: 100%;
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
  /deep/.el-input {
    width: 100%;
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
.access-Dialog {
  width: 100%;
  height: 160px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  font-size: 20px;
  i {
    font-size: 50px;
    margin-right: 15px;
    color: red;
  }
}
</style>
