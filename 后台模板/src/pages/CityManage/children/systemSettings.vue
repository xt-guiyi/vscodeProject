<template>
  <div class="container">
    <el-card class="box-card">
      <h5>基础配置</h5>
      <div class="jcpz d-flex">
        <div>
          <span>城市名： </span>
          <el-input size="mini" placeholder="请输入内容" v-model="Basics.shortName" disabled
            style="width: 100px;margin-left: 10px;"></el-input>
        </div>
        <div>
          <span>城市码： </span>
          <el-input size="mini" placeholder="请输入内容" v-model="Basics.cityCode" disabled
            style="width: 100px;margin-left: 10px;">
          </el-input>
        </div>
      </div>
      <div class="jcpz d-flex">
        <div>
          <span>服务开关： </span>
          <el-switch v-model="Basics.isLock" active-color="#409EFF"> </el-switch>
          <span style="font-size: 10px;">开启网格化服务需满足以下条件：1.首页入口已开启；2.已创建的小区数量≥1；</span>
        </div>
        <div>
          <span>服务命名： </span>
          <el-input size="mini" placeholder="请输入内容" v-model="Basics.paName" style="width: 100px;margin-left: 10px;">
          </el-input>
        </div>
      </div>
    </el-card>
    <el-card class="box-card">
      <h5>服务配置</h5>
      <div class="jcpz d-flex">
        <div>
          <span>报事开关： </span>
          <el-switch v-model="Service.isOpen" active-color="#409EFF"> </el-switch>
          <span style="font-size: 10px;">需完成命名与图标后开启</span>
        </div>
        <div>
          <span>服务命名： </span>
          <el-input size="mini" placeholder="请输入内容" v-model="Service.wwaName" style="width: 100px;margin-left: 10px;">
          </el-input>
        </div>
        <div>
          <span>图标设置： </span>

          <el-upload class="avatar-uploader" :action="domain" :show-file-list="false" :on-success="handleAvatarSuccess"
            :on-error="handleAvatarError" :before-upload="beforeAvatarUpload" :data="uploadData">
            <img v-if="Service.icon" :src="Service.icon" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <span style="font-size: 10px;">尺寸:50*50</span>
        </div>
      </div>
    </el-card>
    <div class="d-flex j-c a-c mb-20">
      <el-button type="primary" @click='updateCityConfigure'>保存</el-button>
    </div>
    <el-card class="box-card">
      <h5>职能配置 <span>为城市配置层级并分配权限</span></h5>
      <div class="box_center d-flex pt-20 pb-20 j-sb a-c">
        <div class="box_center_left">
          <span class="box_center_left_text fz-14">共计{{ total }}条信息</span>
        </div>
        <div class="box_center_right d-flex">
          <el-button type="primary" @click='isCityDialog=true'>添加新层次</el-button>
        </div>
      </div>
      <div class="box_bottom">
        <el-table :data="Level2" border style="width: 100%" >
          <el-table-column prop="wflId" label="层级主键Id">
          </el-table-column>
          <el-table-column prop="wflLevel" label="层级">
          </el-table-column>
          <el-table-column prop="wflname" label="层级名称"> </el-table-column>
          <el-table-column prop="createTime" label="添加时间">
            <!-- <template slot-scope="scope">
              <el-link type="primary" :underline="false">{{ scope.row.wgNum }}</el-link>
            </template> -->
          </el-table-column>
          <el-table-column prop="updateTime" label="最后修改时间">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="addCityDialog(scope.row)"
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              v-if="scope.row.wflLevel!=1"
              @click="isdeleteLevel(scope.row)"
            ></el-button>
              <!-- <el-link type="primary" :underline="false" @click='addCityDialog(scope.row)'>编辑</el-link>
              <el-link type="primary" :underline="false" @click='addCityDialog(scope.row)'>编辑</el-link> -->
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>

    <!-- 添加新层次 -->
    <el-dialog title="添加新层次" :visible.sync="isCityDialog" @close="closeCityDialog" center>
      <div class="dialog-select-item">
        <div>
          <i class="mr-10" style="color: red;">*</i><span>层级名称：</span>
          <el-input size="mini" placeholder="请输入内容" v-model="wflName" style="width: 100px;margin-left: 10px;">
          </el-input>
        </div>
        <div class="pl-30 ml-15 mt-10 mb-10">
          <span>层级：</span>{{level2}}
        </div>
      </div>
      <div class="dialog-bottom">
        <p>选择权限</p>
        <div>
          <el-checkbox-group v-model="wrrIds">
            <template v-for="el in cities">
              <el-checkbox :label="el.wrrId" style="display: block; padding-top: 10px" :key="el.wrrId">{{el.wrrTitle}}</el-checkbox>
            </template>
          </el-checkbox-group>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelCityDialog">取 消</el-button>
        <el-button type="primary" @click="confirmCityDialog">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑层次 -->
    <el-dialog title="编辑层次" :visible.sync="isCityDialog2" @close="closeCityDialog" center>
      <div class="dialog-select-item">
        <div>
          <i class="mr-10" style="color: red;">*</i><span>层级名称：</span>
          <el-input size="mini" placeholder="请输入内容" v-model="wflName" style="width: 100px;margin-left: 10px;">
          </el-input>
        </div>
        <div class="pl-30 ml-15 mt-10 mb-10">
          <span>层级：</span>{{level3}}
        </div>
      </div>
      <div class="dialog-bottom">
        <p>选择权限</p>
        <div>
          <el-checkbox-group v-model="wrrIds">
            <template v-for="el in cities">
              <el-checkbox :label="el.wrrId" style="display: block; padding-top: 10px" :key="el.wrrId" :disabled="level3==1 && (el.wrrId=='1' || el.wrrId=='2' || el.wrrId=='3')?disabled:false">{{el.wrrTitle}}</el-checkbox>
            </template>
          </el-checkbox-group>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelCityDialog">取 消</el-button>
        <el-button type="primary" @click="confirmCityDialog2">确 定</el-button>
      </div>
    </el-dialog>

      <!-- 删除层级对话框 -->
      <el-dialog
        title="删除层级"
        :visible.sync="isCityDialog3"
        @close="closeCityDialog"
      >
      <p><i class="el-icon-warning-outline" style="color:red"></i>是否删除该层级</p>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancelCityDialog">取 消</el-button>
          <el-button type="primary" @click="deleteLevel"
            >确 定</el-button
          >
        </div>
      </el-dialog>
  </div>
</template>

<script>
  import { getOssJsConfig } from '@/api/common'
  import { channelId } from '@/config/env'
  import { getFileName } from '@/utils/imageUpload'
  import { editCityConfigure, updateCityConfigure, getRoleRoute,addRoleRoute,editRoleRoute,updateRoleRoute,deleteLevel } from '@/api/cityManage'
  export default {
    name: 'systemSettings',
    data() {
      return {
        cityCode: '',
        pdId: 1,
        platformAppId: '',
        fileName: '',
        domain: '',
        uploadData: {},
        total: 0,
        Level: [],
        Level2: [],
        Basics: {},
        Service: {},
        isCityDialog: false,
        isCityDialog2:false,
        isCityDialog3:false,
        wflName: '',
        wrrIds: [],
        cities: [],
        level3:'',
        wflId:''
      }
    },
    computed: {

    },
    created() {
      let res = this.$route.query
      // console.log(this.$route.query)
      this.cityCode = res.cityCode
      this.communityNum = res.communityNum
      this.isLock = res.isLock != 0 ? true : false
      this.pdId = res.pdId
      this.platformAppId = res.platformAppId
      this.shortName = res.shortName

      // 初始化数据
      this.editCityConfigure()
      this.getRoleRoute()
    },
    computed:{
      level2:function(){
        return this.total+1
      },
      disabled:function(){
        if(this.level3==1){
          return true
        }else{
          return false
        }
      }
    },
    methods: {
      // 上传成功
      handleAvatarSuccess(res, file) {
        console.log(this.domain + this.fileName)
        this.Service.icon = this.domain + '/' + this.fileName + '?x-oss-process=image/resize,h_50,w_50'
      },

      // 上传失败
      handleAvatarError(err) {
        this.$message.error('上传失败')
      },

      // 上传前
      async beforeAvatarUpload(file) {
        console.log(file)
        const isLt2M = file.size / 1024 / 1024 < 2
        if (!isLt2M) this.$message.error('上传头像图片大小不能超过 2MB!')
        // 取oss配置
        console.log(12, getOssJsConfig)
        const result = await getOssJsConfig({
          type: 1,
          channelId
        })
        if (result.data.code == '0') {
          const data = result.data.data
          this.fileName = getFileName(file, data.dir)
          this.domain = data.domain
          this.uploadData = {
            key: this.fileName,
            policy: data.policy,
            signature: data.signature,
            OSSAccessKeyId: data.accessid,
            success_action_status: "200"
          }
        }
        return isLt2M;
      },

      // 获取系统配置
      async editCityConfigure() {
        let params = {
          cityCode: this.cityCode,
          pdId: this.pdId,
          platformAppId: this.platformAppId
        }
        const res = await editCityConfigure(params)
        if (res.data.code == 0) {
          this.Basics = res.data.data.list.Basics[0]
          this.Level = res.data.data.list.Level
          this.Level2=[]
          if(this.Level){
            this.Level.forEach(el=>{
              if(!el.isDelete){
                this.Level2.push(el)
              }
            })
          }
          
          this.Service = res.data.data.list.Service[0]
          if(this.total = res.data.data.list.Level){
            this.total = res.data.data.list.Level.length
          }else{
            this.total=0
          }
          this.Basics.isLock = res.data.data.list.Basics[0].isLock == '1' ? true : false
          this.Service.isOpen = res.data.data.list.Service[0].isOpen == '1' ? true : false
        }
      },
      // 更新系统配置
      async updateCityConfigure() {
        let isLock = this.Basics.isLock ? '1' : '0'
        let isOpen = this.Service.isOpen ? '1' : '0'
        let params = {
          platformAppId: this.platformAppId,
          cityCode: this.cityCode,
          pdId: this.pdId,
          isLock,
          paName: this.Basics.paName,
          isOpen,
          wwaName: this.Service.wwaName,
          icon: this.Service.icon
        }
        const res = await updateCityConfigure(params)
        if (res.data.code == 0) {
          this.$message({
            message: res.data.msg,
            type: 'success'
          });
          this.editCityConfigure()
        } else {
          this.$message.error(res.data.msg);
        }
      },

    // 添加城市对话框，关闭事件
      closeCityDialog() {
        this.isCityDialog = false
        this.isCityDialog2 = false
        this.isCityDialog3 = false
        this.level3=''
        this.wrrIds=[]
        this.wflName=''
        this.wflId=''
      },
      // 添加城市对话框，取消事件
      cancelCityDialog() {
        this.isCityDialog = false
        this.isCityDialog2 = false
        this.isCityDialog3 = false
        this.level3=''
        this.wrrIds=[]
        this.wflName=''
        this.wflId=''
      },

      // 添加城市对话框，确认事件
      async confirmCityDialog() {
        const res= await addRoleRoute({
          platformAppId:this.platformAppId,
          wflName:this.wflName,
          level:this.level2,
          wrrIds:this.wrrIds
        })
        if(res.data.code==0){
          this.$message({
            message: res.data.msg,
            type: 'success'
          });
        } else {
          this.$message.error(res.data.msg);
        }
        this.isCityDialog = false
        this.level3=''
        this.wrrIds=[]
        this.wflName=''
        this.wflId=''
        this.editCityConfigure()
      },

      // 获取权限
      async getRoleRoute(){
        const res = await getRoleRoute()
        if(res.data.code==0){
          // console.log(res)
          this.cities=res.data.data.list
        }
      },
      // 编辑权限
      async addCityDialog(e){
        // console.log(e)
        this.level3=e.wflLevel
        this.wflId=e.wflId
        this.wflName=e.wflname
        const res = await editRoleRoute({
          platformAppId:this.platformAppId,
          wflId:this.wflId,
          level:this.level3
        })
        if(res.data.code==0){
          // console.log(res.data.data[0].wrr_ids)
          let wrrIds=res.data.data[0].wrr_ids.split(',')
          this.wrrIds=wrrIds
          this.isCityDialog2 = true
        }
      },
      // 更新城市对话框，确认事件
      async confirmCityDialog2() {
        console.log(this.wrrIds)
        const res= await updateRoleRoute({
          platformAppId:this.platformAppId,
          wflName:this.wflName,
          level:this.level3,
          wrrIds:this.wrrIds,
          wflId:this.wflId
        })
        if(res.data.code==0){
          this.$message({
            message: res.data.msg,
            type: 'success'
          });
        } else {
          this.$message.error(res.data.msg);
        }
        this.isCityDialog2 = false
        this.level3=''
        this.wrrIds=[]
        this.wflName=''
        this.wflId=''
        this.editCityConfigure()
      },
      // 删除层级对话框打开
      isdeleteLevel(e){
        console.log(e.wflId)
        this.isCityDialog3=true
        this.wflId=e.wflId
      },
      // 删除层级，确认事件
      async deleteLevel(){
        const res = await deleteLevel({
          wflId:this.wflId
        })
        if(res.data.code==0){
          this.$message({
            message: res.data.msg,
            type: 'success'
          });
        } else {
          this.$message.error(res.data.msg);
        }
        this.isCityDialog3 = false
        this.wflId=''
        this.editCityConfigure()
      }
    },
  }
</script>

<style lang="scss" scoped>
  .box-card {
    margin-bottom: 10px;

    h5 {
      span {
        font-size: 10px;
        font-weight: 400;
        color: #666;
      }
    }

    .jcpz {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 20px;

      div {
        display: flex;
        align-items: center;
        justify-content: space-between;

        span {
          font-size: 12px;
          margin-left: 20px;
        }
      }
    }

    .box_bottom {
      .box_bottom_page {
        @include fja(center, center);
      }

      /deep/ {
        .is-leaf {
          background: #409eff;
          color: #fff;
        }
      }
    }
  }

  .dialog-bottom{
    p{
      padding: 0 20px;
      height: 30px;
      line-height:30px;
      background-color: #CCC;
    }
    >div{
      padding: 0 20px;
      border-bottom: 1px solid #CCC;
      border-left: 1px solid #CCC;
      border-right: 1px solid #CCC;
      padding-bottom: 10px;
    }
  }
</style>