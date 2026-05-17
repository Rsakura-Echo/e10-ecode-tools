# 01 - ecode 平台概述与核心概念

## ecode 是什么

e-code 全称「e-code 在线开发平台」，是一个面向社会化开发人员的低代码平台，用于增强 E10 平台的前后端个性化能力。

### 核心特点
- **全程在线 IDE**：无需本地搭建环境
- **无侵入式开发**：不修改标准产品源码
- **高复用**：开发的代码可打包成插件热插拔复用
- **一键发布**：前端一键打包发布，后端一键部署

### 能力概览
- 前端：150+ 组件、基础 jsapi、业务组件 50+
- 后端：1000+ api、50+ sdk、50+ 平台能力

## 核心概念

### 应用（App）
每个 ecode 项目称为一个"应用"，拥有唯一的 appId。

### 子项目类型
- **React 子项目**：用于前端二开，创建后会生成 entry.js 入口文件
- **Java 子项目**：用于后端二开

### 前置加载 vs 异步加载
- **前置加载**：文件在页面加载早期执行，编译进 `/ecodestatic/dev/init.js`
- **异步加载**：文件按需加载，编译进 `/ecodestatic/release/${appId}/index.js`

### 入口文件（entry.js）
- 新建项目自动创建的前置加载文件
- 只有入口文件存在并前置加载，项目发布后才会执行
- 入口文件不能被其他文件引用

### 模板变量
- `${appId}`：当前应用的 AppId，编译时自动替换
- `${appRes}`：当前应用 resources 目录地址

## 浏览器支持
- Chrome 71+
- Safari 15.4+
- Edge 109+

## 调试

### PC端
- 使用 Chrome DevTools（F12）
- 安装 React Developer Tools 插件查看组件树
- 可通过地址栏添加 `?wea_link_show_console` 解除 console 屏蔽

### 移动端
- 使用 vconsole 移动端调试面板
- 地址栏添加 `?wea_link_keep_vconsole=true` 保持 vconsole 开启

### 组件定位
在 React DevTools 的 Component 页签中：
- 使用小箭头选取页面元素
- 组件名以 `weapp` 开头、格式为 `[库名]` 的组件，支持通过 `@weapp/utils` 注册复写工具处理
