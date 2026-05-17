# 13 - ESB Action 开发

## 概述

ESB Action 用于扩展 ESB 动作流，可通过可视化拖拽方式在动作流中被调用。

## 完整开发步骤

### 步骤 1：编写 Action 实现类

```java
package com.weaver.seconddev.action;

import com.alibaba.fastjson.JSON;
import com.weaver.common.base.entity.result.WeaResult;
import com.weaver.esb.api.rpc.EsbServerlessRpcRemoteInterface;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service("esbDemoAction")  // bean名称，需与XML中ref一致
public class EsbDemoAction implements EsbServerlessRpcRemoteInterface {

    private static final Logger log = LoggerFactory.getLogger(EsbDemoAction.class);

    @Override
    public WeaResult<Map<String, Object>> execute(Map<String, Object> params) {
        log.info("ESB Action 被调用, params: {}", JSON.toJSONString(params));

        // 从动作流传入的参数中读取数据
        String inputParam = (String) params.get("inputParamName");

        // 业务处理逻辑
        // ...

        // 将处理结果放入 params 返回给动作流
        params.put("outputParam", "处理结果");

        return WeaResult.success(params);
    }
}
```

### 步骤 2：配置 Dubbo XML

在 `src/main/resources/applicationContext-secondev-secondev-dubbo.xml` 中注册：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:dubbo="http://code.alibabatech.com/schema/dubbo"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
       http://www.springframework.org/schema/beans/spring-beans-4.0.xsd
       http://code.alibabatech.com/schema/dubbo
       http://code.alibabatech.com/schema/dubbo/dubbo.xsd">

    <dubbo:service ref="esbDemoAction"
                   interface="com.weaver.esb.api.rpc.EsbServerlessRpcRemoteInterface"
                   group="esbDemoActionGroup" />
</beans>
```

| 属性 | 说明 |
|------|------|
| `ref` | Action 类的 bean 名称（对应 `@Service("xxx")`） |
| `interface` | **固定值**，必须是 `EsbServerlessRpcRemoteInterface` |
| `group` | 自定义分组标识，全局唯一，用于在动作流中定位此Action |

### 步骤 3：部署

1. Gradle 构建 → 打包 jar
2. 访问 `/ecode/monitor/loom/deploy/jar` 上传 jar 包
3. **注意：先部署代码，再发布 XML 配置！如果只改 XML 未部署代码，会导致服务启动异常！**
4. XML 可以通过监控平台编辑并保存（Ctrl+S / Command+S）
5. 重启二开服务

### 步骤 4：在 ESB 动作流中配置

1. 进入 ESB 动作流设计器
2. 添加「代码」→「serverless/action」节点
3. 填入分组标识（group）：`esbDemoActionGroup`
4. 配置版本号（version）：如果有则填，没有可不填
5. 配置输入参数：定义从动作流上下文中传入的变量名
6. 配置输出参数：定义 Action 返回后写入动作流上下文的变量名

## 在 Action 中使用标准服务

```java
@Service("esbDemoAction")
public class EsbDemoAction implements EsbServerlessRpcRemoteInterface {

    @Override
    public WeaResult<Map<String, Object>> execute(Map<String, Object> params) {
        // 通过 SpringUtil 获取 Bean（Action 中不能直接 @Autowired）
        final DataSetService bean = SpringUtil.getBean(DataSetService.class);

        // 使用标准服务执行数据库操作
        // ...

        return WeaResult.success(params);
    }
}
```

## 数据流说明

```
ESB动作流                    Action (后端)
┌──────────┐               ┌──────────────┐
│ 输入参数  │ ─────────────→│ params.get() │
│ (配置)    │               │ 业务处理     │
│          │               │ params.put() │
│ 输出参数  │ ←─────────────│ 返回结果     │
│ (自动回写) │               │              │
└──────────┘               └──────────────┘
```
