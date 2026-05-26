import { regOvProps } from '@weapp/utils';

// 是否全局启用
let isOverAll = true;

// 白名单
// 合同管理：1013739584832372815
// poc:1019532701212983300
const workflowIds = ["1019532701212983300"]


regOvProps('weappUi', 'Button', (props) => {
  // 頁面控制
  const pathname = window.location.pathname;
  if(pathname.indexOf("/sp/workflow/flowpage")<0)return;
  if(window.weappWorkflow == null)return;
  if(window.weappWorkflow.getFlowPageSDK == null)return;

  const wffpSdk = window.weappWorkflow.getFlowPageSDK();
  const params = wffpSdk.getBaseParam();
  let workflowId = params.workflowId
  if(workflowIds.includes(workflowId) || isOverAll){
    if(props.title == "提交" || props.title == "批准"){
      props.style = {"background-color": "red"}
    }    
  }
  return props;
}, 0);