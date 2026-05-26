import { CorsComponent, Icon, Popover } from '@weapp/ui';
import { classnames } from '@weapp/utils';
import React from 'react';

class Wechat extends React.PureComponent<any, any> {
  constructor(props: any) {
    super(props);
    this.state = { visible: false };
  }

  onVisibleChange = (visible?: boolean) => {
    this.setState({ visible });
  }

  render() {
    const { data } = this.props;
    const { visible } = this.state;

    const className = classnames({
      ['app-729087887109857281-toolbar-item']: true,
      ['app-729087887109857281-toolbar-item-open']: visible,
    });
    const popupClassName = 'app-729087887109857281-toolbar-popup app-729087887109857281-toolbar-wechat-popup';

    return (
      <Popover
        popup={
          <CorsComponent
            app="@weapp/layout"
            compName="WxchatCom"
            className={'app-729087887109857281-toolbar-wechat'}
          />
        }
        placement="bottom"
        visible={visible}
        onVisibleChange={this.onVisibleChange}
        triggerProps={{ forceRender: true, popupClassName }}
      >
        <div className={className} title={data.i18nCustomMenuName || data.i18nMenuName || ''}>
          <Icon name={data.icon || "Icon-Wechat-import-o"} size="lg" />
        </div>
      </Popover>
    );
  }
}

export default Wechat;
