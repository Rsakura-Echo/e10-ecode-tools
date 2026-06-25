# 自有案例库索引

> **优先级 > cases/**（泛微官方案例，仅参考）。此目录存放个人生产环境验证过的真实可用代码。

## 案例列表

| 编号 | 案例 | 业务场景 | 技术实现 |
|------|------|----------|----------|
| 1 | [薪资计算ESB工作流-Loading弹窗](./薪资计算ESB工作流-Loading弹窗/) | **薪资计算**：HR 在 EB 表单通过自定义按钮触发薪资计算。需先选择计薪周期（起始/结束日期），确认当前假勤数据已维护完毕后开始计算。ESB 工作流执行期间页面展示居中 loading 遮罩（"薪资计算中...请稍后" + 旋转动画），防止用户重复操作；执行完成后自动关闭 loading 并弹出成功/失败提示。 | **EB 表单按钮事件 → ReactDOM.render 命令式 Dialog 链**：第一步 DatePicker 弹窗（日期范围选择 + 校验），第二步确认弹窗（计薪周期确认 + 维护地址链接），确认后触发 `POST /api/esb/server/event/triggerActionFlow`；等待期间注入 `<style>` CSS 旋转动画 + 全屏遮罩 loading 层；`.then()` / `.catch()` 均先关闭 loading 再提示结果。 |

## 检索方式

```bash
# 按业务关键词搜索
grep -ni "薪资\|按钮\|弹窗\|loading\|ESB\|DatePicker" knowledge-base/frontend/mycase/INDEX.md

# 按技术关键词搜索代码
grep -rni "triggerActionFlow\|ReactDOM.render\|showLoading\|Dialog" knowledge-base/frontend/mycase/ --include="*.js"

# 全文搜索
grep -rni "关键词" knowledge-base/frontend/mycase/ --include="*.js"
```
