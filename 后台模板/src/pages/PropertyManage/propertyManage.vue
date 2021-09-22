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
          <div class="box_top_item d-flex mr-10">
            <span class="box_top_item_name fz-14 fw-900 mr-10">小区名称</span>
            <el-input
              placeholder="输入关键字"
              v-model="communityName"
              clearable
            >
            </el-input>
          </div>
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
      <div class="box_center d-flex pt-20 pb-20">
        <div class="box_center_left">
          <span class="box_center_left_text fz-14">共计{{ total }}条信息</span>
        </div>
      </div>
      <div class="box_bottom">
        <el-table :data="propertyList" border style="width: 100%">
          <el-table-column prop="createTime" label="添加时间">
          </el-table-column>
          <el-table-column prop="communityId" label="小区ID"> </el-table-column>
          <el-table-column prop="communityName" label="小区名称">
          </el-table-column>
          <el-table-column prop="userNum" label="小区用户数"> </el-table-column>
          <el-table-column prop="PropertyLogo" label="小区图片">
            <template slot-scope="scope">
              <img
                :src="scope.row.propertyLogo"
                alt=""
                width="50px"
                height="50px"
              />
            </template>
          </el-table-column>
          <el-table-column prop="ccName" label="联系人名称"> </el-table-column>
          <el-table-column prop="ccPhone" label="联系人电话"> </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-link
                type="primary"
                :underline="false"
                @click="editProperty(scope.row)"
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
      title="编辑物业信息"
      :visible.sync="dialogShow"
      width="40%"
      center
      @close="closeCityDialog"
    >
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-width="auto"
        size="small"
        class="form mt-20"
      >
        <div class="group fz-14">
          <el-form-item label="小区名称：" class="form-item-style">
            <el-input
              v-model="editInformation.communityName"
              disabled
              style="width: 70%; color: #000"
            ></el-input>
          </el-form-item>
          <el-form-item label="小区头像：" prop="name">
            <el-upload
              class="avatar-uploader"
              :action="domain"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :on-error="handleAvatarError"
              :before-upload="beforeAvatarUpload"
              :data="uploadData"
            >
              <img v-if="propertyLogo" :src="propertyLogo" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <p style="color: #ccc">仅支持jpg，png，格式图片不超过2MB</p>
          </el-form-item>
          <el-form-item label="添加联系人：" class="form-item-style">
            <el-button type="primary" @click="addPhone = true"
              >添加联系人</el-button
            >
          </el-form-item>
          <div v-show="addPhone">
            <el-form-item class="form-item-style">
              <p
                class="max-width"
                style="text-align: center; border-bottom: 1px solid blue"
              >
                联系人
              </p>
            </el-form-item>
            <el-form-item label="联系人名称：" class="form-item-style">
              <el-input
                v-model="form.ccName"
                placeholder="请输入联系人名称"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="联系人电话："
              prop="ccPhone"
              class="form-item-style"
            >
              <el-input v-model="form.ccPhone" placeholder="请输入联系人电话">
              </el-input>
            </el-form-item>
          </div>

          <el-form-item class="form-item-style d-flex max-width j-c a-c">
            <el-button type="primary" @click="addPropertyContact"
              >提交</el-button
            >
          </el-form-item>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { getOssJsConfig } from "@/api/common";
import { channelId } from "@/config/env";
import { phoneExp } from "@/config/regExp";
import { getFileName } from "@/utils/imageUpload";
import {
  getPropertyList,
  editProperty,
  addPropertyContact,
  searchCommunity,
} from "@/api/property";
export default {
  name: "propertyManage",
  data() {
    const validatePhone = (rule, value, callback) => {
      console.log(rule, value, callback);
      if (value && phoneExp.test(value)) {
        callback();
      } else if (!value) {
        callback();
      } else {
        callback(new Error("请输入正确手机号"));
      }
    };
    return {
      communityId: "",
      communityName: "",
      communityStartNum: "",
      communityEndNum: "",
      propertyList: [],
      page: 1,
      // platformAppId: 952700,
      total: 0,
      dialogShow: false,
      addText: "1",
      addCommunity: "",
      addCommunityObj: {},
      createCommunity: "",
      editInformation: {},
      addPhone: false,
      form: {
        ccName: "",
        ccPhone: "",
      },
      propertyLogo: "",
      domain: "",
      uploadData: {},
      fileName: "",
      rules: {
        ccPhone: [
          { required: true, validator: validatePhone, trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.getPropertyList();
  },
  methods: {
    getpage() {
      this.page = 1;
    },
    // 搜索
    async onCommunitySearch() {
      let params = {
        // platformAppId: this.platformAppId,
        appId: this.appId,
        communityId: this.communityId,
        communityName: this.communityName,
        page: this.page,
      };
      const res = await searchCommunity(params);
      if (res.data.code == 0) {
        var data = res.data.data;
        this.propertyList = data.list;
        this.total = data.total;
        console.log(data);
      } else {
        this.$message.error(res.data.msg);
      }
    },
    // 获取小区列表
    async getPropertyList() {
      let params = {
        page: this.page,
      };
      const res = await getPropertyList(params);
      if (res.data.code == 0) {
        var data = res.data.data;
        this.propertyList = data.list;
        this.total = data.total;
        // console.log(this.propertyList)
      }
    },
    // 获取小区名称
    handleSelect(e) {
      this.communityName = e.communityName;
      this.communityId = e.communityId;
    },
    // 切换分页
    changePage(e) {
      this.page = e;
      if (this.communityId || this.communityName) {
        this.onCommunitySearch();
      } else {
        this.getPropertyList();
      }
    },
    // 编辑小区
    async editProperty(e) {
      console.log(e);
      if (e.ccName || e.ccPhone) {
        this.addPhone = true;
        this.form.ccPhone = e.ccPhone;
        this.form.ccName = e.ccName;
      }
      // console.log(e.communityId)
      this.editInformation = e;
      this.propertyLogo = e.propertyLogo;
      let params = {
        communityId: e.communityId,
      };
      const res = await editProperty(params);
      if (res.data.code == 0) {
        var data = res.data.data;
        this.editInformation = data.list[0];
      }
      // console.log(this.editInformation)
      this.form.ccName = "";
      this.form.ccPhone = "";
      this.addPhone = false;
      this.dialogShow = true;
    },

    // 对话框关闭事件取消事件
    cancelCityDialog() {
      this.form.ccName = "";
      this.form.ccPhone = "";
      this.addPhone = false;
    },
    // 对话框关闭事件
    closeCityDialog() {
      this.form.ccName = "";
      this.form.ccPhone = "";
      this.addPhone = false;
    },
    // 添加小区联系人
    async addPropertyContact() {
      this.$refs.form
        .validate()
        .then(async () => {
          let params = {
            communityId: this.editInformation.communityId,
            propertyLogo: this.propertyLogo,
            ccName: this.form.ccName,
            ccPhone: this.form.ccPhone,
          };
          const res = await addPropertyContact(params);
          if (res.data.code == 0) {
            var data = res.data.data;
            this.$message.success("添加成功");
            this.getPropertyList();
          } else {
            this.$message.error(res.data.msg);
          }
          this.form.ccName = "";
          this.form.ccPhone = "";
          this.addPhone = false;
          this.dialogShow = false;
        })
        .catch((error) => console.log(error));
    },

    // 上传成功
    handleAvatarSuccess(res, file) {
      console.log(this.domain + this.fileName);
      this.propertyLogo =
        this.domain +
        "/" +
        this.fileName +
        "?x-oss-process=image/resize,h_60,w_60";
    },

    // 上传失败
    handleAvatarError(err) {
      this.$message.error("上传失败");
    },

    // 上传前
    async beforeAvatarUpload(file) {
      console.log(file);
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) this.$message.error("上传头像图片大小不能超过 2MB!");
      // 取oss配置
      console.log(12, getOssJsConfig);
      const result = await getOssJsConfig({
        type: 1,
        channelId,
      });
      if (result.data.code == "0") {
        const data = result.data.data;
        this.fileName = getFileName(file, data.dir);
        this.domain = data.domain;
        this.uploadData = {
          key: this.fileName,
          policy: data.policy,
          signature: data.signature,
          OSSAccessKeyId: data.accessid,
          success_action_status: "200",
        };
      }
      return isLt2M;
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
.form {
  .form-item-style {
    width: 80%;
  }
}
</style>