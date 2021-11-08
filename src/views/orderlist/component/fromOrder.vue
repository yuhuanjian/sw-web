<template>
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
            style="width: 100%"
            placeholder="请选择养殖场名称"
            filterable
            allow-create
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
          label="进厂数量:"
          :label-width="formLabelWidth"
          prop="enterNum"
        >
          <el-input
            v-model.trim="ruleForm.enterNum"
            autocomplete="off"
            placeholder="请输入生猪数量"
          />
        </el-form-item>
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
            placeholder="请输入动物检疫合格证明编号"
          />
        </el-form-item>
        <el-form-item
          label="产地:"
          :label-width="formLabelWidth"
          prop="specimenSource"
        >
          <div class="sele-city">
            <el-select
              v-model="ruleForm.specimenSource"
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
              v-model="ruleForm.city"
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
              v-model="ruleForm.county"
              :disabled="
                ruleForm.city === undefined || ruleForm.city === ''
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
            style="width: 100%"
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
          <p
            style="border:1px solid #DCDFE6;height:42px; border-radius:4px;padding:0 0 0 10px;"
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
            style="width: 100%"
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
</template>

<script>
import OrderApi from '@/api/orderApi'
import { dropDownfarm, dropDowndriver } from '@/api/jyzyy'
export default {
  props: {
    userStatus: {
      type: String,
      default: ''
    },
    changeData: {
      type: Object,
      default() {
        return {}
      }
    }
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
        this.ruleForm.specimenSource != '' &&
        this.ruleForm.city != '' &&
        this.ruleForm.county != ''
      ) {
        callback()
      } else {
        return callback(new Error('请选择完整的产地'))
      }
    }
    return {
      ruleForm: {},
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
        specimenSource: [
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
        ]
      },
      formLabelWidth: '',
      getCityList: [],
      driverList: [],
      getCountyList: [],
      getProvinceList: [],
      farmNameList: []
    }
  },
  created() {
    dropDownfarm().then(res => {
      this.farmNameList = res.result
    })
    dropDowndriver().then(res => {
      this.driverList = res.result
    })
  },
  methods: {
    getCitys() {
      this.ruleForm.specimenSource = this.ruleForm.areaResponseDTOList[0].name
      this.ruleForm.city = this.ruleForm.areaResponseDTOList[1].name
      this.ruleForm.county = this.ruleForm.areaResponseDTOList[2].name
      OrderApi.postareagetProvince().then(res => {
        this.getProvinceList = res.result
        OrderApi.postareagetgetCity(
          `provinceCode=${this.ruleForm.areaResponseDTOList[0].code}`
        ).then(res => {
          this.getCityList = res.result
          OrderApi.postareagetgetCounty(
            `cityCode=${this.ruleForm.areaResponseDTOList[1].code}`
          ).then(res => {
            this.getCountyList = res.result
          })
        })
      })
    },
    changeDriver(val) {
      val = JSON.parse(val)
      this.ruleForm.pickupDriverPhone = val.tel
      this.ruleForm.pickupDriver = val.name
    },
    changeOrign(val) {
      this.ruleForm.specimenSource = this.getProvinceList[val].name
      this.ruleForm.city = ''
      this.$set(this.ruleForm, 'county', '')
      OrderApi.postareagetgetCity(
        `provinceCode=${this.getProvinceList[val].code}`
      ).then(res => {
        this.ruleForm.origin = this.getProvinceList[val].name
        this.getCityList = res.result
      })
    },
    changeCity(val) {
      this.ruleForm.city = this.getCityList[val].name
      OrderApi.postareagetgetCounty(
        `cityCode=${this.getCityList[val].code}`
      ).then(res => {
        this.getCountyList = res.result
      })
    },
    resetForm() {
      const nowRouter = this.$route
      const obj = {
        label: nowRouter.meta.tagName || nowRouter.meta.title,
        path: nowRouter.path,
        name: nowRouter.name,
        lastTime: new Date().getTime()
      }
      this.$store.dispatch('app/deleteTagNavList', obj)
      this.$router.push({
        path: 'ordermanager'
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.ruleForm.origin =
            this.ruleForm.specimenSource +
            ',' +
            this.ruleForm.city +
            ',' +
            this.ruleForm.county
          // this.ruleForm.enterTime = this.ruleForm.enterTime + ' 08:00'
          const data = {
            ...this.ruleForm,
            id: localStorage.getItem('orderId')
          }
          OrderApi.editOrderInformation(data).then(res => {
            this.$message.success('保存成功')

            this.resetForm()
          })
        } else {
          return false
        }
      })
    },
    cancle() {
      this.innerVisible = false
    },
    sureNo() {
      this.$emit('confirmDel')
      this.innerVisible = false
    }
  }
}
</script>

<style lang="scss" scoped>
.sele-city {
  display: flex;
  justify-content: space-between;
}
.content {
  margin: auto;
}
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
