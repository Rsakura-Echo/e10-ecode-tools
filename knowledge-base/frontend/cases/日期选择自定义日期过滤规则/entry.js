
import { regOvProps } from '@weapp/utils';

/**
 * 控制周末不能选择
 */
const checkDateIsValid = (dateVal) => {
  const date = new Date(dateVal);
  if (date.getDay() === 0 || date.getDay() === 6) {
    return false;
  }
  return true;
}


regOvProps('weappUi', 'DatePicker', (props) => {
  if (props.weId === 'cj2t09_pc8c2p_7i4udu') {
    props.customDateFilter = (date) => {
      return checkDateIsValid(date);
    }
  }
  return props;
});
