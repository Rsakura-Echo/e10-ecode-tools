

import { regOvProps } from '@weapp/utils';

const setDisplay = (num, val) => {
  const ths = document.querySelectorAll('#widget_7966628558839820493 thead th');
  for (let i = 0; i < ths.length; i++) {
    if (i === num) {
      ths[i].style.display = val;
    }
  }
  const trs = document.querySelectorAll('#widget_7966628558839820493 tbody tr');
  for (let i = 0; i < trs.length; i++) {
    const tds = trs[i].querySelectorAll('td');
    for (let j = 0; j < tds.length; j++) {
      if (j === num) {
        tds[j].style.display = val;
      }
    }
  }
}

const handleSum = () => {
  const weForm = WeFormSDK.getWeFormInstance();
  const textFieldMark = weForm.convertFieldNameToId("dxk_qzvvit");
  const value = weForm.getFieldValue(textFieldMark);
  if (value === '786346892170133508') { // 显示全部
    setDisplay(2, 'table-cell');
    setDisplay(3, 'table-cell');
  } else if (value === '786346892170133509') { // 列1
    setDisplay(2, 'table-cell');
    setDisplay(3, 'none');
  } else { // 列2
    setDisplay(2, 'none');
    setDisplay(3, 'table-cell');
  }

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
        const weForm = WeFormSDK.getWeFormInstance();

        // 注册 主表类型切换事件； 明细行类型、金额变更事件
        // 主表类型 xlcd_1bylke
        const textFieldMark = weForm.convertFieldNameToId("dxk_qzvvit");
        weForm.bindFieldChangeEvent(`${textFieldMark}`, handleSum);

        clearInterval(inter);
      } catch(err) {}
      if (i++ > 100) {
        clearInterval(inter);
      }
    }, 100);

  }


  return props;
});

