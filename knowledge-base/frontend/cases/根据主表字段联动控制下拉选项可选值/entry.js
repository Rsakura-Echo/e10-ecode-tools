


import { regOvProps } from '@weapp/utils';

// 通过监听下拉框组件，判断子选项状态
regOvProps('weappUi', 'Select', props => {
  if (props.weId === 'qjuo8q_texgmn_w3eew9_texgmn_9a4abf_bi66vs_g28s4n_6k3ebq_ytnb7f'
    && props.dropdownClassName === "weapp-form-select-list weapp-form-select__7965458933883033720") {
    if ("WeFormSDK" in window && WeFormSDK.getWeFormInstance()) {
      const weFormSDK = WeFormSDK.getWeFormInstance();
      console.info(props);
      // 获取单选框的值
      const dxk = weFormSDK.convertFieldNameToId('dxk_0df69r', 'main', true);
      const val = weFormSDK.getFieldValue(dxk);
      props.data = (props.data || []).map(x => ({
        ...x,
        disabled: (x.id === "7965458937453166186" && val === '7585614634320894757')
          || (x.id === "7965458937453666187" && val === '7585614634320194756')
      }))
      console.info(val);
    }
  }
  return props;
});
