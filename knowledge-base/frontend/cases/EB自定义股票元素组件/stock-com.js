

import React from 'react';

const prefixCls = `ecode-eb-com-stock`;

export default class StockCom extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: {},
      loading: true
    }
  }

  loadData = () => { // 查询股票实时交易信息
    this.setState({ loading: true });
    // 获取股票配置信息数据
    axios({
      url: '/api/ecode/serverless/func/exec', method: 'post', data: {
        funcId: '781655224592375808', token: 'LPQNNLKOOTLSORPLQMA', params: { dm: this.props.dm }
      }
    }).then(res => {
      if (res.status === 200 && res.data?.code === 200) {
        const data = res.data?.data?.data || {};
        this.setState({ data });
      } else {
        Dialog.message({ type: 'error', content: '请求失败' + res.data.msg });
      }
    }).catch(err => {
      console.error(err);
      Dialog.message({ type: 'error', content: '请求异常' });
    }).finally(() => this.setState({ loading: false }))
  }

  componentDidMount() {
    this.loadData();
    this.props.mount?.({ reload: this.loadData });
  }

  renderLabelItem = (label, content) => {
    return <div className={`${prefixCls}-item`}>
      <div className={`${prefixCls}-item-label`}>
        {label}
      </div>
      <div className={`${prefixCls}-item-value`}>
        {content}
      </div>
    </div>
  }

  render() {

    const { data = {}, loading } = this.state;
    if (loading) {
      return <div className={`${prefixCls}-body-msg`}>正在加载...</div>
    }
    return <div className={`${prefixCls}-body`}>
      { this.renderLabelItem('涨跌幅', data.fm + ' %') }
      { this.renderLabelItem('最高价', data.h + ' 元') }
      { this.renderLabelItem('换手率', data.hs + ' %') }
      { this.renderLabelItem('最低价', data.l + ' 元') }
      { this.renderLabelItem('开盘价', data.lt + ' 元') }
      { this.renderLabelItem('流通市值', data.o + ' 元') }
      { this.renderLabelItem('涨跌幅', data.pc + ' %') }
      { this.renderLabelItem('当前价格', data.p + ' 元') }
      <div className={`${prefixCls}-time`}>更新时间 {data.t}</div>
    </div>
  }

}