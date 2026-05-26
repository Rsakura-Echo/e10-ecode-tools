

import { regOvProps } from '@weapp/utils';

let times = 0;

const handleSum = () => {
  const weForm = WeFormSDK.getWeFormInstance();
  // 获取主表类型
  const lx = weForm.convertFieldNameToId("xlcd_1bylke");
  
  const zje = weForm.convertFieldNameToId("sz_uowgq6");
  const lxVal = weForm.getFieldValue(lx);
  const valArr = {
    ['786338791904993286']: '786338791904993280',
    ['786338791904993287']: '786338791904993281'
  }
  // 遍历所有明细行 field7966628363880120469
  const detailMark = weForm.convertFieldNameToId("mxb_d8zchf", "main", true);
  const rowIndexStr = weForm.getDetailAllRowIndexStr(detailMark);
  const arr = rowIndexStr.split(',');
  const mx_lx = weForm.convertFieldNameToId('lx');
  const mx_je = weForm.convertFieldNameToId('sz_cxgrj5');
  let sum = 0;
  for (let i = 0; i< arr.length; i++) {
    if (arr[i]) {
      if (weForm.getFieldValue(`${mx_lx}_${arr[i]}`) === valArr[lxVal]) {
        sum += parseInt(weForm.getFieldValue(`${mx_je}_${arr[i]}`) || 0);
      }
    }
  }
  weForm.changeFieldValue(zje, { value: sum });
}

regOvProps('weappUi', 'Title', props => {

  if (props.weId === 'f56o40_9d1m87_ktrfwy_su9cgs_l62wzb_6n3gm4_0yfg0p_pnhv5o') {

    if (times++ > 0) {
      return props;
    }
    let i = 0;
    const inter = setInterval(() => {
      try {
        const weForm = WeFormSDK.getWeFormInstance();

        // 注册 主表类型切换事件； 明细行类型、金额变更事件
        // 主表类型 xlcd_1bylke
        const textFieldMark = weForm.convertFieldNameToId("xlcd_1bylke");
        weForm.bindFieldChangeEvent(`${textFieldMark}`, handleSum);
        // 明细类型、金额字段
        const lx = weForm.convertFieldNameToId('lx');
        const je = weForm.convertFieldNameToId('sz_cxgrj5');
        weForm.bindFieldChangeEvent(`${lx},${je}`, handleSum);

        clearInterval(inter);
      } catch(err) {}
      if (i++ > 100) {
        clearInterval(inter);
      }
    }, 100);

  }

  return props;
});

