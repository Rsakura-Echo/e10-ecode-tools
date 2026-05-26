

import React from 'react';

const prefixCls = `ecode-eb-com-weather`;
import { Spin } from '@weapp/ui';
import axios from 'axios';
export default class WeatherCom extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      errmsg: '',
      loading: true
    }
  }

  loadData = () => {
    const { code } = this.props;
    this.setState({ data: {}, errmsg: '', loading: true });
    axios({
      url: '/api/ecode/serverless/func/exec', method: 'post', data: {
        funcId: '781491169734959105', token: 'HLM2PO233PKMPP1O21E', params: { citycode: code }
      }
    }).then(res => {
      if (res.status === 200 && res.data?.code === 200) {
        this.setState({ data: res.data?.data?.data?.weatherinfo || {}});
      } else {
        this.setState({ errmsg: res.data?.data?.msg || '获取失败' });
        Dialog.message({ type: 'error', content: '请求失败' + res.data.msg });
      }
    }).catch(err => {
      console.error(err);
      Dialog.message({ type: 'error', content: '请求异常' });
    }).finally(() => this.setState({ loading: false }))
  }

  componentDidMount() {
    this.loadData();
  }

  render() {
    const { data = {}, errmsg = '', loading } = this.state;
    if (errmsg) {
      return <div className={`${prefixCls}-body-msg`}>{errmsg}</div>
    }
    if (loading) return <div className={`${prefixCls}-body-msg`}>正在加载...</div>
    return <div className={`${prefixCls}-body`}>
      <div className={`${prefixCls}-body-info`}>{ data?.weather }</div>
      <div className={`${prefixCls}-body-desc`}>{ data?.temp1 } ~ { data?.temp2 }</div>
    </div>
  }


}
