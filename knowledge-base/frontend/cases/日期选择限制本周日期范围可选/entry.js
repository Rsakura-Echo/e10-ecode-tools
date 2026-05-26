

import { regOvProps } from '@weapp/utils';


regOvProps('weappUi', 'DatePicker', props => {
  if (props.weId === "cj2t09_pc8c2p_7i4udu") {
    const date = new Date();
    const timstamp = date.getTime();
    const t = timstamp - date.getDay() * 24 * 60 * 60 * 1000;
    const minDate = new Date(t);
    // 控制最小日期
    props.minDate = minDate;
    props.maxDate = new Date();
  }
  return props;
});