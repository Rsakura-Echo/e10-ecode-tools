



import { regOvProps } from '@weapp/utils';
import React from 'react';


import { asyncImport } from '@weapp/ecodesdk';
const AsyncCom = React.lazy(() => asyncImport('${appId}', 'main'));

regOvProps('weappUi', 'Table', props => {
  if (props.weId !== 'xj9ztk_n9fsi1_ktapm0_hno5oj_06wyv8') return props;
  const fjCol = {
    dataKey: 'fj',
    dataIndex: 'fj',
    title: '附件',
    bodyRender: (record) => {

      const { docAttachments = [] } = record;
      if (docAttachments.length === 0) {
        return '无相关附件'
      }
      return <React.Fragment>
        <React.Suspense fallback={() => {}}>
          <AsyncCom doc={record} />
        </React.Suspense>
      </React.Fragment>
    }
  }
  props.columns.splice(props.columns.length - 1, 0, fjCol);
  return props;

});