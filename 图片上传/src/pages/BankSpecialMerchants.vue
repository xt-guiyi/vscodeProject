<template>
  <div class="bank-write-material">
    <van-icon name="arrow-left" @click="back" />
    <table-change :titleSouce="titleInfoOne" class="tableBar" @change="tableChangeIndex">
        <table-pane :activeKey="1">
          <div class="info-content">
            <div class="toggle-wrap">
              <div class="toggle">
                <input id="toggle-all" class="toggle-all" type="checkbox" v-model="allDone">
                <label for="toggle-all" class="lable-all" v-show="processedListData.length">全选</label>
              </div>
              <div class="select-list">
              <van-pull-refresh v-model="processedRefreshing" @refresh="onRefresh" >
                <van-list
                  v-model="processedLoading"
                  :finished="processedFinished"
                  :error.sync="processedError"
                  finished-text="没有更多了"
                  error-text="请求失败，点击重新加载"
                  @load="processedOnLoad"
                >
                  <div class="handle-list-item" v-for="(item, index) in processedListData" :key="index" >
                    <div class="item-left">
                      <input type="checkbox" v-model="item.completed" >
                    </div>
                    <div class="item-right">
                      <div>录入时间：{{item.create_time}}</div>
                      <div>商户名称：{{item.in_merchant_name}}</div>
                      <div>店铺编号：{{item.in_shop_id}}</div>
                      <div>商户编号：{{item.in_merchant_id}}</div>
                    </div>
                  </div>
                </van-list>
              </van-pull-refresh>
              </div>
              <div class="footer" @click="confirm">
                  <van-button  :color="currentColor" block>配置完成</van-button>
              </div>
            </div>
            
          </div>
        </table-pane>
        <table-pane :activeKey="2">
          <div class="info-content">
            <van-pull-refresh v-model="untreatedRefreshing" @refresh="onRefresh" >
              <van-list
                v-model="untreatedLoading"
                :finished="untreatedFinished"
                finished-text="没有更多了"
                :error.sync="untreatedError"
                error-text="请求失败，点击重新加载"
                @load="untreatedOnLoad"
              >
                <div class="processed-list-item" v-for="(item, index) in untreatedListData" :key="index">
                  <div>录入时间:{{item.create_time}} </div>
                  <div>配置时间:{{item.update_time}} </div>
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
import { setEnterMerchantInfo, getList } from '@/api/request.js'

// table当前项
let currentTableItem = 1
// 按钮颜色
let  configColor = [ '#AAAAAA', '#02A7F0']
export default {
  name: 'BankSpecialMerchants',
  components: {
    TableChange,
    TablePane
  },
  data() {
    return { 
      titleInfoOne: [
        { title: '待处理' },
        { title: '已处理' },
      ],
      processedLoading: false,
      processedError: false,
      processedFinished: false,
      processedPage: 1,
      processedRefreshing: false,
      processedListData: [],
      untreatedLoading: false,
      untreatedFinished: false,
      untreatedError: false,
      untreatedPage: 1,
      untreatedRefreshing: false,
      untreatedListData: [],
    }
  },
  computed: {
    allDone: {
      get() {
        return this.remaining === 0;
      },
      set(value) {
        this.processedListData.forEach(function(item) {
          item.completed = value;
        });
      }
    },
    // 未选中的数组长度
    remaining() {
      return this.processedListData.filter(item => !item.completed).length
    },
    // 已选中数组长度
    isSelect() {
      return this.processedListData.filter(item => item.completed).length
    },
    // 当前按钮颜色
    currentColor() {
      return this.isSelect > 0 ? configColor[1] : configColor[0]
    }
  },
  methods: {
    async back(){
      if(this.isSelect) {
            try {
              let confirm = await this.$dialog.confirm({
                message: '是否返回？所选项将不会保存。',
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

    // table切换更新列表
    tableChangeIndex(index){
      currentTableItem = index
    },

    // 下拉刷新
    onRefresh() {
      if(currentTableItem === 1) {
        this.processedFinished = false
        this.processedListData = []
        this.processedPage = 1
        this.processedOnLoad()
        this.processedRefreshing = false
      }else if (currentTableItem === 2) {
        this.untreatedFinished = false
        this.untreatedListData = []
        this.untreatedPage = 1
        this.untreatedOnLoad()
        this.untreatedRefreshing = false
      }
    },

    // 提交
    async confirm(){
      console.log(this.processedListData)
        // 校验
        if(this.isSelect){
          try {
            let confirm = await this.$dialog.confirm({
              message: '配置后将不可撤回,确认配置？',
            })
            if(confirm === 'confirm') {
               // 处理
              let checkboxList = this.processedListData.filter((item) => item.completed)
              let bi_idList = checkboxList.map((item) => item.bi_id)
              // 请求提交
              this.$toast.loading({
              message: '配置中...',
              forbidClick: true,
            })
            console.log({bi_id: bi_idList})
              let result = await setEnterMerchantInfo({bi_id: bi_idList})
              if(result.data.code === 0) {
              this.$toast({ type: 'success', message: '配置成功'})
                // 重新拿数据
                this.processedPage = 1
                this.processedListData = []
                this.processedOnLoad()
              }else {
                this.$$notify({type: 'danger', message: "配置失败"})
              }
            }
          } catch (error) {
            return
          }
        }else {
          this.$notify({ type: 'warning', message: '请选择处理项'})
          return
        }
        // 校验通过，跳转
        // this.$router.push({name: 'Home'})
    },

    // 拿列表数据
    async processedOnLoad() {
      let result = await getList({ type: 1, page: this.processedPage })
      if(result.data.code === 0) {
        console.log(result,this.processedPage === result.data.data.totalPages)  
        // 判断数据到底
            if(this.processedPage > result.data.data.totalPages){
              this.processedFinished = true
              return
            }
        // 没到底
            result.data.data.data.forEach((item)=>{
              item['completed'] = false
            })
        console.log(result.data.data.data)
        this.processedListData.push(...result.data.data.data )
        this.processedPage++ 
        this.processedLoading = false
      }else {
        this.processedError = true
        this.$notify({type: 'danger', message: "获取失败"})
      }
    },

    // 拿列表数据
    async untreatedOnLoad() {
      let result = await getList({ type: 2, page: this.untreatedPage })
      if(result.data.code === 0) {
        // 判断数据到底
        console.log(result,this.untreatedPage , result.data.data.totalPages)
            if(this.untreatedPage > result.data.data.totalPages){
              this.untreatedFinished = true
              return
            }
        // 没到底
        this.untreatedListData.push(...result.data.data.data)
        this.untreatedPage++ 
        this.untreatedLoading = false
      }else {
          this.untreatedError = true
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
    .info-content {
      font-size: 1.6rem;
      height: calc( 100vh - 5rem );
      overflow-y: scroll;
      overflow-x: hidden;
      .toggle-wrap {
        display: flex;
        flex-direction: column;
        .toggle {
          height: 4rem;
          position: relative;
          .toggle-all {
            display: none;
          }
          .lable-all {
            height: 2rem;
            text-align: left;
            display: inline-block;
            position: absolute;
            top: calc(50% - 1rem);
            left: 1rem;
            color: #02A7F0;;
          }
        }
        
      }
      
      .select-list {
        font-size: 1.6rem;
        height: calc( 100vh - 5rem - 4rem - 6rem );
        overflow-y: scroll;
        overflow-x: hidden;
        .handle-list-item {
          border-bottom: 1px solid silver;
          display: flex;
          padding: 1rem 2rem 1rem 2rem;
          .item-left {
            flex: 0 0 4rem;
            display: flex;
            justify-content: flex-start;
            input {
              height: 1.5rem;
              width: 1.5rem;
              margin-top: 0.6rem;
            }
          
          }
          .item-right {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            div {
              padding: 0.5rem;
            }
          }
        }
      }

      .footer {
        width: 70vw;
        margin: 0 auto;
        padding: 0.8rem 0 0.8rem 0;
        color: white!important;
      }

      .processed-list-item {
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