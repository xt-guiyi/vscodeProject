<template>
  <div class="bank-write-material">
    <van-icon name="arrow-left" @click="back" />
    <table-change :titleSouce="titleInfoOne" class="tableBar">
        <table-pane :activeKey="1">
          <div class="info-content">
            <div class="info-write">
              <div class="info-item">
                <label for="store-name">本地玩商户识别号：</label>
                <input type="number"  id="store-name"  placeholder="输入商户识别号" v-model.number="bankBusinessmanInfo.distinguishId">
              </div>
              <div class="info-item">
                <label for="store-phone">商户名称：</label>
                <input type="text"  id="store-phone" placeholder="输入商户名称" v-model.trim="bankBusinessmanInfo.merchantName">
              </div>
              <div class="info-item">
                <label for="store-phone">店铺编号：</label>
                <input type="number"  id="store-phone" placeholder="输入店铺编号" v-model.number="bankBusinessmanInfo.shopId">
              </div>
              <div class="info-item">
                <label for="store-phone">商户编号：</label>
                <input type="number"  id="store-phone" placeholder="输入商户编号" v-model.number="bankBusinessmanInfo.merchantId">
              </div>
            </div>
            <div class="footer" @click="confirm">
              <van-button  color="#02A7F0" block>提交</van-button>
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
                  <div>本地玩商户识别号：{{item.distinguishId}}</div>
                  <div>商户名称：{{item.in_merchant_name}}</div>
                  <div>店铺编号：{{item.in_shop_id}}</div>
                  <div>商户编号：{{item.in_merchant_id}}</div>
                </div>
              </van-list>
            </van-pull-refresh>
          </div>
        </table-pane>
    </table-change>
  </div>
</template>

<script>
import TableChange from '@/components/table/TableChange'
import TablePane from '@/components/table/TablePane'
import { setBankMerchantInformation, getList } from '@/api/request.js'
export default {
  name: 'BankWriteMaterial',
  components: {
    TableChange,
    TablePane
  },
  data() {
    return { 
      titleInfoOne: [
        { title: '资料录入' },
        { title: '已提交' },
      ],
      bankBusinessmanInfo: {
        distinguishId: null,
        merchantName: '',
        shopId: null,
        merchantId: null
      },
      loading: false,
      finished: false,
      error: false,
      refreshing: false,
      listData: [],
      page: 1,
      // 假数据
    }
  },
  methods: {
    async back(){
      // 是否填写内容
        // 有
        if(
            this.bankBusinessmanInfo.distinguishId ||
            this.bankBusinessmanInfo.merchantName ||
            this.bankBusinessmanInfo.shopId ||
            this.bankBusinessmanInfo.merchantId 
          ) {
            try {
              let confirm = await this.$dialog.confirm({
                message: '是否返回？所填内容将不会保存。',
              })
              if (confirm === 'confirm') {
                  this.$router.push({ name: 'Home'})
              }
            } catch (error) {
              return
            }
          }else {
            this.$router.push({ name: 'Home'})
          }
    },

    onRefresh() {
       // 清空列表数据
      this.finished = false;
      this.listData = []
      // 重新加载数据
      this.page = 1
      this.onLoad()
      this.refreshing = false
    },

    async confirm(){
      // 校验
      if(
        this.bankBusinessmanInfo &&
        this.bankBusinessmanInfo.distinguishId &&
        this.bankBusinessmanInfo.merchantName &&
        this.bankBusinessmanInfo.shopId &&
        this.bankBusinessmanInfo.merchantId
      ) {
        // 提交
        try {
          let confirm = await this.$dialog.confirm({
            message: '提交后将不可修改,确认提交？',
          })
          if(confirm === 'confirm') {
            this.$toast.loading({
              message: '提交中...',
              forbidClick: true,
            })
            let result = await setBankMerchantInformation(this.bankBusinessmanInfo)
            if(result.data.code === 0){
              this.$toast({ type: 'success', message: '提交成功'})
              this.bankBusinessmanInfo.distinguishId = null
              this.bankBusinessmanInfo.merchantName = ''
              this.bankBusinessmanInfo.shopId = null
              this.bankBusinessmanInfo.merchantId = null
            }else {
              this.$notify({ type: 'danger', message: '提交信息有误'});
            }
          }
        } catch (error) {
          return
        }
      }else {
        this.$notify({ type: 'warning', message: '请输入完整信息'})
      }
    },


    async onLoad() {
      let result = await getList({type: 1, page: this.page})
      if(result.data.code === 0) {
        // 判断数据到底
      if(this.page > result.data.data.totalPages){
              this.finished = true
              return
      }
        // 没到底
        console.log(this.page > result.data.data.totalPages)
        this.listData.push(...result.data.data.data)
            this.page++ 
        this.loading = false
      }else {
        this.error = true
        this.$notify({type: 'danger', message: "获取失败"})
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../assets/scss/mixin.scss';
  .bank-write-material {
    height: 100vh;
    position: relative;
    z-index: 99;
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
        @include pz(absolute, 1.5rem, 1rem);
        z-index: 100;
      }
  }
  .tableBar {
    height: 5rem;
    // position: fixed;
    // top: 0;
    .info-content {
      font-size: 1.6rem;
      height: calc( 100vh - 5rem );
      overflow-y: scroll;
      overflow-x: hidden;
      .info-write {
        .info-item:first-child {
          label {
            flex: 0 0 15rem;
          }
          input {
            flex: auto;
          }
        }
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
            width: 100%;
            flex: auto;
            height: inherit;
            border: none;
            border-bottom: 1px solid #dee5e7;
          }
        }
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
      .footer {
        width: 80vw;
        margin: 0 auto;
        padding-top: 2rem;
        color: white;
      }
    }
  }
  /deep/ .van-pull-refresh {
    min-height: 100%;
  }
</style>