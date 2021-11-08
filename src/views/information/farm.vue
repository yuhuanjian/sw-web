<template>
  <div ref="main" class="dashboard-container">
    <div ref="search" class="search-wrap">
      <el-form :inline="true" :model="formSearch" class="demo-form-inline">
        <el-form-item label="">
          <el-input v-model="formSearch.code" placeholder="请输入养殖场编号" />
        </el-form-item>
        <el-form-item label="">
          <el-input v-model="formSearch.name" placeholder="请输入养殖场名称" />
        </el-form-item>
        <el-form-item label="">
          <el-input
            v-model="formSearch.contactName"
            placeholder="请输入联系人姓名"
          />
        </el-form-item>
        <el-form-item label="">
          <el-input v-model="formSearch.tel" placeholder="请输入联系方式" />
        </el-form-item>

        <el-form-item label="">
          <el-select v-model="formSearch.status" placeholder="请选择养殖场状态">
            <el-option label="启用" value="1" />
            <el-option label="停用" value="2" />
          </el-select>
        </el-form-item>
        <el-form-item label="">
          <el-select v-model="formSearch.branchId" filterable :disabled="isshowBtn!=='0'" placeholder="请选择网点机构" @change="changeBranch">
            <el-option
              v-for="item in branchList"
              :key="item.id"
              :label="item.branchName"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button
            v-has="'farmMana:query'"
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
      </el-form>
      <div class="line-s" />
    </div>

    <div ref="action" class="action-wrap">
      <div>
        <el-button
          v-has="'farmMana:add'"
          type="primary"
          icon="el-icon-plus"
          @click="add('ruleForm')"
        >新增</el-button>
        <el-button
          v-has="'farmMana:delete'"
          type="primary"
          plain
          :disabled="SelectionList.length > 0 ? false : true"
          icon="el-icon-delete-solid"
          @click="innerVisible = true"
        >删除</el-button>
      </div>
      <div>
        <el-button
          v-has="'farmMana:export'"
          type="primary"
          icon="el-icon-upload2"
          @click="exportExecl"
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
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column
          prop="code"
          label="养殖场编号"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <p class="p-blue">
              {{ scope.row.code }}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="养殖场名称"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <p class="p-blue">
              {{ scope.row.name }}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          prop="contactName"
          label="联系人姓名"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="tel"
          label="联系方式"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="address"
          label="养殖场地址"
          :show-overflow-tooltip="true"
        />
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <p :class="scope.row.status === 1 ? 'green' : 'red'">
              <span /> {{ scope.row.status === 1 ? '启用' : '停用' }}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          prop="createdTime"
          label="创建时间"
          width="160"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="branchName"
          label="所属网点"
          :show-overflow-tooltip="true"
        />
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button
              v-has="'farmMana:edit'"
              type="text"
              size="small"
              @click="handleClick(scope.row)"
            >编辑</el-button>
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
    <el-dialog
      width="600px"
      title="删除"
      :close-on-click-modal="false"
      :visible.sync="innerVisible"
      append-to-body
    >
      <div class="access-Dialog">
        <i class="el-icon-warning" />
        <p>是否确定删除当前选中养殖场？</p>
      </div>
      <div class="quarantine-line" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancle">取 消</el-button>
        <el-button type="primary" @click="sureNo">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      :title="addtype === 1 ? '新增' : '编辑'"
      :close-on-click-modal="false"
      :visible.sync="dialogFormVisible"
      width="35%"
    >
      <div class="diver-t" style="margin-top: 25px;">
        <el-form
          ref="ruleForm"
          :model="ruleForm"
          :rules="rules"
          label-width="200px"
          class="demo-ruleForm"
        >
          <el-form-item
            label="养殖场名称:"
            style="width: 80%;margin: auto;margin-bottom: 22px;"
            :label-width="formLabelWidth"
            prop="name"
          >
            <el-input
              v-model="ruleForm.name"
              autocomplete="off"
              style="padding-left: 15px;"
              placeholder="请输入养殖场名称"
            />
          </el-form-item>
          <el-form-item
            label="联系人姓名:"
            style="width: 80%;margin: auto;margin-bottom: 22px;"
            :label-width="formLabelWidth"
            prop="contactName"
          >
            <el-input
              v-model="ruleForm.contactName"
              autocomplete="off"
              style="padding-left: 15px;"
              placeholder="请输入联系人姓名"
            />
          </el-form-item>
          <el-form-item
            label="联系方式:"
            style="width: 80%;margin: auto;margin-bottom: 22px;"
            :label-width="formLabelWidth"
            prop="tel"
          >
            <el-input
              v-model="ruleForm.tel"
              autocomplete="off"
              style="padding-left: 15px;"
              placeholder="请输入联系方式"
            />
          </el-form-item>
          <el-form-item
            label="养殖场地址:"
            style="width: 80%;margin: auto;margin-bottom: 22px;"
            :label-width="formLabelWidth"
            prop="address"
          >
          <!-- <div class="slaguage-specimenSource" style="width:100%"> -->
            <el-col :span="24">
              <el-select
                v-model="ruleForm.province"
                placeholder="请选择省"
                style="width:33.3%; margin-bottom: 22px; padding-left: 15px;"
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
                style="width:33.3%; margin-bottom: 22px"
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
                style="width:33.3%; margin-bottom: 22px"
                @change="$forceUpdate()"
              >
                <el-option
                  v-for="(item, index) in getCountyList"
                  :key="item.code"
                  :label="item.name"
                  :value="item.name"
                />
              </el-select>
            </el-col>
          <!-- </div> -->
          <el-col :span="24">
            <el-input
              v-model="ruleForm.address"
              autocomplete="off"
              style="padding-left: 15px; margin-bottom: 22px"
              placeholder="请输入养殖场地址"
            />
          </el-col>
          </el-form-item>
          <el-form-item
            label="状态:"
            style="width: 80%;margin: auto;margin-bottom: 22px;"
            prop="status"
            :label-width="formLabelWidth"
          >
            <el-radio-group v-model="ruleForm.status" style="padding-left: 15px;">
              <el-radio :label="1">启用</el-radio>
              <el-radio :label="2">停用</el-radio>
            </el-radio-group>
          </el-form-item>
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
  </div>
</template>

<script>
import TableWrap from '@/components/TableWrap'
import Pagination from '@/components/pagination'
import {
  postFarmQueryFarmByRequest,
  postFarmAddOrUpdateFarm,
  postDeleteFarm,
  postExportFarms
} from '@/api/merchant'
import orderApi from '@/api/orderApi'
import _ from 'lodash'
import { branchDropDown } from '@/utils/mixin'
export default {
  name: 'Admin',
  components: {
    Pagination,
    TableWrap
  },
  mixins: [branchDropDown],
  data() {
    var checksZhong = (rule, value, callback) => {
      if (value) {
        if (/^[\u4e00-\u9fa5]{2,20}$/.test(value)) {
          callback()
        } else {
          return callback(new Error('请填写2-20位的中文'))
        }
      } else {
        callback()
      }
    }

    var checkpickupDriverPhone = (rule, value, callback) => {
      if (value) {
        if (/^[1][0-9]{10}$/.test(value)) {
          callback()
        } else {
          return callback(new Error('请输入11位的数字，首位为1'))
        }
      } else {
        callback()
      }
    }
    var checkaddress = (rule, value, callback) => {
      if (value) {
        if (/^[\u4e00-\u9fa5]{2,50}$/.test(value)) {
          callback()
        } else {
          return callback(new Error('请填写2-50位的中文'))
        }
      } else {
        callback()
      }
    }
    return {
      formSearch: {
        code: '',
        contactName: '',
        name: '',
        status: '',
        tel: ''
      },
      id: 1, // 选中数据的id
      addtype: '',
      total: 200,
      rules: {
        name: [
          { required: true, message: '请输入养殖场名称', trigger: 'change' },
          { validator: checksZhong, trigger: 'change' }
        ],
        contactName: [
          { required: false, message: '请输入联系人姓名', trigger: 'change' },
          { validator: checksZhong, trigger: 'change' }
        ],
        tel: [
          { required: false, message: '请输入联系方式', trigger: 'change' },
          { validator: checkpickupDriverPhone, trigger: 'change' }
        ],
        address: [
          { required: false, message: '请输入养殖场地址', trigger: 'change' },
          { validator: checkaddress, trigger: 'change' }
        ],
        region: [],
        status: [{ required: true, message: '请选择状态', trigger: 'change' }]
      },
      listQuery: {
        page: 1,
        limit: 10
      },
      resourceData: '',
      formLabelWidth: '120px',
      dialogFormVisible: false,
      ruleForm: {
        code: '',
        contactName: '',
        name: '',
        status: '',
        tel: '',
        address: '',
        id: '',
        province: '',
        city: '',
        county: '',
        region: ''
      },
      tableData: [],
      orderNumber: '2020121515',
      newtableData: [],
      oldtableData: [],
      innerVisible: false,
      SelectionList: [],
      getProvinceList: [],
      getCityList: [],
      getCountyList: [],
    }
  },
  created() {
    if (this.$route.query.branchId || this.$route.query.branchId == '') {
      this.formSearch.branchId = this.$route.query.branchId
    }
    this.getList()
//初始化省市区下拉框数据
    orderApi.postareagetProvince().then(res => {
      this.getProvinceList = res.result
      orderApi
        .postareagetgetCity(
          `provinceCode=${this.ruleForm.province.code}`
        )
        .then(res => {
          this.getCityList = res.result
          orderApi
            .postareagetgetCounty(
              `cityCode=${this.ruleForm.city.code}`
            )
            .then(res => {
              this.getCountyList = res.result
            })
        })
     })
  },

  methods: {
    // 多选框
    handleSelectionChange(val) {
      this.SelectionList = val
    },
    cancle() {
      this.innerVisible = false
    },
    // 删除
    sureNo() {
      var dataArr = []
      this.SelectionList.forEach(v => {
        dataArr.push(v.id)
      })
      postDeleteFarm(dataArr).then(res => {
        this.innerVisible = false
        this.$message.success('删除成功')
        this.getList()
      })
    },
    search(val, key) {
      this.newtableData = []
      if (this.timer) {
        clearTimeout(this.timer)
      }
      this.timer = setTimeout(() => {
        this.tableData = this.oldtableData
        this.tableData.forEach(item => {
          if (item[key].indexOf(val) > -1) {
            this.newtableData.push(item)
          }
        })
        this.tableData = this.newtableData
      }, 200)
    },
    reset() {
      for (const key in this.formSearch) {
        this.formSearch[key] = ''
      }
      this.formSearch.branchId = localStorage.getItem('userTypeSW') === '0' ? '' : localStorage.getItem('nowbranchDropDown')
      this.inquire()
      // this.tableData = this.oldtableData
    },
    inquire(formSearch) {
      postFarmQueryFarmByRequest({
        ...this.formSearch,
        pageNum: 1,
        pageSize: 10
      }).then(res => {
        this.total = res.result.total

        if (res.result.list) {
          this.tableData = res.result.list
        } else {
          this.tableData = []
        }
        this.listQuery = {
          page: 1,
          limit: 10
        }
      })
    },
    // 新增
    add(formName) {
      this.addtype = 1
      this.dialogFormVisible = true
      this.ruleForm = {
        code: '',
        contactName: '',
        name: '',
        status: '',
        tel: '',
        address: '',
        id: '',
        province: '',
        city: '',
        county: ''
      }
      this.$refs[formName] && this.$refs[formName].resetFields()
      this.ruleForm.status = 1
    },

    // 编辑
    handleClick(row) {
      this.addtype = 2

      this.dialogFormVisible = true
      this.ruleForm.name = row.name
      this.ruleForm.contactName = row.contactName
      this.ruleForm.tel = row.tel
      this.ruleForm.address = row.address
      this.ruleForm.status = row.status
      this.ruleForm.id = row.id
      this.ruleForm.province = row.region.split(',')[0];
      this.ruleForm.city = row.region.split(',')[1];
      this.ruleForm.city = row.region.split(',')[2];
      this.ruleForm.region = row.region;
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.ruleForm.region = this.ruleForm.province+','+this.ruleForm.city+','+this.ruleForm.county;
          postFarmAddOrUpdateFarm({
            ...this.ruleForm,
            status: Number(this.ruleForm.status),
            type: Number(this.ruleForm.type)
          }).then(res => {
            if (res.result) {
              this.$message.success('保存成功')
              for (const key in this.formSearch) {
                this.formSearch[key] = ''
              }
              this.getList()
              this.dialogFormVisible = false
            } else {
              this.$message.error('养殖场名称已存在')
            }
          })
        } else {
          return false
        }
      })
    },
    resetForm(formName) {
      this.dialogFormVisible = false
      this.$refs[formName] && this.$refs[formName].resetFields()
    },
    getList() {
      postFarmQueryFarmByRequest({
        ...this.formSearch,
        pageNum: this.listQuery.page,
        pageSize: this.listQuery.limit
      }).then(res => {
        this.total = res.result.total

        if (res.result.list) {
          this.tableData = res.result.list
        } else {
          this.tableData = []
        }
      })
    },
    // 导出
    changeOrign(val) {
      this.ruleForm.province = this.getProvinceList[val].name
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
    exportExecl: _.debounce(function() {
      window.location.href = postExportFarms(
        `contactName=${this.formSearch.contactName}&name=${this.formSearch.name}&code=${this.formSearch.code}&tel=${this.formSearch.tel}&status=${this.formSearch.status}&branchId=${this.formSearch.branchId}`
      )
    }, 500)
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
// .diver-t {
//   margin-top: 25px;
//   /deep/.el-form-item {
//     margin: auto;
//     width: 80%;
//     margin-bottom: 22px;
//   }
//   /deep/.el-form-item__error {
//     left: 18px;
//   }
//   /deep/.el-form-item__label {
//     margin-right: 15px;
//   }
//   /deep/.el-input {
//     width: 95% !important;
//   }
// }
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
  position: relative;
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
