# 09 - ecode 常见问题排查手册

## 概述

本文档整合了 E10 ecode 开发中遇到的常见问题、排查步骤和解决方案，涵盖前端代码不生效、Serverless、JAR 包部署、后端二开等场景。

**来源**: `doc/Common problems and solutions of e-code`（官方问题库）

---

## 目录

- [一、e-code 代码不生效问题排查](#一e-code-代码不生效问题排查)
  - [1.1 e-code 应用代码不生效](#11-e-code-应用代码不生效)
  - [1.2 代码块不生效](#12-代码块不生效)
- [二、ecodestatic 资源请求 404](#二ecodestatic-资源请求-404)
- [三、Serverless 无法使用](#三serverless-无法使用)
- [四、Serverless 函数调用失败](#四serverless-函数调用失败)
- [五、Serverless 其他常见问题](#五serverless-其他常见问题)
- [六、监控平台常见问题](#六监控平台常见问题)
  - [6.1 监控平台访问权限](#61-监控平台访问权限)
  - [6.2 JAR 包上传/部署问题](#62-jar-包上传部署问题)
- [七、二次开发常见问题](#七二次开发常见问题)
- [八、其他常见问题](#八其他常见问题)

---

## 一、e-code 代码不生效问题排查

### 整体排查思路

代码不生效的原因很多种：二开代码本身有问题、静态文件加载不到、其他 e-code 应用报错影响等。

**快速定位方法（三步法）：**

**第一步** — 多刷新几遍页面，然后全局搜索不生效的代码或应用的 appId。

**第二步** — 如果搜到了代码，说明代码正常加载。此时不生效的原因可能是：
- 代码报错导致不生效（见 1.1.6）
- console 被屏蔽看不到输出（见 1.1.7）
- 代码逻辑本身有问题（见 1.1.10）

**第三步** — 如果搜不到代码，说明代码没有正常加载，按 1.1.1 ~ 1.1.11 逐一排查。

> **注意**：以下排查步骤中需要刷新页面的操作，都是指在 E10 系统页面刷新，不是 e-code 开发平台页面。

---

### 1.1 e-code 应用代码不生效

此类应用是指直接在 e-code 开发平台手动创建或手动导入的 e-code 应用。

---

#### 1.1.1 global 接口异常

**检查步骤**：控制台打开 Network，搜索框输入 `global`，刷新页面，检查该接口返回值是否正常。

**正常示例**：
![global正常](https://weapp.eteams.cn/ecodestatic/txproduction/resources/974682604024152064/1729663976-image.png)

**异常示例 1** — global 接口返回值异常：
![global异常1](https://weapp.eteams.cn/ecodestatic/txproduction/resources/974682604024152064/1725603950-image.png)
> **处理**：直接联系 e-code 模块同事处理。

**异常示例 2** — 接口被限流：
![global异常2](https://weapp.eteams.cn/ecodestatic/txproduction/resources/974682604024152064/1725862066-image.png)
> **处理**：配置缓存减少接口请求次数（参考配置文档）。

---

#### 1.1.2 e-code 静态文件请求 404

**检查步骤**：控制台打开 Network，搜索框输入 `ecodestatic`，刷新页面，检查静态资源请求是否正常。

**正常示例**：
![静态资源正常](https://weapp.eteams.cn/ecodestatic/txproduction/resources/974682604024152064/1729664066-image.png)

**异常示例**：
![静态资源404](https://weapp.eteams.cn/ecodestatic/txproduction/resources/974682604024152064/1725604687-image.png)

**处理方案**：静态文件请求 404，检查 NFS 挂载是否正常。挂载有问题时运维平台中也会有告警提示。

![NFS告警](https://weapp.eteams.cn/ecodestatic/txproduction/resources/974682604024152064/1725604912-image.png)

> 排查步骤参考：e-code 静态资源请求 404 排查步骤

---

#### 1.1.3 e-code 静态文件修改不生效

**问题现象**：静态文件部分访问 404，部分访问正常。

**检查步骤**：

1. 打开控制台，刷新页面，全局搜索不生效 e-code 应用的 appId（通过 e-code 应用右键"复制 AppId"获取）

   ![复制AppId](https://weapp.eteams.cn/ecodestatic/txproduction/resources/974682604024152064/1725605543-image.png)

2. 如果搜索不到 → 代码没有更新到静态文件中

   ![搜索不到](https://weapp.eteams.cn/ecodestatic/txproduction/resources/974682604024152064/1725605589-image.png)

3. 如果搜索到了，点进去查看新增的代码是否存在 → 不存在则代码没有更新到静态文件

   ![代码不存在](https://weapp.eteams.cn/ecodestatic/txproduction/resources/974682604024152064/1729664150-image.png)

**处理方案**：客户如果自行调整过存储且 nginx 是 docker 部署的，可先重启一下 nginx。

---

#### 1.1.4 免登页面、外部分发页面代码不生效

**检查步骤**：检查当前应用是"租户应用"还是"公共应用"。如果是租户应用，需要发布为公共应用。

![应用类型检查](https://weapp.eteams.cn/ecodestatic/txproduction/resources/974682604024152064/1725606118-image.png)

**处理方案**：应用右键"取消发布"后，再次右键"发布为公共应用"。如果右键没有"发布为公共应用"菜单，说明当前租户没有此权限（参考：发布公共应用权限配置）。

---

#### 1.1.5 只在 PC 端不生效或只在移动端不生效

**检查步骤**：检查 e-code 应用的发布端：

| 标识 | 含义 |
|------|------|
| **P** | 代码发布到 PC 端，PC 生效，移动端不生效 |
| **M** | 代码发布到移动端，移动端生效，PC 端不生效 |
| **ALL** | 代码发布到全部端，PC 和移动端都生效 |

![发布端检查](https://weapp.eteams.cn/ecodestatic/txproduction/resources/974682604024152064/1725606365-image.png)

**处理方案**：需要两端都生效时——
- 租户应用：点击"发布为租户应用"
- 公共应用：点击"发布为公共应用"

![发布全部端](https://weapp.eteams.cn/ecodestatic/txproduction/resources/974682604024152064/1725606539-image.png)

---

#### 1.1.6 e-code 应用代码报错导致不生效

**检查步骤**：打开控制台 Console，刷新页面，检查当前 e-code 应用代码是否存在报错信息。

> **分析**：这是最常见的代码不生效原因之一。JS 报错会导致后续代码不执行，表现为"代码写了但没效果"。

---

#### 1.1.7 e-code 应用代码 console 不输出

**处理方案**：

**方法一** — 将 `console.log` 替换成 `alert` 来确认是不是 console 被屏蔽了。

**方法二** — 查看控制台是否存在以下提示信息：

> "The console output has been globally disabled by the system. To view the console logs, please add 'wea_link_show_console' to the address bar for viewing"

如果存在该提示，说明控制台被系统全局禁用。在地址栏中添加 `wea_link_show_console` 参数即可：

```
示例1：https://aaa.aa.aa:8080/workflow/list/center?cusMenuId=11111&wea_link_keep_show_console
示例2：https://aaa.aa.aa:8080/workflow/list/center?wea_link_keep_show_console
```

![调试参数](https://weapp.eteams.cn/ecodestatic/txproduction/resources/974682604024152064/1756459351-image.png)

> **注意**：具体调试参数以控制台提示为准。可能为 `wea_link_show_console` 或 `wea_link_keep_show_console`。

**方法三** — 如果加了调试参数还是不输出，检查设置中是否开启了"调试代码过滤"：

1. 应用右键属性中，开启调试模式
2. **开关状态变更后，需要取消发布后再次发布应用才会生效**

![调试模式](https://weapp.eteams.cn/ecodestatic/txproduction/resources/974682604024152064/1731316044-image.png)

![开启调试](https://weapp.eteams.cn/ecodestatic/txproduction/resources/974682604024152064/1731316166-image.png)

> **分析**：E10 生产环境默认禁用 console 输出以提升性能。开发调试时需要通过 URL 参数或调试模式开启。

---

#### 1.1.8 页面自动刷新配置导致

**问题现象**：代码修改保存后，刷新一次没效果，要多刷新几次才生效。

**检查步骤**：查看 `/api/app/ecode/cache/global` 接口返回值中的 `refresh` 字段：

| 值 | 含义 |
|----|------|
| `true` | 代码更新后，页面手动刷新**一次**即可生效 |
| `false` | 代码更新后，页面要手动刷新**两次**才会生效 |

![refresh配置](https://weapp.eteams.cn/ecodestatic/txproduction/resources/974682604024152064/1725931106-image.png)

> 更改此配置请参考：页面是否自动刷新配置文档

---

#### 1.1.9 页面刷新缓存有效期导致

**问题现象**：代码修改保存后，要过一段时间刷新页面才会生效。

**检查步骤**：查看 `/api/app/ecode/cache/globalData` 接口返回值中的 `cacheTimeout` 字段：

| 值 | 含义 |
|----|------|
| `-1` | 每次刷新页面都会请求 global 接口（实时生效） |
| 非 -1 数值 | 单位毫秒，指定了间隔时间才请求 global 接口 |

> `cacheTimeout` 配置修改请参考配置文档。`/api/app/ecode/cache/global` 接口不请求会影响代码更新。

---

#### 1.1.10 e-code 应用代码写的有问题

如果以上情况都不存在（全局搜索能搜到代码、控制台无报错），则可能是二开代码逻辑本身有问题，需要开发人员自行检查。

> **分析**：这是排除了所有环境/加载因素后的兜底判断。常见问题包括：组件 weId 匹配错误、条件判断逻辑不对、异步时序问题等。

---

#### 1.1.11 e-code 应用代码部分人员生效部分不生效

**解决方案**：e-code 应用右键 → "生效范围"，检查应用是否设置了生效范围限制。

![生效范围](https://weapp.eteams.cn/ecodestatic/txproduction/resources/974682604024152064/1726812869-image.png)

---

### 1.2 代码块不生效

**功能范围**：页面设计器、表单设计器的代码块。

> **注意**：事件配置中的 JavaScript，不属于 e-code 功能范围，如果存在问题请联系对应业务模块处理。

![代码块](https://weapp.eteams.cn/ecodestatic/txproduction/resources/974682604024152064/1725874473-image.png)

---

#### 1.2.1 设计器页面代码发布后，外部分发/免登地址代码不加载

**解决方案**：

1. 基线版本 < 10.0.2312.02：不支持，只能手动发布为公共应用
2. 基线版本 >= 10.0.2312.02：查看 index.js 的请求地址，如果还是旧地址（不带 `simple`），需要手动编辑保存生成新地址（新地址中带有 `simple`）

---

#### 1.2.2 代码块不生效

**解决方案**：参考 [1.1 e-code 应用代码不生效](#11-e-code-应用代码不生效) 逐一排查。

---

## 二、ecodestatic 资源请求 404

### 问题原因一：环境迁移遗漏

迁移环境时只迁移了应用服务器和数据库，没有迁移附件。请参考 E10 e-code 迁移操作补充文档进行附件迁移。

### 问题原因二：静态文件上传或读取异常

在 e-code 开发平台顶部点击"自检"，查看"静态文件上传"检测项是否异常。

![自检](https://weapp.eteams.cn/ecodestatic/txproduction/resources/974682604024152064/1747986716-image.png)

---

#### 非单体环境排查步骤

1. 确认客户环境文件存储用什么：
   - 登录 nginx 服务器，找到 `front` 下的 `front.conf` 配置文件
   - 搜索 `/ecodestatic`，如果代理的目录是本地目录 → 本地存储；如果是链接 → 其他存储（如 OSS）

2. 非本地存储 → 拉文件服务同事一起确认

3. 本地存储 → 在 nginx 服务器执行 `df -h`，查看 NFS 是否挂载。没有 NFS 挂载则说明挂载缺失，需要按 E10 部署文档 NFS 配置手册补充操作。

   > 如果结果中没有共享地址或 NFS 相关字样，说明没有挂载：
   > ![未挂载](https://weapp.eteams.cn/ecodestatic/txproduction/resources/974682604024152064/1701310070-image.png)

4. 如果 NFS 已挂载，检查 `/ecodestatic` 代理的路径是否与挂载路径一致。不一致则需要修改：

   ![路径不一致](https://weapp.eteams.cn/ecodestatic/txproduction/resources/974682604024152064/1729664262-image.png)

**常用命令**：
```bash
# 查找 nginx 目录
ps -ef|grep nginx

# 找到 front.conf 配置文件
cd /opt/weaver/front/nginx/conf.d/   # 或 cd /opt/weaver/e10-front/nginx/conf.d/

# 查看文件内容
cat front.conf
```

---

#### 单体环境排查步骤

nginx 和应用服务器是同一台的情况：

1. 检查 `front.conf` 中 `/ecodestatic` 代理的路径是否存在
2. 如果不存在 → 修改配置或联系运维人员处理
3. 如果目录存在 → 检查目录下是否有静态文件。没有则需要联系文件服务模块同事排查

> **注意**：nginx 和应用服务器是否同一台可在运维平台 - 服务启停中查看。如果只是修改 `front.conf` 配置文件，无需重启服务，只需重载 nginx：`nginx -s reload`

---

## 三、Serverless 无法使用

**常见现象**：ecode 定时任务，编译后执行日志一直转圈，但显示编译成功。

![Serverless转圈](https://weapp.eteams.cn/ecodestatic/txproduction/resources/974682604024152064/1699599073-image.png)

### 排查步骤

**第 1 步** — 检查 Serverless 是否已正常安装：

- 运维平台 → 系统维护 → 业务服务，搜索 `serverless`
- 没有搜到服务 → 联系运维人员安装 Serverless 服务（参考 E10-serverless 补充安装手册）
- **如果未安装，建议走本地二开模式**（后续未安装 Serverless 服务会屏蔽新建函数类型）
  - 参考文档：ecode 后端常见开发场景说明、E10 secondev 常见开发场景示例代码

**第 2 步** — 检查 `weaver-ecode-service.properties` 配置文件：

确认 `weaver.ecode.serverless.scheduler-base-url` 配置项已改为实际的 Serverless 服务地址（不能是 `127.0.0.1`）。

- 非单体环境：在 Nacos 中搜索查看
- 单体环境：查找配置文件

![配置文件查找](https://weapp.eteams.cn/ecodestatic/txproduction/resources/974682604024152064/1702880055-image.png)

**第 3 步** — 配置完成后执行健康检查（如果有多台服务器，每台都要检查）：

```bash
curl http://<serverless_ip:port>/api/ecode/serverless/schedule/health
```

- 通过 → 返回 `health`
  ![health成功](https://weapp.eteams.cn/ecodestatic/txproduction/resources/974682604024152064/1698737673-image.png)
- 不通过 → `Connection refused`，说明 Serverless 服务有问题，联系安装部署人员检查

**第 4 步** — 健康检查通过后，在 Serverless 服务器上验证 E10 地址：

```bash
docker ps                    # 找到 scheduler 的容器 ID
docker inspect <容器id> | grep ECODE   # 查看环境变量中 E10 地址是否正确
```

检查地址是否为系统访问地址，如果系统有二级路径也需要加上。

**第 5 步** — 新建一个默认函数，点击编译、执行：
- 默认函数正常执行 → 自行检查自己写的函数是否有问题
- 默认函数执行失败 → 继续排查环境配置

---

## 四、Serverless 函数调用失败

### 4.1 函数调用提示"token 为空或失效"

![token为空](https://weapp.eteams.cn/ecodestatic/txproduction/resources/974682604024152064/1701936703-image.png)

**解决方案**：区分两种调用方式：

| 调用接口 | 特点 |
|----------|------|
| `/api/ecode/serverless/func/exec` | 需要登录会话和 token |
| `/papi/ecode/serverless/core/func/exec` | 无需登录会话，但也无法获取用户信息 |

> **分析**：`/api` 前缀接口需要登录态，`/papi` 前缀无需登录但无用户上下文。根据场景选择正确的接口。

---

### 4.2 函数调用提示"Func with funcId xxx does not exist"

![funcId不存在](https://weapp.eteams.cn/ecodestatic/txproduction/resources/974682604024152064/1701936873-image.png)

**解决方案**：检查 `funcId` 参数的值是否获取错误。

> **注意**：funcId 是函数 ID，不是 token 管理中的 ID。

![funcId位置](https://weapp.eteams.cn/ecodestatic/txproduction/resources/974682604024152064/1701936946-image.png)

---

## 五、Serverless 其他常见问题

### 5.1 修改函数超时时间提示"timeout must be between 3.000000 s and 10.000000 minutes"

**解决方案**：超时时间设置超出限定范围。进入 Nacos，修改 `weaver-ecode-service.properties` 配置文件：

```properties
weaver.ecode.serverless.runFunc-max-timeout=<最大超时ms>
weaver.ecode.serverless.runFunc-min-timeout=<最小超时ms>
```

> Nacos 中配置文件修改后，无需重启服务。

---

### 5.2 函数页面没有编译按钮

**解决方案**：调整页面缩放比例（缩小页面即可显示）。

---

## 六、监控平台常见问题

### 6.1 监控平台访问权限

ecode 监控平台（`/ecode/monitor`）访问提示无权限 → 参考监控平台权限配置文档进行配置。

---

### 6.2 JAR 包上传/部署问题

JAR 包上传部署是最容易出问题的环节，以下按报错信息逐条列出排查方案。

---

#### 6.2.1 上传提示"操作出现异常"

![操作异常](https://weapp.eteams.cn/ecodestatic/txproduction/resources/974682604024152064/1729664776-image.png)

**排查步骤**：

1. 检查目标服务状态是否正常
2. 检查 jar 包文件是否正确（需使用 IDEA + 二开插件打包）
3. 检查 jar 包名称是否包含中文或特殊字符（**不允许**）
4. 检查 `weaver-ecode-service.properties` 中 `weaver.ecode.service.url` 配置项，需配置为当前 ecode 服务地址

---

#### 6.2.2 上传提示"ConnectException: 拒绝连接 (Connection refused)"

![拒绝连接](https://weapp.eteams.cn/ecodestatic/txproduction/resources/974682604024152064/1729664823-image.png)

**排查步骤**：

1. 检查 `weaver.ecode.service.url` 配置项是否正确
2. 如果配置地址没问题，检查 ecode 服务所在服务器与该地址是否通：

```bash
curl <配置的地址>/papi/cache/global
```

如果不通，联系负责系统部署的同事处理。

---

#### 6.2.3 上传提示"请检查 MF 文件中是否存在 weaver-ecode-seconddev-id!"

![MF文件检查](https://weapp.eteams.cn/ecodestatic/txproduction/resources/974682604024152064/1729664865-image.png)

**问题原因**：jar 包上传的不对。只能上传通过二开插件编译好的二开 jar 包。自己用 Maven 搭建引入依赖打包的不可以。

---

#### 6.2.4 上传提示"'sun.net.www.protocol.file.FileURLConnection' of URL..."

![FileURLConnection](https://weapp.eteams.cn/ecodestatic/txproduction/resources/974682604024152064/1729664896-image.png)

**解决方案**：修改配置文件中的 `weaver.ecode.service.url` 为 ecode 所在服务的实际地址：

```properties
# 文件路径：${单体服务路径}/webapps/ROOT/WEB-INF/classes/weaver/config/config-center/weaver-ecode-service.properties
weaver.ecode.service.url=http://<实际IP>:20600
```

---

#### 6.2.5 上传 jar 包提示"jar 文件禁止上传"或选不到 jar 文件

![jar禁止上传](https://weapp.eteams.cn/ecodestatic/txproduction/resources/974682604024152064/1729664923-image.png)

**解决方案**：

**方案一（推荐，需基线 >= 10.0.2409.01）**：使用最新的本地项目模板，打包输出目录下会有 `build.zip`，选择这个 zip 文件上传。

- 下载最新本地项目模板
- 将 secDevlib 依赖拷贝到新项目
- 按文档创建与历史项目同名的子项目
- 将二开代码搬到新子项目中
- 使用新项目打包

**方案二**：系统后台管理中心 → 文件设置 → 附件设置 → 检查黑白名单：
- jar 类型在黑名单中 → 删除
- 白名单没有 jar 文件类型 → 添加

![附件设置](https://weapp.eteams.cn/ecodestatic/txproduction/resources/974682604024152064/1702351130-image.png)

> 文件设置修改保存后，监控平台部署 jar 包页面需刷新后才能再次上传。

---

#### 6.2.6 上传提示"Init Server List is Empty..."

![InitServerListEmpty](https://weapp.eteams.cn/ecodestatic/txproduction/resources/974682604024152064/1729664952-image.png)

**解决方案**：联系运维平台同事处理。

---

#### 6.2.7 上传提示"上传异常"

![上传异常](https://weapp.eteams.cn/ecodestatic/txproduction/resources/974682604024152064/1728635920-image.png)

**方案一**：打开控制台 Network，检查 `/api/ecode/monitor/deploy/deployJar` 接口响应状态。以下状态说明网络被拦截：

| 状态 | 说明 |
|------|------|
| 空（无响应） | ![空响应](https://weapp.eteams.cn/ecodestatic/txproduction/resources/974682604024152064/1728637030-image.png) |
| `(failed)net::ERR_CONNECTION_ABORTED` | ![连接中止](https://weapp.eteams.cn/ecodestatic/txproduction/resources/974682604024152064/1728636939-image.png) |
| `(failed)net::ERR_CONNECTION_RESET` | ![连接重置](https://weapp.eteams.cn/ecodestatic/txproduction/resources/974682604024152064/1728636934-image.png) |

→ 联系当前环境网络管理员检查网络设置。

**方案二**：检查 `api/ecode/monitor/deploy/jarDeployCheck` 接口响应：
- 响应状态 502 → 按规范上传 zip 类型包
- 提示 "Waf Forbid" → jar 被安全拦截，改用 zip 格式上传

![WafForbid](https://weapp.eteams.cn/ecodestatic/txproduction/resources/974682604024152064/1736733291-image.png)

> 如果 zip 类型上传依然无响应，联系网络管理员检查网络设置。

---

#### 6.2.8 上传提示"instance does not exist"

**微服务组合情况**：Nacos 中搜索 `weaver-metadata-dubbo-provider-full.properties` 和 `weaver-metadata-dubbo-provider-simple.properties`，将文件中二开服务开头的配置删除。

**单体部署情况**：联系运维负责人检查服务启动参数：
- E10 服务启动参数需配置二开服务地址
- 二开服务启动参数需配置 E10 地址

---

#### 6.2.9 上传提示"AbstractInnerDubboClient DubboInnerService is null"

![DubboInnerService](https://weapp.eteams.cn/ecodestatic/txproduction/resources/974682604024152064/1733983829-image.png)

**解决方案**：配置文件里配了不存在的 bean。新增配置时，要先上传 jar 再去改配置。

---

#### 6.2.10 jar 包上传提示"ecode jar deploy mode: SHARE err..."

![SHAREmode](https://weapp.eteams.cn/ecodestatic/txproduction/resources/974682604024152064/1741592882-image.png)

**非容器化环境解决方案**：启动服务（weaver-ecode）账号无权限在根目录创建文件。

1. 使用 root 账号启动 weaver-ecode 服务
2. 或使用 root 账号创建 `/nfs/data/ecodedev` 目录并授权给启动服务账号

> 容器化环境请直接联系 e-code 相关技术人员处理。

---

#### 6.2.11 jar 包上传提示"当前存在正在校验的 jar 包，请稍后上传"

**解决方案**：

1. 当前环境有其他人正在上传 jar 包。同一环境不允许多个 jar 包同时上传，等待他人上传完成即可。
2. 上传过程中如果 E10 服务被重启过，需等待 1 小时后再上传。

---

#### 6.2.12 jar 包上传提示"err code: 1007, err msg: 文件上传失败"

![err1007](https://weapp.eteams.cn/ecodestatic/txproduction/resources/974682604024152064/1759994083-image.png)

**解决方案**：在 `/ecode` 页面点击"自检"，查看报错提示：

- "标准文件上传"检测项提示"文件服务上传失败" → 在文档模块中测试上传附件，如果标准附件也无法上传 → 联系文件服务模块同事
- "标准文件上传"检测项提示"文件服务读取异常" → 在运维平台获取 weaver-ecode 日志后联系文件服务模块同事

![自检1](https://weapp.eteams.cn/ecodestatic/txproduction/resources/974682604024152064/1759994311-image.png)

![自检2](https://weapp.eteams.cn/ecodestatic/txproduction/resources/974682604024152064/1759994707-image.png)

---

#### 6.2.13 jar 包审核提示"操作出现异常"

![审核异常](https://weapp.eteams.cn/ecodestatic/txproduction/resources/974682604024152064/1761640026-image.png)

**解决方案**：检查 jar 包是否存在以下问题，如有则使用标准项目模板打包：

1. 检查 jar 包中 `res.list` 文件内容是否包含自身或其他异常数据（正常数据为 resources 下配置文件列表）

   ![res.list异常](https://weapp.eteams.cn/ecodestatic/txproduction/resources/974682604024152064/1761640079-image.png)

   ![res.list正常](https://weapp.eteams.cn/ecodestatic/txproduction/resources/974682604024152064/1761640537-image.png)

2. 直接用解压工具打开 jar 包（不要解压），检查配置文件是否重复
3. 检查 jar 包内文件后缀名是否超出限制（合法后缀限定长度 20 以内）

---

#### 6.2.14 jar 包审核报错提示"Rest rpc Consumer"

![RestRpcConsumer](https://weapp.eteams.cn/ecodestatic/txproduction/resources/974682604024152064/1773222630-image.png)

**解决方案**：如果是新部署的单体环境，重启 E10 服务。

---

### 6.3 jar 包上传服务只能选择二开服务

**解决方案**：二开 jar 只允许部署到二开服务（secondev），不允许部署到其他标准服务（基础服务、流程服务等）。如果需求场景不满足，请提需求到总部评估。

---

### 6.4 点击下载跳转提示无权限

![下载无权限1](https://weapp.eteams.cn/ecodestatic/txproduction/resources/974682604024152064/1716187008-image.png)
![下载无权限2](https://weapp.eteams.cn/ecodestatic/txproduction/resources/974682604024152064/1716187039-image.png)

**解决方案**：jar 包的下载需要开发人员权限。参考文档：开发人员账号配置。

---

### 6.5 jar 包上传或回滚提示"二开 jar 包中缺少 java 资源文件"

**解决方案**：基线 >= 10.0.2409.01 新增了源码校验。使用最新本地项目模板重新打包：

1. 下载最新本地项目模板
2. 将 secDevlib 依赖拷贝到新项目
3. 创建同名的子项目，将二开代码搬入
4. 使用新项目打包

**关于内部类**：编译后的 class 文件需与 java 文件一一对应。内部类会多打出 class 文件导致检测失败，需要拆分：

- **需要拆分的**：与 public class 同级的类
  ![需拆分的内部类](https://weapp.eteams.cn/ecodestatic/txproduction/resources/974682604024152064/1742550211-image.png)

- **不需要拆分的**：以下类型的内部类可以保留
  ![可不拆的内部类](https://weapp.eteams.cn/ecodestatic/txproduction/resources/974682604024152064/1742550124-image.png)

---

### 6.6 jar 包回滚提示"该 jar 包名称不规范"

![名称不规范](https://weapp.eteams.cn/ecodestatic/txproduction/resources/974682604024152064/1725851440-image.png)

**解决方案**：基线 >= 10.0.2409.01 新增了 jar 包名称规范校验（仅允许以 `secondev` 开头、长度不超过 100 的数字/字母/`.`/`_`/`-`）。

历史 jar 包回滚步骤：
1. 去服务器上将 jar 包名称改成规范的名称
2. 将要回滚的版本用最新插件打包（包含源码）
3. 在 e-code 监控管理平台重新部署

---

### 6.7 二开服务重启后 jar 包在服务器找不到了

**容器化部署解决方案**：

ecode 监控平台 → 配置管理 → 检查 jar 包上传方式配置项 `weaver.ecode.secdevjar.deploy` 的值是否为 `share`。

如果不是，修改为 `share`，保存后点击顶部"内存重加载"按钮生效。

> 如果保存时提示无权限，当前人员不是监控平台管理员（需配置 `weaver.ecode.super.managers=<人员id>`）。

![配置管理](https://weapp.eteams.cn/ecodestatic/txproduction/resources/974682604024152064/1729665035-image.png)

---

### 6.8 部署时无法选择服务节点

**解决方案**：基线 >= 10.0.2411.01 后，jar 包部署无需选择指定服务节点，直接选择服务上传即可。如有多个节点，每个节点都需重启。

---

### 6.9 二开 jar 包部署获取不到服务列表

**情况**：单体环境，二开服务组合在 E10 服务下，获取不到服务列表。

**方案一（推荐）**：将 secondev 二开服务拆分部署。

**方案二**：
1. 找到 E10 服务 `weaver.properties` 配置文件
2. 追加以下配置：
```properties
weaver.services[weaver-secondev-service]=E10
weaver.services[weaver-data-search-service]=E10
```
3. 重启 E10 服务生效

> 两个配置都是指括号内的服务组合在单体 E10 服务。data-search 是数据源服务，配置二开服务后建议也加上数据源配置。

---

### 6.10 三方 jar 包上传提示"jar 文件禁止上传"

![三方jar禁止](https://weapp.eteams.cn/ecodestatic/txproduction/resources/974682604024152064/1753080060-image.png)

**解决方案**：同 [6.2.5](#625-上传-jar-包提示jar-文件禁止上传或选不到-jar-文件) 方案二，检查系统后台管理中心的附件设置黑白名单。

---

### 6.11 jar 包源码校验问题处理后再上传仍报错

**解决方案**：

1. 登录主管理团队，访问 `/info/dispatch/escheduler/report`，查询 `ecode.EcodeJarCheckInitJob` 定时任务，手动执行一次。执行成功后等 20 分钟再上传。
2. 如果仍未解决，参考文档：运维平台重新推送二开依赖说明文档。

---

### 6.12 同 6.2.13（jar 包审核提示"操作出现异常"）

见 [6.2.13](#6213-jar-包审核提示操作出现异常)。

---

### 6.13 jar 包上传提示无权限

![无权限1](https://weapp.eteams.cn/ecodestatic/txproduction/resources/974682604024152064/1770349576-image.png)
![无权限2](https://weapp.eteams.cn/ecodestatic/txproduction/resources/974682604024152064/1770349601-image.png)
![无权限3](https://weapp.eteams.cn/ecodestatic/txproduction/resources/974682604024152064/1770349625-image.png)

**解决方案**：

1. 检查 e-code 是否开启了数据权限
2. 数据权限开启后：
   - jar 包**新增**部署 → 需要"二开服务维护"权限
   - jar 包**更新**部署 → 需要"二开服务维护"权限 + "jar 包维护"权限

---

### 6.14 同 6.2.14（jar 包审核报错"Rest rpc Consumer"）

见 [6.2.14](#6214-jar-包审核报错提示rest-rpc-consumer)。

---

## 七、二次开发常见问题

### 7.1 API 接口请求提示无权限

![API无权限](https://weapp.eteams.cn/ecodestatic/txproduction/resources/974682604024152064/1729665060-image.png)

**解决方案**：接口加上注解 `@WeaPermission(publicPermission = true)`。

> **分析**：后端 API 接口默认需要权限校验。如果是公共接口（如免登页面调用的接口），需要显式声明 `publicPermission = true`。

---

### 7.2 二开服务配置错误导致启动失败

![启动失败](https://weapp.eteams.cn/ecodestatic/txproduction/resources/974682604024152064/1716458865-image.png)

**解决方案**：二开 jar 包上传启动报错处理方案。

**关键路径**：

| 部署模式 | jar 包位置 | 配置文件位置 |
|----------|-----------|-------------|
| 容器化 | `/共享目录/ecodedev/<服务名>/WEB-INF/lib/_xxx.jar` | `/共享目录/ecodedev/<服务名>/WEB-INF/classes/applicationContext-secondev-secondev-dubbo.xml` |
| 非容器化 | `/服务部署目录/webapps/ROOT/WEB-INF/lib/_xxx.jar` | `/服务部署目录/webapps/ROOT/WEB-INF/classes/applicationContext-secondev-secondev-dubbo.xml` |

**处理方案**：启动失败一般由 jar 包内容与配置文件两方面导致：

1. 如果是 jar 包内容问题，同时检查 jar 包中是否有其他类在 dubbo 配置文件中增加了配置
2. 如果仅仅是配置文件问题，直接修改对应配置项即可

**报错案例**：

jar 包报错：
![jar报错](https://weapp.eteams.cn/ecodestatic/txproduction/resources/974682604024152064/1716459141-image.png)

配置文件报错：
![配置报错1](https://weapp.eteams.cn/ecodestatic/txproduction/resources/974682604024152064/1716459167-image.png)
![配置报错2](https://weapp.eteams.cn/ecodestatic/txproduction/resources/974682604024152064/1716459180-image.png)

---

### 7.3 请求二开测试接口提示登录超时或 token 为空

**接口返回示例**：
```json
{
    "code": -1,
    "fail": true,
    "msg": "token为空或失效",
    "status": false
}
```
```json
{
    "msg": "token empty or invalid",
    "fail": true,
    "code": -1,
    "actionMsg": {
        "code": -1,
        "message": "登录超时，当前会话已失效，请重新登录"
    },
    "status": false
}
```

**解决方案**：`/api` 接口请求需要用户登录信息。

1. 登录对应测试环境的 E10 系统
2. F12 打开开发者工具，刷新页面，随便抓一个请求
3. 从请求头里复制 Cookie
4. 调试接口时在 Header 里带上这个 Cookie

![抓Cookie](https://weapp.eteams.cn/ecodestatic/txproduction/resources/974682604024152064/1718869875-image.png)

> **分析**：这是后端二开调试中最常见的问题。本地/Postman 调试 `/api` 接口时，必须模拟登录态。

---

### 7.4 papi 接口如何获取数据库

**解决方案**：`/papi` 接口没有用户及租户信息，无法执行自定义 SQL。可以考虑走开放平台认证。

> **分析**：`/papi` 是服务间调用接口，没有用户上下文，`UserContext` 和租户信息都不可用。如果需要数据库操作，应该使用 `/api` 接口或走开放平台认证。

---

### 7.5 ecode 新建的页面如何设置登录前访问

**解决方案**：
1. ecode 应用发布为**公共应用**
2. 页面地址拼接 `/freepass` 即可免登录访问

示例：
```
/sp/custom/993276642511216646/BindingPage/freepass
```

> **注意**：免登页面不要调用 `/api` 接口（因为 `/api` 接口需要登录态）。

---

### 7.6 二开如何获取当前用户信息

| 场景 | 方法 |
|------|------|
| **前端** | 读取全局对象：`TEAMS.currentUser` |
| **后端 API 接口** | `UserContext.getCurrentUser()` |
| **后端 papi 接口** | 请求上下文无用户信息，无法通过 UserContext 获取 |
| **节点附加操作 Action** | `com.weaver.workflow.common.util.OrgUtil...#getUser(long)` |

---

### 7.7 前置加载文件里如何引入非前置文件

**解决方案**：参考 [04-新页面开发](04-new-page-development.md)，使用 `asyncImport` 异步加载。

---

### 7.8 @weapp/ui 引用报错

![weappUi报错](https://weapp.eteams.cn/ecodestatic/txproduction/resources/974682604024152064/1725590890-image.png)

**解决方案**：**前置加载文件里不能直接 `import` 使用 `@weapp/ui` 组件库。**

需要使用组件时通过异步加载方式：

![异步加载](https://weapp.eteams.cn/ecodestatic/txproduction/resources/974682604024152064/1725591042-image.png)

> 详见 [04-新页面开发](04-new-page-development.md) 和 [03-组件复写](03-component-override.md)。**入口文件 entry.js 中如需使用 UI 组件，通过 `window.weappUi` 访问**（参考 [真实案例库](../frontend/cases/INDEX.md)）。

---

### 7.9 动作流调用 Serverless Action 默认超时时间

**解决方案**：**30 秒**。

---

### 7.10 接口未准予二开服务访问

**报错信息**：`接口未准予二开服务访问,接口详情: serviceName`

**解决方案**：要调用的标准接口未开放给二开。联系对应模块的同事去开放接口权限。

> **分析**：标准服务的接口默认不对外暴露。需要哪个模块的接口，就联系哪个模块的负责人开通。

---

### 7.11 本地 debug 启动 Tomcat 跳转不到 E10 界面

**解决方案**：基线 >= 2025.0301 后不再支持本地登录。请使用 Postman 等工具请求本地接口进行调试。

请求 `/api` 接口时需要登录信息：浏览器登录 E10 环境 → 抓取 Cookie → 请求时在 Header 里带上。

> **分析**：新版基线移除了本地 Tomcat 的登录支持，本地调试只能用 API 工具 + Cookie 方式。参考 [7.3](#73-请求二开测试接口提示登录超时或-token-为空)。

---

### 7.12 监控平台部署 jar 包后功能未生效

**排查方案**：

**一、jar 包未同步到二开服务器**

1. 确认二开服务是通过**运维平台重启**的（脚本手动重启不会同步 jar 包）
2. 检查运维平台首页"系统当前基线版本信息"是否正常显示（不显示会影响 jar 包同步功能）

![基线版本](https://weapp.eteams.cn/ecodestatic/txproduction/resources/974682604024152064/1747978509-image.png)

**二、jar 包已正常同步但功能未生效**

需要 jar 包二开人员自行排查代码逻辑。

---

### 7.13 如何设置二开服务日志保留时间

**解决方案**：日志默认保留 7 天。修改保留时间需要增加 JVM 参数：

```bash
-Dlog.delete.age=30d    # 保留30天
```

> 不清楚如何添加 JVM 参数可咨询部署组同事。

---

## 八、其他常见问题

### 8.1 二开输出的日志在哪里看

二开代码包路径统一前缀：`com.weaver.seconddev`

**日志输出方式**：
```java
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class DemoAction {
    private static final Logger logger = LoggerFactory.getLogger(DemoAction.class);
    // ...
}
```

**日志文件位置**：

| 基线版本 | INFO 日志 | ERROR 日志 |
|----------|----------|-----------|
| < 250301 | `sys-seconddev.log` | `sys-err.log` |
| >= 250301 | `sys-seconddev.log` | `sys-seconddev-err.log` |

> 运维平台收集 weaver-secondev 服务日志。如日志文件缺失，通过 FTP 工具连接 secondev 服务器，在 `<二开服务>/logs` 目录下下载。

**非单体环境配置**（Nacos 中修改）：
```properties
# weaver-secondev-service.properties
logging.level.com.weaver.seconddev=info
```
> 此配置会在服务重启后还原为 error 级别，只能临时调整。

**单体环境配置**：

设置日志级别：
```bash
# 浏览器执行
http://<ip:port>/sapi/framework/setLoggingLevel?packagePath=com.weaver.seconddev&loggingLevel=INFO

# 服务器执行
curl "http://<ip:port>/sapi/framework/setLoggingLevel?packagePath=com.weaver.seconddev&loggingLevel=INFO"
```

查看当前日志级别：
```bash
curl http://<ip:port>/sapi/framework/getLoggers
```

> ip 和 port 是 secondev 服务或所在组合服务的地址和端口（不是 OA 系统访问地址），可在运维平台查看。

---

### 8.2 额外依赖怎么上传

| 基线版本 | 方式 |
|----------|------|
| < 10.0.2411.01 | 手动上传到二开服务器 `/webapps/ROOT/WEB-INF/lib` 目录 |
| >= 10.0.2411.01 | ecode 监控平台 → 后端监控 → 三方依赖管理上传（上传后需在运维平台重启二开服务） |

**手动上传步骤**（旧版本）：

1. 在应用服务器执行 `ps -ef|grep java` 找到对应服务器目录
2. 找到二开服务路径下的 jar 包目录，如：`/opt/e10/e10-server0/e10-hr-fna/webapps/ROOT/WEB-INF/lib`

   ![jar包目录](https://weapp.eteams.cn/ecodestatic/txproduction/resources/974682604024152064/1705581965-image.png)

3. 通过 FTP 工具将额外依赖的 jar 包上传到该目录

**新版本**（>= 10.0.2411.01）：

![三方依赖管理](https://weapp.eteams.cn/ecodestatic/txproduction/resources/974682604024152064/1750402599-image.png)

---

### 8.3 ecode resource 中资源上传的类型不支持

![类型不支持](https://weapp.eteams.cn/ecodestatic/txproduction/resources/974682604024152064/1710236858-image.png)

**解决方案**：
1. 参考文档配置允许上传的资源后缀
2. 系统后台管理中心 → 文件设置 → 附件设置 → 黑白名单配置：
   - 所需类型在黑名单中 → 删除
   - 白名单没有所需文件类型 → 添加

---

### 8.4 ecode 里面的云商店按钮不显示

![云商店不显示](https://weapp.eteams.cn/ecodestatic/txproduction/resources/974682604024152064/1710487028-image.png)

**解决方案**：后台管理中心 → 应用管理 → 检查"云商店"应用是否被关闭（需要开启）。

![开启云商店](https://weapp.eteams.cn/ecodestatic/txproduction/resources/974682604024152064/1710487122-image.png)

---

### 8.5 从云商店导入 ecode 应用失败

![导入失败](https://weapp.eteams.cn/ecodestatic/txproduction/resources/974682604024152064/1710487337-image.png)

**解决方案**：
1. 基线 >= 10.0.2403.01 已修复，升级基线解决
2. 临时方案：在案例库中将 ecode 包下载到本地，通过 ecode 导入功能导入离线包

![离线导入](https://weapp.eteams.cn/ecodestatic/txproduction/resources/974682604024152064/1715843192-image.png)

---

### 8.6 函数数据源的多数据源在哪里创建

![多数据源](https://weapp.eteams.cn/ecodestatic/txproduction/resources/974682604024152064/1711097871-image.png)

**解决方案**：后台管理中心 → 平台引擎 → 数据加工 → 数据连接中创建。

> ecode 多数据源页面只显示 MySQL 和 DM 类型的数据源，其他类型暂不支持。

![数据连接](https://weapp.eteams.cn/ecodestatic/txproduction/resources/974682604024152064/1711097955-image.png)

---

### 8.7 前端源码无法查看

**解决方案**：E10 不再提供 map 源码查看。

---

### 8.8 单体环境二开服务发布的开放平台接口访问不到

**解决方案**：二开服务单独部署的情况下，基线 < 10.0.2405.01 不支持在二开服务发布开放平台接口。需要发布到 E10 服务中，或升级基线到 >= 10.0.2405.01。

---

### 8.9 ecode 新建类型为什么只有 React 了

**解决方案**：基线 >= 10.0.2404.02 不再支持在线新建 Java 子项目。后端开发需要走本地二开模式。

参考文档：
- ecode 后端常见开发场景说明
- E10 secondev 常见开发场景示例代码

---

### 8.10 resources 文件夹上传 JS 文件没反应

**解决方案**：后台管理中心 → 文件设置 → 附件设置 → 检查上传格式控制方式，是否禁止了 JS 格式。

![附件设置](https://weapp.eteams.cn/ecodestatic/txproduction/resources/974682604024152064/1717378575-image.png)

---

### 8.11 如何查找当前代码所属应用

每段代码下方有当前代码的所属应用路径：`/项目名称/应用名称/文件名称`

![代码路径](https://weapp.eteams.cn/ecodestatic/txproduction/resources/974682604024152064/1717405174-image.png)

复制 appId，在 e-code 开发平台（`/ecode`）的发布清单中搜索，可定位到指定应用：

![发布清单](https://weapp.eteams.cn/ecodestatic/txproduction/resources/974682604024152064/1717405370-image.png)

---

### 8.12 ecode 在线 IDE 提示"初始化项目空间异常"

![初始化异常1](https://weapp.eteams.cn/ecodestatic/txproduction/resources/974682604024152064/1719450855-image.png)
![初始化异常2](https://weapp.eteams.cn/ecodestatic/txproduction/resources/974682604024152064/1719450867-image.png)

**解决方案**：该功能已不支持。基线 >= 10.0.2404.02 已屏蔽在线新建 Java 项目。后端二开需要走本地二开模式。

---

### 8.13 没有"平台配置项管理"图标

**解决方案**：

1. 检查基线是否 >= 10.0.2405.01（该功能为此基线新增）
2. 检查当前登录团队是否为主管理团队：

```javascript
// 控制台输入
TEAMS.currentTenant.tenantManager
// true = 主管理团队，false = 非主管理团队
```

![主管理团队检查](https://weapp.eteams.cn/ecodestatic/txproduction/resources/974682604024152064/1722412156-image.png)

---

### 8.14 如何让代码同时在 PC 端和移动端生效

| 应用类型 | 操作 |
|----------|------|
| 租户应用 | 点击"发布为租户应用" |
| 公共应用 | 点击"发布为公共应用" |

![发布全部端](https://weapp.eteams.cn/ecodestatic/txproduction/resources/974682604024152064/1725518094-image.png)

---

### 8.15 如何隐藏/关闭监控助手

**解决方案**：进入 ecode 监控平台（`/ecode/monitor`），找到 `monitorTool` 应用，取消发布。

![取消发布](https://weapp.eteams.cn/ecodestatic/txproduction/resources/974682604024152064/1725518147-image.png)

> 如果取消发布时提示无权限，需要配置监控平台管理员权限（`weaver.ecode.super.managers`）。参考：e-code 监控平台权限配置。

---

### 8.16 e-code 代码保存不上/保存失败

**排查方案**：打开控制台 Network，检查保存接口的请求是否没有响应状态。

![保存失败1](https://weapp.eteams.cn/ecodestatic/txproduction/resources/974682604024152064/1725602406-image.png)
![保存失败2](https://weapp.eteams.cn/ecodestatic/txproduction/resources/974682604024152064/1725602421-image.png)

> **分析**：可能是网络被拦截。代码保存时编译后的某些关键字触发了客户网络/网关/服务器的安全拦截规则。需要客户网络管理员或安全管理人员定位拦截规则。

**典型表现**：简单代码可以正常保存，但包含特定内容的代码保存接口无响应。

---

### 8.17 系统每次登录都会刷新多次

**解决方案**：通过浏览器 F12 → 设置 → 搜索以下两个关键词：
- `自用问题上报单页`
- `登录状态更新缓存清除`

根据搜索到的代码中具体 appId，在 e-code 监控管理平台搜索并取消发布对应应用。

![搜索AppId](https://weapp.eteams.cn/ecodestatic/txproduction/resources/974682604024152064/1733476057-image.png)
![取消发布](https://weapp.eteams.cn/ecodestatic/txproduction/resources/974682604024152064/1733476224-image.png)

> **标准行为说明**：不修改 ecode 代码时，第一次登录后不会刷新。但首次无缓存登录时仍会刷新一次。要完全解决，需将所有 ecode 应用发布为公共应用。

---

### 8.18 组件库文档链接打开 404

![组件库404](https://weapp.eteams.cn/ecodestatic/txproduction/resources/974682604024152064/1747290530-image.png)

**解决方案**：运维平台中检查是否已部署 `weapp-demo` 和 `weapp-ebddoc` 服务。如果未部署，需要走流程申请这两个服务的补充安装。

---

### 8.19 e-code 应用导出/导入失败（资源文件未找到）

![导出失败](https://weapp.eteams.cn/ecodestatic/txproduction/resources/974682604024152064/1749432018-image.png)

**解决方案**：e-code 应用中 resources 文件夹下提示的资源文件找不到（标准文件被删除）。将不存在的文件删除或重新上传后再导出/导入。

> **注意**：导入时如果出现此提示，需要检查系统中**被覆盖的应用**，而不是导入的离线应用。

---

### 8.20 e-code 开发平台首页一直自动刷新

![首页刷新](https://weapp.eteams.cn/ecodestatic/txproduction/resources/974682604024152064/1751944730-image.png)

**解决方案**：数据库中执行以下 SQL，正确结果应为 `y` 和 `1`：

```sql
SELECT init, char_length(INIT)
FROM ecod_init
WHERE tenant_key = '<租户key>'
ORDER BY id DESC
LIMIT 1
```

![SQL结果](https://weapp.eteams.cn/ecodestatic/txproduction/resources/974682604024152064/1751944907-image.png)

> 常见于 DM 数据库迁移（不排除备份、还原等操作）之后。如果结果异常且是 DM 数据库，联系达梦工程师处理。

---

### 8.21 代码块首次保存不生效，再次编辑保存后正常

**出现问题基线**：10.0.2508.01

**解决方案**：升级 `weaver-ebuilder-designer-service-1.29.0-hotfix6`。

---

### 8.22 EB 应用迁出失败（资源文件未找到）

![迁出失败](https://weapp.eteams.cn/ecodestatic/txproduction/resources/974682604024152064/1763604778-image.png)

**解决方案**：

1. 选择"部分迁出"，查看关联的 ecode 应用列表

   ![部分迁出](https://weapp.eteams.cn/ecodestatic/txproduction/resources/974682604024152064/1763605220-image.png)

2. 获取 ecodeId，通过 `/ecode/main/item/{ecodeId}` 访问

   ![ecodeId](https://weapp.eteams.cn/ecodestatic/txproduction/resources/974682604024152064/1763605234-image.png)

3. 检查 ecode 应用 resources 下文件是否异常（红色标记），异常文件需要重新上传或删除

   ![异常文件](https://weapp.eteams.cn/ecodestatic/txproduction/resources/974682604024152064/1766986155-image.png)

---

### 8.23 代码块保存提示"CSS 代码格式不正确"

![CSS格式错误](https://weapp.eteams.cn/ecodestatic/txproduction/resources/974682604024152064/1765867980-image.png)

**解决方案**：检查 CSS 代码是否存在语法错误。可使用在线工具验证：https://jigsaw.w3.org/css-validator/#validate_by_input

---

### 8.24 EB 自定义组件前端代码开发提示"操作无权限"

![无权限](https://weapp.eteams.cn/ecodestatic/txproduction/resources/974682604024152064/1770349803-image.png)

**解决方案**：

1. 检查 e-code 是否开启了数据权限或分权管理功能
2. 给当前操作人员添加"编辑器自定义组件项目"维护权限

![权限配置1](https://weapp.eteams.cn/ecodestatic/txproduction/resources/974682604024152064/1770349836-image.png)
![权限配置2](https://weapp.eteams.cn/ecodestatic/txproduction/resources/974682604024152064/1770349843-image.png)

> 已存在的自定义组件还需要单独添加 ecode 应用权限。后续新建自定义组件，应用权限会默认继承。

---

### 8.25 二开 jar 包审核提示"存在未审核数据，不允许提交审核!"

![未审核数据](https://weapp.eteams.cn/ecodestatic/txproduction/resources/974682604024152064/1770619751-image.png)

**解决方案**：切换到"待审文件"，展开文件目录，将目录下的文件逐一审核通过后，再点击顶部 jar 包"通过"按钮。

---

### 8.26 EB 应用安装报错"AccessDeniedException"

![AccessDeniedException](https://weapp.eteams.cn/ecodestatic/txproduction/resources/974682604024152064/1772703926-image.png)

**解决方案**：
1. 报错信息中提到的目录，检查服务启动账号是否有读写权限
2. 如果没有权限，需要赋权

> Windows 环境完成文件夹赋权后，一定要关闭文件夹后再进行迁入验证。

---

## 附录：核心调试参数速查

| 参数 | 作用 |
|------|------|
| `?wea_link_show_console` | 解除 console 屏蔽（单次） |
| `?wea_link_keep_show_console` | 保持 console 输出（持续） |
| `?wea_link_keep_vconsole=true` | 移动端保持 vconsole 开启 |
| `/freepass` | 免登录访问页面（需应用发布为公共应用） |

## 附录：核心配置文件速查

| 配置文件 | 位置 | 关键配置项 |
|----------|------|-----------|
| `weaver-ecode-service.properties` | Nacos / 本地 config-center | `weaver.ecode.service.url`、`weaver.ecode.serverless.*`、`weaver.ecode.secdevjar.deploy` |
| `weaver.properties` | E10 服务目录 | `weaver.services[weaver-secondev-service]` |
| `front.conf` | nginx 服务器 `/opt/weaver/front/nginx/conf.d/` | `/ecodestatic` 代理路径 |
| `applicationContext-secondev-secondev-dubbo.xml` | 二开服务 WEB-INF/classes | Dubbo 服务配置 |

## 附录：关键路径速查

| 路径 | 说明 |
|------|------|
| `/ecode` | e-code 开发平台 |
| `/ecode/monitor` | e-code 监控平台 |
| `/ecode/main/item/{ecodeId}` | 指定 ecode 应用详情页 |
| `/api/app/ecode/cache/global` | 代码更新检查接口 |
| `/api/app/ecode/cache/globalData` | 缓存配置接口 |
| `/api/ecode/monitor/deploy/deployJar` | jar 包部署接口 |
| `/info/dispatch/escheduler/report` | 定时任务管理页 |
