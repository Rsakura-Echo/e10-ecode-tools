import { regHook } from '@weapp/utils';
let isEnable = true;//功能总开关
/**
 * E10流程详情组件复写文档地址：https://weapp.eteams.cn/ecode/playground/doc/share/view/981360079733604353
 */


const fn = (params)=>{
	const { isCreate,isMobile,workflowId,requestId,urlParams,way,originFn } = params;
  debugger;
  if(!isEnable||isCreate){
    originFn();
    return;
  }
  console.log("dev__params",params);
  const {currentUser={}} = TEAMS;
  const {employeeId='',tenantKey4Im=''} = currentUser;
  var axios = require('axios');
  var data = JSON.stringify({requestId:requestId,workflowId:workflowId,employeeId:employeeId,tenantKey:tenantKey4Im,isMobile:isMobile?"1":"0"});
  var config = {
      method: 'post',
      url: '/api/secondev/flow/cusflowjump/listFlowJumpAddr',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
  };
  axios(config).then(function (response) {
      console.log("res",JSON.stringify(response.data));
      let data = response.data;
      if(data.code =='200' && data?.data?.jumpUrl!=''){
        if(!isMobile){
          window.open(data?.data?.jumpUrl);
        }else{
          weappUtils.webOpenSDK.openHref({url:data?.data?.jumpUrl})
        }
      }else{
        //继续执行原打开逻辑
        originFn();
      }
      
  }).catch(function (error) {
      console.log(error);
  });
}

regHook('weappWorkflow', 'OpenFlowPageWay', (params)=>{
  fn(params);
});

regHook('weappWorkflow', 'MOpenFlowPageWay', (params)=>{
  fn(params);
});