
import { regOvProps } from '@weapp/utils';


regOvProps('weappUi', 'Layout', props => {

  if (props.weId === 'qjuo8q_texgmn_w3eew9_texgmn_pphlde_pk6qdu' && window.WeFormSDK) {
    const weFormSDK = WeFormSDK.getWeFormInstance();
    const fieldId1 = weFormSDK.convertFieldNameToId('dxwb_gncw90', 'main', true);
    const fieldId2 = weFormSDK.convertFieldNameToId('sz_17io0j', 'main', true);
    const targetFieldId = weFormSDK.convertFieldNameToId('dxwb_38a5a2', 'main', true);

    const computeTarget = () => {
      const v1 = weFormSDK.getFieldValue(fieldId1);
      const v2 = weFormSDK.getFieldValue(fieldId2);
      weFormSDK.changeFieldValue(targetFieldId, { value: `${v1}, ${v2}` });
    }

    weFormSDK.bindFieldChangeEvent(`${fieldId1},${fieldId2}`, computeTarget);

  }
  return props;

});
