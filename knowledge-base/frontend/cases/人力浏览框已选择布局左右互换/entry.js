
import { regOvProps } from '@weapp/utils';

import React from 'react';

regOvProps('weappUi', 'Layout', props => {
  if (props.weId === 'f56o40_9d1m87_xk40pb_86j9zh_l62wzb_6n3gm4_snhw9p_3r9w93_g28s4n_6k3ebq_qbi62l_6na29o_tcbx0y') {
    props.children = React.Children.toArray(props.children);
    props.children = props.children.map(x => {
      if (x.props.type === 'side') {
        x.props.right = false;
      }
      return x;
    })
  }

  return props;

})
