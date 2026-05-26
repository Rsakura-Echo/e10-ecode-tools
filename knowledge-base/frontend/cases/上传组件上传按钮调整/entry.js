

import { regOvProps } from '@weapp/utils';


const renderButton = (eventProps, inputDom) => {
  return <div className="cus-upload-body" onClick={() => {
    eventProps.onClick();
  }}>
    {inputDom}
    <div className="cus-upload-btn">
      { window.weappUi && <window.weappUi.Icon name="Icon-upload02" /> }
      点击上传
    </div>
  </div>;
}

/**
 * 复写上传按钮
 */
regOvProps('weappUi', 'Upload', props => {
  if (props.weId === 'f56o40_9d1m87_xk40pb_86j9zh_l62wzb_6n3gm4_snhw9p_3r9w93_g28s4n_6k3ebq_wwdgte') {
    props.renderUploadButton = renderButton;
  }
  return props;
});

