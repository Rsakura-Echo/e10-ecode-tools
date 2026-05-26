import React from 'react';
import { regOvProps,regOvComponent } from '@weapp/utils';
import { asyncImport } from '@weapp/ecodesdk';

let isFirst = true;
const ovFlowPagePropsFn = (props) => {
	
  const wffpSdk = window.weappWorkflow.getFlowPageSDK();
  

  isFirst && wffpSdk && wffpSdk.registerHookEvent("SignInFormLoadComplete",function(config){
    // console.log("wcq:::config=",config);
    const signLayoutIds =  wffpSdk.getSignLayoutIds();
    if(signLayoutIds.length>0){
      signLayoutIds.map(item=>{
        const layoutid = item.componentId;
        const layout = wffpSdk.getSignLayoutByIds(layoutid);            
        layout.map(it=>{
          //过滤意见
          it.groupItemEntities = it.groupItemEntities.filter(item=>item.customInfoMap?.isDefaultShow == "1");       
              
        })
        wffpSdk.filterSignLayout(layoutid,layout);
      })         
    }    
  },true)
  isFirst = false;
	//可实现原组件props复写
	return props;
}

const NewWfSignLayoutContent = React.lazy(() => asyncImport('${appId}', 'NewWfSignLayoutContent'));
const overwriteFunction2 = (Com) => {
  console.log("WfSignLayoutContent...")
  return React.forwardRef((props, ref) => {
    return (
      <React.Suspense fallback={() => {}}>
        <NewWfSignLayoutContent ref={ref} {...props} OriginCom={Com} />
      </React.Suspense>
    )
  });
}



// 对流程详情pc端生效
regOvProps('weappWorkflow', 'FPMainTab', ovFlowPagePropsFn, 0);

// 对流程详情移动端生效
// regOvProps('weappWorkflow', 'MFPMainTab', ovFlowPagePropsFn, 0);

regOvComponent('weappWorkflow', 'WfSignLayoutContent', overwriteFunction2, 0)