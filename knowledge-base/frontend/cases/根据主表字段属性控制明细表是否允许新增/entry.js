


import { regOvProps } from '@weapp/utils';


regOvProps('weappUi', 'Layout', props => {

  if (props.weId === 'qjuo8q_texgmn_w3eew9_texgmn_pphlde_pk6qdu' && window.WeFormSDK) {
    const weFormSDK = WeFormSDK.getWeFormInstance();
    const xlkFieldId = weFormSDK.convertFieldNameToId('xlcd_aj7oag', 'main', true);
    const dt = weFormSDK.convertFieldNameToId('mxb_3ovstl', 'main', true);
    
    weFormSDK.bindFieldChangeEvent(xlkFieldId, (data) => {
      const { value } = data;
      if (value === '7965458937453666187') { // 清空明细
        weFormSDK.delDetailRow(dt, 'all');
      }
    });
    // 添加明细的时候判断是否允许添加
    weFormSDK.registerCheckEvent(`${WeFormSDK.OPER_ADDROW}${dt}`, (ok, fail) => {
      if (weFormSDK.getFieldValue(xlkFieldId) === '7965458937453666187') {
        window.weappUi.Dialog.message({ type: 'error', content: '禁止添加明细' });
        fail();
        return;
      }
      ok();
    })
  }
  return props;

});

