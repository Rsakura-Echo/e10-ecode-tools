

import { regOvProps, dayjs } from '@weapp/utils';



regOvProps('weappUi', 'DatePicker', props => {

  if (props.weId === '3rdcst_oxa9w7_i8bbvp_vc1wev_kc1m3l_r1vh81_snhw9p_3r9w93_g28s4n_6k3ebq_7c2u94' && !props.minDate) {
    let weForm = undefined;
    try {
      weForm = WeFormSDK.getWeFormInstance();
    } catch(err) {
      return props;
    }
    const fieldId = weForm.convertFieldNameToId('sqrq');

    props.minDate = weForm.getFieldValue(fieldId);

  }
  
  return props;
});

