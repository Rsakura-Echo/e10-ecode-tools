# 21 - 后端开放平台、服务调用与辅助工具

## 概述

本文档涵盖后端接口发布到开放平台、调用标准服务接口、Webservice 二开、国际化，以及用户信息获取、分布式 UUID/锁、线程池、日志输出等辅助功能。

---

## 一、发布接口到开放平台（3.2.5）

### 1. 发布 SAPI 接口

```java
import com.weaver.common.base.entity.result.WeaResult;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/sapi/secondev/workflow/demo")
public class SapiController {

    @GetMapping("/hello")
    public WeaResult<String> hello(@RequestParam("key") String key,
                                   HttpServletRequest request,
                                   HttpServletResponse response) {
        Map<String, Object> datas = new HashMap<>();
        datas.put("msg", "sapi success");
        return WeaResult.success(key);
    }
}
```

### 2. 开放平台调用

访问私有化开放平台文档：`E10地址 + /sp/opendoc`

**接口路径转换规则**：`/sapi` 接口通过开放平台调用时，路径需改为 `/api`，并通过开放平台前缀：

- 原始：`/sapi/secondev/workflow/demo/hello`
- 开放平台调用：`E10地址 + /papi/openapi/api/secondev/workflow/demo/hello`

其中 `/papi/openapi` 为开放平台接口调用前缀，具体前缀请访问私有开放平台文档确认。

---

## 二、二开服务调用标准服务接口（3.2.6）

### 25.0301 基线及以上

#### 调用标准 Dubbo 接口

使用 `SecondRpcUtil` 工具类：

```java
import com.weaver.loom.admittance.entity.SecondRpcEntity;
import com.weaver.loom.admittance.util.SecondRpcUtil;
import com.weaver.teams.security.context.UserContext;
import com.weaver.teams.security.user.User;
import org.springframework.beans.factory.annotation.Autowired;

public class DemoClass {
    @Autowired
    SecondRpcUtil secondRpcUtil;

    public void test() {
        User currentUser = UserContext.getCurrentUser();
        String tenantKey = currentUser.getTenantKey();

        // 构建 RPC 调用实体
        SecondRpcEntity secondRpcEntity = new SecondRpcEntity();
        secondRpcEntity.setGroup("group");                   // dubbo group，无可不填
        secondRpcEntity.setVersion("version");               // dubbo version，无可不填
        secondRpcEntity.setMethodName("methodName");         // 方法名
        secondRpcEntity.setServiceName("com.weaver.xxx.xxx.XxxService"); // 接口全路径

        // 参数类型（支持 Class 和 String 两种方式）
        Class<?>[] classTypes = new Class<?>[3];
        classTypes[0] = String.class;
        classTypes[1] = int.class;
        classTypes[2] = DemoEntity.class;

        String[] stringTypes = new String[3];
        stringTypes[0] = "java.lang.String";
        stringTypes[1] = "int";
        stringTypes[2] = "com.weaver.demo.entity.DemoEntity";

        // 参数值：实体需转成 Map，并标注 class 字段
        Map<String, Object> param3 = new HashMap<>();
        param3.put("class", "com.weaver.demo.entity.DemoEntity");
        param3.put("id", "11111111");
        param3.put("name", "demoName");

        // types 支持 Class 和 String 两种
        Object result = secondRpcUtil.doInvoke(secondRpcEntity, tenantKey,
                classTypes, new Object[]{"参数1", 2, param3});
    }
}
```

#### 调用标准 SAPI 接口

使用 `SecondSapiUtil` 工具类：

```java
import com.weaver.loom.admittance.util.SecondSapiUtil;
import org.springframework.http.MediaType;
import org.springframework.beans.factory.annotation.Autowired;

public class DemoClass {
    @Autowired
    SecondSapiUtil secondSapiUtil;

    // GET 请求
    public void getTestMethod() {
        String getUrl = "/sapi/demo/geturl";
        Map<String, Object> getParams = new HashMap<>();
        getParams.put("param1", "1111");
        getParams.put("param2", 22222L);

        MediaType mediaType = MediaType.APPLICATION_JSON;
        Class<?> responseType = Map.class;
        Map result = (Map) secondSapiUtil.getSapiForObj(getUrl, getParams, mediaType, responseType);
    }

    // POST JSON 请求
    public void postTestMethod() {
        String postUrl = "/sapi/demo/posturl";
        Map<String, Object> params = new HashMap<>();
        params.put("param1", "1111");
        params.put("param2", 22222L);

        Map result = (Map) secondSapiUtil.postSapiForObj(postUrl, params,
                MediaType.APPLICATION_JSON, Map.class);
    }

    // POST Form 请求
    public void postFormMethod() {
        String postUrl = "/sapi/demo/posturl";
        Map<String, Object> params = new HashMap<>();

        Map result = (Map) secondSapiUtil.postSapiForForm(postUrl, params, Map.class);
    }
}
```

### 25.0301 基线之前

```java
import com.weaver.framework.remote.client.rest.RestClient;
import org.springframework.beans.factory.annotation.Autowired;

@Autowired
RestClient restClient;

// 直接使用 RestClient
Map response = restClient.postForObject(headers, "/sapi/dw/connSetting/getConnById",
        request, Map.class);
```

---

## 三、Webservice 二开方案（3.2.10）

基线版本 **10.2024.1001** 及以上支持。

基于 Axis2 框架实现 Webservice 接口二开。具体参阅：[E10 webservice二开方案（axis2）](相关文档链接)

---

## 四、国际化（3.2.11）

### 配置步骤

1. 后端管理中心 → 区域和语言 → 选择**自定义标签**
2. 添加国际化标签（key-value），支持多语言

### 后端读取标签

```java
import com.weaver.common.i18n.label.SystemEnv;
import com.weaver.common.i18n.tool.util.I18nLanguageUtil;
import com.weaver.framework.rpc.context.impl.TenantRpcContext;

public class I18Service {

    public WeaResult<Object> index() {
        Map<String, Object> res = Maps.newHashMap();

        String tenantKey = TenantRpcContext.getTenantKey();
        Long employeeId = TenantRpcContext.getEmployeeIdLong();
        int languageId = I18nLanguageUtil.getLangId(employeeId);
        long labelId = -793306177989820417L;

        String labelVal = SystemEnv.getHtmlLabelName(labelId, languageId, tenantKey, "新建标签");
        res.put("label", labelVal);

        return WeaResult.success(res);
    }
}
```

### 占位符替换

`SystemEnv.getHtmlLabelName` 支持占位符自动替换：

- `{数值}` 为固定占位符标准格式
- `{0}` 的 0 代表数组下标
- `data` 数组中按照对应下标替换占位符

---

## 五、辅助工具（3.2.12）

### 5.1 获取用户租户信息

**API 接口中获取**：

```java
import com.weaver.teams.security.context.UserContext;
import com.weaver.teams.security.user.User;

@GetMapping("/hello")
public WeaResult<String> hello(@RequestParam("key") String key) {
    // 获取当前用户
    final User currentUser = UserContext.getCurrentUser();
    // 用户 employeeId
    final Long employeeId = currentUser.getEmployeeId();
    // 租户 key
    final String tenantKey = currentUser.getTenantKey();
    return WeaResult.success(key);
}
```

**Action 接口中获取**：

```java
import com.weaver.framework.rpc.context.impl.TenantRpcContext;

@Override
public WeaResult<Map<String, Object>> execute(Map<String, Object> params) {
    // 前提：当前请求上下文中存在用户、租户信息
    // 定时任务、未登录等场景下无法获取
    final String currentEmployeeId = TenantRpcContext.getCurrentEmployeeId();
    final String tenantKey = TenantRpcContext.getTenantKey();
    // ...
}
```

> `/papi` 接口无需登录即可访问，上下文中没有用户/租户信息，无法通过此方式获取。

### 5.2 分布式 UUID

基于雪花算法实现：
- **长度**：18 位
- **类型**：纯数字（long 型）
- **是否趋势增长**：是

```java
import com.weaver.common.distribution.genid.IdGenerator;

// 获取一个 ID
long id = IdGenerator.generate();

// 获取一批 ID，size 为个数，顺序递增
long[] ids = IdGenerator.generateRangeId(int size);
```

### 5.3 分布式锁

通过 `DistributionLockInterface` 统一接口调用，支持 Redis 单机版、Redis 集群版、数据库版等自由切换。

```java
import com.weaver.common.distribution.lock.DistributionLockInterface;
import org.springframework.beans.factory.annotation.Autowired;

@RestController
@RequestMapping("/lock")
public class LockController {
    private static Logger log = LoggerFactory.getLogger(LockController.class);

    @Autowired
    private DistributionLockInterface distributionLock;

    @GetMapping("/test")
    public String test(String key) throws Exception {
        // ⚠️ tryLock() 必须在 try 代码块外面！
        // 方式一：使用默认锁生命周期
        // distributionLock.tryLock(key);

        // 方式二：设置锁生命周期
        try {
            distributionLock.tryLock(lockKey, expireTime);
            // todo 业务逻辑
        } catch (Exception e) {
            log.error("error ", e);
        } finally {
            distributionLock.unLock(lockKey);
        }
        return "success";
    }
}
```

**关键注意**：`distributionLock.tryLock()` 方法一定要在 `try{ }` 代码块**外面**调用！

### 5.4 线程池组件

核心类：`com.weaver.common.threadPool.ThreadPoolUtil`

**适用范围**：仅适用于 `Runnable` 接口，不适用 `Callable` 接口。如有 Callable 业务需要，请自行使用线程池创建并确保关闭。

**二开模块标识**：`ModulePoolEnum.erkai`

```java
import com.weaver.common.threadPool.ThreadPoolUtil;
import com.weaver.common.threadPool.constant.ModulePoolEnum;
import com.weaver.common.threadPool.entity.LocalRunnable;

// 方式一：普通异步执行（并发量/延时要求低，优先选用）
ThreadPoolUtil.execute(localRunnable);

// 方式二：固定线程池执行（并发量/延时要求高）
ThreadPoolUtil.fixedPoolExecute(ModulePoolEnum.erkai, "functionName", localRunnable);
```

**方法说明**：

| 方法 | 核心线程 | 最大线程 | 适用场景 |
|------|---------|---------|---------|
| `execute()` | 0 | 10 | 低并发、低延时 |
| `fixedPoolExecute()` | 与最大线程相同 | 模块默认 | 高并发、高延时 |

### 5.5 日志输出

E10 服务默认输出级别为 **ERROR**。

**二开日志文件**：
- `logs/sys-secondev.log` — 二开代码日志
- `logs/sys-err.log` — 错误日志
- 可通过运维平台下载

```java
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/api/secondev/demo")
public class HelloController {

    private static final Logger log = LoggerFactory.getLogger(HelloController.class);

    @GetMapping("/hello")
    public WeaResult<String> hello(@RequestParam("msg") String msg) {
        log.info("request params is {}", msg);
        try {
            int number = Integer.parseInt(msg);
        } catch (NumberFormatException e) {
            log.error("request parse error {}", e);
        }
        return WeaResult.success("Hello, " + msg);
    }
}
```

---

## 快速参考

| 功能 | 关键类/方法 | 说明 |
|------|-----------|------|
| 开放平台前缀 | `/papi/openapi/api/...` | /sapi 转为 /api 后拼接 |
| Dubbo 调用 | `SecondRpcUtil.doInvoke()` | 25.0301+ 基线 |
| SAPI GET | `SecondSapiUtil.getSapiForObj()` | 25.0301+ 基线 |
| SAPI POST | `SecondSapiUtil.postSapiForObj()` | JSON/Form 两种方式 |
| Webservice | Axis2 | 10.2024.1001+ |
| 国际化读取 | `SystemEnv.getHtmlLabelName()` | 支持占位符替换 |
| 获取当前用户 | `UserContext.getCurrentUser()` | 仅 /api 接口可用 |
| Action 中获取用户 | `TenantRpcContext.getCurrentEmployeeId()` | 需上下文存在 |
| 分布式 UUID | `IdGenerator.generate()` | 雪花算法 18 位 |
| 分布式锁 | `DistributionLockInterface.tryLock()` | tryLock 必须在 try 外 |
| 线程池 | `ThreadPoolUtil.execute()` | 仅 Runnable |
| 日志 | `LoggerFactory.getLogger()` | 输出到 sys-secondev.log |
