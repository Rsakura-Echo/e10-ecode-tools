# 07 - E10 UI 组件库参考

## 概述

E10 UI 组件库 (`@weapp/ui`) 提供 150+ 标准组件，分为 PC 端和移动端组件。

**重要：组件库仅支持在异步（非前置）文件中使用！**

## 组件库名称

```js
// @weapp/ui 库名为 'weappUi'
import { appInfo } from '@weapp/utils';
const { libraryName } = appInfo('@weapp/ui'); // 'weappUi'

// @weapp/ecodesdk 库名为 'weappEcodesdk'
const { libraryName } = appInfo('@weapp/ecodesdk'); // 'weappEcodesdk'
```

## PC端组件列表

常用 PC 端组件：
- `Button` - 按钮
- `Input` - 输入框
- `Select` - 选择器
- `Table` - 表格
- `Form` - 表单
- `Dialog` - 对话框
- `DatePicker` - 日期选择器
- `DateTimePicker` - 日期时间选择器
- `TimePicker` - 时间选择器
- `Calendar` - 日历
- `Upload` - 上传
- `Tree` - 树形组件
- `Menu` - 菜单
- `Tabs` (SlideTabs) - 标签页
- `Pagination` - 分页
- `Checkbox` - 复选框
- `Radio` - 单选框
- `Switch` - 开关
- `Badge` - 徽标
- `Tag` - 标签
- `Popover` - 气泡提示
- `Spin` - 加载中
- `Steps` - 步骤条
- `BreadCrumb` - 面包屑
- `Cascader` - 级联选择
- `Carousel` - 走马灯
- `Collapse` - 折叠面板
- `List` / `ListView` - 列表
- `Empty` - 空状态
- `Avatar` - 头像
- `Rate` - 评分
- `Slider` - 滑动输入条
- `Transfer` - 穿梭框
- `Timeline` - 时间轴
- `Echarts` - 图表
- `Map` - 地图
- `QRCode` - 二维码
- `RichText` - 富文本
- `CodeMirror` - 代码编辑器
- `Signature` - 签名
- `PhotoView` - 图片查看
- `ImageCropper` - 图片裁剪
- `ColorPicker` - 颜色选择器
- `MindMap` - 思维导图
- `Scroller` - 滚动区域
- `Board` - 看板
- `Comment` - 评论
- `SearchAdvanced` - 高级搜索
- `EditableTable` - 可编辑表格
- `LayoutBasic` / `LayoutGrid` / `LayoutAdapt` - 布局
- `Help` - 帮助
- `Intro` - 引导
- `RightMenu` - 右键菜单
- `BackTop` - 回到顶部
- `BoxSelection` - 框选
- `PullToRefresh` - 下拉刷新
- `ResourcePanel` - 资源面板
- `AppIcon` - 应用图标
- `Browser` - 浏览器
- `ShareBrowser` - 分享浏览器
- `Title` - 标题
- `Sticky` - 粘性布局
- `Watermark` - 水印
- `Alert` - 提示
- `AssociateList` - 关联列表
- `CityPicker` - 城市选择
- `CommonPhrase` - 常用语
- `DateMenu` / `DatePanel` - 日期菜单/面板
- `Digital` - 数字
- `Encry` - 加密
- `FloatButton` - 浮动按钮
- `Scope` - 权限范围
- `SelectGroup` - 选择组
- `PhotoEditor` - 图片编辑
- `Recording` - 录音
- `RepeatFrequency` - 重复频率
- `SecretSelect` - 密级选择
- `SensitiveWordScan` - 敏感词扫描
- `Skeleton` - 骨架屏
- `Share` - 分享
- `Sign` - 签到
- `VoiceToText` - 语音转文字
- `WorkStatus` - 工作状态
- `Zoom` - 缩放

## 移动端组件列表

移动端组件命名以 `Mb` 为前缀（如 `MbButton`, `MbInput`, `MbDialog` 等），涵盖与 PC 端类似的功能组件。

## 组件详细 API

> 以下为各组件的详细 API 参数、使用方式和代码示例。

### BreadCrumb 面包屑

显示当前页面在层级结构中的位置，支持自定义分隔符和图标。

#### API

**BreadCrumb**

| 参数 | 说明 | 类型 | 是否必填 | 默认值 |
|------|------|------|---------|--------|
| className | 样式类名 | `String` | 否 | - |
| data | 面包屑数据数组 | `Array<React.Node>` | 否 | - |
| separator | 分隔符 | `React.Node` | 否 | `/` |
| style | 内联样式 | `CSSProperties` | 否 | - |

**BreadCrumb.Item**

| 参数 | 说明 | 类型 | 是否必填 | 默认值 |
|------|------|------|---------|--------|
| children | 显示内容 | `React.Node` | 否 | - |
| className | 样式类名 | `String` | 否 | - |
| style | 内联样式 | `CSSProperties` | 否 | - |

**BreadCrumb.Separator**

| 参数 | 说明 | 类型 | 是否必填 | 默认值 |
|------|------|------|---------|--------|
| children | 显示的分隔符 | `React.Node` | 否 | - |
| className | 样式类名 | `String` | 否 | - |
| style | 内联样式 | `CSSProperties` | 否 | - |

#### 代码示例

**基础用法（Item 渲染）：**

```jsx
import { BreadCrumb } from '@weapp/ui';

<BreadCrumb>
  <BreadCrumb.Item>Home</BreadCrumb.Item>
  <BreadCrumb.Item>Child</BreadCrumb.Item>
  <BreadCrumb.Item>GrandChild</BreadCrumb.Item>
</BreadCrumb>
// 渲染结果: Home / Child / GrandChild
```

**data 方式渲染：**

```jsx
<BreadCrumb data={['Home', 'Child', 'GrandChild']} />
// 渲染结果: Home / Child / GrandChild
```

**自定义图标：**

```jsx
<BreadCrumb>
  <BreadCrumb.Item>
    <Icon name="home" /> Home
  </BreadCrumb.Item>
  <BreadCrumb.Item>Child</BreadCrumb.Item>
  <BreadCrumb.Item>GrandChild</BreadCrumb.Item>
</BreadCrumb>
```

**自定义分隔符：**

```jsx
// 统一分隔符
<BreadCrumb separator=">">
  <BreadCrumb.Item>Home</BreadCrumb.Item>
  <BreadCrumb.Item>Child</BreadCrumb.Item>
  <BreadCrumb.Item>GrandChild</BreadCrumb.Item>
</BreadCrumb>
// 渲染结果: Home > Child > GrandChild

// 单个分隔符自定义
<BreadCrumb>
  <BreadCrumb.Item>Home</BreadCrumb.Item>
  <BreadCrumb.Separator>→</BreadCrumb.Separator>
  <BreadCrumb.Item>Last</BreadCrumb.Item>
</BreadCrumb>
```

**结合路由使用：**

```jsx
import { BreadCrumb } from '@weapp/ui';
import { Link } from 'react-router-dom';

<BreadCrumb>
  <BreadCrumb.Item>
    <Link to="/home">Home</Link>
  </BreadCrumb.Item>
  <BreadCrumb.Item>
    <Link to="/child">Child</Link>
  </BreadCrumb.Item>
  <BreadCrumb.Item>GrandChild</BreadCrumb.Item>
</BreadCrumb>
```

### Button 按钮

按钮组件，支持多种类型、尺寸和钩子函数。

#### API

| 参数 | 说明 | 类型 | 是否必填 | 默认值 |
|------|------|------|---------|--------|
| disabled | 禁用 | `boolean` | 否 | `false` |
| inline | 是否整行按钮（宽度 100%） | `boolean` | 否 | `false` |
| onAfterClick | 点击事件方法执行后钩子 | `(this) => void` | 否 | - |
| onBeforeClick | 点击事件方法执行前钩子 | `(this) => void` | 否 | - |
| onClick | 点击事件 | `(e, this) => void` | 否 | - |
| radius | 设置圆角 | `boolean` | 否 | - |
| size | 按钮大小，可选 `large`、`small` | `string` | 否 | - |
| title | hover 时提示文字 | `string` | 否 | - |
| type | 按钮类型 | `primary` \| `ghost` \| `warning` | 否 | - |

#### 代码示例

**按钮类型：**

```jsx
import { Button } from '@weapp/ui';

<Button>次要按钮</Button>
<Button type="primary">主要按钮</Button>
<Button type="success">成功按钮</Button>
<Button type="warning">警告按钮</Button>
<Button type="danger">危险按钮</Button>
```

**调整尺寸：**

```jsx
<Button size="large">large</Button>
<Button>middle（默认）</Button>
<Button size="small">small</Button>
```

**禁用和圆角：**

```jsx
<Button disabled>禁用按钮</Button>
<Button radius>圆角按钮</Button>
```

**文字按钮：**

```jsx
<Button type="text">文字按钮</Button>
<Button type="text" disabled>文字按钮禁用</Button>
```

**按钮钩子（onBeforeClick 可中断点击）：**

```jsx
<Button
  onBeforeClick={(e) => {
    // return false 可中断后续 onClick
  }}
  onClick={(e, btnInstance) => {
    console.log('按钮被点击');
  }}
  onAfterClick={(btnInstance) => {
    console.log('点击处理完成');
  }}
>
  带钩子的按钮
</Button>
```

### Dialog 弹层

对话框/抽屉组件，支持模态框、确认框、消息提示、抽屉等多种形态。

#### API

| 参数 | 说明 | 类型 | 是否必填 | 默认值 |
|------|------|------|---------|--------|
| visible | 显示受控 | `boolean` | 否 | - |
| path | 通过路由打开 | `string` | 否 | - |
| placement | 弹出方向 | `middle` \| `top` \| `right` \| `bottom` \| `left` | 否 | `middle` |
| width | 宽度（middle 模式下 < 380 不生效） | `number` \| `string` | 否 | - |
| height | 高度（left/right 模式不可改） | `number` \| `string` | 否 | - |
| noTitle | 隐藏弹框顶部内容 | `boolean` | 否 | - |
| title | 标题（支持 Title 组件所有参数） | `ReactNode` | 否 | - |
| closable | 是否显示右上角关闭按钮 | `boolean` | 否 | - |
| closeIcon | 自定义关闭按钮 | `ReactNode` | 否 | - |
| mask | 是否展示遮罩 | `boolean` | 否 | - |
| maskClosable | 点击蒙层是否允许关闭 | `boolean` | 否 | - |
| noMaskClose | 无蒙层时外部触发弹窗关闭（非 middle） | `boolean` | 否 | - |
| draggable | 是否开启拖拽 | `boolean` | 否 | `true` |
| resize | 是否支持拖拽调整宽度 | `boolean` | 否 | - |
| scale | 是否支持最大化 | `boolean` | 否 | - |
| innerScale | 是否全屏（优先级高于 defaultInnerScale） | `boolean` | 否 | - |
| defaultInnerScale | 默认全屏 | `boolean` | 否 | - |
| destroyOnClose | 关闭时销毁子元素 | `boolean` | 否 | - |
| forceRender | 预渲染弹框内部内容 | `boolean` | 否 | - |
| onClose | 关闭回调 | `() => void` | 否 | - |
| onAfterClose | 关闭后回调（带动画） | `() => void` | 否 | - |
| footer | 底部按钮组 | `ReactNode` | 否 | - |
| buttons | 顶部按钮组 | `ReactNode` | 否 | - |
| message | 消息层内容 | `string` \| `ReactNode` | 否 | - |
| top / bottom / left / right | 距各边距离 | `number` \| `string` | 否 | - |
| zIndex | 层级 | `number` | 否 | - |
| dialogId | 弹框唯一标记 | `string` | 否 | - |
| keepDialogAlive | 业签模式本地化存储宽度（需 dialogId 唯一） | `boolean` | 否 | `true` |
| windowOpenUrl | 新窗口打开地址 | `string` | 否 | - |
| resetDragPosition | 容器宽高变化后重置拖拽位置 | `boolean` | 否 | - |
| ignoreCalculationContainer | 忽略内部宽高最大最小值限定 | `boolean` | 否 | `false` |
| enableEventEmitter | 启用事件监听方案 | `boolean` | 否 | `true` |
| closeAnimation | 关闭动画 | `boolean` | 否 | `false` |
| bodyStyle | 内容部分样式 | `CSSProperties` | 否 | - |
| headerStyle | 标题区样式 | `CSSProperties` | 否 | - |
| maskStyle | 遮罩层样式 | `CSSProperties` | 否 | - |
| wrapClassName | 外层容器 class | `string` | 否 | - |
| wrapStyle | 外层容器样式 | `CSSProperties` | 否 | - |
| getContainer | 弹层容器定位 | `(element?: HTMLElement) => HTMLElement` | 否 | - |
| isEnlargeFullScreen | 全屏模式下弹框占可视区域比例 | `boolean` | 否 | `false` |
| isStopPropagation | 禁止阻止冒泡 | `boolean` | 否 | `true` |
| maxResizeHeight / maxResizeWidth | 可调整的最大高度/宽度 | `string` \| `number` | 否 | - |
| minResizeHeight / minResizeWidth | 可调整的最小高度/宽度 | `string` \| `number` | 否 | - |

**快捷方法：**

| 方法 | 说明 |
|------|------|
| `Dialog.confirm(options)` | 确认对话框 |
| `Dialog.message(options)` | 消息提示（info/success/error） |
| `Dialog.createDialog(options)` | 创建弹框实例，返回 `{ destroy }` |

#### 代码示例

**基础用法：**

```jsx
import { Dialog, Button } from '@weapp/ui';

<Dialog visible={visible} onClose={() => setVisible(false)}>
  <p>弹框内容</p>
</Dialog>
```

**确认对话框：**

```jsx
Dialog.confirm({
  title: '确认删除',
  content: '确定要删除这条记录吗？',
  okText: '确定',
  cancelText: '取消',
  okType: 'danger',
  onOk: () => { /* 执行删除 */ },
  onCancel: () => { /* 取消操作 */ },
});
```

**消息提示：**

```jsx
Dialog.message({ content: '操作成功', type: 'success' });
Dialog.message({ content: '操作失败', type: 'error' });
Dialog.message({ content: '提示信息', type: 'info' });
Dialog.message({ content: '不自动消失', delay: 0, destroy: () => {} });
```

**抽屉（Drawer）：**

```jsx
<Dialog visible={visible} placement="right" width={600} onClose={handleClose}>
  <div>抽屉内容</div>
</Dialog>

{/* 自定义位置 */}
<Dialog visible={visible} placement="left">左侧抽屉</Dialog>
<Dialog visible={visible} placement="top">顶部抽屉</Dialog>
<Dialog visible={visible} placement="bottom">底部抽屉</Dialog>
```

**自定义页头页脚：**

```jsx
<Dialog
  visible={visible}
  title="自定义标题"
  footer={<Button type="primary">自定义按钮</Button>}
>
  <div>自定义内容</div>
</Dialog>
```

**弹框大小复写：**

```jsx
{/* 忽略内部宽高限制 */}
<Dialog visible={visible} ignoreCalculationContainer width={300}>
  自定义小弹框
</Dialog>
```

**事件监听：**

```jsx
// 方式1：原生事件
document.addEventListener('customDialogEventName', () => {});

// 方式2：eventEmitter（推荐，需设置 enableEventEmitter=true）
import { eventEmitter } from '@weapp/utils';
eventEmitter.addListener('weappUi', Dialog.EVENT_VISIBLE_CHANGE, onVisibleChange);
eventEmitter.removeListener('weappUi', Dialog.EVENT_VISIBLE_CHANGE, onVisibleChange);
```

**编程式创建弹框：**

```jsx
const { destroy } = Dialog.createDialog({
  title: 'Create Dialog',
  content: <div>弹框内容</div>,
});
// 调用 destroy() 销毁弹框
```

**带格式内容弹框（window.weaJs.showDialog）：**

```jsx
// 带 HTML 格式内容
window.weaJs.showDialog('', {
  isIframe: false,
  content: '<div>文本一<br/>文本二</div>',
  style: { width: 500, height: 500 }
});

// iframe 方式
window.weaJs.showDialog('http://www.example.com', {});
```

#### 注意事项

1. `noMaskClose` 与 `maskClosable` 不可同时使用
2. 当 `placement` 为 `middle` 且未设置 `top` 时，弹窗水平垂直居中。默认宽度 70%，最大 90%，最小 380px。高度由内容撑起，最大 90%，最小 200px
3. 弹窗内部内容高度过高需要自行设置高度；异步数据建议等数据返回后再打开弹框或设固定高度避免抖动
4. `confirm` 在不设置 `top/right/bottom/left` 时默认水平垂直居中

### Input 输入框

输入框组件，支持子组件：`Input.InputNumber`（数字框）、`Input.TextArea`（多行文本）、`Input.Password`（密码框）、`Input.InputAt`（@选人）。

#### API

| 参数 | 说明 | 类型 | 是否必填 | 默认值 |
|------|------|------|---------|--------|
| value | 值 | `string` \| `number` | 否 | - |
| defaultValue | 默认值 | `string` \| `number` | 否 | - |
| type | Input 类型 | `text` \| `number` \| `password` \| `search` \| `email` \| `tel` 等 | 否 | `text` |
| disabled | 禁用 | `boolean` | 否 | `false` |
| readOnly | 只读（内容渲染为 span 标签） | `boolean` | 否 | - |
| inputReadOnly | 只读（input 标签渲染，与 readOnly 差异在于仍渲染 input） | `boolean` | 否 | - |
| allowClear | 可清空 | `boolean` | 否 | - |
| placeholder | 占位文本 | `string` | 否 | - |
| maxLength | 字符串长度限制 | `number` | 否 | - |
| stringLength | 长度限制（中文按 3 字符计算） | `number` | 否 | - |
| showCount | 显示最大长度计数 | `boolean` | 否 | - |
| autoTrim | 失去焦点时去除前后空格 | `boolean` | 否 | `false` |
| adaptiveInputHeight | 输入框高度自适应 | `boolean` | 是 | - |
| selectedWrap | 已选数据折行显示 | `boolean` | 否 | - |
| prefix / suffix | 前/后缀图标 | `ReactNode` | 否 | - |
| prepend / append | 输入框前/后缀内容 | `ReactNode` | 否 | - |
| onChange | 值变化回调 | `(value, e) => void` | 否 | - |
| onBlur / onFocus | 失焦/聚焦回调 | `(value, e) => void` | 否 | - |
| onPressEnter | 回车回调 | `(value, e) => void` | 否 | - |
| cleave | 开启 cleave 格式化模式 | `boolean` | 否 | `false` |
| cleaveOptions | cleave 格式化配置（参考 cleave.js 文档） | `any` | 否 | `{}` |
| cleaveKey | cleave 受控唯一 key | `string` | 否 | - |
| readonlyTransLink | 只读模式下解析链接 | `boolean` | 否 | `false` |
| readOnlyShowPlaceholder | 只读无数据时展示 placeholder | `boolean` | 否 | `false` |

#### 子组件 API

**Input.TextArea**（继承 InputProps）

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| autoHeight | 自适应高度 | `boolean` | `false` |
| maxRows / minRows | 最大/最小行数 | `number` | - |
| resizable | 是否可缩放 | `boolean` | `true` |
| showCount | 显示字数计数 | `boolean` | - |

**Input.InputNumber**（继承 InputProps）

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| min / max | 最小/最大值 | `number` | JS 安全整数边界 |
| hideOps | 隐藏加减按钮 | `boolean` | `true` |
| align | 按钮对齐方式 | `left` \| `right` \| `normal` | - |
| hasSeparator | 千分位分隔符 | `boolean` | - |
| precision | 精度 | `number` | - |
| step | 递增递减步数 | `number` | - |

#### 代码示例

**基础用法：**

```jsx
import { Input } from '@weapp/ui';

<Input placeholder="请输入内容" />
<Input value={val} onChange={(v) => setVal(v)} />  // 受控
<Input readOnly value="只读内容" />
<Input disabled value="禁用" />
<Input allowClear />
<Input autoTrim />  // 失焦自动去前后空格
```

**带前缀/后缀：**

```jsx
<Input prefix={<Icon name="search" />} placeholder="搜索..." />
<Input prepend="https://" append=".com.cn" />
```

**格式化输入（cleave）：**

```jsx
// cleave 模式下 input 为不受控组件，value 仅作初始默认值
<Input cleave cleaveOptions={{ date: true, datePattern: ['Y', 'm', 'd'] }} />
```

**数字框：**

```jsx
<Input.InputNumber min={0} max={100} step={0.1} hideOps={false} />
<Input.InputNumber hasSeparator precision={2} />  // 千分位 + 精度
```

**多行文本：**

```jsx
<Input.TextArea autoHeight maxLength={500} showCount />
```

**密码框：**

```jsx
<Input.Password />
```

**只读模式解析超链接：**

```jsx
<Input readOnly readonlyTransLink value="https://weapp.eteams.cn/" />
```

### Select 下拉框

下拉选择组件，支持单选、多选、标签样式、分组、搜索、全选、单多选混合模式。

#### API

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| value / defaultValue | 受控值 / 默认值 | `string[]` \| `SelectOptionsType` | - |
| data | 下拉选项数据 | `SelectOptionsType` | - |
| disabled / readOnly | 禁用 / 只读 | `boolean` | `false` |
| multiple | 多选 | `boolean` | `false` |
| optionType | 设为 `tag` 时显示标签样式 | `string` | - |
| vertical | 竖向排列 | `boolean` | - |
| allowClear | 可清除 | `boolean` | `false` |
| allowSelectAll | 多选时允许全选 | `boolean` | `false` |
| showSearch | 可搜索 | `boolean` | `false` |
| showArrow | 显示右侧箭头图标 | `boolean` | `false` |
| defaultOpen / open | 默认展开 / 受控展开 | `boolean` | `false` |
| showDataGroupByType | 开启分组功能 | `boolean` | `false` |
| singleAndMultiple | 单多选混合模式（options 中设 `single: true` 为单选） | `boolean` | `false` |
| dropdownClassName / dropdownStyle | 下拉框 class / 样式 | `string` \| `CSSProperties` | - |
| dropdownMatchSelectWidth | 下拉框宽度（boolean 同宽，number 自定义） | `boolean` \| `number` | - |
| filterOption | 自定义筛选函数 | `(inputValue, option) => boolean` | - |
| focusAutoExpand | 聚焦后自动放大（文本溢出场景） | `boolean` | - |
| selectedWrap | 已选数据允许折行 | `boolean` | - |
| onChange | 值变化回调 | `(value, options, option, event) => void` | - |
| onSelect / onDeselect | 选择/取消选择回调 | `(value, option) => void` | - |
| onSearch | 搜索回调 | `(value) => void` | - |
| onVisibleChange | 下拉框显隐回调 | `(visible) => void` | - |
| customInputRender | 自定义输入框渲染 | `(select, selectedData) => ReactNode` | - |
| customOptionRender | 自定义选项渲染 | `(option) => ReactNode` | - |
| dropdownRender | 自定义下拉框 | `(menu) => ReactElement` | - |
| tagRender | 自定义标签渲染 | `(props) => ReactNode` | - |

#### 代码示例

**基础用法：**

```jsx
import { Select } from '@weapp/ui';

<Select
  placeholder="请选择"
  data={[
    { content: '选项一', value: '1' },
    { content: '选项二', value: '2' },
    { content: '选项三', value: '3' },
  ]}
/>
```

**多选 + 全选：**

```jsx
<Select multiple allowSelectAll data={options} />
```

**标签样式：**

```jsx
<Select optionType="tag" data={options} />
```

**可搜索下拉框：**

```jsx
<Select showSearch data={options} />
// 自定义搜索规则
<Select showSearch filterOption={(val, opt) => opt.content.includes(val)} />
```

**分组：**

```jsx
<Select showDataGroupByType data={[
  { content: '分组A', data: [{ content: 'A1', value: 'a1' }] },
  { content: '分组B', data: [{ content: 'B1', value: 'b1' }] },
]} />
```

**选项额外内容：**

```jsx
const options = [{
  content: '选项',
  value: '1',
  prefixContent: <Icon name="star" />,
  extraContent: '额外文本内容',
}];
```

**自定义渲染：**

```jsx
<Select
  customOptionRender={(opt) => <div style={{color:'red'}}>{opt.content}</div>}
  customInputRender={(select, selectedData) =>
    <span>已选: {selectedData?.[0]?.content || '请选择'}</span>
  }
/>
```

**单多选混合模式：**

```jsx
<Select multiple singleAndMultiple data={[
  { content: '多选一', value: '1' },
  { content: '多选二', value: '2' },
  { content: '单选', value: '3', single: true },
]} />
```

### Form 表单

表单组件，支持字段联动、校验、分组、折叠面板、插件机制、只读/禁用模式等。

> **重要**：Form 是 ecode 二开中最常用的组件之一，用于构建数据录入页面。

#### API

| 参数 | 说明 | 类型 | 是否必填 | 默认值 |
|------|------|------|---------|--------|
| store | 表单实例（FormStore） | `FormStore` | 是 | - |
| type | 模板样式 | `'normal'` \| `'line'` | 否 | - |
| colSpan | 布局，2为两列布局 | `number` | 否 | - |
| noLine | 无边框模式 | `boolean` | 否 | - |
| isMobile | 是否为移动端 Form | `boolean` | 否 | 内部判断 |
| useCollapse | 启用折叠面板 | `boolean` | 否 | - |
| collapseProps | 折叠面板参数设置 | `ICollapseProps` | 否 | - |
| fixedLabelWidth | 字段标签固定宽度模式 | `boolean` | 否 | 默认100px |
| wrapPos | 右侧字段位置 | `'left'`\|`'center'`\|`'right'` | 否 | - |
| disabledWidthLimit | 禁用宽度限制 | `boolean` | 否 | - |
| enableHighLight | 启用高亮匹配(配合敏感词) | `boolean` | 否 | - |
| newValidateTipType | 新版校验提示效果 | `boolean` | 否 | `false` |
| openDefaultTip | 重新挂载后是否显示必填提示 | `boolean` | 否 | `true` |
| onChange | 字段值改变事件 | `(value, otherParams) => void` | 否 | - |
| onBlur | 字段失去焦点事件 | `(value, otherParams) => void` | 否 | - |
| onFocus | 字段获取焦点事件 | `(value, otherParams) => void` | 否 | - |
| onBeforeChange | 字段值改变之前的事件 | `(value, preValue, otherParams) => void \| Promise` | 否 | - |
| customHide | 字段联动事件 | `(col) => FormLayoutProps` | 否 | - |
| customRenderFormItem | 字段布局自定义设置 | `(id, props, com) => ReactNode` | 否 | - |
| customRenderFormSwitch | 自定义组件(itemType=CUSTOM) | `(id, props) => ReactNode` | 否 | - |
| customRenderLabel | 自定义字段标签 | `(id, label) => ReactNode` | 否 | - |

#### 代码示例

**基础用法：**

```jsx
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import { Component, ReactNode } from 'react';
import {
  FormRenderProps, constants, Button, FormItemProps, Form, FormDatas, FormHelpTipPostion,
  FormLayoutProps, BaseProps, Icon, Dialog, FormSwitchProps, utils, TypesBrowserOption, FormItemRenderProps, TypesBrowserData, CascaderOptionType, ShareBrowserOption, ShareBrowserValueType
} from '@weapp/ui';
import FormDemoStore from './store';
import uploadData from './uploadData_mock';
const { needSync } = utils;

const { uiPcClsPrefix } = constants;
const prefixCls = `${uiPcClsPrefix}-demo-form`;
interface FormRenderState {
  data: FormDatas,
}
interface FormRenderDemoProps extends FormRenderProps {
  data: FormDatas,
}
interface CustomRenderItemProps extends BaseProps {
  id?: string,
  props?: FormSwitchProps,
}

const customBrowserTypes: TypesBrowserOption[] = [
  { id: "user", content: "人员" },
  { id: "dept", content: "部门" },
  { id: "subCom", content: "分部" },
  { id: "all", content: "所有人" },
  { id: "other", content: "其他人", addData: { id: '1', name: '其他人', icon: 'Icon-personnel' } },
];

const customShareBrowserTypes: ShareBrowserOption[] = [
  { id: "user", content: "人员" },
  { id: "dept", content: "部门" },
  { id: "subcompany", content: "分部" },
  { id: "group", content: "群组" },
  { id: "role", content: "角色" },
  { id: "position", content: "岗位" },
  { id: "external", content: "外部联系人" },
  { id: "all", content: "所有人" },
  { id: "allExternal", content: "所有外部人", addData: { id: '1', name: '所有外部人', icon: 'Icon-personnel' } },
  // { id: "other", content: "其他人", addData: { id: '1', name: '其他人', icon: 'Icon-personnel' } },
];

const defaultValue: ShareBrowserValueType = [
  {
    // 浏览按钮选择的数据
    id: '1',
    content: '张三',
    obj_id: {
      id: '1',
      content: '张三',
      icon: 'Icon-personnel',
    },
    obj_id_span: '张三',
    icon: 'Icon-personnel',
    // 下拉框选择数据的id和content
    shareKey: 'resource_1',
    objType: "resource",
    objTypeSpan: "人员",
    _entityType: "user"
  },
  {
    // 浏览按钮选择的数据
    id: '19',
    content: '财务部',
    icon: 'Icon-department',
    obj_id: {
      id: '19',
      content: '财务部',
      icon: 'Icon-department',
    },
    obj_id_span: '财务部',
    // 下拉框选择数据的id和content
    shareKey: 'department_19',
    objType: "department",
    objTypeSpan: "部门",
    // 含下级
    has_sub: false,
    // 安全级别
    level: { min: 10, max: 100 },
    _entityType: "dept"
  },
  {
    // 浏览按钮选择的数据
    id: '3',
    content: '维森集团',
    icon: 'Icon-department',
    obj_id: {
      id: '3',
      content: '维森集团',
      icon: 'Icon-department',
    },
    obj_id_span: '维森集团',
    // 下拉框选择数据的id和content
    shareKey: 'department_3',
    objType: "department",
    objTypeSpan: "分部",
    // 含下级
    has_sub: false,
    // 安全级别
    level: { min: 10, max: 100 },
    _entityType: "subcompany"
  },
  {
    //
    id: '5',
    content: '需求组',
    icon: 'Icon-Group-portrait-o',
    obj_id: {
      id: '5',
      content: '需求组',
      icon: 'Icon-Group-portrait-o',
    },
    obj_id_span: '需求组',
    // 下拉框选择数据的id和content
    shareKey: 'group_5',
    objType: 'group',
    objTypeSpan: '群组',
    _entityType: "group"
  },
  {
    // 浏览按钮选择的数据
    id: '1',
    content: '公司管理员',
    icon: 'Icon-personnel',
    obj_id: {
      id: '1',
      content: '公司管理员',
      icon: 'Icon-personnel',
    },
    obj_id_span: '公司管理员',
    // 下拉框选择数据的id和content
    shareKey: 'role_1',
    objType: "role",
    objTypeSpan: "角色",
    // 安全级别
    level: { min: 10, max: 100 },
    // 角色级别
    role_level: "1",
    role_level_span: "总部",
    _entityType: "user"
  },
  {
    // 浏览按钮选择的数据
    id: '8',
    content: '财务总监',
    icon: 'Icon-personnel',
    obj_id: {
      id: '8',
      content: '财务总监',
      icon: 'Icon-personnel',
    },
    obj_id_span: '财务总监',
    // 下拉框选择数据的id和content
    shareKey: 'position_8',
    objType: "position",
    objTypeSpan: "岗位",
    // 指定总部
    position_level: "1",
    position_level_span: "总部",
    _entityType: "position"
  },
  {
    // 浏览按钮选择的数据
    id: '3',
    content: '前端开发工程师',
    icon: 'Icon-personnel',
    obj_id: {
      id: '3',
      content: '前端开发工程师',
      icon: 'Icon-personnel',
    },
    obj_id_span: '前端开发工程师',
    // 下拉框选择数据的id和content
    shareKey: 'position_3',
    objType: "position",
    objTypeSpan: "岗位",
    // 指定分部
    position_level: "1",
    position_level_span: "指定分部",
    // _jobFieldData: [{ id: '3', content: '维森集团' }]
    _entityType: "position"
  },
  {
    // 浏览按钮选择的数据
    id: '27',
    content: '高级客户经理',
    icon: 'Icon-personnel',
    obj_id: {
      id: '27',
      content: '高级客户经理',
      icon: 'Icon-personnel',

    },
    obj_id_span: '高级客户经理',
    // 下拉框选择数据的id和content
    shareKey: 'position_27',
    objType: "position",
    objTypeSpan: "岗位",
    // 指定部门
    position_level: "2",
    position_level_span: "指定部门",
    _entityType: "position"
    // _jobFieldData: [{ id: '4', content: '客户部' }],
  },
  {
    id: '0',
    content: '所有人',
    icon: "Icon-all02",
    obj_id: {
      id: '0',
      content: '所有人',
      icon: "Icon-all02",
    },
    obj_id_span: '所有人',
    // 下拉框选择数据的id和content
    shareKey: 'all_0',
    objType: "all",
    objTypeSpan: "所有人",
    // 安全级别
    level: { min: 10, max: 100 },
    _entityType: "all"
  },
];

// 自定义传入的浏览按钮属性
const customBrowserProps: TypesBrowserData = {
  "user": {
    dataParams: {
      test: 'resource'
    },
  },
  "dept": {
    dataParams: {
      test: 'department'
    }
  },
};

const cascaderOptions: CascaderOptionType[] = [
  {
    value: 'hubei',
    label: '湖北',
    children: [
      {
        value: 'wuhan',
        label: '武汉',
        children: [
          {
            value: 'guanggu',
            label: '光谷',
          },
        ],
      },
      {
        value: 'yichang',
        label: '宜昌',
        children: [
          {
            value: 'sanxia',
            label: '三峡',
          },
        ],
      },
    ],
  },
  {
    value: 'shanghai',
    label: '上海',
    children: [
      {
        value: 'minhang',
        label: '闵行',
        children: [
          {
            value: 'fanwei',
            label: '泛微',
          },
        ],
      },
    ],
  },
  {
    value: 'zhejiang',
    label: '浙江',
    children: [
      {

        value: 'hangzhou',
        label: '杭州',
        children: [
          {
            value: 'xihu',
            label: '西湖',
          },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: '江苏',
    children: [
      {
        value: 'nanjing',
        label: '南京',
        children: [
          {
            value: 'zhonghuamen',
            label: '中华门',
          },
        ],
      },
    ],
  },
  {
    value: 'hunan',
    label: '湖南',
    children: [
      {
        value: 'changsha',
        label: '长沙',
        children: [
          {
            value: 'xiaolongxia',
            label: '小龙虾',
          },
        ],
      },
    ],
  },
  {
    value: 'xizang',
    label: '西藏',
    children: [
      {
        value: 'lasa',
        label: '拉萨',
        children: [
          {
            value: 'budalagong',
            label: '布达拉宫',
          },
        ],
      },
    ],
  },
  {
    value: 'beijing',
    label: '北京',
    children: [
      {
        value: 'tiananmen',
        label: '天安门',
      },
    ],
  },
]

const formDemoStore = new FormDemoStore();
@observer
class CustomRenderItem extends Component<CustomRenderItemProps> {
  onClick = () => {
    const { id } = this.props; // 当前字段唯一标识
    const { values, setValues } = formDemoStore;
    let value = id ? values[id] || 0 : 0;
    if (typeof value === 'number') {
      value++;
      setValues({ ...values, [`${id}`]: value });
    }
  }
  onShowDialog = () => {
    const { id } = this.props; // 当前字段唯一标识
    formDemoStore.setVisible(true, id);
  }
  onClose = () => {
    const { id } = this.props; // 当前字段唯一标识
    const { setVisible } = formDemoStore;
    setVisible(false, id);
  }
  render() {
    const { id } = this.props; // 当前字段唯一标识
    if (!id) return;
    const { visible, values } = formDemoStore;
    const value = id ? values[id] || 0 : 0;
    return (
      <div className={`${prefixCls}-custom`}>
        <Dialog
         
          title="设置"
          onClose={this.onClose}
          visible={visible[id]}
          closable
          destroyOnClose
          mask
          maskClosable
        >
          {value}
          <Button type="primary" onClick={this.onClick}>Add</Button>
        </Dialog>
        <Icon name={'Icon-set-up-o'} onClick={this.onShowDialog} size="sm" />
        {value > 0 && (<Icon name={'Icon-correct01'} size="sm" />)}
      </div>
    )
  }
}
const customRender = (allProps: CustomRenderItemProps) => {
  return (<CustomRenderItem {...allProps.props} />)
}
const items: FormItemProps = {
  'input': {
    itemType: "INPUT",
    // disabled: true,
    // required: true,
    rules: 'required|stringLength:5',
    otherParams: {
      // autoFocus: true,
      // maxLength: 10,
      className: 'test',
    },
  },
  'inputProp': {
    itemType: "SELECT",
    data: [
      { id: 'contain', content: '包含' },
      { id: 'ncontain', content: '不包含' },
    ],
  },
  'select': {
    itemType: "SELECT",
    data: [
      { id: 'op1', content: '选项一' },
      { id: 'op2', content: '选项二' },
    ],
  },
  'text': {
    itemType: 'TEXTAREA',
    rules: 'required',
  },
  'inputnumber': {
    itemType: 'INPUTNUMBER',
    passport: true,
  },
  'radio': {
    itemType: "RADIO",
    fieldName: "苹果",
    data: [
      { id: 'op3', content: '单选' }
    ],
  },
  'checkbox': {
    itemType: 'CHECKBOX',
    fieldName: "苹果",
    data: [
      { id: 'op1', content: '苹果' },
      { id: 'op2', content: '香蕉' },
      { id: 'op3', content: '橘子' }
    ],
  },
  'rate': {
    itemType: 'RATE',
    customShowError:true,
  },
  'timepicker': {
    itemType: 'TIMEPICKER',
  },
  'datepicker': {
    required: true,
    itemType: 'DATEPICKER',
  },
  'dayspicker': {
    required: true,
    itemType: 'DATEPICKER',
    type: 'days'
  },
  'monthspicker': {
    required: true,
    itemType: 'DATEPICKER',
    type: 'months'
  },
  'datetimepicker': {
    required: true,
    itemType: 'DATETIMEPICKER',
  },
  'datetimepicker2': {
    required: true,
    itemType: 'DATETIMEPICKER',
    isRange: true
  },
  'datequickfilter': {
    itemType: 'DATEQUICKFILTER',
  },
  'switch': {
    itemType: 'SWITCH',
    value: true,
  },
  'scope': {
    itemType: 'SCOPE',
    rules: 'required|scopeRequired',
    otherParams: {
      attributeNames: '区间',
    },
  },
  'browser': {
    itemType: 'BROWSER',
    browserBean: { // BROWSER 对应 browserBean
      type: 'demo',
      autoFocus: true,
      module: 'common',
    },
    otherParams: {
      autoFocus: true,
    }
  },
  'typesBrowser': {
    itemType: 'TYPESBROWSER',
    typesBrowserBean: { // TYPESBROWSER 对应 typesBrowserBean
      type: 'demo',
      module: 'common',
      autoFocus: true,
      options: customBrowserTypes,
      browsers: customBrowserProps,
    },
    otherParams: {
      autoFocus: true,
    }
  },
  'search': {
    itemType: 'INPUT',
  },
  'colorpicker': {
    itemType: 'COLORPICKER',
    otherParams: {
      onBeforeChange: (val: any) => {
        return ''
        // return '#ffffff'
      }
    }
  },
  'custom': {
    itemType: 'CUSTOM', // CUSTOM为自定义的内容，数据及内部布局不在form内部处理
  },
  'customOther': {
    itemType: 'CUSTOM', // CUSTOM为自定义的内容，数据及内部布局不在form内部处理
  },
  'upload': {
    itemType: 'UPLOAD',
    readOnly: true,
    otherParams: {
      uploadUrl: "/file/upload",
      uploadParams: {
        module: 'document'
      },
      sortable: true,
    }
  },
  'inputRequired': {
    itemType: 'INPUT',
    required: true,
  },
  'mainSelect': {
    itemType: 'SELECT',
    data: [
      { id: 'field', content: '字段' },
      { id: 'func', content: '函数' },
    ],
  },
  'secondSelectOne': {
    itemType: 'SELECT',
    data: [
      { id: 'string', content: '字符串' },
      { id: 'int', content: '整数' },
      { id: 'float', content: '浮点数' },
      { id: 'browser', content: '浏览框' },
    ],
  },
  'secondSelectTwo': {
    itemType: 'BROWSER',
  },
  'thirdSelectString': {
    itemType: 'INPUT',
  },
  'thirdSelectIntOrFloat': {
    itemType: 'SELECT',
    data: [
      { id: 'input', content: '输入值' },
      { id: 'func', content: '函数' },
    ],
  },
  'thirdSelectBrowser': {
    itemType: 'BROWSER',
  },
  'FourSelectOne': {
    itemType: 'SELECT',
    data: [
      { id: 'op1', content: '包含' },
      { id: 'op2', content: '不包含' },
    ],
  },
  'FourSelectTwo': {
    itemType: 'SELECT',
    data: [
      { id: 'op1', content: '属于' },
      { id: 'op2', content: '不属于' },
    ],
  },
  'description': {
    itemType: 'DESCRIPTION',
    value: '<span>DESCRIPTION</span>',
    className: `${prefixCls}-description`,
  },
  'locale_old': {
    itemType: 'LOCALE',
    required: true,
    value: '~`~`lunarKK`~`~',
  },
  'locale_new': {
    itemType: 'LOCALE',
    required: true,
    useDefaultLangConfig: true,
    value: '~`~`lunarKK`~`~',
  },
  'richtext': {
    itemType: 'RICHTEXT',
    otherParams: {
      id: "simpleDemoForm_basic",
    },
  },
  'password': {
    itemType: 'PASSWORD',
  },
  'slider': {
    itemType: 'SLIDER',
  },
  'signature': {
    itemType: 'SIGNATURE',
  },
  'iconselection': {
    itemType: 'ICONSELECTION',
  },
  'cascader': {
    itemType: 'CASCADER',
    options: cascaderOptions,
  },
  'shareBrowser': {
    itemType: 'SHAREBROWSER',
    shareBrowserBean: { // TYPESBROWSER 对应 typesBrowserBean
      type: 'demo',
      module: 'common',
      options: customShareBrowserTypes,
      browsers: customBrowserProps,
      defaultValue: defaultValue,
    },
    // readOnly: true, // 只读
    otherParams: {
      autoFocus: true,
    }
  },
  'shareBrowser2': {
    itemType: 'SHAREBROWSER',
    readOnly: true,
    shareBrowserBean: { // TYPESBROWSER 对应 typesBrowserBean
      type: 'demo',
      module: 'common',
      options: customShareBrowserTypes,
      browsers: customBrowserProps,
      browserAssociativeProps: {
        readOnlyShowPlaceholder: true,
        placeholder: '暂无数据'
      }
    },
    // readOnly: true, // 只读
    otherParams: {
      autoFocus: true,
    }
  },
  'richiconselection': {
    itemType: 'RICHICONSELECTION',
  },
}


//在initLayout里面写入className进行模块样式的自定义

const helpTipPostion: FormHelpTipPostion = 'afterLabel';

const initLayout = [
  [
    { id: '1', label: '单行文本', items: ['inputProp', 'input'], labelSpan: 4, hide: false, className: "single-input", helpfulTip: '提示信息', helpTipPostion },
  ],
  [
    { id: '100', label: '单行文本', items: ['input'], labelSpan: 4, hide: false },
  ],
  [
    { id: '2', label: '数字输入', items: ['inputnumber'], labelSpan: 4, hide: false, helpTip: '提示信息', helpTipProps: { placement: 'top' } },
  ],
  [
    { id: '3', label: '下拉选择框', items: ['select'], labelSpan: 4, hide: false },
  ],
  [
    { id: '4', label: '多行文本', items: ['text'], labelSpan: 4, hide: false },
  ],
  [
    { id: '5', label: '单选', items: ['radio'], labelSpan: 8, span: 8, hide: false, helpTip: '提示信息', helpTipProps: { placement: 'top' } },
    { id: '6', label: '复选', items: ['checkbox'], labelSpan: 4, span: 16, hide: false, helpTip: '提示信息', helpTipProps: { placement: 'top' } },
  ],
  [
    { id: '7', label: '评分', items: ['rate'], labelSpan: 8, hide: false },
    { id: '8', label: '时间选择器', items: ['timepicker'], labelSpan: 8, hide: false },
  ],
  [
    { id: '9', label: '开关', items: ['switch'], labelSpan: 8, hide: false },
    { id: '10', label: '区间', items: ['scope'], labelSpan: 8, hide: false },
  ],
  [
    { id: '11', label: '浏览框', items: ['browser'], labelSpan: 8, hide: false },
    { id: '12', label: '搜索框', items: ['search'], labelSpan: 8, hide: false },
  ],
  [
    { id: '13', label: '颜色选择器', items: ['colorpicker'], labelSpan: 8, hide: false, },
    { id: '14', label: '日期选择器', items: ['datepicker'], labelSpan: 8, hide: false, },
  ],
  [
    { id: '15', label: '日期多选', items: ['dayspicker'], labelSpan: 8, hide: false, },
    { id: '16', label: '月份多选', items: ['monthspicker'], labelSpan: 8, hide: false, },
  ],
  [
    { id: '17', label: '自定义组件1', items: ['custom'], labelSpan: 8, hide: false, },
    { id: '18', label: '自定义组件2', items: ['customOther'], labelSpan: 8, hide: false, },
  ],
  [
    { id: '19', label: '上传', items: ['upload'], labelSpan: 0, hide: false },
  ],
  [
    { id: '20', label: '单行文本(必填)', items: ['inputRequired'], labelSpan: 8, hide: false, },
    { id: '21', label: '描述性文字', items: ['description'], labelSpan: 8, hide: false, },
  ],
  [
    {
      id: '22', label: '多字段联动',
      // 初始值 items 需包含所有字段配置
      items: ['mainSelect', 'secondSelectOne', 'secondSelectTwo', 'thirdSelectString', 'thirdSelectIntOrFloat', 'thirdSelectBrowser', 'FourSelectOne', 'FourSelectTwo'],
      labelSpan: 4, hide: false, className: `${prefixCls}-multiFields`,
    },
  ],
  [
    { id: '23.1', label: '新版多语言', items: ['locale_new'], labelSpan: 8, hide: false, },
    { id: '23.2', label: '过度版多语言', items: ['locale_old'], labelSpan: 8, hide: false, },
  ],
  [
    { id: '24', label: '多类型浏览框', items: ['typesBrowser'], labelSpan: 8, hide: false, helpTip: '提示信息', helpTipProps: { placement: 'top' } },
    { id: '25', label: '密码输入框', items: ['password'], labelSpan: 8, hide: false },
  ],
  [
    { id: '26', label: '日期时间选择器', items: ['datetimepicker'], labelSpan: 8, hide: false, },
    { id: '27', label: '日期时间范围选择', items: ['datetimepicker2'], labelSpan: 8, hide: false, },
  ],
  [
    { id: '28', label: '富文本', items: ['richtext'], labelSpan: 4, hide: false },
  ],
  [
    { id: '29', label: '滑块', items: ['slider'], labelSpan: 4, hide: false, helpTip: '提示信息' },
  ],
  [
    { id: '30', label: '签批', items: ['signature'], labelSpan: 4, hide: false },
  ],
  [
    { id: '31', label: '自定义图标选择', items: ['iconselection'], labelSpan: 4, hide: false },
  ],
  [
    { id: '32', label: '级联选择器', items: ['cascader'], labelSpan: 4, hide: false },
  ],
  [
    { id: '33', label: '组合浏览按钮', items: ['shareBrowser'], labelSpan: 4, hide: false },
  ],
  [
    { id: '100', label: '组合浏览按钮（只读）', items: ['shareBrowser2'], labelSpan: 4, hide: false },
  ],
  [
    { id: '34', label: '扩展图标选择', items: ['richiconselection'], labelSpan: 4, hide: false },
  ],
]


@observer
class FormDemo extends Component<any, FormRenderState> {
  hasAddBtn: boolean | undefined;

  constructor(props: FormRenderDemoProps) {
    super(props);
    this.state = {
      data: { //字段默认值，可通过data处理，或者在items里面配置，如两边有冲突，则以data为准
        'inputProp': ['contain'],
        'select': ['op1'],
        'mainSelect': ['field'],
        'colorpicker': "#dedede",
        'secondSelectOne': ['string'],
        'thirdSelectIntOrFloat': ['input'],
        'datequickfilter': '2021-05-19',
        'upload': [],
      },
    }
  }
  //  基本用法：初始化表单
  componentDidMount() {
    const { data } = this.state;
    const apiTimeout = setTimeout(() => { // 延时模拟接口数据
      formDemoStore.formCustom.initForm({
        data, items, layout: initLayout, groups: [], // groups为空，则不分组显示
      })
      if (apiTimeout) clearTimeout(apiTimeout);
    }, 50)
  }

  //  基本用法：获取表单数据
  getFormValue = () => {
    console.log(toJS(formDemoStore.formCustom.getFormDatas()));
  }

  //  基本用法：重置表单数据
  resetForm = () => {
    formDemoStore.formCustom.resetForm(); // 清空form表单数据
  }
  /* ------------------------------------- 字段联动 -------------------------------------- */
  // 使用customHide处理字段联动（渲染范围相对较小）
  // 同一个字段内联动，修改items参数
  // 多个字段间联动修改hide参数
  customHide = (col: FormLayoutProps) => {
    const value = formDemoStore.formCustom.getFormDatas();
    // 单行文本字段内联动
    if (value) {
      if (col.id === '1' && 'inputProp' in value) {
        if (value.inputProp === 'ncontain') {
          col = {
            ...col,
            items: ['inputProp'],
          }
        }
      }
      if (col.id === '21') {
        const mainSelect = value.mainSelect;
        if (mainSelect === 'func') {
          col = {
            ...col,
            items: ['mainSelect', 'secondSelectTwo'],
          }
        } else {
          const secondSelectOne = value.secondSelectOne;
          if (secondSelectOne === 'int' || secondSelectOne === 'float') {
            col = {
              ...col,
              items: ['mainSelect', 'secondSelectOne', 'thirdSelectIntOrFloat'],
            }
            const thirdSelectIntOrFloat = value.thirdSelectIntOrFloat;
            if (thirdSelectIntOrFloat instanceof Array && thirdSelectIntOrFloat[0] === 'func') {
              col = {
                ...col,
                items: secondSelectOne === 'int' ? ["mainSelect", "secondSelectOne", "thirdSelectIntOrFloat", "FourSelectOne"] : [
                  "mainSelect", "secondSelectOne", "thirdSelectIntOrFloat", "FourSelectTwo"
                ],
              }
            }
          } else if (secondSelectOne === 'browser') {
            col = {
              ...col,
              items: ['mainSelect', 'secondSelectOne', 'thirdSelectBrowser'],
            }
          } else {
            col = {
              ...col,
              items: ['mainSelect', 'secondSelectOne', 'thirdSelectString'],
            }
          }
        }
      }
    }
    return col;
  }
  /* -------------------------------------------------------------------------------------- */
  onChange = (value?: FormDatas, otherParams?: any) => {
    console.log('value', value)
    console.log('otherParams', otherParams); // otherParams 字段非value的所有参数
    if (value && needSync('select', value)) {
      formDemoStore.formCustom.updateDatas({
        'text': value.select === 'op2' ? '' : '0',
      })
      formDemoStore.formCustom.setItemProps('inputRequired', { // 自定义设置字段配置
        disabled: value.select === 'op2',
      })
      formDemoStore.formCustom.setItemProps('checkbox', {
        data: value.select === 'op2' ? [
          { id: 'op1', content: '苹果' },
          { id: 'op2', content: '香蕉' },
          { id: 'op3', content: '橘子' },
          { id: 'op4', content: '其他' },
        ] : [
          { id: 'op1', content: '苹果' },
          { id: 'op2', content: '香蕉' },
          { id: 'op3', content: '橘子' },
        ],
      });
      formDemoStore.formCustom.setLayoutProps('5', {
        label: value.select === 'op2' ? 'customLabel' : '单选',
        items: value.select === 'op2' ? ['checkbox'] : ['radio'],
      });
      formDemoStore.formCustom.setHide('4', value.select === 'op2'); // '4'代表需要联动的字段id，第二个参数为hide参数
    }
    // 多级字段联动，字段值联动例子
    if (value && needSync('mainSelect', value)) {
      formDemoStore.formCustom.updateDatas({
        'thirdSelectString': '',
      })
    }
  }
  onBlur = (value?: FormDatas, otherParams?: any) => {
    console.log('onBlur', value, otherParams);
  }
  onFocus = (value?: FormDatas, otherParams?: any) => {
    console.log('onFocus', value, otherParams);
  }
  onBeforeChange = (datas?: FormDatas) => new Promise((resolve, reject) => {
    resolve(datas as FormDatas);
  }) as Promise<FormDatas>
  validateForm = () => {
    const customRules = formDemoStore.formCustom.getRules(); // 获取默认规则
    formDemoStore.formCustom.validate(customRules, {
      attributeNames: {
        input: '单行文本'
      },
    }).then((errors) => {
      console.log(errors);
    });
  }
  customRenderFormSwitch = (key: string, props: FormSwitchProps) => {
    return customRender(props);
  }
  customRenderAllFormSwitch = (key: string, props: FormSwitchProps, com: ReactNode) => {
    if (key === 'text') {
      return <div>{com} <Button>测试按钮</Button></div>
    }
    return com;
  }
  customRenderFormItem = (id: string, props: FormItemRenderProps, com: ReactNode) => {
    if (id === '5') {
      return (<div>
        {com}
        <div className={`${prefixCls}-basic-tip`}>提示信息</div>
      </div>)
    }
    return com;
  }
  render() {
    return (
      <div className={prefixCls}>
        <Form
          store={formDemoStore.formCustom}
          customHide={this.customHide}
          onChange={this.onChange}
          onBlur={this.onBlur}
          onFocus={this.onFocus}
          onBeforeChange={this.onBeforeChange}
          isMobile={false}
          className="form-custom-style"  //通过className自定义form的样式  单个模块的样式在initLayout里面写入className
          customRenderFormSwitch={this.customRenderFormSwitch}
          customRenderAllFormSwitch={this.customRenderAllFormSwitch}
          enabelValidateTipPosition
        // customRenderFormItem={this.customRenderFormItem}
        />
        <div className={`${prefixCls}-footer`}>
          <Button type="primary" className={`${prefixCls}-btn`} onClick={this.getFormValue}>获取form数据</Button>
          <Button type="primary" className={`${prefixCls}-btn`} onClick={this.validateForm}>校验</Button>
          <Button className={`${prefixCls}-btn`} onClick={this.resetForm}>重置</Button>
        </div>
      </div>
    );
  }
}

export default FormDemo
```





#### FormStore 实例

```jsx
import { Form, FormStore } from '@weapp/ui';

const store = new FormStore({
  validateHiddenField: false,   // 校验隐藏字段(layout纬度)，默认不校验
  validateHiddenItems: true,   // 校验隐藏字段(items纬度)，默认校验
});
```

| 方法 | 说明 | 签名 |
|------|------|------|
| initForm | 初始化表单 | `({ data, items, groups?, layout }) => void` |
| getFormDatas | 获取表单内容 | `() => FormDatas` |
| updateDatas | 更新表单内容 | `(value?) => void` |
| resetForm | 重置表单内容 | `() => void` |
| validate | 校验表单 | `(customRules?, otherParams?) => void` |
| setItemProps | 自定义修改字段配置 | `(key, items) => void` |
| setHide | 隐藏或显示字段 | `(id, hide) => void` |
| setLayoutProps | 修改字段布局 | `(id, layout) => void` |
| isFormInit | 表单初始化标记 | `boolean` |

#### FormItemProps 字段类型

```js
// itemType 支持的所有字段类型：
'INPUT' | 'INPUTNUMBER' | 'TEXTAREA' | 'SELECT' | 'RADIO' | 'CHECKBOX' 
| 'TIMEPICKER' | 'DATEPICKER' | 'RATE' | 'UPLOAD' | 'SWITCH' | 'COLORPICKER' 
| 'SCOPE' | 'BROWSER' | 'CUSTOM' | 'DESCRIPTION' | 'TYPESBROWSER' 
| 'DATETIMEPICKER' | 'DATEQUICKFILTER' | 'LOCALE' | 'RICHTEXT' | 'PASSWORD' 
| 'SLIDER' | 'SIGNATURE' | 'ICONSELECTION' | 'BROWSERWINDOW' 
| 'MONTHDAYPICKER' | 'RANGE' | 'FILTERBUTTONS' | 'CASCADER' 
| 'SHAREBROWSER' | 'RICHICONSELECTION' | 'PLUGIN'
```

#### FormLayoutType 布局配置

```js
// layout 数组中每个元素的配置：
{
  id: string,              // 唯一值
  label: string,           // 标签
  items: Array<string>,    // 指定对应字段 key 值
  groupId?: string,        // 属于哪个分组
  hide?: boolean,          // 是否隐藏
  value?: FormValue,       // 默认值
  labelSpan?: number,      // 标签占比
  cascadeRules?: {},       // 简单行内字段联动配置
  cascadeRulesOuter?: {},  // 多行字段联动
  helpTip?: string,        // 提示信息
  needQuickSearch?: boolean // 是否支持快捷搜索
}
```

#### 代码示例

**基础用法：**

```jsx
import { Form, FormStore } from '@weapp/ui';

const store = new FormStore();

const layout = [
  { id: '1', label: '姓名', items: ['name'] },
  { id: '2', label: '部门', items: ['department'] },
];

const items = {
  name: { itemType: 'INPUT', required: true, placeholder: '请输入姓名' },
  department: { itemType: 'SELECT', otherParams: { data: deptOptions } },
};

const data = { name: '', department: '' };

// 初始化
store.initForm({ data, items, layout });

<Form store={store} type="normal" onChange={(value) => console.log(value)} />
```

**获取表单数据：**

```jsx
const formData = store.getFormDatas();
console.log(formData); // { name: '张三', department: '技术部' }
```

**表单校验：**

```jsx
// items 中配置校验规则（基于 validatorjs）
const items = {
  name: { 
    itemType: 'INPUT', 
    required: true, 
    rule: 'required|min:2',
    attributeNames: '姓名'
  },
};

// 手动触发表单校验
store.validate().then((isValid) => {
  if (isValid) {
    const data = store.getFormDatas();
    // 提交数据...
  }
});

// 带自定义校验规则
store.validate({
  customRules: { name: 'required|email' },
  otherParams: { 
    message: { 'required.name': '名称必填' },
    attributeNames: { name: '用户名' }
  }
});
```

**字段联动（行内联动）：**

```jsx
const layout = [
  { 
    id: '1', label: '类型', items: ['type'],
    cascadeRules: {
      // 当 type 值为 'custom' 时，显示 customField
      field: 'type',
      rules: [{ value: 'custom', showFields: ['customField'] }]
    }
  },
  { id: '2', label: '自定义', items: ['customField'], hide: true },
];
```

**只读/禁用模式：**

```jsx
const items = {
  name: { itemType: 'INPUT', readOnly: true },   // 只读
  dept: { itemType: 'SELECT', disabled: true },   // 禁用
};
```

---

### Table 表格

表格型列表控件，用于展示多条结构类似的数据，支持排序、筛选、单选/多选、分页、拖拽、子列表展开、固定列、虚拟列表等。

#### API

| 参数 | 说明 | 类型 | 是否必填 | 默认值 |
|------|------|------|---------|--------|
| columns | 列配置 | `ITableColumn[]` | 是 | - |
| data | 数据数组 | `Data[]` | 是 | - |
| className | 样式类名 | `string` | 否 | - |
| style | 行内样式 | `CSSProperties` | 否 | - |
| size | 表格大小 | `'medium'`\|`'small'`\|`'large'` | 否 | `'medium'` |
| loading | 是否加载中 | `boolean` | 否 | - |
| showHeader | 是否显示表头 | `boolean` | 否 | `true` |
| showOrderNumber | 是否显示序号 | `boolean` | 否 | `false` |
| showBorder | 是否显示边框 | `boolean` | 否 | - |
| pageInfo | 分页配置 | `{ PaginationProps, paginationType }` | 否 | - |
| selection | 选择框配置 | `ITableSelection` | 否 | - |
| emptyText | 空数据提示文字 | `ReactNode` | 否 | - |
| scroll | 滚动条配置 | `{ x?, y? }` | 否 | - |
| sortable | 是否启用拖拽 | `boolean` | 否 | `false` |
| useSkeleton | 是否开启骨架屏 | `boolean` | 否 | `false` |
| virtualMode | 是否开启虚拟列表 | `boolean` | 否 | `false` |
| useExpandLine | 树形子列表连线模式 | `boolean` | 否 | `false` |

#### columns 列配置

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| title | 列头显示文字 | `ReactNode` | 必填 |
| dataIndex | 列数据在数据项中对应的 key | `string` | - |
| width | 列宽度 | `CSSProperties['width']` | - |
| fixed | 列固定 | `true`\|`'left'`\|`'right'` | - |
| hide | 是否隐藏 | `boolean` | - |
| align | 表头对齐方式 | `TableTextAlign` | - |
| bodyRender | 生成复杂数据的渲染函数 | `(data, pos, name) => ReactNode` | - |
| children | 渲染分组表头 | `ITableColumn[]` | - |
| isPrimaryKey | 是否为主标题字段 | `boolean` | `false` |
| orderKey | 排序字段 | `string` | - |
| colSpan | 表头列合并 | `number` | - |
| newLine | 是否换行 | `boolean` | `true` |

#### selection 选择框配置

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| isSingleSelection | 是否单选 | `boolean` | - |
| selectedRowKeys | 选中受控 key | `string[]` | - |
| onSelect | check 触发回调 | `(selectedKeys, selectedRows, changeRow, type) => any` | - |
| enableShiftSelect | 是否开启滑动多选 | `boolean` | `false` |
| isBatchSelect | 是否开启批量全选 | `boolean` | - |
| getSelectionProps | 选择框属性配置 | `(data, rowIndex) => any` | - |

#### pageInfo 分页配置

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| PaginationProps | 分页器配置 | `PaginationProps` | - |
| paginationType | 分页模式 | `'part'`\|`'more'`\|`'scroll'` | `'part'` |

#### 代码示例

**基础用法：**

```jsx
import { Table } from '@weapp/ui';

const columns = [
  { title: '姓名', dataIndex: 'name', isPrimaryKey: true },
  { title: '部门', dataIndex: 'department' },
  { title: '入职时间', dataIndex: 'hireDate' },
];

const data = [
  { id: '1', name: '张三', department: '技术部', hireDate: '2023-01-01' },
  { id: '2', name: '李四', department: '产品部', hireDate: '2023-06-15' },
];

<Table columns={columns} data={data} />
```

**自定义列渲染（bodyRender）：**

```jsx
const columns = [
  {
    title: '操作',
    dataIndex: 'action',
    bodyRender: (data, pos) => {
      return (
        <Button onClick={() => handleEdit(data)}>编辑</Button>
      );
    }
  }
];
```

**服务端分页+单选：**

```jsx
const [selectedKeys, setSelectedKeys] = useState([]);

<Table
  columns={columns}
  data={dataSource}
  selection={{
    isSingleSelection: true,
    selectedRowKeys: selectedKeys,
    onSelect: (keys, rows) => setSelectedKeys(keys),
  }}
  pageInfo={{
    paginationType: 'part',
    PaginationProps: {
      current: pageNum,
      total: totalCount,
      pageSize: pageSize,
      onChange: (page) => fetchData(page),
    }
  }}
/>
```

**排序：**

```jsx
const columns = [
  { title: '姓名', dataIndex: 'name', orderKey: 'name' },
  { title: '入职时间', dataIndex: 'hireDate', orderKey: 'hire_date' },
];
// 点击列表头触发排序，通过 orderKey 传给后端
```

**获取全局列表配置：**

```jsx
import { getTableUserConfig } from '@weapp/ui';

// 获取默认分页条数
getTableUserConfig('pageSize').then(size => console.log(size));
// 获取列宽拖拽模式
getTableUserConfig('autoScrollInResize').then(v => console.log(v));
```

---

### Upload 上传

上传组件，支持文件上传、图片上传、拖拽上传、粘贴上传、批量操作、分片上传、免登录上传、密级校验、图片压缩等。

#### API（核心参数）

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| data | 附件数据 | `UploadData[]` | - |
| type | 上传模式 | `'default'`\|`'simple'` | `'default'` |
| buttonType | 上传按钮类型 | `'default'`\|`'image'`\|`'drag'`\|`'basic'` | - |
| listType | 列表展现形式 | `'list'`\|`'img'` | `'list'` |
| multiple | 单选/多选 | `boolean` | `true` |
| autoUpload | 自动上传或手动批量 | `boolean` | - |
| maxCount | 限制文件个数 | `number` | - |
| maxSize | 最大上传大小(MB) | `number` | - |
| limitType | 允许的文件类型（后缀逗号隔开） | `string` | - |
| prohibitType | 禁止的文件类型 | `string` | - |
| readOnly | 只读模式 | `boolean` | `false` |
| disabled | 禁用模式 | `boolean` | `false` |
| fileDataName | 上传附件参数名称 | `string` | `'file'` |
| commonParams | 接口通用参数 | `AnyObj` | - |
| onChange | 状态变化回调 | `(data, uploading, reUpload) => void` | - |
| onSuccess | 上传成功回调 | `(file, info, response, data) => void` | - |
| onError | 上传失败回调 | `(file, info, response) => void` | - |
| beforeUploadFile | 上传前拦截事件 | `(file, params) => boolean \| AnyObj \| Promise` | - |
| customRequest | 自定义上传请求 | `(option) => void` | - |
| sortable | 是否可拖拽排序 | `boolean` | - |
| dragUpload | 是否支持拖拽上传 | `boolean` | - |
| pasteUpload | 是否支持粘贴上传 | `boolean` | - |
| showDownload | 是否显示下载按钮 | `boolean` | `true` |
| showDelete | 是否显示删除按钮 | `boolean` | `true` |
| showPreview | 是否可以预览 | `boolean` | `true` |
| showUpload | 是否显示上传按钮 | `boolean` | `true` |
| loginFree | 免登录上传标识 | `boolean` | - |
| isCompressImg | 图片上传压缩 | `boolean` | `false` |
| checkSensitiveWords | 敏感词检测 | `boolean` | `true` |
| headers | 请求 header | `UploadRequestHeader` | - |
| timeout | 超时设置 | `number` | `30000` |

#### 代码示例

**基础用法：**

```jsx
import { Upload } from '@weapp/ui';

<Upload
  multiple
  maxCount={5}
  maxSize={10}
  limitType=".jpg,.png,.pdf,.doc,.docx"
  onChange={(data) => console.log('已上传列表:', data)}
/>
```

**图片上传：**

```jsx
<Upload
  buttonType="image"
  listType="img"
  multiple
  maxCount={9}
  isCompressImg
  jsCompressImgOptions={{
    quality: 0.8,
    maxWidthOrHeight: 1920,
  }}
/>
```

**拖拽上传：**

```jsx
<Upload
  buttonType="drag"
  dragUpload
  dragInfo="点击或拖拽文件到此区域上传"
/>
```

**手动上传：**

```jsx
<Upload
  autoUpload={false}
  onChange={(data, uploading) => {
    // data: 已上传列表
    // uploading: 待上传列表
  }}
/>
```

**上传前拦截（修改参数/校验文件名）：**

```jsx
<Upload
  beforeUploadFile={(file, uploadParams) => {
    // 修改上传参数
    uploadParams.moduleType = 'meeting';
    // return false 可阻止上传
    if (file.size > 10 * 1024 * 1024) return false;
    return uploadParams;
  }}
/>
```

**免登录上传：**

```jsx
<Upload
  loginFree
  uploadParams={{ tenantKey: 'all_teams' }}
/>
```

---

### Tree 树

树形组件，用于展示层级结构数据，支持展开/收起、选中、拖拽节点、自定义渲染等。

#### API

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| treeData | 树数据 | `TreeNodeData[]` | 必填 |
| selectedKeys | 选中节点 key | `string[]` | - |
| defaultExpandAll | 默认展开所有节点 | `boolean` | - |
| expandedKeys | 受控展开节点 | `string[]` | - |
| checkable | 是否支持勾选 | `boolean` | - |
| multiple | 是否支持多选 | `boolean` | - |
| filterOption | 过滤选项函数 | `(node) => boolean` | - |
| loadData | 懒加载数据 | `(node) => Promise` | - |
| draggable | 是否可拖拽 | `boolean` | - |
| onExpand | 展开事件 | `(expandedKeys) => void` | - |
| onSelect | 选择事件 | `(selectedKeys, info) => void` | - |
| onDrop | 拖拽放置事件 | `(info) => void` | - |
| showIcon | 是否显示图标 | `boolean` | - |
| icon | 自定义图标 | `ReactNode \| (props) => ReactNode` | - |
| renderTitle | 自定义渲染标题 | `(node) => ReactNode` | - |
| titleClickToExpand | 点击标题展开 | `boolean` | `true` |
| showLine | 是否显示连接线 | `boolean` | - |

#### TreeNodeData 数据结构

```js
{
  title: string,          // 节点显示文字
  key: string,            // 唯一标识
  icon?: ReactNode,       // 图标
  children?: TreeNodeData[], // 子节点
  disabled?: boolean,     // 禁用
  selectable?: boolean,   // 是否可选择
  isLeaf?: boolean,       // 是否叶子节点（懒加载用）
  [key: string]: any,     // 自定义数据
}
```

#### 代码示例

**基础树：**

```jsx
import { Tree } from '@weapp/ui';

const treeData = [
  {
    title: '总公司',
    key: '0',
    children: [
      { title: '技术部', key: '0-1' },
      { title: '产品部', key: '0-2' },
    ]
  }
];

<Tree treeData={treeData} defaultExpandAll />
```

**懒加载：**

```jsx
<Tree
  treeData={treeData}
  loadData={async (node) => {
    const res = await axios.get('/api/dept/children', { params: { id: node.key } });
    return res.data; // 返回子节点数据
  }}
/>
```

---

### Cascader 级联选择器

级联选择组件，用于从层级结构数据中选择，支持悬浮展开、搜索、多选等。

#### API

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| data | 选项数据 | `CascaderOption[]` | 必填 |
| value | 选中值 | `string[]` | - |
| onChange | 值变化回调 | `(value, selectedOptions) => void` | - |
| onPopupVisibleChange | 弹窗显示变化 | `(visible) => void` | - |
| loadData | 动态加载选项 | `(selectedOptions) => void` | - |
| changeOnSelect | 选择即改变 | `boolean` | `false` |
| expandTrigger | 展开触发方式 | `'click'`\|`'hover'` | `'click'` |
| multiple | 是否多选 | `boolean` | `false` |
| placeholder | 占位提示 | `string` | - |
| showSearch | 是否支持搜索 | `boolean` | `false` |
| allowClear | 是否支持清除 | `boolean` | `true` |
| disabled | 禁用 | `boolean` | `false` |

#### 代码示例

```jsx
import { Cascader } from '@weapp/ui';

const options = [
  {
    value: 'beijing',
    label: '北京',
    children: [
      { value: 'haidian', label: '海淀区' },
      { value: 'chaoyang', label: '朝阳区' },
    ]
  }
];

<Cascader
  data={options}
  onChange={(value, selectedOptions) => console.log(value, selectedOptions)}
  placeholder="请选择地区"
/>
```

---

### DatePicker 日期选择器

日期选择组件，支持日期选择、日期范围、日期时间等变体。

#### API

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| value | 受控值 | `Date \| string` | - |
| type | 选择器类型 | `'date'`\|`'month'`\|`'time'` | `'date'` |
| format | 日期格式 | `string` | `'YYYY-MM-DD'` |
| placeholder | 占位提示 | `string` | - |
| disabled | 禁用 | `boolean` | `false` |
| readOnly | 只读 | `boolean` | `false` |
| onChange | 值变化回调 | `(date, dateString) => void` | - |
| minDate / maxDate | 日期范围限制 | `Date` | - |
| showTime | 是否显示时间 | `boolean` | `false` |

> 更多文档：`DateTimePicker`、`TimePicker`、`MonthDayPicker`、`DateQuickFilter`、`DateMenu`、`DatePanel` 参见 [完整抓取文档](../doc/scraped_components/)。

---

### Checkbox 复选框 / Radio 单选框

#### Checkbox API

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| checked | 受控选中 | `boolean` | - |
| defaultChecked | 初始选中 | `boolean` | `false` |
| disabled | 禁用 | `boolean` | `false` |
| onChange | 变化回调 | `(e) => void` | - |
| indeterminate | 半选状态 | `boolean` | `false` |

**Checkbox.Group：**

| 参数 | 说明 | 类型 |
|------|------|------|
| value | 选中值数组 | `string[]` |
| onChange | 变化回调 | `(checkedValues) => void` |
| disabled | 整组禁用 | `boolean` |

#### Radio API

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| checked | 受控选中 | `boolean` | - |
| defaultChecked | 初始选中 | `boolean` | `false` |
| disabled | 禁用 | `boolean` | `false` |
| value | 值 | `string` | - |

**Radio.Group：**

| 参数 | 说明 | 类型 |
|------|------|------|
| value | 当前选中值 | `string` |
| defaultValue | 初始默认值 | `string` |
| onChange | 变化回调 | `(e) => void` |
| disabled | 整组禁用 | `boolean` |
| buttonStyle | Radio.Button 样式 | `'outline'`\|`'solid'` |

---

### Switch 开关

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| checked | 受控开关状态 | `boolean` | - |
| defaultChecked | 初始状态 | `boolean` | `false` |
| disabled | 禁用 | `boolean` | `false` |
| loading | 加载中 | `boolean` | `false` |
| size | 尺寸 | `'default'`\|`'small'` | `'default'` |
| onChange | 变化回调 | `(checked) => void` | - |

---

### Pagination 分页

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| current | 当前页 | `number` | - |
| total | 数据总数 | `number` | - |
| pageSize | 每页条数 | `number` | - |
| onChange | 页码变化回调 | `(page, pageSize) => void` | - |
| showSizeChanger | 显示每页条数切换 | `boolean` | `false` |
| pageSizeOptions | 每页条数选项 | `string[]` | - |
| showQuickJumper | 显示快速跳转 | `boolean` | `false` |
| simple | 简洁模式 | `boolean` | `false` |

---

### Menu 菜单 / SlideTabs 标签页

#### Menu API

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| data | 菜单数据 | `MenuItem[]` | 必填 |
| selectedKeys | 当前选中 key | `string[]` | - |
| defaultSelectedKeys | 初始选中 key | `string[]` | - |
| onSelect | 选中回调 | `(item) => void` | - |
| mode | 菜单类型 | `'horizontal'`\|`'vertical'` | `'horizontal'` |
| theme | 主题色 | `'light'`\|`'dark'` | `'light'` |

#### SlideTabs API

| 参数 | 说明 | 类型 |
|------|------|------|
| activeKey | 当前激活 tab | `string` |
| onChange | 切换回调 | `(key) => void` |
| tabPosition | tab 位置 | `'top'`\|`'bottom'`\|`'left'`\|`'right'` |

---

### EditableTable 可编辑表格

支持行内编辑的表格组件，常用于配置页面。基于 Table 组件扩展。

| 参数 | 说明 | 类型 |
|------|------|------|
| editable | 是否可编辑 | `boolean` |
| editType | 编辑触发方式 | `'click'`\|`'dblclick'` |
| onSave | 保存回调 | `(rowData) => Promise \| void` |
| onDelete | 删除回调 | `(rowData) => void` |
| onAdd | 新增行回调 | `() => void` |
| editColumns | 可编辑列配置 | `EditableColumn[]` |

---

### SearchAdvanced 高级搜索

高级搜索组件，支持多条件组合查询、条件组嵌套、字段联动等。

| 参数 | 说明 | 类型 |
|------|------|------|
| store | 搜索实例 | `FormStore` |
| filterColumns | 过滤字段配置 | `FilterColumn[]` |
| onSearch | 搜索回调 | `(params) => void` |
| onReset | 重置回调 | `() => void` |
| useCollapse | 折叠面板 | `boolean` |
| commonConditions | 常用条件 | `CommonCondition[]` |

---

### 其他组件速查

以下组件文档完整版参见 `doc/scraped_components/` 目录（63个组件完整抓取）：

| 组件 | 说明 | 组件 | 说明 |
|------|------|------|------|
| Calendar | 日历 | Carousel | 走马灯 |
| Collapse | 折叠面板 | Timeline | 时间轴 |
| Steps | 步骤条 | Tag | 标签 |
| Badge | 徽标 | Avatar | 头像 |
| Alert | 警告提示 | Popover | 气泡卡片 |
| Spin | 加载中 | Empty | 空状态 |
| Slider | 滑动输入条 | Rate | 评分 |
| Transfer | 穿梭框 | PhotoView | 图片预览 |
| Watermark | 水印 | Signature | 手写签名 |
| RichText | 富文本 | CodeMirror | 代码编辑器 |
| Echarts | 图表 | Board | 看板 |
| MindMap | 思维导图 | QRCode | 二维码 |
| ImageCropper | 图片裁剪 | ColorPicker | 颜色选择器 |
| CityPicker | 城市选择器 | Comment | 评论 |
| List / ListView | 列表 | Browser | 浏览按钮 |
| Title | 标题 | Sticky | 粘性布局 |
| Intro | 引导 | Help | 帮助提示 |
| RightMenu | 右键菜单 | BoxSelection | 框选 |
| BackTop | 回到顶部 | FloatButton | 浮动按钮 |
| Scroller | 滚动区域 | Skeleton | 骨架屏 |

## 在组件替换中使用 UI 组件

```js
import { Button } from '@weapp/ui';
// 仅在异步文件中使用！
```
