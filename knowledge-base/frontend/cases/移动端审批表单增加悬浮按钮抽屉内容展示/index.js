


import React from 'react';
import { Icon } from '@weapp/ui';

import DrawerCom from './drawer';

class IndexBtn extends React.Component {


  prefixCls = 'ecode-wf-index-btn';

  constructor(props) {
    super(props);
    this.state = {
      visible: false
    }
  }


  render() {
    return <div className={this.prefixCls}>
      <Icon name="Icon-add-to01" onClick={() => {
        this.setState({ visible: true });
      }} />
      <DrawerCom visible={this.state.visible} onClose={() => this.setState({ visible: false })}>
        自定义抽屉内容
      </DrawerCom>
    </div>
  }

}



export default IndexBtn;