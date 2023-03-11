<template>
  <div class="login_container bg-squares" v-loading="loading">
    <div class="bg-squares">
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
      <li></li>
    </div>


    <div class="login_box">

      <!-- 头像区域 -->
      <div class="avatat_box">
        <img src="../../assets/imgs/photo.jpg" alt="" />
      </div>

      <!-- 登录表单区域 -->
      <el-form ref="loginFormRef" class="login_form" :model="LoginForm" :rules="LoginFormRules" label-width="20%">
        <h3 class="welcome_text">欢迎进入校园运动申请系统</h3>
        <!-- 用户名 -->
        <el-form-item prop="user_name" label="用户名">
          <el-input placeholder="请输入用户名" prefix-icon="el-icon-user" v-model="LoginForm.user_name"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password" label="密码" :error="error.loginPassword">
          <el-input placeholder="请输入用户密码" prefix-icon="el-icon-lock" v-model="LoginForm.password" type="password"
            show-password>
          </el-input>
        </el-form-item>
      </el-form>

      <!-- 按钮区 -->
      <div class="LoginBtns">
        <div class="btnUp">
          <el-button type="primary" round @click="adminLogin">管理员登录</el-button>
          <el-button type="primary" round @click="login">登录</el-button>
        </div>
        <div class="btnDown">
          没有账号？点击进行注册->
          <el-button type="success" @click="dialogFormVisible = true" round>注册</el-button>
        </div>
      </div>
    </div>


    <!-- 注册界面 -->
    <!-- Form -->
    <el-dialog :visible="dialogFormVisible" title="注册" width="60%" :show-close="false">
      <el-form :model="registerForm" status-icon ref="registerFormRef" :rules="registerFormRules">
        <el-row>
          <el-col :span="10">
            <el-form-item label="用户名:" :label-width="formLabelWidth" prop="user_name">
              <el-input v-model="registerForm.user_name" size="mini" prefix-icon="el-icon-user">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="密码:" :label-width="formLabelWidth" prop="password">
              <el-input v-model="registerForm.password" type="password" size="mini" prefix-icon="el-icon-lock"
                show-password>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item label="联系方式:" :label-width="formLabelWidth" prop="telephone">
              <el-input v-model="registerForm.telephone" size="mini" prefix-icon="el-icon-phone">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="性别:" :label-width="formLabelWidth" prop="gender">
              <el-radio-group v-model="registerForm.gender">
                <el-radio label="男">男</el-radio>
                <el-radio label="女">女</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item label="学号:" :label-width="formLabelWidth" prop="sno">
              <el-input v-model="registerForm.sno" size="mini" prefix-icon="el-icon-edit">
              </el-input>
            </el-form-item>

          </el-col>
          <el-col :span="10">
            <el-form-item label="班级:" :label-width="formLabelWidth" prop="user_class">
              <el-input v-model="registerForm.user_class" size="mini" prefix-icon="el-icon-edit">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="10">
            <el-form-item label="学院:" :label-width="formLabelWidth" prop="faculty">
              <el-input v-model="registerForm.faculty" size="mini" prefix-icon="el-icon-edit">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="专业:" :label-width="formLabelWidth" prop="profession">
              <el-input v-model="registerForm.profession" size="mini" prefix-icon="el-icon-edit">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>


        <el-row>
          <el-col :span="10">
            <el-form-item label="邮箱:" :label-width="formLabelWidth" prop="mail">
              <el-input v-model="registerForm.mail" size="mini" prefix-icon="el-icon-message">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="doRegister">注 册 </el-button>
      </div>

    </el-dialog>
    <!--  -->
  </div>
</template>

<script>
import { adminLogin_ } from '../../network/adminApi';
import { login_, register_ } from "../../network/userApi";

export default {
  name: "Login",
  components: {},
  data() {
    return {
      error: {
        loginPassword: ''
      },
      loading: false,
      dialogVisible: false,
      LoginForm: {
        user_name: "",
        password: "",
      },
      registerForm: {
        sno: "",
        user_name: "",
        gender: "",
        user_class: "",
        faculty: "",
        profession: "",
        telephone: "",
        password: "",
        mail: "",
      },
      LoginFormRules: {
        /* 验证用户名是否合法 */
        user_name: [
          {
            required: true,
            message: "请输入登录名",
            trigger: "blur",
          },
          {
            min: 3,
            max:10,
            message: "长度需要3-10个字符",
            trigger: "blur",
          },
        ],
        /* 验证密码是否合法 */
        password: [
          {
            required: true,
            message: "请输入登录密码",
          },
          {
            min: 6,
            max: 15,
            message: "长度需要6-15个字符",
            trigger: "blur",
          },
        ],
      },
      registerFormRules: {
        user_name: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur",
          },
          {
            min: 3,
            max: 10,
            message: '用户名应在3-10位字符'
          }
        ],
        gender: [
          {
            required: true,
            message: "请选择性别",
            trigger: "blur",
          },
        ],
        telephone: [
          {
            required: true,
            message: "请输入电话号码",
            trigger: "blur",
          },
          {
            pattern: /^1\d{10}$/,
            message: '电话号码应是以1开头的11位数字',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: "请输入注册密码",
          },
          {
            min: 6,
            max: 15,
            message: "长度需要6-15个字符",
            trigger: "blur",
          },
        ],
        mail: [
          {
            required: false,
            message: "请输入邮箱",
            trigger: "blur",
          },
        ],
      },
      dialogFormVisible: false,
      formLabelWidth: "40%",
    };
  },
  methods: {
    /* 点击登录按钮，登录 */
    login() {
      this.$refs.loginFormRef.validate(async (valid) => {
        if (valid) {
          this.loading = true,
            login_(this.LoginForm).then(
              (res) => {
                if (res.status == 0) {
                  console.log(res);
                  window.sessionStorage.setItem("token", res.data.token);
                  sessionStorage.setItem('user', JSON.stringify(res.data.user))
                  this.$message.success(res.message);
                  this.$router.replace("/home");
                } else {
                  this.loading = false
                  this.error.loginPassword = '密码错误'
                  return this.$message.error(res.message);
                }
              },
              (err) => {
                console.log(err);

              }
            );

        }
      })
    },
    /* 点击注册按钮 */
    doRegister() {
      this.$refs.registerFormRef.validate(async (valid) => {
        if (valid) {
          register_(this.registerForm).then(
            (res) => {
              if (res.status == 0) {
                sessionStorage.setItem("token", res.data.token);
                sessionStorage.setItem('user', JSON.stringify(res.data.user))
                this.$message.success(res.message);
                this.$router.replace("/home");

              } else {
                this.$message.error(res.message);
              }
            },
            (err) => {
              console.log(err);
            }
          );
        }
      });
    },
    adminLogin() {
      this.$refs.loginFormRef.validate(async (valid) => {
        if (valid) {
          this.loading = true,
            adminLogin_(this.LoginForm).then(
              (res) => {
                if (res.status == 0) {
                  console.log(res);
                  window.sessionStorage.setItem("token", res.data.token);
                  sessionStorage.setItem('user', JSON.stringify(res.data.user))
                  this.$message.success(res.message);
                  this.$router.replace("/adminHome");
                } else {
                  return this.$message.error(res.message);
                }
              },
              (err) => {
                console.log(err);

              }
            );
          this.loading = false
        }
      })
    },
  },
};
</script>

<style scoped>
.el-form-item {
  width: 60%;
  margin-bottom: 30px !important;
  margin: 0 auto;
}

.welcome_text {
  text-align: center;
  font-weight: 700;
  background-image: -webkit-linear-gradient(left, #ffe29f, #ff719b);
  -webkit-background-clip: text;
  color: transparent;
}

.login_container {
  height: 100%;
  /*   background: linear-gradient(to top left, #ffe29f, #ffa99f, #ff719a); */
  background: url('../../assets/imgs/loginImage.jpg');
  background-size: cover;
  overflow: hidden;
}

.login_box {
  width: 600px;
  height: 400px;
  background-color: #fff;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  border-radius: 3px;
  box-shadow: 10px 10px 30px #909399;
  border: 2px solid #909399;
  background-color: rgba(255, 255, 255, .8);

}

.avatat_box {
  height: 130px;
  width: 130px;
  border: 1px solid #909399;
  border-radius: 50%;
  padding: 10px;
  box-shadow: 10px 10px 10px #909399;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  margin-bottom: 30px;

}

.avatat_box img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #fff;
}

.login_form {
  margin-top: 100px;
}


.LoginBtns {
  display: flex;
  flex-direction: column;
}

.btnUp {
  display: flex;
  justify-content: space-around;
  /*  margin-top: 30px;*/
}

.btnDown {
  color: #606266;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin: 30px 30px 0px 0px;
}
</style>
