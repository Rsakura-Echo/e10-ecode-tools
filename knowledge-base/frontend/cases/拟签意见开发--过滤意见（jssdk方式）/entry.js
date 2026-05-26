import React from 'react';
import { regOvProps } from '@weapp/utils';

let isFirst = true;
const ovFlowPagePropsFn = (props) => {
	
  const wffpSdk = window.weappWorkflow.getFlowPageSDK();
  
  isFirst && wffpSdk.ready(() => {
     setInterval(function(){
        const opinionIds =  wffpSdk.getDraftOpinionIds();
        let opinionList = wffpSdk.getDraftOpinionListById('985847624803901442');

        //过滤意见
        opinionList = opinionList.filter(function(data){
          var departmentid = data.department.departMentId;//部门
          var operateNodeId = data.operateNodeId;//节点
          
            //过滤逻辑
            
            //数据合法，return true；
            //数据不合法，return false

            return false;
        });

        //设置意见
        wffpSdk.filterDraftOpinionList('985847624803901442',opinionList);

     },100)
  });
  isFirst = false;
	
	//可实现原组件props复写
	return props;
}

// 对流程详情pc端生效
regOvProps('weappWorkflow', 'FPMainTab', ovFlowPagePropsFn, 0);

// 对流程详情移动端生效
regOvProps('weappWorkflow', 'MFPMainTab', ovFlowPagePropsFn, 0);