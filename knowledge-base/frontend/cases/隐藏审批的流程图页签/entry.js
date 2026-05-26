

import { regOvProps } from '@weapp/utils';


regOvProps('weappUi', 'Menu', props => {

  if (props.weId === '3rdcst_oxa9w7_i8bbvp_vc1wev_kc1m3l_r1vh81_6xdqsn_4d6brw') {
    props.data = props.data.filter(x => x.id !== 'chart');
  }

  return props;
});
