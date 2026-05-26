
import { regOvProps } from '@weapp/utils';



regOvProps('weappUi', 'Upload', props => {
  if (props.weId === 'f56o40_9d1m87_xk40pb_86j9zh_l62wzb_6n3gm4_snhw9p_3r9w93_g28s4n_6k3ebq_wwdgte') {
    // 添加额外的上传认证参数
    props.commonParams = {
      "cus_auth": '自定义认证参数信息'
    }
  }
  return props;
});

