

import { regOvProps } from '@weapp/utils';


/**
 * 添加文档外部打开按钮
 */
regOvProps('weappUi', 'Title', props => {

  if (props.weId === 'xj9ztk_n9fsi1_ktapm0_93rio8_pnhv5o') {
    props.buttons.splice(0, 0, <>
      { window.weappUi && <window.weappUi.Button onClick={() => {
        const arr = window.location.pathname.split('/');
        window.open(`/sp/doc/docDetail/${arr[arr.length - 1]}`)
      }}>
        外部打开
      </window.weappUi.Button> }
    </>)
  }

  return props;

});
