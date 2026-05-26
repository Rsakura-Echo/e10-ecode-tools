

import React from 'react';
import { inject, observer } from "mobx-react";
import { Button } from '@weapp/ui';


/**
 * 流程底部操作按钮
 */
@inject('wfBottomOptStore')
// @inject('baseStore')
@observer
class WfBottomOpt extends React.Component {

  prefixCls = 'wf-bottom-opt'
  wffpSdk = undefined;
  inter = undefined;
  constructor(props) {
    super(props);
    this.state = {
      menus: []
    }
  }

  componentDidMount() {
    this.wffpSdk = window.weappWorkflow?.getCurrentFlowPageSDK?.();
    this.inter = setInterval(() => {
      this.setState({ menus: this.wffpSdk.baseStore.operMenus });
    }, 2000);
  }


  render() {
    const { wfBottomOptStore } = this.props;
    const { buttons = [] } = wfBottomOptStore;
    const { menus = [] } = this.state;
    return <div className={this.prefixCls}>
      <div className={`${this.prefixCls}-body`}>
      {
        menus.map(x => {
          return <Button onClick={() => {
            this.wffpSdk.doRightBtnEvent(x.menuType);
          }}>{x.title}</Button>
        })
      }
      </div>
    </div>
  }

}

export default WfBottomOpt;
