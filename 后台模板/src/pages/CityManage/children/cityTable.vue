<template>
  <div class="container">
    <el-card class="box-card">
      <div class="clearfix">
        <div class="fl" >
          <el-input  
            v-model="searchCity" 
            placeholder="城市搜索" 
            label="城市搜索"  
            prefix-icon="el-icon-search"
            size="medium"
            clearable
          >
            <template v-slot:append>
              <el-button  icon="el-icon-search" type="primary" @click="input();czpage()"></el-button>
            </template>
          </el-input>
        </div>
        <el-button type="primary" icon="el-icon-plus" class="fr" @click="addCityDialog">添加新城市</el-button>
      </div>
      <div class="box_center d-flex pt-20 pb-20">
        <div class="box_center_left">
          <span class="box_center_left_text fz-14">共计{{total}}条信息</span>
        </div>
      </div>
      <div class="box_bottom">

        <el-table
          :data="tableData"
          style="width: 100%"
          row-key="typeId"
          border
          :indent="56"
          :stripe="true"
          class="mt-20"
          :header-row-style="{
            fontSize: '16px',
          }"
        >
        <el-table-column
          prop="pdId"
          label="主键ID"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="shortName"
          label="城市名称"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="cityCode"
          label="城市码"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="communityNum"
          label="小区数量"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="serviceStatus"
          label="服务状态"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="operation"
          label="操作"
          align="center"
        >
          <template slot-scope="scope">
            <el-button type="primary"  size="mini" @click="toSystemSeting(scope.row)">系统配置</el-button>
            <el-button type="primary"  size="mini" @click="goNeighbourhome(scope.row)">小区管理</el-button>
          </template>
        </el-table-column>
        </el-table>
        <div class="box_bottom_page mt-20">
          <el-pagination background layout="prev, pager, next" :total="total" @current-change="changePage"
            :current-page='page'>
          </el-pagination>
        </div>
      </div>
      
      <!-- 添加城市对话框 -->
      <el-dialog title="添加新城市"  :visible.sync="isCityDialog" @close="closeCityDialog" center>
        <div class="dialog-select-item">
          <el-select v-model="cityCode" filterable placeholder="请输入关键字" :filter-method="remoteMethod">
            <el-option
              v-for="item in cityOptions"
              :key="item.cityCode"
              :label="item.shortName"
              :value="item.cityCode">
            </el-option>
          </el-select>
          <p class="cityCode">城市码：{{cityCode}}</p>
          <p class="shuoming">说明：激活网格服务功能后,需在系统配置中将入口、层级、网格、人员进行正确设置，方可正式开启服务</p>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancelCityDialog">取 消</el-button>
          <el-button type="primary" @click="confirmCityDialog">确 定</el-button>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
  import fp from 'lodash-fp'
  import { pageList,searchCitys,getCityList,addCity } from '@/api/cityManage'
  export default {
    name: 'cityManage',
    data() {
    return {
      searchCity: '',
      cityCode:'',
      page:1,
      total:0,
      tableData: [],
      // 添加城市对话框
      isCityDialog: false,
      cityOptions: [],
      search:false
    }
  },
    created() {
      this.pageList()
    },
    methods: {
      // 跳转至系统配置
    toSystemSeting(e) {
      // console.log(e)
      this.$router.push({ name: 'SystemSettings',query:e})
    },
    // 跳转至小区管理
    goNeighbourhome(e){
      this.$router.push({ name: 'Community',query:e})
    },

    // 城市列表
    async pageList(evetnt){
      console.log(this.searchCity,11)
      const result = await pageList({
        page: this.page
      })
      // console.log(result)
      if(result.data.code == 0) {
        this.tableData=result.data.data.list
        this.total=result.data.data.total
        this.tableData.forEach(el => {
          if(el.isLock==1){
            el.serviceStatus='开启'
          }else{
            el.serviceStatus='关闭'
          }
        });
      }
    },

    // 城市搜索
    async input(evetnt){
      console.log(this.searchCity,11)
      const result = await searchCitys({
        shortName: this.searchCity
      })
      console.log(result)
      if(result.data.code !== 0) {
        this.$message.error(result.data.msg)
      }else{
        this.search=true
        this.tableData=result.data.data.list
        this.total=result.data.data.total
        this.tableData.forEach(el => {
          if(el.isLock==1){
            el.serviceStatus='开启'
          }else{
            el.serviceStatus='关闭'
          }
        });
      }
      if(!this.searchCity){
        this.search=false
      }
    },
    czpage(){
      this.page=1  
    },

    // 添加城市对话框,打开事件
    addCityDialog(index, row) {
      this.isCityDialog = true
    },

    // 添加城市对话框，关闭事件
    closeCityDialog() {
      this.isCityDialog = false
      this.cityOptions=[]
      this.cityCode=''
      // fp.forIn((value, key, object) => {
      //   object[key] = ''
      // }, this.twoTypeFrom)
    },

     // 添加城市对话框，取消事件
    cancelCityDialog() {
      this.isCityDialog = false
      this.cityOptions=[]
      this.cityCode=''
    },

    // 添加城市对话框，确认事件
    async confirmCityDialog() {
      this.isCityDialog = false
      const res = await addCity({
        cityCode:this.cityCode
      })
      if(res.data.code==0){
        this.$message({
          message: res.data.msg,
          type: 'success'
        });
      this.pageList()
      }else{
        this.$message.error(res.data.msg)
      }
      this.cityOptions=[]
      this.cityCode=''
    },

    // 添加城市，选择城市
    async remoteMethod(query) {
        if (query !== '') {
          this.loading = true;
          const res = await getCityList({
            shortName: query
          })
          if(res.data.code==0){
            this.cityOptions=res.data.data.list
          }
        } else {
          this.cityOptions = [];
        }
    },
      
      // 切换分页
      changePage(e) {
        this.page = e
        if (this.search) {
          this.input()
        } else {
          this.pageList()
        }

      },
      
    }
  }
</script>

<style lang="scss" scoped>
  .jccenter {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .dialog_top {
    display: flex;
    justify-content: center;
  }

  /deep/ {
    .el-tabs__header {
      display: none;
    }
  }

  .box-card {
    .box_top {
      border-bottom: 1px solid #eee;
      @include fja(space-between, center);

      .box_top_list {
        width: 70vw;
        @include fja(space-between, center);

        .box_top_item {
          @include fja(center, center);

          .el-input {
            width: 200px;
          }

          .box_top_item_group {
            @include fja(center, center);
            width: 200px;

          }
        }
      }
    }

    .box_center {
      @include fja(space-between, center);
    }

    .box_bottom {
      .box_bottom_page {
        @include fja(center, center);
      }

      /deep/ {
        .is-leaf {
          background: #409EFF;
          color: #fff;
        }
      }
    }
  }

  .form {
    .form-item-style {
      width: 80%;
    }
  }
  .cityCode{
    margin: 20px 0;
    height: 30px;
    line-height: 30px;
  }
  .shuoming{
    font-size: 12px;
    color: #ccc;
  }
</style>