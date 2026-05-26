


import { regOvProps } from '@weapp/utils';
import React from 'react';
import { asyncImport } from '@weapp/ecodesdk';

const AsyncCom = React.lazy(() => asyncImport('${appId}', 'index'));

regOvProps('weappUi', 'Table', props => {


  if (props.weId === "903dhc_leid4e_794hn9_eqqemv_0f9rx9") {
    if (Array.isArray(props.columns)) {
      props.columns.splice(2, 0, {
        title: '签到',
        width: '100px',
        bodyRender: (record) => {
          return <div>
            <React.Suspense fallback={() => {}}>
              <AsyncCom record={record} />
            </React.Suspense>
          </div>
        }
      })
    }
  }

  return props;

})