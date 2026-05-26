import { CorsComponent, Icon } from '@weapp/ui';
import React from 'react';

class Terminal extends React.PureComponent<any, any> {
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
      <div className={'app-737142488378564608-toolbar-item app-737142488378564608-terminal'} title={data.i18nCustomMenuName || data.i18nMenuName || ''} onClick={this.onOpen}>
        <CorsComponent
          app="@weapp/layout"
          compName="TerminalDialogCom"
          visible={visible}
          onClose={this.onClose}
        />
        <Icon name={data.icon || "Icon-terminal"} size="lg" />
      </div>
    );
  }
}

export default Terminal;
