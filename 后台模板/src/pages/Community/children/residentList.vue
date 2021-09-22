<template>
  <div class="level-wrap">
    <el-card class="box-card">
      <div class="top-button">
        <h2>所属小区 {{ communityName }}</h2>
      </div>
      <div class="bottom" style="height: 60px; line-height: 60px">
        <div class="d-flex j-sb a-c">
          <div>
            <span style="color: #aaa; font-size: 12px; margin-left: 20px"
              >网格ID
            </span>
            <el-input
              size="mini"
              placeholder="请输入内容"
              v-model="groupId"
              style="width: 100px; margin-left: 10px"
            ></el-input>
          </div>
          <div>
            <span style="color: #aaa; font-size: 12px; margin-left: 20px"
              >本地玩ID
            </span>
            <el-input
              size="mini"
              placeholder="请输入内容"
              v-model="bdwUserId"
              style="width: 100px; margin-left: 10px"
            ></el-input>
          </div>
          <div></div>
        </div>

        <div class="d-flex j-sb a-c">
          <div>
            <span style="color: #aaa; font-size: 12px; margin-left: 20px"
              >累计反馈问题
            </span>
            <el-input
              size="mini"
              placeholder="请输入内容"
              v-model="reportNum"
              style="width: 100px; margin-left: 10px"
            ></el-input>
          </div>
          <div>
            <span style="color: #aaa; font-size: 12px; margin-left: 20px"
              >进群天数
            </span>
            <el-input
              size="mini"
              placeholder="请输入内容"
              v-model="days"
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
            @click="searchUserGroups"
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
          <h5>共计{{ total }}条数据</h5>
        </div>
        <div class="box_bottom">
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="groupName" label="所属网格">
            </el-table-column>
            <el-table-column prop="groupid" label="网格群id"> </el-table-column>
            <el-table-column prop="bdwUserId" label="本地玩id">
            </el-table-column>
            <el-table-column prop="userName" label="姓名"> </el-table-column>
            <el-table-column prop="userNickname" label="用户昵称">
            </el-table-column>
            <el-table-column prop="userPhone" label="预留电话">
            </el-table-column>
            <el-table-column prop="reportCount" label="累计反馈问题">
            </el-table-column>
            <el-table-column prop="days" label="进群天数"> </el-table-column>
          </el-table>
          <div class="box_bottom_page mt-20">
            <el-pagination
              background
              layout="prev, pager, next"
              :total="total"
              @current-change="changePage"
              :current-page="page"
            >
            </el-pagination>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getUserList, searchUserGroup } from "@/api/level";
export default {
  data() {
    return {
      communityName: "",
      page: 1,
      total: 0,
      communityId: "",
      bdwUserId: "",
      groupName: "",
      reportNum: "",
      tableData: [],
      userName: "",
      days: "",
      groupId: "",
      issearchUserGroups: false,
    };
  },
  created() {
    this.init();
    this.getUserList();
  },
  mounted() {},
  methods: {
    // 切换分页
    changePage(e) {
      this.page = e;
      if (this.issearchUserGroups) {
        this.searchUserGroup();
      } else {
        this.getUserList();
      }
    },
    // 初始化数据
    init() {
      //   console.log(this.$route.query);
      let obj = this.$route.query;
      this.communityId = obj.communityId;
      this.communityName = obj.communityName;
    },
    // 居民列表
    async getUserList() {
      var date = new Date();
      const res = await getUserList({
        page: this.page,
        communityId: this.communityId,
        time: date.getFullYear(),
      });
      if (res.data.code == 0) {
        this.tableData = res.data.data.list;
        this.total = res.data.data.total;
      }
    },
    searchUserGroups() {
      this.issearchUserGroups = true;
      this.page = 1;
      this.searchUserGroup();
    },
    // 搜索
    async searchUserGroup() {
      var date = new Date();
      const res = await searchUserGroup({
        page: this.page,
        communityId: this.communityId,
        userName: this.userName,
        bdwUserId: this.bdwUserId,
        time: date.getFullYear(),
        reportNum: this.reportNum,
        days: this.days,
        groupId: this.groupId,
      });
      if (res.data.code == 0) {
        this.tableData = res.data.data.list;
        this.total = res.data.data.total;
      }
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
.box_center {
  @include fja(space-between, center);
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