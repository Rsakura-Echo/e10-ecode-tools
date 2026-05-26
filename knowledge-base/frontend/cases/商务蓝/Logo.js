import React from 'react';
import { Trigger, Icon } from '@weapp/ui';
import { getLabel } from '@weapp/utils';
import { TenantDropCom } from '@weapp/layout';

import { CONFIG } from './config/config';

class Logo extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { popupVisible: false };
  }

  onPopupVisibleChange = (popupVisible) => {
    this.setState({ popupVisible });
  }

  render() {
    const { popupVisible } = this.state;
    const className = 'app-737142488378564608-logo';
    const openClassName = 'app-737142488378564608-logo-open';
    const popupClassName = 'app-737142488378564608-trigger-popup app-737142488378564608-logo-popup';
    const logoImage = CONFIG.logoImage;
    const logoActiveImage = CONFIG.logoActiveImage;

    // 私有化并且是单租户就没有切换团队 
    if (window.TEAMS && window.TEAMS.deploy === 'private' && window.TEAMS.tenantType === 'single') {
      return (
        <div className={className}>
          {
            logoImage ? (
              <img src={logoImage} alt="" className="app-737142488378564608-logo-img" />
            ) : (
              <div className="app-737142488378564608-logo-text">
                <div className="app-737142488378564608-logo-icon">
                  <span>E10</span>
                </div>
                <div className="app-737142488378564608-logo-desc">
                  <span>{getLabel('144679', '智能·协同·高效')}</span>
                  <span>{getLabel('144680', '全程数字化运营平台')}</span>
                </div>
              </div>
            )
          }
        </div>
      );
    } else {
      return (
        <Trigger
          forceRender={true}
          popup={<TenantDropCom handlePopupVisible={this.onPopupVisibleChange} />}
          popupPlacement="bottomLeft"
          popupVisible={popupVisible}
          onPopupVisibleChange={this.onPopupVisibleChange}
          popupClassName={popupClassName}
        >
          <div className={`${className} ${popupVisible ? openClassName : ''}`}>
            {
              logoImage ? (
                <>
                  <img src={logoImage} alt="" className="app-737142488378564608-logo-img" />
                  <img src={logoActiveImage} alt="" className="app-737142488378564608-logo-img-active" />
                </>
              ) : (
                <div className="app-737142488378564608-logo-text">
                  <div className="app-737142488378564608-logo-icon">
                    <span>E10</span>
                  </div>
                  <div className="app-737142488378564608-logo-desc">
                    <span>{getLabel('144679', '智能·协同·高效')}</span>
                    <span>{getLabel('144680', '全程数字化运营平台')}</span>
                  </div>
                </div>
              )
            }
            <Icon name="Icon-Down-arrow01" className="app-737142488378564608-logo-arrow" />
          </div>
        </Trigger>
      );
    }
  }
}

export default Logo;
