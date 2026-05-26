


import { regOvProps } from '@weapp/utils';


regOvProps('weappUi', 'Menu', props => {

  if (props.weId === '3rdcst_oxa9w7_i8bbvp_vc1wev_kc1m3l_gfar3p_j21eon_m4r0t8_aeh7j2') {
    props.data = props.data.filter(x => x.id !== 'view');
  }

  return props;
});

