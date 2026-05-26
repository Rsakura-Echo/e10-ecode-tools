import {regOvProps} from '@weapp/utils';

/**
 * 弹框默认全屏添加innerScale或者defaultInnerScale即可，innerScale优先级更高
 */
regOvProps("weappUi",'Dialog',props=>{
  if(props?.paramsFromParent?.fieldId==='1102303111958585346'){//此案例为表单字段弹框默认全屏，其他情况加限定条件即可
    props.defaultInnerScale = true
    props.innerScale = true;
  }
  return props;
})