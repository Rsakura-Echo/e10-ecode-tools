
import { regOvProps } from '@weapp/utils';

const dataKey = 'mxb_3ovstl';

// 根据下拉框的值变更，控制其他字段的显示属性

regOvProps('weappUi', 'Layout', props => {
  
  if (props.weId === 'qjuo8q_texgmn_w3eew9_texgmn_pphlde_pk6qdu' && window.WeFormSDK) {
    const weFormSDK = WeFormSDK.getWeFormInstance();
    const dtId = weFormSDK.convertFieldNameToId(dataKey, 'main', true);
    const targetFieldId = weFormSDK.convertFieldNameToId('sz_17io0j', 'main', true);

    weFormSDK.registerCheckEvent(`${WeFormSDK.OPER_ADDROW}${dtId}` , (ok, fail) => { 
      // 获取目标字段的值
      const val = weFormSDK.getFieldValue(targetFieldId) || 0;
      const curNum = weFormSDK.getDetailRowCount(dtId);
      if (curNum + 1 > val) {
        weappUi.Dialog.message({ type: 'error', content: '超过动态明细行数上限' });
        fail();
        return;
      }
      ok();
    });

  }
  return props;

});
