<template>
  <div style="overflow:auto;height:550px" v-loading="loading">
    <post-component :postsData="postsData" v-if="postsData.length!==0"></post-component>
  </div>

</template>

<script>
import PostComponent from '../../components/PostComponent.vue'
import { getPosts_ } from '../../network/postApi'
export default {
  components: { PostComponent },
  data() {
    return {
      loading:false,
      postsData: [],
      userInfo: {
        user_id: '',
        user_name: ''
      }
    }
  },
  created() {
    this.getUserInfo()
    this.getPosts(this.userInfo.user_id)
  },
  methods: {
    getUserInfo() {
      let userInfo = JSON.parse(sessionStorage.getItem('user'))
      this.userInfo.user_id = userInfo.user_id
      this.userInfo.user_name = userInfo.user_name
    },
    getPosts(user_id) {
      this.loading = true
      getPosts_({ user_id: user_id }).then(res => {
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

</style>