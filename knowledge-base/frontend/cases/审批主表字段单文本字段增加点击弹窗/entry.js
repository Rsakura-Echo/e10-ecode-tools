

import { regOvProps } from '@weapp/utils';
import { asyncImport } from '@weapp/ecodesdk';
import React from 'react';
import ReactDOM from 'react-dom';

const ComAsync = React.lazy(() => asyncImport('${appId}', 'index'));


let times = 0;



const execCode = (fieldId) => {
  // 添加节点并增加弹窗dom
  const div = document.createElement('div');
  div.setAttribute('class', 'form-modal-btn');
  const body = document.querySelector(`#widget_${fieldId} .weapp-form-input-wrapper`);
  body.appendChild(div);
  ReactDOM.render(<React.Suspense fallback={() => {}}>
    <ComAsync />
  </React.Suspense>, div);
}


regOvProps('weappUi', 'Title', props => {

  if (props.weId === '3rdcst_oxa9w7_i8bbvp_vc1wev_kc1m3l_r1vh81_6xdqsn') {

    if (times++ > 0) {
      return props;
    }
    let i = 0;
    const inter = setInterval(() => {
      try {
        const weForm = WeFormSDK.getWeFormInstance();
        const fieldId = weForm.convertFieldNameToId('dcfx', 'main', false);
        if (fieldId) {
          execCode(fieldId);
          clearInterval(inter);
        }
      } catch(err) {}
      if (i++ > 100) {
        clearInterval(inter);
      }
    }, 100);

  }

  return props;
});

