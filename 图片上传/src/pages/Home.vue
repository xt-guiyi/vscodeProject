<!--
 * @Description: 
 * @Author: 小熊熊
 * @Date: 2020-12-17 12:29:33
 * @LastEditors: 小熊熊
 * @LastEditTime: 2020-12-23 17:14:27
-->
<template>
  <div class="home">
    <div class="button-container" @click="showPopup">
      <van-button data-login="代理录入商户资料"  color="#70B603">代理录入商户资料</van-button>
      <van-button data-login="农行录入商户信息" plain  color="#F59A23">农行录入商户信息</van-button>
      <van-button data-login="农行配置特约商户号" plain  color="#F59A23">农行配置特约商户号</van-button>
    </div>
    <div class="footer" @click="()=> showLargeImg = true">
      <p>下载方片拓展码</p> 
    </div>
    <van-popup  v-model="showLogin" :overlay-style="{height: 'inherit',}">
      <login  @login="login"/>  
    </van-popup >
    <van-popup  v-model="showLargeImg" get-container="#app">
      <div class="image-wrap">
        <img src="https://img.fphdcdn.com/store-photo/1608382566837o65q1yqcy.png">   
      </div> 
    </van-popup >
  </div>
</template>

<script>
import Login from '@/components/Login.vue' 
import { login } from '@/api/request.js'
export default {
  name: 'Home',
  components: {
    Login
  },
  data() {
    return {
      showLogin: false,
      showLargeImg: false,
      loginMethod: new Map([
        ['代理录入商户资料' , '1'],
        ['农行录入商户信息' , '2'],
        ['农行配置特约商户号' , '3'],
      ]),
      loginChannel: '',
      userId: ''
    }
  },
  mounted() {
      // this.weChatShare()
  },
  methods: {
    weChatShare() {
      console.log(FPHDSdk,window.location.host)
      setTimeout(() => {
        console.log(wx)
        const shareData = {
          title: '方片农行进件工具',
          desc: '欢迎使用农行进件对接工具',
          link: 'https://' + window.location.host + '/fpagbank/index.html?channelId=1045#/',
          imgUrl: 'https://img.fphdcdn.com/hall/small/sharePosterGoodsDetailBdwImg.png',
        }
        // alert(FPHDSdk.getBrowserType())
        // FPHDSdk.setWeixinJsConfig();
        FPHDSdk.setShareInfo(shareData)
        wx.error(function(res){
          alert(res.errMsg)
          console.log(res)
            // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
        });
      }, 1000);
    },
    showPopup(e) {
      if(e.target.dataset.login && this.loginMethod.has(e.target.dataset.login)) {
        let startTime = localStorage.getItem('startTime')
        let endTime = Date.now();
        this.loginChannel = this.loginMethod.get(e.target.dataset.login)
        // 一天内不用重新登录  24 * 60 *60 * 1000
        // 判断是否登录过
        if(sessionStorage.getItem(`userInfo_${this.loginChannel}`) && startTime && endTime - startTime < 24 * 60 * 60 * 1000) {
          if(this.loginChannel === '1') {
              this.$router.push({name: 'LocalPlayWriteMaterial'})
            }else if(this.loginChannel === '2') {
              this.$router.push({name: 'BankWriteMaterial'})
            }else if(this.loginChannel === '3') {
              this.$router.push({name: 'BankSpecialMerchants'})
            }
        }else {
          this.showLogin = true
        }
      }
    },

    async login(userinfo){
        let params = {
          type: this.loginChannel,
          userName: userinfo.account,
          password: userinfo.password
        }
        // 登录
        let result = await login(params)
        // console.log(result)
        //跳转不同页面
        if(result.data.code === 0){
          // 计时
          localStorage.setItem('startTime',  Date.now())
          // 存登录id
          sessionStorage.setItem(`userInfo_${this.loginChannel}`, JSON.stringify({ userId: result.data.data.userId , authorityType: this.loginChannel}))
          if(this.loginChannel === '1') {
            this.$router.push({name: 'LocalPlayWriteMaterial'})
          }else if(this.loginChannel === '2') {
            this.$router.push({name: 'BankWriteMaterial'})
          }else if(this.loginChannel === '3') {
            this.$router.push({name: 'BankSpecialMerchants'})
          }
          this.$notify({ type: 'success', message: '登录成功'})
        }else {
          this.$notify('用户名或密码错误');
        }
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  height: inherit;
}
.button-container {
  height: 20rem;
  width: 70vw;
  position: absolute;
  top: 4rem;
  left: calc( 50% - 35vw);
  font-size: 1.3rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

}

.footer {
  width: 50vw;
  font-size: 1.6rem;
  color: #02A7F0;
  position: absolute;
  bottom: 4rem;
  left: calc( 50% - 25vw );
  text-align: center;
}

.image-wrap {
  height: 50vh;
  width: 80vw;
  img {
    width: inherit;
    height: inherit;
  }
}

/deep/ .van-popup {
  position: absolute;
}
</style>
