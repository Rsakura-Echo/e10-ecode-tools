
import { regOvProps } from '@weapp/utils';



regOvProps('weappUi', 'CommentEditText', props => {

  if (props.weId === '3rdcst_oxa9w7_i8bbvp_vc1wev_kc1m3l_r1vh81_r5zpkx_3xq1vk_06go13_rlyf8v_n9lpa7') {
    // console.info('props ->', props);
    if (props.richTextProps) {
      props.richTextProps = {
        ...props.richTextProps,
        defaultValue: '默认签批意见内容'
      }
    } else {
      props.richTextProps = {
        defaultValue: '默认签批意见内容'
      }
    }
  }

  return props;

});