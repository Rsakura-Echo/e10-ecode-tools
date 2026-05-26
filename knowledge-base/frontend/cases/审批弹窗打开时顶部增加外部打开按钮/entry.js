

import { regOvProps } from '@weapp/utils';


/**
 * 添加审批外部打开按钮
 */
regOvProps('weappUi', 'Title', props => {

  if (props.weId === 'f56o40_9d1m87_crs1an_lcktvw_l62wzb_6n3gm4_0yfg0p_pnhv5o') {
    props.buttons.splice(0, 0, <>
      { window.weappUi && <window.weappUi.Button onClick={() => {
        const arr = window.location.pathname.split('/');
        window.open(`/sp/workflow/adapter/flowpage/view/${arr[arr.length - 1]}`)
      }}>
        外部打开
      </window.weappUi.Button> }
    </>)
  }

  return props;

});
