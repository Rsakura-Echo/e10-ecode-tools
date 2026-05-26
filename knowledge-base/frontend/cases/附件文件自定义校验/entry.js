


import { regOvProps } from '@weapp/utils';



regOvProps('weappUi', 'Upload', props => {
  if (props.weId === 'qjuo8q_texgmn_w3eew9_texgmn_9a4abf_bi66vs_g28s4n_abfe5k_wwdgte') {
    // 过滤扩展名
    const weFormSDK = WeFormSDK.getWeFormInstance();
    const fieldId1 = weFormSDK.convertFieldNameToId('dxwb_li1oju', 'main', true);
    const val = weFormSDK.getFieldValue(fieldId1);
    props.data = props.data.filter(x => {
      if (x.extName === val) {
        window.weappUi.Dialog.message({ type: 'info', content: '文件类型禁止上传，' + x.name })
        return false;
      }
      return true;
    })  
  }
  return props;
});
