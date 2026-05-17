# 17 - 配置管理

## 配置文件体系

### 1. 标准二开服务配置

配置文件：`weaver-secondev-service.properties`

- **单体环境**：`二开服务/webapps/ROOT/WEB-INF/classes/weaver/config/config-center/`
- **微服务环境**：Nacos → 配置列表
- 单体修改后需重启服务生效

```java
package com.weaver.seconddev.prop;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.context.config.annotation.RefreshScope;
import org.springframework.context.annotation.Configuration;

/**
 * @RefreshScope: 配置中心管理时支持自动刷新同步
 */
@Configuration
@RefreshScope
public class SecDevProperty {

    @Value("${weaver.secondev.custom.url}")
    private String moduleName;

    @Value("${weaver.secondev.custom.data:123}")   // 默认值 123
    private String customData;

    @Value("${weaver.secondev.custom.key:abc}")    // 默认值 abc
    private String customKey;

    // getters...
    public String getModuleName() { return moduleName; }
    public String getCustomData() { return customData; }
    public String getCustomKey() { return customKey; }
}
```

### 2. 自定义配置文件

新增配置文件，建议以 `weaver-secondev-` 作为前缀。需要注册到配置中心：

```java
package com.weaver.custom.configcenter;  // ⚠️ 包路径必须固定！

import com.weaver.framework.client.annotation.WeaverConfigCenter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

/**
 * dataId: 自定义配置文件名，如 weaver-sec-service.properties
 * group: 配置分组，默认 DEFAULT_GROUP
 * refresh: 是否动��刷新，默认 false
 */
@Configuration
@WeaverConfigCenter(sources = {
    @WeaverConfigCenter.ConfigProperty(
        dataId = "weaver-sec-service.properties",
        group = "DEFAULT_GROUP",
        refresh = "true"
    )
})
public class SecConfig {

    @Value("${secondev.key}")
    private String key;

    public String getKey() {
        return key;
    }
}
```

## 配置规则总结

| 配置类型 | 文件名 | 注册方式 |
|----------|--------|----------|
| 标准二开配置 | `weaver-secondev-service.properties` | 自动加载，`@RefreshScope` 即可 |
| 自定义配置 | 自拟（建议 `weaver-secondev-` 前缀） | 需在固定包路径 `com.weaver.custom.configcenter` 中用 `@WeaverConfigCenter` 注册 |

## 注意事项

1. 自定义配置注册类必须放在固定包路径：`com.weaver.custom.configcenter`
2. 注册类的类名必须唯一，不能与其他二开 jar 包中的注册类重名
3. 一个服务只需要引入一次注册类，不需要多个 jar 包重复注册
4. XML 修改后需要重启服务才能生效
5. 先部署代码再修改 XML 配置，否则服务启动异常
