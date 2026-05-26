# Vue 插件集成

### 一、背景
	
  考虑到有部分用户开发人员习惯于用VUE进行代码开发，但目前标准底层是基于React进行开发的，目前无法直接在e-code平台写书写关于Vue的相关语法代码，但可以通过loadjs引入第三方插件js的方式进行代码，
  故提供此案例作为参考。
  
  备注：后续标准中将会集成vue编辑器，支持书写Vue代码，敬请期待。

### 二、示例所用到的工具和框架

```
1.底层：
工具：loadjs
框架：React
钩子函数：regOvComponent， regOvProps， regReactChildren
路由：react-router-dom

2.集成：
框架： Vue
UI组件： Element UI

```

### 三、组件替换，在流程全部流程提交申请按钮前追加一个Element Button

**效果：**

![](${appMdRes}/1719903474-image.png)

**entry.js**
```
import React from 'react';
import { asyncImport } from '@weapp/ecodesdk';
import { Route } from 'react-router-dom';
import { regOvComponent,regOvProps, appInfo, regReactChildren } from '@weapp/utils';

/**
 * 在流程全部流程提交申请按钮前追加一个Element Button
 */
const NewButton = React.lazy(() => asyncImport('${appId}', 'VueButton'));

regOvComponent('weappUi', 'Button', (Com) => {
  return React.forwardRef((props, ref) => {
    const {weId} = props;
    if(weId && weId.endsWith('_hvf5bo@newFlow_rrt9fb')){
      return (
        <React.Suspense fallback={() => {}}>
          <NewButton {...props} ref={ref} OriginCom={Com} />
        </React.Suspense>
      )
    }
    return <Com {...props} ref={ref}/>
  });
}, 0)
```

**VueButton.js**
```
import {Button} from '@weapp/ui';
import loadjs from 'loadjs';
import {useState,useCallback,useEffect} from 'react';

const VueButton =(props)=> {
  const { OriginCom } = props;
  
  useEffect(()=>{
    loadjs([
      '${appRes}/vue.global.js',
      '${appRes}/index.full.min.js',
      '${appRes}/index.css'
    ], {
      success: (v) => {

        const dom = document.querySelector("#button-${appId}");

        // 通过vue 渲染组件按钮
        const { createApp, defineComponent } = window.Vue;
        const { ElMessage } = window.ElementPlus;
        const ButtonCom = defineComponent({
          template: '<el-button type="primary" @click="handleClick">{{ text }}</el-button>',
          methods: {
            handleClick() {
              ElMessage('this is a vue message.')
            }
          },
          data() {
            return {
              text: 'ElementPlusButton'
            }
          }
        })
        
        const app = createApp({
          template: '<ButtonCom/>',
          components: {
            ButtonCom
          }
        });
        // 使用element-plus 组件库
        app.use(window.ElementPlus)
        app.mount(dom);

      }
    })
  },[])

  return (
    <span className="app-${appId}-newButton">
      <div id="button-${appId}" style={{display:"inline-block",marginRight:'10px'}}></div>
      <OriginCom {...props} />
    </span>
  )
}

export default VueButton;
```


### 四、新页面开发：vue

**效果：**

![](${appMdRes}/1719903534-image.png)


**entry.js**
```
/**
 * 在流程全部流程提交申请按钮前追加一个Element Button
 */
const NewButton = React.lazy(() => asyncImport('${appId}', 'VueButton'));

regOvComponent('weappUi', 'Button', (Com) => {
  return React.forwardRef((props, ref) => {
    const {weId} = props;
    if(weId && weId.endsWith('_hvf5bo@newFlow_rrt9fb')){
      return (
        <React.Suspense fallback={() => {}}>
          <NewButton {...props} ref={ref} OriginCom={Com} />
        </React.Suspense>
      )
    }
    return <Com {...props} ref={ref}/>
  });
}, 0)
```

**VuePage**
```
import loadjs from 'loadjs';
import {useState,useCallback,useEffect} from 'react';


const VuePage =(props)=> {  
  useEffect(()=>{
    loadjs([
      '${appRes}/vue.global1.js',
      '${appRes}/index.full.min.js',
      '${appRes}/index.css'
    ], {
      success: (v) => {
        const dom = document.querySelector("#vue-page-${appId}");
        // 通过vue 渲染组件按钮
        const { createApp, defineComponent } = window.Vue;
        const { ElMessage } = window.ElementPlus;
        const VuePageCom = defineComponent({
          template: `
            <el-container style="height: 100%; border: 1px solid #eee">
              <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
                <el-menu :default-openeds="['1', '3']">
                  <el-submenu index="1">
                    <template slot="title"><i class="el-icon-message"></i>导航一</template>
                    <el-menu-item-group>
                      <template slot="title">分组一</template>
                      <el-menu-item index="1-1">选项1</el-menu-item>
                      <el-menu-item index="1-2">选项2</el-menu-item>
                    </el-menu-item-group>
                    <el-menu-item-group title="分组2">
                      <el-menu-item index="1-3">选项3</el-menu-item>
                    </el-menu-item-group>
                    <el-submenu index="1-4">
                      <template slot="title">选项4</template>
                      <el-menu-item index="1-4-1">选项4-1</el-menu-item>
                    </el-submenu>
                  </el-submenu>
                  <el-submenu index="2">
                    <template slot="title"><i class="el-icon-menu"></i>导航二</template>
                    <el-menu-item-group>
                      <template slot="title">分组一</template>
                      <el-menu-item index="2-1">选项1</el-menu-item>
                      <el-menu-item index="2-2">选项2</el-menu-item>
                    </el-menu-item-group>
                    <el-menu-item-group title="分组2">
                      <el-menu-item index="2-3">选项3</el-menu-item>
                    </el-menu-item-group>
                    <el-submenu index="2-4">
                      <template slot="title">选项4</template>
                      <el-menu-item index="2-4-1">选项4-1</el-menu-item>
                    </el-submenu>
                  </el-submenu>
                  <el-submenu index="3">
                    <template slot="title"><i class="el-icon-setting"></i>导航三</template>
                    <el-menu-item-group>
                      <template slot="title">分组一</template>
                      <el-menu-item index="3-1">选项1</el-menu-item>
                      <el-menu-item index="3-2">选项2</el-menu-item>
                    </el-menu-item-group>
                    <el-menu-item-group title="分组2">
                      <el-menu-item index="3-3">选项3</el-menu-item>
                    </el-menu-item-group>
                    <el-submenu index="3-4">
                      <template slot="title">选项4</template>
                      <el-menu-item index="3-4-1">选项4-1</el-menu-item>
                    </el-submenu>
                  </el-submenu>
                </el-menu>
              </el-aside>
              
              <el-container>
                <el-header style="text-align: right; font-size: 12px">
                  <el-dropdown>
                    <i class="el-icon-setting" style="margin-right: 15px"></i>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item>查看</el-dropdown-item>
                      <el-dropdown-item>新增</el-dropdown-item>
                      <el-dropdown-item>删除</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                  <span>王小虎</span>
                </el-header>
                
                <el-main>
                  <el-table :data="tableData">
                    <el-table-column prop="date" label="日期" width="140">
                    </el-table-column>
                    <el-table-column prop="name" label="姓名" width="120">
                    </el-table-column>
                    <el-table-column prop="address" label="地址">
                    </el-table-column>
                  </el-table>
                </el-main>
              </el-container>
            </el-container>
          `,
          methods: {
            handleClick() {
              ElMessage('this is a vue message.')
            }
          },
          data() {
            const item = {
              date: '2016-05-02',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1518 弄'
            };
            return {
              tableData: Array(20).fill(item)
            }
          }
        })
        
        const app = createApp({
          template: '<VuePageCom/>',
          components: {
            VuePageCom
          }
        });
        // 使用element-plus 组件库
        app.use(window.ElementPlus)
        app.mount(dom);

      }
    })
  },[])

  return (
    <div id="vue-page-${appId}">
    </div>
  )
}

export default VuePage;
```

**style.css**
```
#vue-page-1016569968347693057{
  width: 100%;
  height: 100%;
}

#vue-page-1016569968347693057 .el-header {
  background-color: #B3C0D1;
  color: #333;
  line-height: 60px;
}
  
#vue-page-1016569968347693057 .el-aside {
  color: #333;
}
```