
import { regOvProps } from '@weapp/utils';
import { asyncImport } from '@weapp/ecodesdk';
import React from 'react';
import ReactDOM from 'react-dom';

const EcodeComAsync = React.lazy(() => asyncImport('${appId}', 'index'));
const EcodeCom = React.forwardRef((props, ref) => {
  return <React.Suspense fallback={() => {}}>
    <EcodeComAsync />
  </React.Suspense>
})

const execCode = () => {
  const comDiv = document.querySelector('#ad7c506c0ff44443b69149143c1496f6 .ebcoms-customer-html-empty');
  if (comDiv) {
    ReactDOM.render(<EcodeCom />, comDiv)
  }
} 

// 通过eb设计器中 挂载一个自定义页面，然后ecode替换这个自定义组件

let execTimes = 0;
regOvProps('weappEBpage', 'PageView', (props) => {
  if (769264166432301174 == props.pageId && execTimes++ === 0) {
    let times = 0;
    const interval = setInterval(() => {
      times++;
      const dom = document.querySelector('#ebpage_769264166432301174 #ad7c506c0ff44443b69149143c1496f6');
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

