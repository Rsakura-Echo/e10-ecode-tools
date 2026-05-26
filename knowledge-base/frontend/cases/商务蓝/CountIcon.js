import React from 'react';
import { Trigger, Icon } from '@weapp/ui';
import { CountTabCom } from '@weapp/layout';
import CornerMark from './CornerMark';

class CountIcon extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { popupVisible: false };
  }

  onPopupVisibleChange = (popupVisible) => {
    this.setState({ popupVisible });
  }

  render() {
    const { popupVisible } = this.state;
    const { data } = this.props;
    const className = 'app-737142488378564608-toolbar-item';
    const openClassName = 'app-737142488378564608-toolbar-item-open';
    const popupClassName = 'app-737142488378564608-trigger-popup app-737142488378564608-count-popup';

    return (
      <Trigger
        forceRender={true}
        popup={<CountTabCom handlePopupVisible={this.onPopupVisibleChange} />}
        popupPlacement="bottomRight"
        popupVisible={popupVisible}
        onPopupVisibleChange={this.onPopupVisibleChange}
        popupClassName={popupClassName}
      >
        <div className={`${className} ${popupVisible ? openClassName : ''}`} title={this.props.name || ''}>
          <CornerMark data={data} />
          <Icon name={this.props.icon || "Icon-N-Contactreminder"} size="lg" />
        </div>
      </Trigger>
    );
  }
}

export default CountIcon;
