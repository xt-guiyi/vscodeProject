<!--
 * @Description: 
 * @Author: 小熊熊
 * @Date: 2021-04-17 10:56:32
 * @LastEditors: 小熊熊
 * @LastEditTime: 2021-04-19 10:47:11
-->
<template>
  <div class="add-department-wrap">
    <div class="left  pr-20">
        <el-input
          placeholder="搜索部门"
          v-model="departmentName"
          clearable
          size="small"
        >
        </el-input>
        <file-tree
          :fileData="fileData"
          :load="loadNode" 
          :lazy="true"
          :isShowMore="false"
          :onlyClickArrow="true"
          :isShowSelectStatus="false"
          :isShowCheck="true"
          :checkList="departmentInfoList"
          @click="clickFileItem"
          class="mt-20"
        />
    </div>
    <div class="right pl-20 ">
      <p class="describe">{{ addDepartmentOrTagDialog.describe }}</p>
      <department-or-member-list :data="departmentInfoList" @deleted="deltedListItem" class="mt-20"/>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
// import fileTree from './file/fileTree.vue'

import { getDepartmentList } from '@/api/addressBook' 
import departmentOrMemberList from './departmentOrMemberList.vue';

export default {
  components: {  departmentOrMemberList },
  name: 'addDepartment',
  data() {
    return {
      departmentName: '',
      fileData: [],
      // departmentInfoList: {} // 部门信息列表
    }
  },
  computed: {
    ...mapState('addressBook', [
      'addressUserInfo',
      'addDepartmentOrTagDialog',
      'departmentInfoList'
    ])
  },
  created() {
    this.firstRequest()
    // const result = {};
    // this.addDepartmentOrTagDialog.defaultDepartmentInfo.forEach((item,index) => {
    //   result[item['departmentId']] = item
    // })
    // this.departmentInfoList = result
    // console.log(result,this.departmentInfoList,43)
  },
  methods: {
    async firstRequest() {
      this.fileData = await this.getDepartmentList()
    },

    // 懒加载,获取子节点
    async loadNode([node, resolve]) {
      let param = {}
      param['departmentId'] = node['departmentId']
      resolve(await this.getDepartmentList(param))
    },

    // 请求接口，获取数据
    async getDepartmentList(param = {}) {
      const result = await getDepartmentList(param)
      if(result.data.code == '0') {
        // return this.transformData(result.data.data.list)
        return result.data.data.list
      }
    },

    // 点击文件项
    clickFileItem(item) {
      let list = this.departmentInfoList.map(item => item.departmentId)
      if(list.length && list.includes(item.departmentId))  {
        this.$delete(this.departmentInfoList, list.indexOf(item.departmentId))
      }else {
        this.departmentInfoList.push(item)
      }
    },

    // 删除部门项
    deltedListItem(item) {
      const result = this.departmentInfoList.filter(res => {
        console.log(res.departmentId, item.departmentId)
        return res.departmentId != item.departmentId
      })
      console.log(this.departmentInfoList,item,result)
      this.setDepartmentInfoList(result)
    },

    ...mapMutations('addressBook', [
      'setDepartmentInfoList'
    ])
  }
}
</script>

<style lang="scss">
  @import '@/assets/scss/mixin';
  .add-department-wrap {
    width: 100%;
    min-height: 200px;
    @include fja;
    .left {
      min-height: 200px;
      flex: 1;
      border-right: 1px solid silver;
    }
    .right {
      min-height: 200px;
      height: 100%;
      flex: 1;
      .describe {
        height: 30px;
        line-height: 30px;
        font-size: 12px;
        color: #787878;
      }
    }
  }
</style>