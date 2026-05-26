


import { regOvProps } from '@weapp/utils';

import React from 'react';

import { asyncImport } from '@weapp/ecodesdk';
import ReactDOM from 'react-dom';

const ScanComAsync = React.lazy(() => asyncImport('${appId}', 'index'));

const checkHas = (fieldId) => {
  const doms = document.querySelectorAll('ecode-field-scan');
  let flag = false;
  doms.forEach(x => {
    if (x.parentElement.id === `widget_${fieldId}`) {
      flag = true;
    }
  });
  return flag;
}

const filedId = '3505864733346774339';

const addScan = (fieldId) => {
  const p = document.querySelector(`#widget_${fieldId}`);
  if (p) {
    const div = document.createElement('div');
    div.classList.add('ecode-field-scan');
    ReactDOM.render(<React.Suspense fallback={() => {}}>
      <ScanComAsync fieldId={filedId} />
    </React.Suspense>, div);
    p.appendChild(div);
    return true;
  }
  return false;
}

regOvProps('weappDesigner', 'DroppableView', props => {

  if (props.weId === "3rdcst_oxa9w7_af1w56_6rw4jw_9eb5e8_aua90q_bcw4pc_gi2t20_p06x7i_tij3ya_syvjg3_x3p9qc_3r9w93_g28s4n") {
    console.info('check')
    if (checkHas(filedId)) return props;
    let times = 0;
    const inter = setInterval(() => {
      try {
        // const weForm = WeFormSDK.getWeFormInstance();
        if (!checkHas(filedId)) {
          addScan(filedId) && clearInterval(inter);
        }
      } catch(err) {}
      if (times++ > 100) {
        clearInterval(inter);
      }
    }, 100);
  }
  return props;
});



