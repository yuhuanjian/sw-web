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
  <div ref="main" class="dashboard-container detail-con">
    <div ref="search">
      <headerxq
        title="检疫录入"
        routepush="slaughter"
        :header-list="headerList"
      />
    </div>
    <hr ref="action" class="wrap-line topmarg">
    <TableWrap>
      <div class="slaughter-b">
        <el-button
          type="primary"
          :disabled="isLrUs == 0 ? true : false"
          @click="accessgo"
        >录入结果</el-button>
      </div>
      <el-tabs
        v-model="activeName"
        style="height: 105%"
        @tab-click="handleClick"
      >
        <el-tab-pane label="非洲猪瘟检测登记" name="first" style="height: 105%">
          <div class="slauhhter-tab">非洲猪瘟检测登记表</div>
          <el-form
            ref="ruleForm"
            :model="ruleForm"
            :rules="rules"
            label-width="200px"
            class="demo-ruleForm"
          >
            <div class="slauhhter-left">
              <div class="slauhhter-left-1">
                <el-form-item label="检测日期：" prop="detectionDate">
                  <el-date-picker
                    v-model="ruleForm.detectionDate"
                    type="date"
                    :picker-options="pickerOptions"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    placeholder="请选择检测日期"
                    @focus="disableData"
                  />
                </el-form-item>
                <el-form-item label="来源（产地）：" prop="origin">
                  <el-input v-model="ruleForm.origin" />
                </el-form-item>
                <el-form-item
                  label="动物检疫合格证号："
                  prop="quarantineCertificateNum"
                >
                  <el-input v-model="ruleForm.quarantineCertificateNum" />
                </el-form-item>
                <el-form-item label="采样数量：" prop="sampleNum">
                  <el-input v-model="ruleForm.sampleNum" />
                </el-form-item>
                <el-form-item label="采样地点：" prop="sampleLocation">
                  <el-radio-group v-model="ruleForm.sampleLocation">
                    <el-radio :label="1">入厂前</el-radio>
                    <el-radio :label="2">屠宰前</el-radio>
                    <el-radio :label="3">待宰前</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="试剂生产厂家：" prop="reagentManufacturer">
                  <el-input v-model="ruleForm.reagentManufacturer" />
                </el-form-item>

                <el-form-item label="检测方法：" prop="detectionMethod">
                  <el-input v-model="ruleForm.detectionMethod" />
                </el-form-item>
              </div>
              <div class="slauhhter-left-1">
                <el-form-item label="货主：" prop="shipper">
                  <el-input v-model="ruleForm.shipper" />
                </el-form-item>
                <el-form-item label="车牌号码：" prop="plateNumbers">
                  <el-input v-model="ruleForm.plateNumbers" />
                </el-form-item>
                <el-form-item
                  label="用同批次屠宰量（头）："
                  prop="sameBatchNum"
                >
                  <el-input v-model="ruleForm.sameBatchNum" />
                </el-form-item>
                <!-- <el-form-item label="样品编号：" prop="specimenNo">
                  <el-input v-model="ruleForm.specimenNo" />
                </el-form-item> -->
                <el-form-item label="采样类型：" prop="sampleType">
                  <el-input v-model="ruleForm.sampleType" />
                </el-form-item>
                <el-form-item label="试剂批号：" prop="reagentBatchNum">
                  <el-input v-model="ruleForm.reagentBatchNum" />
                </el-form-item>
                <el-form-item label="检查结果：" prop="inspectionResult">
                  <el-radio-group v-model="ruleForm.inspectionResult">
                    <el-radio :label="1">阴性</el-radio>
                    <el-radio :label="2">阳性</el-radio>
                  </el-radio-group>
                </el-form-item>
              </div>
            </div>
            <div class="slauhhter-btn">
              <el-form-item>
                <el-button
                  type="primary"
                  @click="submitForm('ruleForm')"
                >保存</el-button>
                <el-button @click="resetForm('ruleForm')">取消</el-button>
              </el-form-item>
            </div>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="瘦肉精检测登记" name="second" style="height: 100%">
          <el-form
            ref="ruleForm1"
            :model="ruleForm1"
            :rules="rulesd"
            label-width="220px"
            class="demo-ruleForm"
          >
            <div class="slauhhter-left1">
              <div class="slauhhter-left-2">
                <el-form-item label="抽样日期：" prop="sampleDate">
                  <el-date-picker
                    v-model="ruleForm1.sampleDate"
                    :picker-options="pickerOptions"
                    type="date"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    placeholder="请选择抽样日期"
                    @focus="disableData"
                  />
                </el-form-item>
                <el-form-item label="抽样人：" prop="sampler">
                  <el-input v-model="ruleForm1.sampler" />
                </el-form-item>
                <el-form-item label="样品名称：" prop="specimenName">
                  <el-input v-model="ruleForm1.specimenName" />
                </el-form-item>
                <el-form-item
                  label="样品编号（盐酸克伦特罗）："
                  prop="specimenNoClen"
                >
                  <el-input v-model="ruleForm1.specimenNoClen" />
                </el-form-item>
                <el-form-item label="抽样数量：" prop="sampleNum">
                  <el-input v-model="ruleForm1.sampleNum" />
                </el-form-item>
                <el-form-item label="抽样地点：" prop="sampleLocation">
                  <el-select v-model="ruleForm1.sampleLocation" placeholder="">
                    <el-option label="德容待宰栏" value="德容待宰栏" />
                    <el-option label="德为待宰栏" value="德为待宰栏" />
                  </el-select>
                </el-form-item>
                <el-form-item
                  label="受检单位、联系电话："
                  prop="unitInspectedTelephone"
                >
                  <el-input v-model="ruleForm1.unitInspectedTelephone" />
                </el-form-item>

                <el-form-item label="受检人：" prop="inspectedPeople">
                  <el-input v-model="ruleForm1.inspectedPeople" />
                </el-form-item>
                <el-form-item label="处理方式：" prop="disposeManner">
                  <el-input v-model="ruleForm1.disposeManner" />
                </el-form-item>
              </div>
              <div class="slauhhter-left-2">
                <el-form-item label="抽样单位：" prop="sampleUnit">
                  <el-select v-model="ruleForm1.sampleUnit" placeholder="">
                    <el-option
                      label="顺德区德容食品公司"
                      value="顺德区德容食品公司"
                    />
                    <el-option
                      label="顺德区德为食品公司"
                      value="顺德区德为食品公司"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item label="校对人：" prop="collator">
                  <el-select
                    v-model="ruleForm1.collator"
                    placeholder="请选择校对人"
                    filterable
                  >
                    <el-option
                      v-for="item in userList"
                      :key="item.value"
                      :label="item.userName"
                      :value="item.userName"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item
                  label="样品编号（沙丁胺醇）："
                  prop="specimenNoAlbuterol"
                >
                  <el-input v-model="ruleForm1.specimenNoAlbuterol" />
                </el-form-item>
                <el-form-item
                  label="样品编号（莱克多巴胺）："
                  prop="specimenNoRactopamine"
                >
                  <el-input v-model="ruleForm1.specimenNoRactopamine" />
                </el-form-item>
                <el-form-item label="抽样基数：" prop="sampleCardinality">
                  <el-input v-model="ruleForm1.sampleCardinality" />
                </el-form-item>
                <el-form-item label="样品来源：" prop="specimenSource">
                  <div class="slaguage-specimenSource" style="width:110%">
                    <el-select
                      v-model="ruleForm1.specimenSource"
                      placeholder="请选择省"
                      style="width:30%"
                      @change="changeOrign($event)"
                    >
                      <el-option
                        v-for="(item, index) in getProvinceList"
                        :key="item.code"
                        :label="item.name"
                        :value="index"
                      />
                    </el-select>
                    <el-select
                      v-model="ruleForm1.city"
                      placeholder="请选择市"
                      style="width:30%"
                      @change="changeCity"
                    >
                      <el-option
                        v-for="(item, index) in getCityList"
                        :key="item.code"
                        :label="item.name"
                        :value="index"
                      />
                    </el-select>
                    <el-select
                      v-model="ruleForm1.county"
                      :disabled="
                        ruleForm1.city === undefined || ruleForm1.city === ''
                          ? true
                          : false
                      "
                      placeholder="请选择区"
                      style="width:30%"
                      @change="$forceUpdate()"
                    >
                      <el-option
                        v-for="(item, index) in getCountyList"
                        :key="item.code"
                        :label="item.name"
                        :value="item.name"
                      />
                    </el-select>
                  </div>
                </el-form-item>
                <el-form-item label="样品类型：" prop="specimenType">
                  <el-input v-model="ruleForm1.specimenType" />
                </el-form-item>
                <el-form-item label="检测结果：" prop="detectionConsequence">
                  <el-radio-group v-model="ruleForm1.detectionConsequence">
                    <el-radio :label="1">阴性</el-radio>
                    <el-radio :label="2">阳性</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="备注：" prop="comment">
                  <el-input v-model="ruleForm1.comment" />
                </el-form-item>
              </div>
            </div>
            <div class="slauhhter-btn">
              <el-form-item>
                <el-button
                  type="primary"
                  @click="submitForm1('ruleForm1')"
                >保存</el-button>
                <el-button @click="resetForm('ruleForm1')">取消</el-button>
              </el-form-item>
            </div>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </TableWrap>
    <el-dialog title="检疫录入" :close-on-click-modal="false" width="600px" :visible.sync="isshowDialog">
      <el-dialog
        width="600px"
        title="检疫录入"
        :close-on-click-modal="false"
        :visible.sync="innerVisible"
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
      <div class="quarantine-xq22">检疫是否通过?</div>
      <div class="quarantine-line" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="close">不通过</el-button>
        <el-button type="primary" @click="sure">通 过</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import headerxq from './components/headerxq'
import TableWrap from '@/components/TableWrap'
import {
  postQuarantineSaveCheckResult,
  allowKillQuarsaveSwFeverDeInfo,
  allowKillQuarsaveSampleInsRecInfo,
  postallowKillQuarquerySwFeverDeInfo,
  postallowKillquerysampleInsRecordInfoByOrderId,
  postdropDownuser
} from '@/api/jyzyy'
import orderApi from '@/api/orderApi'
import { postFindOrdersById } from '@/api/order.js'
export default {
  components: {
    TableWrap,
    headerxq
  },
  data() {
    var checksampleNumss = (rule, value, callback) => {
      if (/^[0-9]+$/.test(value)) {
        callback()
      } else {
        return callback(new Error('请填写正整数'))
      }
    }
    var checksampleNum = (rule, value, callback) => {
      if (/^[0-9]{1,2}$/.test(value)) {
        callback()
      } else {
        return callback(new Error('请填写1-2位的正整数'))
      }
    }
    var checkspecimenNo = (rule, value, callback) => {
      if (/^[0-9A-Z]{2,10}$/.test(value)) {
        callback()
      } else {
        return callback(new Error('请输入2-10位的数字、大写字母'))
      }
    }
    var checkspecimenNoClen = (rule, value, callback) => {
      if (/^[0-9A-Z]{2,20}$/.test(value)) {
        callback()
      } else {
        return callback(new Error('请输入2-20位的数字、大写字母'))
      }
    }
    var checkspecimenNoAlbuterol = (rule, value, callback) => {
      if (/^[0-9A-Za-z]{2,20}$/.test(value)) {
        callback()
      } else {
        return callback(new Error('请输入2-20位的数字、字母'))
      }
    }

    var checkpickupPlateNumbers = (rule, value, callback) => {
      if (/^[0-9a-zA-Z\u4e00-\u9fa5]{7,8}$/.test(value)) {
        callback()
      } else {
        return callback(new Error('请输入7-8位仅中文、数字、字母'))
      }
    }
    var checksshipper = (rule, value, callback) => {
      if (/^.{2,20}$/.test(value)) {
        callback()
      } else {
        return callback(new Error('请填写2-20位的文本'))
      }
    }
    var check20 = (rule, value, callback) => {
      if (/^.{2,20}$/.test(value)) {
        callback()
      } else {
        return callback(new Error('请填写2-20位的文本'))
      }
    }
    var check20s = (rule, value, callback) => {
      if (value) {
        if (/^.{2,20}$/.test(value)) {
          callback()
        } else {
          return callback(new Error('请填写2-20位的文本'))
        }
      } else {
        callback()
      }
    }

    var checkcomment = (rule, value, callback) => {
      if ((value + '').length <= 200) {
        callback()
      } else {
        return callback(new Error('不能超过200过文本'))
      }
    }
    return {
      innerVisible: false,
      activeName: 'first',
      isshowDialog: false,
      radio: '',
      headerList: {},
      ruleForm: {
        detectionDate: '',
        detectionMethod: 'PCR检测',
        inspectionResult: 1,
        orderId: '',
        origin: '',
        plateNumbers: '',
        quarantineCertificateNum: '',
        reagentBatchNum: '',
        reagentManufacturer: '',
        sameBatchNum: '',
        sampleLocation: 3,
        sampleNum: '',
        sampleType: '',
        shipper: '',
        specimenNo: '',
        isLr: false
      },
      ruleForm1: {
        collator: '',
        comment: '',
        detectionConsequence: 1,
        disposeManner: '',
        inspectedPeople: '',
        orderId: '',
        sampleCardinality: '',
        sampleDate: '',
        sampleLocation: '德容待宰栏',
        sampleNum: '',
        sampleUnit: '顺德区德容食品公司',
        sampler: '',
        specimenName: '猪尿',
        specimenNoAlbuterol: 'SAL',
        specimenNoClen: 'SRJ',
        specimenNoRactopamine: 'DBA',
        specimenSource: '',
        specimenType: '尿样',
        unitInspectedTelephone: '',
        city: '',
        county: '',
        isLr: false
      },
      rulesd: {
        detectionDate: [
          { required: true, message: '请输入检测日期', trigger: 'change' }
        ],
        origin: [
          { required: true, message: '请输入来源（产地）', trigger: 'change' }
        ],
        quarantineCertificateNum: [
          {
            required: true,
            message: '请输入动物检疫合格证号',
            trigger: 'change'
          },
          { validator: checkspecimenNoAlbuterol, trigger: 'change' }
        ],
        sampleNum: [
          { required: true, message: '请输入抽样数量', trigger: 'change' },
          { validator: checksampleNum, trigger: 'change' }
        ],

        reagentManufacturer: [
          { required: true, message: '请输入试剂生产厂家', trigger: 'change' },
          { validator: check20, trigger: 'change' }
        ],
        detectionMethod: [
          { required: true, message: '请输入检测方法', trigger: 'change' },
          { validator: check20, trigger: 'change' }
        ],
        shipper: [
          { required: true, message: '请输入货主', trigger: 'change' },
          { validator: checksshipper, trigger: 'change' }
        ],
        plateNumbers: [
          { required: true, message: '请输入车牌号码', trigger: 'change' },
          { validator: checkpickupPlateNumbers, trigger: 'change' }
        ],
        sameBatchNum: [
          {
            required: true,
            message: '请输入用同批次屠宰量',
            trigger: 'change'
          }
        ],
        specimenNo: [
          { required: true, message: '请输入样品编号', trigger: 'change' },
          { validator: checkspecimenNo, trigger: 'change' }
        ],
        sampleType: [
          { required: true, message: '请输入采样类型', trigger: 'change' },
          { validator: check20, trigger: 'change' }
        ],
        reagentBatchNum: [
          { required: true, message: '请输入试剂批号', trigger: 'change' },
          { validator: check20, trigger: 'change' }
        ],
        inspectionResult: [
          { required: true, message: '请选择检查结果', trigger: 'change' }
        ],
        // ------------------------------------------
        sampleDate: [
          { required: true, message: '请输入抽样日期', trigger: 'change' }
        ],
        sampler: [
          { required: true, message: '请输入抽样人', trigger: 'change' },
          { validator: checksshipper, trigger: 'change' }
        ],
        specimenName: [
          {
            required: true,
            message: '请输入样品名称',
            trigger: 'change'
          },
          { validator: check20, trigger: 'change' }
        ],
        sampleLocation: [
          { required: true, message: '请输入抽样地点', trigger: 'change' },
          { validator: check20, trigger: 'change' }
        ],
        unitInspectedTelephone: [
          {
            required: true,
            message: '请输入受检单位、联系电话',
            trigger: 'change'
          },
          { validator: check20, trigger: 'change' }
        ],
        inspectedPeople: [
          { required: true, message: '请输入受检人', trigger: 'change' },
          { validator: checksshipper, trigger: 'change' }
        ],
        disposeManner: [
          { message: '请输入处理方式', trigger: 'change' },
          { validator: check20s, trigger: 'change' }
        ],
        sampleUnit: [
          {
            required: true,
            message: '请输入抽样单位',
            trigger: 'change'
          },
          { validator: check20, trigger: 'change' }
        ],
        collator: [
          { required: true, message: '请输入校对人', trigger: 'change' },
          { validator: checksshipper, trigger: 'change' }
        ],
        specimenNoAlbuterol: [
          { required: true, message: '请输入样品编号', trigger: 'change' },
          { validator: checkspecimenNoClen, trigger: 'change' }
        ],
        specimenNoClen: [
          { required: true, message: '请输入样品编号', trigger: 'change' },
          { validator: checkspecimenNoClen, trigger: 'change' }
        ],
        specimenNoRactopamine: [
          { required: true, message: '请输入样品编号', trigger: 'change' },
          { validator: checkspecimenNoClen, trigger: 'change' }
        ],
        sampleCardinality: [
          { required: true, message: '请输入抽样基数', trigger: 'change' }
        ],
        specimenSource: [
          { required: true, message: '请选择样品来源', trigger: 'change' }
        ],
        specimenType: [
          { required: true, message: '请输入样品类型', trigger: 'change' },
          { validator: check20, trigger: 'change' }
        ],
        detectionConsequence: [
          { required: true, message: '请选择检查结果', trigger: 'change' }
        ],
        comment: [
          { required: false, message: '请输入备注', trigger: 'change' },
          { validator: checkcomment, trigger: 'change' }
        ]
        // bzhu: [
        //   { required: true, message: '请选择检查结果', trigger: 'change' }
        // ]
      },
      rules: {
        detectionDate: [
          { required: true, message: '请输入检测日期', trigger: 'change' }
        ],
        origin: [
          { required: true, message: '请输入来源（产地）', trigger: 'change' }
        ],
        quarantineCertificateNum: [
          {
            required: true,
            message: '请输入动物检疫合格证号',
            trigger: 'change'
          },
          { validator: checkspecimenNoAlbuterol, trigger: 'change' }
        ],
        sampleNum: [
          { required: true, message: '请输入采样数量', trigger: 'change' },
          { validator: checksampleNum, trigger: 'change' }
        ],
        sampleLocation: [
          { required: true, message: '请选择采样地点', trigger: 'change' }
        ],
        reagentManufacturer: [
          { required: true, message: '请输入试剂生产厂家', trigger: 'change' },
          { validator: check20, trigger: 'change' }
        ],
        detectionMethod: [
          { required: true, message: '请输入检测方法', trigger: 'change' },
          { validator: check20, trigger: 'change' }
        ],
        shipper: [
          { required: true, message: '请输入货主', trigger: 'change' },
          { validator: checksshipper, trigger: 'change' }
        ],
        plateNumbers: [
          { required: true, message: '请输入车牌号码', trigger: 'change' },
          { validator: checkpickupPlateNumbers, trigger: 'change' }
        ],
        sameBatchNum: [
          {
            required: true,
            message: '请输入用同批次屠宰量',
            trigger: 'change'
          },
          { validator: checksampleNumss, trigger: 'change' }
        ],
        specimenNo: [
          { required: true, message: '请输入样品编号', trigger: 'change' },
          { validator: checkspecimenNo, trigger: 'change' }
        ],
        sampleType: [
          { required: true, message: '请输入采样类型', trigger: 'change' },
          { validator: check20, trigger: 'change' }
        ],
        reagentBatchNum: [
          { required: true, message: '请输入试剂批号', trigger: 'change' },
          { validator: check20, trigger: 'change' }
        ],
        inspectionResult: [
          { required: true, message: '请选择检查结果', trigger: 'change' }
        ],
        // ------------------------------------------
        sampleDate: [
          { required: true, message: '请输入抽样日期', trigger: 'change' }
        ],
        sampler: [
          { required: true, message: '请输入抽样人', trigger: 'change' },
          { validator: checksshipper, trigger: 'change' }
        ],
        specimenName: [
          {
            required: true,
            message: '请输入样品名称',
            trigger: 'change'
          },
          { validator: check20, trigger: 'change' }
        ],

        unitInspectedTelephone: [
          {
            required: true,
            message: '请输入受检单位、联系电话',
            trigger: 'change'
          },
          { validator: check20, trigger: 'change' }
        ],
        inspectedPeople: [
          { required: true, message: '请输入受检人', trigger: 'change' },
          { validator: checksshipper, trigger: 'change' }
        ],
        disposeManner: [
          { message: '请输入处理方式', trigger: 'change' },
          { validator: check20, trigger: 'change' }
        ],
        sampleUnit: [
          {
            required: true,
            message: '请输入抽样单位',
            trigger: 'change'
          },
          { validator: check20, trigger: 'change' }
        ],
        collator: [
          { required: true, message: '请输入校对人', trigger: 'change' },
          { validator: checksshipper, trigger: 'change' }
        ],
        specimenNoAlbuterol: [
          { required: true, message: '请输入样品编号', trigger: 'change' },
          { validator: checkspecimenNoClen, trigger: 'change' }
        ],
        specimenNoClen: [
          { required: true, message: '请输入样品编号', trigger: 'change' },
          { validator: checkspecimenNoClen, trigger: 'change' }
        ],
        specimenNoRactopamine: [
          { required: true, message: '请输入样品编号', trigger: 'change' },
          { validator: checkspecimenNoClen, trigger: 'change' }
        ],
        sampleCardinality: [
          { required: true, message: '请输入抽样基数', trigger: 'change' }
        ],
        specimenSource: [
          { required: true, message: '请输入样品来源', trigger: 'change' }
        ],
        specimenType: [
          { required: true, message: '请输入样品类型', trigger: 'change' },
          { validator: check20, trigger: 'change' }
        ],
        detectionConsequence: [
          { required: true, message: '请选择检查结果', trigger: 'change' }
        ],
        comment: [
          { message: '请输入备注', trigger: 'change' },
          { max: 200, message: '上限为200个字符', trigger: 'change' }
        ]
        // bzhu: [
        //   { required: true, message: '请选择检查结果', trigger: 'change' }
        // ]
      },
      isLURY: false,
      isLURY1: false,
      getProvinceList: [],
      getCityList: [],
      getCountyList: [],
      originEntity: {},
      locationis: 0,
      locationisy: 0,
      detailsMessage: {},
      isLrUs: 1,
      isLr: false,
      isLrs: false,
      originOld: '',
      userList: [],
      pickerOptions: {
        // 控制时间范围
        disabledDate(time) {
          return time.getTime() > Date.now() - 24 * 60 * 60 * 1000
        }
      }
    }
  },
  created() {
    this.detailsMessage = JSON.parse(localStorage.getItem('detailsMessage-s'))
    this.originEntity = JSON.parse(this.detailsMessage.originEntity)

    postallowKillQuarquerySwFeverDeInfo(this.detailsMessage.id).then(res => {
      if (res.result.orderId == null) {
        this.isLr = false
      } else {
        this.isLr = true
        this.ruleForm = res.result
        this.ruleForm.origin = this.ruleForm.origin.replace(/,/g, ' ')
        this.ruleForm.sampleLocation = this.ruleForm.sampleLocation * 1
      }
    })
    postallowKillquerysampleInsRecordInfoByOrderId(this.detailsMessage.id).then(
      res => {
        if (!res.result) {
          this.isLrs = false
          this.ruleForm1.specimenSource = this.originEntity.province.name
          this.ruleForm1.city = this.originEntity.city.name
          this.ruleForm1.county = this.originEntity.district.name
          this.$set(this.ruleForm1, 'county', this.originEntity.district.name)
          orderApi.postareagetProvince().then(res => {
            this.getProvinceList = res.result
            orderApi
              .postareagetgetCity(
                `provinceCode=${this.originEntity.province.code}`
              )
              .then(res => {
                this.getCityList = res.result
                orderApi
                  .postareagetgetCounty(
                    `cityCode=${this.originEntity.city.code}`
                  )
                  .then(res => {
                    this.getCountyList = res.result
                  })
              })
          })
        } else {
          this.isLrs = true
          this.ruleForm1 = res.result
          this.ruleForm1.detectionConsequence =
            this.ruleForm1.detectionConsequence * 1
          this.ruleForm1.specimenSource = this.ruleForm1.originEntity.province.name
          this.ruleForm1.city = this.ruleForm1.originEntity.city.name
          this.ruleForm1.county = this.ruleForm1.originEntity.district.name
          orderApi.postareagetProvince().then(res => {
            this.getProvinceList = res.result
            orderApi
              .postareagetgetCity(
                `provinceCode=${this.ruleForm1.originEntity.province.code}`
              )
              .then(res => {
                this.getCityList = res.result
                orderApi
                  .postareagetgetCounty(
                    `cityCode=${this.ruleForm1.originEntity.city.code}`
                  )
                  .then(res => {
                    this.getCountyList = res.result
                  })
              })
          })
        }
      }
    )
    orderApi.postareagetProvince().then(res => {
      this.getProvinceList = res.result
    })
    postFindOrdersById(this.detailsMessage.id).then(res => {
      this.headerList = res.result
      this.headerList.wholesaler = this.$route.query.wholesaler
      this.ruleForm.shipper = this.headerList.shipper
      this.ruleForm1.inspectedPeople = this.headerList.shipper
      this.ruleForm1.sampleDate = this.headerList.enterTime
      this.ruleForm.detectionDate = this.headerList.enterTime
      this.ruleForm.plateNumbers = this.headerList.pickupPlateNumbers
      this.ruleForm.sameBatchNum = this.headerList.practicalEnterNum
      if (res.result.practicalEnterNum && res.result.practicalEnterNum <= 50) {
        this.ruleForm.sampleNum = 3
        this.ruleForm1.sampleNum = 3
      } else {
        this.ruleForm.sampleNum = Math.ceil(res.result.practicalEnterNum * 0.05)
        this.ruleForm1.sampleNum = Math.ceil(
          res.result.practicalEnterNum * 0.05
        )
      }
      this.ruleForm1.sampler = localStorage.getItem('SET_NAME')
      this.ruleForm1.unitInspectedTelephone = res.result.shipperPhone
      this.ruleForm1.sampleCardinality = this.headerList.practicalEnterNum
      this.ruleForm.quarantineCertificateNum = this.headerList.quarantineCertificateNum
      this.ruleForm.origin = this.headerList.origin.replace(/,/g, '')
      this.originOld = this.headerList.origin
    })
    if (localStorage.getItem('isLrU')) {
      this.isLrUs = localStorage.getItem('isLrU')
    }
    postdropDownuser().then(res => {
      this.userList = res.result
    })
  },
  methods: {
    disableData(row) {
      this.pickerOptions = {
        disabledDate(time) {
          // 意思是如果大于row.date的时间则不能选择
          return time.getTime() > Date.now()
        }
      }
    },
    changeOrign(val) {
      this.ruleForm1.specimenSource = this.getProvinceList[val].name
      this.ruleForm1.city = ''
      this.$set(this.ruleForm1, 'county', '')
      orderApi
        .postareagetgetCity(`provinceCode=${this.getProvinceList[val].code}`)
        .then(res => {
          this.ruleForm.origin = this.getProvinceList[val].name
          this.getCityList = res.result
        })
    },
    changeCity(val) {
      this.ruleForm1.city = this.getCityList[val].name
      orderApi
        .postareagetgetCounty(`cityCode=${this.getCityList[val].code}`)
        .then(res => {
          this.getCountyList = res.result
        })
    },
    getList() {},
    // 检疫通过
    accessgo() {
      if (this.isLr && this.isLrs) {
        this.isshowDialog = true
      } else {
        this.$message.error('请先填写登记表再执行录入操作！')
      }
    },
    sure() {
      postQuarantineSaveCheckResult({
        orderId: this.detailsMessage.id,
        quarantineResult: 1,
        quarType: 2
      }).then(res => {
        this.isshowDialog = false
        this.$message.success(res.result)
        localStorage.setItem('isLrU', 0)
        const nowRouter = this.$route
        const obj = {
          label: nowRouter.meta.tagName || nowRouter.meta.title,
          path: nowRouter.path,
          name: nowRouter.name,
          lastTime: new Date().getTime()
        }
        this.$store.dispatch('app/deleteTagNavList', obj)
        this.$router.push({
          path: 'slaughter'
        })
      })
    },
    close() {
      this.innerVisible = true
      this.isshowDialog = false
    },
    cancle() {
      this.innerVisible = false
    },
    sureNo() {
      postQuarantineSaveCheckResult({
        orderId: this.detailsMessage.id,
        quarantineResult: 0,
        quarType: 2
      }).then(res => {
        this.innerVisible = false
        localStorage.setItem('isLrU', 0)
        this.$message.success(res.result)
        this.isshowDialog = false
        const nowRouter = this.$route
        const obj = {
          label: nowRouter.meta.tagName || nowRouter.meta.title,
          path: nowRouter.path,
          name: nowRouter.name,
          lastTime: new Date().getTime()
        }
        this.$store.dispatch('app/deleteTagNavList', obj)
        this.$router.push({
          path: 'slaughter'
        })
      })
    },
    handleClick(tab, event) {
      this.getList()
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const addressd1 = this.ruleForm.origin
          this.ruleForm.detectionDate =
            this.ruleForm.detectionDate + ' 00:00:00'
          this.ruleForm.orderId = this.detailsMessage.id
          this.ruleForm.origin = this.originOld
          allowKillQuarsaveSwFeverDeInfo({ ...this.ruleForm }).then(res => {
            this.$message.success('非洲猪瘟检测登记成功')
            this.ruleForm.origin = addressd1
            this.isLr = true
          })
        } else {
          return false
        }
      })
    },
    submitForm1(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const addressd = this.ruleForm1.specimenSource
          this.ruleForm1.orderId = this.detailsMessage.id
          this.ruleForm1.specimenSource =
            this.ruleForm1.specimenSource +
            ',' +
            this.ruleForm1.city +
            ',' +
            this.ruleForm1.county
          this.ruleForm1.sampleDate = this.ruleForm1.sampleDate + ' 00:00:00'
          allowKillQuarsaveSampleInsRecInfo({ ...this.ruleForm1 }).then(res => {
            this.$message.success('瘦肉精检测登记成功')
            this.ruleForm1.specimenSource = addressd
            localStorage.setItem('isLrs', this.ruleForm1.isLr)
            this.isLrs = true
          })
        } else {
          return false
        }
      })
    },
    resetForm(formName) {
      this.$router.push({
        path: 'slaughter'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.slaguage-specimenSource {
  display: flex;
  justify-content: space-between;
  .el-input {
    width: 100% !important;
  }
}
.table-wrap {
  padding: 0px !important;
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
/deep/.el-tabs__nav {
  white-space: nowrap;
  position: relative;
  height: 50px;
  line-height: 50px;
  transition: transform 0.3s;
  float: left;
  z-index: 2;
}
/deep/.el-tabs__content {
  height: calc(100% - 60px) !important;
  overflow: auto !important;
}
.quarantine-line {
  width: 100%;
  height: 1px;
  background-color: #e8e8e8;
  margin: 0 auto;
  margin-bottom: 5px;
}
.quarantine-xq22 {
  line-height: 150px;
  font-size: 20px;
  font-weight: lighter;
}
/deep/.el-dialog__header {
  // background-color: #d9e0df;
  padding: 15px 20px 10px;
}
/deep/.el-dialog__body {
  padding: 0px 30px;
}
/deep/.el-dialog .el-dialog__footer {
  padding-bottom: 15px;
}
.topmarg {
  margin-top: 20px;
}
.slauhhter-btn {
  /deep/.el-form-item__content {
    margin-left: 0px !important;
    text-align: center;
  }
}
.slauhhter-left-2 {
  width: 50%;
  /deep/.el-input {
    width: 300px;
  }
  .slaguage-specimenSource {
    display: flex;
    justify-content: space-between;
    /deep/.el-input {
      width: 100% !important;
      .el-input__suffix {
        .el-input__icon {
          line-height: 20px;
        }
      }
    }
  }
}
.slauhhter-left {
  width: 80%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  .slauhhter-left-1 {
    width: 50%;
    /deep/.el-input {
      width: 300px;
      height: 40px;
    }
  }
}
.slauhhter-left1 {
  width: 80%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  /deep/.el-form-item {
    height: 32px;
  }
  /deep/.el-input__inner {
    height: 35px;
  }
  /deep/.el-form-item__content {
    height: 35px;
  }
  .slauhhter-left-1 {
    width: 50%;
    /deep/.el-input {
      width: 300px;
      height: 40px;
    }
  }
}
.accss-bottom {
  width: 100%;
  text-align: center;
  /deep/.el-button {
    margin: 0 auto;
  }
}

.slaughter-b {
  position: absolute;
  right: 20px;
  top: 5px;
  height: 30px;
  z-index: 999999;
}
.table-wrap {
  position: relative;
}
.slauhhter-tab {
  width: 100%;
  text-align: center;
  line-height: 40px;
  margin-bottom: 10px;
}
</style>
