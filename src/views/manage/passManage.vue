<template>
  <div>
    <el-tag type="success">通过申请管理</el-tag>
    <el-empty v-if="applyData.length == 0"></el-empty>
    <check-table :tableData="applyData" v-else></check-table>
  </div>
</template>

<script>
import { getAllApply_, } from '../../network/adminApi';
import checkTable from '../../components/checkTable.vue'
export default {
  components: {
    checkTable
  },
  data() {
    return {
      applyData: [],
    }
  },
  created() {
    this.getAllApply()
  },
  methods: {
    getAllApply() {
      this.loading = true
      getAllApply_({ status: true }).then(res => {
        console.log(res);
        if (res.status == 0) {
          this.applyData = res.data
          this.loading = false
        }
      }, err => {
        console.log(err);
      })
    },
    /*  handleRefuse(index, item) {
       this.apply.id = item.id
       this.apply.ground_id = item.ground_id
       this.apply.time_id = item.time_id
       this.apply.date_id = item.date_id
       this.$confirm('确认要驳回此申请吗？', '提示', {
         confirmButtonText: '确定',
         cancelButtonText: '取消',
         type: 'warning'
       }).then(() => {
         this.loading = true
         if (item.status == 1) {
           //申请失败
           refuseApply_(this.apply).then(res => {
             console.log(res);
             if (res.status == 0) {
               this.$message.success(res.message)
               this.getAllApply()
               this.loading = false
             }
           })
 
         } else {
           //拒绝取消申请
           cancelRefuse_(this.apply).then(res => {
             console.log(res);
             if (res.status == 0) {
               this.$message.success(res.message)
               this.getAllApply()
               this.loading = false
             }
           }, err => {
             console.log(err);
           })
         }
       })
     },
     applyEnsure(index, item) {
       this.apply.id = item.id
       this.apply.ground_id = item.ground_id
       this.apply.time_id = item.time_id
       this.apply.date_id = item.date_id
       this.$confirm('确认同意此申请吗？', '提示', {
         confirmButtonText: '确定',
         cancelButtonText: '取消',
         type: 'success'
       }).then(() => {
         this.loading = true
         if (item.status == 1) {
           //申请成功
           passApply_(this.apply).then(res => {
             console.log(res);
             if (res.status == 0) {
               this.$message.success(res.message)
               this.getAllApply()
               this.loading = false
             }
           })
 
         } else {
           //取消申请成功
           cancelEnsure_(this.apply).then(res => {
             console.log(res);
             if (res.status == 0) {
               this.$message.success(res.message)
               this.getAllApply()
               this.loading = false
             }
           }, err => {
             console.log(err);
           })
         }
       })
     } */
  }
}
</script>

<style>

</style>