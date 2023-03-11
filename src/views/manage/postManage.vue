<template>
  <div>

    <el-tabs v-model="activeName" @tab-click="handleClick" v-loading="loading">
      <el-tab-pane label="帖子管理" name="post">
        <el-input v-model="search" placeholder="请输入标题关键字" style="margin-bottom:10px;width: 200px;"></el-input>
        <el-button style="margin:0 20px" @click="searchClick" type="primary">搜索</el-button>
        <el-button style="margin:0 20px" @click="getAllPost">返回</el-button>
        <el-table :data="postsData" stripe style="width: 100%" max-height="575px">
          <el-table-column prop="post_id" label="编号" align="center">
          </el-table-column>
          <el-table-column prop="title" label="标题">
          </el-table-column>
          <el-table-column prop="content" label="内容">
          </el-table-column>
          <el-table-column prop="create_time" label="创建时间">
          </el-table-column>
          <el-table-column prop="user_id" label="创建用户id">
          </el-table-column>
          <el-table-column prop="user_name" label="创建用户名">
          </el-table-column>
          <el-table-column label="是否可见">
            <template slot-scope="scope">
              <div @click="deleteChange(scope.row)">
                <el-button type="danger" size="small" v-if="scope.row.beDeleted==0">设置不可见</el-button>
                <el-button type="success" size="small" v-else>设置可见</el-button>
              </div>

            </template>
          </el-table-column>
        </el-table>

      </el-tab-pane>
      <el-tab-pane label="评论管理" name="comment">

      </el-tab-pane>
      <el-tab-pane label="回复管理" name="reply">

      </el-tab-pane>

    </el-tabs>
  </div>
</template>

<script>
import { adminGetAllPost_, deleteChange_ } from '../../network/adminApi'
export default {
  data() {
    return {
      search: '',
      loading: '',
      activeName: 'post',
      postsData: [],
      commentsData: [],
      repliesData: [],
      changeData: {
        beDeleted: '',
        post_id: '',

      },
    }
  },
  created() {
    this.getAllPost()
  },
  methods: {
    getAllPost() {
      this.loading = true
      this.search = ''
      adminGetAllPost_().then(res => {
        console.log(res);
        if (res.status == 0) {
          this.postsData = res.data
          this.loading = false
        }
      })
    },
    getAllComment() { },
    getAllReply() {

    },
    handleClick(tab) {
      if (tab.index == '0') {
        if (this.postsData !== []) {
          return;
        }
        this.getAllPost()
      }
      if (tab.index = '1') {
        if (this.commentsData !== []) {
          return;
        }
      }
      if (tab.index = '2') {
        if (this.repliesData !== []) {
          return;
        }
      }
    },
    deleteChange(item) {
      console.log(item);
      this.loading = true
      deleteChange_({ post_id: item.post_id }).then(res => {
        console.log(res);
        if (res.status == 0) {
          this.$message.success(res.message)
          this.loading = false
          if(item.beDeleted==1){
            
          }
        }
      }, err => {
        console.log(err);
      })
    },
    searchClick() {
      if (!this.search) { return; }
      this.postsData = this.postsData.filter(data =>  data.title.toLowerCase().includes(this.search.toLowerCase()))
      this.$message.success('已为您检索到所有关键字帖子')
    }

  },


}
</script>

<style>

</style>