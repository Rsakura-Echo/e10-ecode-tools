
import { regOvProps } from '@weapp/utils';


regOvProps('weappUi', 'Table', props => {

  if (props.weId === '9dqne8_opqir6_eysuc9_dx6z41_ah4987_wtr8as_xerv7h_4j4qhd') {
    console.info(props);
    props.columns[0].fixed = 'left'; // 第一列固定
  }

  return props;
});



