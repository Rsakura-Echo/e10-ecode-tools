# E10 ecode 开发知识库

## 概述

本知识库用于辅助 ecode 前后端开发，包含从官方文档和示例代码中提取的完整开发指引、API 参考和使用示例。

## 目录结构

```
knowledge-base/
├── frontend/   # 前端开发文档
├── backend/    # 后端开发文档
├── other/      # 问题排查、版本历史等其他文档
└── README.md   # 本索引
```

## 前端部分（frontend/）

- [01-ecode-overview.md](./frontend/01-ecode-overview.md) - ecode 平台概述与核心概念
- [02-project-structure.md](./frontend/02-project-structure.md) - 项目结构、入口文件、模块系统
- [03-component-override.md](./frontend/03-component-override.md) - 组件参数复写与组件替换
- [04-new-page-development.md](./frontend/04-new-page-development.md) - 新页面开发与路由注册
- [05-api-request.md](./frontend/05-api-request.md) - 前端接口请求与拦截
- [06-utils-library.md](./frontend/06-utils-library.md) - @weapp/utils 工具库 API 参考
- [07-ui-components.md](./frontend/07-ui-components.md) - UI 组件库参考（18个组件详细 API + 63个组件速查，PC/Mobile）
- [08-esb-serverless.md](./frontend/08-esb-serverless.md) - ESB 动作流与 Serverless
- [cases/INDEX.md](./frontend/cases/INDEX.md) - 真实案例库（E10 平台导出项目 + 实战验证代码模式）
- [19-frontend-module-system.md](./frontend/19-frontend-module-system.md) - 前端模块系统：模块化、入口文件、前置/异步加载、模块导入导出、开发依赖、模板变量
- [20-frontend-plugins-controls.md](./frontend/20-frontend-plugins-controls.md) - 公共插件、第三方JS/Vue集成、生效范围控制、调试、监控、代码屏蔽
- [25-workflow-js-sdk.md](./frontend/25-workflow-js-sdk.md) - 流程详情前端 JS-SDK：拦截事件/钩子事件、操作菜单控制、系统字段、页签扩展、签字意见
- [26-eb-dfpage-sdk.md](./frontend/26-eb-dfpage-sdk.md) - EB 表单建模 JS-dfpageSDK：表格视图/表单视图 SDK、保存前校验、批量操作、自定义弹框、JavaScript 动作 API

## 后端部分（backend/）

- [10-backend-overview.md](./backend/10-backend-overview.md) - 后端概述、技术栈、接口规范、核心工具类
- [11-backend-api-controller.md](./backend/11-backend-api-controller.md) - API/SAPI接口、用户信息、分布式锁、ID生成
- [12-backend-database.md](./backend/12-backend-database.md) - 数据库操作、数据源分组、SQL执行
- [13-backend-esb-action.md](./backend/13-backend-esb-action.md) - ESB Action开发（实现→XML→部署→动作流配置）
- [14-backend-cache.md](./backend/14-backend-cache.md) - 缓存注册与使用
- [15-backend-mq.md](./backend/15-backend-mq.md) - 消息队列（生产者/消费者）
- [16-backend-scheduler.md](./backend/16-backend-scheduler.md) - 分布式定时任务
- [17-backend-config.md](./backend/17-backend-config.md) - 配置管理（标准配置/自定义配置）
- [18-backend-rpc.md](./backend/18-backend-rpc.md) - 调用标准服务（RPC/SAPI）
- [21-backend-openplatform-utils.md](./backend/21-backend-openplatform-utils.md) - 开放平台发布、标准服务调用、Webservice、国际化、UUID/锁/线程池/日志
- [22-backend-debug-monitor.md](./backend/22-backend-debug-monitor.md) - 后端调试（本地+线上排错）、监控管理平台（配置/JAR包管理）

## 其他（other/）

- [09-troubleshooting-guide.md](./other/09-troubleshooting-guide.md) - 常见问题排查手册（代码不生效/Serverless/JAR部署/二开问题）
- [23-custom-browser-button.md](./other/23-custom-browser-button.md) - 自定义浏览按钮配置
- [24-version-history.md](./other/24-version-history.md) - ecode 平台版本功能历史、基线能力速查、浏览器支持

## 核心概念速查

### 技术栈
- **前端**：JS、CSS、Html、JSX、ES6、React 17、react-router-dom 5、mobx 4、axios
- **后端**：Java、SpringBoot、SpringCloud、Dubbo、Nacos、Redis

### 核心依赖
| 依赖 | 说明 | 引入方式 |
|------|------|---------|
| `react@17` | UI 框架 | `import React from 'react'` |
| `react-dom@17` | DOM 渲染 | `import ReactDOM from 'react-dom'` |
| `axios@0.21` | HTTP 库 | `import axios from 'axios'` |
| `react-router-dom@5` | 路由 | `import { Route, Link, withRouter } from 'react-router-dom'` |
| `@weapp/utils` | 工具库 | `import { regOvProps, ... } from '@weapp/utils'` |
| `@weapp/ecodesdk` | ecode SDK | `import { asyncImport } from '@weapp/ecodesdk'` |
| `@weapp/ui` | UI组件库 | `import { Button } from '@weapp/ui'` |

### 核心路由
- PC端新页面：`/sp/custom/${appId}/your-path`
- 移动端新页面：`/mobile/custom/${appId}/your-path`

### 核心模板变量
- `${appId}` - 当前应用的 AppId
- `${appRes}` - 当前应用的 resources 目录地址
