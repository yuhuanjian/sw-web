<template>
  <el-dialog
    width="600px"
    title="添加用户"
    :visible.sync="innerVisible"
    :close-on-click-modal="false"
    append-to-body
  >
    <el-form
      ref="ruleForm"
      :model="dataUser"
      :rules="rules"
      label-width="200px"
      class="demo-ruleForm"
      style="margin-top:50px;margin-bottom:50px"
    >
      <el-form-item
        label="角色名称:"
        :label-width="formLabelWidth"
        prop="roleName"
      >
        <el-input
          v-model.trim="dataUser.roleName"
          autocomplete="off"
          placeholder="请输入角色名称"
        />
      </el-form-item>
      <el-form-item
        label="添加员工:"
        :label-width="formLabelWidth"
        prop="userName"
      >
        <el-cascader
          v-model="dataUser.userName"
          style="width: 100%"
          :options="options"
          :props="{ multiple: true, checkStrictly: true }"
          filterable
        />
      </el-form-item>
    </el-form>
    <div class="quarantine-line" />
    <span slot="footer" class="dialog-footer">
      <el-button @click="resetForm('ruleForm')">取 消</el-button>
      <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
    </span>
  </el-dialog>
</template>

<script>
import userAdmin from '@/api/userAdmin'
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    dataAddrole: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    var checkroleName = (rule, value, callback) => {
      if (value) {
        if (/^[0-9a-zA-Z\u4e00-\u9fa5]{1,10}$/.test(value)) {
          callback()
        } else {
          return callback(
            new Error('角色名称长度为1至10位的文字、字母和数字组合')
          )
        }
      } else {
        callback()
      }
    }
    return {
      innerVisible: false,
      formLabelWidth: '120px',
      options: [],
      rules: {
        roleName: [
          { required: true, message: '请输入角色名称', trigger: 'change' },
          { validator: checkroleName, trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const data = {
            id: this.dataAddrole.id === '' ? null : this.dataAddrole.id,
            roleName: this.dataAddrole.roleName
          }
          userAdmin.postroleaddOrModRole(data).then(res => {
            this.innerVisible = false
            this.$message('新增成功')
            this.$parent.reset()
          })
        } else {
          return false
        }
      })
    },
    resetForm(formName) {
      this.innerVisible = false
      this.reset(formName)
    },
    reset(formName) {
      this.$refs[formName] && this.$refs[formName].resetFields()
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
</style>
