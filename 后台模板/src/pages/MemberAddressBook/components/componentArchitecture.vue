<!--
 * @Description: 
 * @Author: 小熊熊
 * @Date: 2021-04-13 14:52:39
 * @LastEditors: 小熊熊
 * @LastEditTime: 2021-04-19 11:12:53
-->
<template>
  <div>
    <file-tree
      :fileData="fileData"
      :load="loadNode" 
      :lazy="true"
      :moreTop="moreTop"
      @click="clickFileItem"
    />
  </div>
</template>

<script>
import { getDepartmentList, departmentDelete } from '@/api/addressBook' 
import { mapState , mapMutations } from 'vuex'
// import fileTree from './file/fileTree.vue'

export default {
  name: 'componentArchitecture',
  data() {
    return {
      fileData: [],
    }
  },
  computed: {
    ...mapState('addressBook', ['isRefreshDepartment'])
  },
  watch:{
    isRefreshDepartment(newvalue,oldvalue) {
      console.log(newvalue,'我看看')
      if(newvalue) this.firstRequest()
      this.$nextTick(()=> this.setIsRefreshDepartmentList(false))
    },
  },
  created() {
    this.firstRequest()
  },
  methods: {
    async firstRequest() {
      const result = await this.getDepartmentList()

      this.fileData = []
      this.fileData.push(...result)
      this.$forceUpdate()
      console.log(this.fileData,'ai')
    },

    // 懒加载,获取子节点
    async loadNode([node, resolve]) {
      let param = {
      }
      param['departmentId'] = node['departmentId']
      resolve(await this.getDepartmentList(param))
    },

    // 获取部门列表 api
    async getDepartmentList(param) {
      const result = await getDepartmentList(param)
      if(result.data.code == '0') {
        return this.transformData(result.data.data.list)
      }
    },

    // 删除部门 api
    async departmentDelete(item) {
      const result = await departmentDelete({
        departmentId: item.departmentId
      })
      if(result.data.code == '0') {
        this.$message.success('删除成功')
        this.setIsRefreshDepartmentList(true)
      }else {
        this.$message.error(result.data.msg)
      }
    },
    
    // 处理数据
    transformData(value) {
      // value.forEach((item,index) => {
      //     item['isOpen'] = false
      //     // item['isMore'] = false
      //     if(item.children) {
      //       // i++
      //       this.transformData(item.children)
      //     }
      // })
      console.log(value)
        return value
    },

    moreTop([event, data]) {
      const tooltipList = [
        {
          name: '添加子部门',
          func: (item) => this.addChildrenDepartment(item,data)
        },
        {
          name: '修改名称',
          func: (item) => this.changeNameDialog(item,data)
        },
        {
          name: '删除',
          func: (item) => this.deleteDepartment(item,data)
        },
        {
          name: '部门Id：' + data.departmentId ,
          func: (item) => {},
          disable: true
        },
      ]
      // 显示位置 右边， 偏差 下： 35  右：10
      const option = {
        placement: 'right',
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: [35, 10],
            },
          },
        ],
      }
      this.$tooltip(event.target, tooltipList,option)
    },

    // 修改部门名
    changeNameDialog(item,data) {
      this.setDepartmentInfo(data)
      this.setChangeDialog(true)
    },

    // 删除部门
    deleteDepartment(item,data) {
      console.log(11)
      setTimeout(()=> {
        this.$confirm('此操作将删除该部门, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          console.log('删除',item,data)
          if(data.parentId === '0') return  this.$message.error('不允许删除根节点');
          this.departmentDelete(data)

        }).catch(error => console.log(error))
      }, 16)
    },

    addChildrenDepartment() {
      this.setAddChildrenDialog(true)
    },

    clickFileItem(item) {
      console.log(item,1)
      // 切换右侧数据
      this.getOneMainDetail(item)
    },

    // 保存部门信息
    getOneMainDetail(item) {
      console.log(item)
      if(this.$route.name != 'oneMain' ) this.$router.push({ name: 'oneMain'})
      this.setDepartmentInfo(item)
    },



    ...mapMutations('addressBook', [
      'setChangeDialog',
      'setAddChildrenDialog',
      'setDepartmentInfo',
      'setIsRefreshDepartmentList'
    ])

  }
}
</script>

<style lang="scss" scoped>
</style>