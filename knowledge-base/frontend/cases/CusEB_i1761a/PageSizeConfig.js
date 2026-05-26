import { Dialog, Input } from '@weapp/ui';
import { getLabel } from '@weapp/utils';
import React, { PureComponent } from 'react';

const { InputNumber } = Input;
const { message } = Dialog;

export default class PageSizeConfig extends PureComponent<any, any> {
  constructor(props: any) {
    super(props);
    this.state = { value: props.value };
  }

  onBlur = (value: any) => {
    if (value > 100) {
      message({
        type: 'info',
        content: getLabel('73094', '设置的数值不能大于100！'),
      });
      this.setState({ value: 100 });
      this.props.onChange(100);
    } else if (value < 0) {
      this.setState({ value: 0 });
      this.props.onChange(0);
    } else {
      this.props.onChange(value);
    }
  };

  onChange = (value: any) => {
    this.setState({ value });
  };

  render() {
    return (
      <InputNumber
        weId={`${this.props.weId || ''}_m46q4e`}
        min={0}
        hideOps
        style={{ width: '100%' }}
        value={this.state.value}
        onBlur={this.onBlur}
        onChange={this.onChange}
      />
    );
  }
}
