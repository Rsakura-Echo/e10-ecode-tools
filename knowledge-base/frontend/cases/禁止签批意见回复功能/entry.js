


import { regOvProps } from '@weapp/utils';

/**
 * 禁止流程审批签批意见的回复
 */
regOvProps('weappUi', 'Comment', props => {

  if (props.weId === "3rdcst_oxa9w7_i8bbvp_m9jfa0_csp16w_gfar3p_j21eon_m4r0t8") {
    props.optionConfig = (data, defaultOpts) => {
      
      return defaultOpts.filter(x => x !== 'reply');
    }
  }

  return props;

});

