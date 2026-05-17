# 10 - 后端开发概述

## 技术栈

- **语言**：Java
- **框架**：Spring Boot + Spring Cloud
- **RPC**：Dubbo
- **配置中心**：Nacos
- **缓存**：Redis
- **数据库**：MySQL / 达梦
- **构建**：Gradle

## 接口前缀规范

| 前缀 | 说明 | 访问方式 |
|------|------|---------|
| `/api/secondev` | 二开接口，用户登录后访问 | E10 地址直接访问 |
| `/sapi/secondev` | 服务间调用接口 | 需通过开放平台认证 |
| `/papi` | **严禁二开随意声明！** | 统一用 /sapi + 开放平台 |

## 项目目录结构

```
secondev-demo/
├── src/main/java/com/weaver/seconddev/
│   ├── action/           # ESB Action 实现
│   ├── cache/
│   │   ├── cons/         # 缓存常量定义
│   │   ├── controller/   # 缓存管理接口
│   │   └── service/      # 缓存注册服务
│   ├── controller/       # API / SAPI 控制器
│   ├── entity/           # 实体类
│   ├── escheduler/       # 分布式定时任务
│   ├── mq/               # 消息队列（生产者/消费者）
│   ├── prop/             # 配置属性类
│   └── secdev/           # 数据库操作服务
├── src/main/resources/
│   └── applicationContext-secondev-secondev-dubbo.xml  # Dubbo 配置
└── secondev-demo.gradle  # Gradle 构建文件
```

## 包路径约定

- 业务代码：`com.weaver.seconddev.*`
- 自定义配置注册类（固定包路径）：`com.weaver.custom.configcenter`
- 配置文件名建议前缀：`weaver-secondev-`

## 核心依赖工具类速查

| 工具类 | 用途 | 来源包 |
|--------|------|--------|
| `UserContext` | 获取当前用户/租户信息 | `com.weaver.teams.security.context` |
| `WeaResult` | 统一返回结果封装 | `com.weaver.common.base.entity.result` |
| `BaseCache` | 缓存操作 | `com.weaver.common.cache.base` |
| `AsyncClient` | 消息队列生产者 | `com.weaver.common.async.producer.client` |
| `CommonRestService` | 服务间 HTTP 调用 | `com.weaver.datasource.utils.rest` |
| `SecondSapiUtil` | 二开 SAPI 调用工具 | `com.weaver.loom.admittance.util` |
| `SecondRpcUtil` | 二开 Dubbo RPC 调用 | `com.weaver.loom.admittance.util` |
| `IdGenerator` | 分布式ID生成 | `com.weaver.common.distribution.genid` |
| `DistributionLockInterface` | 分布式锁 | `com.weaver.common.distribution.lock` |
| `ESchedulerJobHelper` | 定时任务辅助 | `com.weaver.common.escheduler.context` |
| `TenantRpcContext` | RPC上下文租户信息 | `com.weaver.framework.rpc.context.impl` |
