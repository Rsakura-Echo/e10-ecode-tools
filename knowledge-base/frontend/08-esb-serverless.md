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

### 自定义动作流介绍

自定义动作流支持自定义输入、输出参数，借用动作流内、外部集成能力，可以快速完成内部模块间数据集成、内部系统与外部系统间集成。

### 方式一：HTTP 方式触发（ecode/JS 推荐）

#### 0. 参数准备

配置好自定义动作流后，获取触发参数：

```json
{
    "customParams": {
        "mainTable": {
            "dataId": "#可选",
            "docType": "#可选"
        }
    },
    "moduleSource": "#可选",
    "esbFlowId": "1764943003169984583"
}
```

**参数说明**：

| 参数 | 类型 | 说明 |
|------|------|------|
| esbFlowId | String | 动作流 ID（**必填**） |
| moduleSource | String | 模块来源标识，ecode 触发时填 `"ecode"` |
| customParams | JSONObject | 自定义触发参数，按需求替换，去掉 `#可选`/`#必填` 标注 |

封装触发参数时，按照需求替换自定义字段值即可。

#### 1. HTTP 调用

```
POST /api/esb/server/event/triggerActionFlow
Content-Type: application/json
```

**注意**：需要走 E10 登录验证（eteamsId）。

**调用示例**：

```js
import { request } from '@weapp/utils';

request({
  method: 'post',
  url: '/api/esb/server/event/triggerActionFlow',
  data: {
    customParams: { mainTable: {} },
    moduleSource: 'ecode',
    esbFlowId: '846583664090419200',
  },
}).then((res) => {
  if (res.resultCode && res.resultCode == '200') {
    // 执行成功
  }
});
```

**响应判断**：通过 `res.resultCode == '200'`（字符串比较）判断成功，**不是** `res.data.status`。

### 方式二：SDK 方式触发（Java）

#### 引入 SDK

```xml
<dependency>
   <groupId>com.weaver</groupId>
   <artifactId>weaver-esb-server-api</artifactId>
</dependency>
```

> 注意：如果在 ecode 中使用 SDK 需要上传此 JAR 包。

#### 触发自定义动作流

```java
@Autowired
private EsbActionFlow esbActionFlow;

/**
 * 执行动作流，指定超时时间
 * @param params     EventParams 触发参数
 * @param tenantKey  租户 key
 * @param timeout    自定义超时时间，单位 s
 */
esbActionFlow.customTriggerEsbFlow(eventParams, tenantKey, timeout);
```

**EventParams 需要传的参数**：

| 参数 | 说明 |
|------|------|
| esbFlowId | 动作流 ID |
| employeeId | 人员 ID |
| source | 触发源模块标识（ecode 触发填 `"ecode"`） |
| customParams | 自定义触发参数（同步骤 0 中准备的参数） |

> 注意：SDK 方式触发动作流，执行消息通过 E10 基座 MQ 发送，需要确保 MQ 正常安装并使用。

### 方式三：唯一值触发（不推荐）

#### 背景

通过 ecode 或 JS 代码触发自定义动作流需要传动作流 ID（esbFlowId），但动作流 ID 在导入导出或复制过程中会产生变化。为解决此问题，动作流会生成唯一标识（uniqueIndent），此标识在导入导出、复制过程中不变。

#### 获取唯一值

在 `esb_setting` 库（私有化下为 `weaver-esb-setting` 服务对应数据库）查询：

```sql
SELECT ea.primary_key FROM esb_application ea WHERE id = '动作流ID';
```

#### 替换参数

拿到唯一值后：
- **HTTP 方式**：参数中**不传 `esbFlowId`**，改传 `uniqueIndent`（值为查出的 `primary_key`）
- **SDK 方式**：EventParams 中**不封装 `esbFlowId`**，改为封装 `uniqueIndent`

> 注意：存在同一租户下多个动作流唯一值相同的情况（如同一动作流迁入/复制多次），此时只执行创建时间（create_time）最新的动作流。

> 更新于 2026-05-26，来源：ecode 自定义动作流对接文档
