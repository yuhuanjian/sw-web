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
  <div ref="main" class="dashboard-container">
    <!-- 查询 -->
    <!-- <div ref="search" class="search-wrap" /> -->
    <div class="top">
      <div class="">新增订单</div>
      <div class=""><span style="color: red">*</span>为必填项</div>
    </div>

    <!-- 列表操作 -->
    <div ref="action" class="action-wrap">
      <div class="content">
        <el-form
          ref="ruleForm"
          :model="ruleForm"
          :rules="rules"
          label-width="200px"
          class="demo-ruleForm"
        >
          <div class="title">
            <div class="title-right">
              <div class="shu" />
              <div>订单信息</div>
            </div>
          </div>
          <el-form-item
            label="养殖场名称:"
            :label-width="formLabelWidth"
            prop="farmName"
          >
            <el-select
              v-model="ruleForm.farmName"
              style="width: 460px"
              placeholder="请选择养殖场名称"
              filterable
              allow-create
              @change="farmChange($event)"
            >
              <el-option
                v-for="(item, index) in farmNameList"
                :key="index"
                :label="item.name"
                :value="item.name"
              />
            </el-select>
          </el-form-item>
          <el-form-item
            label="货主代表:"
            :label-width="formLabelWidth"
            prop="owners"
          >
            <el-input
              v-model.trim="ruleForm.owners"
              autocomplete="off"
              style="width: 460px"
              placeholder="请输入货主代表"
            />
          </el-form-item>
          <el-form-item
            label="产地:"
            :label-width="formLabelWidth"
            prop="origin"
          >
          <el-col :span="24">
            <el-select
              v-model="ruleForm.origin"
              placeholder="请选择省"
              style="width: 140px; margin-right: 20px; margin-bottom: 22px"
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
              v-model="ruleForm.city"
              :disabled="
                ruleForm.origin === undefined || ruleForm.origin === ''
                  ? true
                  : false
              "
              placeholder="请选择市"
              style="width: 140px; margin-right: 20px; margin-bottom: 22px"
              @change="changeCity"
            >
              <el-option
                v-for="(item, index) in getCityList"
                :key="index"
                :label="item.name"
                :value="index"
              />
            </el-select>
            <el-select
              v-model="ruleForm.county"
              placeholder="请选择区"
              :disabled="
                ruleForm.city === undefined || ruleForm.city === ''
                  ? true
                  : false
              "
              style="width: 140px; margin-bottom: 22px"
            >              
              <el-option
                v-for="(item, index) in getCountyList"
                :key="index"
                :label="item.name"
                :value="item.name"
              />
            </el-select>
            </el-col>
            <el-col :span="24">
              <el-input
                v-model="ruleForm.address"
                autocomplete="off"
                style="width: 460px"
                placeholder="详细地址"
              />
            </el-col>
            
          </el-form-item>
          <!-- <el-form-item
            label="所属批发商:"
            :label-width="formLabelWidth"
            prop="wholesaler"
          >
            <el-select
              v-model="ruleForm.wholesaler"
              style="width: 460px"
              placeholder="请选择所属批发商"
              filterable
            >
              <el-option
                v-for="(item, index) in wholesalerList"
                :key="index"
                :label="item.name"
                :value="item.name"
              />
            </el-select>
          </el-form-item> -->
          <el-form-item
            label="进厂数量:"
            :label-width="formLabelWidth"
            prop="enterNum"
          >
            <el-input
              v-model.trim="ruleForm.enterNum"
              autocomplete="off"
              style="width: 460px"
              placeholder="请输入生猪数量"
            />
          </el-form-item>
          <!-- <el-form-item
            label="实际进厂数量:"
            :label-width="formLabelWidth"
            prop="practicalEnterNum"
          >
            <el-input
              v-model="ruleForm.practicalEnterNum"
              autocomplete="off"
              placeholder="请输入生猪实际进厂数量"
            />
          </el-form-item> -->

          <div class="title">
            <div class="title-right">
              <div class="shu" />
              <div>动物检疫合格证信息</div>
            </div>
          </div>
          <el-form-item
            label="货主:"
            :label-width="formLabelWidth"
            prop="shipper"
          >
            <el-input
              v-model.trim="ruleForm.shipper"
              autocomplete="off"
              style="width: 460px"
              placeholder="请输入货主名称"
            />
          </el-form-item>
          <el-form-item
            label="货主联系方式:"
            :label-width="formLabelWidth"
            prop="shipperPhone"
          >
            <el-input
              v-model.trim="ruleForm.shipperPhone"
              autocomplete="off"
              style="width: 460px"
              placeholder="请输入货主联系方式"
            />
          </el-form-item>
          <el-form-item
            label="动物检疫合格证明编号:"
            :label-width="formLabelWidth"
            prop="quarantineCertificateNum"
          >
            <el-input
              v-model="ruleForm.quarantineCertificateNum"
              autocomplete="off"
              style="width: 460px"
              placeholder="请输入动物检疫合格证明编号"
            />
          </el-form-item>          
          <div class="title">
            <div class="title-right">
              <div class="shu" />
              <div>物流信息</div>
            </div>
          </div>

          <el-form-item
            label="提货司机:"
            :label-width="formLabelWidth"
            prop="pickupDriver"
          >
            <el-select
              v-model="ruleForm.pickupDriver"
              style="width: 460px"
              placeholder="请选择提货司机"
              filterable
              @change="changeDriver"
            >
              <el-option
                v-for="(item, index) in driverList"
                :key="index"
                :label="item.name"
                :value="JSON.stringify(item)"
              />
            </el-select>
          </el-form-item>
          <el-form-item
            label="司机联系方式:"
            :label-width="formLabelWidth"
            prop="pickupDriverPhone"
          >
            <!-- <el-input
              v-model="ruleForm.pickupDriverPhone"
              placeholder="请输入司机联系方式"
            /> -->
            <p
              style="border:1px solid #DCDFE6;height:42px; border-radius:4px;padding:0 0 0 10px;width: 460px"
            >
              {{ ruleForm.pickupDriverPhone }}
            </p>
          </el-form-item>
          <el-form-item
            label="提货车牌号:"
            :label-width="formLabelWidth"
            prop="pickupPlateNumbers"
          >
            <el-input
              v-model="ruleForm.pickupPlateNumbers"
              style="width: 460px"
              placeholder="请输入提货车牌号"
            />
          </el-form-item>
          <el-form-item
            label="进厂时间:"
            :label-width="formLabelWidth"
            prop="enterTime"
          >
            <el-date-picker
              v-model="ruleForm.enterTime"
              type="datetime"
              style="width: 460px"
              format="yyyy-MM-dd HH:mm"
              value-format="yyyy-MM-dd HH:mm"
              placeholder="请选择进厂时间"
            />
          </el-form-item>
          <div class="from-bottom">
            <el-form-item>
              <el-button
                type="primary"
                @click="submitForm('ruleForm')"
              >提交</el-button>
              <el-button @click="resetForm('ruleForm')">取消</el-button>
            </el-form-item>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
// import Pagination from '@/components/pagination'
// import TableWrap from '@/components/TableWrap'
import { postAddOrders } from '@/api/order'
import { dropDownfarm, dropDownwholesaler, dropDowndriver } from '@/api/jyzyy'
import orderApi from '@/api/orderApi'
export default {
  components: {
    // Pagination,
    // TableWrap
  },
  data() {
    var checksenterNum = (rule, value, callback) => {
      if (/^[0-9]{1,5}$/.test(value)) {
        callback()
      } else {
        return callback(new Error('请填写1-5位的正整数'))
      }
    }
    var checkspecimenNoAlbuterol = (rule, value, callback) => {
      if (/^[0-9A-Za-z]{5,20}$/.test(value)) {
        callback()
      } else {
        return callback(new Error('请输入5-20位的数字、字母'))
      }
    }
    var checkpickupDriverPhone = (rule, value, callback) => {
      if (value) {
        if (/^[1][0-9]{10}$/.test(value)) {
          callback()
        } else {
          return callback(new Error('手机号码格式不正确'))
        }
      } else {
        callback()
      }
    }
    var checkpickupPlateNumbers = (rule, value, callback) => {
      if (/^[0-9a-zA-Z\u4e00-\u9fa5]{7,8}$/.test(value)) {
        callback()
      } else {
        return callback(new Error('请输入7-8位仅中文、数字、字母'))
      }
    }
    var checkpickupZ = (rule, value, callback) => {
      if (/^[\u4e00-\u9fa5]{2,20}$/.test(value)) {
        callback()
      } else {
        return callback(new Error('请输入2-20位仅支持中文'))
      }
    }
    var checkorigin = (rule, value, callback) => {
      if (
        this.ruleForm.origin != '' &&
        this.ruleForm.city != '' &&
        this.ruleForm.county != ''
      ) {
        callback()
      } else {
        return callback(new Error('请选择完整的产地'))
      }
    }
    return {
      TableHeight: '300px',
      formLabelWidth: '200px',
      listQuery: {
        page: 1,
        limit: 20
      },
      ruleForm: {},
      time: '',
      rules: {
        farmName: [
          { required: true, message: '请选择养殖场名称', trigger: 'change' }
        ],
        wholesaler: [
          { required: true, message: '请选择所属批发商', trigger: 'change' }
        ],
        enterNum: [
          { required: true, message: '请输入生猪数量', trigger: 'change' },
          { validator: checksenterNum, trigger: 'change' }
        ],
        practicalEnterNum: [
          {
            required: true,
            message: '请输入生猪实际进厂数量',
            trigger: 'change'
          },
          { validator: checksenterNum, trigger: 'change' }
        ],
        shipper: [
          { required: true, message: '请输入货主名称', trigger: 'change' },
          { validator: checkpickupZ, trigger: 'change' }
        ],
        shipperPhone: [
          { required: true, message: '请输入货主联系方式', trigger: 'change' },
          { validator: checkpickupDriverPhone, trigger: 'change' }
        ],
        quarantineCertificateNum: [
          {
            required: true,
            message: '请输入动物检疫合格证明编号',
            trigger: 'change'
          },
          { validator: checkspecimenNoAlbuterol, trigger: 'change' }
        ],
        origin: [
          { required: true, message: '请选择完整的产地', trigger: 'change' },
          { validator: checkorigin, trigger: 'change' }
        ],
        pickupDriver: [{ message: '请选择提货司机', trigger: 'change' }],
        pickupDriverPhone: [
          { message: '请输入司机联系方式', trigger: 'change' },
          { validator: checkpickupDriverPhone, trigger: 'blur' }
        ],
        pickupPlateNumbers: [
          { required: true, message: '请输入提货车牌号', trigger: 'change' },
          { validator: checkpickupPlateNumbers, trigger: 'change' }
        ],
        enterTime: [
          { required: true, message: '请选择进厂时间', trigger: 'change' }
        ],
        owners: [
          { required: true, message: '请填写货主代表', trigger: 'change'}
        ]
      },
      farmNameList: [],
      wholesalerList: [],
      driverList: [],
      getProvinceList: [],
      getCityList: [],
      getCountyList: []
    }
  },
  mounted() {},
  created() {
    dropDownfarm().then(res => {
      this.farmNameList = res.result
    })
    dropDownwholesaler().then(res => {
      this.wholesalerList = res.result
    })
    dropDowndriver().then(res => {
      this.driverList = res.result
    })
    orderApi.postareagetProvince().then(res => {
      this.getProvinceList = res.result
    })
  },
  methods: {
    changeDriver(val) {
      val = JSON.parse(val)
      this.ruleForm.pickupDriverPhone = val.tel
      this.ruleForm.pickupDriver = val.name
    },
    changeOrign(val) {
      this.ruleForm.origin = this.getProvinceList[val].name
      this.ruleForm.city = ''
      this.$set(this.ruleForm, 'county', '')
      orderApi
        .postareagetgetCity(`provinceCode=${this.getProvinceList[val].code}`)
        .then(res => {
          this.ruleForm.origin = this.getProvinceList[val].name
          this.getCityList = res.result
        })
    },
    changeCity(val) {
      this.ruleForm.city = this.getCityList[val].name
      orderApi
        .postareagetgetCounty(`cityCode=${this.getCityList[val].code}`)
        .then(res => {
          this.getCountyList = res.result
        })
    },
    // 新增保存
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.ruleForm.origin =
            this.ruleForm.origin +
            ',' +
            this.ruleForm.city +
            ',' +
            this.ruleForm.county
          postAddOrders({
            ...this.ruleForm
          }).then(res => {
            const nowRouter = this.$route
            const obj = {
              label: nowRouter.meta.tagName || nowRouter.meta.title,
              path: nowRouter.path,
              name: nowRouter.name,
              lastTime: new Date().getTime()
            }
            this.$store.dispatch('app/deleteTagNavList', obj)
            this.$router.push({
              path: 'addsuccess'
            })
          })
        } else {
          return false
        }
      })
    },
    // 取消
    resetForm(e) {
      this.$router.push({
        path: 'ordermanager'
      })
    },
    farmChange(val) {
      var farmList = this.farmNameList;
      for(var j = 0;farmList[j]!= null;j++) {
        if(val === farmList[j].name) {
          this.ruleForm.address = farmList[j].address;
          this.ruleForm.origin = farmList[j].region.split(',')[0];
          this.ruleForm.city = farmList[j].region.split(',')[1];
          this.ruleForm.county = farmList[j].region.split(',')[2];
        }
      }
      
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/.dashboard-container {
  //  height: 100%;
  padding: 0 0 20px 0;
}
.content {
}
/deep/.action-wrap {
  display: flex;
  justify-content: center;
  margin-top: 24px;
}
.top {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 69px;
  line-height: 69px;
  margin-top: -10px;
  margin-left: 40px;
  margin-right: 60px;
  border-bottom: 1px solid #e8e8e8;
}
.title {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 200px;
  height: 40px;
  line-height: 40px;
  text-align: right;
  .title-right {
    display: flex;
    flex-direction: row;

    align-items: center;
  }
  .shu {
    width: 2px;
    height: 20px;
    background: #4285f4;
    opacity: 1;
    margin-right: 5px;
  }
}
</style>
