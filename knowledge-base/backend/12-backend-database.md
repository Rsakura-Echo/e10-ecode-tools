# 12 - 数据库操作

## 概述

250501 基线起提供 `SecondevDataSetUtil` 工具类，二开直接注入使用，不再需要手动构造 HTTP 请求和 Base64 编码。

## SecondevDataSetUtil（推荐）

### 基本用法

```java
@Autowired
private SecondevDataSetUtil secondevDataSetUtil;

// 查询（支持预编译占位符 ?）
Map<String, Object> result = secondevDataSetUtil.executeSql(
    SourceType.LOGIC, groupId, sql, params);

// 事务操作（不支持预编译，参数需字符串拼接）
String transId = String.valueOf(IdGenerator.generate());
secondevDataSetUtil.executeSqlWithTrans(
    SourceType.LOGIC, groupId, sql, null,
    transId, true, false, false);  // startTrans=true
secondevDataSetUtil.executeSqlWithTrans(
    SourceType.LOGIC, groupId, sql, null,
    transId, true, true, false);   // commit=true
```

### 返回结构（重要）

`executeSql` 返回的 `Map<String, Object>` 结构如下：

```
{
  "code": 0,           // Integer, 0=成功
  "msg": "success",    // String
  "status": true,      // Boolean
  "data": {            // LinkedHashMap — 数据载体
    "sqlType": "select",
    "code": 0,
    "records": [       // ArrayList — 真正的行数据
      {"id": 1276334572400173197, "username": "张三", "JOB_NUM": "001", ...},
      {"id": 1276334572400173198, "username": "李四", "JOB_NUM": "002", ...}
    ],
    "count": 2,
    "message": null,
    "status": "OK"
  },
  "fail": false        // Boolean
}
```

**解析范式（三层提取）：**

```java
Map<String, Object> rawResult = secondevDataSetUtil.executeSql(SourceType.LOGIC, groupId, sql, null);

// 第一层: rawResult → data
Object dataObj = rawResult.get("data");

List<Map<String, Object>> rows = new ArrayList<>();

if (dataObj instanceof List) {
    // data 直接是 List
    rows = (List<Map<String, Object>>) dataObj;
} else if (dataObj instanceof Map) {
    Map<String, Object> dataMap = (Map<String, Object>) dataObj;
    if (dataMap.containsKey("records")) {
        // 第二层: data → records → 第三层: 行数据
        rows = (List<Map<String, Object>>) dataMap.get("records");
    } else {
        // data Map 的值即为行 (单行场景或 row-index 格式)
        for (Map.Entry<String, Object> entry : dataMap.entrySet()) {
            if (entry.getValue() instanceof Map) {
                rows.add((Map<String, Object>) entry.getValue());
            }
        }
    }
}
```

**单行查询捷径** — 如果 SQL 只返回一行（如 `SELECT ... LIMIT 1`），可直接从 `records` 第一条取值：

```java
List<Map<String, Object>> rows = (List<Map<String, Object>>) 
    ((Map<String, Object>) result.get("data")).get("records");
if (!rows.isEmpty()) {
    BigDecimal gp = new BigDecimal(String.valueOf(rows.get(0).get("G_P")));
}
```

### executeSqlWithTrans 事务操作

不支持预编译占位符 `?`，SQL 参数需字符串拼接。**所有拼接入参必须做注入校验。**

```java
String transId = String.valueOf(IdGenerator.generate());

// 开启事务
secondevDataSetUtil.executeSqlWithTrans(SourceType.LOGIC, groupId, 
    "INSERT INTO t_table (col1, col2) VALUES ('" + safeVal1 + "', '" + safeVal2 + "')",
    null, transId, true, false, false);

// 更多操作...

// 提交
secondevDataSetUtil.executeSqlWithTrans(SourceType.LOGIC, groupId, "",
    null, transId, true, true, false);

// 或回滚
secondevDataSetUtil.executeSqlWithTrans(SourceType.LOGIC, groupId, "",
    null, transId, true, false, true);
```

## 数据源类型（SourceType）

| 枚举值 | 说明 |
|--------|------|
| `LOGIC` | 内部数据源（OA各模块业务数据） |
| `EXTERNAL` | 外部数据源（数据加工中配置的外部连接） |

## 常用 groupId

| 业务模块 | groupId |
|---------|---------|
| e-builder 表单 | `weaver-ebuilder-form-service` |
| 人事（HR） | `weaver-hr-service` |
| 流程 | `weaver-workflow-report-serviceworkflowreport` |
| 流程列表 | `weaver-workflow-list-service` |
| 考勤 | `weaver-attend-service` |
| 任务 | `weaver-project-servicetask` |
| 绩效 | `weaver-wr-performance-service` |
| 薪酬 | `weaver-hrm-salary` |
| 招聘 | `weaver-recruit-service` |

> `weaver-hr-service` 可查询 `eteams.employee`、`eteams.grade` 等 HR 基础表。

## SQL 注入防范

字符串拼接 SQL 时，必须对参数做白名单校验：

```java
// 日期: yyyy-MM-dd
if (!date.matches("\\d{4}-\\d{2}-\\d{2}")) throw new IllegalArgumentException("非法日期");

// 年月: yyyy-MM
if (!yearMonth.matches("\\d{4}-\\d{2}")) throw new IllegalArgumentException("非法年月");

// 数字
Long.valueOf(input);  // 异常则拒绝
```

## 公共数据库表

E10 部署后默认有公共数据库 `eteams`，查询时需指定库名：

```sql
SELECT e.id, e.username, e.JOB_NUM, g.CODE
FROM eteams.employee e
LEFT JOIN eteams.grade g ON e.GRADE = g.id
WHERE e.delete_type = 0 AND e.STATUS = 'normal'
```
