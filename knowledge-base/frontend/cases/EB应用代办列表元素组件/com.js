

import React from 'react';
import axios from 'axios';
import { Dialog } from '@weapp/ui';
import { dayjs } from '@weapp/utils';
const prefixCls = `ebapp-ecode-todowf`;

export default class Com extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
  }

  loadData = () => { // 加载门户代办数据
    axios({
      url: '/api/workflow/list/data/getPortalListData', method: 'post',
      data: {
        "pageNo": "1",
        "pageSize": "5",
        "isPreview": "true",
        "filterParam": {
          "type": "all",
          "checks": ""
        },
        "fileds": [
          "requestname",
          "creatername",
          "createdatetime"
        ]
      }
    }).then(res => {
      if (res.data.code === 200) {
        this.setState({ data: res.data.data.displayData });
      } else {
        Dialog.message({ type: 'error', content: '请求失败：' + res.data?.msg });
      }
    }).catch(err => {
      Dialog.message({ type: 'error', content: '请求异常' });
    });
  }

  componentDidMount() {
    this.loadData();
  }

  render() {
    const { data = [] } = this.state;
    return <div className={prefixCls}>
      <div className={`${prefixCls}-list`}>
        {
          data.map(x => {
            return <div className={`${prefixCls}-item`} onClick={() => {
              window.open(`/sp/workflow/flowpage/fullView/${x.requestid}?`)
            }}>
              <div className={`${prefixCls}-requestname`}>{x.requestname}</div>
              <div className={`${prefixCls}-creatername`}>{x.creatername}</div>
              <div className={`${prefixCls}-createdatetime`}>{dayjs(x.createdatetime).format('YYYY-MM-DD')}</div>
            </div>
          })
        }
      </div>
    </div>
  }

}
