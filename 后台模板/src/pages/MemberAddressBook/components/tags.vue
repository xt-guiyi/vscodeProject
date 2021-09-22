<template>
  <div class="tags-wrap">
    <div class="tags-item" >
      <h5>我的标签</h5>
      <tag-list :data="tagsData"/>
    </div>
    <!-- 菜单2 -->
    <ul id="tooltip-tag" class="tooltip" >
      <li><a href="#" @click="changTagName">修改名称</a></li>
      <li><a href="#" @click="deleteTagName">删除</a></li>
    </ul>
    <!-- 修改标签名称对话框 -->
    <el-dialog width="30%" title="修改标签名称"  :visible.sync="changTagNameDialog" @close="closeDialog" center>
      <div>
          <span class="fz-12 mb-10 block">标签名称：</span>
          <el-input
            placeholder="请输入内容"
            v-model="tagName"
            size="small"
            clearable>
          </el-input>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="cancelDialog">取 消</el-button>
        <el-button size="small" type="primary" @click="confirmChangTagNameDialog">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 删除标签对话框 -->
    <el-dialog width="30%" title="删除标签"  :visible.sync="deltedTagNameDialog" @close="closeDialog" center>
      <div class="delete-Dialog-content">
        <i class="el-icon-info i-info-size" style="color: #85d1f6;" ></i>
        <div class="info-text ml-10">
          <p class="fz-14">确认删除标签？</p>
          <p class="fz-12">删除标签不会导致所包含部门或成员从组织架构删除</p>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="cancelDialog">取 消</el-button>
        <el-button size="small" type="primary" @click="confirmdeltedTagNameDialog">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import tagList from './tagList.vue'
import { getTagList, tagEdit, tagDelete} from '@/api/addressBook'
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'tags',
  components: {  tagList },
  data() {
    return {
      tagsData: [],
      changTagNameDialog: false,
      deltedTagNameDialog: false,
      tagName: ''
    }
  },
  created() {
    this.getTagList()
  },
  computed: {
    ...mapState('addressBook', ['isRefreshTagList','currentTagItem','moreTagInfo'])
  },
  watch:{
    isRefreshTagList(newvalue,oldvalue) {
      if(newvalue) this.getTagList()
      this.$nextTick(()=> this.setIsRefreshTagList(false))
    },
  },
  methods: {
    // 获取标签列表api
    async getTagList() {
      const result = await getTagList()
      console.log(result)
      if(result.data.code == '0') {
        this.tagsData = this.transformData(result.data.data.list)
      }
    }, 

    // 处理数据
    transformData(value, layer) {
      value.forEach((item,index) => {
          item['isMore'] = false
      })
      return value
    },

    // 编辑标签api
    async tagEdit() {
      const result = await tagEdit({
        tagId: this.moreTagInfo.tagId,
        tagName: this.tagName,
      })
      if(result.data.code == '0') {
        this.$message({
          message: '编辑成功',
          type: 'success'
        })
        return true
      }else {
        this.$message({
          message: result.data.msg,
          type: 'error'
        })
        return false
      }
    },

    // 删除标签api
    async tagDelete() {
      const result = await tagDelete({
        tagId: this.moreTagInfo.tagId,
        tagName: this.tagName,
      })
      if(result.data.code == '0') {
        this.$message({
          message: '删除成功',
          type: 'success'
        })
        return true
      }else {
        this.$message({
          message: result.data.msg,
          type: 'error'
        })
        return false
      }
    },

    changTagName() {
      this.tagName = this.moreTagInfo.tagName
      this.changTagNameDialog = true
    },

    deleteTagName() {
      this.tagName = this.moreTagInfo.tagName
      this.deltedTagNameDialog = true
    },

    closeDialog() {
      this.tagName = ''
    },

    cancelDialog() {
      this.changTagNameDialog = false
      this.deltedTagNameDialog = false
    },

    async confirmChangTagNameDialog() {
      const result = await this.tagEdit()
      result && this.getTagList()
      this.changTagNameDialog = false
    },

    async confirmdeltedTagNameDialog() {
      const result = await this.tagDelete()
      result && this.getTagList()
      this.deltedTagNameDialog = false
    },

    

    ...mapMutations('addressBook', [
      'setIsRefreshTagList'
    ])
  }
}
</script>

<style lang="scss" scoped>
  .tags-wrap {
    height: 100%;
    padding: 0 20px 0 20px;
    overflow-y: scroll;
  }

  .tags-wrap::-webkit-scrollbar{ 
  //先改变body的滚动条宽度
    width: 5px;
  }


  .tags-item {
    h5 {
      color: #787878;
      padding: 6px 0 6px 0;
    }
  }

  #tooltip-tag {
    display: inline-block;
    background: white;
    border-radius: 2px;
    box-shadow: 0 0 3px 0 #c8c8c8;
    z-index: 1000;
    display: none;
    li {
      display: flex;
      flex-direction: column;
      flex: auto;
      a {
        padding: 5px;
        font-size: 12px;
      }
      a:hover {
        background-color: skyblue;
      }
    }
  }

  .delete-Dialog-content {
    @include fja;

    .i-info-size {
      font-size: 50px;
    }

    .info-text {
      height: 50px;
      @include fja(center, flex-start);
      flex-direction: column;
      p:last-child {
        color: #787878;
      }
    }


  }

  
</style>