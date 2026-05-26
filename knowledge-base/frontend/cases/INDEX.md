# E10 ecode 真实案例库
> **262 个案例**，按场景分类，快速定位可参考的代码模板。
> 参考速查：[REFERENCE.md](./REFERENCE.md) — 全局变量、常见陷阱、ESB 触发方式对比
> 导入新案例：`/ecode-case-parser` 或 `python3 tools/parse_case_zip.py <zip>`

---

## 组件复写（48 个案例）

### EB台帐表格序号列左侧固定
- **技术点**: regOvProps
- **文件** (1个): `entry.js`
- **路径**: [`EB台帐表格序号列左侧固定/`](EB台帐表格序号列左侧固定/)

### EB应用PC端应用中心元素组件
- **技术点**: React.Suspense、React.lazy、ReactDOM.render、asyncImport、ebuilderSDK、forwardRef、regOvProps
- **文件** (4个): `app-list.js`、`com.js`、`entry.js`、`com.css`
- **路径**: [`EB应用PC端应用中心元素组件/`](EB应用PC端应用中心元素组件/)

### EB应用农历日期看板组件
- **技术点**: React.Suspense、React.lazy、ReactDOM.render、asyncImport、ebuilderSDK、forwardRef、regOvProps
- **文件** (4个): `lunar.js`、`com.js`、`entry.js`、`com.css`
- **路径**: [`EB应用农历日期看板组件/`](EB应用农历日期看板组件/)

### EB应用用户信息元素组件
- **技术点**: React.Suspense、React.lazy、ReactDOM.render、asyncImport、ebuilderSDK、forwardRef、regOvProps
- **文件** (3个): `com.js`、`entry.js`、`com.css`
- **路径**: [`EB应用用户信息元素组件/`](EB应用用户信息元素组件/)

### EB应用自定义天气元素组件
- **技术点**: Dialog、React.Suspense、React.lazy、ReactDOM.render、asyncImport、axios、ebuilderSDK、forwardRef、regOvProps
- **文件** (4个): `weather-com.js`、`com.js`、`entry.js`、`com.css`
- **路径**: [`EB应用自定义天气元素组件/`](EB应用自定义天气元素组件/)

### EB查询台帐筛选菜单平铺展示
- **技术点**: React.Suspense、React.lazy、asyncImport、forwardRef、regOvComponent、regOvProps
- **文件** (3个): `index.js`、`entry.js`、`index.css`
- **路径**: [`EB查询台帐筛选菜单平铺展示/`](EB查询台帐筛选菜单平铺展示/)

### EB自定义快递查询组件
- **技术点**: Dialog、React.Suspense、React.lazy、ReactDOM.render、asyncImport、axios、ebuilderSDK、forwardRef、regOvProps
- **文件** (3个): `com.js`、`entry.js`、`com.css`
- **路径**: [`EB自定义快递查询组件/`](EB自定义快递查询组件/)

### EB自定义股票元素组件
- **技术点**: Dialog、React.Suspense、React.lazy、ReactDOM.render、asyncImport、axios、ebuilderSDK、forwardRef、regOvProps
- **文件** (4个): `com.js`、`stock-com.js`、`entry.js`、`com.css`
- **路径**: [`EB自定义股票元素组件/`](EB自定义股票元素组件/)

### EB自定义部门通讯录元素组件
- **技术点**: Dialog、React.Suspense、React.lazy、ReactDOM.render、asyncImport、axios、ebuilderSDK、forwardRef、regOvProps
- **文件** (3个): `com.js`、`entry.js`、`com.css`
- **路径**: [`EB自定义部门通讯录元素组件/`](EB自定义部门通讯录元素组件/)

### EB页面插入自定义ecode元素
- **技术点**: React.Suspense、React.lazy、ReactDOM.render、asyncImport、ebuilderSDK、forwardRef、regOvProps
- **文件** (3个): `index.js`、`entry.js`、`index.css`
- **路径**: [`EB页面插入自定义ecode元素/`](EB页面插入自定义ecode元素/)

### Excel导出
- **技术点**: Dialog、React.Suspense、React.lazy、asyncImport、axios、forwardRef、regOvComponent、regOvProps
- **文件** (2个): `customBatchExport.js`、`entry.js`
- **路径**: [`Excel导出/`](Excel导出/)

### H5自定义日程类型应用
- **技术点**: React.Suspense、React.lazy、asyncImport、regOvProps
- **文件** (3个): `index.js`、`entry.js`、`index.css`
- **路径**: [`H5自定义日程类型应用/`](H5自定义日程类型应用/)

### Notification通知组件
- **技术点**: React.Suspense、React.lazy、ReactDOM.render、asyncImport、forwardRef、regOvProps、useEffect、useState
- **文件** (8个): `notification.js`、`notice.js`、`page.js`、`index.js`
- **路径**: [`Notification通知组件/`](Notification通知组件/)

### Tooltip文字气泡组件
- **技术点**: React.Suspense、React.lazy、asyncImport、forwardRef、regOvProps、useEffect、useImperativeHandle、useState
- **文件** (6个): `page.js`、`index.js`、`utils.js`、`entry.js`
- **路径**: [`Tooltip文字气泡组件/`](Tooltip文字气泡组件/)

### vue插件集成
- **场景**: 考虑到有部分用户开发人员习惯于用VUE进行代码开发，但目前标准底层是基于React进行开发的，目前无法直接在e-code平台写书写关于Vue的相关语法代码，但可以通过loadjs引入第三方插件js的方式进行代码，
- **技术点**: React.Suspense、React.lazy、asyncImport、forwardRef、regOvComponent、regOvProps、useEffect、useState
- **文件** (9个): `VuePage.js`、`index.full.min.js`、`vue.global.js`、`VueButton.js`
- **路径**: [`vue插件集成/`](vue插件集成/)

### 主框架菜单调整至右侧
- **技术点**: regOvProps
- **文件** (1个): `entry.js`
- **路径**: [`主框架菜单调整至右侧/`](主框架菜单调整至右侧/)

### 主页菜单添加多级路由新页面
- **技术点**: React.Suspense、React.lazy、asyncImport、regOvProps
- **文件** (4个): `a.js`、`index.js`、`b.js`、`entry.js`
- **路径**: [`主页菜单添加多级路由新页面/`](主页菜单添加多级路由新页面/)

### 固定table每页条数
- **技术点**: axios、regOvProps
- **文件** (1个): `entry.js`
- **路径**: [`固定table每页条数/`](固定table每页条数/)

### 复写select-禁止表格中分页的每页条数变更
- **技术点**: regOvProps
- **文件** (1个): `entry.js`
- **路径**: [`复写select-禁止表格中分页的每页条数变更/`](复写select-禁止表格中分页的每页条数变更/)

### 复写table-调整分页位置
- **技术点**: regOvProps
- **文件** (2个): `entry.js`、`index.css`
- **路径**: [`复写table-调整分页位置/`](复写table-调整分页位置/)

### 复写table-针对指定列内容标签化展示
- **技术点**: regOvProps、window.weappUi
- **文件** (1个): `entry.js`
- **路径**: [`复写table-针对指定列内容标签化展示/`](复写table-针对指定列内容标签化展示/)

### 大数据报表看板页面
- **技术点**: React.Suspense、React.lazy、asyncImport、regOvProps
- **文件** (13个): `top-bg.js`、`middle-bar.js`、`index.js`、`left-bottom-graph.js`
- **路径**: [`大数据报表看板页面/`](大数据报表看板页面/)

### 完成度看板组件
- **技术点**: React.Suspense、React.lazy、asyncImport、regOvProps
- **文件** (4个): `page.js`、`index.js`、`entry.js`、`index.css`
- **路径**: [`完成度看板组件/`](完成度看板组件/)

### 富文本签字意见增加新字号选项
- **技术点**: regOvProps
- **文件** (1个): `entry.js`
- **路径**: [`富文本签字意见增加新字号选项/`](富文本签字意见增加新字号选项/)

### 富文本组件配置首行缩进
- **技术点**: regOvProps
- **文件** (1个): `entry.js`
- **路径**: [`富文本组件配置首行缩进/`](富文本组件配置首行缩进/)

### 导航面板去除最大菜单数量100的限制
- **技术点**: regOvProps
- **文件** (1个): `entry.js`
- **路径**: [`导航面板去除最大菜单数量100的限制/`](导航面板去除最大菜单数量100的限制/)

### 屏蔽table选择框默认无法选中
- **技术点**: regOvProps
- **文件** (1个): `entry.js`
- **路径**: [`屏蔽table选择框默认无法选中/`](屏蔽table选择框默认无法选中/)

### 常用应用添加自定义应用固定显示
- **技术点**: regOvProps
- **文件** (1个): `entry.js`
- **路径**: [`常用应用添加自定义应用固定显示/`](常用应用添加自定义应用固定显示/)

### 年视图控制指定日期的可选
- **技术点**: React.Suspense、React.lazy、asyncImport、regOvProps
- **文件** (3个): `index.js`、`entry.js`、`index.css`
- **路径**: [`年视图控制指定日期的可选/`](年视图控制指定日期的可选/)

### 引入第三方插件（组件）antd
- **技术点**: Dialog、React.Suspense、React.lazy、asyncImport、forwardRef、regOvComponent、useEffect、useImperativeHandle、useState
- **文件** (5个): `antd.min.js`、`jquery.min.js`、`dayjs.min.js`、`NewButton.js`
- **路径**: [`引入第三方插件（组件）antd/`](引入第三方插件（组件）antd/)

### 折叠面板替换收缩图标
- **技术点**: regOvProps、window.weappUi
- **文件** (1个): `entry.js`
- **路径**: [`折叠面板替换收缩图标/`](折叠面板替换收缩图标/)

### 数值输入框增加货币符号
- **技术点**: regOvProps
- **文件** (1个): `entry.js`
- **路径**: [`数值输入框增加货币符号/`](数值输入框增加货币符号/)

### 数据字典类页面开发
- **技术点**: Dialog、React.Suspense、React.lazy、asyncImport、regOvProps
- **文件** (5个): `index.js`、`table-info.js`、`data.js`、`entry.js`
- **路径**: [`数据字典类页面开发/`](数据字典类页面开发/)

### 日报富文本编辑器添加全屏
- **技术点**: regOvProps
- **文件** (1个): `entry.js`
- **路径**: [`日报富文本编辑器添加全屏/`](日报富文本编辑器添加全屏/)

### 日期组件增加星期显示
- **技术点**: regOvProps
- **文件** (2个): `entry.js`、`index.css`
- **路径**: [`日期组件增加星期显示/`](日期组件增加星期显示/)

### 日期选择增加自定义快捷选择记录
- **技术点**: regOvProps
- **文件** (1个): `entry.js`
- **路径**: [`日期选择增加自定义快捷选择记录/`](日期选择增加自定义快捷选择记录/)

### 日期选择限制本周日期范围可选
- **技术点**: regOvProps
- **文件** (1个): `entry.js`
- **路径**: [`日期选择限制本周日期范围可选/`](日期选择限制本周日期范围可选/)

### 曲线图数据报表卡片组件
- **技术点**: React.Suspense、React.lazy、asyncImport、regOvProps
- **文件** (4个): `page.js`、`index.js`、`entry.js`、`index.css`
- **路径**: [`曲线图数据报表卡片组件/`](曲线图数据报表卡片组件/)

### 根据添加的明细行号自动初始化值
- **技术点**: regOvProps
- **文件** (1个): `entry.js`
- **路径**: [`根据添加的明细行号自动初始化值/`](根据添加的明细行号自动初始化值/)

### 甘特图自定义列宽
- **技术点**: regOvProps
- **文件** (1个): `entry.js`
- **路径**: [`甘特图自定义列宽/`](甘特图自定义列宽/)

### 禁止签批意见回复功能
- **技术点**: regOvProps
- **文件** (1个): `entry.js`
- **路径**: [`禁止签批意见回复功能/`](禁止签批意见回复功能/)

### 签字意见增加新字体选项
- **技术点**: regOvProps
- **文件** (1个): `entry.js`
- **路径**: [`签字意见增加新字体选项/`](签字意见增加新字体选项/)

### 系统头像形状调整
- **技术点**: regOvProps
- **文件** (1个): `entry.js`
- **路径**: [`系统头像形状调整/`](系统头像形状调整/)

### 系统导航图标修改
- **技术点**: regOvProps
- **文件** (1个): `entry.js`
- **路径**: [`系统导航图标修改/`](系统导航图标修改/)

### 系统菜单增加单点登录至E9
- **技术点**: Dialog、React.Suspense、React.lazy、ReactDOM.render、asyncImport、axios、regOvProps
- **文件** (3个): `index.js`、`entry.js`、`index.css`
- **路径**: [`系统菜单增加单点登录至E9/`](系统菜单增加单点登录至E9/)

### 表格集成excel导入导出
- **技术点**: Dialog、React.Suspense、React.lazy、asyncImport、regOvProps
- **文件** (5个): `message.js`、`index.js`、`add.js`、`entry.js`
- **路径**: [`表格集成excel导入导出/`](表格集成excel导入导出/)

### 重写业务模块组件获取业务store
- **技术点**: React.lazy、asyncImport、regOvProps、useEffect
- **文件** (2个): `BatchOperate.js`、`entry.js`
- **路径**: [`重写业务模块组件获取业务store/`](重写业务模块组件获取业务store/)

### 顶部更多应用添加自定义应用链接
- **技术点**: regOvProps
- **文件** (1个): `entry.js`
- **路径**: [`顶部更多应用添加自定义应用链接/`](顶部更多应用添加自定义应用链接/)


## 按钮/操作复写（31 个案例）

### EB表单台账增加新建流程按钮
- **技术点**: Dialog、regOvProps、window.weappUi
- **文件** (2个): `entry.js`、`init.css`
- **路径**: [`EB表单台账增加新建流程按钮/`](EB表单台账增加新建流程按钮/)

### EB表单按钮触发ESB工作流
- **场景**: 在 eb 表单设计器中配置一个按钮，点击后弹出自定义 Dialog（含 DatePicker），用户选择日期后确认，触发 ESB 工作流。
- **技术点**: Dialog、ReactDOM.render、request(、triggerActionFlow、window.weappUi
- **文件** (1个): `entry.js`
- **路径**: [`EB表单按钮触发ESB工作流/`](EB表单按钮触发ESB工作流/)

### Title拦截注入按钮-单文件模式
- **场景**: 在页面标题栏（Title 组件）右侧添加自定义按钮，点击弹出含 Input + DatePicker 的 Dialog。
- **技术点**: Dialog、ReactDOM.render、regOvProps、request(、window.weappUi
- **文件** (1个): `entry.js`
- **路径**: [`Title拦截注入按钮-单文件模式/`](Title拦截注入按钮-单文件模式/)

### Title拦截注入按钮-拆分异步文件
- **场景**: 弹窗内容复杂（多字段、复杂校验、富文本等），不能全写在 entry.js 中，需要拆分为 entry.js + 异步文件的模式。
- **技术点**: Dialog、ReactDOM.render、asyncImport、regOvProps、request(、window.weappUi
- **文件** (2个): `DateDialog.js`、`entry.js`
- **路径**: [`Title拦截注入按钮-拆分异步文件/`](Title拦截注入按钮-拆分异步文件/)

### 上传组件上传按钮调整
- **技术点**: regOvProps、window.weappUi
- **文件** (2个): `entry.js`、`index.css`
- **路径**: [`上传组件上传按钮调整/`](上传组件上传按钮调整/)

### 人员浏览按钮禁止全选
- **技术点**: -
- **文件** (2个): `entry.js`、`init.css`
- **路径**: [`人员浏览按钮禁止全选/`](人员浏览按钮禁止全选/)

### 人员浏览框屏蔽创建群组按钮
- **技术点**: -
- **文件** (2个): `entry.js`、`init.css`
- **路径**: [`人员浏览框屏蔽创建群组按钮/`](人员浏览框屏蔽创建群组按钮/)

### 公文查询顶部增加发起公文按钮
- **技术点**: regOvProps、window.weappUi
- **文件** (2个): `entry.js`、`init.css`
- **路径**: [`公文查询顶部增加发起公文按钮/`](公文查询顶部增加发起公文按钮/)

### 审批弹窗打开时顶部增加外部打开按钮
- **技术点**: regOvProps、window.weappUi
- **文件** (1个): `entry.js`
- **路径**: [`审批弹窗打开时顶部增加外部打开按钮/`](审批弹窗打开时顶部增加外部打开按钮/)

### 审批签批底部增加快捷输入按钮
- **技术点**: React.Suspense、React.lazy、asyncImport、forwardRef、regOvProps
- **文件** (3个): `index.js`、`entry.js`、`index.css`
- **路径**: [`审批签批底部增加快捷输入按钮/`](审批签批底部增加快捷输入按钮/)

### 审批表单操作按钮项屏蔽
- **技术点**: regOvProps
- **文件** (1个): `entry.js`
- **路径**: [`审批表单操作按钮项屏蔽/`](审批表单操作按钮项屏蔽/)

### 审批表单添加重置按钮
- **技术点**: Dialog、regOvProps
- **文件** (1个): `entry.js`
- **路径**: [`审批表单添加重置按钮/`](审批表单添加重置按钮/)

### 审批页面操作按钮移动放到底部操作
- **技术点**: Dialog、regOvProps
- **文件** (1个): `entry.js`
- **路径**: [`审批页面操作按钮移动放到底部操作/`](审批页面操作按钮移动放到底部操作/)

### 审批顶部增加非按钮组件
- **技术点**: React.Suspense、React.lazy、asyncImport、regOvProps
- **文件** (2个): `index.js`、`entry.js`
- **路径**: [`审批顶部增加非按钮组件/`](审批顶部增加非按钮组件/)

### 批准按钮修改
- **技术点**: regOvProps
- **文件** (1个): `entry.js`
- **路径**: [`批准按钮修改/`](批准按钮修改/)

### 按钮组件点击事件复写
- **技术点**: Dialog、regOvProps、request(、window.weappUi
- **文件** (2个): `entry.js`
- **路径**: [`按钮组件点击事件复写/`](按钮组件点击事件复写/)

### 按钮组件重写
- **技术点**: React.Suspense、React.lazy、asyncImport、forwardRef、regOvComponent
- **文件** (3个): `NewButton.js`、`entry.js`
- **路径**: [`按钮组件重写/`](按钮组件重写/)

### 提交申请添加创建审批按钮
- **技术点**: regOvProps
- **文件** (1个): `entry.js`
- **路径**: [`提交申请添加创建审批按钮/`](提交申请添加创建审批按钮/)

### 收发文单位浏览按钮显示换行不省略
- **技术点**: -
- **文件** (2个): `entry.js`、`index.css`
- **路径**: [`收发文单位浏览按钮显示换行不省略/`](收发文单位浏览按钮显示换行不省略/)

### 文档侧边打开时弹窗顶部增加外部打开按钮
- **技术点**: regOvProps、window.weappUi
- **文件** (1个): `entry.js`
- **路径**: [`文档侧边打开时弹窗顶部增加外部打开按钮/`](文档侧边打开时弹窗顶部增加外部打开按钮/)

### 文档列表增加附件快捷查看按钮
- **技术点**: Dialog、React.Suspense、React.lazy、asyncImport、regOvProps
- **文件** (4个): `store.js`、`index.js`、`main.js`、`entry.js`
- **路径**: [`文档列表增加附件快捷查看按钮/`](文档列表增加附件快捷查看按钮/)

### 新建审批添加表单设计菜单按钮
- **技术点**: Dialog、regOvProps
- **文件** (1个): `entry.js`
- **路径**: [`新建审批添加表单设计菜单按钮/`](新建审批添加表单设计菜单按钮/)

### 流程tab添加自定义按钮弹窗
- **技术点**: Dialog、React.Suspense、React.lazy、asyncImport、regOvComponent、regOvProps
- **文件** (2个): `index.js`、`entry.js`
- **路径**: [`流程tab添加自定义按钮弹窗/`](流程tab添加自定义按钮弹窗/)

### 流程增加操作按钮-0523
- **技术点**: React.Suspense、React.lazy、asyncImport、forwardRef、regOvComponent、regOvProps
- **文件** (2个): `AddButton.js`、`entry.js`
- **路径**: [`流程增加操作按钮-0523/`](流程增加操作按钮-0523/)

### 流程表单操作按钮位置调整
- **技术点**: React.Suspense、React.lazy、asyncImport、forwardRef、regOvComponent、regOvProps
- **文件** (2个): `index.js`、`entry.js`
- **路径**: [`流程表单操作按钮位置调整/`](流程表单操作按钮位置调整/)

### 浏览按钮新建菜单屏蔽或过滤
- **技术点**: axios
- **文件** (1个): `entry.js`
- **路径**: [`浏览按钮新建菜单屏蔽或过滤/`](浏览按钮新建菜单屏蔽或过滤/)

### 独立页面审批时移动操作按钮至底部区域
- **技术点**: React.Suspense、React.lazy、ReactDOM.render、asyncImport、forwardRef、regOvProps
- **文件** (3个): `index.js`、`entry.js`、`index.css`
- **路径**: [`独立页面审批时移动操作按钮至底部区域/`](独立页面审批时移动操作按钮至底部区域/)

### 移动端审批表单增加悬浮按钮抽屉内容展示
- **技术点**: React.Suspense、React.lazy、ReactDOM.render、asyncImport、forwardRef、regOvProps
- **文件** (4个): `index.js`、`drawer.js`、`entry.js`、`index.css`
- **路径**: [`移动端审批表单增加悬浮按钮抽屉内容展示/`](移动端审批表单增加悬浮按钮抽屉内容展示/)

### 移动端屏蔽附件下载按钮
- **技术点**: regOvProps
- **文件** (1个): `entry.js`
- **路径**: [`移动端屏蔽附件下载按钮/`](移动端屏蔽附件下载按钮/)

### 移动端底部更多按钮选项过滤
- **技术点**: regOvProps、window.weappUi
- **文件** (1个): `entry.js`
- **路径**: [`移动端底部更多按钮选项过滤/`](移动端底部更多按钮选项过滤/)

### 隐藏流程新建悬浮按钮改为底部按钮
- **技术点**: regOvProps
- **文件** (2个): `entry.js`、`index.css`
- **路径**: [`隐藏流程新建悬浮按钮改为底部按钮/`](隐藏流程新建悬浮按钮改为底部按钮/)


## Title/标题栏（2 个案例）

### EB页面卡片标题增加指定logo
- **技术点**: React.Suspense、React.lazy、ReactDOM.render、asyncImport、ebuilderSDK、forwardRef、regOvProps
- **文件** (3个): `index.js`、`entry.js`、`index.css`
- **路径**: [`EB页面卡片标题增加指定logo/`](EB页面卡片标题增加指定logo/)

### 重写会议室使用情况title
- **技术点**: forwardRef、regOvComponent、regOvProps
- **文件** (1个): `entry.js`
- **路径**: [`重写会议室使用情况title/`](重写会议室使用情况title/)


## Dialog/弹窗（9 个案例）

### Dialog命令式弹窗
- **场景**: 通过命令式 API 弹出 Dialog，而不是 `<Dialog visible={...}>` 声明式使用。
- **技术点**: Dialog、ReactDOM.render、forwardRef、useImperativeHandle、useState、window.weappUi
- **文件** (2个): `写法B-forwardRef.js`、`写法A-闭包变量.js`
- **路径**: [`Dialog命令式弹窗/`](Dialog命令式弹窗/)

### 复写Dialog-默认弹窗最大化
- **技术点**: Dialog、React.Suspense、React.lazy、asyncImport、forwardRef、regOvComponent、regOvProps
- **文件** (2个): `CustDialogCom.js`、`entry.js`
- **路径**: [`复写Dialog-默认弹窗最大化/`](复写Dialog-默认弹窗最大化/)

### 多消息展示弹窗且全局可触发展示
- **技术点**: Dialog、React.Suspense、React.lazy、asyncImport、regOvProps、window.weappUi
- **文件** (3个): `index.js`、`entry.js`、`index.css`
- **路径**: [`多消息展示弹窗且全局可触发展示/`](多消息展示弹窗且全局可触发展示/)

### 审批主表字段单文本字段增加点击弹窗
- **技术点**: Dialog、React.Suspense、React.lazy、ReactDOM.render、asyncImport、regOvProps
- **文件** (3个): `index.js`、`entry.js`、`index.css`
- **路径**: [`审批主表字段单文本字段增加点击弹窗/`](审批主表字段单文本字段增加点击弹窗/)

### 审批表单浏览框值变更弹窗确认
- **技术点**: Dialog、regOvProps、window.weappUi
- **文件** (1个): `entry.js`
- **路径**: [`审批表单浏览框值变更弹窗确认/`](审批表单浏览框值变更弹窗确认/)

### 弹框默认全屏
- **技术点**: Dialog、regOvProps
- **文件** (1个): `entry.js`
- **路径**: [`弹框默认全屏/`](弹框默认全屏/)

### 新建流程点击增加弹窗打开或新页面打开自定义选择
- **技术点**: Dialog、regOvProps、window.weappUi
- **文件** (1个): `entry.js`
- **路径**: [`新建流程点击增加弹窗打开或新页面打开自定义选择/`](新建流程点击增加弹窗打开或新页面打开自定义选择/)

### 每日首次登录祝福语弹窗
- **技术点**: Dialog、React.Suspense、React.lazy、ReactDOM.render、asyncImport、axios
- **文件** (4个): `index.js`、`entry.js`、`index.css`
- **路径**: [`每日首次登录祝福语弹窗/`](每日首次登录祝福语弹窗/)

### 自由流转弹窗-抄送默认为抄送不需提交
- **技术点**: regOvProps
- **文件** (1个): `entry.js`
- **路径**: [`自由流转弹窗-抄送默认为抄送不需提交/`](自由流转弹窗-抄送默认为抄送不需提交/)


## 流程/Workflow（46 个案例）

### EB台帐数据带入流程创建中
- **技术点**: Dialog、React.Suspense、React.lazy、asyncImport、forwardRef、regOvProps
- **文件** (3个): `button.js`、`entry.js`、`index.css`
- **路径**: [`EB台帐数据带入流程创建中/`](EB台帐数据带入流程创建中/)

### EB应用快捷流程创建元素组件
- **技术点**: React.Suspense、React.lazy、ReactDOM.render、asyncImport、ebuilderSDK、forwardRef、regOvProps
- **文件** (3个): `com.js`、`entry.js`、`com.css`
- **路径**: [`EB应用快捷流程创建元素组件/`](EB应用快捷流程创建元素组件/)

### 上海外国语--子流程意见高亮展示
- **技术点**: axios、forwardRef、regOvComponent
- **文件** (2个): `entry.js`、`index.css`
- **路径**: [`上海外国语--子流程意见高亮展示/`](上海外国语--子流程意见高亮展示/)

### 北大医疗-自由流程开发
- **技术点**: axios、regOvProps
- **文件** (1个): `entry.js`
- **路径**: [`北大医疗-自由流程开发/`](北大医疗-自由流程开发/)

### 北大医疗-自由流程提交确认
- **技术点**: regOvProps
- **文件** (1个): `entry.js`
- **路径**: [`北大医疗-自由流程提交确认/`](北大医疗-自由流程提交确认/)

### 发起公文增加新建审批流操作
- **技术点**: Dialog、regOvProps
- **文件** (2个): `entry.js`、`index.css`
- **路径**: [`发起公文增加新建审批流操作/`](发起公文增加新建审批流操作/)

### 复写流程列表打开方式
- **技术点**: axios
- **文件** (1个): `entry.js`
- **路径**: [`复写流程列表打开方式/`](复写流程列表打开方式/)

### 审批代办列表样式调整-0530
- **技术点**: regOvProps
- **文件** (2个): `entry.js`、`index.css`
- **路径**: [`审批代办列表样式调整-0530/`](审批代办列表样式调整-0530/)

### 审批字段添加帮助说明
- **技术点**: ReactDOM.render、regOvProps、window.weappUi
- **文件** (1个): `entry.js`
- **路径**: [`审批字段添加帮助说明/`](审批字段添加帮助说明/)

### 审批签批意见设置默认签批内容
- **技术点**: regOvProps
- **文件** (1个): `entry.js`
- **路径**: [`审批签批意见设置默认签批内容/`](审批签批意见设置默认签批内容/)

### 审批表单字段替换显示
- **技术点**: Dialog、React.Suspense、React.lazy、asyncImport、forwardRef、regOvComponent
- **文件** (3个): `index.js`、`entry.js`、`index.css`
- **路径**: [`审批表单字段替换显示/`](审批表单字段替换显示/)

### 审批表单根据节点隐藏所有明细表
- **技术点**: regOvProps
- **文件** (1个): `entry.js`
- **路径**: [`审批表单根据节点隐藏所有明细表/`](审批表单根据节点隐藏所有明细表/)

### 审批表单页面模式增加右侧侧边栏
- **技术点**: React.Suspense、React.lazy、ReactDOM.render、asyncImport、forwardRef、regOvProps
- **文件** (3个): `index.js`、`entry.js`、`index.css`
- **路径**: [`审批表单页面模式增加右侧侧边栏/`](审批表单页面模式增加右侧侧边栏/)

### 审批页面增加线性签字意见图
- **技术点**: Dialog、React.Suspense、React.lazy、asyncImport、axios、forwardRef、regOvComponent、regOvProps
- **文件** (3个): `index.js`、`entry.js`、`index.css`
- **路径**: [`审批页面增加线性签字意见图/`](审批页面增加线性签字意见图/)

### 审批页面增加自定义页面tab
- **技术点**: React.Suspense、React.lazy、asyncImport、forwardRef、regOvComponent、regOvProps
- **文件** (2个): `index.js`、`entry.js`
- **路径**: [`审批页面增加自定义页面tab/`](审批页面增加自定义页面tab/)

### 屏蔽审批查阅情况展示
- **技术点**: regOvProps
- **文件** (1个): `entry.js`
- **路径**: [`屏蔽审批查阅情况展示/`](屏蔽审批查阅情况展示/)

### 屏蔽流程创建中的更多及事项关联
- **技术点**: regOvProps
- **文件** (2个): `entry.js`、`index.css`
- **路径**: [`屏蔽流程创建中的更多及事项关联/`](屏蔽流程创建中的更多及事项关联/)

### 打开流程的中转页面
- **技术点**: React.Suspense、React.lazy、asyncImport、axios、regOvProps
- **文件** (2个): `Todo.js`、`entry.js`
- **路径**: [`打开流程的中转页面/`](打开流程的中转页面/)

### 拟签意见开发--不修改时间
- **技术点**: axios
- **文件** (1个): `entry.js`
- **路径**: [`拟签意见开发--不修改时间/`](拟签意见开发--不修改时间/)

### 拟签意见开发--过滤意见（axios方式）
- **技术点**: axios
- **文件** (1个): `entry.js`
- **路径**: [`拟签意见开发--过滤意见（axios方式）/`](拟签意见开发--过滤意见（axios方式）/)

### 拟签意见开发--过滤意见（jssdk方式）
- **技术点**: regOvProps
- **文件** (1个): `entry.js`
- **路径**: [`拟签意见开发--过滤意见（jssdk方式）/`](拟签意见开发--过滤意见（jssdk方式）/)

### 拟签意见开发-过滤意见
- **技术点**: axios
- **文件** (1个): `entry.js`
- **路径**: [`拟签意见开发-过滤意见/`](拟签意见开发-过滤意见/)

### 新建会议-流程窗口默认全屏
- **技术点**: Dialog、regOvProps
- **文件** (1个): `entry.js`
- **路径**: [`新建会议-流程窗口默认全屏/`](新建会议-流程窗口默认全屏/)

### 未操作者过滤征询人
- **技术点**: axios
- **文件** (1个): `entry.js`
- **路径**: [`未操作者过滤征询人/`](未操作者过滤征询人/)

### 根据业务表单触发创建流程并带入初始值
- **技术点**: regOvProps
- **文件** (1个): `entry.js`
- **路径**: [`根据业务表单触发创建流程并带入初始值/`](根据业务表单触发创建流程并带入初始值/)

### 流程列表默认显示为列表视图
- **技术点**: axios
- **文件** (1个): `entry.js`
- **路径**: [`流程列表默认显示为列表视图/`](流程列表默认显示为列表视图/)

### 流程增加一键下载PDF的功能
- **技术点**: axios、regOvProps、request(
- **文件** (2个): `index.js`、`entry.js`
- **路径**: [`流程增加一键下载PDF的功能/`](流程增加一键下载PDF的功能/)

### 流程增加一键下载流程里所有附件的功能
- **技术点**: axios、regOvProps、request(
- **文件** (2个): `index.js`、`entry.js`
- **路径**: [`流程增加一键下载流程里所有附件的功能/`](流程增加一键下载流程里所有附件的功能/)

### 流程增加自定义页签
- **技术点**: React.Suspense、React.lazy、asyncImport、forwardRef、regOvComponent、regOvProps
- **文件** (2个): `index.js`、`entry.js`
- **路径**: [`流程增加自定义页签/`](流程增加自定义页签/)

### 流程干预支持分叉节点
- **技术点**: Dialog、React.Suspense、React.lazy、asyncImport、axios、forwardRef、regOvComponent、regOvProps
- **文件** (4个): `InterveneDialog.js`、`InterveneStore.js`、`entry.js`、`interveneDialog.css`
- **路径**: [`流程干预支持分叉节点/`](流程干预支持分叉节点/)

### 流程模块左侧菜单默认展开
- **技术点**: React.Suspense、React.lazy、asyncImport、forwardRef、regOvComponent、regOvProps
- **文件** (2个): `index.js`、`entry.js`
- **路径**: [`流程模块左侧菜单默认展开/`](流程模块左侧菜单默认展开/)

### 流程自定义干预操作复写
- **技术点**: React.lazy、asyncImport、forwardRef、regOvComponent
- **文件** (2个): `customInterventionCom.js`、`entry.js`
- **路径**: [`流程自定义干预操作复写/`](流程自定义干预操作复写/)

### 流程自定义干预操作复写-移动
- **技术点**: React.lazy、asyncImport、forwardRef、regOvComponent
- **文件** (3个): `customInterventionCom.js`、`entry.js`、`index.css`
- **路径**: [`流程自定义干预操作复写-移动/`](流程自定义干预操作复写-移动/)

### 流程表单右侧增加表单修改日志组件
- **技术点**: React.Suspense、React.lazy、asyncImport、forwardRef、regOvComponent、regOvProps
- **文件** (3个): `NewFPMainTab.js`、`entry.js`、`newFPMainTab.css`
- **路径**: [`流程表单右侧增加表单修改日志组件/`](流程表单右侧增加表单修改日志组件/)

### 流程表单增加自定义默认数据配置填充
- **技术点**: Dialog、React.Suspense、React.lazy、ReactDOM.render、asyncImport、regOvProps
- **文件** (5个): `index.js`、`add.js`、`com.js`、`entry.js`
- **路径**: [`流程表单增加自定义默认数据配置填充/`](流程表单增加自定义默认数据配置填充/)

### 流程页面的路径添加统一参数
- **技术点**: -
- **文件** (1个): `entry.js`
- **路径**: [`流程页面的路径添加统一参数/`](流程页面的路径添加统一参数/)

### 流程页面隐藏更多菜单
- **技术点**: regOvProps
- **文件** (1个): `entry.js`
- **路径**: [`流程页面隐藏更多菜单/`](流程页面隐藏更多菜单/)

### 流程预测
- **技术点**: React.Suspense、React.lazy、asyncImport、regOvProps、request(
- **文件** (5个): `CustomPage.js`、`store.js`、`index.js`、`entry.js`
- **路径**: [`流程预测/`](流程预测/)

### 用户头像增加流程代办数角标
- **技术点**: React.Suspense、React.lazy、asyncImport、axios、forwardRef、regOvComponent
- **文件** (3个): `index.js`、`entry.js`、`index.css`
- **路径**: [`用户头像增加流程代办数角标/`](用户头像增加流程代办数角标/)

### 移动端审批列表添加自定义底色
- **技术点**: regOvProps
- **文件** (2个): `entry.js`、`index.css`
- **路径**: [`移动端审批列表添加自定义底色/`](移动端审批列表添加自定义底色/)

### 自定义操作者Tab
- **技术点**: Dialog、React.Suspense、React.lazy、asyncImport、forwardRef、regOvComponent
- **文件** (5个): `index.js`、`customOperator.js`、`customOperatorStore.js`、`entry.js`
- **路径**: [`自定义操作者Tab/`](自定义操作者Tab/)

### 请假流程根据人员控制请假类型范围
- **技术点**: axios
- **文件** (1个): `entry.js`
- **路径**: [`请假流程根据人员控制请假类型范围/`](请假流程根据人员控制请假类型范围/)

### 调整审批流程图至表单下方
- **技术点**: React.Suspense、React.lazy、ReactDOM.render、asyncImport、axios、forwardRef、regOvProps
- **文件** (11个): `freeSignChartSvgIndex.js`、`OperatePanel.js`、`old.js`、`index.js`
- **路径**: [`调整审批流程图至表单下方/`](调整审批流程图至表单下方/)

### 调整审批页面流程状态至表单下方
- **技术点**: React.Suspense、React.lazy、ReactDOM.render、asyncImport、axios、forwardRef、regOvProps
- **文件** (3个): `index.js`、`entry.js`、`index.css`
- **路径**: [`调整审批页面流程状态至表单下方/`](调整审批页面流程状态至表单下方/)

### 隆基-数据冲突开发
- **技术点**: axios
- **文件** (1个): `entry.js`
- **路径**: [`隆基-数据冲突开发/`](隆基-数据冲突开发/)

### 隐藏审批的流程图页签
- **技术点**: regOvProps
- **文件** (1个): `entry.js`
- **路径**: [`隐藏审批的流程图页签/`](隐藏审批的流程图页签/)


## 表单字段（44 个案例）

### ESB动作流触发-SDK
- **场景**: 在 eb 表格视图或 eb 表单下直接调用动作流。
- **技术点**: callEsbFlow、ebdfpageSDK
- **文件** (1个): `callEsbFlow.js`
- **路径**: [`ESB动作流触发-SDK/`](ESB动作流触发-SDK/)

### ESB动作流触发-布局
- **场景**: 触发布局中的动作流事件，适用于需要传递表单数据的场景（新建布局等）。
- **技术点**: request(
- **文件** (1个): `runVerifyEsb.js`
- **路径**: [`ESB动作流触发-布局/`](ESB动作流触发-布局/)

### 下拉框等Trigger组件跟随滚动
- **技术点**: regOvProps
- **文件** (1个): `entry.js`
- **路径**: [`下拉框等Trigger组件跟随滚动/`](下拉框等Trigger组件跟随滚动/)

### 主表拼接字段内容同步
- **技术点**: regOvProps
- **文件** (1个): `entry.js`
- **路径**: [`主表拼接字段内容同步/`](主表拼接字段内容同步/)

### 人力浏览框屏蔽我的下属tab页
- **技术点**: regOvProps
- **文件** (1个): `entry.js`
- **路径**: [`人力浏览框屏蔽我的下属tab页/`](人力浏览框屏蔽我的下属tab页/)

### 人力浏览框已选择布局左右互换
- **技术点**: regOvProps
- **文件** (2个): `entry.js`、`index.css`
- **路径**: [`人力浏览框已选择布局左右互换/`](人力浏览框已选择布局左右互换/)

### 人员浏览框可选列表勾选位置调整
- **技术点**: -
- **文件** (2个): `entry.js`、`init.css`
- **路径**: [`人员浏览框可选列表勾选位置调整/`](人员浏览框可选列表勾选位置调整/)

### 会议卡片隐藏会议室使用情况链接
- **技术点**: axios
- **文件** (1个): `entry.js`
- **路径**: [`会议卡片隐藏会议室使用情况链接/`](会议卡片隐藏会议室使用情况链接/)

### 列表增加自定义字段
- **技术点**: axios、request(
- **文件** (1个): `entry.js`
- **路径**: [`列表增加自定义字段/`](列表增加自定义字段/)

### 单选浏览框调整为下拉框展示
- **技术点**: React.Suspense、React.lazy、asyncImport、forwardRef、regOvComponent、regOvProps
- **文件** (2个): `index.js`、`entry.js`
- **路径**: [`单选浏览框调整为下拉框展示/`](单选浏览框调整为下拉框展示/)

### 多行文本增加字数输入控制
- **技术点**: regOvProps
- **文件** (2个): `entry.js`、`index.css`
- **路径**: [`多行文本增加字数输入控制/`](多行文本增加字数输入控制/)

### 待办列表常用搜索条件中增加表单字段条件
- **技术点**: axios
- **文件** (1个): `entry.js`
- **路径**: [`待办列表常用搜索条件中增加表单字段条件/`](待办列表常用搜索条件中增加表单字段条件/)

### 打开表单字段链接
- **技术点**: regOvProps
- **文件** (1个): `entry.js`
- **路径**: [`打开表单字段链接/`](打开表单字段链接/)

### 控制人员卡片中的显示字段
- **技术点**: regOvProps
- **文件** (1个): `entry.js`
- **路径**: [`控制人员卡片中的显示字段/`](控制人员卡片中的显示字段/)

### 提交表单明细字段重复数据校验
- **技术点**: Dialog、regOvProps
- **文件** (1个): `entry.js`
- **路径**: [`提交表单明细字段重复数据校验/`](提交表单明细字段重复数据校验/)

### 明细表中的部分字段拼接同步到另一个字段
- **技术点**: regOvProps
- **文件** (1个): `entry.js`
- **路径**: [`明细表中的部分字段拼接同步到另一个字段/`](明细表中的部分字段拼接同步到另一个字段/)

### 明细表删除二次确认
- **技术点**: Dialog、regOvProps
- **文件** (1个): `entry.js`
- **路径**: [`明细表删除二次确认/`](明细表删除二次确认/)

### 明细表字段值合计同步到主表
- **技术点**: regOvProps
- **文件** (1个): `entry.js`
- **路径**: [`明细表字段值合计同步到主表/`](明细表字段值合计同步到主表/)

### 明细表添加行自动初始化主表关联字段的值
- **技术点**: regOvProps
- **文件** (1个): `entry.js`
- **路径**: [`明细表添加行自动初始化主表关联字段的值/`](明细表添加行自动初始化主表关联字段的值/)

### 明细表特定条件数据合计到主表字段
- **技术点**: regOvProps
- **文件** (1个): `entry.js`
- **路径**: [`明细表特定条件数据合计到主表字段/`](明细表特定条件数据合计到主表字段/)

### 替换表单中的单行文本框为富文本框
- **技术点**: React.Suspense、React.lazy、asyncImport、forwardRef、regOvComponent、regOvProps
- **文件** (2个): `index.js`、`entry.js`
- **路径**: [`替换表单中的单行文本框为富文本框/`](替换表单中的单行文本框为富文本框/)

### 根据下拉框的值批量变更属性和值
- **技术点**: regOvProps
- **文件** (1个): `entry.js`
- **路径**: [`根据下拉框的值批量变更属性和值/`](根据下拉框的值批量变更属性和值/)

### 根据下拉框的值联动变更显示属性和值
- **技术点**: regOvProps
- **文件** (1个): `entry.js`
- **路径**: [`根据下拉框的值联动变更显示属性和值/`](根据下拉框的值联动变更显示属性和值/)

### 根据主表字段动态控制明细行数
- **技术点**: Dialog、regOvProps
- **文件** (1个): `entry.js`
- **路径**: [`根据主表字段动态控制明细行数/`](根据主表字段动态控制明细行数/)

### 根据主表字段属性控制明细表是否允许新增
- **技术点**: Dialog、regOvProps、window.weappUi
- **文件** (1个): `entry.js`
- **路径**: [`根据主表字段属性控制明细表是否允许新增/`](根据主表字段属性控制明细表是否允许新增/)

### 根据主表字段控制明细列隐藏
- **技术点**: regOvProps
- **文件** (1个): `entry.js`
- **路径**: [`根据主表字段控制明细列隐藏/`](根据主表字段控制明细列隐藏/)

### 根据主表字段联动控制下拉选项可选值
- **技术点**: regOvProps
- **文件** (1个): `entry.js`
- **路径**: [`根据主表字段联动控制下拉选项可选值/`](根据主表字段联动控制下拉选项可选值/)

### 根据字段是否可编辑控制明细的添加
- **技术点**: Dialog、regOvProps、window.weappUi
- **文件** (1个): `entry.js`
- **路径**: [`根据字段是否可编辑控制明细的添加/`](根据字段是否可编辑控制明细的添加/)

### 监听表单字段值修改同步内容到其他字段
- **技术点**: regOvProps
- **文件** (1个): `entry.js`
- **路径**: [`监听表单字段值修改同步内容到其他字段/`](监听表单字段值修改同步内容到其他字段/)

### 监听表单的某个字段值变化实现自定义校验
- **技术点**: Dialog、regOvProps、window.weappUi
- **文件** (1个): `entry.js`
- **路径**: [`监听表单的某个字段值变化实现自定义校验/`](监听表单的某个字段值变化实现自定义校验/)

### 移动端表单字段扫码填充
- **技术点**: Dialog、React.Suspense、React.lazy、ReactDOM.render、asyncImport、regOvProps
- **文件** (3个): `index.js`、`entry.js`、`index.css`
- **路径**: [`移动端表单字段扫码填充/`](移动端表单字段扫码填充/)

### 签字意见增加工具栏显示隐藏控制
- **技术点**: React.Suspense、React.lazy、asyncImport、forwardRef、regOvComponent、regOvProps、window.weappUi
- **文件** (2个): `index.js`、`entry.js`
- **路径**: [`签字意见增加工具栏显示隐藏控制/`](签字意见增加工具栏显示隐藏控制/)

### 管理员自定义列增加同步所有人选项
- **技术点**: Dialog、regOvProps、window.weappUi
- **文件** (1个): `entry.js`
- **路径**: [`管理员自定义列增加同步所有人选项/`](管理员自定义列增加同步所有人选项/)

### 统计明细表行数关联主表字段
- **技术点**: regOvProps
- **文件** (1个): `entry.js`
- **路径**: [`统计明细表行数关联主表字段/`](统计明细表行数关联主表字段/)

### 表单意见
- **技术点**: React.Suspense、React.lazy、asyncImport、forwardRef、regOvComponent
- **文件** (2个): `NewWfCusSignLayoutOperateContent.js`、`entry.js`
- **路径**: [`表单意见/`](表单意见/)

### 表单意见折叠
- **技术点**: React.Suspense、React.lazy、asyncImport、forwardRef、regOvComponent、regOvProps
- **文件** (2个): `NewWfSignLayoutContent.js`、`entry.js`
- **路径**: [`表单意见折叠/`](表单意见折叠/)

### 表单日期字段根据另一个日期控制范围
- **技术点**: regOvProps
- **文件** (1个): `entry.js`
- **路径**: [`表单日期字段根据另一个日期控制范围/`](表单日期字段根据另一个日期控制范围/)

### 表单输入框集成讯飞语音输入
- **技术点**: Dialog、React.Suspense、React.lazy、ReactDOM.render、asyncImport、regOvProps
- **文件** (4个): `index.js`、`md5.js`、`entry.js`、`index.css`
- **路径**: [`表单输入框集成讯飞语音输入/`](表单输入框集成讯飞语音输入/)

### 表单输入框默认常亮显示边框
- **技术点**: regOvProps
- **文件** (2个): `entry.js`、`init.css`
- **路径**: [`表单输入框默认常亮显示边框/`](表单输入框默认常亮显示边框/)

### 评分组件替换
- **技术点**: React.Suspense、React.lazy、asyncImport、forwardRef、regOvComponent
- **文件** (3个): `index.js`、`entry.js`、`index.css`
- **路径**: [`评分组件替换/`](评分组件替换/)

### 部门浏览框隐藏常用组
- **技术点**: regOvProps
- **文件** (1个): `entry.js`
- **路径**: [`部门浏览框隐藏常用组/`](部门浏览框隐藏常用组/)

### 附件文件自定义校验
- **技术点**: Dialog、regOvProps、window.weappUi
- **文件** (1个): `entry.js`
- **路径**: [`附件文件自定义校验/`](附件文件自定义校验/)

### 隐藏H5底部菜单
- **技术点**: regOvProps
- **文件** (1个): `entry.js`
- **路径**: [`隐藏H5底部菜单/`](隐藏H5底部菜单/)

### 隐藏协作操作日志
- **技术点**: regOvProps
- **文件** (1个): `entry.js`
- **路径**: [`隐藏协作操作日志/`](隐藏协作操作日志/)


## 列表/搜索（22 个案例）

### EB台帐表格高级搜索默认展开
- **技术点**: regOvProps
- **文件** (1个): `entry.js`
- **路径**: [`EB台帐表格高级搜索默认展开/`](EB台帐表格高级搜索默认展开/)

### EB应用代办列表元素组件
- **技术点**: Dialog、React.Suspense、React.lazy、ReactDOM.render、asyncImport、axios、ebuilderSDK、forwardRef、regOvProps
- **文件** (3个): `com.js`、`entry.js`、`com.css`
- **路径**: [`EB应用代办列表元素组件/`](EB应用代办列表元素组件/)

### EB我的日程列表组件元素
- **技术点**: React.Suspense、React.lazy、ReactDOM.render、asyncImport、axios、ebuilderSDK、forwardRef、regOvProps
- **文件** (3个): `com.js`、`entry.js`、`com.css`
- **路径**: [`EB我的日程列表组件元素/`](EB我的日程列表组件元素/)

### EB自定义文档列表
- **技术点**: React.Suspense、React.lazy、ReactDOM.render、asyncImport、axios、ebuilderSDK、forwardRef、regOvProps
- **文件** (3个): `com.js`、`entry.js`、`com.css`
- **路径**: [`EB自定义文档列表/`](EB自定义文档列表/)

### 上传列表替换文件格式自定义图标显示
- **技术点**: regOvProps、window.weappUi
- **文件** (1个): `entry.js`
- **路径**: [`上传列表替换文件格式自定义图标显示/`](上传列表替换文件格式自定义图标显示/)

### 上传组件列表增加上传人员显示
- **技术点**: regOvProps、useState、window.weappUi
- **文件** (1个): `entry.js`
- **路径**: [`上传组件列表增加上传人员显示/`](上传组件列表增加上传人员显示/)

### 上传组件附件列表显示调整
- **技术点**: regOvProps
- **文件** (2个): `entry.js`、`index.css`
- **路径**: [`上传组件附件列表显示调整/`](上传组件附件列表显示调整/)

### 代办列表增加自定义数据列-0530
- **技术点**: React.lazy、asyncImport、regOvProps
- **文件** (1个): `entry.js`
- **路径**: [`代办列表增加自定义数据列-0530/`](代办列表增加自定义数据列-0530/)

### 会议查询列表增加二维码签到展示
- **技术点**: Dialog、React.Suspense、React.lazy、asyncImport、axios、regOvProps
- **文件** (3个): `index.js`、`entry.js`、`index.css`
- **路径**: [`会议查询列表增加二维码签到展示/`](会议查询列表增加二维码签到展示/)

### 会议查询列表增加大屏签到列
- **技术点**: regOvProps、window.weappUi
- **文件** (1个): `entry.js`
- **路径**: [`会议查询列表增加大屏签到列/`](会议查询列表增加大屏签到列/)

### 发文列表禁用批量发送
- **技术点**: regOvProps
- **文件** (1个): `entry.js`
- **路径**: [`发文列表禁用批量发送/`](发文列表禁用批量发送/)

### 对指定人员左侧菜单列表屏蔽设置以及回收站选项
- **技术点**: regOvProps
- **文件** (1个): `entry.js`
- **路径**: [`对指定人员左侧菜单列表屏蔽设置以及回收站选项/`](对指定人员左侧菜单列表屏蔽设置以及回收站选项/)

### 屏蔽上传组件的批量下载功能
- **技术点**: regOvProps
- **文件** (2个): `entry.js`、`init.css`
- **路径**: [`屏蔽上传组件的批量下载功能/`](屏蔽上传组件的批量下载功能/)

### 待办列表高级搜索默认展开
- **技术点**: regOvProps
- **文件** (1个): `entry.js`
- **路径**: [`待办列表高级搜索默认展开/`](待办列表高级搜索默认展开/)

### 批量提交显示列开发
- **技术点**: axios
- **文件** (1个): `entry.js`
- **路径**: [`批量提交显示列开发/`](批量提交显示列开发/)

### 拦截接口过滤系统应用
- **技术点**: axios
- **文件** (1个): `entry.js`
- **路径**: [`拦截接口过滤系统应用/`](拦截接口过滤系统应用/)

### 文档列表屏蔽高级搜索
- **技术点**: regOvProps
- **文件** (1个): `entry.js`
- **路径**: [`文档列表屏蔽高级搜索/`](文档列表屏蔽高级搜索/)

### 文档左侧树过滤文件夹树
- **技术点**: regOvProps
- **文件** (1个): `entry.js`
- **路径**: [`文档左侧树过滤文件夹树/`](文档左侧树过滤文件夹树/)

### 日期选择自定义日期过滤规则
- **技术点**: regOvProps
- **文件** (1个): `entry.js`
- **路径**: [`日期选择自定义日期过滤规则/`](日期选择自定义日期过滤规则/)

### 替换table-实现显示列定制
- **技术点**: React.Suspense、React.lazy、asyncImport、forwardRef、regOvComponent
- **文件** (3个): `index.js`、`entry.js`、`index.css`
- **路径**: [`替换table-实现显示列定制/`](替换table-实现显示列定制/)

### 替换高级搜索图标
- **技术点**: React.Suspense、forwardRef、regOvComponent
- **文件** (1个): `entry.js`
- **路径**: [`替换高级搜索图标/`](替换高级搜索图标/)

### 知识库高级搜索过滤指定条件
- **技术点**: regOvProps
- **文件** (1个): `entry.js`
- **路径**: [`知识库高级搜索过滤指定条件/`](知识库高级搜索过滤指定条件/)


## ESB/动作流（1 个案例）

### ESB动作流触发-HTTP
- **场景**: 在 ecode 前端或 JS 代码中通过 HTTP 接口触发自定义动作流。
- **技术点**: request(、triggerActionFlow
- **文件** (1个): `triggerEsb.js`
- **路径**: [`ESB动作流触发-HTTP/`](ESB动作流触发-HTTP/)


## 附件/上传（9 个案例）

### 上传文件拼接自定义认证参数
- **技术点**: regOvProps
- **文件** (1个): `entry.js`
- **路径**: [`上传文件拼接自定义认证参数/`](上传文件拼接自定义认证参数/)

### 上传组件携带附加参数
- **技术点**: regOvProps
- **文件** (1个): `entry.js`
- **路径**: [`上传组件携带附加参数/`](上传组件携带附加参数/)

### 上传组件限制重名文件上传
- **技术点**: Dialog、regOvProps、window.weappUi
- **文件** (1个): `entry.js`
- **路径**: [`上传组件限制重名文件上传/`](上传组件限制重名文件上传/)

### 后端创建自定义线程池提交任务
- **场景**: > 源码文件查看resources目录下附件
- **技术点**: -
- **文件** (1个): `entry.js`
- **路径**: [`后端创建自定义线程池提交任务/`](后端创建自定义线程池提交任务/)

### 富文组件内容正则替换重写禁用音视频下载
- **技术点**: regOvProps
- **文件** (1个): `entry.js`
- **路径**: [`富文组件内容正则替换重写禁用音视频下载/`](富文组件内容正则替换重写禁用音视频下载/)

### 附件上传限制上传个数
- **技术点**: Dialog、regOvProps、window.weappUi
- **文件** (1个): `entry.js`
- **路径**: [`附件上传限制上传个数/`](附件上传限制上传个数/)

### 附件组件预览无插件时默认下载
- **技术点**: regOvProps、window.weappUi
- **文件** (1个): `entry.js`
- **路径**: [`附件组件预览无插件时默认下载/`](附件组件预览无插件时默认下载/)

### 限制em中附件上传只允许拍照
- **技术点**: regOvProps
- **文件** (1个): `entry.js`
- **路径**: [`限制em中附件上传只允许拍照/`](限制em中附件上传只允许拍照/)

### 限制富文本框图片上传大小
- **技术点**: Dialog、regOvProps
- **文件** (1个): `entry.js`
- **路径**: [`限制富文本框图片上传大小/`](限制富文本框图片上传大小/)


## 移动端（5 个案例）

### 移动端图表折叠面板
- **技术点**: React.Suspense、React.lazy、asyncImport、regOvProps
- **文件** (4个): `page.js`、`index.js`、`entry.js`、`index.css`
- **路径**: [`移动端图表折叠面板/`](移动端图表折叠面板/)

### 移动端日历修改当天显示文字
- **技术点**: regOvProps
- **文件** (1个): `entry.js`
- **路径**: [`移动端日历修改当天显示文字/`](移动端日历修改当天显示文字/)

### 移动端消息提醒卡片样式调整
- **技术点**: -
- **文件** (2个): `entry.js`、`index.css`
- **路径**: [`移动端消息提醒卡片样式调整/`](移动端消息提醒卡片样式调整/)

### 移动端饼图卡片组件
- **技术点**: React.Suspense、React.lazy、asyncImport、regOvProps
- **文件** (4个): `page.js`、`index.js`、`entry.js`、`index.css`
- **路径**: [`移动端饼图卡片组件/`](移动端饼图卡片组件/)

### 页面跳转-移动端页面增加返回主页
- **技术点**: React.Suspense、React.lazy、ReactDOM.render、asyncImport
- **文件** (3个): `index.js`、`entry.js`、`index.css`
- **路径**: [`页面跳转-移动端页面增加返回主页/`](页面跳转-移动端页面增加返回主页/)


## 接口/拦截（8 个案例）

### 全文检索接口拦截
- **技术点**: axios
- **文件** (1个): `entry.js`
- **路径**: [`全文检索接口拦截/`](全文检索接口拦截/)

### 新建会议事件拦截
- **技术点**: Dialog、regOvProps
- **文件** (1个): `entry.js`
- **路径**: [`新建会议事件拦截/`](新建会议事件拦截/)

### 新页签打开拦截提示
- **技术点**: Dialog
- **文件** (1个): `entry.js`
- **路径**: [`新页签打开拦截提示/`](新页签打开拦截提示/)

### 退出登录前拦截钩子并清除缓存
- **技术点**: -
- **文件** (1个): `entry.js`
- **路径**: [`退出登录前拦截钩子并清除缓存/`](退出登录前拦截钩子并清除缓存/)

### 通用接口响应拦截
- **场景**: ``` /** * 定义响应拦截 * 可以给响应结果附加结果，也可以进行错误统一处理 */ axios.interceptors.response.use((response) => {
- **技术点**: axios
- **文件** (1个): `entry.js`
- **路径**: [`通用接口响应拦截/`](通用接口响应拦截/)

### 通用接口请求拦截
- **技术点**: axios
- **文件** (1个): `entry.js`
- **路径**: [`通用接口请求拦截/`](通用接口请求拦截/)

### 通过axios实现后端拦截接口
- **技术点**: axios
- **文件** (1个): `entry.js`
- **路径**: [`通过axios实现后端拦截接口/`](通过axios实现后端拦截接口/)

### 限制用户每天密码修改次数-接口
- **技术点**: -
- **文件** (0个): 
- **路径**: [`限制用户每天密码修改次数-接口/`](限制用户每天密码修改次数-接口/)


## UI/样式/布局（19 个案例）

### EB业务组件开发-门户考勤提醒组件
- **技术点**: Dialog、request(
- **文件** (14个): `AppraisalPage.js`、`MView.js`、`Design.js`、`WorkEffectProject.js`
- **路径**: [`EB业务组件开发-门户考勤提醒组件/`](EB业务组件开发-门户考勤提醒组件/)

### EB应用二维码内容插件组件
- **技术点**: Dialog、React.Suspense、React.lazy、ReactDOM.render、asyncImport、ebuilderSDK、forwardRef、regOvProps
- **文件** (3个): `com.js`、`entry.js`、`com.css`
- **路径**: [`EB应用二维码内容插件组件/`](EB应用二维码内容插件组件/)

### EB报表页面元素卡片样式调整
- **技术点**: -
- **文件** (2个): `entry.js`、`init.css`
- **路径**: [`EB报表页面元素卡片样式调整/`](EB报表页面元素卡片样式调整/)

### PC端登录页面改造
- **技术点**: -
- **文件** (2个): `entry.js`、`init.css`
- **路径**: [`PC端登录页面改造/`](PC端登录页面改造/)

### ecode二开支持多语言
- **场景**: 客户进行二次开发时，需要根据系统多语言设置进行自动切换，故此，在二次开发时，需要按照标准多语言开发标准， 进行多语言开发集成。
- **技术点**: React.Suspense、React.lazy、asyncImport、regOvProps
- **文件** (6个): `Page.js`、`entry.js`
- **路径**: [`ecode二开支持多语言/`](ecode二开支持多语言/)

### 中文下禁用多语言文件
- **技术点**: -
- **文件** (1个): `entry.js`
- **路径**: [`中文下禁用多语言文件/`](中文下禁用多语言文件/)

### 全局页面增加小球浮窗
- **技术点**: React.Suspense、React.lazy、ReactDOM.render、asyncImport
- **文件** (4个): `message.js`、`index.js`、`entry.js`、`index.css`
- **路径**: [`全局页面增加小球浮窗/`](全局页面增加小球浮窗/)

### 商务蓝
- **技术点**: request(
- **文件** (32个): `Invite.js`、`InviteWelfare.js`、`AsideCalendar.js`、`AppMoreIcon.js`
- **路径**: [`商务蓝/`](商务蓝/)

### 屏蔽人员卡片中登录信息的展示
- **技术点**: -
- **文件** (2个): `entry.js`、`init.css`
- **路径**: [`屏蔽人员卡片中登录信息的展示/`](屏蔽人员卡片中登录信息的展示/)

### 屏蔽评论中的人员卡片跳转
- **技术点**: -
- **文件** (2个): `entry.js`、`index.css`
- **路径**: [`屏蔽评论中的人员卡片跳转/`](屏蔽评论中的人员卡片跳转/)

### 登录页UI改造
- **技术点**: Dialog、React.Suspense、React.lazy、ReactDOM.render、asyncImport、axios、forwardRef
- **文件** (12个): `index.js`、`Base64.js`、`utils.js`、`api.js`
- **路径**: [`登录页UI改造/`](登录页UI改造/)

### 登录页面扫码图标替换
- **技术点**: regOvProps
- **文件** (1个): `entry.js`
- **路径**: [`登录页面扫码图标替换/`](登录页面扫码图标替换/)

### 福清妇幼保健院-打印开发
- **技术点**: ebuilderSDK、regOvProps
- **文件** (1个): `entry.js`
- **路径**: [`福清妇幼保健院-打印开发/`](福清妇幼保健院-打印开发/)

### 粽情四海
- **技术点**: request(
- **文件** (38个): `Invite.js`、`NavbarMenu.js`、`InviteWelfare.js`、`TopMenu.js`
- **路径**: [`粽情四海/`](粽情四海/)

### 退出系统增加自定义内容展示
- **技术点**: -
- **文件** (1个): `entry.js`
- **路径**: [`退出系统增加自定义内容展示/`](退出系统增加自定义内容展示/)

### 重写会议日历今天情况下背景色
- **技术点**: -
- **文件** (2个): `entry.js`、`index.css`
- **路径**: [`重写会议日历今天情况下背景色/`](重写会议日历今天情况下背景色/)

### 门户多语言开发
- **技术点**: React.Suspense、forwardRef、regOvComponent、request(
- **文件** (1个): `entry.js`
- **路径**: [`门户多语言开发/`](门户多语言开发/)

### 门户首页顶部导航栏添加系统时间
- **技术点**: React.Suspense、React.lazy、ReactDOM.render、asyncImport
- **文件** (3个): `index.js`、`entry.js`、`index.css`
- **路径**: [`门户首页顶部导航栏添加系统时间/`](门户首页顶部导航栏添加系统时间/)

### 首页增加自定义快捷应用菜单
- **技术点**: React.Suspense、React.lazy、ReactDOM.render、asyncImport
- **文件** (3个): `index.js`、`entry.js`、`index.css`
- **路径**: [`首页增加自定义快捷应用菜单/`](首页增加自定义快捷应用菜单/)


## 会议管理（10 个案例）

### 会议卡片默认全屏
- **技术点**: Dialog、regOvProps
- **文件** (1个): `entry.js`
- **路径**: [`会议卡片默认全屏/`](会议卡片默认全屏/)

### 会议室使用情况默认为周
- **技术点**: axios
- **文件** (1个): `entry.js`
- **路径**: [`会议室使用情况默认为周/`](会议室使用情况默认为周/)

### 会议开始时间限制为当前时间
- **技术点**: Dialog、axios
- **文件** (1个): `entry.js`
- **路径**: [`会议开始时间限制为当前时间/`](会议开始时间限制为当前时间/)

### 会议日历默认为周
- **技术点**: axios
- **文件** (1个): `entry.js`
- **路径**: [`会议日历默认为周/`](会议日历默认为周/)

### 会议签到大屏页面自定义重写
- **技术点**: Dialog、React.Suspense、React.lazy、asyncImport、axios、regOvProps
- **文件** (3个): `index.js`、`entry.js`、`index.css`
- **路径**: [`会议签到大屏页面自定义重写/`](会议签到大屏页面自定义重写/)

### 出勤模块默认选中出勤日历
- **技术点**: regOvProps
- **文件** (1个): `entry.js`
- **路径**: [`出勤模块默认选中出勤日历/`](出勤模块默认选中出勤日历/)

### 屏蔽查看会议的会议签到tab页
- **技术点**: regOvProps
- **文件** (1个): `entry.js`
- **路径**: [`屏蔽查看会议的会议签到tab页/`](屏蔽查看会议的会议签到tab页/)

### 新建会议默认开启开始前提醒（消息提醒）
- **技术点**: axios
- **文件** (1个): `entry.js`
- **路径**: [`新建会议默认开启开始前提醒（消息提醒）/`](新建会议默认开启开始前提醒（消息提醒）/)

### 移除新建会议中的自定义会议地点
- **技术点**: axios
- **文件** (1个): `entry.js`
- **路径**: [`移除新建会议中的自定义会议地点/`](移除新建会议中的自定义会议地点/)

### 重写会议签到大屏已签到功能
- **技术点**: React.Suspense、React.lazy、asyncImport、regOvComponent、regOvProps
- **文件** (3个): `NewButton.js`、`entry.js`、`index.css`
- **路径**: [`重写会议签到大屏已签到功能/`](重写会议签到大屏已签到功能/)


## 端到端方案（1 个案例）

### CusEB_i1761a
- **技术点**: Dialog、request(
- **文件** (26个): `MView.js`、`MobileList.js`、`BusinessListPagination.js`、`Design.js`
- **路径**: [`CusEB_i1761a/`](CusEB_i1761a/)


## 工具/方案（7 个案例）

### ReactFocusLock焦点锁定组件
- **技术点**: forwardRef
- **文件** (50个): `constants.js`、`FreeFocusInside.js`、`medium.js`、`tabUtils.js`
- **路径**: [`ReactFocusLock焦点锁定组件/`](ReactFocusLock焦点锁定组件/)

### whiteList
- **技术点**: -
- **文件** (1个): `entry.js`
- **路径**: [`whiteList/`](whiteList/)

### 二开二级域名及多级路径开发方案
- **技术点**: request(
- **文件** (1个): `entry.js`
- **路径**: [`二开二级域名及多级路径开发方案/`](二开二级域名及多级路径开发方案/)

### 定时静默保存
- **技术点**: forwardRef、regOvComponent
- **文件** (1个): `entry.js`
- **路径**: [`定时静默保存/`](定时静默保存/)

### 浏览器环境检测提示
- **技术点**: -
- **文件** (2个): `entry.js`、`init.css`
- **路径**: [`浏览器环境检测提示/`](浏览器环境检测提示/)

### 用户及租户信息获取说明
- **技术点**: -
- **文件** (1个): `entry.js`
- **路径**: [`用户及租户信息获取说明/`](用户及租户信息获取说明/)

### 限制用户每天密码修改次数
- **技术点**: Dialog、axios、window.weappUi
- **文件** (1个): `entry.js`
- **路径**: [`限制用户每天密码修改次数/`](限制用户每天密码修改次数/)


---
> 索引生成时间: 2026-05-26 20:37:15
