import { Icon } from '@weapp/ui';
import React from 'react';
import ClearCache from './ClearCache';
import CountIcon from './CountIcon';
import CreateTenant from './CreateTenant';
import FastCreateIcon from './FastCreateIcon';
import HelpIcon from './HelpIcon';
import Invite from './Invite';
import InviteWelfare from './InviteWelfare';
import Logout from './Logout';
import Mail from './Mail';
import Terminal from './Terminal';
import Wechat from './Wechat';

const LayoutSDK = window.weappLayout?.LayoutSDK;
const mailMenuKeyMap = LayoutSDK?.utils?.getMailMenuKeyMap() || {
  quick_txqy: "qq",
  quick_cmqy: "coremail",
  quick_cmqyweb: "coremail_ws",
  quick_wyqy: "netease",
  quick_263qy: "263",
  quick_alqy: "alimail",
  quick_qywx: "weCom",
}

class Default extends React.PureComponent<any, any> {
  onClick = () => {
    this.props.onOpen(this.props.data);
  }

  render() {
    const { data } = this.props;

    const mailMenuKeys = Object.keys(mailMenuKeyMap);
    if (mailMenuKeys.includes(data.menuKey)) { // 邮箱类
      return <Mail data={data} mailMenuKeyMap={mailMenuKeyMap} onOpen={this.props.onOpen}/>;
    } if (data.menuKey === 'quick_create') { // 快速新建
      return <FastCreateIcon data={data} />;
    } else if (data.menuKey === 'quick_concern') { // 待办/关注/标签
      return <CountIcon data={data} />;
    } else if (data.menuKey === 'quick_center') { // 服务中心
      return <HelpIcon data={data} />;
    } else if (data.menuKey === 'quick_client') { // 企业微信及终端
      return <Terminal data={data} />;
    } else if (data.menuKey === 'quick_wechat') { // 微信号
      return <Wechat data={data} />;
    } else if (data.menuKey === 'quick_invite') { // 添加和邀请同事
      return <Invite data={data} />;
    } else if (data.menuKey === 'quick_team') { // 创建或加入团队
      return <CreateTenant data={data} />;
    } else if (data.menuKey === 'quick_goods') { // 推荐拿福利
      return <InviteWelfare data={data} />;;
    } else if (data.menuKey === 'quick_clean') { // 清除缓存
      return <ClearCache data={data} />;
    } else if (data.menuKey === 'quick_logout') { // 退出系统
      return <Logout data={data} />;
    } else {
      return (
        <div className={'app-729087887109857281-toolbar-item app-729087887109857281-toolbar-default-item'} title={data.i18nCustomMenuName || data.i18nMenuName || ''} onClick={this.onClick}>
          <Icon name={data.icon} size="lg" />
        </div>
      );
    }
  }
}

export default Default;
