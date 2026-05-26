
import React from 'react';
import axios from 'axios';
import { qs, dayjs } from '@weapp/utils';
import { Spin } from '@weapp/ui';
const prefixCls = `ecode-eb-com-doclist`;

export default class Com extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      errMsg: '',
      loading: true
    }
  }

  loadData = () => {
    this.setState({ loading: true });
    const formData = new FormData();
    formData.append('queryStr', JSON.stringify({ pageNo: 1, pageSize: 5, filter: { type: 'all' } }));
    axios({
      url: '/api/doc/documentelement/queryPageList', method: 'post',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      data: formData
    }).then(res => {
      console.info(res);
      if (res.status === 200 && res.data?.actionMsg?.code === 0) {
        this.setState({ data: res.data?.resultMap?.page?.result || [] });
      } else {
        this.setState({ errMsg: res.data?.actionMsg?.message || '获取失败' });
      }
    }).catch(err => {
      this.setState({ errMsg: '获取异常' });
      console.error(err);
    }).finally(() => {
      this.setState({ loading: false });
    });
  }

  componentDidMount() {
    this.loadData();
  }
  
  render() {
    const { data = [], errMsg = '', loading } = this.state;
    
    return <div className={prefixCls}>
      <Spin spinning={loading}>
        { 
          errMsg 
          ? <div className={`${prefixCls}-errormsg`}>{errMsg}</div>
          : <div className={`${prefixCls}-list`}>
            {
              data.map(d => {
                return <div onClick={() => {
                  // 打开正文文档
                }} className={`${prefixCls}-item`}>
                  <div className={`${prefixCls}-name`}>{d.name}</div>
                  <div className={`${prefixCls}-author`}>{d.author.username}</div>
                  <div className={`${prefixCls}-time`}>{dayjs(d.createTime).format('YYYY-MM-DD')}</div>
                </div>
              })
            }
          </div>
        }
        
      </Spin>
    </div>
  }


}
