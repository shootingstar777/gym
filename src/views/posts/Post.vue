<template>
  <div v-loading="loading" style="overflow:auto;height:550px">
    <post-component :postsData="postsData" v-if="postsData.length!==0"></post-component>
  </div>
</template>

<script>
import { getPosts_ } from '../../network/postApi'
import PostComponent from '../../components/PostComponent.vue'
export default {
  components: { PostComponent },
  data() {
    return {
      loading: false,
      postsData: '',
      userInfo: {
        user_id: '',
        user_name: ''
      }
    }
  },
  created() {
    this.getUserInfo()
    this.getPosts()
  },
  methods: {
    getUserInfo() {
      let userInfo = JSON.parse(sessionStorage.getItem('user'))
      this.userInfo.user_id = userInfo.user_id
      this.userInfo.user_name = userInfo.user_name
    },
    getPosts() {
      this.loading = true
      getPosts_().then(res => {
        console.log(res);
        if (res.status == 0) {
          this.postsData = res.data
          this.loading = false
        }
      }, err => { console.log(err); })
    },

  }
}
</script>

<style>
.addPost {
  margin-bottom: 10px;
}
</style>