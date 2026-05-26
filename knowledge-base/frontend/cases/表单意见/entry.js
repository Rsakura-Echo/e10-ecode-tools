import React from 'react';
import { regOvComponent } from '@weapp/utils';
import { asyncImport } from '@weapp/ecodesdk';

//复写操作者（含代理）的展示组件
const NewWfCusSignLayoutOperateContent = React.lazy(() => asyncImport('${appId}', 'NewWfCusSignLayoutOperateContent'));
const overwriteFunction1 = (Com) => {
  return React.forwardRef((props, ref) => {
    return (
      <React.Suspense fallback={() => {}}>
        <NewWfCusSignLayoutOperateContent ref={ref} {...props} OriginCom={Com} />
      </React.Suspense>
    )
  });
}
regOvComponent('weappWorkflow', 'WfCusSignLayoutOperateContent', overwriteFunction1, 0)