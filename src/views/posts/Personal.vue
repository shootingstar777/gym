<template>
  <!-- 我的 -->
  <div style="display:flex">

    <el-card v-loading="CommentLoading" style="width:50%;overflow:auto;height:550px">
      <h3 style="display:flex;justify-content:center">
        <el-tag>我的评论</el-tag>
      </h3>

      <el-empty v-if="personalComment.length==0"></el-empty>
      <el-card>
        <el-collapse accordion v-model="commentActiveNames" @change="handleChange">
          <el-collapse-item v-for="item in personalComment" :key="item.comment_id" :title="item.content"
            :name="item.comment_id">
            <div class="contentBody">
              <h4>
                <el-tag>被评论帖子id</el-tag>{{item.post_id}}
              </h4>
              <h4>
                <el-tag>评论内容</el-tag>{{item.content}}
              </h4>
              <h4>
                <el-tag>评论时间</el-tag>{{item.create_time}}
              </h4>
              <h4>
                <el-tag>评论id</el-tag>{{item.comment_id}}
              </h4>
            </div>
          </el-collapse-item>
        </el-collapse>
      </el-card>
    </el-card>

    <el-card v-loading="replyLoading" style="width:50%;margin:0px 10px 0px 10px;overflow:auto;height:550px">
      <h3 style="display:flex;justify-content:center">
        <el-tag>我的回复</el-tag>
      </h3>
      
      <el-empty v-if="personalComment.length==0"></el-empty>
      <el-card>
        <el-collapse accordion v-model="replyActiveNames" @change="handleChange">
          <el-collapse-item v-for="item in personalReply" :key="item.reply_id" :title="item.content"
            :name="item.reply_id">
            <div class="contentBody">
              <h4>
                <el-tag>被回复评论id</el-tag>{{item.comment_id}}
              </h4>
              <h4>
                <el-tag>回复内容</el-tag>{{item.content}}
              </h4>
              <h4>
                <el-tag>回复时间</el-tag>{{item.create_time}}
              </h4>
              <h4>
                  <el-tag>回复id</el-tag>{{item.reply_id}}
              </h4>
            </div>
          </el-collapse-item>
        </el-collapse>
      </el-card>
    </el-card>
  </div>
</template>

<script>
import { getPersonal_ } from '../../network/postApi'
export default {
  data() {
    return {
      replyActiveNames:'',
      commentActiveNames: '',
      CommentLoading: false,
      replyLoading: false,
      personalComment: [],
      personalReply: [],
      userInfo: {
        user_id: '',
        user_name: ''
      }
    }
  },
  created() {
    this.getUserInfo()
    this.getPersonal()
  },
  methods: {
    getUserInfo() {
      let userInfo = JSON.parse(sessionStorage.getItem('user'))
      this.userInfo.user_id = userInfo.user_id
      this.userInfo.user_name = userInfo.user_name
    },
    getPersonal() {
      this.CommentLoading = true;
      this.replyLoading = true;
      getPersonal_({ user_id: this.userInfo.user_id }).then(res => {
        console.log("res:", res);
        if (res.status == 0) {
          this.personalComment = res.data[0]
          this.CommentLoading = false
          this.personalReply = res.data[1]
          this.replyLoading = false
          this.loading = false
        }
      }, err => {
        console.log(err);
      })
    },
    handleChange() {

    }
  }

}
</script>

<style>
.contentBody {
  display: flex;
  flex-direction: column;
}

.contentBody>h4>.el-tag {
  margin: 5px 10px 0px 0px;
}
</style>