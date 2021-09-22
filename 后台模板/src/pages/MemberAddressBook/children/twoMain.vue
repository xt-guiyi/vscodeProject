<template>
  <div class="tags-main-wrap">
    <!-- 头 -->
    <div class="title">
      <h5 class="fz-24 fw-300">{{tagName}}</h5>
    </div>
    <!-- 表格 -->
    <div class="mt-20">
      <!-- <el-button size="small" @click="addDepartmenOrMenber">添加部门/成员</el-button> -->
      <!-- <el-button size="small">批量导入导出</el-button> -->
      <!-- <el-button size="small">移出</el-button> -->
    </div>
    <el-table
      :data="tagsData"
      style="width: 100%"
      class="mt-20"
      border
      :indent="56"
      :stripe="true"
      :cell-style="{cursor: 'pointer'}"
      :header-row-style="{
        fontSize: '16px',
      }"
      @row-click="rowClick"
    >
      <el-table-column
        type="selection"
        width="55"
      >
      </el-table-column>
      <el-table-column
        prop="wgUserId"
        label="网格Id"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="name"
        label="名称"
        align="center"
      >
        <template v-slot:default="scoped">
          <i v-if="scoped.row.type === 'department'" class="el-icon-folder ml-5"></i>
          {{scoped.row.name}}
        </template>
      </el-table-column>
      <el-table-column
        prop="department"
        label="部门"
        align="center"
      >
        <template v-slot:default="scoped">
          {{scoped.row.department}}
        </template>
      </el-table-column>
    </el-table>


    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      class="position-bottom"
       @current-change="changePage"
      >
    </el-pagination>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { getTagDetail } from '@/api/addressBook'

export default {
  name: 'addressMain',
  data() {
    return {
      tagsData: [],
      page: 1,
      total: null,
      tagName: ''
    }
  },
  computed: {
    ...mapState('addressBook',['tagInfo'])
  },
  created() {
    this.getTagDetail()
  },
  watch: {
    tagInfo(newValue, oldValue) {
      this.getTagDetail()
    }
  },
  methods: {
    async getTagDetail() {
      const result = await getTagDetail({
        tagId: this.tagInfo.tagId,
        page: this.page,
        pageSize: 10
      })
      console.log(result.data.data)
      if(result.data.code == '0') {
        this.tagsData = result.data.data.list
        this.tagName = result.data.data.tagName
        this.total = parseInt(result.data.data.total)
      }
    },

    rowClick(row) {
      console.log(row)
      if(row.type == 'department') {
        this.setCurrentTagItem('1')
        this.setDepartmentInfo({departmentName: row.name ,departmentId: row.id})
        return
      }
      this.$router.push({ name: 'userDetail', query: {wgUserId: row['wgUserId']}})

    },


    addDepartmenOrMenber() {
      this.setAddDepartmentOrTagDialog({
        isShow: true,
        defaultTagsInfo: [],
        title: '添加成员部门到标签',
        describe: '已选择的部门或成员'
      })
    },

    // 分页
    changePage(val) {
      console.log(val)
      this.page = val 

      this.getTagDetail()
    },

    ...mapMutations('addressBook', [
      'setTagInfo',
      'setCurrentTagItem',
      'setAddDepartmentOrTagDialog',
      'setDepartmentInfo'
    ])
  }
}
</script>


<style lang="scss" scoped>
  .tags-main-wrap {
    position: relative;
    height: 100%;
  }

  .title {
    @include fja(space-between,center);

    .file-operation {
      flex: 0 0 160px;
      @include fja(space-between,center);
      color: skyblue;
    }
  }

  .position-bottom {
    position: absolute;
    bottom: 0px;
    left: 50%;
    transform: translateX(-50%);
  }
</style>