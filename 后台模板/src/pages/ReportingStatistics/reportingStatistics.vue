<template>
  <div class="level-wrap">
    <el-card class="box-card">
      <div class="bottom" style="height: 60px; line-height: 60px">
        <div
          style="
            display: flex;
            justify-content: space-between;
            align-items: center;
          "
        >
          <div
            style="
              display: flex;
              justify-content: space-between;
              align-items: center;
            "
          >
            <span style="color: #aaa; font-size: 12px; margin-right: 10px"
              >上报时间
            </span>
            <el-date-picker
              v-model="time"
              type="daterange"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :default-time="['00:00:00', '23:59:59']"
              :unlink-panels="true"
            >
            </el-date-picker>
          </div>
          <div style="display: flex; justify-content: space-between">
            <span style="color: #aaa; font-size: 12px; margin-left: 20px"
              >上报来源
            </span>
            <el-select
              v-model="source"
              placeholder="全部"
              size="mini"
              style="width: 120px; margin-left: 10px"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
          <div style="display: flex; justify-content: space-between">
            <div style="display: flex; justify-content: space-between">
              <span style="color: #aaa; font-size: 12px; margin-left: 20px"
                >处理状态
              </span>
              <el-select
                v-model="stage"
                placeholder="全部"
                size="mini"
                style="width: 120px; margin-left: 10px"
              >
                <el-option
                  v-for="item in options2"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
            <div style="display: flex; justify-content: space-between">
              <span style="color: #aaa; font-size: 12px; margin-left: 20px"
                >所属小区
              </span>
              <el-input
                size="mini"
                placeholder="请输入内容"
                v-model="community"
                style="width: 100px; margin-left: 10px"
              ></el-input>
            </div>
          </div>
        </div>

        <div
          style="
            display: flex;
            justify-content: space-between;
            align-items: center;
          "
        >
          <div style="display: flex; justify-content: space-between">
            <span style="color: #aaa; font-size: 12px; margin-left: 20px"
              >报事分类
            </span>
            <el-select
              v-model="className"
              size="mini"
              style="width: 120px; margin-left: 10px"
              @change="changClassName"
            >
              <el-option
                v-for="item in options3"
                :key="item.classId"
                :label="item.className"
                :value="item.classId"
              >
              </el-option>
            </el-select>
            <el-select
              v-model="classItem"
              class="ml-20"
              size="mini"
              style="width: 120px; margin-left: 10px"
            >
              <el-option
                v-for="item in classItemList"
                :key="item.classId"
                :label="item.className"
                :value="item.classId"
              >
              </el-option>
            </el-select>
          </div>
          <div style="display: flex; justify-content: space-between">
            <div style="display: flex; justify-content: space-between">
              <span style="color: #aaa; font-size: 12px; margin-left: 20px"
                >上报人平台ID
              </span>
              <el-input
                size="mini"
                placeholder="请输入内容"
                v-model="bdwUserId"
                style="width: 100px; margin-left: 10px"
              ></el-input>
            </div>
            <div style="display: flex; justify-content: space-between">
              <span style="color: #aaa; font-size: 12px; margin-left: 20px"
                >上报人姓名
              </span>
              <el-input
                size="mini"
                placeholder="请输入内容"
                v-model="userName"
                style="width: 100px; margin-left: 10px"
              ></el-input>
            </div>
          </div>
        </div>

        <div
          style="
            display: flex;
            justify-content: space-between;
            align-items: center;
          "
        >
          <div style="display: flex; justify-content: space-between">
            <span style="color: #aaa; font-size: 12px; margin-left: 20px"
              >处理人姓名
            </span>
            <el-input
              size="mini"
              placeholder="请输入内容"
              v-model="handleUserName"
              style="width: 100px; margin-left: 10px"
            ></el-input>
          </div>
          <div style="display: flex; justify-content: space-between">
            <span style="color: #aaa; font-size: 12px; margin-left: 20px"
              >是否公开
            </span>
            <el-select
              v-model="open"
              placeholder="全部"
              size="mini"
              style="width: 120px; margin-left: 10px"
            >
              <el-option
                v-for="item in options4"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
          <div style="display: flex; justify-content: space-between">
            <span style="color: #aaa; font-size: 12px; margin-left: 20px"
              >监督人
            </span>
            <el-input
              size="mini"
              placeholder="请输入内容"
              v-model="supervisor"
              style="width: 100px; margin-left: 10px"
            ></el-input>
          </div>
          <el-button
            style="background-color: rgba(76, 123, 204, 1); color: #fff"
            @click="reportLists(1)"
            >搜索
          </el-button>
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
          <div>
            <el-button
              style="
                font-size: 12px;
                background-color: rgba(76, 123, 204, 1);
                color: #fff;
              "
              size="mini"
              @click="exportList"
              >导出</el-button
            >
          </div>
        </div>

        <el-table :data="tableData" style="width: 100%">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="上报时间">
                  <span>{{ props.row.time }}</span>
                </el-form-item>
                <el-form-item label="所属城市">
                  <span>{{ props.row.cityName }}</span>
                </el-form-item>
                <el-form-item label="小区名称">
                  <span>{{ props.row.communityName }}</span>
                </el-form-item>
                <el-form-item label="所属网格 ID">
                  <span>{{ props.row.groupName }}</span>
                </el-form-item>
                <el-form-item label="上报来源">
                  <span>{{ props.row.reportSource }}</span>
                </el-form-item>
                <el-form-item label="上报人姓名">
                  <span>{{ props.row.userName }}</span>
                </el-form-item>
                <el-form-item label="上报人">
                  <span>{{ props.row.bdwUserId }}</span>
                </el-form-item>
                <el-form-item label="预留电话">
                  <span>{{ props.row.userPhone }}</span>
                </el-form-item>
                <el-form-item label="公开">
                  <span>{{ props.row.open }}</span>
                </el-form-item>
                <el-form-item label="报事详情">
                  <template>
                    <el-button
                      size="mini"
                      type="text"
                      @click="statusUpdate(props.row)"
                    >
                      查看详情
                    </el-button>
                  </template>
                </el-form-item>
                <el-form-item label="处理状态">
                  <span>{{ props.row.stage }}</span>
                </el-form-item>
                <el-form-item label="监督人">
                  <span>{{ props.row.supervisor }}</span>
                </el-form-item>
                <el-form-item label="处理人">
                  <span>{{ props.row.handleUserName }}</span>
                </el-form-item>
                <el-form-item label="居民评分">
                  <span>{{ props.row.reportScore }}</span>
                </el-form-item>
                <el-form-item label="人大评分">
                  <span>{{ props.row.supervisorScore }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column label="所属网络" prop="groupName"> </el-table-column>
          <el-table-column label="上报人姓名" prop="userName">
          </el-table-column>
          <el-table-column label="处理状态" prop="stage"> </el-table-column>
          <el-table-column label="报事详情">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="text"
                @click="statusUpdate(scope.row)"
              >
                查看详情
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="box_bottom_page mt-20">
          <el-pagination
            background
            :current-page="page"
            layout="prev, pager, next"
            :total="total"
            @current-change="changePage"
          >
          </el-pagination>
        </div>
      </div>
    </el-card>
    <!-- 弹框 -->
    <el-dialog
      width="40%"
      title="报事详情"
      :visible="isShowReportDetail"
      @close="closeDialog"
      center
    >
      <div>
        <iframe
          class="report-detail"
          width="300"
          scrolling="auto"
          :src="reportDetailUrl"
          frameborder="0"
        ></iframe>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { reportList, exportList, classList } from "@/api/reportingStatistics";
import { wgChannelId, gridClientUrl, requestUrl } from "@/config/env";
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      tableData: [],
      options: [
        {
          value: "",
          label: "全部",
        },
        {
          value: "1",
          label: "app",
        },
        {
          value: "2",
          label: "h5",
        },
      ],
      options2: [
        {
          value: "",
          label: "全部",
        },
        {
          value: "-1",
          label: "待受理",
        },
        {
          value: "1",
          label: "受理中",
        },
        {
          value: "2",
          label: "已办结",
        },
      ],
      options3: [
        {
          classId: "",
          className: "全部",
          createTime: "",
          isShow: "",
          parentId: "",
          platformAppId: "",
        },
      ],
      options4: [
        {
          value: "",
          label: "全部",
        },
        {
          value: "1",
          label: "公开",
        },
        {
          value: "-1",
          label: "不公开",
        },
      ],
      source: "",
      stage: "",
      time: "",
      community: "",
      groupName: "",
      className: "",
      bdwUserId: "",
      userName: "",
      handleUserId: "",
      handleUserName: "",
      open: "",
      supervisor: "",
      page: 1,
      total: 0,
      classItem: "",
      classItemList: [
        {
          classId: "",
          className: "全部",
          createTime: "",
          isShow: "",
          parentId: "",
          platformAppId: "",
        },
      ],
      isShowReportDetail: false,
      reportDetailUrl: "",
      time2: [],
      stage2: "",
      userName2: "",
      community2: "",
      bdwUserId2: "",
      open2: "",
      classId2: "",
      handleUserId2: "",
      page2: 1,
    };
  },
  computed: {
    ...mapState("user", ["token", "platformAppId", "userInfo"]),
  },
  created() {
    this.reportList();
    this.classList();
  },
  mounted() {},
  methods: {
    // 获取报事列表     new Date(this.time).getTime()
    async reportList(e) {
        if(e){
            this.page=e
        }
      let time = new Date();
      let y = time.getFullYear();
      let m = time.getMonth() + 1;
      let m2 = m - 2;
      let d = time.getDate();
      let times1;
      let times2;
      if (this.time) {
        times1 = this.time[1];
        times2 = this.time[0];
      } else {
        times1 = y + "-" + m + "-" + d + "  " + "23:59:59";
        times2 = y + "-" + m2 + "-" + d + "   " + "00:00:00";
      }
      let params = {
        startTime: times2,
        endTime: times1,
        stage: this.stage,
        community: this.community,
        bdwUserId: this.bdwUserId,
        userName: this.userName,
        supervisor: this.supervisor,
        open: this.open,
        classId: this.classItem ||this.className,
        handleUser: this.handleUserName,
        reportSource: this.source,
        groupId: this.groupId,
        page: this.page,
        pageSize: 10,
      };

      let res = await reportList(params);
      if (res.data.code == 0) {
        var data = res.data.data;
        this.total = Number(data.total);
        this.tableData = data.list;

        this.time2 = this.time;
        this.stage2 = this.stage;
        this.userName2 = this.userName;
        this.community2 = this.community;
        this.bdwUserId2 = this.bdwUserId;
        this.open2 = this.open;
        this.handleUserId2 = this.handleUserId;

        this.tableData.forEach((element) => {
          if (element.reportSource == 1) {
            element.reportSource = "app";
          } else {
            element.reportSource = "h5";
          }

          if (element.stage == 0) {
            element.stage = "待受理";
          } else if (element.stage == 1) {
            element.stage = "受理中";
          } else {
            element.stage = "办结";
          }

          if (element.supervisorStatus == 0) {
            element.supervisorStatus = "未监督";
          } else if (element.supervisorStatus == 1) {
            element.supervisorStatus = "已监督";
          } else {
            element.supervisorStatus = "可以监督";
          }

          if (element.open == 0) {
            element.open = "不公开";
          } else {
            element.open = "公开";
          }

          if (!element.supervisor) {
            element.supervisor = "未监督";
          }
        });
      }
    },
    reportLists(e){
        this.reportList(e);
    },

    // 事件类型
    async classList(classId = undefined) {
      const res = await classList({
        classId: classId,
        page: this.page2,
      });
      if (res.data.code == "0") {
        var obj = res.data.data.parent;
        var valArr = Object.keys(obj).map(function (i) {
          return obj[i];
        });
        if (valArr.length == 0) {
            
        } else {
          valArr.forEach((el) => {
            if (el.parentId == 0) {
              this.options3.push(el);
            } else {
              this.classItemList.push(el);
            }
          });
        }
        if (valArr.length >= 10) {
          this.page2++;
          this.classList(classId);
        } else {
          this.page2 = 1;
        }
      }
    },

    // 报事导出
    async exportList() {
      let times = [];
      if (this.time) {
        this.time.forEach((el, index) => {
          console.log(el, index);
          let y1 = el.getFullYear();
          let m1 = el.getMonth() + 1;
          let d1 = el.getDate();
          if (index == "0") {
            times[0] = y1 + "-" + m1 + "-" + d1 + "   " + "00:00:00";
          } else {
            times[1] = y1 + "-" + m1 + "-" + d1 + "   " + "23:59:59";
          }
        });
        console.log(times);
      } else {
        let time = new Date();
        let y = time.getFullYear();
        let m = time.getMonth() + 1;
        let m2 = m - 2;
        let d = time.getDate();
        let times1 = y + "-" + m + "-" + d;
        let times2 = y + "-" + m2 + "-" + d;
        times = [times2, times1];
        // console.log(time)
      }

      const res = await exportList({
        startTime: times[0],
        endTime: times[1],
        stage: this.stage2,
        userName: this.userName2,
        community: this.community2,
        bdwUserId: this.bdwUserId2,
        open: this.open2,
        handleUserId: this.handleUserId2,
      });
      if (res.data.code == "1003") {
        this.$message.error(res.data.msg);
      } else {
        const url = `${requestUrl}/Manager/Report/exportList?token=${this.token}&platformAppId=${this.platformAppId}&startTime=${times[0]}&endTime=${times[1]}&stage=${this.stage2}&userName=${this.userName2}&community=${this.community2}&bdwUserId=${this.bdwUserId2}&open=${this.open2}&handleUserId=${this.handleUserId2}`;
        window.open(url);
      }
    },
    // 分页
    changePage(e) {
      this.page = e;
      this.reportList();
    },

    closeDialog() {
      this.isShowReportDetail = false;
    },

    // 报事详情
    statusUpdate(e) {
      // console.log(e)
      this.isShowReportDetail = true;
      this.reportDetailUrl = `${gridClientUrl}/grid/index.html?channelId=${wgChannelId}&wgUserId=${
        JSON.parse(this.userInfo).userId
      }&isGridAdmin=true#/pages/reportDetail/index?reportNo=${e.reportNo}`;
    },
    // 获取二级报事
    changClassName(value) {
        this.classItemList = [
            {
                classId: "",
                className: "全部",
                createTime: "",
                isShow: "",
                parentId: "",
                platformAppId: "",
            },
        ];
      this.classItem = "";
      this.classList(value);
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
  scrollbar-width: none;
  -ms-overflow-style: none;
}

::-webkit-scrollbar {
  display: none;
  /* Chrome Safari */
}

.bottom {
  width: 100%;
  height: initial;
}

el-table {
  padding: 0 20px;
}

.table-column {
  height: 30px;
  line-height: 30px;
}

.demo-table-expand {
  font-size: 0;
}

.demo-table-expand label {
  width: 90px;
  line-height: 30px;
  color: #99a9bf;
}

.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  line-height: 30px;
  width: 50%;
}

.box_bottom_page {
  @include fja(center, center);
}

.report-detail {
  width: 100%;
  min-height: 500px;
}
</style>