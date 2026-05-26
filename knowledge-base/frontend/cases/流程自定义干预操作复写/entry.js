import React from 'react';
import { asyncImport } from '@weapp/ecodesdk';
import { regOvComponent } from '@weapp/utils';



const CustomInterventionCom = React.lazy(() => asyncImport('${appId}', 'customInterventionCom'));

//复写组件内容
regOvComponent('weappWorkflow', 'WfcCustomOperateContent', (Com) => {
    return React.forwardRef((props, ref) => {
      //wffpOperCustomStore
    		const { signCustomConfig,appendCustomParamFn } = props;
        window._dev_fn = appendCustomParamFn;
        const {actionType} = signCustomConfig;
        console.log("WfcCustomOperateContent_props",props);
        //详情框架显示意见输入框改写
        if(actionType == 'INTERVENTION'){
          const wffpSdk = window.weappWorkflow.getFlowPageSDK();
          const params = wffpSdk.getBaseParam();
          return (
            <>
              <CustomInterventionCom {...props} {...params} />
              <Com ref={ ref } {...props} />
            </>
          )
        }
        //不复写返回原组件
        return (<Com ref={ ref } {...props} />)
    });
});
