import { Icon } from '@weapp/ui';
import { request } from "@weapp/utils";
import React from 'react';
import CornerMark from './CornerMark';

class Mail extends React.PureComponent<any, any> {
  constructor(props: any) {
    super(props);
    this.state = { visible: false };
  }

  componentDidMount() {
    const { data, mailMenuKeyMap } = this.props;
    const code = mailMenuKeyMap[data.menuKey];
    request({
      url: `/api/bs/intmail/navigation/check_mail_visible?product_type_code=${code}`,
      method: 'GET'
    }).then((result) => {
      const { data = {} } = result;
      this.setState({ visible: data.visible });
    });
  }

  onClick = () => {
    const { data, mailMenuKeyMap } = this.props;
    const code = mailMenuKeyMap[data.menuKey];
    this.props.onOpen({ ...data, url: `/sp/integration/front/mailBind?product_type_code=${code}` });
  }

  render() {
    const { data } = this.props;

    if (!this.state.visible) return null;

    return (
      <div className={'app-737142488378564608-toolbar-item app-737142488378564608-mail'} title={data.i18nCustomMenuName || data.i18nMenuName || ''} onClick={this.onClick}>
        <CornerMark data={data} />
        <Icon name={data.icon} size="lg" />
      </div>
    );
  }
}

export default Mail;
