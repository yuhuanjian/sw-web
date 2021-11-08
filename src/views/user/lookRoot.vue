<template>
  <div ref="main" class="dashboard-container">
    <div class="set-root">
      <div class="set-root-top">
        <p>{{ userName }}</p>
        <p>{{ roleNames }}</p>
        <div class="root-bt">
          <el-button type="primary" @click="GOback">返回</el-button>
        </div>
      </div>

      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="操作权限" name="first">
          <div class="set-root-check">
            <div
              v-for="(item, index) in roleList"
              :key="index"
              class="set-root-box"
            >
              <p style="font-size:18px;" class="l18 ">
                {{ item.menuName }}
              </p>
              <div style="margin: 15px 0;" />
              <div v-for="childOne in item.childNodes" :key="childOne.menuId">
                <p style="font-size:14px;">
                  {{ childOne.menuName }}
                </p>
                <div style="margin: 15px 0;" />
                <div class="toot-p">
                  <p
                    v-for="childTwo in childOne.childNodes"
                    :key="childTwo.menuId"
                  >
                    {{ childTwo.menuName }}
                  </p>
                </div>
                <div style="margin: 15px 0;" />
              </div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import userAdmin from '@/api/userAdmin'
export default {
  name: 'Admin',
  components: {},
  data() {
    return {
      roleName: '准入检疫员',
      activeName: 'first',
      checkedCities: [],
      roleList: [],
      isIndeterminate: false,
      usersId: '',
      userName: '',
      roleNames: ''
    }
  },
  created() {
    this.usersId = localStorage.getItem('usersId')
    userAdmin.postqueryUserMenus(this.usersId).then(res => {
      this.roleList = res.result.userRoles
      this.roleNames = res.result.roleNames
      this.userName = res.result.userName
    })
  },
  methods: {
    GOback() {
      const nowRouter = this.$route
      const obj = {
        label: nowRouter.meta.tagName || nowRouter.meta.title,
        path: nowRouter.path,
        name: nowRouter.name,
        lastTime: new Date().getTime()
      }
      this.$store.dispatch('app/deleteTagNavList', obj)
      this.$router.push({
        path: 'userAdmin'
      })
    },
    // 点击切换tab
    handleClick(tab, event) {},
    handleCheckedCitiesChange(val) {}
  }
}
</script>

<style lang="scss" scoped>
.root-bt {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}
.set-root {
  width: 100%;
  height: 95%;
  margin-top: 20px;
  padding: 20px 40px;
  overflow: hidden;
  &-top {
    height: 80px;
    font-size: 28px;
    color: #34335b;
    position: relative;
    p:nth-of-type(2) {
      margin-top: 10px;
      font-size: 14px;
    }
  }
  &-check {
    width: 100%;
    overflow: hidden;
    overflow: auto;
    .set-root-box {
      background-color: rgba(245, 245, 245, 0.5);
      margin-bottom: 20px;
      padding: 20px 30px;
    }
  }
}
/deep/.el-tabs {
  height: calc(100% - 100px) !important;
}
/deep/.el-tabs__content {
  overflow: hidden;
  position: relative;
  height: 95%;
  overflow: auto;
}
.toot-p {
  display: flex;

  font-size: 12px;
  color: #303133;
  p {
    margin-right: 50px;
  }
}
</style>
