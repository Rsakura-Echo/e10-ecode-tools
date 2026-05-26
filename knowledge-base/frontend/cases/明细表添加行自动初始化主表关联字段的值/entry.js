


import { regOvProps } from '@weapp/utils';


regOvProps('weappUi', 'Layout', props => {

  if (props.weId === 'qjuo8q_texgmn_w3eew9_texgmn_pphlde_pk6qdu' && window.WeFormSDK) {
    const weFormSDK = WeFormSDK.getWeFormInstance();
    const main = weFormSDK.convertFieldNameToId('dxwb_t30fqq', 'main', true);
    const dt = weFormSDK.convertFieldNameToId('mxb_3ovstl', 'main', true);
    const dtlabel = weFormSDK.convertFieldNameToId('dxwb_jw09j5', dt, true);
    
    // 添加明细行之后，初始化字段数据
    weFormSDK.registerAction(`${WeFormSDK.ACTION_ADDROW}${dt}`, (index) => {
      weFormSDK.changeFieldValue(`${dtlabel}_${index}`, {
        value: weFormSDK.getFieldValue(main)
      })
    });
  }
  return props;

});

