
import { regOvProps } from '@weapp/utils';

const dataKey = 'dxwb_gncw90';

regOvProps('weappUi', 'Layout', props => {
  
  if (props.weId === 'qjuo8q_texgmn_w3eew9_texgmn_pphlde_pk6qdu' && window.WeFormSDK) {
    const weFormSDK = WeFormSDK.getWeFormInstance();
    const fieldId = weFormSDK.convertFieldNameToId(dataKey, 'main', true);
    const targetFieldId = weFormSDK.convertFieldNameToId('dxwb_38a5a2', 'main', true);
    
    weFormSDK.bindFieldChangeEvent(fieldId, (data) => { // 同步该字段值的更新到指定的字段上
      weFormSDK.changeFieldValue(targetFieldId, { value: data.value });
    });

  }
  return props;

});
