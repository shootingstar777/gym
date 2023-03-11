<template>
  <div class="home bg-squares">
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <div class="homeContainer">
      <div class="header">
        <div class="note">校园运动申请系统</div>
        <div class="nav">
          <span class="applyCheck" @click="pageTo('/detail')">申请查看</span>
          <el-dropdown @command="pageTo">
            <span class="el-dropdown-link">
              场地申请
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="/basketball">篮球场地申请</el-dropdown-item>
              <el-dropdown-item command="/badminton">羽毛球场地申请</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span class="post" @click="pageTo('/post')">论坛</span>


        </div>
        <el-dropdown>
          <span class="el-dropdown-link">
            <el-button type="warning" size="medium" round><i class="el-icon-user"></i></el-button><i
              class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <el-button type="error" @click="logout">退出登录</el-button>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="main">
        <div style="margin:20px">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  components: {
  },
  data() {
    return {
      menuItem: [],
      activeIndex: ''
    }
  },
  created() {
    this.menuItem = this.$router.options.routes[2].children.splice(1)

  },
  methods: {
    //退出登录
    logout() {
      window.sessionStorage.removeItem('token');
      window.sessionStorage.removeItem('user');
      this.$router.replace('/login')
    },
    /* 导航跳转页面 */
    pageTo(index) {
      if (this.$router.currentRoute.path != index) {
        this.$router.push(index)
      } else {
        return;
      }
    }
  }
}
</script>
<style scoped>
.userInfo {
  width: 200px;
  background: transparent;
}

.homeContainer {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.header {
  display: flex;
  justify-content: space-around;
  border-bottom: 2px solid #fff;
 align-items: center;
  height: 64px;
}

.main {
  flex: 1;
  z-index: 2;
}

.home {
  height: 100%;
  background: linear-gradient(to left, #9FA8DA, #64B5F6);
}

.note {
  font-weight: 700;
  font-size: 22px;
  font-family: '黑体';
  background-image: -webkit-linear-gradient(#eee, #eff4ff);
  -webkit-background-clip: text;
  color: transparent;
}

.nav span {
  border-left: 3px solid #fff;
  color: #fff;
  padding: 0px 15px;
  cursor: pointer;
  font-weight: 700;
}

.nav span:hover {
  color: #409EFF;
  transition: all 0.3s linear;
}

.nav span:last-child {
  border-right: 3px solid #fff;
}
</style>