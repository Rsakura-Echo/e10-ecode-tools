import React from 'react';
import { withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { CorsComponent, Trigger, Icon } from '@weapp/ui';
import { getLabel } from '@weapp/utils';

@inject('mainStore')
@observer
class ImIcon extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { popupVisible: false };
  }

  onPopupVisibleChange = (popupVisible) => {
    this.setState({ popupVisible });
  }

  showImContent = () => {
    this.props.mainStore?.changeImTabContentVisible(true);
    this.props.mainStore?.saveHistoryMenu('emtab');
  }

  render() {
    const { popupVisible } = this.state;
    const { imTabMenuVisible, imCounter } = this.props.mainStore;
    const className = 'app-729087887109857281-toolbar-item app-729087887109857281-im';
    const openClassName = 'app-729087887109857281-toolbar-item-open app-729087887109857281-im-open';
    const popupClassName = 'app-729087887109857281-trigger-popup app-729087887109857281-im-popup';

    if (!imTabMenuVisible) {
      return <></>;
    }

    return (
      <Trigger
        forceRender={true}
        popup={<CorsComponent app="@weapp/em" compName="EmRemindList" handleClick={() => this.onPopupVisibleChange(false)} />}
        popupVisible={popupVisible}
        onPopupVisibleChange={this.onPopupVisibleChange}
        popupClassName={popupClassName}
      >
        <div className={`${className} ${popupVisible ? openClassName : ''}`} title={getLabel('62238', '消息')} onClick={this.showImContent}>
          {imCounter !== 0 && <div className="app-729087887109857281-im-counter">{imCounter}</div>}
          <Icon name="Icon-Message-center" size="lg" />
        </div>
      </Trigger>
    );
  }
}

export default withRouter(ImIcon);
