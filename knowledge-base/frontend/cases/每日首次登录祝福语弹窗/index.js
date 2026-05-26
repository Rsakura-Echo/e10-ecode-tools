

import React from 'react';
import axios from 'axios';
import { dayjs } from '@weapp/utils';
const prefixCls = `ecode-greet-modal`;
import { Icon, Dialog } from '@weapp/ui';

export default class GreetCom extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
  }

  checkData = () => { // 检查是否显示
    axios({
      url: '/api/ecode/serverless/func/exec', method: 'post', data: {
        funcId: '785236445557956609', token: 'JNP0MPKQR111NR1LKKC', params: {}
      }
    }).then(res => {
      if (res.status === 200 && res.data?.code === 200) {
        this.setState({ visible: (res.data?.data?.data || []).length === 0 });
      } else {
        this.setState({ visible: true });
        Dialog.message({ type: 'error', content: '请求失败' + res.data.msg });
      }
    }).catch(err => {
      console.error(err);
      Dialog.message({ type: 'error', content: '请求异常' });
    }).finally(() => this.setState({ loading: false }));
  }

  componentDidMount() {
    this.checkData();
  }

  handleClose = () => { // 关闭显示
    this.setState({ visible: false });
    axios({
      url: '/api/ecode/serverless/func/exec', method: 'post', data: {
        funcId: '785236492659990528', token: 'LPRKORMTSPNLTTSLKQA', params: {}
      }
    });
  }

  render() {
    const { visible } = this.state;
    if (!visible) return <></>;

    return <div className={`${prefixCls}`}>
      <div className={`${prefixCls}-close`} onClick={this.handleClose}>
        <Icon name="Icon-error01" />
      </div>
      <div className={`${prefixCls}-body`}>
        又是元气满满的一天～～～[{dayjs().format('YYYY-MM-DD')}]
      </div>
    </div>
  }


}
