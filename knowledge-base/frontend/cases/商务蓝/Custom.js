import { Icon } from '@weapp/ui';
import React from 'react';
import CornerMark from './CornerMark';

class Custom extends React.PureComponent {
  onClick = () => {
    this.props.onOpen(this.props.data);
  }

  render() {
    const { data } = this.props;
    const icon = data.icon ? `Icon-custom${"0".repeat(2 - String(data.icon).length)}${data.icon}-o` : 'Icon-custom01-o';

    return (
      <div className={'app-737142488378564608-toolbar-item app-737142488378564608-toolbar-custom-item'} title={data.i18nCustomMenuName || ''} onClick={this.onClick}>
        <CornerMark data={data} />
        <Icon name={icon} size="lg" />
      </div>
    );
  }
}


export default Custom;
