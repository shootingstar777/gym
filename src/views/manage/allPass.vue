<template>
  <div>
    <el-tag type="success">查看全部申请</el-tag>
    <el-empty v-if="applyData.length == 0"></el-empty>
    <check-table :tableData="applyData" :end="end" v-else></check-table>
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
      end:true,
      applyData: [],
    }
  },
  created() {
    this.getAllApply()
  },
  methods: {
    getAllApply() {
      this.loading = true
      getAllApply_().then(res => {
        console.log(res);
        if (res.status == 0) {
          this.applyData = res.data
          this.loading = false
        }
      }, err => {
        console.log(err);
      })
    },
  }
}
</script>

<style>

</style>