<template>
  <div class="address-main-wrap">
    <!-- 头 -->
    <div class="title">
      <h5 class="fz-24 fw-300">{{departmentInfo.departmentName}}({{total}}人)</h5>
      <div class="file-operation">
        <span class="pointer" @click="changeNameDialog">修改名称</span>
        |
        <span class="pointer" @click="addChildrenDialog">添加子部门</span>
      </div>
    </div>
    <!-- 表格 -->
    <div class="mt-20">
      <el-button size="small" @click="addMenber">添加成员</el-button>
      <!-- <el-button size="small">设置所在部门</el-button> -->
      <el-button size="small" @click="deltedUserList">删除</el-button>
    </div>
    <el-table
      :data="tableData"
      style="width: 100%"
      class="mt-20"
      border
      :cell-style="{cursor: 'pointer'}"
      :indent="56"
      :stripe="true"
      :header-row-style="{
        fontSize: '16px',
      }"
      @row-click="rowClick"
      @select="select"
      @select-all="selectAll"
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
        prop="bdwUserId"
        label="平台id"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="userName"
        label="姓名"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="positionName"
        label="职务"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="departmenInfo"
        label="部门"
        align="center"
      >
        <template v-slot:default="scoped">
          {{scoped.row.departmenInfo.departmentStr}}
        </template>
      </el-table-column>
      <el-table-column
        prop="userPhone"
        label="手机"
        align="center"
      >
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
import { getDepartmentUserList, deleteUser } from '@/api/addressBook'


export default {
  name: 'addressMain',
  data() {
    return {
      tableData: [],
      page: '1',
      total: null,
      wgUserIdList: [] // 网格用户id数组
    }
  },
  computed: {
    ...mapState('addressBook',['departmentInfo'])
  },
  created() {
    this.getDepartmentUserList()
  },
  watch: {
    departmentInfo(newValue, oldValue) {
      this.getDepartmentUserList()
    }
  },
  methods: {
    // 获取部门成员列表
    async getDepartmentUserList() {
      const result = await getDepartmentUserList({
        departmentId: this.departmentInfo.departmentId,
        page: this.page,
        pageSize: 10
      })
      if(result.data.code == '0') {
        this.tableData = result.data.data.list
        this.total = parseInt(result.data.data.total)
      }
    },

    // 删除用户api
    async deleteUser() {
      const result = await deleteUser({
        wgUserId: this.wgUserIdList,
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

    // 修改部门名
    changeNameDialog(index, row) {
      this.setChangeDialog(true)
    },

    // 添加子部门
    addChildrenDialog() {
      this.setAddChildrenDialog(true)
    },

    // 添加成员
    addMenber() {
      this.$router.push({name: 'addMember'})
    },

    // 删除成员列表
    async deltedUserList() {
      this.$confirm('此操作将删除该成员, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        const result = await this.deleteUser()
        console.log(result,23)
        if(result) {
          this.page = '1'
          this.getDepartmentUserList()
        }
      }).catch(error => console.log(error))
    },

    // 分页
    changePage(val) {
      this.page = val 
      this.getDepartmentUserList()
    },    

    // 点击表单单元格
    rowClick(	row, column, event) {
      console.log(1)
      this.$router.push({ name: 'userDetail', query: {wgUserId: row['wgUserId']}})
    },

    // 点击表单多选框
    select(selection, row) {
      selection.forEach(item => this.wgUserIdList.push(item.wgUserId))
    },

    // 点击表单全选框
    selectAll(selection) {
      selection.forEach(item => this.wgUserIdList.push(item.wgUserId))
    },

    ...mapMutations('addressBook', [
      'setChangeDialog',
      'setAddChildrenDialog',
      'setAddressUserInfo'
    ])
  }
}
</script>


<style lang="scss" scoped>
  .address-main-wrap {
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