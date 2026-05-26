


import { regOvProps } from '@weapp/utils';


regOvProps('weappUi', 'Layout', props => {

  if (props.weId === 'qjuo8q_texgmn_w3eew9_texgmn_pphlde_pk6qdu' && window.WeFormSDK) {
    const weFormSDK = WeFormSDK.getWeFormInstance();
    const dt = weFormSDK.convertFieldNameToId('mxb_3ovstl', 'main', true);
    const dhwbFieldId = weFormSDK.convertFieldNameToId('dxwb_38a5a2', 'main', true);

    // 添加明细的时候判断是否允许添加
    weFormSDK.registerCheckEvent(`${WeFormSDK.OPER_ADDROW}${dt}`, (ok, fail) => {
      if (weFormSDK.getFieldCurViewAttr(dhwbFieldId) === '1') {
        window.weappUi.Dialog.message({ type: 'error', content: '禁止添加明细' });
        fail();
        return;
      }
      ok();
    })
  }
  return props;

});

