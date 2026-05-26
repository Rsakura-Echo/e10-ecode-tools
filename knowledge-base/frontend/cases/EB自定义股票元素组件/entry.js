




import { regOvProps } from '@weapp/utils';
import { asyncImport } from '@weapp/ecodesdk';
import React from 'react';
import ReactDOM from 'react-dom';


const pageId = '774456872296497152'; // 复写的EB页面
const comId = 'd820aa7b661b460b876b692854f3627c'; // 复写的EB组件

const EcodeComAsync = React.lazy(() => asyncImport('${appId}', 'com'));
const EcodeCom = React.forwardRef((props, ref) => {
  return <React.Suspense fallback={() => {}}>
    <EcodeComAsync />
  </React.Suspense>
})

const execCode = () => {
  const comDiv = document.querySelector(`#${comId} .ebcoms-customer-html-empty`);
  if (comDiv) {
    ReactDOM.render(<EcodeCom />, comDiv)
  }
} 

// 通过eb设计器中 挂载一个自定义页面，然后ecode替换这个自定义组件

regOvProps('weappEBpage', 'PageView', (props) => {
  if (pageId == props.pageId) {
    let times = 0;
    const interval = setInterval(() => {
      times++;
      const dom = document.querySelector(`#${comId} .ebcoms-customer-html-empty`);
      if ('ebuilderSDK' in window && dom) {
        clearInterval(interval);
        // 执行业务逻辑
        execCode();
      }
      if (times++ > 50) { //超时 自动停止
        console.error('${appId} 超时结束 未触发');
        clearInterval(interval);
      }
    }, 100);
  }
  return props;
}, 0);

