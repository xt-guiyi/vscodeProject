# 网格员管理后台

## 运行步骤

1. 克隆前端大厅项目文件夹到本地

```
git clone git@code.aliyun.com:fpkj-front-end/front-end-source.git
```
2. 用vscode或WebStorm打开
![alt 属性文本](https://img.fphdcdn.com/attachment/vblog/210412120445_6073c6dd2f82c.png)

3. 运行项目
```
### 依赖安装
npm install
```

```
### 运行
npm run  serve
```
```
### 打包
npm run build
```

## 主要依赖库

- vue 全家桶(使用 vue-cli)
- ui 库:  element-ui.
- http 请求: axios 
- 工具库： lodash-fp

## 项目布局

```
|- /src
  |- /api // ajax请求模块
    |- common.js // 通用请求模块
    |- request.js // axios实例封装
  |- /assets // 静态资源
    |- /images // 图片文件夹
    |- /scss
      |- element-ui.scss //  饿了吗样式
      |- global.scss // 全局样式
      |- mixin.scss // 混入函数
      |- variables.scss // 样式变量
  |- /config // 配置文件夹
  |- /components // 公用组件文件夹
      |- /index.js // 自动注册组件
  |- /plugins // 插件文件夹
      |-/index.js // 自动注册插件
  |- /filters // 过滤器文件夹
      |-/index.js // 自动注册过滤器
  |- /routers // 路由文件夹
  |- /store // vuex
      |- /modules // 数据模块
      |- index.js // 数据入口
  |- /utils //公用方法
  |- /layout // 布局文件夹
  |- /pages // 页面文件夹
  |- app.vue
  |- main.js // 主页
```

## 项目讲解部分
........
.........
.....................................................

