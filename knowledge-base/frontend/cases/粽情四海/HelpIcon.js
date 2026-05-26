import React from 'react';
import { Trigger, Icon } from '@weapp/ui';
import { HelpDropCom } from '@weapp/layout';

class HelpIcon extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { popupVisible: false };
  }

  onPopupVisibleChange = (popupVisible) => {
    this.setState({ popupVisible });
  }

  render() {
    const { popupVisible } = this.state;
    const className = 'app-729087887109857281-toolbar-item';
    const openClassName = 'app-729087887109857281-toolbar-item-open';
    const popupClassName = 'app-729087887109857281-trigger-popup app-729087887109857281-help-popup';

    return (
      <Trigger
        forceRender={true}
        popup={<HelpDropCom handlePopupVisible={this.onPopupVisibleChange} />}
        popupPlacement="bottomRight"
        popupVisible={popupVisible}
        onPopupVisibleChange={this.onPopupVisibleChange}
        popupClassName={popupClassName}
      >
        <div className={`${className} ${popupVisible ? openClassName : ''}`} title={this.props.name || ''}>
          <Icon name={this.props.icon || "Icon-help"} size="lg" />
        </div>
      </Trigger>
    );
  }
}

export default HelpIcon;
