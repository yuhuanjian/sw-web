<template>
  <div id="particles">
    <div class="login" @keydown.enter="submitForm('loginForm')">
      <div class="login-con">
        <div class="icon-login">
          <svg-icon icon-class="logo" />
        </div>
        <p>顺为生猪屠宰经营管控综合平台</p>
        <div class="form-con">
          <el-form
            ref="loginForm"
            :model="form"
            status-icon
            :rules="rules"
            label-width="0px"
            class="demo-ruleForm"
          >
            <el-form-item prop="userName">
              <el-input
                v-model="form.userName"
                placeholder="请输入用户名"
                autocomplete="off"
              />
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                v-model="form.password"
                type="password"
                placeholder="请输入密码"
                autocomplete="off"
              />
            </el-form-item>
            <div class="check-pass">
              <el-checkbox v-model="checked">记住我</el-checkbox>
            </div>
            <el-form-item>
              <el-button
                type="primary"
                @click="submitForm('loginForm')"
              >登录</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const Base64 = require('js-base64').Base64
import userInfos from '@/api/login'
import JSEncrypt from 'jsencrypt'

export default {
  components: {},
  data() {
    return {
      showLogo: true,
      isCollapse: true,
      checked: false,
      form: {
        userName: '',
        password: ''
      },
      rules: {
        userName: [
          { required: true, message: '账号不能为空', trigger: 'blur' }
        ],
        password: [{ required: true, message: '密码不能为空', trigger: 'blur' }]
      }
    }
  },
  created() {
    console.log(process.env.VUE_APP_TARGET_API)
    // 在页面加载时从cookie获取登录信息
    const account = this.getCookie('account')
    const password = Base64.decode(this.getCookie('passWord'))

    // 如果存在赋值给表单，并且将记住密码勾选
    if (password) {
      this.form.userName = account
      this.form.password = password
      this.checked = true
    }
  },
  methods: {
    submitForm(ref) {
      this.$refs[ref].validate(valid => {
        if (valid) {
          const publishKey = new Promise((resolve, reject) => {
            userInfos.postAusergetPublicKey().then(res => {
              resolve(res)
            })
          })
          publishKey.then(res => {
            var encryptor = new JSEncrypt()
            encryptor.setPublicKey(res.result.publicKey) // 设置公钥
            var rsaPassWord = encryptor.encrypt(this.form.password) // 对内容进行加密
            const data = {
              encryptPassword: rsaPassWord,
              loginId: res.result.loginId,
              loginName: this.form.userName
            }
            userInfos.postuserlogin(data).then(response => {
              const userInfo = {
                name: response.result.userName,
                token: response.result.token,
                userId: response.result.sysUserId
              }
              localStorage.setItem('userTypeSW', response.result.userType)
              localStorage.setItem(
                'nowbranchDropDown',
                response.result.dataPermissions.LOGIN_USER_BRANCH[0]
              )
              var permissions = []
              var oldPermiss = [
                'roleMana:query',
                'roleMana:add',
                'roleMana:addUsers',
                'roleMana:edit',
                'roleMana:setPermissions',
                'roleMana:startOrStopUsing',
                'roleMana:delete',
                'usersMana:query',
                'usersMana:add',
                'usersMana:export',
                'usersMana:startOrStopUsing',
                'usersMana:resetPassword',
                'usersMana:edit',
                'usersMana:viewPermissions',
                'usersMana:delete',
                'butcherOrderMana:query',
                'distribute:query',
                'vehicleMana:query',
                'driverMana:query',
                'farmMana:query',
                'marcketMana:query',
                'merchantMana:query',
                'routeMana:query',
                'wholesalerMana:query',
                'monitorType:query',
                'monitoringLog:query',
                'ordersMana:query',
                'allowEnterQuarantine:query',
                'allowOutQuarantine:query',
                'quarantineMana:query',
                'allowKillQuarantine:query',
                'branchMana:add',
                'branchMana:delete',
                'branchMana:edit',
                'butcherOrderMana:export',
                'distribute:export',
                'vehicleMana:export',
                'driverMana:export',
                'farmMana:export',
                'marcketMana:export',
                'merchantMana:export',
                'routeMana:export',
                'wholesalerMana:export',
                'ordersMana:export',
                'allowEnterQuarantine:export',
                'allowOutQuarantine:export',
                'quarantineMana:export',
                'allowKillQuarantine:export',
                'butcherOrderMana:detail',
                'distribute:detail',
                'monitorType:detail',
                'monitoringLog:detail',
                'allowEnterQuarantine:detail',
                'allowOutQuarantine:detail',
                'quarantineMana:detail',
                'allowKillQuarantine:detail'
              ]
              if (response.result.userType == '0') {
                permissions = response.result.permissions.filter((v, i) => {
                  return oldPermiss.includes(v)
                })
              } else {
                permissions = response.result.permissions
              }
              localStorage.setItem(
                'permissions',
                JSON.stringify(permissions)
              )
              this.$store
                .dispatch('user/login', userInfo)
                .then(() => {
                  this.$store.dispatch('app/closeAllTagNavList', '')
                  this.$store
                    .dispatch('app/setAllMenuList', userInfo)
                    .then(() => {
                      this.$router.push({ path: this.redirect || '/' })
                    })
                })
                .catch(() => {})
            })
          })

          this.setUserInfo()
        }
      })
    },
    // 储存表单信息
    setUserInfo: function() {
      // 判断用户是否勾选记住密码，如果勾选，向cookie中储存登录信息，
      // 如果没有勾选，储存的信息为空
      if (this.checked) {
        this.setCookie('account', this.form.userName)
        // base64加密密码
        const passWord = Base64.encode(this.form.password)
        this.setCookie('passWord', passWord)
        this.setCookie('remember', this.checked)
      } else {
        this.setCookie('account', '')
        this.setCookie('passWord', '')
        this.setCookie('remember', this.checked)
      }
    },
    // 获取cookie
    getCookie: function(key) {
      if (document.cookie.length > 0) {
        var start = document.cookie.indexOf(key + '=')
        if (start !== -1) {
          start = start + key.length + 1
          var end = document.cookie.indexOf(';', start)
          if (end === -1) end = document.cookie.length
          return unescape(document.cookie.substring(start, end))
        }
      }

      return ''
    },
    // 保存cookie
    setCookie: function(cName, value, expiredays) {
      var exdate = new Date()
      exdate.setDate(exdate.getDate() + expiredays)
      document.cookie =
        cName +
        '=' +
        decodeURIComponent(value) +
        (expiredays == null ? '' : ';expires=' + exdate.toGMTString())
    }
  }
}
</script>
<style lang="scss" scoped>
/deep/.sidebar-logo-container {
  background-color: white;
}
.icon-login {
  width: 100%;
  text-align: center;
  margin-bottom: 10px;
  .svg-icon {
    height: 50px;
    width: 50px;
  }
}
.el-form-item {
  /deep/.el-button--primary {
    width: 100% !important;
  }
}

.check-pass {
  /deep/.el-checkbox {
    margin-bottom: 15px !important;
  }
}
.login {
  width: 100%;
  height: 100%;
  background-color: #233554;
  background-image: url(../../assets/image/login_bg.png);
  background-size: cover;
  background-position: center;
  position: absolute;
  p {
    // line-height: 40px;
    font-size: 20px;
    text-align: center;
    margin-bottom: 15px;
  }
  &-con {
    padding: 20px;
    background-color: #fff;
    position: absolute;
    border-radius: 6px;
    right: 213px;
    top: 50%;
    transform: translateY(-50%);
    &-header {
      font-size: 16px;
      font-weight: 300;
      text-align: center;
      padding: 30px 0;
    }
    .form-con {
      padding: 10px 0 0;
    }
    .login-tip {
      font-size: 10px;
      text-align: center;
      color: #c3c3c3;
    }
  }
}
</style>
