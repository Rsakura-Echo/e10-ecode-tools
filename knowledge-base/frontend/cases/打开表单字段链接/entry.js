import { regOvProps } from '@weapp/utils';

let isFirst = true;
const ovFlowPagePropsFn = (props) => {
	
	const { isCreate, workflowId, userCurrentNodeId } = props.baseParam || {};



  //=========项目配置  Start===========
  const WFID = '1027826334484873233'; //需要功能的流程workflowid
  const NODEID = '1027826338788229124'; //需要功能的流程workflowid
  const BTN_NAME = '打开地址'; //按钮名称
  const URL_FIELD = 'lynr'; //url字段
  //const USER_FIELD = 'blyr'; //人员字段
  //=========项目配置  End===========

	if (!isCreate && workflowId == WFID && NODEID == userCurrentNodeId) {
debugger;
		const wffpSdk = window.weappWorkflow.getFlowPageSDK();
		
		isFirst && wffpSdk.ready(() => {

      const weFormSdk = window.WeFormSDK.getWeFormInstance();
      const urlFieldid = weFormSdk.convertFieldNameToId(URL_FIELD);
      //const userFieldid = weFormSdk.convertFieldNameToId(USER_FIELD);
      let urlValue = weFormSdk.getFieldValue(urlFieldid).trim();
      //let userValue = weFormSdk.getFieldValue(userFieldid).trim();
      //const currentUserid = window.TEAMS.currentUser.employeeId;

      //当前的用户，必须在userValue里，才有按钮
      //if(urlValue != '' && userValue != '' && userValue.split(',').indexOf(currentUserid) > -1){
        wffpSdk.addOperMenu({id:'openUrl',menutype:'custombtn_openUrl',title:BTN_NAME,istop:true,visible:true},'Second')
        wffpSdk.registerInterceptEvent('BeforeClickOperBtn|custombtn_openUrl', () => {  
            let _url = urlValue = weFormSdk.getFieldValue(urlFieldid).trim();
           
            if(_url == ''){
              wffpSdk.showMessage('获取链接地址异常，请检查！', 1,3);
            }else{
              window.open(_url);
            }                   
        });
      //}
		});
		isFirst = false;
	}
	return props;
}

// 对流程详情pc端生效
regOvProps('weappWorkflow', 'FPMainTab', ovFlowPagePropsFn, 0);

// 对流程详情移动端生效
regOvProps('weappWorkflow', 'MFPMainTab', ovFlowPagePropsFn, 0);


