


import { regOvProps } from '@weapp/utils';
import { asyncImport } from '@weapp/ecodesdk';
import React from 'react';

const AsyncCom = React.lazy(() => asyncImport('${appId}', 'index'));

const Com = React.forwardRef((props, ref) => {
  return <React.Suspense fallback={() => {}}>
    <AsyncCom {...props} ref={ref} />
  </React.Suspense>
})
regOvProps('weappUi', 'CommentEditText', props => {
  console.info('origin props => ', props);
  if (props.weId === 'f56o40_9d1m87_o2unox_hn5lvt_l62wzb_6n3gm4_r5zpkx_3xq1vk_06go13_rlyf8v_n9lpa7') {
    console.info('添加自定义渲染 => ', props);
    props.renderExtraConent = () => {
      return <Com onChange={props.onChange} />
    } 
  }
  return props;

});