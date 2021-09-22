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
      <!-- <el-input
          placeholder="搜索部门"
          v-model="departmentName"
          clearable
          size="small"
        >
        </el-input> -->
      <p class="describe">{{ leave !== 2 ? '所有成员' : '所有标签'}}</p>
      <ul class="list" >
        <li
          class="list-item"
          v-for="(item, index) in listData"
          :key="index"
        >
          <a href="#"  @click="add(item)">
            <i class="sign" :class="leave !== 2 ? 'el-icon-user' : 'el-icon-collection-tag'"></i>
            <p v-if="leave!=2">{{item.userName}}</p>
            <p v-else>{{item.tagName}}</p>
            <i v-if="item.isCheck"  class="el-icon-check ml-5 check"></i>
          </a>
        </li>
      </ul>
    </div>
    <div class="right pl-20 ">
      <p class="describe">{{ leave !== 2 ? '添加成员到部门' : '添加标签到部门'}}</p>
      <ul class="filter-list" >
        <li
          class="filter-list-item"
          v-for="(item, index) in filterList"
          :key="index"
        >
          <a href="#">
            <i class="sign" :class="leave !== 2 ? 'el-icon-user' : 'el-icon-collection-tag'"></i>
            <p v-if="leave!=2">{{item.userName}}</p>
            <p v-else>{{item.tagName}}</p>
            <i  @click="deleted(item)"  class="el-icon-close ml-5"></i>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { 
  authorizedUserList,
  getCommunityLevelTag,
  communityLevelTagEdit,
  addUserOneLevel,
  addUserTwoLevel,
  addUserSupervisor
} from '@/api/level'
import { getTagList} from '@/api/addressBook'


export default {
  name: 'addDepartment',
  props: {
    leave: {
      type: Number,
    },
    communityId: {
      type: String
    }
  },
  data() {
    return {
      listData: [],
    }
  },
  computed: {
    filterList() {
      return this.listData.filter(item => item.isCheck === true )
    },
    ...mapState('', [
    ])
  },
  created() {
    this.leave != 2 ? this.authorizedUserList() : this.getTagList()
  },
  methods: {
    // 获取联系人列表 api
    async authorizedUserList() {
      const result = await authorizedUserList({
        communityId: this.communityId
      })
      if(result.data.code === 0) {
        console.log(result.data,11)
        this.listData = this.transformContactsList(result.data.data.list)
      }
    },

    // 获取标签列表 api
    async getTagList() {
      const result = await getTagList()
      console.log(result)
      if(result.data.code == '0') {
        const already = await this.getCommunityLevelTag()
        const oneList = await this.transformContactsList(result.data.data.list)
        this.listData = this.transformTagList(oneList, already)
        
      }
    }, 

    
    // 当前当前层级已存在的标签 api
    async getCommunityLevelTag() {
      const result = await getCommunityLevelTag({
        communityId: this.communityId,
        level: 2
      })
      console.log(result)
      if(result.data.code == '0') {
        return result.data.data.list
      }
    },

    // 添加标签到2级 api
    async communityLevelTagEdit() {
      const result = await communityLevelTagEdit({
        communityId: this.communityId,
        wgUserId: this.filterUserId(),
        level: 2,
        tagIds: this.filterTagId()
      })
      console.log(result)
      if(result.data.code == '0') {
        this.$message.success('添加成功')
        return true
      }else {
        this.$message.error(result.data.msg)
        return false
      }
    },

    // 添加成员到一级
    async addUserOneLevel() {
      const result = await addUserOneLevel({
        communityId: this.communityId,
        wgUserIds: this.filterUserId()
      })
      if(result.data.code == '0') {
        this.$message.success('添加成功')
        return true
      }else {
        this.$message.error(result.data.msg)
        return false
      }
    },

    // 添加成员到三级（人大代表)
    async addUserSupervisor() {
      const result = await addUserSupervisor({
        communityId: this.communityId,
        wgUserIds: this.filterUserId()
      })
      if(result.data.code == '0') {
        this.$message.success('添加成功')
        return true
      }else {
        this.$message.error(result.data.msg)
        return false
      }
    },


    async confirm() {
      let result 
      if(this.leave == 1) {
        result = await this.addUserOneLevel()
      }else if(this.leave == 2) {
        result = await this.communityLevelTagEdit()
      }else if(this.leave == 3) {
        result = await this.addUserSupervisor()
      }
      return result
    },



    transformContactsList(value) {
      value.forEach(item => item.isCheck = false)
      return value
    },

    transformTagList(tagList, aleryTaglist) {
      aleryTaglist.forEach(alertItem => {
        tagList.forEach((tagItem,tagIndex) => {
          if(tagItem.tagId ==  alertItem.tagId ) {
            tagItem['isCheck'] = true;
          }
        })
      })
      console.log(tagList)
      return tagList
    },

    // 当filterList为选中的标签数据时
    filterTagId() {
      return this.filterList.map(item => item.tagId)
    },

    // 当filterList为选中的成员数据时
    filterUserId() {
      console.log(1)
      return this.filterList.map(item => item.wgUserId)
    },

    // 加入
    add(item){
      item.isCheck = !item.isCheck
      console.log(item)
    },

    // 移除
    deleted(item) {
      item.isCheck = !item.isCheck
      console.log(item)
    },

    getFilterList() {
      return this.filterList
    },

    ...mapMutations('user', [
      'userInfo'
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
      max-height: 400px;
      overflow-y: scroll;
      flex: 1;
      border-right: 1px solid silver;
      &::-webkit-scrollbar{ 
        width: 5px;
      }
      .describe {
        height: 30px;
        line-height: 30px;
        font-size: 12px;
        color: #787878;
      }
      .list {
        .list-item {
          height: 30px;
          line-height: 30px;
          a {
            @include fja(flex-start, center);
            padding: 0 10px 0 10px;
            &:hover {
              background-color: rgba($color: #0077ff, $alpha: 0.1);
            }
            p {
              flex: 1;
              margin-left: 5px;
            }
            .check {
              flex: 0 0 20px;
            }
          }
        }
      }
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

      .filter-list {
        .filter-list-item {
          height: 30px;
          line-height: 30px;
          a {
            @include fja(flex-start, center);
            padding: 0 10px 0 10px;
            &:hover {
              background-color: rgba($color: #0077ff, $alpha: 0.1);
            }

            p {
              flex: 1;
              margin-left: 5px;
            }
            .check {
              flex: 0 0 20px;
            }

          }
        }
      }
    }
  }
</style>