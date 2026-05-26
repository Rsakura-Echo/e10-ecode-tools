

import { regOvProps } from '@weapp/utils';

/**
 * 限制上传的文件中包含重命名文件
 */
regOvProps('weappUi', 'Upload', props => {
  if (props.weId === 'f56o40_9d1m87_xk40pb_86j9zh_l62wzb_6n3gm4_snhw9p_3r9w93_g28s4n_6k3ebq_wwdgte') {
    props.beforeUpload = (file: File) => {
      return new Promise((rs, rj) => {
        let flag = true;
        let filename = '';
        props.data.forEach(x => {
          if (x.name === file.name) {
            flag = false;
            filename = file.name;
          }
        });
        if (flag) {
          rs();
        } else {
          window.weappUi.Dialog.message({ type: 'error', content: `文件[${filename}]已存在！` })
          rj();
        }
      });
    }
  }
  return props;
});

