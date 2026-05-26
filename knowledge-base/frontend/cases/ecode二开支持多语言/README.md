## ecode二开支持多语言

### 1.描述

客户进行二次开发时，需要根据系统多语言设置进行自动切换，故此，在二次开发时，需要按照标准多语言开发标准，
进行多语言开发集成。

### 2.使用方式

```
import {getLabel,getLocale} from '@weapp/utils';

const Test = ()=>{
  return <div style={{
    width:200,
    height:200,
    position:'fixed',
    top:200,
    left:'50%',
    background:'red',
    fontSize: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color:'#fff'
  }}>{getLabel('-1021741667285295104','文档比对')}</div>
}


let cb = ()=>{
  let bodyDom = document.querySelector("body");
  let divDom = document.createElement("div");
  ReactDOM.render(<Test/>, divDom);
  bodyDom.appendChild(divDom)
}
//情况1：当前渲染的组件或者对应的模块有对应的多语言时，可以直接使用多语言
// cb();

//情况2：当前渲染的组件或者对应的模块有对应的多语言时，如ecode单页，或者未加载的模块时，需要手动加载多语言
getLocale('@weapp/ecode').then(() => {
  cb();
})
```

### 3.开发思路

在开发时，使用weappUtils的getLable进行获取多语言，按照上述案例进行书写即可，第一个参数为多语言id，第二个参数未默认中文多语言。
如果是开发某个模块的功能，可以先查找当前组件对应模块是否有相应的多语言（在network里找，如ecode是ecode.json,ui是ui.json），如果有则可以直接使用。

如果对应的模块没有相应的多语言，可以在 “后台管理中心-》区域和语言-》标签维护-》自定义标签”中添加自定义标签，按照实际情况选择对应模块，填写好相关信息即可，
创建完成，列表中就会展示对应的多语言信息，前端的多语言必须勾选是前端多语言。
使用时通过weappUtils.getLocale('@weapp/ecode')手动引入对应模块的多语言。@weapp固定，后面的ecode为模块参数。

![](${appMdRes}/1721093583-image.png)

![](${appMdRes}/1721093617-image.png)


### 4.实现效果
中文：


![](${appMdRes}/1721093813-image.png)

英文：

![](${appMdRes}/1721093342-image.png)