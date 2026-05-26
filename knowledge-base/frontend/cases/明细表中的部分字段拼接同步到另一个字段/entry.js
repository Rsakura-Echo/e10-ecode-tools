


import { regOvProps } from '@weapp/utils';


regOvProps('weappUi', 'Layout', props => {

  if (props.weId === 'qjuo8q_texgmn_w3eew9_texgmn_pphlde_pk6qdu' && window.WeFormSDK) {
    const weFormSDK = WeFormSDK.getWeFormInstance();
    const dtId = weFormSDK.convertFieldNameToId('mxb_3ovstl', 'main', true);
    const dtFieldId1 = weFormSDK.convertFieldNameToId('dxwb_jw09j5', dtId, true);
    const dtFieldId2 = weFormSDK.convertFieldNameToId('sz_edaotq', dtId, true);
    const targetFieldId = weFormSDK.convertFieldNameToId('dxwb_mrpd8l', dtId, true);

    const computeDtFields = (data) => {
      const rowIndex = data.rowIndex;
      const v1 = weFormSDK.getFieldValue(`${dtFieldId1}_${rowIndex}`);
      const v2 = weFormSDK.getFieldValue(`${dtFieldId2}_${rowIndex}`);
      weFormSDK.changeFieldValue(`${targetFieldId}_${rowIndex}`, { value: `${v1},${v2}` });
    }

    weFormSDK.bindDetailFieldChangeEvent(`${dtFieldId1},${dtFieldId2}`, computeDtFields);

  }
  return props;

});

