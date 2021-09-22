<template>
  <div class="typeManage-container">
      <el-card class="box-card">
      <div class="clearfix mb-20">
        <el-button type="primary" class="fl" @click="goTypeLibrary">类型库管理</el-button>
        <el-button type="primary" icon="el-icon-plus" class="fr" @click="isChildrenDialog=true">添加一级类型</el-button>
      </div>
      
        <el-table
            :data="tableData"
            style="width: 100%"
            row-key="classId"
            border
            :indent="56"
        >
        
            <el-table-column
              property="className"
              label="类型名称"
              width="250"
              align="center"
            >
              <template v-slot:default="scope">
                <div v-if="!scope.row.editorStatus" class="inlineBlock">{{scope.row.className}}</div>
                <el-input 
                  v-else
                  v-model="scope.row.className" 
                  placeholder="请输入内容" 
                  clearable 
                  maxlength="10"
                  size="small"
                  class="inlineBlock"
                  style="width: 120px;"
                ></el-input>
              </template>
            </el-table-column>
            
            <el-table-column
              property="classId"
              label="类型id"
              width="180"
              align="center"
            >
            </el-table-column>

            <el-table-column
              property="createTime"
              label="添加时间"
              width="180"
              align="center"
            >
              <template slot-scope="scope">
                <i class="el-icon-time"></i>
                <span style="margin-left: 10px">{{ scope.row.createTime }}</span>
              </template>
            </el-table-column>

            <el-table-column
              label="可选性"
              align="center"
            >
              <template v-slot:default="scope">
                  {{scope.row.isShow==1 ? '显示' : '隐藏'}}
              </template>
            </el-table-column>

            <el-table-column label="操作" align="center" width="300">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="editorAndSave(scope.$index, scope.row)">{{scope.row.editorStatus ? '保存' : '编辑'}}</el-button>
                <el-button
                  size="mini"
                  type="primary"
                  @click="showAndHide(scope.$index, scope.row)">{{scope.row.isShow==1 ? '设为隐藏' : '设为显示'}}</el-button>
                  <el-button
                  size="mini"
                  type="primary"
                  v-if="scope.row.parentId==0"
                  @click="addTwoChilder(scope.$index, scope.row)">添加二级类型</el-button>
              </template>
            </el-table-column>
          </el-table>
          
        <div class="box_bottom_page mt-20">
            <el-pagination background layout="prev, pager, next" :total="total" @current-change="changePage">
            </el-pagination>
        </div>
          <!-- 添加报事类型对话框 -->
          <el-dialog title="添加报事类型" :visible.sync="isChildrenDialog" @close="closeTwoTypeDialog">
            <el-form :model="twoTypeFrom">
              <el-form-item label="类型名称" label-width="120px">
                <el-input v-model="twoTypeFrom.name" autocomplete="off" placeholder="请输入类型名称"></el-input>
              </el-form-item>
              <el-form-item label="可选性" label-width="120px">
                <el-select v-model="twoTypeFrom.isShow" placeholder="请选择">
                  <el-option label="显示" :value="1"></el-option>
                  <el-option label="隐藏" :value="-1"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="cancelTwoTypeDialog">取 消</el-button>
              <el-button type="primary" @click="confirmTwoTypeDialog">确 定</el-button>
            </div>
          </el-dialog>
      </el-card>
  </div>
</template>

<script>
import fp from 'lodash-fp'
  import { classList,classCreate,classEdit } from '@/api/typeManage'
export default {
  name: 'typeManage',
  data() {
    return {
      // 模拟数据
      tableData: [],
        // 二级类型对话框
        isChildrenDialog: false,
        twoTypeFrom: {
          name: '',
          isShow: '',
          classId:''
        },
        page:1,
        total:0
    }
  },
  created() {
      this.classList()
    },
  methods: {
    // 去类型库管理页面
    goTypeLibrary(){
      this.$router.push({ name: 'typeLibrary'})
    },
    // 报事类型列表
    async classList(){
      const result = await classList({
        page: this.page,
      })
      if(result.data.code == 0) {
      // console.log(result.data.data)
        var obj=result.data.data.parent
        var valArr = Object.keys(obj).map(function(i){return obj[i]})
        let tableData=[];
        valArr.forEach(el=>{
          if(el.sun){
            el.sun.forEach(ele=>{
              ele.editorStatus=false
            })
          }
          el.editorStatus=false
          el.children=el.sun
          tableData.push(el)
        })
        this.tableData=tableData
        this.total=result.data.data.total
        // console.log(this.tableData)
      }
    },
    
			// 分页
			changePage(e) {
				this.page = e
				this.classList()
			},
    /**
     * 编辑和保存状态切换函数
     */
    editorAndSave(index, row) {
      row.editorStatus?this.save(row):this.editorRow(row)
      row.editorStatus=!row.editorStatus
    },

    /**
     * 编辑
     */
    editorRow(row){
      this.tableData.forEach(el=>{
        el.editorStatus=false
        if(el.children){
          el.children.forEach(ele=>{
            ele.editorStatus=false
          })
        }
      })
    },

    /**
     * 保存
     */
    async save(row) {
      const res = await classEdit({
        classId:row.classId,
        update:'name',
        className:row.className
      })
      if(res.data.code==0){
        this.$message({
          message: res.data.msg,
          type: 'success'
        });
      }else{
        this.$message.error(res.data.msg);
      }
      this.classList()
    },

    // 显示与隐藏
    async showAndHide(index, row) {
      if(row.isShow==1){
        row.isShow='-1'
      }else{
        row.isShow='1'
      }
      const res = await classEdit({
        classId:row.classId,
        update:'show',
        show:row.isShow
      })
      if(res.data.code==0){
        this.$message({
          message: res.data.msg,
          type: 'success'
        });
      }else{
        this.$message.error(res.data.msg);
      }
      this.classList()
    },

    // 显示二级对话框
    addTwoChilder(index, row) {
      console.log(index, row)
      this.twoTypeFrom.classId=row.classId
      console.log(this.twoTypeFrom)
      this.isChildrenDialog = true
    },

    // 二级对话框，关闭事件
    closeTwoTypeDialog() {
      fp.forIn((value, key, object) => {
        object[key] = ''
      }, this.twoTypeFrom)
      this.isChildrenDialog = false
    },

    // 二级对话框，取消事件
    cancelTwoTypeDialog() {
      fp.forIn((value, key, object) => {
        object[key] = ''
      }, this.twoTypeFrom)
      this.isChildrenDialog = false
    },

    // 二级对话框，确认事件
    async confirmTwoTypeDialog() {
      const res=await classCreate({
        className:this.twoTypeFrom.name,
        classId:this.twoTypeFrom.classId,
			  isShow:this.twoTypeFrom.isShow
      })
      console.log(res)
      if(res.data.code==0){
        this.$message({
          message: res.data.data.msg,
          type: 'success'
        });
      }else{
        this.$message.error(res.data.msg);
      }
      this.classList()
      fp.forIn((value, key, object) => {
        object[key] = ''
      }, this.twoTypeFrom)
      this.isChildrenDialog = false
    },
  }
}
</script>

<style lang="scss" scoped>
    .box_bottom_page {
      @include fja(center, center);
    }
    /deep/ {
      .is-leaf {
        background: #409eff;
        color: #fff;
      }
    }
  
</style>