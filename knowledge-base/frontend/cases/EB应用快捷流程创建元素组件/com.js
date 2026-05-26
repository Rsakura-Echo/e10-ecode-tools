

import React from 'react';


const prefixCls = `ebapp-ecode-createwf`;

export default class Com extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
  }

  loadData = () => {
    this.setState({
      data: [
        { id: '1', logoSrc: 'https://eteams.cn/css/index/icon-report.png', wid: '770547202209382400', name: '自定义会议审批' },
        { id: '2', logoSrc: 'https://eteams.cn/css/index/icon-expensesclaim.png', wid: '717847502438785142', name: '借款' },
        { id: '3', logoSrc: 'https://eteams.cn/css/index/icon-orderform.png', wid: '717847506700197898', name: '合同订单审批表' },
        { id: '4', logoSrc: 'https://eteams.cn/css/index/icon-mineRes.png', wid: '717847506700198022', name: '加班申请单' },
        { id: '5', logoSrc: 'https://eteams.cn/css/index/icon-eletronic.png', wid: '717847523854901248', name: '印章申请' }
      ]
    });
  }

  componentDidMount() {
    this.loadData();
  }

  renderWfItem = () => {
    const { data = [] } = this.state;
    return <div className={`${prefixCls}-list`}>
      {
        data.map(x => {
          return <div className={`${prefixCls}-item`} onClick={() => window.open(`/sp/workflow/flowpage/fullCreate/${x.wid}?`)}>
            <div className={`${prefixCls}-logo`}>
              <img src={x.logoSrc} />
            </div>
            <div className={`${prefixCls}-name`}>{x.name}</div>
          </div>
        })
      }
    </div>
  }


  render() {
    return <div className={prefixCls}>
      {this.renderWfItem()}
    </div>
  }

}
