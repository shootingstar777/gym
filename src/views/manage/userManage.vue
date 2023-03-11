<template>
  <div>
    <el-tag type="success">用户管理</el-tag>
    <el-table :data="userData" border fit max-height="550px" stripe highlight-current-row style="margin-top:20px">
      <el-table-column align="center" prop="user_id" label="用户编号"></el-table-column>
      <el-table-column align="center" prop="user_name" label="用户名"></el-table-column>
      <el-table-column align="center" prop="mail" label="mail"></el-table-column>
      <el-table-column align="center" prop="user_class" label="班级"></el-table-column>
      <el-table-column align="center" prop="profession" label="学院"></el-table-column>
      <el-table-column align="center" prop="faculty" label="专业"></el-table-column>
      <el-table-column align="center" prop="sno" label="学号"></el-table-column>
      <el-table-column align="center" prop="telephone" label="联系方式"></el-table-column>
      <el-table-column align="center" prop="power" label="权限">
        <template slot-scope="scope">
          <div @click="addPower(scope.row)">
            <div v-if="scope.row.power !== 1">
              <el-button type="warning" round size="small">赋予权限</el-button>
            </div>
            <div v-else>
              <el-tag round type="warning" style="cursor:pointer"><i class="el-icon-user-solid"></i></el-tag>
            </div>
          </div>

        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getAllUsers_, addPower_ } from '../../network/adminApi'
export default {
  data() {
    return {
      userData: [],
      loading: false,
    }
  },
  created() {
    this.getAllUsers()
  },
  methods: {
    getAllUsers() {
      this.loading = true
      getAllUsers_().then(res => {
        console.log(res);
        if (res.status == 0) {
          this.userData = res.data
          this.loading = false
        }
      }, err => {
        console.log(err);
      })
    },
    addPower(item) {
      this.$confirm('确认要更改此用户管理员权限吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.loading = true
        addPower_({ user_id: item.user_id }).then(res => {
          if (res.status == 0) {
            this.$router.go(0)
            this.$message.success('赋予权限成功！')
          } else {
            this.$message.error(res)
          }
        })
      })
    }
  }

}
</script>

<style>

</style>