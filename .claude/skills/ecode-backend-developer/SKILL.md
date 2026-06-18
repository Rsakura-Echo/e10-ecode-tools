---
name: ecode-backend-developer
description: 泛微 E10 ecode 后端开发助手。当用户描述后端二开需求时（发布接口、ESB动作流Action、数据库操作、缓存、消息队列、分布式定时任务、配置管理等），根据需求直接生成完整的Java后端代码和Dubbo配置。
type: project
---

# E10 ecode 后端开发技能

## 概述

此技能用于辅助 E10 ecode 平台的后端二开开发。用户用自然语言描述需求，此技能负责生成符合 ecode 规范的完整 Java 代码。

## 知识库

后端开发文档位于 `knowledge-base/backend/`，使用 Grep 按需检索：

```bash
grep -rni "关键词" knowledge-base/backend/ --include="*.md"
```

**核心文件速查**：

| 文档 | 内容 |
|------|------|
| `knowledge-base/backend/10-backend-overview.md` | 后端概述、技术栈、接口前缀规范、目录结构、核心工具类速查 |
| `knowledge-base/backend/11-backend-api-controller.md` | API/SAPI 接口开发、用户信息获取、分布式锁、ID生成、Dubbo服务注入 |
| `knowledge-base/backend/12-backend-database.md` | 数据库操作、数据源分组获取、SQL执行（LOGIC/EXTERNAL） |
| `knowledge-base/backend/13-backend-esb-action.md` | ESB Action 完整开发流程（实现→XML配置→部署→动作流配置） |
| `knowledge-base/backend/14-backend-cache.md` | 缓存注册与使用（set/get/del） |
| `knowledge-base/backend/15-backend-mq.md` | 消息队列（生产者/消费者） |
| `knowledge-base/backend/16-backend-scheduler.md` | 分布式定时任务（@ESchedulerHandler） |
| `knowledge-base/backend/17-backend-config.md` | 配置管理（标准配置、自定义配置、@WeaverConfigCenter） |
| `knowledge-base/backend/18-backend-rpc.md` | 调用标准服务（RPC/SAPI） |
| `knowledge-base/backend/21-backend-openplatform-utils.md` | 开放平台、标准服务调用、Webservice、国际化、UUID/锁/线程池/日志 |
| `knowledge-base/backend/22-backend-debug-monitor.md` | 后端调试（天梭平台/日志）、监控管理（配置/JAR包管理） |
| `knowledge-base/backend/28-business-field.md` | 业务字段（BusinessService）— 表单业务字段模块的整合与接入，代码位置 `weaver-common-form-extend` |

## 核心开发规范

### 接口前缀
```java
// 登录后可访问
@RestController
@RequestMapping("/api/secondev/模块名")

// 服务间调用（需开放平台认证）
@RestController
@RequestMapping("/sapi/secondev/模块名")

// ⚠️ 严禁随意声明 /papi 接口！
```

### 标准返回格式
```java
return WeaResult.success(data);   // 成功
return WeaResult.fail("msg");     // 失败
```

### 目录结构
```
src/main/java/com/weaver/seconddev/
├── action/         # ESB Action 实现
├── cache/          # 缓存（cons/controller/service）
├── controller/     # API/SAPI 控制器
├── entity/         # 实体类
├── escheduler/     # 分布式定时任务
├── mq/             # 消息队列
├── prop/           # 配置属性
└── secdev/         # 数据库服务
src/main/resources/
└── applicationContext-secondev-secondev-dubbo.xml
```

## 需求分析流程

1. **识别需求类型**：
   - 接口开发 → API Controller（/api）或 SAPI Controller（/sapi）
   - ESB 动作流 → Action + Dubbo XML
   - 数据库操作 → SecondevDataSetUtil（直接注入，executeSql/executeSqlWithTrans）
   - 缓存 → 注册缓存模块 + BaseCache 操作
   - 消息队列 → Producer / Consumer
   - 定时任务 → @ESchedulerHandler
   - 配置管理 → @Value + @RefreshScope / @WeaverConfigCenter
   - 调用标准服务 → @RpcReference / SecondRpcUtil / SecondSapiUtil

2. **确定接口前缀**：
   - 前端调用 → `/api/secondev/`
   - 服务间/外部系统 → `/sapi/secondev/`

3. **生成代码**：
   - 完整的 package 和 import
   - 遵循命名规范
   - 包含异常处理
   - 附带 XML 配置（如需要）

## 代码模板

### API 接口模板
```java
package com.weaver.seconddev.controller;

import com.weaver.common.authority.annotation.WeaPermission;
import com.weaver.common.base.entity.result.WeaResult;
import com.weaver.teams.security.context.UserContext;
import com.weaver.teams.security.user.User;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import java.util.HashMap;

@Slf4j
@RestController
@RequestMapping("/api/secondev/模块名")
@WeaPermission(publicPermission = true)
public class XxxController {

    @PostMapping("/方法名")
    public WeaResult<Map<String, Object>> methodName(@RequestBody Map<String, Object> body) {
        final User currentUser = UserContext.getCurrentUser();
        final Long employeeId = currentUser.getEmployeeId();
        final String tenantKey = currentUser.getTenantKey();

        log.info("请求参数: {}", body);

        Map<String, Object> result = new HashMap<>();
        // 业务逻辑...
        result.put("processed", true);

        return WeaResult.success(result);
    }
}
```

### ESB Action 模板
```java
package com.weaver.seconddev.action;

import com.alibaba.fastjson.JSON;
import com.weaver.common.base.entity.result.WeaResult;
import com.weaver.esb.api.rpc.EsbServerlessRpcRemoteInterface;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import java.util.Map;

@Slf4j
@Service("esbXxxAction")
public class EsbXxxAction implements EsbServerlessRpcRemoteInterface {

    @Override
    public WeaResult<Map<String, Object>> execute(Map<String, Object> params) {
        log.info("ESB Action params: {}", JSON.toJSONString(params));

        // 业务处理...
        params.put("result", "success");

        return WeaResult.success(params);
    }
}
```

### 定时任务模板
```java
package com.weaver.seconddev.escheduler;

import com.weaver.common.escheduler.context.ESchedulerJobHelper;
import com.weaver.common.escheduler.handler.annotation.ESchedulerHandler;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class XxxScheduler {

    @ESchedulerHandler(value = "xxxJobHandler", cron = "0 0/5 * * * ?")
    public void xxxJobHandler() throws Exception {
        log.info("定时任务开始执行");
        try {
            final String jobParam = ESchedulerJobHelper.getJobParam();
            // 业务逻辑...
            ESchedulerJobHelper.log("任务执行完成");
        } catch (Exception e) {
            log.error("任务执行异常", e);
        }
    }
}
```

## 关键注意事项

1. **接口前缀严格区分**：/api 登录访问，/sapi 服务间调用，严禁随意声明 /papi
2. **Entity 需支持序列化**：在 Dubbo RPC 调用中，实体参数需序列化
3. **分布式锁 tryLock 必须在 try {} 外面**
4. **先部署代码再修改 XML 配置**，否则服务启动异常
5. **数据库操作统一使用 `SecondevDataSetUtil`**（250501+基线），直接注入调用，无需手动构造 HTTP 请求和 Base64 编码。executeSql 返回结构为三层：`rawResult → data → records → rows`，详见 `knowledge-base/backend/12-backend-database.md`
6. **SQL 字符串拼接时必须白名单校验参数**（日期/数字正则），防止注入
7. **缓存常量必须以 SECONDEV_ 为前缀**，变量名与值必须一致
8. **自定义配置注册类必须放在固定包路径**：`com.weaver.custom.configcenter`
