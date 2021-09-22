<template>
  <div class="administratorsList-container">
    <el-card>
      <div class="clearfix mb-20">
        <el-button
          type="primary"
          icon="el-icon-plus"
          class="fr"
          @click="isChildrenDialog = true"
          >添加菜单</el-button
        >
      </div>
      <!-- 权限列表 -->
      <el-table
        :data="tableData"
        style="width: 100%"
        row-key="id"
        border
        :indent="56"
        :tree-props="{ children: 'childList' }"
        :header-cell-style="{ background: '#409EFF', color: '#FFF' }"
      >
        <el-table-column prop="id" label="菜单id" align="center">
        </el-table-column>
        <el-table-column prop="title" label="菜单名称" align="center">
        </el-table-column>
        <el-table-column prop="alias" label="菜单别名" align="center">
        </el-table-column>
        <el-table-column prop="operation" label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="ChildrenDialog2(scope.row)"
            ></el-button>
            <el-button
              type="success"
              icon="el-icon-plus"
              size="mini"
              @click="ChildrenDialog(scope.row)"
              v-if="scope.row.parentId == 0"
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="ChildrenDialog3(scope.row)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 添加菜单对话框 -->
      <el-dialog
        title="添加菜单"
        :visible.sync="isChildrenDialog"
        @close="closeTwoTypeDialog"
        :close-on-click-modal="false"
      >
        <el-form :model="twoTypeFrom">
          <el-form-item label="菜单名称(必填)" label-width="120px">
            <el-input
              v-model="twoTypeFrom.title"
              autocomplete="off"
              placeholder="请输入类型名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="菜单别名(必填)" label-width="120px">
            <el-input
              v-model="twoTypeFrom.alias"
              autocomplete="off"
              placeholder="请输入类型名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="类型(必填)" label-width="120px">
            <el-select v-model="twoTypeFrom.type" placeholder="请选择">
              <el-option label="管理后台" :value="1"></el-option>
              <el-option label="网格员端" :value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="路由路径" label-width="120px">
            <el-input
              v-model="twoTypeFrom.wgRoute"
              autocomplete="off"
              placeholder="请输入类型名称"
            ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancelTwoTypeDialog">取 消</el-button>
          <el-button type="primary" @click="create">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 编辑菜单对话框 -->
      <el-dialog
        title="编辑菜单"
        :visible.sync="isChildrenDialog2"
        @close="closeTwoTypeDialog"
        :close-on-click-modal="false"
      >
        <el-form :model="twoTypeFrom">
          <el-form-item label="菜单名称(必填)" label-width="120px">
            <el-input
              v-model="twoTypeFrom.title"
              autocomplete="off"
              placeholder="请输入类型名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="菜单别名(必填)" label-width="120px">
            <el-input
              v-model="twoTypeFrom.alias"
              autocomplete="off"
              placeholder="请输入类型名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="类型(必填)" label-width="120px">
            <el-select v-model="twoTypeFrom.type" placeholder="请选择">
              <el-option label="管理后台" :value="1"></el-option>
              <el-option label="网格员端" :value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="路由路径" label-width="120px">
            <el-input
              v-model="twoTypeFrom.wgRoute"
              autocomplete="off"
              placeholder="请输入类型名称"
            ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancelTwoTypeDialog">取 消</el-button>
          <el-button type="primary" @click="edit">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 删除菜单对话框 -->
      <el-dialog
        title="删除菜单"
        :visible.sync="isChildrenDialog3"
        @close="closeTwoTypeDialog"
      >
        <p class="fz-18">
          <i class="el-icon-warning" style="color: red"></i>确定删除该菜单
        </p>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancelTwoTypeDialog">取 消</el-button>
          <el-button type="primary" @click="deletes">确 定</el-button>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import { pageList, create, edit, deletes } from "@/api/menuManage.js";
export default {
  name: "administratorsList",
  data() {
    return {
      tableData: [],
      isChildrenDialog: false,
      isChildrenDialog2: false,
      isChildrenDialog3: false,
      twoTypeFrom: {
        title: "",
        alias: "",
        type: "",
        wgRoute: "",
        parentId: "",
        id: "",
      },
    };
  },
  created() {
    this.pageList();
  },
  methods: {
    // 获取菜单列表
    async pageList() {
      const res = await pageList();
      // console.log(res.data)
      if (res.data.code == 0) {
        let tableData = [];
        res.data.data.forEach((el) => {
          if (el.title != "菜单管理") {
            tableData.push(el);
          }
        });
        this.tableData = tableData;
      }
    },
    // 添加菜单对话框打开事件
    ChildrenDialog(e) {
      this.twoTypeFrom.parentId = e.id;
      this.isChildrenDialog = true;
    },
    // 编辑菜单对话框打开事件
    ChildrenDialog2(e) {
      this.twoTypeFrom.parentId = e.parentId;
      this.twoTypeFrom.id = e.id;
      this.twoTypeFrom.title = e.title;
      this.twoTypeFrom.alias = e.alias;
      this.isChildrenDialog2 = true;
    },
    // 删除菜单对话框打开事件
    ChildrenDialog3(e) {
      this.twoTypeFrom.id = e.id;
      console.log(this.twoTypeFrom.Id);
      this.isChildrenDialog3 = true;
    },
    // 二级对话框，关闭事件
    closeTwoTypeDialog() {
      for (let i in this.twoTypeFrom) {
        this.twoTypeFrom[i] = "";
      }
      this.isChildrenDialog = false;
      this.isChildrenDialog2 = false;
      this.isChildrenDialog3 = false;
    },
    // 二级对话框，取消事件
    cancelTwoTypeDialog() {
      for (let i in this.twoTypeFrom) {
        this.twoTypeFrom[i] = "";
      }
      this.isChildrenDialog = false;
      this.isChildrenDialog2 = false;
      this.isChildrenDialog3 = false;
    },
    // 添加菜单确认事件
    async create() {
      const res = await create({
        title: this.twoTypeFrom.title,
        alias: this.twoTypeFrom.alias,
        type: this.twoTypeFrom.type,
        wgRoute: this.twoTypeFrom.wgRoute,
        parentId: this.twoTypeFrom.parentId,
      });
      if (res.data.code == 0) {
        this.$message({
          message: res.data.msg,
          type: "success",
        });
      } else {
        this.$message.error(res.data.msg);
      }
      for (let i in this.twoTypeFrom) {
        this.twoTypeFrom[i] = "";
      }
      this.pageList();
      this.isChildrenDialog = false;
    },
    // 编辑菜单确认事件
    async edit() {
      const res = await edit({
        id: this.twoTypeFrom.id,
        title: this.twoTypeFrom.title,
        alias: this.twoTypeFrom.alias,
        type: this.twoTypeFrom.type,
        wgRoute: this.twoTypeFrom.wgRoute,
        parentId: this.twoTypeFrom.parentId,
      });
      if (res.data.code == 0) {
        this.$message({
          message: res.data.msg,
          type: "success",
        });
      } else {
        this.$message.error(res.data.msg);
      }
      for (let i in this.twoTypeFrom) {
        this.twoTypeFrom[i] = "";
      }
      this.pageList();
      this.isChildrenDialog2 = false;
    },
    // 删除菜单确认事件
    async deletes() {
      console.log(this.twoTypeFrom.id);
      const res = await deletes({
        id: this.twoTypeFrom.id,
      });
      if (res.data.code == 0) {
        this.$message({
          message: res.data.msg,
          type: "success",
        });
      } else {
        this.$message.error(res.data.msg);
      }
      for (let i in this.twoTypeFrom) {
        this.twoTypeFrom[i] = "";
      }
      this.pageList();
      this.isChildrenDialog3 = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.box_bottom_page {
  @include fja(center, center);
}
</style>