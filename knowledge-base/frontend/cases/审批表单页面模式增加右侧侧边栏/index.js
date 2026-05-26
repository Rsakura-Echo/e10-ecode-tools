


import React from 'react';

import { Icon } from '@weapp/ui';

class EcodeExtContent extends React.Component {

  prefixCls = 'ecode-ext-content-div'

  constructor(props) {
    super(props);
    this.state = {
      show: false
    }
  }


  render() {

    const { show } = this.state;

    return <div className={this.prefixCls}>
      <div className={`${this.prefixCls}-line`}>
        <Icon size="lg" onClick={() => this.setState({ show: !show })} name={show ? "Icon-Right-arrow02": "Icon-left-arrow02"}/>
      </div>
      {
        show && <div className={`${this.prefixCls}-content`}>
          自定义侧边栏内容
        </div>
      }
    </div>
  }

}


export default EcodeExtContent;