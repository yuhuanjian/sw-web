import branch from '../api/branch'
export const branchDropDown = {
  data() {
    return {
      branchList: [],
      branchListA: [],
      formSearch: {
        branchId: localStorage.getItem('userTypeSW') === '0' ? '' : localStorage.getItem('nowbranchDropDown')
      },
      isshowBtn: localStorage.getItem('userTypeSW'),
      gatherExportForm: {
        branchId: localStorage.getItem('userTypeSW') === '0' ? '' : localStorage.getItem('nowbranchDropDown')
      }
    }
  },
  async created() {
    const response = await branch.sampleBranchDropDown()
    this.branchList = response.result
    this.branchListA = JSON.parse(JSON.stringify(response.result))
    console.log('created-userBranchId-'+localStorage.getItem('nowbranchDropDown'))
    if (this.branchList && this.branchList.length) {
      this.branchList.forEach(v => {
        if (v.level === 0) {
          v.id = '';
        }
      })
    }
  },
 async activated () {
    const response = await branch.sampleBranchDropDown()
    this.branchList = response.result
    this.branchListA = JSON.parse(JSON.stringify(response.result))
    console.log('activated-userBranchId-'+localStorage.getItem('nowbranchDropDown'))
    if (this.branchList && this.branchList.length) {
      this.branchList.forEach(v => {
        if (v.level === 0) {
          v.id = '';
        }
      })
    }
  },
  methods: {
    changeBranch(val) {
      this.formSearch.branchId = val;
      this.gatherExportForm.branchId = val;
    }
  }
}
