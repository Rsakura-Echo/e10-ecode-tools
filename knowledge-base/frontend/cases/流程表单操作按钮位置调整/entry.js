import { regOvProps, regOvComponent } from '@weapp/utils';
import React from 'react';
import { asyncImport } from '@weapp/ecodesdk';


const hideTopBtns  = true;//是否隐藏原标准顶部右上角的操作按钮 不隐藏改为 false 即可


const CustTable = React.lazy(() => asyncImport('${appId}', 'index'));
regOvProps('weappUi', 'Title', props => {
  if (props.weId === '3rdcst_oxa9w7_i8bbvp_vc1wev_kc1m3l_gfar3p_6xdqsn') {
    if(hideTopBtns){
      //console.info('插入操作按钮', props);
      props.buttons = [
      //...props.buttons
      ];
    }
  }
  return props;
});



regOvComponent('weappWorkflow', 'FPDevUnderForm', (Com) => {
  return React.forwardRef((props, ref) => {
    //console.info('>>>>>>>>--props', props);
    //if (props.weId === '3rdcst_oxa9w7_i8bbvp_vc1wev_kc1m3l_gfar3p_6xdqsn'&&weappWorkflow.getFlowPageSDK().getBaseParam().requestId =='943489781205499907') {
      return <React.Suspense fallback={() => {}}>
        <CustTable ref={ref} Com={Com} {...props} />
      </React.Suspense>
    //}
    return <Com ref={ref} {...props}/>
  })
});