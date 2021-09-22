<template>
  <div class="WriteMaterial">
    <div class="bank-write-material">
    <van-icon name="arrow-left" @click="back" class="arrow-left"/>
    <table-change :titleSouce="titleInfoOne" class="tableBar">
        <table-pane :activeKey="1">
          <div class="info-content">
            <div class="header">
              <h5>填写商家资料</h5>
            </div>
            <div class="steps">
              <div class="step " >
                <div class="icon"><i class="active-color"></i></div>
                <div class="info-write" @click="toBaseInfo">
                  <div class="default-color">商家基础信息</div>
                  <div class="arrow" :style="isOneEnd ? 'color: #70B603;' : ''" >{{isOneEnd ? writeStatus[1] : writeStatus[0]}}</div>
                </div>
              </div>
              <div class="step" >
                <div class="icon"><i :class="isTwoEnd ? 'active-color' : ''"></i></div>
                <div class="info-write" @click="toImageInfo">
                  <div class="default-color">商家图片信息</div>
                  <div class="arrow" :style="isTwoEnd ? 'color: #70B603;' : ''">{{isTwoEnd ? writeStatus[1] : writeStatus[0]}}</div>
                </div>
              </div>
              <div class="step" >
                <div class="icon"><i :class="isThreeEnd ? 'active-color' : ''"></i></div>
                <div class="info-write" @click="toImageTwoInfo">
                  <div class="default-color">商家协议信息</div>
                  <div class="arrow" :style="isThreeEnd ? 'color: #70B603;' : ''">{{isThreeEnd ? writeStatus[1] : writeStatus[0]}}</div>
                </div>
              </div>
            </div>
            <div class="footer" @click="confirm">
              <van-button  :color="currentColor" block>确认无误，提交</van-button>
            </div>
          </div>
        </table-pane>
        <table-pane :activeKey="2">
          <div class="info-content">
            <van-pull-refresh v-model="refreshing" @refresh="onRefresh" >
              <van-list
                v-model="loading"
                :finished="finished"
                :error.sync="error"
                finished-text="没有更多了"
                error-text="请求失败，点击重新加载"
                @load="onLoad"
              >
                <div class="list-item" v-for="(item, index) in listData" :key="index">
                  <div> {{item.create_time}} </div>
                  <div>商户名称：{{item.bi_merchant_name}}</div>
                  <div>店铺电话：{{item.bi_merchant_phone}}</div>
                  <div>详细地址：{{item.bi_merchant_address}}</div>
                </div>
              </van-list>
            </van-pull-refresh>
          </div>
        </table-pane>
    </table-change>
    </div>
  </div>
</template>


<script>
import { setProxyMerchantInformation, getList } from '@/api/request.js'
import TablePane from '@/components/table/TablePane'
import TableChange from '@/components/table/TableChange'
export default {
  name: 'LocalPlayWriteMaterial',
  data() {
    return {
      configColor: [ '#AAAAAA', '#02A7F0'],
      writeStatus: [ '待填写', '已填写'],
      titleInfoOne: [
        { title: '资料录入' },
        { title: '已提交' },
      ], 
      refreshing: false,
      loading: false,
      finished: false,
      error: false,
      listData: [],
      page: 1,
      businessmanBaseInfo: '',
      businessmanImageInfo: '',
      businessmanTwoImageInfo: '',
      ProxyMerchantInformation: {}
    }
  },
  computed: {
    isOneEnd(){
      return this.businessmanBaseInfo ? true : false
    },
    // 第二项填写完毕
    isTwoEnd(){
      return this.businessmanImageInfo ? true : false
    },
    isThreeEnd() {
      return this.businessmanTwoImageInfo ? true : false
    },
    // 当前按钮颜色
    currentColor() {
      return  this.isOneEnd && this.isTwoEnd && this.isThreeEnd ? this.configColor[1] : this.configColor[0]
    }
  },
  components: {
    TableChange,
    TablePane
  },
  created(){
    this.businessmanBaseInfo = sessionStorage.getItem('businessmanBaseInfo')
    this.businessmanImageInfo = sessionStorage.getItem('businessmanImageInfo')
    this.businessmanTwoImageInfo = sessionStorage.getItem('businessmanTwoImageInfo')
  },
  methods: {
    back(){
      this.$router.push({ name: 'Home'})
    },

    toBaseInfo(){
      this.$router.push({name: 'LocalPlayBusinessmanBaseInfo'})
    },

    toImageInfo(){
      this.$router.push({name: 'LocalPlayBusinessmanImageInfo'})
    },
    toImageTwoInfo() {
      this.$router.push({ name: 'LocalPlayBusinessmanImageTwoInfo'})
    },
    
    // 下拉刷新
    onRefresh() {
       // 清空列表数据
      this.finished = false;
      this.listData = []
      // 重新加载数据
      this.page = 1
      this.onLoad()
      // 将 loading 设置为 true，表示处于加载状态
      // this.loading = true;
      this.refreshing = false
    },

    // 加载数据
    async onLoad() {
      let result = await getList({type: 3,  page: this.page ,userId: JSON.parse(sessionStorage.getItem('userInfo_1')).userId})
      if(result.data.code === 0) {
        // 判断数据到底
        if(this.page > result.data.data.totalPages){
          this.finished = true
          return
        }
        // 没到底
        console.log(result)
        console.log(this.page > result.data.data.totalPages)
        this.listData.push(...result.data.data.data)
        this.page++ 
        this.loading = false
        console.log(this.page)
      }else {
        this.error = true
        this.$notify({type: 'danger', message: "获取失败"})
      }
    },

    // 提交数据
    async confirm(){
      // 校验
      if(this.isOneEnd && this.isTwoEnd && this.isThreeEnd) {
        try {
          let confirm = await this.$dialog.confirm({
            message: '提交后将不可修改,确认提交？',
          })

          if(confirm === 'confirm') {
             // 缓存
             // 第一项信息
            let baseInfo = JSON.parse(sessionStorage.getItem('businessmanBaseInfo'))
             // 第二项信息
            let imagInfo = JSON.parse(sessionStorage.getItem('businessmanImageInfo'))
             // 第三项信息
            let imagTwoInfo = JSON.parse(sessionStorage.getItem('businessmanTwoImageInfo'))
            this.ProxyMerchantInformation = Object.assign(
              this.ProxyMerchantInformation,
              baseInfo, 
              imagInfo, 
              imagTwoInfo,
              { userId: JSON.parse(sessionStorage.getItem('userInfo_1')).userId}
            )

            this.$toast.loading({
              message: '提交中...',
              forbidClick: true,
              duration: '0'
            })
            let result = await setProxyMerchantInformation(this.ProxyMerchantInformation)
            // console.log(this.imagTwoInfo,this.ProxyMerchantInformation,result)
            if(true){
              this.$toast({ type: 'success', message: '提交成功'})
              // 清缓存
              sessionStorage.removeItem('businessmanBaseInfo')
              sessionStorage.removeItem('businessmanImageInfo')
              sessionStorage.removeItem('showImageObj')
              sessionStorage.removeItem('showTwoImageObj')
              sessionStorage.removeItem('businessmanTwoImageInfo')
              this.businessmanBaseInfo = ''
              this.businessmanImageInfo = ''
              this.businessmanTwoImageInfo = ''
              console.log('好慢')
              // 校验通过，跳转首页
              // this.$router.push({name: 'Home'})
            }else {
              this.$toast.fail('提交信息有误')
            }
          }
        } catch (error) {
          return
        }
      }else {
        this.$notify({ type: 'warning', message: '请输入完整信息'})
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/mixin.scss';

  .WriteMaterial {
    height: 100vh;
    background-color: rgba(242, 242, 242, 1);
    position: relative;
    
    .tableBar {
      height:  5rem;

      /deep/ #table-container {
        background-color: white;
      }
    }

    .arrow-left  {
      width: 2.2rem;
      height: 2.2rem;
      line-height: 2.2rem;
      text-align: center;
      font-size: 1.6rem;
      background: #000;
      opacity: .3;
      color: white;
      border-radius: 100%;
      @include pz(absolute, 1.5rem, 1rem);
      z-index: 100;
    }

    .info-content {
      font-size: 1.6rem;
      height: calc( 100vh - 5rem );
      overflow-y: scroll;
      overflow-x: hidden;
      .header {
        height: 5rem;
        position: relative;
        h5 {
          font-size: 1.6rem;
          height: 5rem;
          line-height: 5rem;
          text-align: center;
          background-color: #f2f2f2
        }
      }
      .steps {
        height: 13rem;
        position: relative;
        &::before {
          content: '';
          background-color: #aaaaaa;
          height: 3rem;
          width: 1px;
          position: absolute;
          top: calc( 50% - 1.75rem);
          left: 1.75rem;
        }

        &::after {
          content: '';
          background-color: #aaaaaa;
          height: 3rem;
          width: 1px;
          position: absolute;
          top: calc( 50% + 4rem);
          left: 1.75rem;
        }
        .step:not(:last-child) {
          .info-write {
            border-bottom: 1px solid silver;
          }
        }
        // 就是对不齐，靠。。。。。
        .step:not(:first-child) {
          .icon i {
            margin-right: 0.25rem ;
          }
        }
        .step {
          height: 6rem;
          display: flex;
          background-color: white;
          
          .icon {
            flex: 0 0 4rem;
            display: flex;
            align-items: center;
            justify-content: center;
            i {
              height: 0.7rem;
              width: 0.7rem;
              background-color: #D7D7D7;
              border-radius: 50%;
              display: inline-block;

            }
            .active-color {
              height: 1.6rem;
              width: 1.6rem;
              background-color: #CAF982;
              position: relative;
              &::after {
                content: '';
                height: 0.7rem;
                width: 0.7rem;
                border-radius: 50%;
                background-color: #70B603;
                position: absolute;
                top: calc( 50% - 0.35rem);
                left: calc( 50% - 0.35rem);
              }
            }
          }
          .info-write {
            font-size: 1.4rem;
            flex: auto;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .default-color {
              color: #333333!important;
            }
            .arrow {
              position: relative;
              margin-right: 2.8rem;
              &::after {
                content: '>';
                position: absolute;
                right: -1.8rem;
                top: calc( 50% - 0.8rem );
              }
            }
          }
        }
      }

      .footer {
        width: 70vw;
        position: absolute;
        bottom: 4rem;
        left: calc( 50% - 35vw );
      }
      .list-item{
        height: 15rem;
        display:  flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: space-around;
        border-bottom: 1px solid silver;
        padding: 1rem 2rem 1rem 2rem;
      }
    }
  }

  /deep/ .van-pull-refresh {
    min-height: 100%;
  }
</style>
