import { CorsComponent, Icon } from '@weapp/ui';
import React from 'react';

class ClearCache extends React.PureComponent<any, any> {
  constructor(props: any) {
    super(props);
    this.state = { visible: false };
  }

  onOpen = () => {
    this.setState({ visible: true });
  }

  onClose = () => {
    this.setState({ visible: false });
  }

  render() {
    const { data } = this.props;
    const { visible } = this.state;

    return (
      <div className={'app-729087887109857281-toolbar-item app-729087887109857281-clearCache'} title={data.i18nCustomMenuName || data.i18nMenuName || ''} onClick={this.onOpen}>
        <CorsComponent
          app="@weapp/layout"
          compName="ClearCacheDialogCom"
          visible={visible}
          onClose={this.onClose}
        />
        <Icon name={data.icon || "Icon-Clear-cache"} size="lg" />
      </div>
    );
  }
}

export default ClearCache;
