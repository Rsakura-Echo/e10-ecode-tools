

import { regOvProps } from '@weapp/utils';




regOvProps('weappUi', 'Browser', props => {

  
  if (props.weId === "f56o40_9d1m87_xk40pb_86j9zh_l62wzb_6n3gm4_snhw9p_3r9w93_g28s4n_6k3ebq_qbi62l") {

    const oldChange = props.onChange;
    props.onChange = (data) => {
      window.weappUi.Dialog.confirm({
        content: '确认变更值？',
        onOk: () => oldChange(data)
      })
    }

  }

  return props;
});