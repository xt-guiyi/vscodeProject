<template>
  <div class="max-height">
    <el-card class="inherit-height">
      <el-container class="container">
        <el-aside class="aside">
          <div class="aside-top">
            <!-- 搜索 -->
            <div class="aside-search">
              <el-input
                placeholder="搜索部门、成员、标签"
                prefix-icon="el-icon-search"
                v-model="searchValue"
                size="small"
              >
              </el-input>
              <div class="i-plus">
                <i class="el-icon-plus pointer" @click="plus"></i>
              </div>
            </div>
            <!-- 组织架构，部门，切换 -->
            <div class="aside-change">
              <el-radio-group v-model="tagItem" class="radio-group" size="small">
                <el-radio-button   label="1">组织架构</el-radio-button>
                <el-radio-button label="2">标签</el-radio-button>
              </el-radio-group>
            </div>
          </div>
          <div class="aside-content">
            <keep-alive>
              <component :is="componentName"></component>
            </keep-alive>
          </div>
        </el-aside>
        <el-main class="main">
          <router-view/>
        </el-main>
      </el-container>
    </el-card>
    <!-- 下面都是Dialog -->
    <!-- 修改名称 -->
    <el-dialog width="30%" title="修改名称"  :visible="changeDialog" @close="closeDialog" center>
      <div>
          <span class="fz-12 mb-10 block">部门名称：</span>
          <el-input
            placeholder="请输入内容"
            v-model="departmentName"
            size="small"
            clearable>
          </el-input>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="cancelDialog">取 消</el-button>
        <el-button size="small" type="primary" @click="confirmChangeNameDialog">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 添加子部门 -->
    <el-dialog width="30%" title="新建部门"  :visible="addChildrenDialog" @close="closeDialog" center>
      <div>
          <span class="fz-12 mb-10 block">部门名称：</span>
          <el-input
            placeholder="请输入内容"
            v-model="childrenDepartmentName"
            size="small"
            clearable>
          </el-input>
          <!-- 是否同步 -->
          <span class="fz-12 mt-10 mb-10 block">同步到企业微信：</span>
          <el-radio-group v-model="syncDepartment">
            <el-radio :label="1">同步</el-radio>
            <el-radio :label="0">不同步</el-radio>
          </el-radio-group>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="cancelDialog">取 消</el-button>
        <el-button size="small" type="primary" @click="confirmAddChildrenDialog">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 添加标签 -->
    <el-dialog width="30%" title="新建标签"  :visible="addTagDialog" @close="closeDialog" center>
      <div>
          <span class="fz-12 mb-10 block">标签名称：</span>
          <el-input
            placeholder="请输入内容"
            v-model="tagName"
            size="small"
            clearable>
          </el-input>
          <!-- 是否同步 -->
          <span class="fz-12 mt-10 mb-10 block">同步到企业微信：</span>
          <el-radio-group v-model="syncTag">
            <el-radio :label="1">同步</el-radio>
            <el-radio :label="0">不同步</el-radio>
          </el-radio-group>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="cancelDialog">取 消</el-button>
        <el-button size="small" type="primary" @click="confirmAddTagDialog">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 添加部门 -->
    <el-dialog width="40%"  :title="addDepartmentOrTagDialog.title"  :visible="addDepartmentOrTagDialog.isShow" @close="closeDialog" center>
      <div>
        <add-department v-if="addDepartmentOrTagDialog.isShow"/>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="cancelDialog">取 消</el-button>
        <el-button size="small" type="primary" @click="confirmAddDepartmentDialog">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import componentArchitecture from './components/componentArchitecture.vue'
import Tags from './components/tags.vue'
import { mapState, mapMutations } from 'vuex';
import { addTagCreate, departmentCreate, departmentEdit } from '@/api/addressBook'
import AddDepartment from './components/addDepartment.vue';

export default {
  name: 'changePassword',
  components: { componentArchitecture, Tags, AddDepartment},
  data(){
    return {
      searchValue: '',
      tabValue: '2',
      componentName: '',
      departmentName: '',
      childrenDepartmentName: '',
      tagName: '',
      syncTag: 0,
      syncDepartment: 0
    }
  },
  computed: {
    tagItem: {
      get () {
        return this.currentTagItem
      },
      set (value) {
        this.setCurrentTagItem(value)
      }
    },
    ...mapState('addressBook', [
      'currentTagItem', 
      'changeDialog', 
      'addChildrenDialog', 
      'addTagDialog',
      'addDepartmentOrTagDialog',
      'departmentInfo'
    ])
  },
  created() {
    this.componentName = this.currentTagItem == '1' ? 'componentArchitecture' : 'tags'
  },
  watch:{
    currentTagItem(newvalue,oldvalue) {
      console.log('微信')
      if(newvalue == '1') {
        this.componentName = 'componentArchitecture',
        this.$router.push({name: 'oneMain'})
      }else {
        this.componentName = 'tags',
        this.$router.push({name: 'twoMain'})
      }
    }
  },
  methods: {
    //  关闭对话框
    closeDialog() {
      this.departmentName = '',
      this.childrenDepartmentName =  ''
      this.tagName = ''
      this.cancelDialog()
    },

    // 取消对话框
    cancelDialog() {
      console.log(111,this.addDepartmentOrTagDialog)
      this.setChangeDialog(false)
      this.setAddChildrenDialog(false)
      this.setAddTagDialog(false)
      this.setAddDepartmentOrTagDialog({
        isShow: false
      })
      console.log(this.addDepartmentOrTagDialog)
    },

    // 修改部门名 确定按钮
    async confirmChangeNameDialog() {
      await this.departmentEdit()
      this.setChangeDialog(false)
    },

    // 创建子部门 确定按钮
    async confirmAddChildrenDialog() {
      await this.departmentCreate()
      this.setAddChildrenDialog(false)
    },

    // 创建标签 确定按钮
    async confirmAddTagDialog() {
      await this.addTagCreate()
      this.setAddTagDialog(false)
    },
    

    // 创建部门 确定按钮
    confirmAddDepartmentDialog() {
      this.setAddDepartmentOrTagDialog({
        isShow: false
      })
    },

    plus() {
      if(this.currentTagItem == '2') {
        console.log(1)
        this.setAddTagDialog(true)
      }
    },

    // 创建标签 api
    async addTagCreate() {
      const reuslt = await addTagCreate({
        tagName: this.tagName,
        sync: this.syncTag
      })
      if(reuslt.data.code == '0') {
        this.$message({
          message: '添加标签成功',
          type: 'success'
        })
        this.setIsRefreshTagList(true)
      }else {
        this.$message({
          message: '添加标签失败',
          type: 'error'
        })
      }
    }, 

    // 创建部门 api
    async departmentCreate() {
      const reuslt = await departmentCreate({ 
        parentId: this.departmentInfo.departmentId,
        departmentName: this.childrenDepartmentName,
        sync: this.syncDepartment
      })
      if(reuslt.data.code == '0') {
        this.$message.success('创建部门成功')
        this.setIsRefreshDepartmentList(true)
      }else {
        this.$message.error(reuslt.data.msg)
      }
    },
    
    // 编辑部门名 api
    async departmentEdit() {
      const reuslt = await departmentEdit({
        departmentId: this.departmentInfo.departmentId,
        departmentName: this.departmentName
      })
      if(reuslt.data.code == '0') {
        this.$message.success('修改部门成功')
        this.setIsRefreshDepartmentList(true)
      }else {
        this.$message.error(reuslt.data.msg)
      }
    },

    ...mapMutations('addressBook', [
      'setChangeDialog',
      'setAddChildrenDialog',
      'setCurrentTagItem',
      'setAddTagDialog',
      'setIsRefreshTagList',
      'setIsRefreshDepartmentList',
      'setAddDepartmentOrTagDialog',
    ])
  }
}
</script>

<style lang="scss" scoped>
  .container {
    height: 100%;
  }

  .aside {
    width: 100px;
    background-color: #F9FAFC;
    border-right: 1px dotted #DCE1E6;
    .aside-top {
      height: 100px;

      .aside-search {
          padding: 10px 0 10px 10px;
          @include fja(center, center);

          .i-plus {
            flex: 0 0 40px;
            i {
              display: block;
              width: 20px;
              height: 20px;
              margin: 0 auto;
              color: #AAA;
            }
          }
      }

      .aside-change {
        padding:  0 10px 10px 10px;
        .radio-group {
          width: 100%;
          .el-radio-button {
            width: 50%;
            /deep/ .el-radio-button__inner {
              width: 100%;
            }
          }
        }
      }
    }

    .aside-content {
      height: calc(100% - 100px);
    }
  }

  .main {
  }


  .el-main::-webkit-scrollbar{ 
  //先改变body的滚动条宽度
    width: 5px;
  }
</style>