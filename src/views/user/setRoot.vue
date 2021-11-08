<template>
  <div ref="main" class="dashboard-container">
    <div class="set-root">
      <div class="set-root-top">
        {{ roleName }}
      </div>

      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="操作权限" name="first">
          <div class="set-root-check">
            <div
              v-for="(item, index) in roleList"
              :key="index"
              class="set-root-box"
            >
              <el-checkbox
                v-model="item.isChecked"
                :indeterminate="item.isIndeterminate"
                @change="handleCheckAllChanges($event, item, index)"
              >{{ item.menuName }}</el-checkbox>
              <div style="margin: 15px 0;" />
              <div v-for="childOne in item.childNodes" :key="childOne.menuId">
                <el-checkbox
                  v-model="childOne.isChecked"
                  :indeterminate="childOne.isIndeterminate"
                  @change="handleCheckAllChange($event, childOne, index)"
                >{{ childOne.menuName }}</el-checkbox>
                <div style="margin: 15px 0;" />
                <el-checkbox
                  v-for="childTwo in childOne.childNodes"
                  :key="childTwo.menuId"
                  v-model="childTwo.isChecked"
                  @change="handleCheckChange($event, childOne, index)"
                >{{ childTwo.menuName }}</el-checkbox>
                <div style="margin: 15px 0;" />
              </div>
            </div>
            <div>
              <el-button type="primary" @click="submitRoot">保存</el-button>
              <el-button type="primary" @click="rest">取消</el-button>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="成员列表" name="second" style="height:100%">
          <div class="set-root-t">成员列表</div>
          <div class="set-root-table">
            <el-table
              :data="Roledata"
              border
              stripe
              style="width: 100%"
              height="95%"
            >
              <el-table-column type="index" label="序号" width="60" />
              <el-table-column
                prop="userCode"
                label="员工编号"
                :show-overflow-tooltip="true"
              />
              <el-table-column
                prop="userName"
                label="姓名"
                :show-overflow-tooltip="true"
              />
              <el-table-column
                prop="mobileNo"
                label="手机"
                :show-overflow-tooltip="true"
              />
              <el-table-column
                prop="createdTime"
                label="添加时间"
                :show-overflow-tooltip="true"
              />
            </el-table>
            <pagination
              v-show="total > 0"
              :total="total"
              :page.sync="listQuery.page"
              :limit.sync="listQuery.limit"
              @pagination="getList"
            />
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import userAdmin from '@/api/userAdmin'
import Pagination from '@/components/pagination'

export default {
  name: 'Admin',
  components: {
    Pagination
  },
  data() {
    return {
      activeName: 'first',
      checkedCities: [],
      roleList: [],
      isIndeterminate: false,
      Roledata: [],
      total: 200,
      listQuery: {
        page: 1,
        limit: 10
      },
      data: [],
      roleName: ''
    }
  },
  created() {
    this.roleId = localStorage.getItem('roleId')
    this.roleName = this.$route.query.roleName
    this.postrolequeryRoleMenus()
    this.getList()
  },
  methods: {
    // 保存
    submitRoot() {
      var menuIdsArr = []
      this.roleList.forEach(v => {
        if (v.isChecked) {
          menuIdsArr.push(v.menuId)
        }
        if (v.childNodes && v.childNodes.length > 0) {
          v.childNodes.forEach(o => {
            if (o.isChecked) {
              menuIdsArr.push(o.menuId)
            }
            if (o.childNodes && o.childNodes.length > 0) {
              o.childNodes.forEach(z => {
                if (z.isChecked) {
                  menuIdsArr.push(z.menuId)
                }
              })
            }
          })
        }
      })

      const data = {
        id: this.roleId,
        menuIds: menuIdsArr
      }
      userAdmin.postroleaddMenu(data).then(res => {
        this.$message.success('保存成功')
        const nowRouter = this.$route
        const obj = {
          label: nowRouter.meta.tagName || nowRouter.meta.title,
          path: nowRouter.path,
          name: nowRouter.name,
          lastTime: new Date().getTime()
        }
        this.$store.dispatch('app/deleteTagNavList', obj)
        this.$router.push({
          path: 'roleAdmin'
        })
      })
    },
    rest() {
      this.$router.push({
        path: 'roleAdmin'
      })
    },
    getList() {
      userAdmin
        .postrolequeryRoleUser(
          this.roleId,
          this.listQuery.page,
          this.listQuery.limit
        )
        .then(res => {
          this.Roledata = res.result.list
          this.total = res.result.total
        })
    },
    // api
    postrolequeryRoleMenus() {
      userAdmin.postrolequeryRoleMenus(this.roleId).then(res => {
        this.roleList = res.result.roleMenus
        this.roleName = res.result.roleName
        this.roleList.forEach(v => {
          if (v.isChecked) {
            v.isIndeterminate = false
          } else {
            const is = this.arrDg(v.childNodes).some(v => v === true)
            is ? (v.isIndeterminate = true) : (v.isIndeterminate = false)

            v.childNodes.forEach(o => {
              const isOr = this.arrDg(o.childNodes).some(z => z === true)
              const isOrs = this.arrDg(o.childNodes).every(z => z === true)
              isOr ? (o.isIndeterminate = true) : (o.isIndeterminate = false)
              isOrs ? (o.isIndeterminate = false) : ''
            })
          }
        })
      })
    },
    // 递归
    arrDg(list) {
      const data = []
      list.forEach(v => {
        data.push(v.isChecked)
        if (v.childNodes && v.childNodes.length > 0) {
          v.childNodes.forEach(o => {
            data.push(o.isChecked)
          })
        }
      })
      return data
    },
    // 点击切换tab
    handleClick(tab, event) {},
    handleCheckedCitiesChange(val) {},
    // 第二层多选框
    handleCheckAllChange(val, obj, idx) {
      if (val) {
        obj.isChecked = true
        obj.isIndeterminate = false
        this.isisIndeterminate(idx)
        obj.childNodes.forEach(v => {
          v.isChecked = true
        })
      } else {
        obj.isChecked = false
        if (this.checkIS(idx)) {
          this.roleList[idx].isChecked = true
          this.roleList[idx].isIndeterminate = false
        } else {
          this.roleList[idx].isChecked = false
          const is = this.roleList[idx].childNodes.every(
            v => v.isIndeterminate === false
          )
          const isqwe = this.roleList[idx].childNodes.every(
            v => v.isChecked === false
          )
          if (is && isqwe) {
            this.roleList[idx].isIndeterminate = false
          } else {
            this.roleList[idx].isIndeterminate = true
          }
        }
        obj.childNodes.forEach(v => {
          v.isChecked = false
        })
      }
    },
    // 第一层多选框
    handleCheckAllChanges(val, obj, idx) {
      if (val) {
        this.roleList[idx].isIndeterminate = false
        this.roleList[idx].childNodes.forEach(v => {
          v.isChecked = true
          v.isIndeterminate = false
          if (v.childNodes && v.childNodes.length > 0) {
            v.childNodes.forEach(i => {
              i.isChecked = true
            })
          }
        })
      } else {
        this.roleList[idx].childNodes.forEach(v => {
          v.isChecked = false
          if (v.childNodes && v.childNodes.length > 0) {
            v.childNodes.forEach(i => {
              i.isChecked = false
            })
          }
        })
      }
    },
    // 点最下层多选框
    handleCheckChange(val, obj, idx) {
      const is = obj.childNodes.every(v => v.isChecked === true)
      const isNo = obj.childNodes.every(v => v.isChecked === false)
      if (is) {
        obj.isChecked = true
        obj.isIndeterminate = false
        this.isisIndeterminate(idx)
      } else {
        obj.isChecked = false
        // 全没选中
        if (isNo) {
          obj.isIndeterminate = false
          const is = this.roleList[idx].childNodes.every(
            v => v.isIndeterminate === false
          )
          if (is) {
            this.roleList[idx].isIndeterminate = false
          } else {
            this.roleList[idx].isIndeterminate = true
          }
        } else {
          obj.isIndeterminate = true
          this.roleList[idx].isIndeterminate = true
          this.roleList[idx].isChecked = false
        }
      }
    },
    checkIS(idx) {
      const is = this.roleList[idx].childNodes.every(v => v.isChecked === true)
      return is
    },
    isisIndeterminate(idx) {
      if (this.checkIS(idx)) {
        this.roleList[idx].isChecked = true
        this.roleList[idx].isIndeterminate = false
      } else {
        this.roleList[idx].isChecked = false
        const is = this.roleList[idx].childNodes.every(
          v => v.isChecked === false
        )
        if (is) {
          this.roleList[idx].isIndeterminate = false
        } else {
          this.roleList[idx].isIndeterminate = true
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.set-root-table {
  height: calc(100% - 100px);
}
.set-root-t {
  font-size: 14px;
  margin-bottom: 15px;
}
.set-root {
  width: 100%;
  height: 95%;
  margin-top: 20px;
  padding: 20px 40px;
  overflow: hidden;
  &-top {
    height: 80px;
    line-height: 80px;
    font-size: 28px;
    color: #34335b;
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
</style>
