import React from 'react';
import { regOvComponent } from '@weapp/utils';
import { asyncImport } from '@weapp/ecodesdk';
import {enable,customFieldConfig}  from './config/config';

const CustomOperator = React.lazy(() => asyncImport('${appId}', 'customOperator'));

regOvComponent('weappWorkflow', 'wfpOperatorExtendDevOutItem', (Com) => {
  return React.forwardRef((props, ref) => {
    console.log("wfpOperatorExtendDevOutItem____props",props);
    if(enable && !props._Override2){
      props._Override2 = true;
      let {workflowId,nodeId,editExtendData,otherItems,onThridChange,triggerRef} = props;
      let dataParams = {
          "nodeidsCondition": 3,
          "nodeAttrsCondition": 3,
          "nodeAttrs": "1,3,2",
          "workflowId": workflowId,
          "nodeids": nodeId
      };
      let formFieldDataParams = {
          "tab": "formField",
          "typeTag": "WF_HRMRESOURCE,WF_MAIN",
          "workflowId": workflowId
      };
       return (
        <React.Suspense fallback={() => {}}>
          <CustomOperator {...props} ref={ref} otherItems={otherItems} onThridChange={onThridChange} triggerRef={triggerRef} nodeDataParams={dataParams} editExtendData={editExtendData} formFieldDataParams={formFieldDataParams} customFieldConfig={customFieldConfig}/>
          <Com {...props} />
        </React.Suspense>
      )
    }
    return <Com {...props} /> 
  });
}, 1);






