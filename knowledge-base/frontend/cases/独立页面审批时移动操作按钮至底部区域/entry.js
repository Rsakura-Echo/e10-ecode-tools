

import { regOvProps } from '@weapp/utils';
import { asyncImport } from '@weapp/ecodesdk';
import React from 'react';
import { Provider } from 'mobx-react';
import { observable, action, runInAction } from 'mobx';
import ReactDOM from 'react-dom';

const AsyncCom = React.lazy(() => asyncImport('${appId}', 'index'));


// 构造一个store, 用于更新后面的按钮元素
class WfBottomOptStore {
  @observable buttons = [];
  @action
  setButtons(btns) {
    this.buttons = btns;
  }
}

const wfBottomOptStore = new WfBottomOptStore();
// 挂载到window上便于使用
window.wfBottomOptStore = wfBottomOptStore;

const WfBottomOpt = React.forwardRef((props, ref) => {
  return <React.Suspense fallback={() => {}}>
    <Provider wfBottomOptStore={wfBottomOptStore}>
      <AsyncCom {...props} ref={ref} />
    </Provider>
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
      clearInterval(inter);
    }
  }, 100);
}

regOvProps('weappUi', 'Title', props => {
  if (props.weId === '3rdcst_oxa9w7_i8bbvp_vc1wev_kc1m3l_r1vh81_6xdqsn') {
    props.buttons = [];
    // 判断是否已经渲染，如果没有渲染进行渲染
    const dom = document.querySelector('.wf-bottom-btn-ecode');
    if (!dom) {
      execRender('.wffp-frame-dialog', () => {
        const dom = document.querySelector('.wf-bottom-btn-ecode');
        if (dom) return;
        const pdom = document.querySelector('.wffp-frame-dialog');
        const div = document.createElement('div');
        div.setAttribute('class', 'wf-bottom-btn-ecode');
        pdom.appendChild(div);
        ReactDOM.render(<WfBottomOpt />,div);
      }); 
    }
    wfBottomOptStore.setButtons(props.buttons);
  }
  return props; 

});
