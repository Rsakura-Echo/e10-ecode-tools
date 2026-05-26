

import { regOvProps } from '@weapp/utils';


regOvProps('weappUi', 'MenuContent', props => {

  if (props.weId === 'f56o40_9d1m87_xk40pb_86j9zh_l62wzb_6n3gm4_c8s91e' && props.dataId === 'main' && 'weappWorkflow' in window) {

    const wffpSdk = window.weappWorkflow.getCurrentFlowPageSDK();
    const params = wffpSdk.getBaseParam();
    // console.info('流程参数 => ', params); // 可以通过流程信息判断是否屏蔽
    props.children = <div className="workflow-no-more">
      {props.children}
    </div>
  }

  return props;
})
