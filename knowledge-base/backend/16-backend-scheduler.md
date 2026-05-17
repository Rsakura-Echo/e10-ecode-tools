# 16 - 分布式定时任务

## 概述

使用 `@ESchedulerHandler` 注解定义分布式定时任务，支持自定义 cron 表达式。

## 示例

```java
package com.weaver.seconddev.escheduler;

import com.weaver.common.escheduler.context.ESchedulerJobHelper;
import com.weaver.common.escheduler.handler.annotation.ESchedulerHandler;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
public class DemoEscheduler {

    private static final Logger log = LoggerFactory.getLogger(DemoEscheduler.class);

    /**
     * value: 任务名称（全局唯一）
     * cron:  cron 表达式定义执行时间
     *        "0/10 * * * * ?" 表示每10秒执行一次
     */
    @ESchedulerHandler(value = "demoJobHandler", cron = "0/10 * * * * ?")
    public void demoJobHandler() throws Exception {
        log.info("demoJobHandler running");

        try {
            // 获取页面上配置的任务参数
            final String jobParam = ESchedulerJobHelper.getJobParam();
            // 执行业务逻辑
            // ...

        } catch (Exception e) {
            log.error("demoJobHandler error", e);
        }

        // 输出日志到任务日志面板
        ESchedulerJobHelper.log("ESchedulerHandler, Hello World.");
    }
}
```

## 注解参数说明

| 参数 | 说明 |
|------|------|
| `value` | 任务名称，全局唯一标识 |
| `cron` | cron 表达式，定义执行时间规则 |

## 常用 Cron 表达式

| 表达式 | 说明 |
|--------|------|
| `0/10 * * * * ?` | 每10秒 |
| `0 0/1 * * * ?` | 每1分钟 |
| `0 0 * * * ?` | 每1小时 |
| `0 0 2 * * ?` | 每天凌晨2点 |
| `0 0 2 1 * ?` | 每月1号凌晨2点 |
| `0 0 10 ? * MON-FRI` | 工作日早上10点 |

## 辅助工具

| 方法 | 说明 |
|------|------|
| `ESchedulerJobHelper.getJobParam()` | 获取任务配置时传入的参数 |
| `ESchedulerJobHelper.log(msg)` | 输出日志到任务执行日志面板 |

## 注意事项

1. 方法签名必须为 `public void xxx() throws Exception`
2. `value` 必须全局唯一，不可重复
3. 异常应自行捕获处理，避免影响后续调度
4. 定时任务在任务管理页面可查看执行日志和状态
