<template>
  <div class="administratorsList-container">
    <el-card>
      <div class="clearfix">
        <el-button
          type="primary"
          icon="el-icon-plus"
          class="fr"
          @click="isCityDialog = true"
          >添加权限组</el-button
        >
      </div>
      <!-- 权限列表 -->
      <el-table
        :data="tableData"
        style="width: 100%"
        row-key="typeId"
        border
        :indent="56"
        :stripe="true"
        class="mt-20"
        :header-row-style="{
          fontSize: '16px',
        }"
        :header-cell-style="{ background: '#409EFF', color: '#FFF' }"
      >
        <el-table-column prop="wrId" label="权限组id" align="center">
        </el-table-column>
        <el-table-column prop="roleName" label="权限组名称" align="center">
        </el-table-column>
        <el-table-column
          width="500%"
          prop="wrrTitle"
          label="菜单组合"
          align="center"
        >
        </el-table-column>
        <el-table-column prop="operation" label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="isedit(scope.row)"
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="isdeletes(scope.row)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 添加权限组 -->
      <el-dialog
        title="添加权限组"
        :visible.sync="isCityDialog"
        @close="closeCityDialog"
        center
        :close-on-click-modal="false"
      >
        <div class="dialog-select-item">
          <div>
            <i class="mr-10" style="color: red">*</i><span>权限组名称：</span>
            <el-input
              size="mini"
              placeholder="请输入内容"
              v-model="name"
              style="width: 100px; margin-left: 10px"
            >
            </el-input>
          </div>
        </div>
        <div class="dialog-bottom">
          <p>选择权限</p>
          <div>
            <el-checkbox-group v-model="powerIds">
              <template v-for="el in cities">
                <el-checkbox
                  :label="el.id"
                  style="padding-top: 10px"
                  :key="el.id"
                  >{{ el.title }}</el-checkbox
                >
              </template>
            </el-checkbox-group>
          </div>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancelCityDialog">取 消</el-button>
          <el-button type="primary" @click="create">确 定</el-button>
        </div>
      </el-dialog>

      <!-- 编辑权限组 -->
      <el-dialog
        title="修改权限组"
        :visible.sync="isCityDialog2"
        @close="closeCityDialog"
        center
        :close-on-click-modal="false"
      >
        <div class="dialog-select-item">
          <div>
            <span>权限组名称：</span>
            <el-input
              size="mini"
              placeholder="请输入内容"
              v-model="name"
              style="width: 100px; margin-left: 10px"
            >
            </el-input>
          </div>
        </div>
        <div class="dialog-bottom">
          <p>选择权限</p>
          <div>
            <el-checkbox-group v-model="powerIds">
              <template v-for="el in cities">
                <el-checkbox
                  :label="el.id"
                  style="padding-top: 10px"
                  :key="el.id"
                  >{{ el.title }}</el-checkbox
                >
              </template>
            </el-checkbox-group>
          </div>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancelCityDialog">取 消</el-button>
          <el-button type="primary" @click="edit">确 定</el-button>
        </div>
      </el-dialog>

      <!-- 删除权限组对话框 -->
      <el-dialog
        title="删除权限组"
        :visible.sync="isCityDialog3"
        @close="closeCityDialog"
      >
        <p>
          <i class="el-icon-warning-outline" style="color: red"></i>是否删除{{
            name
          }}
        </p>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancelCityDialog">取 消</el-button>
          <el-button type="primary" @click="deletes">确 定</el-button>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import { roleList, create, edit, deletes } from "@/api/authList.js";
import { pageList } from "@/api/menuManage.js";
export default {
  name: "administratorsList",
  data() {
    return {
      tableData: [],
      name: "",
      powerIds: [],
      cities: [],
      isCityDialog: false,
      isCityDialog2: false,
      isCityDialog3: false,
    };
  },
  created() {
    this.roleList();
    this.pageList();
  },
  methods: {
    // 获取权限组列表
    async roleList() {
      const res = await roleList();
      // console.log(res.data)
      if (res.data.code == 0) {
        let tableData = [];
        res.data.data.list.forEach((el) => {
          if (el.roleName != "超管") {
            tableData.push(el);
          }
        });
        this.tableData = tableData;
      }
    },
    // 获取菜单列表
    async pageList() {
      const res = await pageList();
      if (res.data.code == 0) {
        res.data.data.forEach((el) => {
          if (el.title != "菜单管理") {
            this.cities.push(el);
          }
        });
      }
    },

    // 添加权限组对话框，关闭事件
    closeCityDialog() {
      this.isCityDialog = false;
      this.isCityDialog2 = false;
      this.isCityDialog3 = false;
      this.powerIds = [];
      this.name = "";
      this.id = "";
    },
    // 添加权限组对话框，取消事件
    cancelCityDialog() {
      this.isCityDialog = false;
      this.isCityDialog2 = false;
      this.isCityDialog3 = false;
      this.powerIds = [];
      this.name = "";
      this.id = "";
    },

    // 添加权限组对话框，确认事件
    async create() {
      const res = await create({
        powerIds: this.powerIds,
        name: this.name,
      });
      if (res.data.code == 0) {
        this.$message({
          message: res.data.msg,
          type: "success",
        });
        this.roleList();
        this.isCityDialog = false;
        this.powerIds = [];
        this.name = "";
      } else {
        this.$message.error(res.data.msg);
      }
    },

    // 编辑权限组对话框，打开事件
    isedit(e) {
      let wrrTitle = e.wrrTitle.split(",");
      if (wrrTitle) {
        wrrTitle.forEach((el) => {
          this.cities.forEach((ele) => {
            if (ele.title == el) {
              this.powerIds.push(ele.id);
            }
          });
        });
      }
      this.isCityDialog2 = true;
      this.id = e.wrId;
      this.name = e.roleName;
    },
    // 编辑权限组对话框，确认事件
    async edit() {
      const res = await edit({
        id: this.id,
        powerIds: this.powerIds,
        name: this.name,
      });
      if (res.data.code == 0) {
        this.$message({
          message: res.data.msg,
          type: "success",
        });
        this.roleList();
      } else {
        this.$message.error(res.data.msg);
      }
      this.isCityDialog2 = false;
      this.powerIds = [];
      this.name = "";
      this.id = "";
    },
    // 删除权限组对话框，打开事件
    isdeletes(e) {
      this.isCityDialog3 = true;
      this.id = e.wrId;
      this.name = e.roleName;
    },
    // 删除权限组对话框，确认事件
    async deletes() {
      const res = await deletes({
        id: this.id,
      });
      if (res.data.code == 0) {
        this.$message({
          message: res.data.msg,
          type: "success",
        });
        this.roleList();
      } else {
        this.$message.error(res.data.msg);
      }
      this.isCityDialog3 = false;
      this.id = "";
      this.name = "";
    },
  },
};
</script>

<style lang="scss" scoped>
.box_bottom_page {
  @include fja(center, center);
}
</style>