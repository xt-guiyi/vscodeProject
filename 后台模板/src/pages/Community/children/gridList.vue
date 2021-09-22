<template>
  <div class="level-wrap">
    <el-card class="box-card">
      <div class="top-button">
        <h2>所属小区 {{ communityName }}</h2>
      </div>
      <div class="bottom" style="line-height: 60px">
        <div
          style="
            display: flex;
            justify-content: space-between;
            align-items: center;
          "
        >
          <div>
            <span style="color: #aaa; font-size: 12px; margin-left: 20px"
              >网格ID
            </span>
            <el-input
              size="mini"
              placeholder="请输入内容"
              v-model="bdwUserId"
              style="width: 100px; margin-left: 10px"
            ></el-input>
          </div>
          <div>
            <span style="color: #aaa; font-size: 12px; margin-left: 20px"
              >群主名称
            </span>
            <el-input
              size="mini"
              placeholder="请输入内容"
              v-model="userName"
              style="width: 100px; margin-left: 10px"
            ></el-input>
          </div>
          <el-button
            style="
              padding: 10px 20px;
              margin-left: 10px;
              font-size: 12px;
              background-color: rgba(76, 123, 204, 1);
              color: #fff;
            "
            @click="searchUserInfo"
            >查询</el-button
          >
        </div>

        <div
          style="
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 20px;
            box-sizing: border-box;
          "
        >
          <h5>共计{{ num }}条数据</h5>
          <el-button
            style="
              font-size: 12px;
              background-color: rgba(76, 123, 204, 1);
              color: #fff;
              width: 100px;
            "
            size="mini"
            @click="getExcelCommunityGridUser"
            >导出</el-button
          >
        </div>
      </div>
      <div class="box_bottom">
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="groupName" label="网格名称" width="180">
          </el-table-column>
          <el-table-column prop="wgUserId" label="网格id"> </el-table-column>
          <el-table-column prop="userNum" label="网格用户数"> </el-table-column>
          <el-table-column prop="userName" label="群主"> </el-table-column>
          <el-table-column prop="createTime" label="创建时间">
          </el-table-column>
          <el-table-column label="加群">
            <template slot-scope="scope">
              <el-button size="mini" type="text" @click="zhansewm(scope.row)">
                查看二维码
              </el-button>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" type="text" @click="CityDialog(scope.row)">
                更新群主
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 更新群主对话框 -->
      <el-dialog
        title="更换群主"
        center
        :visible.sync="isCityDialog"
        @close="closeCityDialog"
      >
        <h3 class="mb-20">{{ groupName }}</h3>
        <p class="mb-20">群主：{{ userName }}</p>
        <div>
          更改：
          <el-select v-model="wgUserId" placeholder="请选择">
            <el-option
              v-for="item in list"
              :key="item.wgUserId"
              :label="item.userName"
              :value="item.wgUserId"
            >
            </el-option>
          </el-select>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancelCityDialog">取 消</el-button>
          <el-button type="primary" @click="updateGroupLeader">确 定</el-button>
        </div>
      </el-dialog>

      <!-- 二维码对话框 -->
      <el-dialog
        width="350px"
        title="扫描二维码进群"
        :visible.sync="isShow"
        @close="closeCityDialog"
        center
      >
        <vue-qr
          :size="300"
          :margin="0"
          :auto-color="true"
          :dot-scale="1"
          :text="groupSrc"
        />
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import {
  getCommunityGridUser,
  getExcelCommunityGridUser,
  searchUserInfo,
  getGroupUserInfo,
  getGroupLeaderList,
  updateGroupLeader,
} from "@/api/level";
import { mapState } from "vuex";
import { requestUrl } from "@/config/env.js";
import VueQr from "vue-qr";
export default {
  components: {
    VueQr,
  },
  data() {
    return {
      communityName: "",
      communityId: "",
      bdwUserId: "",
      userName: "",
      num: 0,
      tableData: [],
      groupSrc: "",
      isShow: false,
      isCityDialog: false,
      ugrId: "",
      wgUserId: "",
      list: [],
      groupName: "",
    };
  },
  computed: {
    ...mapState("user", ["token", "platformAppId"]),
  },
  created() {
    this.init();
    this.getCommunityGridUser();
  },
  mounted() {},
  methods: {
    // 初始化数据
    init() {
      // console.log(this.$route.query);
      let obj = this.$route.query;
      this.communityName = obj.communityName;
      this.communityId = obj.communityId;
    },

    // 网格搜索
    async searchUserInfo() {
      let params = {
        communityId: this.communityId,
        wgUserId: this.bdwUserId,
        userName: this.userName,
      };
      let res = await searchUserInfo(params);
      if (res.data.code == 0) {
        var data = res.data.data.list;
        this.tableData = data;
      } else {
        this.$message({
          showClose: true,
          message: res.data.msg,
          type: "warning",
        });
      }
    },

    // 获取网格列表
    async getCommunityGridUser() {
      let params = {
        communityId: this.communityId,
      };
      let res = await getCommunityGridUser(params);
      if (res.data.code == 0 && res.data.data.length) {
        var data = res.data.data;
        this.tableData = data;
        this.num = data.length;
      }
    },
    // 查看二维码
    async zhansewm(e) {
      var res = await getGroupUserInfo({
        userId: e.bdwUserId,
        channelId: e.wgUserId,
        type: 1,
      });
      if (res.data.code == 0) {
        this.groupSrc = res.data.data[0].groupSrc;
        this.isShow = true;
      }
    },
    // 更新群主对话框打开事件
    async CityDialog(e) {
      this.ugrId = e.ugrId;
      this.groupName = e.groupName;
      this.userName = e.userName;
      this.isCityDialog = true;
      const res = await getGroupLeaderList({
        ugrId: e.ugrId,
        communityId: this.communityId,
      });
      if (res.data.code == 0) {
        // console.log(res.data.data);
        this.list = res.data.data.list;
      }
    },

    // 更新群主对话框，取消事件
    cancelCityDialog() {
      this.ugrId = "";
      this.groupName = "";
      this.userName = "";
      this.wgUserId = "";
      this.list = [];
      this.isCityDialog = false;
    },
    // 对话框关闭事件
    closeCityDialog() {
      this.isShow = false;
      this.groupSrc = "";
      this.isCityDialog = false;
      this.ugrId = "";
      this.groupName = "";
      this.userName = "";
      this.wgUserId = "";
      this.list = [];
    },
    // 更新群主确认事件
    async updateGroupLeader() {
      var date = new Date();
      const res = await updateGroupLeader({
        ugrId: this.ugrId,
        communityId: this.communityId,
        wgUserId: this.wgUserId,
        time: date.getFullYear(),
      });
      if (res.data.code == 0) {
        this.$message({
          message: res.data.msg,
          type: "success",
        });
      } else {
        this.$message.error(res.data.msg);
      }
      this.ugrId = "";
      this.groupName = "";
      this.userName = "";
      this.wgUserId = "";
      this.list = [];
      this.isCityDialog = false;
      this.getCommunityGridUser();
    },
    // 网格导出
    async getExcelCommunityGridUser() {
      const url = `${requestUrl}/Manager/Community/getExcelCommunity?token=${this.token}&platformAppId=${this.platformAppId}`;
      let params = {};
      var res = await getExcelCommunityGridUser(params);
      window.open(url);
    },
  },
};
</script>

<style scoped lang='scss'>
.level-wrap {
  height: 100%;
}

.box-card {
  background-color: #fff;
  height: 100%;
  overflow-y: scroll;
}

.bottom {
  width: 100%;
  height: initial;
}

el-table {
  padding: 0 20px;
}

.box_bottom {
  .box_bottom_page {
    @include fja(center, center);
  }
  /deep/ {
    .is-leaf {
      background: #409eff;
      color: #fff;
    }
  }
}
</style>