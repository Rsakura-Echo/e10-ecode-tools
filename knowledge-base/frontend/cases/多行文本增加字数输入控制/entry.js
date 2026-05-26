
import { regOvProps } from '@weapp/utils'; 



regOvProps('weappUi', 'Textarea', props => {
  if (props.weId === "3rdcst_oxa9w7_i8bbvp_vc1wev_kc1m3l_r1vh81_snhw9p_3r9w93_g28s4n_6k3ebq_oeghnb") {
    // 限制100个
    props.maxLength = 100;
  }
  return props;

});
