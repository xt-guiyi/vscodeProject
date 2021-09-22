<template>
  <div class="home">
    <el-card class="box-card">
      <div class="home-card">
        <div class="welcome fz-20">✔欢迎使用网格化管理后台！</div>
        <div class="platform">
            <div class="platform-text fz-12">平台：</div>
            <el-select @change="changePlatformAppId" class="right-select" v-model="appId" placeholder="请选择您的平台应用" size="mini">
              <el-option
                v-for="item in platformAppList"
                :key="item.value"
                :label="item.platformAppName"
                :value="item.platformAppId">
              </el-option>
            </el-select>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import _ from 'lodash-fp';
import { getPlatformAppList } from '@/api/common'
import { mapState, mapMutations } from 'vuex';


export default {
  name: 'Home',
  data() {
    return {
      appId: '',
      platformAppList: ''
    }
  },
  computed: {
    ...mapState('user', ['platformAppId']),
  },
  created() {
    this.SET_CURRENT_CHILDREN_MENU_NAME(window.location.hash.split("/")[2])
    this.getPlatformAppList()
  },
  methods: {
    changePlatformAppId(value) {
      // console.log(value)
      this.setPlatformAppId(value)
    },

     // 获取平台应用列表
    async getPlatformAppList() {
      const result = await getPlatformAppList()
      // console.log(result)
      if(result.data.code == 0) {
        this.platformAppList = result.data.data
        this.appId = this.platformAppId
      } 
    },

    ...mapMutations('user', [
      'setPlatformAppId'
    ]),
    
    ...mapMutations('permission', [
      'SET_CURRENT_CHILDREN_MENU_NAME',
    ])
  }
}
</script>


<style lang="scss" scoped>
.box-card {
  background-color:skyblue;
  color: white;
}

.home-card {
  display: flex;
  .welcome {
    flex: 1;
  }
  .platform {
    flex: 0 0 250px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

}

</style>
