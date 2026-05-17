# 18 - 二开服务调用标准服务（RPC / SAPI）

## 概述

二开服务中可通过 Dubbo RPC 或 REST API 调用 E10 标准服务。

## 方式一：调用标准 Dubbo 接口

### 通过 @RpcReference 注入（推荐，25.0301基线+）

```java
import com.weaver.framework.rpc.annotation.RpcReference;
import com.weaver.ecode.api.rpc.EcodeService;
import com.weaver.workflow.list.api.rest.publicapi.WflRequestListRest;

@RestController
@RequestMapping("/api/secondev/demo")
public class DemoController {

    @RpcReference(timeout = 10000)
    EcodeService ecodeService;

    @RpcReference(timeout = 2000, group = "workflow")
    WflRequestListRest wflRequestListRest;

    @GetMapping("/rpc")
    public WeaResult<Object> rpc(@RequestParam("key") String key) {
        // 调用 ecode 服务
        final FolderDto query = ecodeService.query(Long.valueOf(key));
        return WeaResult.success(query);
    }

    @GetMapping("/getRequestList")
    public WeaResult<?> callWorkflow(@RequestParam("tabId") int tabId) {
        final SimpleEmployee currentUser = UserContext.getCurrentUser();
        final WeaResult<List<RequestListInfoPAEntity>> result =
            wflRequestListRest.getRequestListByTabId(currentUser, tabId, 1, 10, null);

        if (result.getCode() == 200) {
            // 处理数据
            result.getData().forEach(item -> {
                // ...
            });
        }
        return result;
    }
}
```

### 通过 SecondRpcUtil 调用（25.0301基线+）

```java
import com.weaver.loom.admittance.entity.SecondRpcEntity;
import com.weaver.loom.admittance.util.SecondRpcUtil;

@Autowired
SecondRpcUtil secondRpcUtil;

public void test() {
    User currentUser = UserContext.getCurrentUser();
    String tenantKey = currentUser.getTenantKey();

    // 构建 RPC 调用实体
    SecondRpcEntity rpcEntity = new SecondRpcEntity();
    rpcEntity.setGroup("group");                              // dubbo group（可选）
    rpcEntity.setVersion("version");                          // dubbo version（可选）
    rpcEntity.setMethodName("methodName");                    // 方法名
    rpcEntity.setServiceName("com.weaver.xxx.xxx.XxxService"); // 接口全路径

    // 参数类型（支持 Class 和 String 两种方式）
    Class<?>[] classTypes = new Class<?>[]{
        String.class,       // 参数1类型
        int.class,          // 参数2类型
        DemoEntity.class    // 参数3类型（实体）
    };

    String[] stringTypes = new String[]{
        "java.lang.String",
        "int",
        "com.weaver.demo.entity.DemoEntity"
    };

    // 参数值
    String param1 = "参数1";
    int param2 = 2;

    // 实体参数需要转成 Map，可增加 "class" 字段标注全类名
    Map<String, Object> param3 = new HashMap<>();
    param3.put("class", "com.weaver.demo.entity.DemoEntity");
    param3.put("id", "11111111");
    param3.put("name", "demoName");

    // 调用（参数顺序必须与方法参数顺序一致）
    Object result = secondRpcUtil.doInvoke(
        rpcEntity, tenantKey, classTypes,
        new Object[]{param1, param2, param3}
    );
}
```

## 方式二：调用标准 SAPI 接口

### 通过 SecondSapiUtil（25.0301基线+）

```java
import com.weaver.loom.admittance.util.SecondSapiUtil;
import org.springframework.http.MediaType;

@Autowired
SecondSapiUtil secondSapiUtil;

// GET 请求
public void getTestMethod() {
    String url = "/sapi/demo/geturl";
    Map<String, Object> params = new HashMap<>();
    params.put("param1", "1111");
    params.put("param2", 22222L);

    Map result = (Map) secondSapiUtil.getSapiForObj(
        url, params, MediaType.APPLICATION_JSON, Map.class
    );
}

// POST JSON 请求
public void postTestMethod() {
    String url = "/sapi/demo/posturl";
    Map<String, Object> params = new HashMap<>();
    params.put("param1", "1111");

    Map result = (Map) secondSapiUtil.postSapiForObj(
        url, params, MediaType.APPLICATION_JSON, Map.class
    );
}

// POST Form 请求
public void postFormMethod() {
    String url = "/sapi/demo/posturl";
    Map<String, Object> params = new HashMap<>();
    params.put("param1", "1111");

    Map result = (Map) secondSapiUtil.postSapiForForm(
        url, params, Map.class
    );
}
```

### 通过 RestClient（25.0301基线之前）

```java
import com.weaver.framework.remote.client.rest.RestClient;

@Autowired
RestClient restClient;

public void callSapi() {
    Map<String, Object> request = new HashMap<>();
    Map response = restClient.postForObject(
        headers,
        "/sapi/dw/connSetting/getConnById",
        request,
        Map.class
    );
}
```

## 调用方式对照

| 方式 | 适用场景 | 基线版本 |
|------|----------|----------|
| `@RpcReference` | 调用已知 Dubbo 服务接口 | 25.0301+ |
| `SecondRpcUtil.doInvoke()` | 动态调用任意 Dubbo 服务 | 25.0301+ |
| `SecondSapiUtil` | 调用标准 SAPI 接口 | 25.0301+ |
| `RestClient` | 调用 REST 接口 | 所有版本 |

## 注意事项

1. 实体参数需要转成 Map 传递，可加 `"class"` 字段标注全类名
2. 参数顺序必须与方法声明顺序一致
3. `RpcReference` 的 `timeout` 单位是毫秒
