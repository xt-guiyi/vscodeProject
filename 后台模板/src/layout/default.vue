<template>
  <div class="defalut-container">
    <el-container class="full-screen">
      <!-- 左侧菜单 -->
      <el-aside width="auto" class="full-height aside-left">
        <div class="logo">
          <router-link tag="a" class="logo-href" to="/defaultLayout/home">
            <img src="@/assets/images/logo.png" class="logo-img mr-5" />
            <h5 class="title fz-14" :class="{ 'h5-show': isCollapse }">
              网格化管理后台
            </h5>
          </router-link>
        </div>

        <el-menu
          :collapse="isCollapse"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          class="el-menu-vertical-demo"
          :unique-opened="true"
          :router="true"
          :default-active="permission.currentChildrenMenuPath"
          @select="clickSideMenuItem"
        >
          <template v-for="(item, index) in permission.sidebarMenu">
            <el-submenu
              :index="item.index"
              :key="index"
              v-if="item.children.length"
            >
              <template slot="title">
                <i :class="icon.get(index)"></i>
                <span>{{ item.name }}</span>
              </template>
              <template v-for="(child, i) in item.children">
                <el-menu-item
                  :key="i"
                  :index="child.path"
                  :route="{ name: child.name }"
                  >{{ child.meta.name }}</el-menu-item
                >
              </template>
            </el-submenu>
          </template>
        </el-menu>
      </el-aside>
      <!-- 右侧主体 -->
      <el-container>
        <!-- 头部 -->
        <el-header class="header">
          <div class="left">
            <div class="left-wrap">
              <i
                class="el-icon-menu fz-24 pointer mr-10"
                @click="changeCollapse"
              ></i>
              <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item
                  class="fz-14"
                  :to="
                    routerList && routerList.length
                      ? { path: '/defaultLayout/home' }
                      : ''
                  "
                >
                  首页
                </el-breadcrumb-item>
                <transition-group
                  tag="div"
                  appear
                  style="display: flex"
                  name="breadcrumb-transition"
                >
                  <el-breadcrumb-item
                    class="fz-14"
                    v-for="item in routerList"
                    :key="item"
                  >
                    {{ item }}
                  </el-breadcrumb-item>
                </transition-group>
              </el-breadcrumb>
            </div>
          </div>
          <div class="right">
            <span class="right-item">欢迎,{{ userInfo.nickName }}</span>
            <el-popover width="80" placement="top-start" trigger="hover">
              <el-button size="small" style="margin: 0; border: 0"
                >消息(0)</el-button
              >
              <el-button
                size="small"
                style="margin: 0; border: 0"
                @click="onQuit"
                >退出</el-button
              >
              <el-badge class="item" slot="reference">
                <el-avatar shape="square" :src="userInfo.avatar">
                  <img src="@/assets/images/guanli.jpg" alt="" />
                </el-avatar>
              </el-badge>
            </el-popover>
          </div>
        </el-header>
        <!-- 路由 -->
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "default",
  data() {
    return {
      isCollapse: false,
      userInfo: {},
      visible: false,
      icon: new Map([
        [0, "el-icon-s-cooperation"],
        [1, "el-icon-s-grid"],
        [2, "el-icon-notebook-2"],
        [3, "el-icon-s-custom"],
        [4, "el-icon-monitor"],
      ]),
    };
  },
  computed: {
    routerList: function () {
      return this.$route.meta.collectionPath;
    },
    ...mapState(["permission"]),
    ...mapState("user", ["platformAppId"]),
  },
  created() {
    this.userInfo = JSON.parse(this.$store.state.user.userInfo);
  },
  watch: {
    $route(to, from) {
      let item = to.path.split("/");
      this.SET_CURRENT_CHILDREN_MENU_NAME(item[2]);
    },
  },
  methods: {
    moveMenu() {
      this.visible = true;
    },

    // 退出登录
    onQuit() {
      this.$confirm("确定要退出登录吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.userLogin("");
          this.setToken("");
          window.localStorage.removeItem("gridAdmin");
          this.$router.replace({
            path: "/login",
          });
        })
        .catch(() => {});
    },

    //
    changeCollapse() {
      this.isCollapse = !this.isCollapse;
    },

    // 点击侧边栏菜单项，保存当前选择项
    clickSideMenuItem(item) {
      // console.log(item)
      this.SET_CURRENT_CHILDREN_MENU_NAME(item);
    },

    ...mapMutations("user", ["userLogin", "setToken", "setPlatformAppId"]),

    ...mapMutations("permission", ["SET_CURRENT_CHILDREN_MENU_NAME"]),
  },
};
</script>

<style lang="scss" scoped>
/deep/ {
  .el-menu {
    border-right: 0;
  }

  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
}

.defalut-container {
  background-color: #f5f5f5;
}

.aside-left {
  background-color: #545c64;
  .logo {
    background: #2b2f3a;
    .logo-href {
      height: 60px;
      @include fja(center, center);

      .logo-img {
        width: 40px;
        height: 40px;
      }

      .title {
        height: 40px;
        width: 100px;
        color: white;
        text-align: center;
        overflow: hidden;
        line-height: 40px;
        opacity: 1;
        transition: all 0.3s;
      }
      .h5-show {
        width: 0px;
        height: 40px;
        opacity: 0;
        display: none;
        visibility: hidden;
        display: inline-block;
      }
    }
  }
}

.header {
  background-color: white;
  color: black;
  display: flex;
  justify-content: space-between;
  .left {
    height: inherit;

    .left-wrap {
      height: inherit;
      @include fja(center, center);
      .menu-icon {
        width: 20px;
        height: 20px;
        margin-right: 20px;
        @include bis("../assets/images/menu.png");
      }
    }
  }

  .right {
    display: flex;
    align-content: flex-end;

    .right-select {
      width: 120px;
      align-self: center;
      margin-right: 10px;
    }
    .right-item {
      line-height: 86px;
      font-size: 14px;
      font-weight: bold;
      color: #333;
      margin-right: 10px;
    }
    .item {
      margin-top: 10px;
    }
  }

  // 过渡动画
  .breadcrumb-transition-enter,
  .breadcrumb-transition-leave-to {
    transform: translateX(15px);
    opacity: 0;
  }

  .breadcrumb-transition-enter-active,
  .breadcrumb-transition-leave-active {
    transition: all 0.3s ease;
  }
}
</style>