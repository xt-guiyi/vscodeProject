<template>
  <div>
    <h5 class="fz-24 fw-300">成员详情</h5>
    <div class="mt-20">
      <el-button size="small" @click="back">返回</el-button>
      <el-button size="small" @click="editorUser">编辑</el-button>
      <el-button size="small" @click="deleteUserData">删除</el-button>
    </div>
    <div class="group mt-10">
      <div class="core-info">
        <el-image
          style="width: 100px; height: 100px"
          :src="userData.userAvatar"
          class="image"
        >
          <div slot="error" class="image-slot">
            <i class="el-icon-picture-outline"></i>
          </div>
        </el-image>
        <div class="base-info">
          <div class="top">
            <p>{{userData.userName}}</p>
            <i></i>
          </div>
          <p class="bottom">帐号：{{userData.qywxUserId}}</p>
        </div>
      </div>
    </div>
    <xt-divider/>
    <div class="group ">
      <div class="info-item">
        <div>网格ID：</div>
        <div>{{userData.wgUserId}}</div>
      </div>
      <div class="info-item">
        <div>平台ID：</div>
        <div>{{userData.bdwUserId}}</div>
      </div>
      <div class="info-item">
        <div>手机：</div>
        <div>{{userData.userPhone}}</div>
      </div>
    </div>
    <xt-divider/>
    <div class="group ">
      <div class="info-item info-item-departmen">
        <div>部门：</div>
        <div>{{userData.departmenInfo.departmentStr}}</div>
      </div>
      <div class="info-item info-item-wrap">
        <div>标签：</div>
        <div>
          <p v-for="(item,index) in userData.tagInfo.list" :key="index">{{item.tagName}}</p>
        </div>
      </div>
      <div class="info-item ">
        <div>职务：</div>
        <div>{{userData.positionName || '未设置'}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getUser, deleteUser } from '@/api/addressBook'
import { mapMutations } from 'vuex'
export default {
  name: 'userDetail',
  data() {
    return {
      userData: {
        userAvatar: '',
        tagInfo: {
          list: []
        },
        departmenInfo: {}
      }
    }
  },
  created() {
    this.getUser()
  },
  methods: {

    async getUser () {
      const result = await getUser({
        wgUserId: this.$route.query.wgUserId,
      })
      if(result.data.code == '0') {
        this.userData = result.data.data
        this.setAddressUserInfo(this.userData)
      }
    },

    // 删除用户api
    async deleteUser() {
      const result = await deleteUser({
        wgUserId: [this.$route.query.wgUserId],
      })
      if(result.data.code == '0') {
        this.$message.success('删除成功')
        this.setAddressUserInfo({})
        return true
      }else {
        this.$message.error(result.data.msg)
        return false
      }
    },

    back() {
      this.$router.go(-1)
    },

    // 编辑
    editorUser() {
      this.$router.push({ name: 'addMember'})
    },

    // 删除
    deleteUserData() {
      this.$confirm('此操作将删除该成员, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async() => {
          const result = await  this.deleteUser()
          if(result) {
            setTimeout(() => {
              this.$router.push({name: 'oneMain'})
            }, 1000);
          }
        }).catch(error => console.log(error))
    },

    ...mapMutations('addressBook', [
      'setAddressUserInfo'
    ])
  }
}
</script>

<style lang="scss">
  .group {
      padding: 20px 0 20px 0;
  }

  .core-info {
    height: 60px;
    @include fja;
    .image {
      width: 60px!important;
      height: 60px!important;

      .image-slot {
        width: 60px;
        height: 60px;
        display: flex;
        justify-content: center;
        align-items: center
      }
    }
    

    .base-info {
      @include fja(space-around,flex-start);
      flex-direction: column;
      margin-left: 10px;
      height: inherit;

      .top {
        font-size: 18px;
      }

      .bottom {
        font-size: 13px;
        color: #787878;
      }
    }
  }

  .info-item {
    @include fja(flex-start,center);
    margin-top: 10px;
    div:first-child {
      width: 80px;
      color: #787878;
      text-align: right;
      font-size: 14px;
    }
  }

  .info-item-departmen {
    color: skyblue;
  }

  .info-item-wrap {
    align-items: flex-start;
    color: skyblue;
  }
  
</style>