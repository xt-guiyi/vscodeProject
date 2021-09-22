<template>
  <div class="login" >
    <div class="title">
        <span class="title_text">小宁报事管理后台</span>
      </div>
    <div class="login_box">
      <div class="login_form" @keyup.enter="onLogin">
        <img class="login_logo" src="../../assets/images/logo.png" alt="">
        <el-input class="login_input" v-model="username" placeholder="请输入账号" clearable></el-input>
        <el-input class="login_input" v-model="password" placeholder="请输入密码" show-password></el-input>
        <el-button type="primary" @click="onLogin" :loading="!loginStatus">登录</el-button>
      </div>
      <p class="login_more" @click="changeLoginType">扫码登录</p>
    </div>
  </div>
</template>

<script>
import { login } from '@/api/common';
import { mapState, mapMutations } from 'vuex';
import { gridOssUrl } from '@/config/env.js'

export default {
  data() {
    return {
      username: '',
      password: '',
      loginStatus: true
    }
  },
  created() {
    window.addEventListener('message',(e) => {
      if(e.data.code == 0) {
        if(this.loginStatus) {
          this.loginStatus = false
          this.userLogin(JSON.stringify(e.data))
          this.setToken(e.data.token)
          window.removeEventListener('message',() => {})
          // 模拟关闭事件
          var popup = document.querySelector('.el-message-box__wrapper')
          var event = new Event('click');
          popup.dispatchEvent(event);
          setTimeout(() => {
              this.loginSuccess()
          }, 500);
        }
      }
    },false)
  },
  methods: {
    //扫码登录弹层
    changeLoginType() {
      console.log(1,this.$alert)
      this.$alert(`<iframe width="300" height="410" scrolling="0" src="${gridOssUrl}/wangge/gridAdminLogin/workLogin.html" frameborder="0"></iframe>`,{
        dangerouslyUseHTMLString: true,
        showConfirmButton: false,
        center: true,
        closeOnClickModal: true,
        callback: action => {}
      })
    },
    //登录成功公共方法
    loginSuccess() {
      this.loginStatus = true
      this.$router.push({
        path: '/defaultLayout/home'
      })
      console.log(1122)
      this.$message({
        message: '登录成功!',
        type: 'success'
      });
    },
    //账号密码登录
    async onLogin() {
      if(this.username.length && this.password.length) {
        if(this.loginStatus) {
          this.loginStatus = false
          let params = {
            userName: this.username,
            password: this.password
          }
          const data = await login(params)
          console.log(data)
          if(data.data.code == 0) {
            this.userLogin(JSON.stringify(data.data.data))
            this.setToken(data.data.data.token)
            this.loginSuccess()
          }else {
            this.$message({
              showClose: true,
              message: data.data.msg,
              type: 'error'
            })
            this.loginStatus = true
          }
        }
      }else {
        this.$message({
          message: '账号密码不能为空',
          type: 'warning'
        })
      }
    },
    ...mapMutations('user', [
      'userLogin',
      'setToken'
    ])
  }
}
</script>

<style lang="scss" scoped>
.login {
  width: 100vw;
  height: 100vh;
  background-color: rgba(64,158,255,0.7);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .title {
    text-align: center;
    letter-spacing: 2px;
    margin-bottom: 50px;
    .title_text {
      font-size: 30px;
      font-weight: bold;
      color: #fff;
    }
  }
  .login_box {
    width: 400px;
    // height: 250px;
    border-radius: 20px;
    background: #fff;
    position: relative;
    box-shadow: 0 0 5px rgba(0,0,0,.5);
    .login_code {
      padding: 30px;
      .login_code_list {
        display: flex;
        justify-content: space-around;
        .login_code_item {
          display: flex;
          flex-direction: column;
          align-items: center;
          .login_code_title {
            font-size: 18px;
            font-weight: bold;
            color: #333;
            margin-bottom: 20px;
          }
          .login_code_img {
            width: 200px;
            height: 200px;
            background: #999;
          }
        }
      }
    }
    .login_form {
      width: 100%;
      height: 100%;
      padding: 30px 50px 20px 50px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .login_logo {
        width: 60px;
        height: 60px;
        margin-bottom: 20px;
      }
      .login_input {
        margin-bottom: 30px;
      }
    }
    .login_more {
      position: absolute;
      right: 30px;
      bottom: 30px;
      font-size: 14px;
      color: #333;
      cursor: pointer;
      user-select: none;
    }
  }
}
</style>