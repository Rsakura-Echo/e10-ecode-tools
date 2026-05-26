
import { regOvProps } from '@weapp/utils';

const dataKey = 'dxwb_gncw90';

regOvProps('weappUi', 'Layout', props => {
  
  if (props.weId === 'qjuo8q_texgmn_w3eew9_texgmn_pphlde_pk6qdu' && window.WeFormSDK) {
    const weFormSDK = WeFormSDK.getWeFormInstance();
    const fieldId = weFormSDK.convertFieldNameToId(dataKey, 'main', true);
    
    weFormSDK.bindFieldChangeEvent(fieldId, (data) => {
      if ((data.value || '').indexOf('ecode') >= 0) {
        window.weappUi.Dialog.message({ type: 'error', content: '包含ecode关键字' });
      }
      console.info('变更的值 => ', data);
    })

  }
  return props;

});
