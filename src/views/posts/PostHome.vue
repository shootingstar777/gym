<template>
  <div>
    <div>
      <el-tag type="success">论坛</el-tag>
    </div>
    <div class="postPage">
      <ul class="postNav" ref='navUl'>
        <span :class="{'active':isActive==1}" @click="navClick(1,'/post')">逛一逛</span>
        <span :class="{'active':isActive==2}" @click="navClick(2,'/myPost')">我的帖子</span>
        <span :class="{'active':isActive==3}" @click="navClick(3,'/personal')">我的评论</span>
      </ul>
      <!-- 帖子 -->
      <div class="postRight">

        <!--         <el-collapse v-model="activeName" accordion  style="overflow:auto;height:550px"
          v-loading="loading">
          <el-collapse-item v-for="item in posts" :key="item.create_time" :name="item.post_id">
            <template slot="title">
              <el-tag class="collTag" type="success">
                <h4>帖子</h4>
              </el-tag>
              <h4>{{item.content}}</h4>
            </template>
            <div class="collDiv">
              <span>
                <el-tag>帖子id</el-tag>{{item.post_id}}
              </span>
              <span>
                <el-tag>帖子创建者</el-tag>{{item.user_name}}
              </span>
              <span>
                <el-tag>帖子创建者id</el-tag>{{item.user_id}}
              </span>
              <span>
                <el-tag>帖子标题</el-tag>{{item.title}}
              </span>
              <span>
                <el-tag>帖子内容</el-tag>{{item.content}}
              </span>
              <span>
                <el-tag>帖子图片</el-tag><img :src="item.image" style="width:50%">
              </span>
              <span>
                <el-tag>帖子创建时间</el-tag>{{item.create_time}}
              </span>
            </div>
            <el-divider></el-divider>
          </el-collapse-item>
          <el-collapse-item v-for="item in comments" :key="item.create_time" :name="item.comment_id">
            <template slot="title">
              <el-tag class="collTag" type="primary">
                <h4>评论</h4>
              </el-tag>
              <h4>{{item.content}}</h4>
            </template>
            <div class="collDiv">
              <span>
                <el-tag>评论id</el-tag>{{item.comment_id}}
              </span>
              <span>
                <el-tag>评论创建者</el-tag>{{item.user_name}}
              </span>
              <span>
                <el-tag>评论创建者id</el-tag>{{item.user_id}}
              </span>
              <span>
                <el-tag>评论内容</el-tag>{{item.content}}
              </span>
              <span>
                <el-tag>评论所属帖子</el-tag>{{item.post_id}}
              </span>

              <span>
                <el-tag>帖子创建时间</el-tag>{{item.create_time}}
              </span>
            </div>
            <el-divider></el-divider>
          </el-collapse-item>
          <el-collapse-item v-for="item in replies" :key="item.create_time" :name="item.reply_id">
            <template slot="title">
              <el-tag class="collTag" type="warning">
                <h4>回复</h4>
              </el-tag>
              <h4>{{item.content}}</h4>
            </template>
            <div class="collDiv">
              <span>
                <el-tag>回复id</el-tag>{{item.reply_id}}
              </span>
              <span>
                <el-tag>回复创建者</el-tag>{{item.user_name}}
              </span>
              <span>
                <el-tag>回复创建者id</el-tag>{{item.user_id}}
              </span>
              <span>
                <el-tag>回复内容</el-tag>{{item.content}}
              </span>
              <span>
                <el-tag>回复所属评论</el-tag>{{item.comment_id}}
              </span>

              <span>
                <el-tag>回复创建时间</el-tag>{{item.create_time}}
              </span>
            </div>
            <el-divider></el-divider>
          </el-collapse-item>

        </el-collapse> -->

        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import PostComponent from '../../components/PostComponent.vue'
export default {
  components: { PostComponent },
  data() {
    return {
      loading: false,
      isActive: '',
      userInfo: {
        user_id: '',
        user_name: ''
      },
      activePath: '',
    }
  },
  created() {
    this.getActive()
    this.getUserInfo()
  },
  methods: {
    getActive() {
      this.activePath = this.$router.currentRoute.path
      if (this.activePath == '/post') {
        this.isActive = 1
      } else if (this.activePath == '/myPost') {
        this.isActive = 2
      } else {
        this.isActive = 3
      }
    },
    getUserInfo() {
      let userInfo = JSON.parse(sessionStorage.getItem('user'))
      this.userInfo.user_id = userInfo.user_id
      this.userInfo.user_name = userInfo.user_name
    },
    navClick(index, path) {
      this.searchDoing = false
      if (this.isActive == index) { return; }
      this.isActive = index
      sessionStorage.setItem('isActive', this.isActive)
      this.$router.push(path)
    },
    searchClick() {
      /* if (this.searchData.type && this.searchData.id) {
        this.loading = true
        findSearch_(this.searchData).then(res => {
          console.log(res);
          if (res.status == 0) {
            this.posts = res.data[0]
            this.comments = res.data[1]
            this.replies = res.data[2]
            this.searchDoing = true
            this.loading = false
          }
        }, err => {
          console.log(err);
        })
      } else {
        return;
      } */
      if (this.search.trim() !== '') {
        this.posts = this.posts.filter(data => data.title.toLowerCase().includes(this.search.toLowerCase()))
      }
    },
    goBack() {
      this.$router.go(0)
    }
  }

}
</script>

<style>
.postImage {
  width: 30%;
  box-sizing: content-box;
  padding: 10px;
}

.postPage {
  display: flex;
  margin-top: 10px;
  justify-content: space-around;

}

.postRight {
  flex: 1;
}

.postNav {
  width: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}

.postNav>span {
  color: #eee;
  font-weight: 700;
  padding: 30px 60px;
  cursor: pointer;
}

.postNav>span:hover {
  background-color: rgba(101, 101, 101, .4);
  transition: all 0.3s linear;
}

.active {
  color: #409EFF !important;
}

.collTag {
  display: flex;
  align-items: center;
  margin-right: 10px;
}

.collDiv {
  display: flex;
  flex-direction: column;
}

.collDiv>span {
  margin-bottom: 10px;
}
</style>