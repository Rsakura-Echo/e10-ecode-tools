import React from 'react';
import {clsPrefix} from './config/config';
import ViewContent from './ViewContent';

const View = (props) => {
  const { config } = props;
  const getInstance = ()=>{
    return {};
  }
  const onPaginationChange = ()=>{

  }
  return (
    <ViewContent
      weId={`${props.weId || ''}_m8h9qo`}
      config={props.config}
      getInstance={getInstance}
      onPaginationChange={onPaginationChange}
      showType="view"
    />
  );
};

//一般情况下直接 export default View即可，用下面的导出方式主要使用标准的标题和底部栏的功能
export default weappEbdcoms.createView().default('DocumentListTest')(View);