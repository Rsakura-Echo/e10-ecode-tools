import { Icon } from '@weapp/ui';
import React from 'react';
import CornerMark from './CornerMark';

class Custom extends React.PureComponent {
  onClick = () => {
    this.props.onOpen(this.props.data);
  }

  render() {
    // console.log('渲染自定义', data);
    const { data } = this.props;
    const icon = data.icon ? `Icon-custom${"0".repeat(2 - String(data.icon).length)}${data.icon}-o` : 'Icon-custom01-o'; 

    return (
      <div className={'app-729087887109857281-toolbar-item app-729087887109857281-toolbar-custom-item'} title={data.i18nCustomMenuName || ''} onClick={this.onClick}>
        <CornerMark data={data} />
        <Icon name={icon} size="lg" />
      </div>
    );
  }
}


export default Custom;
