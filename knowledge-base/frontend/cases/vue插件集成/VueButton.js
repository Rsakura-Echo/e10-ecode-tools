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