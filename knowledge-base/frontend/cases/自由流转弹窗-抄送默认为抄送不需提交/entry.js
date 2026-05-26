import { regOvProps } from '@weapp/utils';


//默认抄送不需提交
regOvProps("weappWorkflow", "WfcAddStepList", (props) => {
  if(props.wffpOperSubmitStore){
    const oldFn = props.wffpOperSubmitStore?.setNodeInfo;

    props.wffpOperSubmitStore.setNodeInfo = function(param){
      param.map(function(p2){
        if(p2.nodeId.indexOf('nodeId_freeInit_') == -1){          
          p2.ccSignType = "3";
        }
      })
      oldFn(param);
    }
  }
  return props;
}, 0);


//默认抄送不需提交（移动）
regOvProps("weappWorkflow", "MWfcAddStepList", (props) => {
  if(props.mwffpOperSubmitStore){
    const oldFn = props.mwffpOperSubmitStore?.setNodeInfo;

    props.mwffpOperSubmitStore.setNodeInfo = function(param){
      param.map(function(p2){
        if(p2.nodeId.indexOf('nodeId_freeInit_') == -1){          
          p2.ccSignType = "3";
        }
      })
      oldFn(param);
    }
  }
  return props;
}, 0);