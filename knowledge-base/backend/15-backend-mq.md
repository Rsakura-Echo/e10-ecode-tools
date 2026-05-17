# 15 - 消息队列

## 概述

E10 消息队列基于异步消息组件，支持 Queue（点对点）模式。

## 生产者（发送消息）

```java
package com.weaver.seconddev.mq;

import com.weaver.common.async.bean.AsyncBean;
import com.weaver.common.async.producer.client.AsyncClient;
import com.weaver.common.base.entity.result.WeaResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/secondev/mq")
public class Producer {

    @Autowired
    private AsyncClient asyncClient;           // 注入消息生产者

    @RequestMapping("/test")
    public WeaResult<Boolean> sendMsg() {
        new Thread(() -> {
            String mqQueue = "secondev_test";  // 队列名
            for (int index = 0; index <= 10; index++) {
                AsyncBean asyncBean = new AsyncBean();
                asyncBean.setQueue(mqQueue);            // 指定目标队列
                asyncBean.setMessage("test_" + index);   // 消息内容（可序列化对象）
                this.asyncClient.send(asyncBean);         // 发送消息

                try {
                    Thread.sleep(1000);
                } catch (InterruptedException e) {
                }
            }
        }).start();

        return WeaResult.success(true);
    }
}
```

### 关键点

| 步骤 | 说明 |
|------|------|
| `AsyncBean.setQueue()` | 指定目标队列名称 |
| `AsyncBean.setMessage()` | 消息内容，可以是任意可序列化对象 |
| `asyncClient.send()` | 发送消息 |

## 消费者（接收消息）

```java
package com.weaver.seconddev.mq;

import com.weaver.common.async.bean.AsyncBean;
import com.weaver.common.async.consumer.anno.method.AsyncListener;
import com.weaver.common.async.consumer.bean.listener.AsyncListenerResultBean;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Component
public class Consumer {

    private final Logger log = LoggerFactory.getLogger(Consumer.class);

    /**
     * @AsyncListener queues: 监听的队列名称
     */
    @AsyncListener(queues = "secondev_test")
    public AsyncListenerResultBean receive(AsyncBean<String> message) {
        AsyncListenerResultBean result = new AsyncListenerResultBean();

        log.info("consumer_" + Thread.currentThread().getId()
                 + " ::: " + message.getMessage());

        // 处理消息...
        // message.getMessage() 获取消息内容

        result.setStatus(true);  // 返回处理成功
        return result;
    }
}
```

### 关键点

| 注解/方法 | 说明 |
|-----------|------|
| `@AsyncListener(queues = "队列名")` | 声明监听的队列 |
| `AsyncBean<String>` | 接收消息，泛型为消息类型 |
| `message.getMessage()` | 获取消息内容 |
| `result.setStatus(true)` | 确认消费成功 |

## 完整流程

```
生产者 (Producer)                队列                 消费者 (Consumer)
┌──────────────┐           ┌──────────┐           ┌──────────────┐
│ asyncClient  │──send──→  │ secondev │──receive→ │ @AsyncListener│
│ .send(bean)  │           │ _test    │           │ .receive()    │
└──────────────┘           └──────────┘           └──────────────┘
```

## 注意

- 队列名称自定义，生产者和消费者需保持一致
- 消息内容建议使用可序列化的对象
- 消费者日志输出到 `sys-secondev.log`
