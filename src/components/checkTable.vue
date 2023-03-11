<template>
  <div class="container">
    <el-table :data="tableData.filter(data => !search || data.user_name.toLowerCase().includes(search.toLowerCase()))"
      stripe style="width: 100%;margin-top:10px" v-loading="loading" max-height="575px" fit>
      <el-table-column prop="id" label="申请号" align="center">
      </el-table-column>
      <el-table-column prop="user_name" label="用户名" align="center">
      </el-table-column>
      <el-table-column prop="start_end_time_date" label="日期" align="center">
      </el-table-column>
      <el-table-column prop="start_end_time" label="时间段" align="center">
      </el-table-column>
      <el-table-column prop="ground_id" label="场地号" align="center">
      </el-table-column>
      <el-table-column prop="start_time" label="创建时间" width="100px" align="center">
      </el-table-column>
      <el-table-column prop="end_time" label="结束时间" width="100px" align="center">
      </el-table-column>
      <el-table-column prop="telephone" label="联系方式" align="center">
      </el-table-column>
      <el-table-column label="状态" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status == 1" type="info">申请中</el-tag>
          <el-tag v-else-if="scope.row.status == 2" type="success">申请完成</el-tag>
          <el-tag v-else-if="scope.row.status == 3" type="info">取消申请中</el-tag>
          <el-tag v-else-if="scope.row.status == 4" type="success">取消申请成功</el-tag>
          <el-tag v-else-if="scope.row.status == 5" type="danger">申请失败</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="right" width="200px" v-if="!end">
        <template slot="header">
          <el-input v-model="search" size="mini" placeholder="输入用户名关键字搜索" />
        </template>
        <template slot-scope="scope" fixed>
          <el-button style="margin-bottom:10px" size="mini" type="danger"
            @click="handleRefuse(scope.$index, scope.row)">
            拒绝申请</el-button>
          <el-button size="mini" type="primary" @click="applyEnsure(scope.$index, scope.row)">确认申请</el-button>
        </template>
      </el-table-column>
    </el-table>


  </div>

</template>

<script>
import { passApply_, cancelEnsure_, cancelRefuse_, refuseApply_ } from '../network/adminApi'
export default {
  props: ["tableData", "end"],
  data() {
    return {
      loading: '',
      search: '',
      apply: {
        id: '',
        time_id: '',
        ground_id: '',
        date_id: '',
      },
    }
  },
  methods: {
    handleRefuse(index, item) {
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
              this.$router.go(0)
              this.loading = false
            }
          })

        } else {
          //拒绝取消申请
          cancelRefuse_(this.apply).then(res => {
            console.log(res);
            if (res.status == 0) {
              this.$message.success(res.message)
              this.$router.go(0)
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
              this.$router.go(0)
              this.loading = false
            }
          })

        } else {
          //取消申请成功
          cancelEnsure_(this.apply).then(res => {
            console.log(res);
            if (res.status == 0) {
              this.$message.success(res.message)
              this.$router.go(0)
              this.loading = false
            }
          }, err => {
            console.log(err);
          })
        }
      })
    }


  }

}
</script>

<style>
.container {
  height: 550px;
  width: 100%;
}
</style>