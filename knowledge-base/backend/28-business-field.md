# 28 - 表单标准工具包

> 来源: 表单标准工具包
> 原始 URL: https://weapp.eteams.cn/build/techdoc/wdoc/index.html#/online/786659033231335424/doc/477564875619434496
> 抓取时间: 2026-06-18

> **本文档收录仓库内全部文档的正文内容，文档内引用的外部链接不在此次收录范围。**

---

## 交接事项

### 0、交接内容

### 1、所有功能常用文档链接


#### 1.1、 快速定位工具，含：表单浏览、钻取

> [https://weapp.eteams.cn/build/techdoc/wdoc/index.html#/public/doc/b6f80055-8314-4b16-bf5f-1a7b72e1a5a9](https://weapp.eteams.cn/build/techdoc/wdoc/index.html#/public/doc/b6f80055-8314-4b16-bf5f-1a7b72e1a5a9)


#### 1.2、JSSDK文档

> 外发地址：[https://weapp.eteams.cn/build/techdoc/wdoc/index.html#/public/repository/856c9c16-862c-4e0d-8796-d2c11a37ca72/home](https://weapp.eteams.cn/build/techdoc/wdoc/index.html#/public/repository/856c9c16-862c-4e0d-8796-d2c11a37ca72/home)
> 
> 编辑地址：[https://weapp.eteams.cn/build/techdoc/wdoc/index.html#/online/786659033231335424/doc/218911993711558656](https://weapp.eteams.cn/build/techdoc/wdoc/index.html#/online/786659033231335424/doc/218911993711558656)


#### 1.3 字段、函数联动常用文档

> [https://weapp.eteams.cn/sp/techdoc/invite/b2ecbfe0-4079-4d53-ae8c-e71ffe54b8e6a19842ae-92a0-4f50-b20c-19cd65ccc300](https://weapp.eteams.cn/sp/techdoc/invite/b2ecbfe0-4079-4d53-ae8c-e71ffe54b8e6a19842ae-92a0-4f50-b20c-19cd65ccc300)


#### 1.4 业务字段常用文档

> [https://weapp.eteams.cn/sp/techdoc/invite/d5cf58ed-1731-462f-bedc-21ad2210aa695df291b5-1573-4724-9c88-883ea28c25eb](https://weapp.eteams.cn/sp/techdoc/invite/d5cf58ed-1731-462f-bedc-21ad2210aa695df291b5-1573-4724-9c88-883ea28c25eb)




### 2、1、表单浏览查询

#### 表单浏览查询

### 1、功能简述与介绍


#### 1.1 简述

> 表单选项、附件及浏览字段的数据查询服务，全部都走这里，支持**冗余数据**和**实时数据**两种查询模式。


#### 1.2 业务数据来源

> 表单数据回显的延伸，纯粹查询数据名称；
> 
> 选项型走表单数据查询含选项模版
> 
> 附件型走文件服务RPC调用查询
> 
> 浏览型走BCW服务进行查询




### 2、涉及代码位置和路径


#### 2.1、核心服务

| 类路径 | 说明 |
|--------|------|
| `com.weaver.common.form.real.FdRealDetailOptionService` | 表单详情直接调用层，含部门全路径和人力资源条件查询 |
| `com.weaver.common.form.browser.FdBrowserDataService` | 表单数据查询层，最终参数构造、查询冗余控制等 |

####  2.2、weaver-common-form-browser 模块


```
weaver-common-form-browser/com/weaver/common/form/browser/service
├── /api        # 对外开放接口，按类型分发，多类型并行查询，含线程池
├── /file       # 封装查询附件接口，最终走附件服务
├── /option     # 封装查询选项接口，最终走表单查询
└── /data       # 封装查询浏览接口，最终走BCW服务分发到模块
```



### 3、业务架构图


#### 3.1、 以表单详情业务为参考，同时查询浏览、附件、选项


```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         FdRealDetailOptionService                            │
│                         （表单层 - 冗余/实时策略分发）                         │
└─────────────────────────────────┬───────────────────────────────────────────┘
                                  |
                                  ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                              FdBrowserDataService                            │
│                         （表单层 - 冗余/实时策略分发）                         │
└─────────────────────────────────┬───────────────────────────────────────────┘
                                  │
                    ┌─────────────┴─────────────┐
                    ▼                           ▼
        ┌───────────────────┐         ┌───────────────────┐
        │FormDataRedundancy │         │ FormBrowserApi    │
        │     Service       │         │     Service       │
        │   （冗余数据查询）  │         │   （实时数据查询）  │
        └───────────────────┘         └─────────┬─────────┘
                                                │
                              ┌─────────────────┼─────────────────┐
                              ▼                 ▼                 ▼
                  ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐
                  │FormBrowserData  │ │FormBrowserFile  │ │FormOptionData   │
                  │   Service       │ │    Service      │ │    Service      │
                  │（基础浏览数据）   │ │（附件浏览数据）   │ │（选项浏览数据）   │
                  └────────┬────────┘ └─────────────────┘ └─────────────────┘
                           │
                           ▼
              ┌─────────────────────────┐
              │CommonBrowserService     │
              │（浏览器类型分发服务）     │
              └────────────┬────────────┘
```


### 4、注意事项


#### 4.1 特殊查询情况

人力资源类型、发票、附件等类型必查最新

流程字段，表单详情入口必查最新：场景是流程需要富文本标题的内容，最初由郭杰对接

人力资源类型，表单详情入口有对接分页查询，根据开关控制

查最新开关

表单入口，必定查询冗余，兜底查最新，开启查最新则全部MQ刷冗余， 否则兜底部分MQ刷冗余

非表单入口，根据开关控制查最新，或者查冗余




### 5、调试工具


#### 5.1 表单详情中浏览名称没有时，用这个验证

var url = window.location.origin+"/api/bcw/test/testRemoteBrowser";
	var params = WeFormSDK.getWeFormInstance().weFormApi.weFormApiOper.getBrowserParam();
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.onload = function (e) {
	  if (xhr.readyState === 4) {
		if (xhr.status === 200) {
		  console.log(xhr.responseText);
		} else {
		  console.error(xhr.statusText);
		}
	  }
	};
	xhr.onerror = function (e) {
	  console.error(xhr.statusText);
	};
	xhr.send(JSON.stringify(params));


#### 5.2 备选查询浏览测试接口

// 浏览测试接口
	// 直接调试底层浏览的使用testQueryBrowserDataByDataMap
	        var url = window.location.origin + '/api/{module}/{type}/form/browser/testQueryBrowserDataByDataMap';
	        var params = {
	            'param': {
	                'formId': WeFormSDK.getWeFormInstance().getBaseInfo().formId,
	                'module': WeFormSDK.getWeFormInstance().getBaseInfo().module,
                	'customParam': {dataByHrmHisKey:WeaForm.formProps.customParam?.dataByHrmHisKey},
			        "needReserve":false
	            },
	            'dataDtoMap': {
	                '1': WeFormSDK.getWeFormInstance().weFormApi.formStore.getFormDataDetail().map((a) => {
	                    return {
	                    	browserCustomParam:{testBrowser:true},
	                        fieldId: a.fieldId??a.formField?.id,
	                        browserDataIds: a.dataOptions?.map((b) => b.optionId),
	                        rowId: a.rowId || WeFormSDK.getWeFormInstance().getBaseInfo().dataId
	                    };
	                }).filter((a) => a.browserDataIds)
	            }
	        };
	        var xhr = new XMLHttpRequest();
	        xhr.open('POST', url, true);
	        xhr.setRequestHeader('Content-Type', 'application/json');
	        xhr.onload = function(e) {
	            if (xhr.readyState === 4) {
	                if (xhr.status === 200) {
	                    console.log(xhr.responseText);
	                } else {
	                    console.error(xhr.statusText);
	                }
	            }
	        };
	        xhr.onerror = function(e) {
	            console.error(xhr.statusText);
	        };
	        xhr.send(JSON.stringify(params));


#### 5.3 特殊坑点

1、上面两个测试都能查到，但实际就是没有，检查数据库数据，formId是否和页面一致，查询接口取的是formData的formId， 有客户会同步数据没有把这个关系改掉

2、单查一种类型正常，要把完整的查询一起查，可能存在一个类型影响其他的

3、查询自定义浏览没名字，也可能和开线程有关，按照架构要求传递的，下层取不到或下层用法不标准，则需要下层排查

### 2、表单引擎jssdk

#### 表单JSSDK文档

### 1、功能简述与介绍

> 开放formSdk实例，操作表单数据，在表单初始化中初始化，提前获取会主动抛出异常，便于事先发现
> 
> 设计器的源码编辑器，使用eb的编辑器能力，为eb与ecode对接
> 
> 外发地址：[https://weapp.eteams.cn/build/techdoc/wdoc/index.html#/public/repository/856c9c16-862c-4e0d-8796-d2c11a37ca72/home](https://weapp.eteams.cn/build/techdoc/wdoc/index.html#/public/repository/856c9c16-862c-4e0d-8796-d2c11a37ca72/home)
> 
> 编辑地址：[https://weapp.eteams.cn/build/techdoc/wdoc/index.html#/online/786659033231335424/doc/218911993711558656](https://weapp.eteams.cn/build/techdoc/wdoc/index.html#/online/786659033231335424/doc/218911993711558656)


### 2、相关问题定位

> 1、源码不生效，第一行alert也不谈，多数为ecode资源问题，联系宋元杰定位
> 
> 2、参见常见问题排查：[https://weapp.eteams.cn/build/techdoc/wdoc/index.html#/public/repository/856c9c16-862c-4e0d-8796-d2c11a37ca72/doc/253275268276289536](https://weapp.eteams.cn/build/techdoc/wdoc/index.html#/public/repository/856c9c16-862c-4e0d-8796-d2c11a37ca72/doc/253275268276289536)
> 
> 3、需求API不生效，优先检查获取字段id对不对，**注意3.1的API是传2参，1参遇到重名会取错**

### 3、显示属性联动

#### 显示属性联动

### 1、功能简述与介绍

> 根据条件控制字段的读写属性




### 2、涉及代码位置和路径

> 后端包下：
> 
> 显示属性联动：weaver-common-form-extend/src/main/java/com/weaver/common/form/setting/viewlinkage
> 
> 文件名为：FormViewLinkage开头， 入口为FormVIewLinkageController
> 
> 条件设置：weaver-common-form-extend/src/main/java/com/weaver/common/form/condition
> 
> 文件名为：FormConditon开头
> 
> 生效维度：weaver-common-form-extend/src/main/java/com/weaver/common/form/setting/effect
> 
> 前端位置：weapp-formBuilder/src/components/public/Form/components/view-linkage




### 3、后端业务概述

数据持久化和各种查询

列表数据回显、字段名最新展示和多语言




### 4、前端业务概述

批量运行调度

字段属性权重筛选

字段属性版本控制

变更字段转换

条件判断

条件比较

明细本行、整列及任一列比较

函数公式校验条件

### 4、字段、函数联动

#### 字段、函数联动

> [https://weapp.eteams.cn/sp/techdoc/invite/b2ecbfe0-4079-4d53-ae8c-e71ffe54b8e6a19842ae-92a0-4f50-b20c-19cd65ccc300](https://weapp.eteams.cn/sp/techdoc/invite/b2ecbfe0-4079-4d53-ae8c-e71ffe54b8e6a19842ae-92a0-4f50-b20c-19cd65ccc300)


### 代码位置

大目录：weaver-common-form-extend/src/main/java/com/weaver/common/form/setting/fdlinkage

联动预检：weaver-common-form-extend/src/main/java/com/weaver/common/form/setting/fdlinkage/check

联动范围：weaver-common-form-extend/src/main/java/com/weaver/common/form/setting/fdlinkage/run/action

持久化部分：weaver-common-form-extend/src/main/java/com/weaver/common/form/setting/fdlinkage/service


### 1、功能简述与介绍

核心是的带出数据，分为字段联动（ESB、sql查询），和函数联动

列表是分开的，数据其实是在一起的


### 2、业务架构划分

联动设置持久化

联动范围解析

联动运行时

执行顺序排序

联动逐级调度，转列执行

联动数据源

执行ESB

执行SQL

执行可视化—>SQL

执行函数

结果转构建表单数据

附件鉴权、附件复制、附件文档互转、同步多来源

查询浏览名称


### 3、核心业务层


#### 3.1、执行链路

> 以载入时触发带出当前人，及当前人所在部门为例

执行联动：com.weaver.common.form.setting.fdlinkage.FdLinkageRunServiceImpl#runByParams

初始化日志收集：FdLinkageLogContext

参数转缓存Key获取联动配置、未命中走接口查询并缓存

加载上下文：1、查询字段配置、2、baseSetting；3、是否新表单是否物理表等

对联动执行排序，根据输入输出参数关系拓卜，死循环不排：FdLinkageRunOrderService#orderRunData

批量串行执行联动FdLinkageRunServiceImpl#runByFdLinkage

执行单个联动

获取触发字段所在明细关系

执行调度转换

非函数、ESB合并执行、明细触发且未指定触发行

转列执行，依据入参的明细行数据，形成多行执行计划

非函数、ESB合并执行、是更新明细

找到赋值所在明细关系

根据入参的明细行数据，形成多行执行计划

主表触发、明细行触发执行、函数整表执行、ESB合并执行

遍历执行计划串行执行联动数据源

如果是ESB联动

根据触发明细进行筛选所在行数据，主表触发的不筛选

ESB联动执行：formDataSourceApiService.executeEsbFlow

校验触发所在行，对结果集塞入行号

其他的联动走：fdlRunSourceService.runFdlLinkageByDataSource

可视化联动

按需获得入参数据：FdLinkageRunBuildParamService#buildVariableDataListMap

根据可视化配置生成SQL：fdlRunBuildParamService.buildSqlScriptByTemplate

检查参数内容校验是否命中结果集缓存

形成可执行SQL，引号拼接在这里：fdlRunBuildParamService.buildSqlReplaceListParam

调用数据源执行SQL获得查询结果集

记录执行日志并返回结果集

SQL联动

按需获得入参数据：fdlRunBuildParamService.buildVariableDataListMap

检查参数内容校验是否命中结果集缓存

校验是数据加工的DBSQL

是DBSQL

转换入参数据结构

调用接口执行SQL

取出属性并返回

非DBSQL

形成可执行SQL，引号拼接在这里：fdlRunBuildParamService.buildSqlReplaceListParam

调用数据源执行SQL获得查询结果集

记录执行日志并返回结果集

函数联动

组装表单数据结构和模块数据（这里要做明细数据补全， 如函数是A=B+C，入参必须要有A的结构）

调函数转换结构：excelTransUtil.transFieldForForm

批量执行函数：excelRunService.batchRunByAllData

记录执行日志并返回，额外返回入参的行号与index关系，后面会有

结果集转换成表单数据

函数结果集转换

遍历结果，明细的按照行号匹配，主表的直接取值

SQL结果集转换

输出给明细

主表带出多行明细

遍历循环多行生成数据结果

明细带出明细

生成一个明细塞入触发明细行号： （SQL多行结果给明细按照：文本拼接、数字累加、浏览合并去重）

输出给主表字段

SQL多行结果给明细按照：文本拼接、数字累加、浏览合并去重

走简化接口转换出表单数据

同步结果到入参，逐级联动

联动后置处理器

兼容E9，文档附件互转，根据开关来，默认关

附件鉴权，根据开关来，默认开

附件复制、多来源同步， 前者默认关，后者默认开

补全表单浏览字段名称

检查浏览数据有无名称，不存在的视为无效，提出并标记到日志中

异步记录联动日志入库

异常捕获并记录错误日志




#### 3.2、联动数据结构说明

监控字段

[
    {
        "actionType": "changeField",                     // 触发动作
        "targetField": "1261941179256651778",            // 触发字段id
        "idList": [                                      // 执行联动id清单
            "1261941415550935040",
            "1261941342486159360"
        ],
        "conditionFieldList": [                          // 需要那些入参
            "1261941179256651777",
            "1261941179256651778",
            "1261941179256651780",
            "1261941179256651779"
        ],
        "resultFieldList": [                             // 会返回那些字段，目前会用来做清空明细判断
            "1261941179256651780",
            "1261941179256651779"
        ],
        "deduceDescMap": {}                             // 逐级联动关系，二级联动会有，关系是： 联动Id->触发字段
    },
    {
        "actionType": "changeField",                     // 触发动作
        "targetField": "1261941179256651778",            // 触发字段id
        "idList": [                                      // 执行联动id清单
            "1261941415550935040",
            "1261941342486159360"
        ],
        "conditionFieldList": [                          // 需要那些入参
            "1261941179256651777",
            "1261941179256651778",
            "1261941179256651780",
            "1261941179256651779"
        ],
        "resultFieldList": [                             // 会返回那些字段，目前会用来做清空明细判断
            "1261941179256651780",
            "1261941179256651779"
        ],
        "deduceDescMap": {}                             // 逐级联动关系，二级联动会有，关系是： 联动Id->触发字段
    }
]执行联动参数

{
    "executeParam": {
        "formId": "1261941157735456768",                 // 表单id
        "module": "formdatareport",                      // 模块
        "dataId": "4777968893860050998",                 // 数据id
        "customParam": {                                 // 扩展参数，一些调试埋点会用
            "needExcelUpdate": true,                     // 开启添加行触发赋值明细的函数联动
            "needResultTableCfg": true                   // 开启明细配置逻辑控制，跳过未配置返回明细的联动
        },
        "businessFields": [                              // 模块字段配置，等同于formField，输入输出有模块字段时需要
            {
                "valueKey": "name",
                "valueType": "TEXT"
            }
        ],
        "moduleDataList": [],                            // 模块字段数据
        "dataList": [                                    // 表单自定义字段数据
            {
                "fieldType": "LIST",
                "fieldId": "1261941179256651777",
                "optionList": [
                    {
                        "id": "1273410829225869337",
                        "name": "new 5.txt"
                    }
                ]
            },
            {
                "fieldType": "TEXT",
                "fieldId": "1261941179256651778"
            }
        ],
        "runDataList": [                                // 联动执行参数，支持批量
            {
                "targetField": "1261941179256651777",   // 触发字段
                "actionType": "changeField",            // 触发动作
                "linkageIds": [                         // 执行联动清单
                    "1261941415550935040",
                    "1261941342486159360"
                ],
                "deduceDescMap": {}                     // 逐级联动与触发字段关系
            }
        ]
    }
}


### 4、注意事项与常用工具


#### 4.1、排查工具


##### 4.1.1 开启调试模式，拦截请求塞入开启参数

// 开启采集
  axios.interceptors.request.use((item) => {
    const { url, data } = item;
    // 控制仅拦截联动
    if (url && url.indexOf("/form/linkage/executeFdLinkage") > -1) {
      let { executeParam } = data || {};
      // 指定表单，并且是新建状态
      executeParam.customParam = { 
	      ...executeParam.customParam, 
      	  needSqlResult: true,  
	      needCalcResult:true,  
	      needExcelResult:true, 
	      needEsbResult:true, 
          needCostResult:true,
          need_convert_file_doc:true
      };
    }
    return item;
  });

##### 4.1.2 联动触发字段放开组织多选

axios.interceptors.request.use((item) => {
    const { url, data } = item;
    if (url && url.indexOf("/form_dataDrivenColumn") > -1) {
        if(data?.scenarioType === "DATA_LINKAGE_TRIGGER"){
            const keys = ["EmployeeOrganization","EmployeeScope","EmployeeShare"];
            data.notComponentKeyList = data.notComponentKeyList?.filter((key)=>{
                return !keys.includes(key);
            })
        }
    }
    return item;
  });

### 5、函数公式引擎

#### 函数引擎

## 1、功能概述


### 1.1、函数列表等功能

函数列表：指自定义函数脚本

公式列表：指字段函数那种


#### 1.2、模块服务及包

weaver-common-excel-formula： jar包，运行时的都在这里

weaver-excel-formula：war服务包

weaver-excel-formula-api：服务的api包，放rpc和rpc所用bean

weaver-excel-formula-service：服务包




### 1.2、函数各功能入口（那些是走函数执行）


#### 1.2.1、表单下函数运行的

字段函数：纯前端触发

函数联动：前端、动作流更新、开放接口等（支持后端触发）


#### 1.2.2、对接完整函数运行的

薪酬模块

流程规则


#### 1.2.3、仅用函数运算的

动作流


#### 1.2.4、仅用函数编辑器的

逻辑编排


#### 1.2.5、纯前端函数的

显示属性联动


### 1.3、函数的语法（函数、等号赋值）

1、函数联动：支持等号赋值，支持多行函数

2、字段函数：以上都不支持

3、自定义脚本：仅es5语法、不能写注释、安全防护最弱

4、显示属性联动：缺少80+函数体，前端回去屏蔽掉不支持的，不支持自定义脚本、不支持任何需要后端结果的函数




## 2、开发概述


#### 2.1、执行链路

> 以函数联动、字段函数的执行为例

批量执行函数： com.weaver.excel.formula.excute.ExcelRunService#batchRunByAllData

查询函数缓存，不存在的查最新

开线程批量执行，线程池支持nacos配置，默认：核心30，最大40

执行单个函数：com.weaver.excel.formula.excute.ExcelRunServiceImpl#run

指定单个函数：com.weaver.excel.formula.excute.ExcelRunServiceImpl#executeFormula

解析函数变量

构建临时变量（业务：把临时变量的函数循环执行完，回塞到变量列表）

加载人员属性

构建变量数据对象DataType

开始运行函数表达式：com.weaver.excel.formula.excute.ExcelRunServiceImpl#executeExpress

校验是等号赋值及切割多行函数（函数联动）、普通函数（字段函数）

执行函数：com.weaver.excel.formula.core.AttendanceQlExpress#execute、com.weaver.excel.formula.core.AttendanceQlExpress4Assig#execute

加载函数解析器及复用控制：com.weaver.excel.formula.core.RunnerInit#initRunnerOnCaChe

云端不走复用、私有化走复用，根据租户key复用

缓存逻辑为两重，默认：1、本机缓存，利用MQ清理；2、redis缓存控制清理

初始化，加载自定义函数脚本、标准函数

执行函数表达式

返回结果

解析结果进行转化

根据需要记录执行日志，默认关闭




#### 2.2、经验避坑

自定义函数脚本：1、仅es5语法，受jdk8的nashron限制，且有安全防护问题；2、不能写注释，运行逻辑会去除换行就有问题了；

自定义函数的安全防护：1、多数是通过反射、内部的eninge获取到Java实例进行，黑名单容易绕开，无法彻底解决，思路是怎么攻击就怎么防护，攻击利用js全局变量注入的engine脚本实例获取Java对象，所以防护方式是JS脚本开头先把engine = undefined;清空，会有可忽略不计的性能损耗，主要是解析脚本的长度损耗；

> 以往沟通内容：更换带沙箱的脚本执行插件，如GraalVm，单这个无法同时兼容两个Jdk版本， 结论是配置部全面推进jdk17落地后更换
> 
> 已验证解决思路：路是怎么攻击就怎么防护，攻击利用js全局注入的engine脚本实例获取Java对象，那么防护方式是JS脚本开头先把engine = undefined;清空，会有可忽略不计的性能损耗，主要是解析脚本的长度损耗；

### 6、业务字段标准

#### 业务字段

### 1、需求概述

> 用来整合模块字段，接入到表单各个功能中，制定一套抽象的标准字段，来介入




### 2、对接文档地址：


### [https://weapp.eteams.cn/sp/techdoc/invite/d5cf58ed-1731-462f-bedc-21ad2210aa695df291b5-1573-4724-9c88-883ea28c25eb](https://weapp.eteams.cn/sp/techdoc/invite/d5cf58ed-1731-462f-bedc-21ad2210aa695df291b5-1573-4724-9c88-883ea28c25eb)






### 3、代码位置

> 包地址：weaver-common-form-extend/src/main/java/com/weaver/common/form/biz
> 
> 入口文件：[com.weaver.common.form.biz](http://com.weaver.common.form.biz).BusinessService

### 相关文档内容

#### 1、快速定位工具

### 1、反查浏览名称


#### 1.1、 表单详情中浏览名称没有时，用这个验证

var url = window.location.origin+"/api/bcw/test/testRemoteBrowser";
	var params = WeFormSDK.getWeFormInstance().weFormApi.weFormApiOper.getBrowserParam();
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.onload = function (e) {
	  if (xhr.readyState === 4) {
		if (xhr.status === 200) {
		  console.log(xhr.responseText);
		} else {
		  console.error(xhr.statusText);
		}
	  }
	};
	xhr.onerror = function (e) {
	  console.error(xhr.statusText);
	};
	xhr.send(JSON.stringify(params));


#### 1.2、 备选查询浏览测试接口

// 浏览测试接口
	// 直接调试底层浏览的使用testQueryBrowserDataByDataMap
	        var url = window.location.origin + '/api/{module}/{type}/form/browser/testQueryBrowserDataByDataMap';
	        var params = {
	            'param': {
	                'formId': WeFormSDK.getWeFormInstance().getBaseInfo().formId,
	                'module': WeFormSDK.getWeFormInstance().getBaseInfo().module,
                	'customParam': {dataByHrmHisKey:WeaForm.formProps.customParam?.dataByHrmHisKey},
			        "needReserve":false
	            },
	            'dataDtoMap': {
	                '1': WeFormSDK.getWeFormInstance().weFormApi.formStore.getFormDataDetail().map((a) => {
	                    return {
	                    	browserCustomParam:{testBrowser:true},
	                        fieldId: a.fieldId??a.formField?.id,
	                        browserDataIds: a.dataOptions?.map((b) => b.optionId),
	                        rowId: a.rowId || WeFormSDK.getWeFormInstance().getBaseInfo().dataId
	                    };
	                }).filter((a) => a.browserDataIds)
	            }
	        };
	        var xhr = new XMLHttpRequest();
	        xhr.open('POST', url, true);
	        xhr.setRequestHeader('Content-Type', 'application/json');
	        xhr.onload = function(e) {
	            if (xhr.readyState === 4) {
	                if (xhr.status === 200) {
	                    console.log(xhr.responseText);
	                } else {
	                    console.error(xhr.statusText);
	                }
	            }
	        };
	        xhr.onerror = function(e) {
	            console.error(xhr.statusText);
	        };
	        xhr.send(JSON.stringify(params));


#### 1.3、 特殊坑点

1、上面两个测试都能查到，但实际就是没有，检查数据库数据，formId是否和页面一致，查询接口取的是formData的formId， 有客户会同步数据没有把这个关系改掉

2、单查一种类型正常，要把完整的查询一起查，可能存在一个类型影响其他的

3、查询自定义浏览没名字，也可能和开线程有关，按照架构要求传递的，下层取不到或下层用法不标准，则需要下层排查




### 2、钻取模块字段


#### 2.1、快速确认模块返回数据

var url = window.location.origin+"/api/formdatareport/business/listBusinessDatas";
	var params = {
	    "browserParam":{
	        "module":"bcw",
	        "type":"customBrowser_ItemSelect"
	    },
	    "dataIds":[
	        "1201001009994"
	    ],
	    "employeeId":TEAMS.currentUser.id+"",
	    "module":"bcw",
	    "tenantKey":TEAMS.currentTenant.tenantKey
	};
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.onload = function (e) {
	  if (xhr.readyState === 4) {
		if (xhr.status === 200) {
		  console.log(xhr.responseText);
		} else {
		  console.error(xhr.statusText);
		}
	  }
	};
	xhr.onerror = function (e) {
	  console.error(xhr.statusText);
	};
	xhr.send(JSON.stringify(params));


### 3、联动常用统计SQL 


##### 3.1 查询触发字段同时有主表、明细的配置

SELECT fl.id as '联动id',fl.linkage_name as '联动名字',fl.form_id as '表单id',f.name as '表单名字' from fd_linkage fl 
INNER JOIN form f on fl.form_id = f.id AND f.IS_DELETE = 0 and linkage_type not in ('excel')
    WHERE fl.id in (
        SELECT flma.entity_id FROM fd_linkage_monitor_action flma
        inner JOIN fd_linkage_monitor_field flmf on flma.id = flmf.entity_id and flmf.delete_type = 0
        inner JOIN form_field ff1 ON CAST(flmf.target_field as unsigned) = ff1.id
        WHERE fl.id = flma.entity_id and flma.delete_type = 0 AND ff1.id is not null AND ff1.sub_form_id IS NULL
    ) AND fl.id in (
        SELECT flma.entity_id FROM fd_linkage_monitor_action flma
        inner JOIN fd_linkage_monitor_field flmf on flma.id = flmf.entity_id and flmf.delete_type = 0
        inner JOIN form_field ff1 ON CAST(flmf.target_field as unsigned) = ff1.id 
        WHERE fl.id = flma.entity_id and flma.delete_type = 0 AND ff1.sub_form_id IS not NULL
    );


##### 3.3.2 查询联动可视化-存在多表查询，且输出字段同时存在有表名和无表名

SELECT fl.id as '联动id',fl.linkage_name as '联动名字',fl.form_id as '表单id',f.name as '表单名字' from fd_linkage fl INNER JOIN form f on fl.form_id = f.id
where fl.tenant_key = 't82kg113nu' and fl.delete_type = 0 and fl.id in (
  SELECT entity_id from fd_linkage_source where id in (
    SELECT entity_id from fd_linkage_source_config where id in (
      SELECT MAX(entity_id) from fd_linkage_source_config_table where delete_type = 0 GROUP BY entity_id HAVING COUNT(1) > 1
    )
  )
)
and fl.id in (
  SELECT entity_id from fd_linkage_source WHERE id in (
    SELECT entity_id from fd_linkage_source_mapping flsm1 where delete_type = 0 and source_table is null and EXISTS (
      SELECT 1 from fd_linkage_source_mapping flsm2 where delete_type = 0 and flsm1.entity_id = flsm2.entity_id and source_table is not null
    )
  )
)


##### 3.3 查询联动赋值列没有表名，而且可视化表名有设置别名

SELECT fl.id as '联动id',fl.linkage_name as '联动名字',fl.form_id as '表单id',f.name as '表单名字',f.tenant_key from fd_linkage fl 
INNER JOIN form f on fl.form_id = f.id AND f.IS_DELETE = 0
where fl.delete_type = 0 and fl.id  in (
  SELECT entity_id from fd_linkage_source where delete_type = 0 and linkage_type = 'template' and id in (
    SELECT entity_id from fd_linkage_source_mapping where delete_type = 0 and source_table is null
  )
  and id in (
    SELECT entity_id from fd_linkage_source_config where id in (
      SELECT entity_id FROM fd_linkage_source_config_table where delete_type = 0 and table_nick_name is not null
    )
  )
)


##### 3.4 查询联动SQL含有表名，不含sql组件的

# 重要事项三遍
# a、sql中的tenant_key租户标识，需要换成指定团队； b、查询关键字需要替换
# a、sql中的tenant_key租户标识，需要换成指定团队； b、查询关键字需要替换
# a、sql中的tenant_key租户标识，需要换成指定团队； b、查询关键字需要替换

# 1、查询可视化, 查询表名、表连接、条件中，名称含有关键字， 替换'formdata_report'为查询表名
SELECT fl.id as '联动id',fl.linkage_name as '联动名字',fl.form_id as '表单id',f.name as '表单名字' from fd_linkage fl 
INNER JOIN form f on fl.form_id = f.id AND f.IS_DELETE = 0 and f.TENANT_KEY = 't82kg113nu' 
where fl.tenant_key = 't82kg113nu' and fl.delete_type = 0 and fl.id in (
  select entity_id from fd_linkage_source where delete_type = 0 and id in (
    SELECT flsc.entity_id from fd_linkage_source_config flsc
    left join fd_linkage_source_config_table flsct on flsc.id = flsct.entity_id
    where flsc.delete_type = 0 and (flsc.where_condition like '%formdata_report%' or flsct.source_field LIKE '%formdata_report%' or flsct.join_condition like '%formdata_report%')
  )
)

# 2、查询老sql联动, 查询老全SQL中，含有关键字， 替换'formdata_report'为查询表名
SELECT fl.id as '联动id',fl.linkage_name as '联动名字',fl.form_id as '表单id',f.name as '表单名字' from fd_linkage fl 
INNER JOIN form f on fl.form_id = f.id AND f.IS_DELETE = 0 and f.TENANT_KEY = 't82kg113nu' 
where fl.tenant_key = 't82kg113nu' and fl.delete_type = 0 and fl.id in (
  SELECT entity_id from fd_linkage_source where id in (
    SELECT entity_id from fd_linkage_source_sql where sql_script LIKE '%formdata_report%' and delete_type = 0
  ) and delete_type = 0
)

# 3、查询数据加工的联动，查询全部是数据加工sql组件的数据
SELECT fl.id as '联动id',fl.linkage_name as '联动名字',fl.form_id as '表单id',f.name as '表单名字' from fd_linkage fl 
INNER JOIN form f on fl.form_id = f.id AND f.IS_DELETE = 0 and f.TENANT_KEY = 't82kg113nu' 
where fl.tenant_key = 't82kg113nu' and fl.delete_type = 0 and fl.id in (
  SELECT entity_id from fd_linkage_source where id in (
    SELECT entity_id from fd_linkage_source_sql where db_sql_id is not null and delete_type = 0
  ) and delete_type = 0
)


##### 3.5 统计老SQL模式含有CONCAT

SELECT fl.id as '联动id',fl.linkage_name as '联动名字',fl.form_id as '表单id',f.name as '表单名字' from fd_linkage fl 
INNER JOIN form f on fl.form_id = f.id AND f.IS_DELETE = 0 and f.TENANT_KEY = 't82kg113nu' 
where fl.tenant_key = 't82kg113nu' and fl.delete_type = 0 and fl.id in (
  SELECT entity_id from fd_linkage_source where id in (
      SELECT entity_id from fd_linkage_source_sql where delete_type = 0 and db_sql_id is null and sql_script like '%concat%'
    )
)


##### 3.3.6 统计联动：1、触发只有一个明细字段；2、可视化联动

SELECT fl.id as '联动id',fl.linkage_name as '联动名字',fl.form_id as '表单id',f.name as '表单名字' from fd_linkage fl 
INNER JOIN form f on fl.form_id = f.id AND f.IS_DELETE = 0 and f.TENANT_KEY = 't82kg113nu' 
where fl.tenant_key = 't82kg113nu' and fl.delete_type = 0 and fl.id in (
     SELECT max(flma.entity_id) from fd_linkage_monitor_action flma 
      LEFT JOIN fd_linkage_monitor_field flmf on flma.id = flmf.entity_id AND flmf.delete_type = 0 and flmf.TENANT_KEY = 't82kg113nu' 
      LEFT JOIN form_field ff on flmf.target_field = cast(ff.id as char) and ff.TENANT_KEY = 't82kg113nu'
     where flma.delete_type = 0 and ff.sub_form_id is not null GROUP BY flmf.entity_id,ff.sub_form_id HAVING count(ff.sub_form_id) = 1
) and EXISTS (select 1 from fd_linkage_source fls where fls.TENANT_KEY = 't82kg113nu' and fls.delete_type = 0 and fls.linkage_type = 'template' and fls.entity_id = fl.id)


##### 3.7 查询sql联动含有from的，可能是查库的

# 查询载入时编辑，赋值只有一个明细字段的
SELECT fl.id as '联动id',fl.linkage_name as '联动名字',fl.form_id as '表单id',f.name as '表单名字' from fd_linkage fl 
INNER JOIN form f on fl.form_id = f.id AND f.IS_DELETE = 0 and f.TENANT_KEY = 't82kg113nu' 
where fl.tenant_key = 't82kg113nu' and fl.delete_type = 0 and fl.id in (
  SELECT flma.entity_id from fd_linkage_monitor_action flma where flma.delete_type = 0 and flma.action_type in ('onLoadFormEdit')
    and flma.entity_id in (
      SELECT MAX(fls.entity_id) as id from fd_linkage_source fls 
        INNER JOIN fd_linkage_source_mapping flsm on fls.id = flsm.entity_id AND flsm.delete_type = 0 and flsm.TENANT_KEY = 't82kg113nu' 
        INNER JOIN form_field ff on flsm.target_field = cast(ff.id as char) and ff.TENANT_KEY = 't82kg113nu'
        where fls.delete_type = 0 and fls.linkage_type = 'sql' and ff.TENANT_KEY = 't82kg113nu' and ff.sub_form_id is not null
        GROUP BY fls.entity_id HAVING COUNT(fls.entity_id)  = 1
    )
)

# 查询sql包含from查库的
SELECT fl.id as '联动id',fl.linkage_name as '联动名字',fl.form_id as '表单id',f.name as '表单名字' from fd_linkage fl 
INNER JOIN form f on fl.form_id = f.id AND f.IS_DELETE = 0 and f.TENANT_KEY = 't4kqbk7e3m' 
INNER JOIN fd_linkage_source fls on fls.entity_id = fl.id and fls.linkage_type = 'sql'
INNER JOIN fd_linkage_source_sql flss on flss.entity_id = fls.id and flss.delete_type = 0 and flss.sql_script is not null
where flss.delete_type = 0 and flss.sql_script like '%from%' and fl.id in ();

# 查询sql不含查库可转excel的
SELECT fl.id as '联动id',fl.linkage_name as '联动名字',fl.form_id as '表单id',f.name as '表单名字'  from fd_linkage fl 
INNER JOIN form f on fl.form_id = f.id AND f.IS_DELETE = 0 and f.TENANT_KEY = 't4kqbk7e3m' 
INNER JOIN fd_linkage_source fls on fls.entity_id = fl.id
INNER JOIN fd_linkage_source_sql flss on flss.entity_id = fls.id and flss.delete_type = 0 and flss.sql_script is not null
where fl.id in () and fl.id not in ()


##### 3.7 查询主表触发的SQL联动，赋值给明细的

SELECT fl.id as '联动id',fl.linkage_name as '联动名字',fl.form_id as '表单id',f.name as '表单名字' from fd_linkage fl INNER JOIN form f on fl.form_id = f.id AND f.IS_DELETE = 0 and f.TENANT_KEY = 't82kg113nu' 
where fl.tenant_key = 't82kg113nu' and fl.delete_type = 0 and fl.id in (
  SELECT flma.entity_id from fd_linkage_monitor_action flma 
    LEFT JOIN fd_linkage_monitor_field flmf on flma.id = flmf.entity_id AND flmf.delete_type = 0 and flmf.TENANT_KEY = 't82kg113nu' 
    LEFT JOIN form_field ff on flmf.target_field = cast(ff.id as char) and ff.TENANT_KEY = 't82kg113nu'
    where flma.delete_type = 0 and (flma.action_type in ('onLoadForm','onLoadFormEdit','onLoadFormCreate') or ff.sub_form_id is null)
    and flma.entity_id in (
      SELECT fls.entity_id from fd_linkage_source fls 
        INNER JOIN fd_linkage_source_mapping flsm on fls.id = flsm.entity_id AND flsm.delete_type = 0 and flsm.TENANT_KEY = 't82kg113nu' 
        INNER JOIN form_field ff on flsm.target_field = cast(ff.id as char) and ff.TENANT_KEY = 't82kg113nu'
        where fls.delete_type = 0 and fls.linkage_type = 'sql' and ff.TENANT_KEY = 't82kg113nu' and ff.sub_form_id is not null
    )
)


##### 3.8 查询载入时触发赋值给明细的联动

> 统计载入时触发，赋值给明细字段的联动

SELECT fl.id as '联动id',fl.linkage_name as '联动名字',fl.form_id as '表单id',f.name as '表单名字' from fd_linkage fl INNER JOIN form f on fl.form_id = f.id
where fl.tenant_key = 't82kg113nu' and fl.delete_type = 0 
  and EXISTS (
    SELECT 1 from fd_linkage_monitor_action where delete_type = 0 and action_type in ('onLoadForm','onLoadFormEdit','onLoadFormCreate')
    AND fl.id = fd_linkage_monitor_action.entity_id and EXISTS (
      SELECT 1 from fd_linkage_source where delete_type = 0 and id in (
        SELECT entity_id from fd_linkage_source_mapping flsm where flsm.delete_type = 0 and EXISTS (
          SELECT id from form_field ff where ff.delete_type = 0 and ff.sub_form_id is not null and flsm.target_field = cast(ff.id as char)
        )
      ) AND fl.id = fd_linkage_source.entity_id
    )
  )


##### 3.3.9 查询函数联动有多个联动设置的

> E9迁移多行函数，相互依赖

SELECT fl.id as '联动id',fl.linkage_name as '联动名字',fl.form_id as '表单id',f.name as '表单名字' from fd_linkage fl 
INNER JOIN form f on fl.form_id = f.id AND f.IS_DELETE = 0 and linkage_type in ('excel')
    WHERE fl.id in (
      SELECT entity_id from fd_linkage_source where delete_type = 0 and linkage_type = 'excel' GROUP BY entity_id HAVING count(entity_id) > 1
)


##### 3.4.0 查询源码JS含有某些关键字

> 查询二开源码关键字，返回表单布局名称和表单名称

select c.id as "布局Id", c.NAME as "布局名称", f.id as "表单id", f.name as "表单名称" from ebdd_page_extended a
left join ebdd_page_layout b on a.id = b.page_id and b.delete_type = 0
left join form_layout_multiple c on a.page_id = c.VERSION_ID and c.delete_type = 0
INNER JOIN form f on f.id = c.FORM_ID  and f.delete_type = 0
where a.delete_type = 0 and (
  b.source_code like CONCAT('%', '.formField.id', '%') or
  b.source_code like CONCAT('%', '.formField?.id', '%') or
  b.source_code like CONCAT('%', '?.formField?.id', '%')
)

// 只查流程活动版本的布局
// c.ref_id = wb.id不含动态布局，过滤活动版本用
select c.terminal_type ,c.id as "布局Id", c.NAME as "布局名称", f.id as "表单id", f.name as "表单名称",wb.workflowname as "工作流名称",wb.tenant_key as '租户标识' from ebdd_page_extended a
left join ebdd_page_layout b on a.id = b.page_id and b.delete_type = 0
left join form_layout_multiple c on a.page_id = c.VERSION_ID and c.delete_type = 0
INNER JOIN form f on f.id = c.FORM_ID  and f.delete_type = 0
INNER JOIN weaver_wfp.wfp_relateform wrf on wrf.relatekey = c.FORM_ID and wrf.delete_type = 0
INNER join weaver_wfp.wfp_base wb on wb.id = wrf.workflowid and wb.delete_type = 0
where a.delete_type = 0 and (
  b.source_code like CONCAT('%', '.formField.id', '%') or
  b.source_code like CONCAT('%', '.formField?.id', '%') or
  b.source_code like CONCAT('%', '?.formField?.id', '%')
) and wb.id is not null and c.ref_id = wb.id and wb.status = 1


##### 3.4.1 统计可视化联动赋值有重名列

SELECT fl.id as '联动id',fl.linkage_name as '联动名字',fl.form_id as '表单id',f.name as '表单名字' from fd_linkage fl INNER JOIN form f on fl.form_id = f.id
where fl.tenant_key = 't82kg113nu' and fl.delete_type = 0 and fl.id in (
  SELECT entity_id from fd_linkage_source where id in (
    SELECT entity_id from fd_linkage_source_mapping flsm1 where delete_type = 0 and source_table is not null and EXISTS (
        SELECT 1 from fd_linkage_source_mapping flsm2 where delete_type = 0 and flsm1.entity_id = flsm2.entity_id and flsm1.source_field = flsm2.source_field and flsm2.source_table is not null and flsm1.source_table != flsm2.source_table
    )
  ) and delete_type = 0 and linkage_type = 'template'
)


##### 3.4.2 统计可视化联动相同表名联表查询

SELECT fl.id as '联动id',fl.linkage_name as '联动名字',fl.form_id as '表单id',f.name as '表单名字' from fd_linkage fl INNER JOIN form f on fl.form_id = f.id
where fl.tenant_key = 't82kg113nu' and fl.delete_type = 0 and fl.id in (
  SELECT entity_id from fd_linkage_source where id in (
      SELECT entity_id from fd_linkage_source_config where id in (
        SELECT entity_id from fd_linkage_source_config_table where delete_type = 0 GROUP BY entity_id,source_field HAVING count(source_field) > 1
      )
  ) and delete_type = 0 and linkage_type = 'template'
)


##### 3.4.3 查询联动名称

SELECT 
    fl.id AS '联动id',
    fl.linkage_name AS '联动名字',
    fl.form_id AS '表单id',
    f.name AS '表单名字',
    wb.workflowname AS "工作流名称"
FROM fd_linkage fl 
INNER JOIN form f ON fl.form_id = f.id AND f.IS_DELETE = 0
INNER JOIN weaver_wfp.wfp_relateform wrf ON wrf.relatekey = fl.FORM_ID AND wrf.delete_type = 0
INNER JOIN weaver_wfp.wfp_base wb ON wb.id = wrf.workflowid AND wb.delete_type = 0
where fl.linkage_name like '%名称关键字%'


### 4、二开一些未开放案例


#### 4.1 复写字段加高亮背景

/**
 * 字段变色高亮 
 */
 const colorCfgs = ["hbzjwcd"];
 // 遍历
 colorCfgs?.forEach((fieldMark) => {
    const fieldId = formSdk.convertFieldNameToId(fieldMark);
    formSdk.proxyFieldContentComp(fieldId, (props, componentFn) => proxyFieldComp(props, componentFn));
 });

// 复写颜色
function proxyFieldComp(props, componentFn) {
  console.log(props);
  return React.createElement('div', {
    style: {
      backgroundColor: props?.widgetValue?.content === "100" ? '' : '#e3f2fd',
      borderRadius: '4px',
      width: "100%"
    }
  }, componentFn());
}


#### 4.2 选项卡tab受控与下拉选项

> 下拉选项，一对一，按照下标对应选项卡tab

/**
 * selField 下拉框、选项框的配置
 * tabField 受控的选项卡租金啊
 * optByTab 下拉选项值，对应选项卡标签页
 */
 const cfg = {
    selField: { key: "xlfxk_fx8a", symbol: "main" },
    tabField: { key: "xxk_vxx9", symbol: "main" },
    optByTab: {
    "0": "57IVljrlel",
    "1": "vjrJFtRecf",
    "2": "gQI8s2_d0X"
    }
 }

const selField = formSdk.convertFieldNameToId(cfg.selField.key, cfg.selField.symbol);
const tabField = formSdk.convertFieldNameToId(cfg.tabField.key, cfg.tabField.symbol);
formSdk.bindFieldChangeEvent(selField, (data) => syncTabs(data.value), { scope: window.WeFormSDK.CHANGE_EVENT_LINKAGE });
syncTabs(formSdk.changeFieldValue(selField));

function syncTabs(fieldValue) {
  const value = fieldValue?.split(",")?.filter((a) => a);
  const tabIds = value?.map((val) => cfg?.optByTab?.[val])?.filter((a) => a);
  formSdk.changeTabItemAttr(tabField, Object.values(cfg.optByTab)?.join(",") || "", "3");
  formSdk.changeTabItemAttr(tabField, tabIds?.join(",") || "", "2");
  formSdk.switchTabItem(tabField, tabIds?.[0], "2");
}


#### 4.3 指定列去重后合计不重复值

> 需求要点：

> 1、在指定表单中，根据明细【付款编码】、【付款资金类型】两列为重复依据，去重后再合计到主表

当前实现： 在指定明细表下，配置去重参考列，配置合计列，以及合计目标

要求：明细字段必须是同一个明细表内，合计字段必须是主表字段

> [https://weapp.yunteams.cn/sp/formreport/designer/business/1205955747967303681](https://weapp.yunteams.cn/sp/formreport/designer/business/1205955747967303681)

const FORM_CFG = {
  detailKey: "ft_shm_mxe_mxb1",
  repeatMark: ["wx_xldxk", "wx_dxwb"],
  sumCfgs: [
    { target: "dxwb_qbtv", source: ["wx_je1"] },
    { target: "dxwb_ypdk", source: ["wx_je2"] }
  ]
}

// 获取明细表fieldId
const detailId = formSdk.convertFieldNameToId(FORM_CFG.detailKey);
// 获取明细表内字段fieldId
const repeatMarks = FORM_CFG.repeatMark?.map((mark)=> formSdk.convertFieldNameToId(mark, detailId));

// 加载运行一次
sumSourceToTarget();
// 明细值变更运行事件绑定, 必须都是同一个明细下的
let monitorMarks = [...FORM_CFG.repeatMark];
FORM_CFG?.sumCfgs?.forEach((sumCfg) => monitorMarks.push(...sumCfg?.source));
monitorMarks?.forEach((souMark) => {
  const souId = formSdk.convertFieldNameToId(souMark, detailId);
  formSdk.bindFieldChangeEvent(souId, () => sumSourceToTarget(), { scope: window.WeFormSDK.CHANGE_EVENT_CHANGE });
});
// 添加明细行、删除明细行
formSdk.registerAction(`${window.WeFormSDK.ACTION_ADDROW}${detailId}`, () => sumSourceToTarget());
formSdk.registerAction(`${window.WeFormSDK.ACTION_DELROW}${detailId}`, () => sumSourceToTarget());

/**
 * 先去重再合计
 */
  function sumSourceToTarget() {
    let map = {};
    // 取出数据并去重
    const tableDatas = formSdk.getDetailData(detailId);
    const filterDatas = tableDatas?.filter((rowData) => {
    // 取出去重标识列，字段数据不能少于配置数量，且必须都不为空
    const repeatObjs = repeatMarks?.map((mark) => rowData?.[mark]);
    if (repeatObjs?.length === FORM_CFG.repeatMark.length && repeatObjs?.every((fieldObj) => isNotEmpty(fieldObj))) {
      const repeatKey = repeatObjs?.map((fieldObj) => buildValue(fieldObj))?.join("-");
      if (!map[repeatKey]) {
        map[repeatKey] = rowData;
        return true;
      }
    }
    return false;
    });

  // 按照配置合计数据到主表
  FORM_CFG.sumCfgs?.forEach((sumMark) => {
    const targetId = formSdk.convertFieldNameToId(sumMark?.target, "main");
    if (targetId) {
      const souIds = sumMark.source?.map((mark) => formSdk.convertFieldNameToId(mark, detailId));
      const souValues = souIds?.map((sourId) => {
        return filterDatas?.map((rowData) => rowData?.[sourId]?.value || "0")?.filter((a) => a)?.join("+") || "0";
      });
      const sum = eval(souValues?.join("+")) || "0";
      formSdk.changeFieldValue(targetId, { value: sum });
    }
  })
}

/**
 * 字段属性转文本
 */
 function buildValue(fieldObj) {
    if (fieldObj?.specialObj) {
    return fieldObj?.specialObj?.map((a) => a.id)?.filter((a) => a)?.join(",");
    }
    return fieldObj?.value || "";
 }

/**
 * 字段数据判空
 */
 function isNotEmpty(fieldObj) {
    if (fieldObj?.value || fieldObj?.specialObj?.length > 0) {
    return true;
    }
    return false;
 }


#### 4.4 JS实现主表选择一个明细添加一行

// 主表⼈员id
const mainEmpField = formSdk.convertFieldNameToId("ryxz_u3ny", "main");
// 明细表id
const detailMark = formSdk.convertFieldNameToId("shm_dlry_mxb1");
// 明细⼈员
const mxEmpField = formSdk.convertFieldNameToId("ryxz_p7lu", detailMark, false);
debugger;
// 绑定变更事件
formSdk.bindFieldChangeEvent(mainEmpField, () => {
  // 取出值
  const empList = formSdk.getBrowserOptionEntity(mainEmpField);
  updateDetailData(detailMark, empList);
});
/**
 * 明细数据添加、删除⾏
 */
 function updateDetailData(detailMark, dataList) {
    // 取明细列的值，校验更新还是新增，不存在的要删除
    const tableDatas = formSdk.getDetailData(detailMark);
    // 判断要添加的⾏
    const addDataList = dataList?.filter((data) => {
    return !tableDatas?.some((rowData) => rowData[mxEmpField]?.id === data.id);
    })
    // 判断要删除的⾏
    const delRowIds = tableDatas?.filter((rowData) => {
    return !dataList?.some((data) => rowData[mxEmpField]?.id === data.id);
    })
    // 删除明细⾏
    if (delRowIds && delRowIds.length > 0) {
    const delStr = delRowIds?.map((a) => a.rowId)?.join(",");
    formSdk.delDetailRow(detailMark, delStr);
    }
    // 添加明细⾏
    if (addDataList && addDataList.length > 0) {
    const addDatas = addDataList?.map((empObj) => ({ [mxEmpField]: { specialObj: [empObj] } }))
    // ⽣成明细表⾏数据，设置id、名称的数据
    formSdk.addDetailData(detailMark, addDatas);
    }
 }


#### 4.5 对中间表执行进行明细数据补全

> 解决中间表执行动作流问题，解决明细结构不全，指定动作流取到其他行值

/**
 * 转数据使用
 */
 function listObjToObjVArray(list, handlerKey, handlerValue) {
    const obj = {};
    list?.forEach((entity) => {
    const key = handlerKey(entity);
    obj?.[key] ? obj[key].push(handlerValue(entity)) : obj[key] = [handlerValue(entity)];
    });
    return obj;
 };

/**
 * 自动补全明细结构
 */
  function autoComplete(fieldDatas) {
    // 获取明细数据全部字段id
    const subFieldId = new Map();
    const mixKv = listObjToObjVArray(fieldDatas, (a) => a.subFormId, (a) => a.fieldId)
    Object.keys(mixKv).forEach((key) => subFieldId.set(key, [...new Set(mixKv[key])]))

  // 对明细数据补全
  const dataList = [];
  const tables = listObjToObjVArray(fieldDatas, (a) => a.subFormId, (a) => a);
  // 遍历多个明细表数据
  Object.keys(tables).forEach((tableId) => {
    // 获取这个明细的参考字段集
    const tableFieldIds = subFieldId.get(tableId);
    // 明细数据转成二维数组，以行号为界
    const rowDatas = listObjToObjVArray(tables[tableId], (a) => a.dataIndex, (a) => a);
    // 遍历每一行的明细
    Object.keys(rowDatas).forEach((rowKey) => {
      const rowData = rowDatas[rowKey];
      // 只有参考字段集，大于当前行字段数，才需要补全
      if (tableFieldIds.length > rowData?.length) {
        const rowFieldData = listObjToObjVArray(rowData, (a) => a.fieldId, (a) => a);
        // 根据字段集遍历，取当前行字段数据，取不到的分配默认状态
        tableFieldIds?.forEach((tableFieldId) => {
          if (!rowFieldData[tableFieldId]) {
            dataList.push({
              fieldId: tableFieldId,
              dataIndex: parseInt(rowKey),
              subFormId: tableId,
              fieldType: "TEXT"
            })
          }
        })
      }
    })
  })
  return dataList;
}

// 开启采集
axios.interceptors.request.use((item) => {
  const { url, data } = item;
  // 控制仅拦截联动
  if (url && url.indexOf("/executeEsbFlow") > -1) {
    let { esbApiParam } = data || {};
    if ("820227817718550528" === esbApiParam.esbFlowId) {
      const autoFielDatas = autoComplete(esbApiParam.dataList);
      esbApiParam.dataList = [...esbApiParam.dataList, ...autoFielDatas];
      console.log(autoFielDatas);
    }
  }
  return item;
});

## 表单引擎

### 2024年4月16日培训文档

# Ecode二开之表单引擎培训文档


## 目录

[简介](https://docs.qq.com/aio/DUkRNeGxidXlyaFFH?qqapp=docs&entry_scene=1256&adtag=s_wx_mini_docs_1256&applet_id=fabb01ab-1133-41a6-ab74-7d0dc5416199&p=GILw5qc80au0B8uMII35Fu#%E7%AE%80%E4%BB%8B)

[准备工作](https://docs.qq.com/aio/DUkRNeGxidXlyaFFH?qqapp=docs&entry_scene=1256&adtag=s_wx_mini_docs_1256&applet_id=fabb01ab-1133-41a6-ab74-7d0dc5416199&p=GILw5qc80au0B8uMII35Fu#%E5%87%86%E5%A4%87%E5%B7%A5%E4%BD%9C)

[表单引擎功能](https://docs.qq.com/aio/DUkRNeGxidXlyaFFH?qqapp=docs&entry_scene=1256&adtag=s_wx_mini_docs_1256&applet_id=fabb01ab-1133-41a6-ab74-7d0dc5416199&p=GILw5qc80au0B8uMII35Fu#%E8%A1%A8%E5%8D%95%E5%BC%95%E6%93%8E%E5%8A%9F%E8%83%BD)

[二次开发教程](https://docs.qq.com/aio/DUkRNeGxidXlyaFFH?qqapp=docs&entry_scene=1256&adtag=s_wx_mini_docs_1256&applet_id=fabb01ab-1133-41a6-ab74-7d0dc5416199&p=GILw5qc80au0B8uMII35Fu#%E4%BA%8C%E6%AC%A1%E5%BC%80%E5%8F%91%E6%95%99%E7%A8%8B)

[实战案例](https://docs.qq.com/aio/DUkRNeGxidXlyaFFH?qqapp=docs&entry_scene=1256&adtag=s_wx_mini_docs_1256&applet_id=fabb01ab-1133-41a6-ab74-7d0dc5416199&p=GILw5qc80au0B8uMII35Fu#%E5%AE%9E%E6%88%98%E6%A1%88%E4%BE%8B)

[常见问题及解答](https://docs.qq.com/aio/DUkRNeGxidXlyaFFH?qqapp=docs&entry_scene=1256&adtag=s_wx_mini_docs_1256&applet_id=fabb01ab-1133-41a6-ab74-7d0dc5416199&p=GILw5qc80au0B8uMII35Fu#%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98%E5%8F%8A%E8%A7%A3%E7%AD%94)

[总结](https://docs.qq.com/aio/DUkRNeGxidXlyaFFH?qqapp=docs&entry_scene=1256&adtag=s_wx_mini_docs_1256&applet_id=fabb01ab-1133-41a6-ab74-7d0dc5416199&p=GILw5qc80au0B8uMII35Fu#%E6%80%BB%E7%BB%93)




## 简介;

**表单引擎的开放API**，用来操作表单数据相关，和表单数据相关，均可使用表单引擎API;

> 主要是将API和一些实际使用




## 准备工作

在开始二次开发之前，请确保您已经完成了以下准备工作：

了解HTML、CSS和JavaScript基础知识

了解Ecode二开规范




## 二次开发教程

本节将为您提供表单引擎的二次开发教程，包括：

使用说明

表单事件注册、拦截

字段基础操作（数据获取、修改）

字段事件绑定、组件复写

明细表操作相关

表单全局操作

特定字段类型操作




## 实战案例

本节将为您提供两个实战案例，以帮助您在实际项目中应用Ecode表单引擎的二次开发功能：




##### 在表单加载完毕，获取一个表单实例

> **一定要在表单初始化完成后才能获取，提前获取资源还未加载，将会报错**

pageSdk.on('formReady', (args) => {
  // 获取表单实例，获取最新打开的表单详情实例，也可以传参精确获取，参考1.1 获取sdk对象实例
  const weFormSdk = window.WeFormSDK.getWeFormInstance();
});


##### 获取文本字段、浏览字段，修改数据的方式

pageSdk.on('formReady', (args) => {
  // 获取表单实例，获取最新打开的表单详情实例，也可以传参精确获取，参考1.1 获取sdk对象实例
  const weFormSdk = window.WeFormSDK.getWeFormInstance();

  // 获取字段的fieldId，这个字段的dataKey是wbk1
  // fieldId123456789
  const wbkFieldId = weFormSdk.convertFieldNameToId("wbk1");
  const llkFieldId = weFormSdk.convertFieldNameToId("llk1");
  // 获取文本框的值，返回文本格式的字符串
  // 文本本身的值
  const wbkValue = weFormSdk.getFieldValue(wbkFieldId);
  // 获取浏览框的值，返回文本格式，多个用,隔开
  // 返回选项的id，多个用逗号隔开
  const llkValue = weFormSdk.getFieldValue(llkFieldId);

  // 如果要修改文本的值
  weFormSdk.changeFieldValue(wbkFieldId, { value: "这是个文本框的内容" });
  // 如果要修改浏览框的值
  weFormSdk.changeFieldValue(llkFieldId, { specialObj: [{ id: "1", name: "浏览1" }, { id: "1", name: "浏览1" }] });

  // -------------------------演示用分割线-------------------------------------
  // 如果还需要浏览框的名字，需要返回对象格式，使用这个
  // 返回对象数组，对象有id、name、data属性，data属性含有如：人员选择的头像、附件的附件信息大小、发票的详情等
  const llkOptions = weFormSdk.getBrowserOptionEntity(llkFieldId);

  // -------------------------演示用分割线-------------------------------------
  // 要获取明细的字段数据，必须需要有对应行号
  // 这里以明细表第一行为例，也可以取整列，使用5.3 获取明细行所有行Id

  // 获取明细表的id
  const mxTableId = weFormSdk.convertFieldNameToId("mxTable");

  // 获取明细表内的字段，如果datakey没有重名的， 可以直接根据dataKey获取，如：weFormSdk.convertFieldNameToId("mxwbk1")
  const mxWbkFieldId = weFormSdk.convertFieldNameToId("mxwbk1", mxTableId);
  const mxLlkFieldId = weFormSdk.convertFieldNameToId("mxllk1", mxTableId);

  // 获取明细表的第一行行号
  const firstRowId = weFormSdk.getDetailRowIdByIndex(detailMark, 1);

  // 获取第一行的字段数据, `${}`是ES6的语法，等价于(mxWbkFieldId+"_"+firstRowId)
  const mxWbkValue = weFormSdk.getFieldValue(`${mxWbkFieldId}_${firstRowId}`);
  const mxLlkValue = weFormSdk.getFieldValue(`${mxLlkFieldId}_${firstRowId}`);


  // 如果要修改明细表内文本的值
  weFormSdk.changeFieldValue(`${mxWbkFieldId}_${firstRowId}`, { value: "这是个文本框的内容" });
  // 如果要修改明细表内浏览框的值
  weFormSdk.changeFieldValue(`${mxLlkFieldId}_${firstRowId}`, { specialObj: [{ id: "1", name: "浏览1" }, { id: "1", name: "浏览1" }] });

});


##### 在表单保存前，合计明细人员到主表字段中，含去重

> 场景描述：在明细中填写每个员工信息， 在保存时将明细中的员工，汇总到一个主表字段中，并且要去重

pageSdk.on('formReady', (args) => {
  // 取最新的表单详情
  const weFormSdk = window.WeFormSDK.getWeFormInstance();
  // 明细表id
  const tableId = weFormSdk.convertFieldNameToId("ft_table2");
  // 明细人员字段id
  const mx_fp = weFormSdk.convertFieldNameToId("mx_ryxz", tableId);
  // 合计主表人员
  const sum = weFormSdk.convertFieldNameToId("zb_ryxz");

  // 注册保存事件
  weFormSdk.registerCheckEvent(window.WeFormSDK.OPER_SAVE, (successFn, failFn) => {
    // ...执行定义逻辑
    // 调用明细表的合计去重
    funSum();
    successFn();
  });

  /**
   * 合计去重
      */
    function funSum() {

    // 取行号
    const rowIds = weFormSdk.getDetailAllRowIndexStr(tableId)?.split(",")?.filter((a) => a);
    // 取明细列、人员选择列，并将[[],[],[]]转成[]
    const optionList = rowIds?.map((rowId) => weFormSdk.getBrowserOptionEntity(`${mx_fp}_${rowId}`))?.flat(1);
    
    // 去重
    let optionObj = {};
    const allOptions = optionList?.filter((option) => {
      if (!optionObj[option.id]) {
        optionObj[option.id] = option;
        return true;
      }
      return false;
    });
    // 计算合计并写入
    weFormSdk.changeFieldValue(sum, { specialObj: allOptions });
  }
});
##### 


##### 明细数值字段的合计自定义渲染

import { regOvProps } from '@weapp/utils';
import { observer } from 'mobx-react';

/**
 * 复写合计，内置受控、计算、渲染dom
 */
 const SummaryCom = observer((props: any) => {
    const { com } = props;
    const { fieldId, subFormId } = com.config;
    const weFormSdk = window.WeFormSDK.getWeFormInstance();
    const rowIdStr = weFormSdk.getDetailAllRowIndexStr(subFormId);
    const sum = rowIdStr.split(',').reduce((prev: any, cur: any) => {
        const fieldValue = weFormSdk.getFieldValue(`${fieldId}_${cur}`);
        const num = Number(fieldValue) || 0;
        prev += num;
        return prev;
    }, 0);
    return (
        <div>
            <span>合计（自定义）：</span>
            <span>{sum}</span>
        </div>
    );
 });

/**
 * ecode拦截Table组件，复写渲染内容
 */
 regOvProps('weappUi', 'Table', (props: any) => {
    props.columns = props.columns.map((column: any) => {
        if (typeof column.summaryRender === 'function') {
            column.summaryRender = (data: any, column: any) => {
                return (
                    <SummaryCom com={column.com} />
                );
            };
        }
        return column;
    });
    return props;
 }, 0);


## 常见问题及解答

本节将为您解答在**表单引擎二次开发**过程中可能遇到的常见问题：

如何获取明细表内某一字段，整列的数据？

> 要遍历明细行获取，步骤：1、先获取明细表id；2、获取明细表所有行的rowId；3、遍历所有行，取所有行的该字段数据

对字段的读写属性，设置编辑不生效

> 检查是否为流程只读，不可编辑表单时，不可设置为编辑，隐藏、隐藏行正常使用

> 检查是否流程字段权限控制

绑定字段变更不生效

> 检查绑定的字段id是否有效

流程提交保存超时、提示二开代码拦截超时

> 这是【2.1 注册拦截事件，指定动作执行前触发，并可阻断/放行后续操作】拦截，超过25s未完成会提示，排查是否未按照要求调用【**成功：successFn : 失败：failFn】**

流程提交拦截，修改了表单数据保存没生效

> 检查是否使用的【2.1 注册拦截事件，指定动作执行前触发，并可阻断/放行后续操作:registerCheckEvent】事件，而非流程的提交事件；

> 检查是否使用的【2.2 注册钩子事件，指定动作完成后触发:registerAction】，这个是执行后的事件

明细字段值变更后，通过原生JS修改DOM不生效

> 适当加上setTimeout延时试下，一般是因为事件和DOM刷新是串行的，或者DOM渲染的多还有部分没刷新




## 总结

通过本培训文档，您应该已经了解了【表单引擎的二次开发】相关知识。现在，您可以开始在自己的项目中应用这些知识，为您的网站创建功能丰富的表单。如果您在开发过程中遇到任何问题，请随时查阅【表单引擎】的官方文档和社区支持。

### 其他

### 上半年的主要工作

1、字段联动：a、配置预检，属于提升易用性，点击一键检测，快速定位配置问题；b、动作流联动合并执行，提高执行速度和响应；c、联动数据集缩减，减少IO资源消耗

2、显示属性联动：a、支持下拉选项属性受控，可以控选项一隐藏、只读、显示，实现选项随条件的变化而变化

3、JSSDK：7.9 控制选项型的选项禁用；8.2 控制选项卡的标签属性：显隐、禁用；

4、函数：a、复用函数解释器节约资源；b、支持运行软删除函数，提升可用性


### 下半年的重点事项

1、字段联动：a、联动跨明细赋值；b、明细的合并执行，提升性能；c、后端执行联动赋值，覆盖后端变更场景

2、显示属性联动：a、普通条件支持变量，满足字段的动态条件判断场景，比如当前操作人包含人员选择时，显示某些特定选项

3、函数：a、多重函数解释器复用，可通过本地缓存，规避高频运行卡缓存情况；

4、4.1 整合模块字段值变更事件，实现表单内交互闭环；b、提升易用性和更多场景覆盖，比如：添加到指定明细行前后等；c、不断完善场景分享和排查引导


### 当前存在不足和提升计划

联动配置类、二开类咨询和排查较多，改进思路是：1、持续提升易用性，降低使用门槛，2；不断完善完善文档，及排查手册


### 个人发展规划

提升产品易用性，简单好用为主要目标


### 对公司及各部门意见或建议	

目前我对公司及各部门没有特别的意见或建议，我将继续保持高度的合作和沟通，为公司的发展贡献力量。


### 对产品的建议

不断的提升AI智能化检索与汇总能力，并从持续的使用中，反复提取训练

### 前端JSSDK

#### 前端JSSDK案例库

### 1、复写组件props


#### 拦截自定义页面的props，并取表单引擎的customParam填充进去

> 也可以做自定义url

import { regOvProps } from '@weapp/utils';

regOvProps('weappEbdcoms', 'CustomPage', (props) => {
  console.log(props);
  if(props.formProps?.customParam){
      props.config.url = props.config.url + "?customParam="+JSON.stringify(props.formProps?.customParam);
  }
  return props;
});
### 2、拦截保存事件类


#### 在表单保存前，合计明细人员到主表字段中，含去重

pageSdk.on('formReady', (args) => {
  const weFormSdk = window.WeFormSDK.getWeFormInstance();
  // 明细表id
  const tableId = weFormSdk.convertFieldNameToId("ft_table2");
  // 明细人员字段id
  const mx_fp = weFormSdk.convertFieldNameToId("mx_ryxz", tableId);
  // 合计主表人员
  const sum = weFormSdk.convertFieldNameToId("zb_ryxz");

  // 注册保存事件
  weFormSdk.registerCheckEvent(window.WeFormSDK.OPER_SAVE, (successFn, failFn) => {
    // ...执行定义逻辑
    funSum();
    successFn();
  });

  /**
   * 合计去重
      */
    function funSum() {

    // 取行号
    const rowIds = weFormSdk.getDetailAllRowIndexStr(tableId)?.split(",")?.filter((a) => a);
    // 二维的数据
    const optionList = rowIds?.map((rowId) => weFormSdk.getBrowserOptionEntity(`${mx_fp}_${rowId}`))?.flat(1);
    
    // 去重
    let optionObj = {};
    const allOptions = optionList?.filter((option) => {
      if (!optionObj[option.id]) {
        optionObj[option.id] = option;
        return true;
      }
      return false;
    });
    // 计算合计并写入
    weFormSdk.changeFieldValue(sum, { specialObj: allOptions });
  }
});


### 3、修改字段值


#### a.塞值附件控件，且可以预览

> 使用changeFieldValue设置的数据， 如果是附件，除了id和name外，还要有个data属性放附件的数据， 例如：

> data数据如果没有，从文档附件模块咨询获取接口

WeFormSDK.getWeFormInstance().changeFieldValue('942418934032392194', {
    specialObj:[{
    "id": "942420806814711811",
    "name": "更新sqlserver.sql",
    "data": {
        "fileid": "942420806814711811",
        "name": "更新sqlserver.sql",
        "size": 468,
        "extName": "sql",
        "type": "application/octet-stream",
        "img": false,
        "uploadUser": "3573401395003385295",
        "uploadUserName": "孙浩明",
        "uploadTime": 1702624443868,
        "doc": true,
        "docId": "7780262444391755798",
        "loadlink": "https://test-1301503941.cos.ap-shanghai.myqcloud.com/t82kg113nu/1128a55a-6ea3-4ad3-8b5c-f55d741a9025?sign=q-sign-algorithm%3Dsha1%26q-ak%3DAKIDqcLvPmX4XO8iMjIHoSG3CDXiiXkn8EJD%26q-sign-time%3D1702624444%3B1702628044%26q-key-time%3D1702624444%3B1702628044%26q-header-list%3Dhost%26q-url-param-list%3Dresponse-content-disposition%26q-signature%3D3e6eba57427f58327eb9f999535ae5835384dbfa&response-content-disposition=attachment%3Bfilename%3D%25E6%259B%25B4%25E6%2596%25B0sqlserver.sql",
        "options": [
            {
                "id": "preview",
                "icon": "Icon-custom34-o",
                "content": "预览",
                "moreType": true
            },
            {
                "id": "download",
                "icon": "Icon-download02",
                "content": "下载",
                "moreType": false
            },
            {
                "id": "rename",
                "icon": "Icon-rename",
                "content": "重命名",
                "moreType": true
            },
            {
                "id": "editSecLevel",
                "icon": "Icon-daily-o",
                "content": "修改密级",
                "moreType": true
            },
            {
                "id": "version",
                "icon": "Icon-Unfinished-business-o",
                "content": "历史版本",
                "moreType": true
            },
            {
                "id": "reupload",
                "icon": "Icon-upload_again",
                "content": "替换附件",
                "moreType": true
            },
            {
                "id": "delete",
                "icon": "Icon-delete",
                "content": "删除",
                "moreType": false
            }
        ],
        "uploadType": "common",
        "ban": false,
        "secretLevel": 4,
        "validity": "公开",
        "folderId": 102
    },
    "type": "file"
}]
})


### 4、字段复写类


#### a.复写明细表的富文本变成按钮， 点击跳转链接

pageSdk.on('formReady', (args) => {
  // 获取表单实例
  const weFormSdk = window.WeFormSDK.getWeFormInstance();
  const fieldMark = weFormSdk.convertFieldNameToId("dxwb_01vz");
  const tableMark = weFormSdk.convertFieldNameToId("shm_fjszhc_mxb1");
  // 取所有行的行号
  const rowIds = weFormSdk.getDetailAllRowIndexStr(tableMark)?.split(",")||[];
  rowIds?.forEach((rowId)=>{
      const url = weFormSdk.getFieldValue(`${fieldMark}_${rowId}`);
      weFormSdk.proxyFieldComp(`${fieldMark}_${rowId}`, React.createElement('button', {onClick:()=> window.open(url)}, "点击"), '1');
  });
	// 扩展备注：如果有添加行，绑定添加行事件，再给添加的行复写添加按钮
});
### 5、综合场景类


#### a.根据主表选择在明细中分类、合计

> 使用主表的两个字段做分组， 相同的合并累加，示例中包含动态删除行、添加行、相同分组累加

pageSdk.on('formReady', (args) => {
  // 获取表单实例
  const weFormSdk = window.WeFormSDK.getWeFormInstance();
  // 获取来源字段、类型、数值
  const sourceTable = weFormSdk.convertFieldNameToId("sjlr");
  const sourceBm = weFormSdk.convertFieldNameToId("bmxz_2unw", sourceTable);
  const sourceType = weFormSdk.convertFieldNameToId("xldxk_k23j", sourceTable);
  const sourceNumber = weFormSdk.convertFieldNameToId("sz_u6av", sourceTable);
  // 获取目标明细表、字段、类型、数值
  const targetTable = weFormSdk.convertFieldNameToId("sjzs");
  const targetBm = weFormSdk.convertFieldNameToId("bmxz_1i4g", targetTable);
  const targetType = weFormSdk.convertFieldNameToId("xldxk_kw8s", targetTable);
  const targetSum = weFormSdk.convertFieldNameToId("sz_oue5", targetTable);

  // 来源值变更
  weFormSdk.bindFieldChangeEvent(`${sourceType},${sourceNumber}`, (data) => {
    countSourceToTarget();
  });
  // 添加行删除行的变化
  weFormSdk.registerAction(`${window.WeFormSDK.ACTION_ADDROW}${sourceTable}`, (rowIds, data) => {
    countSourceToTarget();
  });
  weFormSdk.registerAction(`${window.WeFormSDK.ACTION_DELROW}${sourceTable}`, (rowIds, data) => {
    countSourceToTarget();
  });


  /**
   * 分组合计数据
      */
    function countSourceToTarget() {

    let map = {};
    // 按照类型收集来源数据
    const tableDatas = weFormSdk.getDetailData(sourceTable);
    tableDatas?.forEach((rowData) => {
      const bmData = rowData[sourceBm]?.specialObj?.[0];
      const typeData = rowData[sourceType]?.specialObj?.[0];
      const bm = bmData?.id;
      const type = typeData?.id;
      const num = parseFloat(rowData[sourceNumber]?.value || "0");
      if (type) {
        const itemKey = `${bm}_${type}`;
        if (map[itemKey]) {
          map[itemKey]?.nums?.push(num);
        } else {
          map[itemKey] = {
            bmObj: bmData,
            typeObj: typeData,
            nums: [num]
          };
        }
      }
    });
    
    const targetDatas = weFormSdk.getDetailData(targetTable);
    // 对于消失的类型，删除行
    targetDatas?.forEach((rowData) => {
      const bm = rowData[targetBm]?.specialObj?.[0]?.id;
      const type = rowData[targetType]?.specialObj?.[0]?.id;
      if (bm && type) {
        const itemKey = `${bm}_${type}`;
        if (!map[itemKey]) {
          // 删除行号,根据rowId
          weFormSdk.delDetailRow(targetTable, rowData.rowId);
        }
      } else {
        // 删除行号,根据rowId
        weFormSdk.delDetailRow(targetTable, rowData.rowId);
      }
    });
    
    // 更新和新增
    Object.keys(map).forEach((key) => {
      const mapObj = map[key];
      const { nums, bmObj, typeObj } = mapObj || {};
      const sum = nums.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
      // 查找指定行
      const row = targetDatas?.find((rowData) => {
        return typeObj.id === rowData[targetType]?.specialObj?.[0]?.id && bmObj.id === rowData[targetBm]?.specialObj?.[0]?.id;
      })
      // 如果找到行则更新
      if (row) {
        const rowId = row.rowId;
        weFormSdk.changeFieldValue(`${targetSum}_${rowId}`, { value: sum });
      } else {
        //找不到则添加
        // 添加行并设置默认值
        weFormSdk.addDetailRow(targetTable, { [targetBm]: { specialObj: [bmObj] }, [targetType]: { specialObj: [typeObj] }, [targetSum]: { value: sum } })
      }
    });
  }

});


#### b.表单保存前，合计明细人员到主表字段中，含去重

> 可以基于此扩展更多，如多个主表合并到一个中

pageSdk.on('formReady', (args) => {
  const weFormSdk = window.WeFormSDK.getWeFormInstance();
  // 明细表id
  const tableId = weFormSdk.convertFieldNameToId("ft_table2");
  // 明细人员字段id
  const mx_fp = weFormSdk.convertFieldNameToId("mx_ryxz", tableId);
  // 合计主表人员
  const sum = weFormSdk.convertFieldNameToId("zb_ryxz");

  // 注册保存事件
  weFormSdk.registerCheckEvent(window.WeFormSDK.OPER_SAVE, (successFn, failFn) => {
    // ...执行定义逻辑
    funSum();
    successFn();
  });

  /**
   * 合计去重
      */
    function funSum() {

    // 取行号
    const rowIds = weFormSdk.getDetailAllRowIndexStr(tableId)?.split(",")?.filter((a) => a);
    // 二维的数据
    const optionList = rowIds?.map((rowId) => weFormSdk.getBrowserOptionEntity(`${mx_fp}_${rowId}`))?.flat(1);
    
    // 去重
    let optionObj = {};
    const allOptions = optionList?.filter((option) => {
      if (!optionObj[option.id]) {
        optionObj[option.id] = option;
        return true;
      }
      return false;
    });
    // 计算合计并写入
    weFormSdk.changeFieldValue(sum, { specialObj: allOptions });
  }
});


#### c、全局表单给标定字段赋值

> 全局任意表单打开机会，校验标定字段，满足则绑定事件，事件查询接口回显数据，兼容同在主表或明细中，不支持主表、明细混合

// 包含的模块清单
const _inModules = ["formdatareport", "biaoge", "ebuilderform", "ebuildercard"];
// 字段的映射关系
// cardno代表场景；  cardno: "cardno", name: "yhmc"代表必要字段对应的数据key,  toTableKey代表展示数据的明细表key; toAttrRelate代表接口返回属性和明细字段key不一致，转换的方式，如接口的name属性换成username赋值
// _monitorFieldRealte.cardno.toAttrRelate说名， 左侧key对应数仓返回属性名， 右侧对应表单字段key
const _monitorFieldRealte = {
    cardno: {
        name: "name1",
        cardno: "cardno",
        toAttrRelate: {
            name: "name1",
            linkphone: "linkphone",
            birthday: "birthday",
            building_code: "building_code",
            cardno: "cardno",
            community: "community",
            grid: "grid",
            grid_code: "grid_code",
            house_code: "house_code",
            nationid: "nationid",
            residential_address: "residential_address",
            sex: "sex",
            sq_code: "sq_code"
        }
    }
}

// 全局表单初始化完成回调
window.addEventListener('onFormReady', function (event) {
    const { formId, module } = event.detail || {};
    // 指定模块生效
    if (_inModules.includes(module)) {
        console.log(`表单初始化V2:${formId}_module`, event.detail);
        // 获取表单实例
        const weFormSdk = window.WeFormSDK.getWeFormInstance();
        // 身份信息场景,下层自带check
        bindCardno(weFormSdk);
    }
});

/**
 * 身份信息场景
 */
 function bindCardno(weFormSdk) {
    const _cardnoRelate = _monitorFieldRealte.cardno;
    const _fieldCardno = weFormSdk.convertFieldNameToId(_cardnoRelate.cardno);
    const _fieldName = weFormSdk.convertFieldNameToId(_cardnoRelate.name);
    // 必要字段存在绑定事件
    if (_fieldName && _fieldCardno) {
        // 绑定事件，对主表字段或明细字段绑定
        weFormSdk.bindFieldChangeEvent(`${_fieldCardno},${_fieldName}`, (data) => {
            const {rowId} = data;
            // 校验两个字段是否都有值且身份证是合法的
            const cardno = weFormSdk.getFieldValue(`${_fieldCardno}${rowId ? `_${rowId}` : ""}`);
            const name = weFormSdk.getFieldValue(`${_fieldName}${rowId ? `_${rowId}` : ""}`);
            if (cardno && name && isValidChineseID(cardno)) {
                getDemoData({cardno, name}).then((res) => {
                    const {code, data} = res;
                    // 数据录入明细中
                    if (200 === code && data) {
                        resDataToTarget({weFormSdk, data, rowId, toAttrRelate: _cardnoRelate.toAttrRelate});
                    }
                }).catch((error) => console.log(error));
            }else {
                noAutoClear({weFormSdk, rowId, toAttrRelate: _cardnoRelate.toAttrRelate})
            }
        });
    }
 }

/**
 * 数据放入明细中
 */
 function resDataToTarget(params) {
    const {rowId, toAttrRelate, data, weFormSdk} = params;
    const curDatas = typeof data === 'string' ? JSON.parse(data) : data;
    const curData = curDatas?.[0];
    if (curData) {
        let rowData = {};
        Object.keys(curData)?.forEach((key) => {
            const _attrId = weFormSdk.convertFieldNameToId(toAttrRelate?.[key] || key);
            if (_attrId) {
                rowData[`${_attrId}${rowId ? `_${rowId}` : ""}`] = {value: curData[key] || ""};
            }
        });
        // 有数据,回填
        if (Object.keys(rowData).length > 0) {
            weFormSdk.changeMoreField(rowData);
        }
    }
 }

/**
 * 空值根据配置关系清除
 * 保留扩展点，后续项目可自行实现逻辑
 */
 function noAutoClear(params) {
    const {rowId, toAttrRelate, weFormSdk} = params;
    let rowData = {};
    Object.values(toAttrRelate)?.forEach((key) => {
        const _attrId = weFormSdk.convertFieldNameToId(toAttrRelate?.[key] || key);
        if (_attrId) {
            rowData[`${_attrId}${rowId ? `_${rowId}` : ""}`] = {value: ""};
        }
    });
    // 清空数据,回填
    if (Object.keys(rowData).length > 0) {
        weFormSdk.changeMoreField(rowData);
    }
 }

/**
 * 实有人口应用根据证件号码和姓名获取人员信息接口
 */
 async function getDemoData(params) {
    const { access_token } = await getToken("65");
    console.log(access_token, params);
    // const res = await window.weappUtils.request({
    //     url: 'http://www.demo.cn/demo/demo',
    //     method: 'POST',
    //     params: JSON.stringify(params)
    // });
    // return res;
    // mock数据，正式使用时，把下面的删除，上面注释的放开
    return ({
        "code": 200,
        "data": [
            {
                "birthday": "2024-6-5",
                "building_code": "4403050080010100017",
                "cardno": "XRZhyYpQmzb8z5F6lc1254A==",
                "community": "福光社区",
                "grid": "440305008003014",
                "grid_code": "福光14",
                "house_code": "4403050080010100017000043",
                "linkphone": "CMiBiJ6lCyn8wdsah4h46w==",
                "name": "xxx",
                "nationid": "666",
                "residential_address": "xxx",
                "sex": "2",
                "sq_code": "440305008003"
            }
        ],
        "message": "success"
    })
 }

/**
 * 是否合法的中国拱门身份证信息
 */
 function isValidChineseID(id) {
    const regex = /^[1-9]\d{5}(18|19|20|21|22)?\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{3}(\d|[Xx])$/;
    return regex.test(id);
 }

#### 常见问题

##### 常见问题

## 介绍


### 1.说明




### 2.表单事件注册-常见问题


#### **注册拦截事件，指定动作执行前触发，并可阻断/放行后续操作**


#### **注册钩子事件，指定动作完成后触发**


#### 注册钩子事件、拦截事件不生效

> 1、排查控制台是否有报错，一般是因为写的代码报错，或ecode没加载上
> 
> 2、检查是否获取到实例，获取实例前是否绑定异步加载完成的事件: pageSdk.on('formReady', (args) => {});
> 
> 3、检查代码是否注册上，调试控制台执行以下代码，拦截事件看：**registerInterceptor, **钩子回调看：**registerHook**
> 
> WeFormSDK.getWeFormInstance().weFormApi.weFormApiHookFunForm




### 3.字段基础操作-常见问题


#### 获取单个字段值


#### 修改单个字段值


#### 获取字段值、修改字段值不生效，或者获取、修改的不正确

> 1、表单无明细字段，检查数据key是否正确、字段id是否获取到、修改值的格式是否正确，选项是浏览入参传数组，其他传value字符串
> 
> 2、表单有明细字段，一般是主表字段和明细字段的数据key有重复，获取字段id的***convertFieldNameToId，***需要传位置标示，主表(main)/具体明细表(明细表Id)； 其他同上一个排查方式
> 
> 3、检查是否模块模块字段，或者字段存在复写
> 
> 4、如果是一个EB页面下，有多张表单的情况，一定要注意获取实例问题，由于异步加载且速度不同，可能会获取错
> 
> > “WeFormSDK.getWeFormInstance()”取的是当前最后一次打开的，由于加载速度不同，可能获取的不固定，如下图，这个页面有两个表单，打开时获取字段id，有时能取到有时取不到，是因为实例获取不对，可以使用getBaseInfo中的formId和dataId来辅助识别
> > 
> > ![image.png](https://weapp.eteams.cn/api/file/preview?fileId=1022526297510813698&type=imgs)![image.png](https://weapp.eteams.cn/api/file/preview?fileId=1022526327724007440&type=imgs)






### 4.字段事件绑定




### 其他常见问题


#### 如何获取明细表内某一字段，整列的数据？

> 要遍历明细行获取，步骤：1、先获取明细表id；2、获取明细表所有行的rowId；3、遍历所有行，取所有行的该字段数据


#### 对字段的读写属性，设置编辑时不生效

> 检查是否为流程只读，不可编辑表单时，不可设置为编辑，隐藏、隐藏行正常使用

> 检查是否流程字段权限控制


#### 绑定字段值变更不生效

> 检查绑定的字段id是否有效


#### 流程提交保存超时、提示二开代码拦截超时

> 这是【2.1 注册拦截事件，指定动作执行前触发，并可阻断/放行后续操作】拦截，超过25s未完成会提示，排查是否未按照要求调用【**成功：successFn : 失败：failFn】**


#### 流程提交拦截，修改了表单数据保存没生效

> 检查是否使用的【2.1 注册拦截事件，指定动作执行前触发，并可阻断/放行后续操作:registerCheckEvent】事件，而非流程的提交事件；

> 检查是否使用的【2.2 注册钩子事件，指定动作完成后触发:registerAction】，这个是执行后的事件


#### 明细字段值变更后，通过原生JS修改DOM不生效

> 适当加上setTimeout延时试下，一般是因为事件和DOM刷新是串行的，或者DOM渲染的多还有部分没刷新

#### 表单引擎前端JSSDK文档

## **介绍**


#### **最新文档地址**：[在线文档](https://weapp.eteams.cn/build/techdoc/wdoc/index.html#/public/repository/856c9c16-862c-4e0d-8796-d2c11a37ca72/home)


#### **最新文档地址**：[在线文档](https://weapp.eteams.cn/build/techdoc/wdoc/index.html#/public/repository/856c9c16-862c-4e0d-8796-d2c11a37ca72/home)


#### **最新文档地址**：[在线文档](https://weapp.eteams.cn/build/techdoc/wdoc/index.html#/public/repository/856c9c16-862c-4e0d-8796-d2c11a37ca72/home)




#### 开发必看！！！


#### 开发必看！！！


#### 开发必看！！！

> **必看：**
> 
> **1、在编写JS二开代码时，一定要在表单初始化完成后再获取实例，否则会报错，通过文档1.2所示“**pageSdk.on('formReady')**”；**
> 
> **2、如果是在ecode中编写，****一定要确定是在表单初始化完成后，否则会报错，根据实际情况获取；**


#### 常见问题

> 路径跳转：[https://weapp.eteams.cn/build/techdoc/wdoc/index.html#/public/doc/a3476160-1c4e-42a2-b539-07a3eec342eb](https://weapp.eteams.cn/build/techdoc/wdoc/index.html#/public/doc/a3476160-1c4e-42a2-b539-07a3eec342eb)


#### 实用案例

> 路径跳转：
> 
> [https://weapp.eteams.cn/build/techdoc/wdoc/index.html#/public/doc/431d0470-1435-4d50-96c2-e4999efc92b7](https://weapp.eteams.cn/build/techdoc/wdoc/index.html#/public/doc/431d0470-1435-4d50-96c2-e4999efc92b7)
> 
> 
> ###

### 数据联动

### 工具包

统一工具类: FormListTool


##### 是否fastJson格式的json字符串

    /**
     * @author shmet
     * @date 2022/5/8
     * @desc 是否fastJson格式的json字符串
     */
    public static boolean isFastJsonFormat(String json) {
        try {
            if (json == null || json.length() == 0) {
                return false;
            } else {
                JSON.parse(json);
                return true;
            }
        } catch (Exception e) {
            return false;
        }
    }示例：

String json = "";
boolean isJson = FormUtils.isFastJsonFormat(String json);
##### 列表追加元素

向列表中追加元素，如果列表是null，则创建一个列表

    /**
     * @author shmet
     * @date 2022/7/1
     * @desc list, add，如果为null则创建在加入
     */
    public static <T> List<T> listAppends(List<T> lists, T... ts) {
        if (lists == null) {
            lists = new ArrayList<>(Arrays.asList(ts));
        } else {
            lists.addAll(Arrays.asList(ts));
        }
        return lists;
    }示例：

// 示例一
List list = FormUtils.listAppends(new ArrayList(), 1L , 2L);
// 示例二
list = FormUtils.listAppends(list, 3L , 4L);
##### 列表循环体

    /**
     * @author shmet
     * @date 2022/7/1
     * @desc List遍历，含判空逻辑
     * handler(T, index)
     */
    public static <T> void listForEach(List<T> lists, HandlerPushData<? super T, ? super Integer> handler) {
        if (lists != null && lists.size() > 0) {
            for (int i = 0; i < lists.size(); i++) {
                handler.handler(lists.get(i), i);
            }
        }
    }示例：

// 这次查询，返回的结果可能是null
List list = formRestFactory.getBusinessRest(param.getModule()).listBusinessDatas(param);
FormUtils.listForEach(businessDataList, (businessData, i) -> {
    System.out.println("obj:" + businessData + ", index:" + i);
});
##### 列表对象转指定泛型列表

List<Object>转list任一，目标类型根据泛型来

    /**
     * 列表对象转指定泛型列表
     *
     * @param lists:   任意类型List
     * @param clazz:   返回值类型的class，如String.class
     * @param handler: 取值lamdbe表达式, 如: (data)-> data.getId()
     * @Description: 对象列表转Long列表
     * @Author: shmet
     * @Date: 2021年12月29日16:38:13
     * @return: java.util.List<java.lang.Long>
     */
    public static <T, K> List<K> listObjToList(List<T> lists, Class<K> clazz, HandlerString<? super T, ? super K> handler) {
        List<K> ids = new ArrayList<>();
        if (lists != null && lists.size() > 0) {
            for (T t : lists) {
                K k = (K) handler.handler(t);
                if (k != null) {
                    ids.add((K) handler.handler(t));
                }
            }
        }
        return ids;
    }示例：

// 示例一，从bean对象转基础类型
List<Form> list = new ArrayList<Form>();
FormUtils.listObjToList(list, Long.class, (form) -> form.getId());
// 示例二，基础类型列表构造对象
List<Long> ids = new ArrayList<Long>();
FormUtils.listObjToList(ids, Long.class, (id) -> {
    return new Form(id);
});
##### 多列表合并指定泛型列表

将List<List>转成List

/**
     * 列表对象转指定泛型列表， 变长结果集
     *
     * @param lists:   任意类型List
     * @param clazz:   返回值类型的class，如String.class
     * @param handler: 取值lamdbe表达式, 如: (data)-> data.getId()
     * @Description: 对象列表转Long列表
     * @Author: shmet
     * @Date: 2022年7月15日18:03:45
     * @return: java.util.List<java.lang.Long>
     */
    public static <T, K> List<K> listObjToListNest(List<T> lists, Class<K> clazz, HandlerString<? super T, ? super List<K>> handler) {
        List<K> ids = new ArrayList<>();
        if (lists != null && lists.size() > 0) {
            for (T t : lists) {
                List<K> listK = (List<K>) handler.handler(t);
                if (listK != null && listK.size() > 0) {
                    ids.addAll(listK);
                }
            }
        }
        return ids;
    }示例：

List<List<Long>> lists = new ArrayList<List<Long>>();
List<Long> longList = FormUtils.listObjToListNest(lists, Long.class, (list) -> list);
##### 过滤列表，逐个比较属性中的某个值，保留满足的

列表对象转指定泛型列表多一个比较，返回true才录入

    /**
     * 列表对象转指定泛型列表
     * 多一个比较，返回true才录入
     *
     * @param lists:   任意类型List
     * @param clazz:   返回值类型的class，如String.class
     * @param handler: 取值lamdbe表达式, 如: (data)-> data.getId()
     * @Description: 对象列表转Long列表
     * @Author: shmet
     * @Date: 2021年12月29日16:38:13
     * @return: java.util.List<java.lang.Long>
     */
    public static <T, K> List<K> listObjToListByCompare(List<T> lists, Class<K> clazz, HandlerString<? super T, ? super K> handler, HandlerCompare<? super T, ? super K> handlerCompare) {
        List<K> ids = new ArrayList<>();
        if (lists != null && lists.size() > 0) {
            for (T t : lists) {
                if (handlerCompare.compare(t, (K) handler.handler(t))) {
                    ids.add((K) handler.handler(t));
                }
            }
        }
        return ids;
    }示例：

List<Form> list = new ArrayList<Form>();
FormUtils.listObjToListByCompare(list, Long.class,
          (form) -> form.getId(),
          (form) -> "formdatareport".equals(form.getModule()));
##### 列表转任意泛型Map

List<Object>转Map<Key, Object>

    /**
     * 列表对象转map, Key由泛型定义
     * 示例List<Object> -> Map<key, Object>
     *
     * @param lists:   任意类型List
     * @param clazz:   返回值类型的class，如: String.class
     * @param handler: 取值lamdbe表达式, 如: (data)-> data.getId()
     * @Description: list转map，k v为this
     * @Author: shmet
     * @Date: 2021年12月29日16:38:17
     * @return: java.util.List<java.lang.Long>
     */
    public static <T, K> Map<K, T> listObjToMapKey(List<T> lists, Class<K> clazz, HandlerString<? super T, ? super K> handler) {
        Map<K, T> map = new HashMap<>();
        if (lists != null && lists.size() > 0) {
            for (T t : lists) {
                map.put((K) handler.handler(t), t);
            }
        }
        return map;
    }示例：

List<Form> list = new ArrayList<Form>();
Map<Long, Form> map = FormUtils.listObjToMapKey(list, Long.class, 
                                (form)-> form.getId());
##### 列表转任意泛型Map，且value是某一属性

List<Form>转Map<Long, String> id：name

    /**
     * 列表对象转map, Key由泛型定义
     * 示例List<Object> -> Map<key, value>
     *
     * @author shmet
     * @date 2022/3/21
     * @desc 转注入处理map的结构中，不使用List<T>类型
     */
    public static <T, K, J> Map<K, J> listObjToMapKey(List<T> lists, Class<K> clazz, HandlerString<? super T, ? super K> handlerKey, HandlerString<? super T, ? super J> handlerValue) {
        Map<K, J> map = new HashMap<>();
        if (lists != null && lists.size() > 0) {
            for (T t : lists) {
                J val = (J) handlerValue.handler(t);
                if (val != null) {
                    map.put((K) handlerKey.handler(t), val);
                }
            }
        }
        return map;
    }示例：

List<Form> list = new ArrayList<Form>();
Map<Long, Form> map = FormUtils.listObjToMapKey(list, Long.class, 
                                (form)-> form.getId(),
                                (form)-> form.getName());
##### 列表数据分组，根据某一个Key来划分

List<Form>转Map<String,List< Form>> module: list<Form>

    /**
     * @author shmet
     * @date 2022/8/19
     * @desc 对数据进行分组，返回t array<obj>
     */
    public static <T, K> Map<K, List<T>> listObjToMapGroup(List<T> lists, Class<K> clazz, HandlerString<? super T, ? super K> handlerKey) {
        Map<K, List<T>> map = new HashMap<>();
        if (lists != null && lists.size() > 0) {
            for (T t : lists) {
                K k = (K) handlerKey.handler(t);
                if (Objects.nonNull(k)) {
                    if (map.containsKey(k)) {
                        map.get(k).add(t);
                    } else {
                        map.put(k, newArrayList(t));
                    }
                }
            }
        }
        return map;
    }示例：

List<Form> list = new ArrayList<Form>();
Map<String, List<Form>> map = FormUtils.listObjToMapGroup(lists, String.class, 
                                        (form)-> form.getModule());
##### 列表包含某个值

List<Form>包含module是formdatareport的

    /**
     * list对象包含某个值
     *
     * @param lists   列表
     * @param k       比较值
     * @param handler 比较器
     * @param <T>     列表泛型
     * @param <K>     比较值泛型
     * @return
     */
    public static <T, K> boolean listInclude(List<T> lists, K k, HandlerCompare<? super T, ? super K> handler) {
        if (lists != null && lists.size() > 0) {
            for (T data : lists) {
                if (handler.compare(data, k)) {
                    return true;
                }
            }
        }
        return false;
    }示例：

List<Form> list = new ArrayList<Form>();
boolean isInclude = FormUtils.listInclude(list, String.class, 
                              (form)-> "formdatareport".equals(form.getModule()));
##### 列表数据过滤

List<Form> 过滤掉module是formdatareport的

    /**
     * 根据条件过滤列表数据
     *
     * @param lists
     * @param k
     * @param handler
     * @param <T>
     * @param <K>
     * @return
     */
    public static <T, K> List<T> listFilter(List<T> lists, K k, HandlerCompare<? super T, ? super K> handler) {
        if (lists != null && lists.size() > 0) {
            lists.removeIf((data) -> handler.compare(data, k));
        }
        return lists;
    }示例：

List<Form> list = new ArrayList<Form>();
list = FormUtils.listFilter(list, String.class, 
                 (form)-> "formdatareport".equals(form.getModule()));

### 模块对接相关

#### 对接模块及负责人

##### 对接模块及负责人关系

### 【显示联动】创建数据结构

#### 接口

> com.weaver.common.form.setting.viewlinkage.service.impl.FormViewLinkageServiceImpl#saveFormViewLinkageList


#### 参数说明


##### ***FormViewLinkage***

名称

类型

必填

描述

module

string

是

模块标识

formId

Long

是

表单id

enableState

int

是

开关，1开启，0关闭

condition

FormCondition

是

条件

linkageDetails

List<FormViewLinkageDetail>

是

变更字段

fdEffect

FdEffect

是

生效维度






###### ***FormCondition：显示联动条件***

名称

类型

必填

描述

targetId

string

是

formId

targetName

string

否

表单名称

targetModule

string

是

module

formulaName

string

否

函数名称

formulaId

string

否

函数id, 函数条件的关联关系

conditionType

ConditionTypeEnum

是

FIELD: 普通条件, FORMULA: 函数条件

detailType

ConditionDetailTypeEnum

是

AND("且"), OR("或")

conditionDetails

List<FormConditionDetail>

是

条件列表






###### ***FormConditionDetail***

名称

类型

必填

描述

detailSymbol

ConditionDetailSymbolEnum

是

EQUAL("等于"),

UN_EQUAL("不等于"),

NULL("为空"),

NOT_NULL("不为空"),

NOT_IN("不包含"),

IN("包含"),

GREATER("大于"),

GREATER_EQUAL("大于等于"),

LESS("小于"),LESS_EQUAL("小于等于");

sourceContent

string

是

json结构

sourceType

ConditionDetailSourceTypeEnum

是

CONSTANT("常量"), VARIABLE("变量");

targetId

string

是

字段id














###### *sourceContent*

名称

类型

必填

描述

formField

FormFIeld

是

只需要放字段id

subForm

SubFOrm

否

明细表，只需要放id

dataOptions

List<FormDataOption>

否

选项optionId、content

content

string

否

文本类型






###### ***FormViewLinkageDetail：显示联动变更详情***

**名称**

**类型**

**必填**

**描述**

formId

string

是

formId

linkageObj

string

是

field:字段、detail:明细表、layout: 布局组件

linkageProp

string

是

EDIT, REQUIRED, READONLY, HIDE, HIDE_LINE, SHOW

linkageShowValue

List<FormField>

是

变更字段，只需要放id






###### ***FdEffect：生效维度***

**名称**

**类型**

**必填**

**描述**

effectModule

string

是

module

effectName

string

是

维度名称，对应类型

effectType

string

是

维度类型, form、formLayout、workflow、includeNode

formId

string

是

formId

optionList

List<FdEffectValue>

是

具体维度信息详情




###### ***FdEffectValue：生效维度详情***

**名称**

**类型**

**必填**

**描述**

effectName

string

是

数据名称

effectValue

string

是

数据id








##### ***JSON参数说明***

{
    "fdEffect": {
        "formId": "1044105463169900546",
        "effectModule": "biaoge",
        "effectType": "formLayout",
        "effectName": "表单布局",
        "optionList": [
            {
                "effectValue": "1044105463169900580",
                "effectName": "一父多子级选项_物理表"
            }
        ]
    },
    "condition": {
        "targetId": "1044105463169900546",
        "targetName": "一父多子级选项_物理表",
        "targetModule": "biaoge",
        "conditionType": "FIELD",
        "conditionDetails": [
            {
                "targetId": "1044106021524037633",
                "detailSymbol": "EQUAL",
                "sourceType": "CONSTANT",
                "sourceContent": "{\"formField\":{\"id\":\"1044106021524037633\"},\"dataOptions\":[{\"optionId\":\"0\",\"content\":\"选项1\"}]}"
            },
            {
                "targetId": "1047738670577082369",
                "detailSymbol": "EQUAL",
                "sourceType": "CONSTANT",
                "sourceContent": "{\"formField\":{\"id\":\"1047738670577082369\"},\"subForm\":{\"id\":\"1047725231448252419\"},\"content\":\"123\"}"
            }
        ],
        "formulaId": "",
        "formulaName": ""
    },
    "linkageDetails": [
        {
            "formId": "1044105463169900546",
            "id": "0",
            "linkageObj": "field",
            "linkageProp": "edit",
            "linkageShowValue": [
                {
                    "id": "1044106021524037634"
                }
            ]
        },
        {
            "formId": "1044105463169900546",
            "id": "1",
            "linkageObj": "detail",
            "linkageProp": "show",
            "linkageShowValue": [
                {
                    "id": "1047725231448252419"
                }
            ]
        }
    ],
    "module": "biaoge",
    "formId": "1044105463169900546",
    "refId": "1044105463169900546",
    "id": "-1"
}
