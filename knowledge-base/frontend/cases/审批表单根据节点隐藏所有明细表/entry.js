


/**
 * 审批根据当前的节点，隐藏所有明细表
 */

import { regOvProps } from '@weapp/utils';



let times = 0;
regOvProps('weappUi', 'Title', props => {

  if (props.weId === '3rdcst_oxa9w7_i8bbvp_vc1wev_kc1m3l_gfar3p_6xdqsn') {

    if (times++ > 0) {
      return props;
    }
    let i = 0;
    const inter = setInterval(() => {
      try {
        const wfSdk = weappWorkflow.getCurrentFlowPageSDK();
        // 隐藏明细表
        const { userCurrentNodeId, workflowId } = wfSdk.getBaseParam();
        if (workflowId && workflowId !== "786338220477595649") {
          clearInterval(inter);
          return;
        }
        if (userCurrentNodeId === "786338220477595654") {
          if (document.querySelectorAll('.weapp-form-detail-table-wrapper').length > 0) { 
            // 结束节点
            // 隐藏明细表
            const dts = document.querySelectorAll('.weapp-form-detail-table-wrapper');
            for (let j = 0; j < dts.length; j++) {
              dts[j].style.display = 'none';
            }
            clearInterval(inter);
          }
        }
      } catch(err) {}
      if (i++ > 100) {
        clearInterval(inter);
      }
    }, 100);

  }

  return props;
});


