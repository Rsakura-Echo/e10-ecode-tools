# 12 - 数据库操作

## 概述

二开通过 dataSource API 执行 SQL，支持内部数据源（LOGIC）和外部数据源（EXTERNAL）。

## 数据源类型

| 枚举值 | 说明 |
|--------|------|
| `LOGIC` | 内部数据源（OA各模块业务数据/逻辑表） |
| `EXTERNAL` | 外部数据源（数据加工中配置的外部连接） |
| `FORM` | ebuilder 表单数据 |
| `ETEAMS` | 数据仓库 |

## 公共数据库表

E10 部署后默认有公共数据库 `eteams`，存放公共表。操作时需指定库名：

```sql
-- {$publicdb} 表示公共库名（24.1101基线开始支持）
SELECT id, name FROM {$publicdb}.EMPLOYEE WHERE id = ? AND delete_type = 0
```

## 步骤 1：获取数据源分组

在执行业务 SQL 之前，需要找到目标表所在的 groupId：

```java
@Service
public class DataBaseService {

    @Autowired
    CommonRestService commonRestService;
    @Autowired
    private RestClient restClient;

    /**
     * 根据 sourceType 获取数据库分组列表
     * @param sourceType 枚举：LOGIC / EXTERNAL / FORM / ETEAMS
     */
    public Map<String, Object> getDataGroups(String sourceType) {
        // 拼接参数
        MultiValueMap<String, Object> valueMap = new LinkedMultiValueMap<>();
        valueMap.add("sourceType", sourceType);

        // 拼接请求头（携带租户/用户信息）
        HttpHeaders requestHeaders = getHttpHeaders();
        List<MediaType> acceptTypes = new ArrayList<>();
        acceptTypes.add(MediaType.APPLICATION_JSON);
        requestHeaders.setAccept(acceptTypes);
        requestHeaders.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        // 调用 SAPI 接口获取分组
        return restClient.postForObject(
            requestHeaders,
            "/sapi/datasource/ds/group",
            valueMap,
            Map.class
        );
    }
}
```

**LOGIC 出参示例**：
```json
[
    {
      "name": "流程",
      "serviceMark": "workflow",
      "id": "weaver-workflow-report-serviceworkflowreport"
    },
    {
      "name": "任务",
      "serviceMark": "task",
      "id": "weaver-project-servicetask"
    },
    {
      "name": "日志",
      "serviceMark": "elog",
      "id": "weaver-elog-service"
    },
    {
      "name": "会议",
      "serviceMark": "meeting",
      "id": "weaver-meeting-service"
    },
    {
      "name": "OKR",
      "serviceMark": "goal",
      "id": "weaver-wr-goal-service"
    },
    {
      "name": "流程列表",
      "serviceMark": "workflow",
      "id": "weaver-workflow-list-service"
    },
    {
      "name": "考勤",
      "serviceMark": "attend",
      "id": "weaver-attend-service"
    },
    {
      "name": "组织画像",
      "serviceMark": "portrait",
      "id": "weaver-portrait-service"
    },
    {
      "name": "工作流报告",
      "serviceMark": "workflow",
      "id": "weaver-workflow-report-serviceworkflow_report"
    },
    {
      "name": "绩效",
      "serviceMark": "kpi",
      "id": "weaver-wr-performance-service"
    },
    {
      "name": "项目",
      "serviceMark": "mainline",
      "id": "weaver-project-service"
    },
    {
      "name": "基础定时模块",
      "serviceMark": "escheduler",
      "id": "weaver-basic-schedule-service"
    },
    {
      "name": "HRM",
      "serviceMark": "hrm",
      "id": "weaver-hrm-service"
    },
    {
      "name": "e-builder报表",
      "serviceMark": "",
      "id": "weaver-edcreportd-service"
    },
    {
      "name": "e-builder应用",
      "serviceMark": "ebuilder",
      "id": "weaver-ebuilder-app-service"
    },
    {
      "name": "e-builder表单",
      "serviceMark": "ebuilder",
      "id": "weaver-ebuilder-form-service"
    },
    {
      "name": "文件",
      "serviceMark": "file",
      "id": "weaver-file-service"
    },
    {
      "name": "公文管理",
      "serviceMark": "odoc",
      "id": "weaver-odoc-service"
    },
    {
      "name": "数据源",
      "serviceMark": "datasource",
      "id": "weaver-datasource-service"
    },
    {
      "name": "计划报告",
      "serviceMark": "workreport",
      "id": "weaver-wr-plan-service"
    },
    {
      "name": "电子签",
      "serviceMark": "signcontract",
      "id": "weaver-signcenter-service"
    },
    {
      "name": "动作流监控",
      "serviceMark": "esb",
      "id": "weaver-esb-setting-serviceesb"
    },
    {
      "name": "表单加密",
      "serviceMark": "datasecurity",
      "id": "weaver-datasecurity"
    },
    {
      "name": "人事",
      "id": "weaver-hr-service"
    },
    {
      "name": "动作流",
      "serviceMark": "esb",
      "id": "weaver-esb-setting-serviceesbCustom"
    },
    {
      "name": "绩效核算",
      "serviceMark": "ebuilder",
      "id": "weaver-ebuilder-contract-servicecmdatauFJXHS"
    },
    {
      "name": "EB合同管理",
      "id": "weaver-ebuilder-contract-service"
    },
    {
      "name": "待办事项",
      "id": "weaver-my-service"
    },
    {
      "name": "签名",
      "id": "weaver-signature-service"
    },
    {
      "name": "邮件",
      "serviceMark": "email",
      "id": "weaver-mail-base-service"
    },
    {
      "name": "薪酬",
      "serviceMark": "hrmsalary",
      "id": "weaver-hrm-salary"
    },
    {
      "name": "系统安全",
      "serviceMark": "",
      "id": "weaver-security-framework-service"
    },
    {
      "name": "公文交换中心",
      "serviceMark": "odocexchange",
      "id": "weaver-odocexchange-service"
    },
    {
      "name": "招聘管理",
      "serviceMark": "recruit",
      "id": "weaver-recruit-service"
    },
    {
      "name": "基础在线服务",
      "id": "weaver-basic-online-web-service"
    },
    {
      "name": "微搜",
      "id": "weaver-esearch-search-service"
    },
    {
      "name": "统一审批中心",
      "serviceMark": "intunifytodos",
      "id": "weaver-intunifytodo-server-config-service"
    },
    {
      "name": "公共数据源",
      "serviceMark": "common",
      "id": "weaver-component-web-service"
    },
    {
      "name": "数据分析",
      "serviceMark": "analyze",
      "id": "weaver-analyze-service"
    },
    {
      "name": "ESB连接器",
      "serviceMark": "esb",
      "id": "weaver-esb-setting-serviceesbConnect"
    },
    {
      "name": "外部流程",
      "serviceMark": "workflow",
      "id": "weaver-workflow-core-serviceworkflowCoreOuterwf"
    },
    {
      "name": "绩效考核",
      "serviceMark": "ebuilder",
      "id": "weaver-wr-performance-eb-service"
    },
    {
      "name": "问题定位平台",
      "serviceMark": "tissot",
      "id": "weaver-tissot-service"
    },
    {
      "name": "规则引擎",
      "serviceMark": "logicflow",
      "id": "weaver-logicflow-service"
    },
    {
      "name": "工作流表单",
      "serviceMark": "workflow",
      "id": "weaver-workflow-report-serviceworkflowFormReport"
    },
    {
      "name": "统一认证中心",
      "id": "weaver-intunifyauth-server-base-service"
    }
  ]
```

**EXTERNAL 出参示例**：
```json
[
  { "dbType": "Mysql8", "id": "626641698703319040", "name": "e10_hr_sync" },
  { "dbType": "DaMeng", "id": "673747972984938496", "name": "达梦测试" }
]
```

## 步骤 2：执行 SQL

### 构造请求头（携带租户上下文）

```java
public HttpHeaders getHttpHeaders() {
    HttpHeaders requestHeaders = new HttpHeaders();
    String tenantKey = TenantRpcContext.getTenantKey();
    String eteamsId = TenantRpcContext.getEteamsId();
    String employeeId = TenantRpcContext.getEmployeeId();

    if (employeeId != null && !employeeId.isEmpty()) {
        requestHeaders.set("employeeId", employeeId);
    }
    if (tenantKey != null && !tenantKey.isEmpty()) {
        requestHeaders.set("tenantKey", tenantKey);
    }
    if (eteamsId != null && !eteamsId.isEmpty()) {
        requestHeaders.set("eteamsId", eteamsId);
    }
    return requestHeaders;
}
```

### 执行 SQL（LOGIC 或 EXTERNAL）

```java
import cn.hutool.core.codec.Base64;
import cn.hutool.json.JSONUtil;
import com.weaver.ebuilder.datasource.api.entity.ExecuteSqlEntity;
import com.weaver.ebuilder.datasource.api.enums.SourceType;

public Map<String, Object> execute(String sourceType, String groupId, String sql) {
    ExecuteSqlEntity executeSqlEntity = new ExecuteSqlEntity();
    executeSqlEntity.setSql(Base64.encode(sql));  // SQL 需要 Base64 编码
    executeSqlEntity.setGroupId(groupId);
    executeSqlEntity.setSourceType(SourceType.valueOf(sourceType));

    // 拼接参数
    MultiValueMap<String, Object> valueMap = new LinkedMultiValueMap<>();
    valueMap.add("params", JSONUtil.toJsonStr(executeSqlEntity));

    // 拼接请求头
    HttpHeaders requestHeaders = getHttpHeaders();
    List<MediaType> acceptTypes = new ArrayList<>();
    acceptTypes.add(MediaType.APPLICATION_JSON);
    requestHeaders.setAccept(acceptTypes);
    requestHeaders.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

    // 调用接口执行 SQL
    return restClient.postForObject(
        requestHeaders,
        "/sapi/datasearch/external/data/executeSql",
        valueMap,
        Map.class
    );
}
```

## 完整使用示例

```java
@Service("datasource_test")
public class DataBaseService {

    @Autowired
    CommonRestService commonRestService;
    @Autowired
    private RestClient restClient;

    // 1. 获取 LOGIC 分组
    public void demo1() {
        Map<String, Object> groups = getDataGroups("LOGIC");
        // 找到目标 groupId，例如流程："weaver-workflow-report-serviceworkflowreport"
    }

    // 2. 查询数据
    public void demo2() {
        String groupId = "weaver-workflow-list-service";
        String sql = "SELECT * FROM wfc_testinfo_log WHERE id = 973258354118836227 "
                   + "AND delete_type = 0 AND tenant_key = 'thsv5s4n2c'";
        Map<String, Object> result = execute("LOGIC", groupId, sql);
    }

    // 3. 查询外部数据源（EXTERNAL）
    public void demo3() {
        String groupId = "842668710322556928"; // 从 getDataGroups 获取
        String sql = "SELECT * FROM ecod_folder WHERE delete_type = 0";
        Map<String, Object> result = execute("EXTERNAL", groupId, sql);
    }
}
```

## 关键注意事项

1. **SQL 需要 Base64 编码**后传入
2. **请求头必须携带租户信息**（tenantKey / employeeId / eteamsId）
3. **二开建表统一使用 EB 表单搭建**，不直接建表
4. 达梦数据库判断：`"DM".equalsIgnoreCase(WeaDatabaseIdProvider.databaseId)`
5. 1201 基线及以上支持带事务的统一执行接口 `/sapi/secondev/ds/executeSqlAll`
