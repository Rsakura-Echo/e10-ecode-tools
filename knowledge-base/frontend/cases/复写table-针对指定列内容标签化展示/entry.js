

import { regOvProps } from '@weapp/utils';

regOvProps('weappUi', 'Table', props => {
  if (props.weId === '9dqne8_opqir6_eysuc9_dx6z41_ah4987_wtr8as_xerv7h_4j4qhd') {
    if (Array.isArray(props.columns) && props.columns.length > 0) {
      props.columns[0] = {
        ...props.columns[0],
        bodyRender: (record) => {
          return <window.weappUi.Tag size='small' solid radius type='primary'>{record[props.columns[0].dataIndex]}</window.weappUi.Tag>
        }
      }
    }
  }
  return props;
})
