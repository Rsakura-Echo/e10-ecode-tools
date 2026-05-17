# 11 - API / SAPI 接口开发

## API 接口（/api/secondev）

用户登录后通过 E10 地址直接访问的接口。

### 基本结构

```java
package com.weaver.seconddev.controller;

import com.weaver.common.authority.annotation.WeaPermission;
import com.weaver.common.base.entity.result.WeaResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;

@RestController
@RequestMapping("/api/secondev/workflow/demo")
@WeaPermission(publicPermission = true)  // 公开权限
public class ApiController {

    @GetMapping("/hello")
    public WeaResult<String> hello(@RequestParam("key") String key) {
        return WeaResult.success(key);
    }

    @PostMapping("/save")
    public WeaResult<Map<String, Object>> save(@RequestBody Map<String, Object> body) {
        // 业务处理
        return WeaResult.success(result);
    }
}
```

### 获取当前用户信息

```java
import com.weaver.teams.security.context.UserContext;
import com.weaver.teams.security.user.User;

@GetMapping("/userInfo")
public WeaResult<Map<String, Object>> userInfo() {
    final User currentUser = UserContext.getCurrentUser();
    final Long employeeId = currentUser.getEmployeeId();   // 用户ID
    final String tenantKey = currentUser.getTenantKey();   // 租户key
    // final Tenant currentTenant = TenantContext.getCurrentTenant();

    Map<String, Object> info = new HashMap<>();
    info.put("employeeId", employeeId);
    info.put("tenantKey", tenantKey);
    return WeaResult.success(info);
}
```

### 权限控制

```java
// 类级别：所有方法都需要公开权限
@RestController
@RequestMapping("/api/secondev/demo")
@WeaPermission(publicPermission = true)
public class DemoController {

    // 方法级别：单独设置权限
    @GetMapping("/admin")
    @WeaPermission(publicPermission = false)  // 仅管理员
    public WeaResult<String> adminOnly() {
        return WeaResult.success("admin only");
    }
}
```

### 注入依赖

```java
@Autowired
SecDevProperty secDevProperty;          // 自定义配置

@RpcReference(timeout = 10000)
EcodeService ecodeService;              // Dubbo RPC 调用 ecode 服务

@RpcReference(timeout = 2000, group = "workflow")
WflRequestListRest wflRequestListRest;  // Dubbo RPC 调用流程服务

@Autowired
private DistributionLockInterface distributionLock;  // 分布式锁
```

## SAPI 接口（/sapi/secondev）

服务间内部通信接口，无法通过 E10 地址直接访问，需通过开放平台认证后调用。

```java
package com.weaver.seconddev.controller;

import com.weaver.common.base.entity.result.WeaResult;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/sapi/secondev/workflow/demo")
public class SapiController {

    @GetMapping("/hello")
    public WeaResult<String> hello(
            @RequestParam("key") String key,
            HttpServletRequest request,
            HttpServletResponse response) {

        Map<String, Object> datas = new HashMap<>();
        datas.put("msg", "sapi success");
        return WeaResult.success(key);
    }
}
```

### SAPI 通过开放平台调用

- 内部路径：`/sapi/secondev/workflow/demo/hello`
- 开放平台调用路径：`/openserver/api/secondev/workflow/demo/hello`
- 完整地址：`E10地址 + /papi/openapi/api/secondev/workflow/demo/hello`

## 分布式锁使用

**重要：`tryLock` 必须在 `try {}` 代码块外面！**

```java
@Autowired
private DistributionLockInterface distributionLock;

@GetMapping("/lock")
public WeaResult<Boolean> lock(@RequestParam("key") String key) throws Exception {
    int expireTime = 60; // 锁生命周期（秒）

    // ⚠️ tryLock 必须在 try {} 外面！
    distributionLock.tryLock(key, expireTime);
    try {
        // 执行业务逻辑
        // ...
    } finally {
        distributionLock.unLock(key);
    }
    return WeaResult.success(true);
}
```

## 分布式 ID 生成

```java
import com.weaver.common.distribution.genid.IdGenerator;

// 生成单个 ID
final long id = IdGenerator.generate();

// 批量生成（一次生成 10 个 ID）
final long[] ids = IdGenerator.generateRangeId(10);
```

## 调用标准 Dubbo 服务

```java
import com.weaver.framework.rpc.annotation.RpcReference;

// 注入 Dubbo 服务
@RpcReference(timeout = 10000)
EcodeService ecodeService;

@GetMapping("/rpc")
public WeaResult<Object> rpc(@RequestParam("key") String key) throws Exception {
    // 调用远程服务方法
    final FolderDto query = ecodeService.query(Long.valueOf(key));
    Map<String, Object> res = new HashMap<>();
    res.put("ecodeApp", query);
    return WeaResult.success(res);
}
```
