
import { regOvProps } from '@weapp/utils';


// 增加代办的className, 来实现自定义添加样式
regOvProps('weappUi', 'List', (props) => {
  if (props.weId === 'f56o40_9d1m87_ktrfwy_su9cgs_8d2ywu_rxgx04') {
    props.className = props.className + ' ecode-wf-list-custom';
  }
  return props;
});
