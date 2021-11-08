<template>
  <div ref="main" class="dashboard-container">
    <div ref="action" class="action-wrap">
      <div v-show="isshowBtn==='0'">
        <el-button
          v-has="'branchMana:add'"
          type="primary"
          icon="el-icon-plus"
          @click="add('ruleForm')"
        >新增</el-button>
        <el-button
          v-has="'branchMana:edit'"
          type="primary"
          :disabled="ishover==''"
          @click="editor"
        >编辑</el-button>
        <el-button
          v-has="'branchMana:delete'"
          type="primary"
          plain
          :disabled="ishover==''||ishover=='总部'"
          icon="el-icon-delete-solid"
          @click="deleteVisible = true"
        >删除</el-button>
      </div>
    </div>
    <div class="branch-tree">
      <el-tree class="tree-branch" node-key="branchName" :default-expanded-keys="['总部']" :data="branchData" :props="defaultProps" @node-click="handleNodeClick" />
      <div class="branch-tree-right">
        <div class="branch-tip">网点信息:</div>
        <div class="branch-tree-content">
          <div class="branch-tree-item">
            <p>网点编号:</p>
            <p>{{ branchMessage.branchCode }}</p>
          </div>
          <div class="branch-tree-item">
            <p>网点名称:</p>
            <p>{{ branchMessage.branchName }}</p>
          </div>
          <div class="branch-tree-item">
            <p>网点负责人:</p>
            <p>{{ branchMessage.branchPrincipal }}</p>
          </div>
          <div class="branch-tree-item">
            <p>联系方式:</p>
            <p>{{ branchMessage.branchTel }}</p>
          </div>
          <div class="branch-tree-item">
            <p>网点地址:</p>
            <p>{{ branchMessage.branchAddr }}</p>
          </div>
        </div>
      </div>
    </div>
    <el-dialog
      width="600px"
      title="确认提示"
      :visible.sync="deleteVisible"
      :close-on-click-modal="false"
      append-to-body
    >
      <div class="access-Dialog">
        <i class="el-icon-warning" />
        <p>是否确定删除当前选中网点？</p>
      </div>
      <div class="quarantine-line" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteVisible=false">取 消</el-button>
        <el-button type="primary" @click="sureDel">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog :title="titleBranch" :visible.sync="dialogBranchVisible" :close-on-click-modal="false" width="35%">
      <div class="diver-t">
        <el-form
          ref="ruleForm"
          :model="ruleForm"
          :rules="rules"
          label-width="200px"
          class="demo-ruleForm"
        >
          <el-form-item
            label="网点编号:"
            :label-width="formLabelWidth"
            prop="branchCode"
          >
            <el-input
              v-model="ruleForm.branchCode"
              autocomplete="off"
              placeholder="请输入网点编号"
            />
          </el-form-item>
          <el-form-item
            label="网点名称:"
            :label-width="formLabelWidth"
            prop="branchName"
          >
            <el-input
              v-model="ruleForm.branchName"
              autocomplete="off"
              placeholder="请输入网点名称"
            />
          </el-form-item>
          <el-form-item
            label="网点负责人:"
            :label-width="formLabelWidth"
            prop="branchPrincipal"
          >
            <el-input
              v-model="ruleForm.branchPrincipal"
              autocomplete="off"
              placeholder="请输入网点负责人"
            />
          </el-form-item>
          <el-form-item
            label="联系方式:"
            :label-width="formLabelWidth"
            prop="branchTel"
          >
            <el-input
              v-model="ruleForm.branchTel"
              autocomplete="off"
              placeholder="请输入联系方式"
            />
          </el-form-item>
          <el-form-item
            label="网点地址:"
            :label-width="formLabelWidth"
            prop="branchAddr"
          >
            <el-input
              v-model="ruleForm.branchAddr"
              autocomplete="off"
              placeholder="请输入网点地址"
            />
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
import branch from '@/api/branch'
export default {
  name: 'Admin',
  data() {
    return {
      ishover: false,
      rules: {
        branchCode: [
          { required: true, message: '请输入网点编号', trigger: 'change' },
          { min: 1, max: 20, message: '网点编号长度为1-20位', trigger: 'change' },
          {
            required: true,
            pattern: /^[a-zA-Z0-9-]+$/,
            message: '支持英文、数字和符号“-”输入',
            trigger: 'change'
          }
        ],
        branchName: [
          { required: true, message: '请输入网点名称', trigger: 'change' },
          { min: 1, max: 20, message: '网点名称长度为1-20位', trigger: 'change' }
        ],
        branchPrincipal: [
          { required: true, message: '请输入网点负责人', trigger: 'change' },
          { min: 1, max: 20, message: '网点负责人长度为1-20位', trigger: 'change' },
          {
            required: true,
            pattern: /^[a-zA-Z0-9\u4e00-\u9fa5]+$/,
            message: '支持中文、英文、数字输入',
            trigger: 'change'
          }
        ],
        branchTel: [
          { required: true, message: '请输入联系方式', trigger: 'change' },
          { min: 7, max: 12, message: '联系方式长度为7-12位', trigger: 'change' },
          {
            required: true,
            pattern: /^[0-9-]+$/,
            message: '支持数字和符号“-”输入',
            trigger: 'change'
          }
        ],
        branchAddr: [
          { required: true, message: '请输入网点地址', trigger: 'change' },
          { min: 2, max: 50, message: '网点地址长度为2-50位', trigger: 'change' },
          {
            required: true,
            pattern: /^[a-zA-Z0-9\u4e00-\u9fa5-]+$/,
            message: '支持中文、英文、数字和符号“-”输入',
            trigger: 'change'
          }
        ]
      },
      titleBranch: '新增网点',
      formLabelWidth: '120px',
      dialogBranchVisible: false,
      deleteVisible: false,
      ruleForm: {
        branchCode: '',
        branchName: '',
        branchPrincipal: '',
        branchTel: '',
        branchAddr: ''
      },
      branchMessage: {
        branchCode: '--',
        branchName: '--',
        branchPrincipal: '--',
        branchTel: '--',
        branchAddr: '--'
      },
      branchData: [{
        branchName: '总部',
        child: [{
          branchName: '德容公司'
        },
        {
          branchName: '德为公司'
        }]
      }],
      defaultProps: {
        children: 'child',
        label: 'branchName'
      },
      isshowBtn: localStorage.getItem('userTypeSW'),
      branchId: ''
    }
  },
  async created() {
    await this.getbranchTree()
  },
  methods: {
    async getbranchTree() {
      const res = await branch.branchTree()
      this.branchData = res.result
      if (this.branchData[0] && this.branchData[0].id) {
        this.getBranchByIdXq(this.branchData[0].id)
      }
    },
    getBranchByIdXq(id) {
      branch.getBranchById(id).then(res => {
        this.branchMessage = {
          branchCode: res.result.branchCode,
          branchName: res.result.branchName,
          branchPrincipal: res.result.branchPrincipal,
          branchTel: res.result.branchTel,
          branchAddr: res.result.branchAddr
        }
      })
    },
    handleNodeClick(data) {
      this.ishover = data.branchName
      this.branchId = data.id
      this.getBranchByIdXq(this.branchId)
    },
    async sureDel() {
      const response = await branch.logicDelBranch(this.branchId)
      const { code } = response
      if (code === 200) this.$message.success('删除成功')
      this.getbranchTree()
      this.deleteVisible = false
    },
    add(formName) {
      this.titleBranch = '新增网点'
      this.ruleForm = {
        branchCode: '',
        branchName: '',
        branchPrincipal: '',
        branchTel: '',
        branchAddr: ''
      }
      this.$refs[formName] && this.$refs[formName].resetFields()
      this.dialogBranchVisible = true
    },
    editor() {
      this.titleBranch = '编辑网点'
      branch.getBranchById(this.branchId).then(res => {
        this.ruleForm = {
          branchCode: res.result.branchCode,
          branchName: res.result.branchName,
          branchPrincipal: res.result.branchPrincipal,
          branchTel: res.result.branchTel,
          branchAddr: res.result.branchAddr
        }
        this.dialogBranchVisible = true
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          branch.addOrModifyBranch({
            ...this.ruleForm,
            id: this.titleBranch === '编辑网点' ? this.branchId : null
          }).then(async res => {
            if (res.code === 200) {
              this.$message.success('保存成功')
              this.dialogBranchVisible = false
              const res = await branch.branchTree()
              this.branchData = res.result
              this.titleBranch === '编辑网点' ? this.getBranchByIdXq(this.branchId) : this.getBranchByIdXq(this.branchData[0].id)
            } else {
              this.$message.error('保存失败')
            }
          })
        } else {
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName] && this.$refs[formName].resetFields()
      this.dialogBranchVisible = false
    }
  }
}
</script>

<style lang="scss" scoped>
.diver-t{
    padding: 20px 20px 0 0;
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
.branch-tree{
    display: flex;
    width: 100%;
    padding: 0 0 0 20px;
    height: calc(100% - 120px);
    .tree-branch{
        width: 250px;
        height: 100%;
        border: 1px solid #ccc;
        padding: 20px 0 0 10px;
    }
    &-right{
        flex: 1;
        padding: 0 0 0 20px;
        .branch-tree-item{
            display: flex;
        }
        .branch-tip{
            color: rgb(56, 56, 56);
            margin-bottom: 20px;
        }
        .branch-tip::before{
            content: '';
            display: inline-block;
            height: 20px;
            width: 3px;
            vertical-align: 10px;
            margin-right: 5px;
            vertical-align: -3px;
            background-color: #409EFF;
        }
        .branch-tree-item p:nth-of-type(1){
            width: 100px;
            line-height: 40px;
            text-align: right;
        }
        .branch-tree-item p:nth-of-type(2){
            margin-left: 20px;
            line-height: 40px;

        }
    }
}
</style>
