import React from 'react';
import { withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { Icon } from '@weapp/ui';
import { getLabel } from '@weapp/utils';

@inject('mainStore')
@observer
class HomeIcon extends React.PureComponent {
  linkToHome = () => {
    const { imTabMenuVisible, imTabContentVisible } = this.props.mainStore!;
    //im菜单处理
    if (imTabMenuVisible && imTabContentVisible) {
      //当前所属模块菜单点击时仅关闭工作消息
      if (window.location.pathname.indexOf('/portal') === 0) {
        this.props.mainStore?.changeImTabContentVisible(false);
        return;
      }
      this.props.mainStore?.changeImTabContentVisible(false);
    }
    this.props.history.push('/portal');
    this.props.mainStore?.saveHistoryMenu('/portal');
  }

  render() {
    const className = 'app-729087887109857281-toolbar-item app-729087887109857281-home';
    return (
      <div className={className} title={getLabel('62505', '门户')} onClick={this.linkToHome}>
        <Icon name="Icon-gateway" size="lg" />
      </div>
    );
  }
}

export default withRouter(HomeIcon);
