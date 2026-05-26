
import { regOvProps } from '@weapp/utils';
import ReactDOM from 'react-dom';

const helpInfo = {
  'dxwb_ctqipy': '帮助提示'
}

regOvProps('weappUi', 'MenuContent', props => {

  const { bindKey, weId, dataId, value } = props;

  if (bindKey === 'wf_flowpage_main'
    && weId === 'f56o40_9d1m87_xk40pb_86j9zh_l62wzb_6n3gm4_c8s91e'
    && dataId === value && dataId === 'main') {
    setTimeout(() => {
      if ('WeFormSDK' in window) {
        const weFormSDK = window.WeFormSDK.getWeFormInstance();
        Object.keys(helpInfo).forEach(x => {
          const fieldid = weFormSDK.convertFieldNameToId(x, 'main', false);
          // 判断是否存在
          const helpDom = document.querySelector(`#widget_${fieldid} .weapp-form-widget-title .field-help`);
          if (helpDom) return;
          const fieldDiv: HTMLDivElement = document.querySelector(`#widget_${fieldid} .weapp-form-widget-title`);
          if (fieldDiv) {
            const helpDiv = document.createElement('div');
            helpDiv.classList.add('field-help');
            fieldDiv.appendChild(helpDiv);
            ReactDOM.render(<window.weappUi.Help title={helpInfo[x]} />, 
              helpDiv
            );
          }
        })
      }
    }, 5000);
  }

  return props;
})
