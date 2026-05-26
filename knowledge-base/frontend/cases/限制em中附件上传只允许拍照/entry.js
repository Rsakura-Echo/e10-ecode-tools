

import { regOvProps } from '@weapp/utils';


regOvProps('weappUi', 'MUpload', props => {

  console.info(props);
  if (props.weId === "3rdcst_oxa9w7_af1w56_6rw4jw_9eb5e8_aua90q_bcw4pc_gi2t20_p06x7i_tij3ya_syvjg3_x3p9qc_3r9w93_g28s4n_6k3ebq_9zu6p5") {
    props.sourceType = ['camera'];
  }
  return props;
});