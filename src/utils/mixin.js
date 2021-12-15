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
    this.branchList = response.result;
    this.branchListA = JSON.parse(JSON.stringify(response.result));
    if (this.branchList && this.branchList.length) {
      this.branchList.forEach(v => {
        if (v.level === 0) {
          v.id = '';
        }
      })
    }
    if (this.branchListA && this.branchListA.length) {
      for(var i  = 0;i < this.branchListA.length;i++){
        if(this.branchListA[i].level === 0) {
          this.branchListA.splice(i,1);
        }
      }
    }
  },
 async activated () {
    const response = await branch.sampleBranchDropDown()
    this.branchList = response.result;
    this.branchListA = JSON.parse(JSON.stringify(response.result));
    if (this.branchList && this.branchList.length) {
      this.branchList.forEach(v => {
        if (v.level === 0) {
          v.id = '';
        }
      })
    }
    if (this.branchListA && this.branchListA.length) {
      for(var i  = 0;i < this.branchListA.length;i++){
        if(this.branchListA[i].level === 0) {
          this.branchListA.splice(i,1);
        }
      }
    }
  },
  methods: {
    changeBranch(val) {
      this.formSearch.branchId = val;
      this.gatherExportForm.branchId = val;
    }
  }
}
