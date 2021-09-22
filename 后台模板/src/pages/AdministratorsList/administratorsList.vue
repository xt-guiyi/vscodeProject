<template>
  <div class="administratorsList-container">
    <el-card>
      <div class="clearfix">
        <el-button
          type="primary"
          icon="el-icon-plus"
          class="fr"
          @click="addCityDialog"
          >添加管理员</el-button
        >
      </div>
      <!-- 管理员列表 -->
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
        <el-table-column prop="managerName" label="管理员账号" align="center">
        </el-table-column>
        <el-table-column
          prop="managerNickname"
          label="管理员昵称"
          align="center"
        >
        </el-table-column>
        <el-table-column prop="roleName" label="所属权限组" align="center">
        </el-table-column>
        <el-table-column prop="time" label="创建时间" align="center">
        </el-table-column>
        <el-table-column prop="isLock" label="是否锁定" align="center">
          <template v-slot:default="scope">
            <el-switch
              v-model="scope.row.isLock"
              active-color="#13ce66"
              inactive-color="#A9A9A9"
              @change="isLocks(scope.row)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="operation" label="操作" align="center">
          <template v-slot:default="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="editShow(scope.row)"
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="deletes1(scope.row)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div class="box_bottom_page mt-20">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="total"
          @current-change="changePage"
        >
        </el-pagination>
      </div>

      <!-- 添加管理员对话框 -->
      <el-dialog
        title="添加管理员"
        :visible.sync="isShow"
        @close="closeCityDialog"
        :close-on-click-modal="false"
        center
      >
        <el-form>
          <el-form-item label="管理员名称" label-width="120px">
            <el-input
              v-model="nickname"
              autocomplete="off"
              placeholder="请输入用户名"
            ></el-input>
          </el-form-item>
          <el-form-item label="账号" label-width="120px">
            <el-input
              v-model="name"
              autocomplete="off"
              placeholder="请输入账号"
              onkeyup="this.value=this.value.replace(/[^\w_]/g,'');"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" label-width="120px">
            <el-input
              v-model="password"
              autocomplete="off"
              placeholder="请输入密码"
              clearable
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item label="再次输入密码" label-width="120px">
            <el-input
              v-model="password2"
              autocomplete="off"
              placeholder="请再次输入密码"
              clearable
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item label="网格ID" label-width="120px">
            <el-input
              v-model="wgUserId"
              autocomplete="off"
              placeholder="请输入网格ID"
              clearable
              type="number"
            ></el-input>
          </el-form-item>
          <el-form-item label="所属权限组" label-width="120px">
            <el-select v-model="wrId" placeholder="请选择">
              <el-option
                v-for="item in rolList"
                :key="item.wrId"
                :label="item.roleName"
                :value="item.wrId"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancelCityDialog">取 消</el-button>
          <el-button type="primary" @click="confirmCityDialog">确 定</el-button>
        </div>
      </el-dialog>

      <!-- 编辑管理员对话框 -->
      <el-dialog
        title="编辑管理员信息"
        :visible.sync="isShow2"
        @close="closeCityDialog"
        :close-on-click-modal="false"
        center
      >
        <el-form>
          <el-form-item label="管理员名称" label-width="120px">
            <el-input
              v-model="nickname"
              autocomplete="off"
              placeholder="请输入用户名"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" label-width="120px">
            <el-input
              v-model="password"
              autocomplete="off"
              placeholder="请输入密码"
              clearable
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item label="再次输入密码" label-width="120px">
            <el-input
              v-model="password2"
              autocomplete="off"
              placeholder="请再次输入密码"
              clearable
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item label="所属权限组" label-width="120px">
            <el-select v-model="wrId" placeholder="请选择">
              <el-option
                v-for="item in rolList"
                :key="item.wrId"
                :label="item.roleName"
                :value="item.wrId"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancelCityDialog">取 消</el-button>
          <el-button type="primary" @click="confirmCityDialog2"
            >确 定</el-button
          >
        </div>
      </el-dialog>

      <!-- 删除管理员对话框 -->
      <el-dialog
        title="删除管理员"
        :visible.sync="isShow3"
        @close="closeCityDialog"
      >
        <p>
          <i class="el-icon-warning-outline" style="color: red"></i>是否删除{{
            nickname
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
import { pageList, create, edit, deletes } from "@/api/administratorsList";
import { roleList } from "@/api/authList.js";
export default {
  name: "administratorsList",
  data() {
    return {
      page: 1,
      total: 0,
      name: "",
      password: "",
      password2: "",
      nickname: "",
      wgUserId: "",
      id: "",
      tableData: [],
      isShow: false,
      isShow2: false,
      isShow3: false,
      rolList: [],
      wrId: "",
    };
  },
  created() {
    this.pageList();
    this.roleList();
  },
  methods: {
    // 分页
    changePage(e) {
      this.page = e;
      this.roleList();
    },
    // 获取权限组列表
    async roleList() {
      const res = await roleList();
      if (res.data.code == 0) {
        res.data.data.list.forEach((el) => {
          if (el.roleName != "超管") {
            this.rolList.push(el);
          }
        });
      }
    },
    // 管理员列表
    async pageList() {
      const result = await pageList({
        page: this.page,
      });
      if (result.data.code == 0) {
        let tableData = [];
        result.data.data.list.forEach((el) => {
          if (el.id != 1) {
            tableData.push(el);
          }
        });
        this.tableData = tableData;
        this.tableData.forEach((el) => {
          el.isLock = el.isLock == 1 ? true : false;
          el.time = this.formatDate(new Date(el.time * 1000));
        });
      }
    },
    // 时间戳转日期
    formatDate(now) {
      var year = now.getFullYear(); //取得4位数的年份
      var month = now.getMonth() + 1; //取得日期中的月份，其中0表示1月，11表示12月
      var date = now.getDate(); //返回日期月份中的天数（1到31）
      var hour = now.getHours(); //返回日期中的小时数（0到23）
      var minute = now.getMinutes(); //返回日期中的分钟数（0到59）
      var second = now.getSeconds(); //返回日期中的秒数（0到59）
      if (month < 10) {
        month = "0" + month;
      }
      if (date < 10) {
        date = "0" + date;
      }
      if (hour < 10) {
        hour = "0" + hour;
      }
      if (minute < 10) {
        minute = "0" + minute;
      }
      if (second < 10) {
        second = "0" + second;
      }
      return (
        year +
        "-" +
        month +
        "-" +
        date +
        " " +
        hour +
        ":" +
        minute +
        ":" +
        second
      );
    },
    // 添加角色对话框,打开事件
    addCityDialog() {
      this.isShow = true;
    },

    // 对话框关闭事件
    closeCityDialog() {
      this.isShow = false;
      this.isShow2 = false;
      this.isShow3 = false;
      this.name = "";
      this.password = "";
      this.password2 = "";
      this.nickname = "";
      this.wgUserId = "";
      this.id = "";
      this.wrId = "";
    },

    // 对话框取消事件
    cancelCityDialog() {
      this.isShow = false;
      this.isShow2 = false;
      this.isShow3 = false;
      this.name = "";
      this.password = "";
      this.password2 = "";
      this.nickname = "";
      this.wgUserId = "";
      this.id = "";
      this.wrId = "";
    },

    // 添加角色对话框，确认事件
    async confirmCityDialog() {
      if (
        this.name &&
        this.password &&
        this.password2 &&
        this.nickname &&
        this.wgUserId
      ) {
        this.isShow = false;
        const res = await create({
          name: this.name,
          password: this.password,
          password2: this.password2,
          nickname: this.nickname,
          wgUserId: this.wgUserId,
          wrId: this.wrId,
        });
        console.log(res);
        if (res.data.code == 0) {
          this.$message({
            message: res.data.msg,
            type: "success",
          });
        } else {
          this.$message.error(res.data.msg);
        }
        this.name = "";
        this.password = "";
        this.password2 = "";
        this.nickname = "";
        this.wgUserId = "";
        this.wrId = "";
        this.pageList();
      } else {
        this.$message({
          message: "请将信息填写完整",
          type: "warning",
        });
      }
    },

    // 编辑角色对话框打开事件
    editShow(e) {
      console.log(e);
      this.rolList.forEach((el) => {
        if (el.roleName == e.roleName) {
          this.wrId = el.wrId;
        }
      });
      this.id = e.id;
      this.nickname = e.managerNickname;
      this.wgUserId = e.wgUserId;
      this.isShow2 = true;
    },

    // 编辑角色对话框，确认事件
    async confirmCityDialog2() {
      this.isShow2 = false;
      const res = await edit({
        id: this.id,
        password: this.password,
        password2: this.password2,
        nickname: this.nickname,
        wgUserId: this.wgUserId,
        wrId: this.wrId,
      });
      console.log(res);
      if (res.data.code == 0) {
        this.$message({
          message: res.data.msg,
          type: "success",
        });
        this.pageList();
      } else {
        this.$message.error(res.data.msg);
      }
      this.password = "";
      this.password2 = "";
      this.nickname = "";
      this.wgUserId = "";
      this.id = "";
      this.wrId = "";
    },
    // 改变isLock的值
    async isLocks(e) {
      this.id = e.id;
      let isLock = e.isLock ? 1 : -1;
      const res = await edit({
        onOffLock: isLock,
        id: this.id,
      });
      if (res.data.code == 0) {
        this.$message({
          message: res.data.msg,
          type: "success",
        });
      } else {
        this.$message.error(res.data.msg);
      }
      this.id = "";
    },

    // 删除角色对话框打开事件
    deletes1(e) {
      console.log(e.id);
      this.id = e.id;
      this.nickname = e.managerNickname;
      this.isShow3 = true;
    },
    // 删除管理员
    async deletes() {
      const res = await deletes({
        id: this.id,
      });
      if (res.data.code == 0) {
        this.$message({
          message: res.data.msg,
          type: "success",
        });
        this.pageList();
      } else {
        this.$message.error(res.data.msg);
      }
      this.isShow3 = false;
      this.id = "";
      this.nickname = "";
    },
  },
};
</script>

<style lang="scss" scoped>
.box_bottom_page {
  @include fja(center, center);
}
/deep/ input::-webkit-outer-spin-button,
/deep/ input::-webkit-inner-spin-button {
  -webkit-appearance: none !important;
}
/deep/ input[type="number"] {
  -moz-appearance: textfield !important;
}
</style>