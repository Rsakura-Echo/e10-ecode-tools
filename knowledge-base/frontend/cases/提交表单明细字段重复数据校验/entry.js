

import { regOvProps } from '@weapp/utils';


const handleSubmit = (successFn: Function, failFn: Function) => {
  const weForm = WeFormSDK.getWeFormInstance();
  // 判断明细中是否有重复的字段值
  const detailMark = weForm.convertFieldNameToId("mxb_d8zchf", "main", true);
  const rowIndexStr = weForm.getDetailAllRowIndexStr(detailMark);
  const arr = rowIndexStr.split(',');
  const mx_bz = weForm.convertFieldNameToId('dxwb_d7uzmn');
  const flags = [];
  for (let i = 0; i< arr.length; i++) {
    const val = weForm.getFieldValue(`${mx_bz}_${arr[i]}`);
    if (flags.includes(val)) {
      weappUi.Dialog.message({ content: '存在重复值：' + val, type: 'error' });
      failFn();
      return;
    } else {
      flags.push(val);
    }
  };
  successFn();
}
let times = 0;
regOvProps('weappUi', 'Title', props => {

  if (props.weId === 'f56o40_9d1m87_ktrfwy_su9cgs_l62wzb_6n3gm4_0yfg0p_pnhv5o') {

    if (times++ > 0) {
      return props;
    }
    let i = 0;
    const inter = setInterval(() => {
      try {
        const weFormSdk = WeFormSDK.getWeFormInstance();

        // 注册提交事件
        weFormSdk.registerCheckEvent(window.WeFormSDK.OPER_SUBMIT, handleSubmit);

        clearInterval(inter);
      } catch(err) {}
      if (i++ > 100) {
        clearInterval(inter);
      }
    }, 100);

  }


  return props;
});

