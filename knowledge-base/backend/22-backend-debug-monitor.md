# 22 - 后端调试与监控管理

## 概述

本文档介绍后端二开代码的本地调试、线上排错方法，以及后端监控管理平台的使用。

---

## 一、如何调试（3.4）

### 1. 本地代码调试（3.4.1）

本地 Debug 二开服务需要搭建本地开发环境，参考：[E10 本地二开服务 debug 手册](相关链接)

基本步骤：
1. IDEA 打开本地项目
2. 下载二开服务依赖 jar 包（从服务器获取）
3. 配置启动参数
4. 断点调试

### 2. 线上环境报错排查（3.4.2）

#### 方式一：天梭平台

优先通过天梭平台排查：`/monitor/tissot/basic`

- 根据**操作人**筛选，查看对应操作的错误日志
- 可查看请求链路的完整调用栈

#### 方式二：二开服务日志

下载 secondev 服务日志：
- `secondev服务目录/logs/sys-secondev.log` — 二开代码业务日志
- `secondev服务目录/logs/sys-err.log` — 错误日志

可通过运维平台下载 secondev 服务日志。

---

## 二、后端二开监控管理平台（3.5）

### 1. 配置管理（3.5.1）

主团队管理员访问：`/ecode/monitor/config/manage`

功能：
- 管理二开服务配置文件
- 在线编辑 `weaver-secondev-service.properties`
- 配置项实时生效（Nacos 环境下支持自动刷新）

### 2. JAR 包版本管理（3.5.2）

主团队管理员访问：`/ecode/monitor/loom/jar/versionList`

功能：
- 查看所有二开 JAR 包的上传历史
- 查看每个版本的部署状态
- 支持版本回退
- JAR 包上传校验（1101基线及以上，运维平台 V5.0.9.920241128-RC 及以上）

### 3. JAR 包部署流程

1. 主团队管理员访问 `/ecode/monitor/loom/deploy/jar`
2. 服务节点选择二开服务 `weaver-secondev-service`
3. 检测服务状态
4. 点击上传，选择本地 build 好的 jar 包
5. 上传后进入运维平台重启二开服务

---

## 三、线上排错速查

| 排查方式 | 路径/地址 | 说明 |
|---------|----------|------|
| 天梭平台 | `/monitor/tissot/basic` | 按操作人筛选，查看调用链路 |
| 业务日志 | `logs/sys-secondev.log` | 二开代码日志 |
| 错误日志 | `logs/sys-err.log` | 错误日志 |
| 运维平台下载日志 | 运维平台 → 日志下载 | 在线下载 secondev 服务日志 |
| 配置管理 | `/ecode/monitor/config/manage` | 管理配置文件 |
| JAR 版本管理 | `/ecode/monitor/loom/jar/versionList` | 版本历史与回退 |
| JAR 部署 | `/ecode/monitor/loom/deploy/jar` | 上传与部署 |
