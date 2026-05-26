import { Icon } from '@weapp/ui';
import React from 'react';

class Logout extends React.PureComponent<any, any> {
  onClick = () => {
    const LayoutSDK = window.weappLayout?.LayoutSDK;
    LayoutSDK?.utils?.quickLogout();
  }

  render() {
    const { data } = this.props;
    const className = 'app-737142488378564608-toolbar-item app-737142488378564608-logout';

    return (
      <div className={className} title={data.i18nCustomMenuName || data.i18nMenuName || ''} onClick={this.onClick}>
        <Icon name={data.icon || "Icon-Exit-the-system"} size="lg" />
      </div>
    );
  }
}

export default Logout;
