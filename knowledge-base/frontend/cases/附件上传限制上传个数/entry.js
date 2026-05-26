

import { regOvProps } from '@weapp/utils';

// 限制个数
const limitNum = 3;

/**
 * 限制上传的文件中包含重命名文件
 */
regOvProps('weappUi', 'Upload', props => {
  if (props.weId === 'f56o40_9d1m87_xk40pb_86j9zh_l62wzb_6n3gm4_snhw9p_3r9w93_g28s4n_6k3ebq_wwdgte') {
    props.beforeUpload = (file: File) => {
      return new Promise((rs, rj) => {
        if (props.data.length >= limitNum) {
          window.weappUi.Dialog.message({ type: 'error', content: `上传个数已达到限制` });
          rj();
        } else {
          rs();
        }
      });
    }
  }
  return props;
});

