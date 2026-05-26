
import { regOvProps } from '@weapp/utils';


regOvProps('weappUi', 'Menu', props => {

  if (props.weId === "f56o40_9d1m87_xk40pb_86j9zh_l62wzb_6n3gm4_snhw9p_3r9w93_g28s4n_6k3ebq_qbi62l_6na29o_16lxw6_7gmv1n") {
    props.data = props.data.filter(x => x.id != '3')
  }

  return props;

})
