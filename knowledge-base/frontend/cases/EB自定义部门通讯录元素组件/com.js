






import React from 'react';
import axios from 'axios';
import { Spin, Input, Button, Dialog, Icon } from '@weapp/ui';
const prefixCls = `ecode-eb-com-dept`;

export default class Com extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: [],
      search: ''
    }
  }

  loadData = (username) => {
    this.setState({ loading: true });
    axios({
      url: '/api/app/bs/hrm/common_org/page_query_user',
      params: {
        type: 'department',
        departmentId: window.TEAMS?.currentUser?.department?.id,
        value: 1, current: 1, pageSize: 5, username
      }
    }).then(res => {
      if (res.status === 200 && res.data?.code === 200) {
        this.setState({ data: res.data?.data?.data || [] });
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
    this.loadData('');
  }

  render() {
    const { loading, value, data = [] } = this.state;
    return <div className={prefixCls}>
      <div className={`${prefixCls}-toolbar`}>
        <div className={`${prefixCls}-toolbar-select`}>
          <Input 
            suffix={<Icon size={'s'} name="Icon-search" />}
            allowClear 
            value={value} 
            placeholder="搜索姓名/首字母/手机号" 
            onChange={val => this.setState({ value: val })} 
            onPressEnter={() => this.loadData(this.state.value)}
          />
        </div>
      </div>
      <Spin spinning={loading}>
        <div className={`${prefixCls}-list`}>
          {
            data.map(x => {
              return <div className={`${prefixCls}-item`}>
                <div className={`${prefixCls}-name`}>{x.username}</div>
                <div className={`${prefixCls}-mobile`}>{x.mobile}</div>
                <div className={`${prefixCls}-active ${x.ifActive ? 'isok' : ''}`}>{x.ifActive ? '已激活' : '未激活'}</div>
                <div className={`${prefixCls}-date`}>{x.hiredate}</div>
              </div>
            })
          }
        </div>
      </Spin>
    </div>
  }

}