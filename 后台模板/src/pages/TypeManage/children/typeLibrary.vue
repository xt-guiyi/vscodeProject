<template>
  <div class="typeManage-container">
    <!-- 卡片 -->
    <el-card class="box-card">
      <div class="clearfix mb-20 d-flex j-sb a-c">
        <el-select v-model="libraryId" placeholder="请选择" @change="typeList">
          <el-option
            v-for="item in options"
            :key="item.libraryId"
            :label="item.libraryName"
            :value="item.libraryId"
          >
          </el-option>
        </el-select>
        <el-button
          type="primary"
          icon="el-icon-plus"
          @click="isChildrenDialog = true"
          >添加类型库</el-button
        >
        <el-button type="primary" @click="ChildrenDialog3"
          >复制配置</el-button
        >
        <el-button
          type="primary"
          icon="el-icon-plus"
          class="fr"
          @click="isChildrenDialog2 = true"
          >添加一级类型</el-button
        >
      </div>
      <!-- 整个表格 -->
      <el-table
        :data="tableData"
        style="width: 100%"
        row-key="rclcId"
        border
        :indent="56"
      >
        <!-- 表格的第一行 -->
        <el-table-column
          property="rclcName"
          label="类型名称"
          align="center"
        >
          <template v-slot:default="scope">
            <div v-if="!scope.row.editorStatus" class="inlineBlock">
              {{ scope.row.rclcName }}
            </div>
            <el-input
              v-else
              v-model="scope.row.rclcName"
              placeholder="请输入内容"
              clearable
              maxlength="10"
              size="small"
              class="inlineBlock"
              style="width: 120px"
            ></el-input>
          </template>
        </el-table-column>
        <!-- 表格的第二行 -->
        <el-table-column
          property="rclcId"
          label="类型id"
          align="center"
        >
        </el-table-column>
        <!-- 表格的第三行 -->
        <el-table-column
          property="createTime"
          label="添加时间"
          align="center"
        >
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.createTime }}</span>
          </template>
        </el-table-column>
        <!-- 表格的第六行 -->
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="editorAndSave(scope.$index, scope.row)"
              >{{ scope.row.editorStatus ? "保存" : "编辑" }}</el-button
            >
            <el-button
              size="mini"
              type="primary"
              v-if="scope.row.rclcParentid == 0"
              @click="addTwoChilder(scope.$index, scope.row)"
              >添加二级类型</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <div class="box_bottom_page mt-20">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="total"
          @current-change="changePage"
        >
        </el-pagination>
      </div>
      <!-- 添加类型库对话框 -->
      <el-dialog
        title="添加类型库"
        :visible.sync="isChildrenDialog"
        @close="closeTwoTypeDialog"
      >
        <el-form :model="twoTypeFrom">
          <el-form-item label="类型库名称" label-width="120px">
            <el-input
              v-model="twoTypeFrom.name"
              autocomplete="off"
              placeholder="请输入类型库名称"
            ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancelTwoTypeDialog">取 消</el-button>
          <el-button type="primary" @click="classLibraryCreate"
            >确 定</el-button
          >
        </div>
      </el-dialog>
      <!-- 添加类型库类型对话框 -->
      <el-dialog
        title="添加报事类型"
        :visible.sync="isChildrenDialog2"
        @close="closeTwoTypeDialog"
      >
        <el-form :model="twoTypeFrom">
          <el-form-item label="类型名称" label-width="120px">
            <el-input
              v-model="twoTypeFrom.name"
              autocomplete="off"
              placeholder="请输入类型名称"
            ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancelTwoTypeDialog">取 消</el-button>
          <el-button type="primary" @click="classLibraryConfigCreate"
            >确 定</el-button
          >
        </div>
      </el-dialog>
      <!-- 添加类型库类型对话框 -->
      <el-dialog
        title="复制配置"
        :visible.sync="isChildrenDialog3"
        @close="closeTwoTypeDialog"
      >
            <div class="platform-text fz-12 mb-20">
				平台：
				<el-select @change="changePlatformAppId" class="right-select" v-model="appId" placeholder="请选择您的平台应用" size="mini">
				<el-option
					v-for="item in platformAppList"
					:key="item.value"
					:label="item.platformAppName"
					:value="item.platformAppId">
				</el-option>
				</el-select>

			</div>
        <p>
          说明：复制功能可实现直接将当前的类型方案一键复制到平台应用下。注意复制方式为直接覆盖。
        </p>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancelTwoTypeDialog">取 消</el-button>
          <el-button type="primary" @click="copyClassLibrary"
            >确 定</el-button
          >
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import fp from "lodash-fp";
import {
  classLibraryList,
  typeList,
  classLibraryCreate,
  classLibraryConfigCreate,
  classLibraryConfigEdit,
  copyClassLibrary,
} from "@/api/typeManage";
import { getPlatformAppList } from '@/api/common'
export default {
  name: "typeManage",
  data() {
    return {
      // 模拟数据
      tableData: [],
      options: [],
      libraryId: "",
      page: 1,
      total: 0,
      // 二级类型对话框
      isChildrenDialog: false,
      isChildrenDialog2: false,
      isChildrenDialog3: false,
      twoTypeFrom: {
        name: "",
        libraryId: "",
        classId: "",
      },
      appId: '',
      platformAppList: '',
	  platformAppId:''
    };
  },
  created() {
    this.classLibraryList();
  },
  methods: {
    // 报事类型库列表
    async classLibraryList() {
      const res = await classLibraryList();
      console.log(res);
      if (res.data.code == 0) {
        this.options = res.data.data;
        if (!this.libraryId) {
          this.libraryId = this.options[0].libraryId;
          this.typeList();
        }
      }
    },
    // 类型库类型类型列表
    async typeList() {
      const res = await typeList({
        rclId: this.libraryId,
        page: this.page,
      });
      // console.log(res)
      if (res.data.code == 0) {
        var obj = res.data.data.parent;
        var valArr = Object.keys(obj).map(function (i) {
          return obj[i];
        });
        let tableData = [];
        valArr.forEach((el) => {
          if (el.sun) {
            el.sun.forEach((ele) => {
              ele.editorStatus = false;
            });
          }
          el[0].editorStatus = false;
          el[0].children = el.sun;
          tableData.push(el[0]);
        });
        this.tableData = tableData;
        this.total = res.data.data.total;
      }
    },
    // 创建类型库
    async classLibraryCreate() {
      const res = await classLibraryCreate({
        libraryName: this.twoTypeFrom.name,
      });
      if (res.data.code == 0) {
        this.$message({
          message: res.data.data.msg,
          type: "success",
        });
        this.classLibraryList();
      } else {
        this.$message.error(res.data.msg);
      }
      fp.forIn((value, key, object) => {
        object[key] = "";
      }, this.twoTypeFrom);
      this.isChildrenDialog = false;
    },

     // 获取平台应用列表
    async getPlatformAppList() {
      const result = await getPlatformAppList()
      console.log(result)
      if(result.data.code == 0) {
        this.platformAppList = result.data.data
        this.appId = this.platformAppId
      } 
    },
    changePlatformAppId(value) {
      console.log(value)
    },

    // 分页
    changePage(e) {
      this.page = e;
      this.typeList();
    },
    /**
     * 编辑和保存状态切换函数
     */
    editorAndSave(index, row) {
      console.log(row);
      row.editorStatus ? this.save(row) : this.editorRow(row);
      row.editorStatus = !row.editorStatus;
    },

    /**
     * 编辑
     */
    editorRow(row) {
      this.tableData.forEach((el) => {
        el.editorStatus = false;
        if (el.children) {
          el.children.forEach((ele) => {
            ele.editorStatus = false;
          });
        }
      });
    },

    /**
     * 保存
     */
    async save(row) {
      const res = await classLibraryConfigEdit({
        libraryId: row.libraryNd,
        classId: row.rclcId,
        update: "name",
        className: row.rclcName,
      });
      if (res.data.code == 0) {
        this.$message({
          message: res.data.msg,
          type: "success",
        });
      } else {
        this.$message.error(res.data.msg);
      }
      this.typeList();
    },

    // 显示二级对话框
    addTwoChilder(index, row) {
      this.twoTypeFrom.libraryId = row.libraryId;
      this.twoTypeFrom.classId = row.rclcId;
      this.isChildrenDialog2 = true;
    },
	// 显示复制配置对话框
	ChildrenDialog3(){
		this.getPlatformAppList()
		this.isChildrenDialog3=true
	},

    // 对话框，关闭事件
    closeTwoTypeDialog() {
      fp.forIn((value, key, object) => {
        object[key] = "";
      }, this.twoTypeFrom);
      this.isChildrenDialog = false;
      this.isChildrenDialog2 = false;
      this.isChildrenDialog3 = false;
    },

    // 对话框，取消事件
    cancelTwoTypeDialog() {
      fp.forIn((value, key, object) => {
        object[key] = "";
      }, this.twoTypeFrom);
      this.isChildrenDialog = false;
      this.isChildrenDialog2 = false;
      this.isChildrenDialog3 = false;
    },

    // 二级对话框，确认事件
    async classLibraryConfigCreate() {
      const res = await classLibraryConfigCreate({
        libraryId: this.libraryId,
        className: this.twoTypeFrom.name,
        classId: this.twoTypeFrom.classId,
      });
      if (res.data.code == 0) {
        this.$message({
          message: res.data.data.msg,
          type: "success",
        });
        this.typeList();
      } else {
        this.$message.error(res.data.msg);
      }
      fp.forIn((value, key, object) => {
        object[key] = "";
      }, this.twoTypeFrom);
      this.isChildrenDialog2 = false;
    },
    // 复制类型库配置
    async copyClassLibrary() {
      const res = await copyClassLibrary({
        libraryId: this.libraryId,
		platformAppId:this.appId
      });
      if (res.data.code == 0) {
        this.$message({
          message: res.data.msg,
          type: "success",
        });
        this.typeList();
      } else {
        this.$message.error(res.data.msg);
      }
      this.isChildrenDialog3 = false;
    },
  },
};
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