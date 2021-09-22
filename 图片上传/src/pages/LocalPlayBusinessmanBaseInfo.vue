<template >
  <div class="BusinessmanBaseInfo">
    <div class="header">
      <van-icon name="arrow-left" @click="back" />
      <h5>请填写商户基础信息：</h5>
    </div>
    <div class="write-BusinessmanBaseInfo">
      <div class="info-item">
        <label for="store-name">商户名称：</label>
        <input type="text"  id="store-name" placeholder="输入商户简称" v-model.trim="baseInfo.merchantName">
      </div>
      <div class="info-item">
        <label for="store-phone">商户电话：</label>
        <input type="text"  id="store-phone" maxlength="11" placeholder="输入商户手机号码" v-model="baseInfo.merchantPhone">
      </div>
      <div class="info-item2">
        <label for="store-adress">详细地址：</label>
        <textarea  id="store-adress" maxlength="50" v-model="baseInfo.merchantAddress"></textarea>
        <span> {{ currentWords }} / 50</span>
      </div>
    </div>
    <div class="footer" @click="confirm">
      <van-button  block color="#02A7F0">确认</van-button>
    </div>
  </div>
</template>

<script>
// 手机号正则
let phoneReg = /^[1][3,4,5,7,8,9][0-9]{9}$/;
export default {
  name: 'LocalPlayBusinessmanBaseInfo',
  data() {
    return {
      baseInfo: JSON.parse(sessionStorage.getItem('businessmanBaseInfo')) || {
        merchantName: '',
        merchantPhone: null,
        merchantAddress: ''
      },
    }
  },
  methods: {
      async back(){
        // 是否填写内容
        // 有
        if(
            (
            this.baseInfo.merchantName ||
            this.baseInfo.merchantPhone ||
            this.baseInfo.merchantAddress 
            ) &&
            !sessionStorage.getItem('businessmanBaseInfo')
          ) {
            try {
              let confirm = await this.$dialog.confirm({
                message: '是否返回？所填内容将不会保存。',
              })
              if (confirm === 'confirm') {
                  this.$router.push({name: 'LocalPlayWriteMaterial'})
              }
            } catch (error) {
              return
            }
          }else {
            this.$router.push({name: 'LocalPlayWriteMaterial'})
          }
      },

      confirm(){
        // 是否填写完成
        if(
          this.baseInfo &&
          this.baseInfo.merchantName &&
          this.baseInfo.merchantPhone &&
          this.baseInfo.merchantAddress
        ) {
          // 校验
          console.log(phoneReg.test(this.baseInfo.merchantPhone))
          if(!phoneReg.test(this.baseInfo.merchantPhone)) {
            this.$notify({type: 'warning', message: '请输入正确的手机号'})
            return
          }
          // 校验通过，跳转缓存
          sessionStorage.setItem('businessmanBaseInfo', JSON.stringify(this.baseInfo))
          this.$notify({ type: 'success', message: '填写成功'})
          // 校验通过，跳转
          this.$router.push({name: 'LocalPlayWriteMaterial'})
        }else {
          this.$notify({ type: 'warning', message: '请输入完整信息'})
        }
      }
  },
  computed: {
    currentWords() {
      return this.baseInfo.merchantAddress.length
    } 
  }
}
</script>


<style lang="scss" scoped>
@import '../assets/scss/mixin.scss';
  .BusinessmanBaseInfo {
    height: inherit;
    .header {
      position: relative;
      i {
        width: 2.2rem;
        height: 2.2rem;
        line-height: 2.2rem;
        text-align: center;
        display: inline-block;
        font-size: 1.6rem;
        background: #000;
        opacity: .3;
        color: white;
        border-radius: 100%;
        @include pz(absolute, calc( 50% - 1.1rem ), 1rem);
      }
      h5 {
        width: 90vw;
        font-size: 1.8rem;
        height: 5rem;
        line-height: 5rem;
        margin: 0 auto;
        text-align: left;
        text-indent: 3.4rem;
      } 
    }
    .write-BusinessmanBaseInfo {
        .info-item {
          width: 90vw;
          height: 4rem;
          line-height: 4rem;
          margin: 2rem;
          display: flex;
          border-bottom: 1px solid #dee5e7;
          label {
            flex: 0 0 8rem;
            height: inherit;
            font-size: 1.6rem;
            position: relative;
            margin-right: 1.8rem;
            &::after {
              content: '';
              width: 1rem;
              height: 1rem;
              @include pz(absolute, calc( 50% - 0.5rem));
              @include bis('../assets/img/bixuan.png');
              display: inline-block;
            }
          }
          input {
            flex: auto;
            height: inherit;
            font-size: 1.6rem;
            border: none;
            border-bottom: 1px solid #dee5e7;
          }
        }
        .info-item2 {
          width: 90vw;
          margin: 2rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          position: relative;
          label {
            flex: 0 0 4rem;
            line-height: 4rem;
            width: 8rem;
            font-size: 1.6rem;
            position: relative;
            &::after {
              content: '';
              width: 1rem;
              height: 1rem;
              @include pz(absolute, calc( 50% - 0.5rem));
              @include bis('../assets/img/bixuan.png');
              display: inline-block;
            }
          }
          textarea {
            height: 10rem;
            font-size: 1.6rem;
            border: 1px solid #333333;
          }
          span {
            position: absolute;
            right: 1rem;
            bottom: 0;
            font-size: 1.4rem;
          }
        }
    }
    .footer {
      width: 70vw;
      position: absolute;
      bottom: 4rem;
      left: calc( 50% - 35vw );
    }
  }
</style>