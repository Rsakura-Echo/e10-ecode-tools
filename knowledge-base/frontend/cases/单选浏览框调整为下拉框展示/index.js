

import React from 'react';
import { Select } from '@weapp/ui';

class RadioNew extends React.Component {


  render() {
    const { data, value } = this.props;
    return <Select
      value={value}
      data={data}
      onChange={(value, opt, e) => {
        let val = value;
        if (Array.isArray(value)) {
          val = value[0];
        }
        this.props.onChange(val, opt, e);
      }}
    />
  } 
}

export default RadioNew;