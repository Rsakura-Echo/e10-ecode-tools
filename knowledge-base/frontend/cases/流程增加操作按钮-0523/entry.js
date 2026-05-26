
import { asyncImport } from '@weapp/ecodesdk';
import { regOvProps, regReactChildren, regOvComponent } from '@weapp/utils';
import React from 'react';

const AddButton = React.lazy(() => asyncImport('${appId}', 'AddButton.js'));

const workflowIds = ['717847489528717335'];

// 打开流程增加操作按钮
// let times = 0;
regOvProps('weappUi', 'Title', props => {
  if (props.weId === 'f56o40_9d1m87_xk40pb_86j9zh_l62wzb_6n3gm4_0yfg0p_pnhv5o') {
    // console.info('插入操作按钮', props);
    props.buttons = [
      <React.Suspense fallback={() => { }}>
        <AddButton />
      </React.Suspense>, ...props.buttons
    ];
  }
  return props;
});

// regOvComponent('weappUi', 'LayoutCol', (com) => {
  // console.info('over');
  // return com;
// });