

import { regOvProps } from '@weapp/utils';
import React from 'react';
import { asyncImport } from '@weapp/ecodesdk';

const AsyncCom = React.lazy(() => asyncImport('${appId}', 'index'));
const CustWfChart = React.forwardRef((props, ref) => {
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
 * 在流程页面底部增加流程图
 */
regOvProps('weappUi', 'Title', props => {

  if (props.weId === "3rdcst_oxa9w7_i8bbvp_m9jfa0_csp16w_gfar3p_6xdqsn") {
    
    // 判断是否已经渲染，如果没有渲染进行渲染
    const dom = document.querySelector('.ecode-cust-wf-chart-dom');
    if (!dom) {
      execRender('.flowpageCardDetailForm', () => {
        
        const dom = document.querySelector('.ecode-cust-wf-chart-dom');
        if (dom) return;
        const pdom = document.querySelector('.flowpageCardDetailForm');
        const div = document.createElement('div');
        div.setAttribute('class', 'ecode-cust-wf-chart-dom');
        
        pdom.appendChild(div);
        ReactDOM.render(<CustWfChart />,div);
      }); 
    }

  }

  return props;

});


