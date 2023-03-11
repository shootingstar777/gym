<template >
  <div v-loading="loading">
    <el-tag type="success">羽毛球场地申请</el-tag>
    <div style="display:flex;justify-content:center">
      <el-button autofocus @click="getTableData">今天{{ date.today }}</el-button>
      <el-button @click="getTomApply">明天{{ date.tomorrow }}</el-button>
    </div>
    <applyTable :data="tableData" :type="typeId" :date="date" v-if="tableData.length" style="margin-top:10px"
      @applySuccess="applySuccess"></applyTable>
  </div>
</template>

<script>
import applyTable from '../../components/applyTable.vue'
import { getTableData_, getTomApply_ } from '../../network/applyApi'
export default {
  components: {
    applyTable
  },
  created() {
    this.getTableData()
  },
  data() {
    return {
      loading: false,
      tableData: [],
      typeId: 2,
      date: {
        id: '',
        today: '',
        tomorrow: ''
      }
    }
  },
  created() {
    this.getTableData()
    this.dataInit()
  },
  methods: {
    applySuccess(data) {
      console.log(data);
      if (data == 1) {
        this.getTomApply()
      } else {
        this.getTableData()
      }
    },
    getTime(danger) {
      let date = new Date()
      let result = `${date.getMonth() + 1}月${date.getDate() + danger}日 `
      return result
    },
    dataInit() {
      this.date.today = this.getTime(0)
      this.date.tomorrow = this.getTime(1)
    },
    getTableData() {
      this.tableData = ''
      this.loading = true
      this.date.id = 0
      getTableData_({ type_id: this.typeId }).then(res => {
        this.tableData = res.data
        this.loading = false
      }, err => { console.log(err); })
    },
    getTomApply() {
      this.tableData = ''
      this.date.id = 1
      // this.applyForm.date_id = 1
      //this.applyForm.selectDate = this.getTime(1)
      this.loading = true
      getTomApply_({ type_id: this.typeId }).then(res => {
        this.tableData = res.data
        this.loading = false
      }, err => {
        console.log(err);
      })
    },
  }

}
</script>

<style>

</style>