


import { regOvProps } from '@weapp/utils';


regOvProps('weappUi', 'Layout', props => {

  if (props.weId === 'qjuo8q_texgmn_w3eew9_texgmn_pphlde_pk6qdu' && window.WeFormSDK) {
    const weFormSDK = WeFormSDK.getWeFormInstance();
    const dtId = weFormSDK.convertFieldNameToId('mxb_3ovstl', 'main', true);
    const dtFieldId = weFormSDK.convertFieldNameToId('dxwb_jw09j5', dtId, true);
    const targetFieldId = weFormSDK.convertFieldNameToId('dxwb_38a5a2', 'main', true);

    const computeDtFields = () => {
      // 获取明细的所有行下标
      console.info(dtId, weFormSDK.getDetailAllRowIndexStr(dtId));
      const ids = (weFormSDK.getDetailAllRowIndexStr(dtId) || '').split(',');
      let val = '';
      for (const id of ids) {
        val += weFormSDK.getFieldValue(`${dtFieldId}_${id}`);
      }
      weFormSDK.changeFieldValue(targetFieldId, { value: val });
    }

    weFormSDK.bindDetailFieldChangeEvent(dtFieldId, computeDtFields);

  }
  return props;

});

