

import { regOvProps } from '@weapp/utils';
import React from 'react';
import { asyncImport } from '@weapp/ecodesdk';

const AsyncCom = React.lazy(() => asyncImport('${appId}', 'index'));
const Com = React.forwardRef((props, ref) => {
  return <React.Suspense fallback={() => {}}>
    <AsyncCom {...props} ref={ref} />
  </React.Suspense>
})


const execRender = (className, callback) => {
  let t = 0;
  const inter = setInterval(() => {
    const dom = document.querySelector(className);
    if (dom) {
      clearInterval(inter);
      callback();
    }
    if (t++ > 50) {
      console.error("获取节点" + className + ", 超时")
      clearInterval(inter);
    }
  }, 100);
}

/**
 * 在流程页面插入Dom
 */
regOvProps('weappUi', 'Title', props => {
  if (props.weId === "3rdcst_oxa9w7_i8bbvp_vc1wev_kc1m3l_r1vh81_6xdqsn") {
    
    // 判断是否已经渲染，如果没有渲染进行渲染
    const dom = document.querySelector('.ecode-ext-content-dom');
    if (!dom) {
      execRender('.wffp-frame-main', () => {
        
        const dom = document.querySelector('.ecode-ext-content-dom');
        if (dom) return;
        const pdom = document.querySelector('.wffp-frame-content');
        const div = document.createElement('div');
        div.setAttribute('class', 'ecode-ext-content-dom');
        // 在末尾追加
        pdom.appendChild(div);
        const cdom = document.querySelector('.wffp-frame-content');
        cdom.classList.add('wf-content-with-ext');
        ReactDOM.render(<Com />, div);
      }); 
    }

  }

  return props;

});


