# 14 - 缓存操作

## 缓存注册（必须）

使用缓存前，必须在模块内定义一个存放缓存 key 的常量文件，并实现 `ModuleCacheInterface` 接口。

### 步骤 1：定义缓存常量

```java
package com.weaver.seconddev.cache.cons;

public interface SecDemoModule {
    // 模块名（secondev + 业务名），用于缓存隔离
    public final static String MODULE = "SECONDEV_WORKFLOW";
    // 缓存 key
    public final static String CACHE_KEY = "SEC_KEY";
}
```

### 步骤 2：注册缓存模块

```java
package com.weaver.seconddev.cache.service;

import com.weaver.common.cache.base.BaseCache;
import com.weaver.common.cache.base.ModuleCacheInterface;
import com.weaver.seconddev.cache.cons.SecDemoModule;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;

@Service
public class TestWorkflowCacheKey implements ModuleCacheInterface {

    @Autowired
    private BaseCache baseCache;

    @PostConstruct
    @Override
    public void register() throws IllegalAccessException {
        /**
         * 参数1：模块名常量（变量名和值必须一致，否则启动时抛出异常）
         * 参数2：当前类
         */
        baseCache.register(SecDemoModule.MODULE, this.getClass());
    }
}
```

**注意**：
- 缓存 key 常量必须以 `SECONDEV_` 为前缀
- 常量变量名和变量值必须完全一致，注册时检测
- 自定义 key 命名也必须以 `SECONDEV_` 为前缀

### 步骤 3：使用缓存

```java
package com.weaver.seconddev.cache.controller;

import com.weaver.common.cache.base.BaseCache;
import com.weaver.seconddev.cache.cons.SecDemoModule;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/seconddev/cache")
public class CacheController {

    @Autowired
    BaseCache baseCache;

    /**
     * 设置缓存
     * 参数：模块名, key, value, 过期时间(秒)
     */
    @PostMapping("/add")
    public Object addCache() {
        return baseCache.set(
            SecDemoModule.MODULE,
            SecDemoModule.CACHE_KEY,
            "cache msg ......",
            60 * 60  // 1小时过期
        );
    }

    /**
     * 获取缓存
     */
    @RequestMapping("/get")
    public Object getCache() {
        return baseCache.get(SecDemoModule.MODULE, SecDemoModule.CACHE_KEY);
    }

    /**
     * 删除缓存
     */
    @PostMapping("/del")
    public Object delCache() {
        return baseCache.del(SecDemoModule.MODULE, SecDemoModule.CACHE_KEY);
    }
}
```

## 缓存操作速查

| 方法 | 说明 | 参数 |
|------|------|------|
| `baseCache.register(module, class)` | 注册缓存模块 | module常量, this.getClass() |
| `baseCache.set(module, key, value)` | 存入缓存 | 模块, key, value |
| `baseCache.set(module, key, value, ttl)` | 存入缓存+过期 | 模块, key, value, 过期秒数 |
| `baseCache.get(module, key)` | 获取缓存 | 模块, key |
| `baseCache.del(module, key)` | 删除缓存 | 模块, key |
