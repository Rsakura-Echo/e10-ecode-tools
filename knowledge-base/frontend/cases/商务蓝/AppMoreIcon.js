import React from 'react';
import { Trigger, Icon } from '@weapp/ui';
import { getLabel } from '@weapp/utils';
import { AppDropMenusCom } from '@weapp/layout';

class AppMoreIcon extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { popupVisible: false, popupWidth: 0 };
  }

  onPopupVisibleChange = (popupVisible) => {
    const popupWidth = document.querySelector('.app-737142488378564608-app-more-popup').clientWidth;
    this.setState({ popupVisible, popupWidth });
  }

  render() {
    const { popupVisible, popupWidth } = this.state;
    const className = 'app-737142488378564608-toolbar-item app-737142488378564608-app-more';
    const openClassName = 'app-737142488378564608-toolbar-item-open app-737142488378564608-app-more-open';
    const popupClassName = 'app-737142488378564608-trigger-popup app-737142488378564608-app-more-popup e10header-appmenus-popup';

    return (
      <Trigger
        forceRender={true}
        popup={<AppDropMenusCom popupVisible={popupVisible} handlePopupVisible={this.onPopupVisibleChange} />}
        popupPlacement="bottomRight"
        popupVisible={popupVisible}
        onPopupVisibleChange={this.onPopupVisibleChange}
        popupClassName={popupClassName}
        popupStyle={popupWidth ? { width: popupWidth } : {}}
        enableLocationCalculation={true}
      >
        <div className={`${className} ${popupVisible ? openClassName : ''}`} title={getLabel('121569', '总览')}>
          <Icon name="Icon-grid" size="lg" />
        </div>
      </Trigger>
    );
  }
}

export default AppMoreIcon;
