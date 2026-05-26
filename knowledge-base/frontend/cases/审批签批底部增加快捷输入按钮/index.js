

import React from 'react';
import { Spin } from '@weapp/ui';

const commonDatas = [
  { id: '1', title: '同意', content: '批准执行' },
  { id: '2', title: '拒绝', content: '拒绝执行' },
  { id: '3', title: '退回', content: '审核不允许' },
  { id: '4', title: '补充材料', content: '材料不足，请补充' }
];

/**
 * 签批意见底部增加常用内容选择
 */
class CommonContentList extends React.Component {

  prefixCls = 'common-content';
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: false
    }
  }

  loadData = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ data: commonDatas, loading: false });
    }, 2000);
  }

  componentDidMount() {
    this.loadData();
  }

  render() {
    const { data = [], loading = false } = this.state;
    return <div className={this.prefixCls}>
      <Spin spinning={loading}>
        <div className={`${this.prefixCls}-list`}>
          {
            data.map(x => {
              return <div className={`${this.prefixCls}-item`} onClick={() => {
                this.props.onChange?.(x.content);
              }}>
                {x.title}
              </div>
            })
          }
        </div>
      </Spin>
    </div>
  }

}


export default CommonContentList;