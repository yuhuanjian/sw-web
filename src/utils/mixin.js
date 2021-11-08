import branch from '../api/branch'
export const branchDropDown = {
  data() {
    return {
      branchList: [],
      branchListA: [],
      formSearch: {
        branchId: localStorage.getItem('userTypeSW') === '0' ? '' : localStorage.getItem('nowbranchDropDown')
      },
      isshowBtn: localStorage.getItem('userTypeSW')
    }
  },
  async created() {
    const response = await branch.sampleBranchDropDown()
    this.branchList = response.result
    this.branchListA = JSON.parse(JSON.stringify(response.result))
    if (this.branchList && this.branchList.length) {
      this.branchList.forEach(v => {
        if (v.branchName === '总部') {
          v.id = ''
        }
      })
    }
  },
 async activated () {
    const response = await branch.sampleBranchDropDown()
    this.branchList = response.result
    this.branchListA = JSON.parse(JSON.stringify(response.result))
    if (this.branchList && this.branchList.length) {
      this.branchList.forEach(v => {
        if (v.branchName === '总部') {
          v.id = ''
        }
      })
    }
  },
  methods: {
    changeBranch(val) {}
  }
}
