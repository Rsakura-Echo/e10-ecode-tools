



import React from 'react';

class CustRate extends React.Component {

  prefixCls = 'ecode-cust-rate';
  constructor(props) {
    super(props);
    this.state = {
      value: props.value || props.defaultValue
    }
  }

  render() {

    const { OriginCom, ...others } = this.props;
    const { value } = this.state;
    return <div className={this.prefixCls}>
      <div>
        <OriginCom {...others} onChange={(v) => {
          this.setState({ value: v });
          others.onChange?.(v);
        }}/>
      </div>
      <div className={`${this.prefixCls}-value`}>数值： {others.value || others.defaultValue || value}</div>
    </div>
  }

}

export default CustRate;
