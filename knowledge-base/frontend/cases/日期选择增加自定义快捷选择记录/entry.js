

import { regOvProps } from '@weapp/utils';


regOvProps('weappUi', 'DatePicker', props => {


  if (props.weId === 'cj2t09_pc8c2p_7i4udu') {
    const selectArr = [
      {
        type: 'cust_history_select',
        title: '自定义日期时间选择',
        startDate: '2022-06-12',
        endDate: '2022-06-16',
      }
    ]
    props.primaryKey = ['cust_history_select'];
    props.customMultiBtnData = selectArr;
    props.showMultiBtnGroup = true;
    console.info(props);
  }
  return props;
});