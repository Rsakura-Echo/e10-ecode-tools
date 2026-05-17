# 08 - ESB 动作流与 Serverless

## ESB 动作流概述

ESB（企业服务总线）动作流是 E10 的低代码流程编排引擎，可通过可视化拖拽方式编排业务流程。

在 ecode 中，可以通过自定义 Action 和 Serverless 函数来扩展 ESB 动作流。

## 自定义 Action 开发（后端）

### 步骤 1：编写 Action 实现类

```java
package com.weaver.seconddev.demo.controller;

import com.alibaba.fastjson.JSON;
import com.weaver.common.base.entity.result.WeaResult;
import com.weaver.esb.api.rpc.EsbServerlessRpcRemoteInterface;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Map;

@Slf4j
@Service("esbDemoAction")
public class DemoAction implements EsbServerlessRpcRemoteInterface {

    @Override
    public WeaResult<Map<String, Object>> execute(Map<String, Object> params) {
        // 从动作流中配置的输入参数可从 params 中读取
        log.info("params: {}", JSON.toJSONString(params));
        params.put("extral", "123");
        return WeaResult.success(params);
    }
}
```

### 步骤 2：配置 XML（需重启服务）

修改 `resources/applicationContext-secondev-secondev-dubbo.xml`：

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

### 步骤 3：在 ESB 动作流中配置

在动作流中添加「代码」→「serverless/action」：
- 填入分组标识（group）：`esbDemoActionGroup`
- 版本号（version）：对应 dubbo 配置
- 配置输入参数和输出参数

## 从 ESB 动作流传入的 params 参数

动作流中配置的输入参数可以从 `params` Map 中读取：

```java
@Override
public WeaResult<Map<String, Object>> execute(Map<String, Object> params) {
    String inputValue = (String) params.get("输入参数名");
    // 业务逻辑...
    return WeaResult.success(resultMap);
}
```

## Serverless 函数

### 常见问题
- 函数调用超时范围：3秒 ~ 10分钟
- 函数调用提示 "token为空或失效"：检查认证配置
- 函数调用提示 "Func with funcId xxx does not exist"：检查函数ID

### 从 ESB 动作流调用 Serverless Action

动作流中可以配置调用自定义的 Serverless Action：
1. 在动作流中添加动作节点
2. 选择「代码」→「serverless/action」
3. 填入对应的 group 和 version
4. 根据需要配置输入输出参数

## 前端调用 ESB 动作流

前端通常通过后端 API 间接触发 ESB 动作流：

```js
import axios from 'axios';

// 调用后端API，由后端触发ESB动作流
axios.post('/api/secondev/esb/trigger', {
  flowId: 'xxx',
  params: {
    startDate: '2024-01-01',
    endDate: '2024-12-31'
  }
}).then(res => {
  console.log(res.data);
});
```

或在二开后端中通过 SDK 触发：

```java
// 二开后端调用 ESB 动作流
// 通过 EsbServerlessRpcRemoteInterface 调用
```
