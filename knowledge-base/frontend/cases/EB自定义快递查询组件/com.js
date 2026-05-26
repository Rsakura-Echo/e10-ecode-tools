

import React from 'react';
import axios from 'axios';
import { Spin, Input, Button, Dialog, Icon, Select } from '@weapp/ui';
import { qs, dayjs } from '@weapp/utils';
const prefixCls = `ecode-eb-com-kuaidi`;

// 快递公司数据
const companyData = [
  { id: 'yuantong', content: '圆通速递' },
  { id: 'yunda', content: '韵达快递' },
  { id: 'shentong', content: '申通快递' },
  { id: 'jtexpress', content: '极兔速递' },
  { id: 'zhongtong', content: '中通快递' },
  { id: 'youzhengguonei', content: '邮政快递' },
  { id: 'shunfeng', content: '顺丰速运' },
  { id: 'jd', content: '京东物流' },
  { id: 'debangkuaidi', content: '德邦快递' }
]

export default class Com extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: '',
      com: 'shunfeng',
      loading: false,
      data: []
    }
  }

  loadData = () => {
    this.setState({ loading: true });
    const { com, value } = this.state;
    // 785242484177567745 HLN0KOKPMO3LL13LKPE
    axios({
      url: '/api/ecode/serverless/func/exec', method: 'post', data: {
        funcId: '785242484177567745', token: 'HLN0KOKPMO3LL13LKPE', params: {
          com, num: value
        }
      }
    }).then(res => {
      if (res.status === 200 && res.data?.code === 200) {
        this.setState({ data: (res.data?.data?.data || []) });
      } else {
        this.setState({ data: [] });
        Dialog.message({ type: 'error', content: '请求失败' + res.data.msg });
      }
    }).catch(err => {
      console.error(err);
      Dialog.message({ type: 'error', content: '请求异常' });
    }).finally(() => this.setState({ loading: false }));
  }

  componentDidMount() {
  }

  render() {
    const { loading, data = [], value, com = '' } = this.state;
    return <div className={prefixCls}>
      <div className={`${prefixCls}-toolbar`}>
        <div className={`${prefixCls}-toolbar-select`}>
          <Select
            data={companyData}
            value={com}
            onChange={(val) => this.setState({ com: val })}
          />
        </div>
        <div className={`${prefixCls}-toolbar-input`}>
          <Input 
            suffix={<Icon size={'s'} name="Icon-search" />}
            allowClear 
            value={value} 
            placeholder="输入快递单号" 
            onChange={val => this.setState({ value: val })} 
            onPressEnter={() => this.loadData()}
          />
        </div>
      </div>
      <Spin spinning={loading}>
        <div className={`${prefixCls}-list`}>
          {
            data.map(d => {
              return <div className={`${prefixCls}-item`}>
                <div className={`${prefixCls}-date`}>{d.time}</div>
                <div title={d.context} className={`${prefixCls}-content`}>{d.context}</div>
              </div>
            })
          }
        </div>
      </Spin>
    </div>
  }

}