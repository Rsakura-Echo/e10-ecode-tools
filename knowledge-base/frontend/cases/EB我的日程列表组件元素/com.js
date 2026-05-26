


import React from 'react';
import axios from 'axios';
import { Spin } from '@weapp/ui';
import { dayjs } from '@weapp/utils';
const prefixCls = `ecode-eb-com-schedule`;

export default class Com extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      data: [],
      errMsg: '',
      loading: false
    }
  }

  loadData = () => {
    this.setState({ loading: true });
    axios({
      url: '/api/calendar/search/queryList', method: 'post',
      data: {
        "pageNo": 1,
        "pageSize": 20,
        "viewState": "table"
      }
    }).then(res => {
      if (res.status === 200 && res.data.code === 200) {
        this.setState({ data: res.data?.data?.result || [] });
      } else {
        this.setState({ errMsg: res.data?.msg || '请求失败', errMsg: '' });
      }
    }).catch(err => {
      console.error(err);
      this.setState({ errMsg: '请求异常' });
    }).finally(() => {
      this.setState({ loading: false });
    })
  }

  componentDidMount() {
    this.loadData();
  }

  renderDate(d) {
    return dayjs(d).format('YYYY-MM-DD HH:mm:ss');
  }

  render() {
    const { data = [], errMsg = '', loading } = this.state;
    return <div className={prefixCls}>
      <Spin spinning={loading}>
        { errMsg && <div className={`${prefixCls}-errmsg`}>{errMsg}</div> }
        { !errMsg && <div className={`${prefixCls}-list`}>
          {data.map(d => {
            return <div className={`${prefixCls}-item`}>
              <div className={`${prefixCls}-name`}>{d.name}</div>
              <div className={`${prefixCls}-username`}>{d.manager.name}</div>
              <div className={`${prefixCls}-date`}>
                {this.renderDate(d.startDate)} - {this.renderDate(d.endDate)}
              </div>
            </div>
          })}
        </div> }
      </Spin>
    </div>
  }

}