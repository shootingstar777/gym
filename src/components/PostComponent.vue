<template>
  <div>
    <div class="titleBtn">
      <el-button @click="goBack" style="margin-right:50px">返回</el-button>
      <el-input v-model="search" prefix-icon="el-icon-search" placeholder="请输入关键字" style="width:200px">
      </el-input>
      <el-button @click="searchClick" style="margin-left:10px"><i class="el-icon-search"></i>搜索</el-button>
      <el-button @click="commentHidden" type="info">收起评论</el-button>
      <el-button @click="addPostShow" type="success"><i class="el-icon-plus"></i>发布帖子</el-button>
    </div>
    <!-- 帖子 -->
    <div v-loading="loading">
      <div v-for="(item) in this_postsData" :key="item.post_id">
        <el-card class="postCard">
          <el-tag type="info">{{ item.post_id }} </el-tag>
          <h3 style="display:inline-block" class="nameSpan"> {{ item.user_name }}： </h3>
          <h4 style="display:inline-block"> {{ item.title }} </h4>
          <p>{{ item.content }}</p>
          <div  v-if="item.image">
            <el-image :src="require('../assets/postImage/' + item.image)" fit="contain" class="postImage"></el-image>
          </div>
          <div style="display:flex;">
            <p style="font-size:12px">发布时间：{{ item.create_time }}</p>
            <el-button type="primary" style="margin:10px 0px 10px 20px" size="mini" @click="CommentShow(item.post_id)">
              查看评论</el-button>
            <el-button type="warning" size="mini" style="margin:10px 0px 10px 20px"
              @click="addCommentShow(item.post_id)">
              点击评论</el-button>
            <el-button type="danger" size="mini" style="margin:10px 0px 10px 20px"
              v-show="item.user_id == userInfo.user_id" @click="deletePost(item.post_id)">
              删除帖子</el-button>
          </div>

          <!-- 评论区 -->
          <div v-show="indexPostId === item.post_id && commentVisible" v-loading="commentLoading">
            <el-divider>评论区</el-divider>
            <el-empty v-if="commentData.length == 0" description="还没有评论，快来评论吧~">
            </el-empty>
            <div v-for="(comment, index) in commentData" :key="comment.comment_id" v-else>
              <div style="margin:20px">
                <el-tag type="info" size="small">评论</el-tag>
                <span style="font-weight:bold;font-size: 12px;">第{{ commentData.length - index }}楼：</span>
                <div style="display:flex;align-items: center;">
                  <span class="nameSpan">{{ comment.user_name }}：</span>
                  <span>{{ comment.content }}</span>
                </div>
                <div class="reply">
                  <span>发布时间：{{ comment.create_time }}</span>
                  <span @click="addReplyShow(comment.comment_id)">回复</span>
                </div>
                <!-- 回复区 -->
                <div v-if="comment.children != []">
                  <div class="replyMain" v-for="(el, i) in comment.children" :key="el.reply_id">
                    <el-divider>回复</el-divider>
                    <div>
                      <el-tag type="info" size="mini">回复</el-tag>
                      <span style="font-weight:bold;font-size: 12px;">{{ comment.children.length - i }}楼：</span>

                      <span class="nameSpan">{{ el.user_name }}：</span>
                      <span>{{ el.content }}</span>
                      <span style="float:right;font-size:12px">发布时间：{{ el.create_time }}</span>
                    </div>
                  </div>
                </div>
                <el-divider></el-divider>
              </div>
            </div>
          </div>
        </el-card>
      </div>
    </div>



    <!-- 发布帖子 -->
    <el-dialog title="发布帖子" :visible.sync="dialogFormVisible">
      <el-form :model="postForm" label-width="80px" ref="postFormRef" :rules="postFormRules" status-icon>
        <el-form-item label="标题:" prop="title" :rules="[
        { required: true, message: '请输入标题', trigger: 'blur' }]">
          <el-input v-model="postForm.title"></el-input>
        </el-form-item>
        <el-form-item label="内容:" prop="content" :rules="[
        { required: true, message: '请输入内容', trigger: 'blur' }]">
          <el-input v-model="postForm.content"></el-input>
        </el-form-item>
        <el-form-item label="图片:">
          <el-upload ref="upload" class="upload-demo" action="http://127.0.0.1:3000/post/addPost" :limit="1"
            :file-list="fileList" list-type="picture" :on-exceed="onExceed" :auto-upload="false"
            :on-change="handleChange" :data="postForm">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addPostEnsure">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 发布评论 -->
    <el-dialog title="评论TA" :visible.sync="commentDialogFormVisible">
      <el-form :model="commentForm" ref="commentFormRef">
        <el-form-item label="内容" label-width="100px" prop="content" :rules="[
        { required: true, message: '请输入内容', trigger: 'blur' }]">
          <el-input v-model="commentForm.content" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="commentDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addComment">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 发布回复 -->
    <el-dialog title="回复TA" :visible.sync="replyDialogFormVisible">
      <el-form :model="replyForm" ref="replyFormRef">
        <el-form-item label="内容" label-width="100px" prop="content" :rules="[
        { required: true, message: '请输入内容', trigger: 'blur' }]">
          <el-input v-model="replyForm.content" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="replyDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addReply">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { addPost_, addComment_, getComment_, addReply_, getPosts_, deletePost_ } from '../network/postApi'
export default {
  props: {
    postsData: '',
  },
  data() {
    return {
      search: '',
      commentVisible: true,
      indexPostId: '',
      loading: false,
      commentLoading: false,
      file: '',
      fileList: [],
      commentDialogFormVisible: false,
      replyDialogFormVisible: false,
      commentForm: {
        user_id: '',
        post_id: '',
        content: '',
        user_name: '',
      },
      replyForm: {
        user_id: '',
        comment_id: '',
        content: '',
        user_name: '',
      },
      commentData: '',
      userInfo: {
        user_id: '',
        user_name: ''
      },
      postForm: {
        title: '',
        content: '',
        user_id: '',
        user_name: ''
      },
      postFormRules: {
        title: [
          {
            required: true,
            message: '请输入标题',
            trigger: 'blur'
          }],
        content: [
          {
            required: true,
            message: '请输入标题',
            trigger: 'blur'
          }
        ]
      },
      dialogFormVisible: false,
      personalComment: [],
      personalReply: [],
    }
  },
  created() {
    this.this_postsData = this.$props.postsData
    this.getUserInfo()
  },
  computed: {
   
  },
  methods: {
    getUserInfo() {
      let userInfo = JSON.parse(sessionStorage.getItem('user'))
      this.userInfo.user_id = userInfo.user_id
      this.userInfo.user_name = userInfo.user_name
    },
    getPosts() {
      this.this_postsData = ''
      this.loading = true
      getPosts_().then(res => {
        if (res.status == 0) {
          this.this_postsData = res.data
          this.loading = false
        }
      }, err => { console.log(err); })
    },
    addPostShow() {
      this.postForm.user_id = this.userInfo.user_id
      this.postForm.user_name = this.userInfo.user_name
      this.dialogFormVisible = true
    },
    commentHidden() {
      this.commentVisible = false

    },
    onExceed() {
      this.$message.info('最多只能上传一张图片~')
    },
    /* 上传文件之死马当活马医 */
    handleChange(file, fileList) {
      console.log(file);
      if (file.response.status == 0) {
        this.dialogFormVisible = false;
        this.$message.success('发布帖子成功！')
        this.$router.go(0)
        this.$refs.postFormRef.resetFields();
        this.file = ''
        this.fileList = []
      }
    },
    /*  console.log(file);
     if (file.response) {
       if (file.response.code == 200) {
         this.$message.success('上传成功！')
         this.postForm.image = file.response.data.picUrl
       }
       */

    addPostEnsure() {
      this.$refs.postFormRef.validate(valid => {
        if (valid) {
          this.$refs.upload.submit()

          /*   addPost_(this.postForm).then(res => {
              console.log(res);
              if (res.status == 0) {
                this.dialogFormVisible = false;
                this.$message.success('发布帖子成功！')
                this.$router.go(0)
                this.$refs.postFormRef.resetFields();
                this.file = ''
                this.fileList = []
              }
              this.loading = false
            }, err => { console.log(err); })
   */
        } else {
          this.$message.error('发布失败！')
        }
      })
    },
    addCommentShow(index) {
      this.commentDialogFormVisible = true
      if (!this.commentForm.user_id && !this.commentForm.user_name) {
        this.commentForm.user_id = this.userInfo.user_id + 0
        this.commentForm.user_name = this.userInfo.user_name
      }
      this.commentForm.post_id = index

    },
    addComment() {
      this.$refs.commentFormRef.validate(valid => {
        if (valid) {
          addComment_(this.commentForm).then(res => {
            if (res.status == 0) {
              this.commentDialogFormVisible = false
              this.indexPostId = ''
              this.CommentShow(this.commentForm.post_id)
              this.commentForm.content = ''
              this.commentLoading = false
            }

          }, err => {
            console.log(err);
          })
        }
      })


    },
    addReplyShow(index) {
      this.replyDialogFormVisible = true
      this.replyForm.comment_id = index
      this.replyForm.user_id = this.userInfo.user_id
      this.replyForm.user_name = this.userInfo.user_name
    },
    addReply() {
      this.$refs.replyFormRef.validate(valid => {
        if (valid) {
          addReply_(this.replyForm).then(res => {
            if (res.status == 0) {
              this.replyDialogFormVisible = false
              this.commentData = ''
              getComment_({ post_id: this.indexPostId }).then(res => {
                if (res.status == 0) {
                  this.commentData = res.data
                  this.commentLoading = false
                }
              }, err => {
                console.log(err);
              })
              this.replyForm.content = ''
              this.commentLoading = false
            }

          }, err => {
            console.log(err);
          })
        }
      })

    },
    CommentShow(id) {
      this.commentVisible = true
      if (id == this.indexPostId) { return; }
      this.commentData = ''
      this.indexPostId = id
      this.commentLoading = true

      getComment_({ post_id: id }).then(res => {
        if (res.status == 0) {
          this.commentData = res.data
          this.commentLoading = false
        }
      }, err => {
        console.log(err);
      })
    },
    deletePost(id) {
      this.$confirm('此操作将永久删除该帖子, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.loading = true
        deletePost_({ post_id: id }).then(res => {
          if (res.status == 0) {
            this.$message.success('删除帖子成功！')
            this.$router.go(0)
          } else {
            this.$message.error('删除帖子失败！')
          }
        }, err => {
          console.log(err);
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    searchClick() {
      if (this.search.trim() !== '') {
        this.this_postsData = this.$props.postsData
        this.this_postsData = this.this_postsData.filter(data => data.title.toLowerCase().includes(this.search.toLowerCase()))
        this.search = ''
      } else {
        return;
      }
    },
    goBack() {
      this.$router.go(0)
    },
  }
}

</script>

<style>
.postImage{
  border: 1px solid grey;
  border-radius: 5px;
}
.titleBtn {
  position: absolute;
  top: 80px;
  right: 70px;
}

.postCard {
  margin-bottom: 20px;
  margin-right: 10px;
}

.active {
  color: #409EFF !important;
}

.reply>span:nth-child(2) {
  padding: 0px 30px 0px 30px;
  margin-right: 10px;
  cursor: pointer;
  font-weight: 700;
  color: #409EFF;
}

.reply>span:nth-child(2):hover {
  color: #fff;
  background-color: #409EFF;
  transition: all .3s linear;
}

.reply>span {
  float: right;
  font-size: 14px;
}


.replyMain {
  width: 75%;
  margin-top: 20px;
  margin-left: 50px;
}

.nameSpan {
  color: #E6A23C;
}
</style>