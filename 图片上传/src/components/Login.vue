<!--
 * @Description: 
 * @Author: 小熊熊
 * @Date: 2020-12-17 14:01:18
 * @LastEditors: 小熊熊
 * @LastEditTime: 2020-12-22 11:14:44
-->
<template>
        <div class="wrapper" >
            <div class="block" >
              <h2>账号登陆</h2>
              <!-- <form method="POST" name="admin-login" id="admin-login"> -->
              <div id="admin-login">
                <div>
                    <label for="account">账号：</label>
                    <input type="text" id="account" v-model="userinfo.account">
                </div>
                <div>
                    <label for="password">密码：</label>
                    <input type="password" id="password" v-model="userinfo.password">
                </div>
              </div>
              <!-- </form> -->
              <div id="login"><van-button color="#02A7F0" class="btn" @click="login">登陆</van-button></div>
            </div>
        </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      userinfo: {
        account: '',
        password: ''
      },
    }
  },
  methods: {
      login(){
        this.$emit('login', this.userinfo)
      }
  },
}
</script>


<style lang="scss" scoped>
  .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  .block {
    width: 80vw;
    height: 25rem;
    background-color: #fff;
    h2 {
      font-size: 1.6rem;
      margin-top: 2rem;
      font-weight: 400;
      text-align: center;
    }
    #admin-login {
      width: 90%;
      margin: 0 auto;
      div {
          height: 3.4rem;
          line-height: 3.4rem;
          display: flex;
          align-items: center;
          margin: 2rem;
          label {
            flex: 0 0 5rem;
            height: inherit;
            font-size: 1.6rem;
          }
          input {
            flex: auto;
            height: inherit;
            width: 100%;
            font-size: 1.6rem;
          }
      }
    }

    #login {
      width: 90%;
      height: 3.4rem;
      margin: 0 auto;
      padding: 0 2rem 0 7rem;
      display: flex;
      flex-direction: column;
      .btn {
        height: 3.4rem!important;
      }
    }
  }
</style>