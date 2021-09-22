<template>
  <div class="container">
    <el-card class="box-card">
      <div class="box_top d-flex pb-20">
        <div class="box_top_list d-flex">
          <div class="box_top_item d-flex">
            <span class="box_top_item_name fz-14 fw-900 mr-10">小区ID</span>
            <el-input placeholder="输入小区ID" v-model="communityId" clearable>
            </el-input>
          </div>
          <div style="display: flex; justify-content: space-between">
            <div class="box_top_item d-flex">
              <span class="box_top_item_name fz-14 fw-900 mr-10">小区名称</span>
              <el-autocomplete
                class="inline-input"
                v-model="communityName"
                :fetch-suggestions="querySearch"
                placeholder="输入小区首字母"
                :trigger-on-focus="false"
                value-key="communityName"
                @select="handleSelect"
                clearable
              >
              </el-autocomplete>
            </div>
            <!-- <div class="box_top_item d-flex">
				<span class="box_top_item_name fz-14 fw-900 mr-10">小区用户数</span>
				<div class="box_top_item_group d-flex">
					<el-input
					placeholder=""
					v-model="communityStartNum"
					clearable>
					</el-input>
					<span class="box_top_item_group_line mr-10 ml-10">-</span>
					<el-input
					placeholder=""
					v-model="communityEndNum"
					clearable>
					</el-input>
				</div>
				</div> -->
          </div>
          <div class="box_top_btn">
            <el-button
              type="primary"
              @click="
                getpage();
                onCommunitySearch();
              "
              >搜索</el-button
            >
          </div>
        </div>
      </div>
      <div class="box_center d-flex pt-20 pb-20">
        <div class="box_center_left">
          <span class="box_center_left_text fz-14">共计{{ total }}条信息</span>
        </div>
        <div class="box_center_right d-flex">
          <el-button type="primary" @click="dialogShow = true"
            >添加小区</el-button
          >
          <el-button type="primary" @click="getExcelCommunity">导出</el-button>
        </div>
      </div>
      <div class="box_bottom">
        <el-table :data="communityList" border style="width: 100%">
          <el-table-column prop="createTime" label="添加时间">
          </el-table-column>
          <el-table-column prop="communityId" label="小区ID"> </el-table-column>
          <el-table-column prop="communityName" label="小区名称">
          </el-table-column>
          <el-table-column prop="userNum" label="小区用户数">
            <template slot-scope="scope">
              <el-link
                type="primary"
                :underline="false"
                @click="goResidentList(scope.row)"
                >{{ scope.row.userNum }}</el-link
              >
            </template>
          </el-table-column>
          <el-table-column prop="Robot" label="小宁机器人"> </el-table-column>
          <el-table-column prop="wgNum" label="网格数">
            <template slot-scope="scope">
              <el-link
                type="primary"
                :underline="false"
                @click="goGridList(scope.row)"
                >{{ scope.row.wgNum }}</el-link
              >
            </template>
          </el-table-column>
          <el-table-column prop="administratorsNum" label="管理人员数">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-link
                type="primary"
                :underline="false"
                @click="onEditAdmin(scope.row)"
                >编辑管理人员</el-link
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
            :current-page="page"
          >
          </el-pagination>
        </div>
      </div>
    </el-card>
    <el-dialog
      title="添加新小区"
      :visible.sync="dialogShow"
      width="30%"
      center
      @close="closeDialog"
    >
      <div class="dialog_top">
        <el-radio v-model="addText" label="1">关联小区</el-radio>
        <el-radio v-model="addText" label="2" disabled>创建小区</el-radio>
      </div>
      <el-tabs v-model="addText" type="card">
        <el-tab-pane label="1" name="1">
          <div class="dialog_top_item jccenter pt-20 mt-20 mb-20">
            <span class="dialog_top_item_name pr-10">选择小区</span>
            <el-autocomplete
              v-model="addCommunitys"
              class="inline-input"
              :fetch-suggestions="querySearch"
              placeholder="请输入小区首字母"
              value-key="communityName"
              :trigger-on-focus="false"
              @select="addChangeSelect"
              clearable
            >
            </el-autocomplete>
          </div>
        </el-tab-pane>
        <el-tab-pane label="2" name="2">
          <div class="dialog_top_item jccenter pt-20 mt-20 mb-20">
            <span class="dialog_top_item_name pr-10">命名小区</span>
            <el-input
              style="width: 217px"
              placeholder="请输入新建的小区名"
              v-model="createCommunity"
              clearable
            >
            </el-input>
          </div>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelDialog">取 消</el-button>
        <el-button type="primary" @click="addCommunityButton">添 加</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getCommunityList,
  getCommunityLetter,
  searchCommunity,
} from "@/api/community";
import { getExcelCommunity, addCommunity } from "@/api/level";
import { mapState } from "vuex";

import { requestUrl } from "@/config/env";
export default {
  name: "neighbourhoodManage",
  data() {
    return {
      communityId: "",
      communityName: "",
      addCommunityId: "",
      addCommunityName: "",
      // communityStartNum: '',
      communityEndNum: "",
      communityList: [],
      page: 1,
      cityCode: "",
      total: 0,
      dialogShow: false,
      addText: "1",
      addCommunitys: "",
      addCommunityObj: {},
      createCommunity: "",
    };
  },
  computed: {
    ...mapState("user", ["token", "platformAppId"]),
  },
  created() {
    let res = this.$route.query;
    this.cityCode = res.cityCode;
    this.getCommunityList();
  },
  methods: {
    getpage() {
      this.page = 1;
    },

    closeDialog() {
      this.addCommunitys = "";
      this.addCommunityName = "";
      this.addCommunityId = "";
      this.cancelDialog();
    },

    cancelDialog() {
      this.dialogShow = false;
    },
    // 搜索
    async onCommunitySearch() {
      let params = {
        cityCode: this.cityCode,
        communityId: this.communityId,
        communityName: this.communityName,
        page: this.page,
      };
      const res = await searchCommunity(params);
      if (res.data.code == 0) {
        this.communityList = res.data.data.list;
        this.total = res.data.data.total;
      } else {
        this.$message.error(res.data.msg);
      }
    },
    // 获取小区列表
    async getCommunityList() {
      let params = {
        cityCode: this.cityCode,
        page: this.page,
      };
      const res = await getCommunityList(params);
      if (res.data.code == 0) {
        var data = res.data.data;
        this.communityList = data.list;
        this.total = data.total;
      }
    },

    // 根据首字母获取小区
    async querySearch(e, callback) {
      console.log(e);
      let params = {
        cityCode: this.cityCode,
        letter: e,
      };
      const res = await getCommunityLetter(params);
      if (res.data.code == "0") return callback(res.data.data.list);
      callback([]);
    },

    // 获取小区名称
    handleSelect(e) {
      console.log(e, 12);
      this.communityName = e.communityName;
      // this.communityId = e.communityId
    },
    // 获取添加小区选择数据
    addChangeSelect(e) {
      console.log(e, 11);
      this.addCommunityName = e.communityName;
      this.addCommunityId = e.communityId;
    },
    // 切换分页
    changePage(e) {
      this.page = e;
      if (this.communityId || this.communityName) {
        this.onCommunitySearch();
      } else {
        this.getCommunityList();
      }
    },
    //   去管理员页面
    onEditAdmin(e) {
      console.log(e);
      this.$router.push({ name: "level", query: e });
    },
    //   去居民列表页面
    goResidentList(e) {
      console.log(e);
      this.$router.push({ name: "residentList", query: e });
    },
    //   去网格列表页面
    goGridList(e) {
      console.log(e);
      this.$router.push({ name: "gridList", query: e });
    },

    async getExcelCommunity() {
      const url = `${requestUrl}/Manager/Community/getExcelCommunity?token=${this.token}&platformAppId=${this.platformAppId}`;
      window.open(url);
    },

    async addCommunityButton() {
      const result = await addCommunity({
        cityCode: this.cityCode,
        communityId: this.addCommunityId,
        communityName: this.addCommunityName,
        addType: 1,
      });
      if (result.data.code == 0) {
        this.$message.success(result.data.msg);
        this.page = 1;
        this.getCommunityList();
        this.dialogShow = false;
      } else {
        this.$message.error(result.data.msg);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.jccenter {
  display: flex;
  justify-content: center;
  align-items: center;
}

.dialog_top {
  display: flex;
  justify-content: center;
}

/deep/ {
  .el-tabs__header {
    display: none;
  }
}

.box-card {
  .box_top {
    border-bottom: 1px solid #eee;
    @include fja(space-between, center);

    .box_top_list {
      width: 70vw;
      @include fja(space-between, center);

      .box_top_item {
        @include fja(center, center);

        .el-input {
          width: 200px;
        }

        .box_top_item_group {
          @include fja(center, center);
          width: 200px;
        }
      }
    }
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
}
</style>