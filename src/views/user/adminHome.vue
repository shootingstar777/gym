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
        <div class="note">校园运动申请系统——后台管理</div>
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
        <div class="main_left">
          <el-menu :default-active="activePath" class="el-menu-vertical-demo" @select="menuSelect"
            background-color="transparent" text-color="#606266" active-text-color="#E6A23C" router>
            <el-menu-item index="/userManage">
              <i class="el-icon-menu"></i>
              <span slot="title">用户管理</span>
            </el-menu-item>
            <el-submenu index="">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>申请管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/passManage">申请管理</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group>
                <el-menu-item index="/allPass">查看所有申请</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-menu-item index="/postManage">
              <i class="el-icon-setting"></i>
              <span slot="title">论坛管理</span>
            </el-menu-item>
          </el-menu>

        </div>
        <div class="main_right">
          <router-view></router-view>
        </div>
      </div>
    </div>


  </div>
</template>

<script>
export default {
  components: {
  },
  data() {
    return {
      activePath: '',
    }
  },
  mounted() {
  },
  created() {
    this.init()
  },
  methods: {
    /* 刷新 */
    init() {
      if (sessionStorage.getItem('activePath')) {
        this.activePath = sessionStorage.getItem('activePath')
      }
    },
    //退出登录
    logout() {
      window.sessionStorage.removeItem('token');
      window.sessionStorage.removeItem('user');
      this.$router.replace('/login')
    },
    menuSelect(index, path) {
      sessionStorage.setItem('activePath', index)

    }
  }
}
</script>
<style scoped>
.homeContainer {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.header {
  display: flex;
  justify-content: space-around;
  background: linear-gradient(to bottom right, #89c4ff, #9e9eff, #fff);
  align-items: center;
  height: 64px;
}

.main {
  flex: 1;
  display: flex;
  z-index: 2;
}

.home {
  height: 100%;
  background: linear-gradient(to bottom left, #9393ff, #bcddff, #7fbfff);
}

.note {
  color: #fff;
  font-weight: 700;
}

.main_left {
  width: 250px;
  height: 100%;
  background-color: rgba(255, 255, 255, .3);
}

.main_right {
  flex: 1;
  margin: 20px;
}
</style>