

import React from 'react';
import axios from 'axios';

class AvatarCom extends React.Component {

  prefixCls = "ecode-avatar-com"
  constructor(props) {
    super(props);
    this.state = {
      num: ''
    }
  }

  loadData = () => {
    axios({
      url: '/api/workflow/list/total/getTodoListTotal',
      method: 'post',
      data: {"params":{"outType":0,"dimension":"todo","continueDimension":"todo","tabid":"0","selectedSubId":"","workflowId":"","searchAdWorkflowid":"","queryByConditionId":true,"customFlowName":"","flowCenterParam":{}},"searchParams":{"formDatas":{},"quickSearchDatas":{},"type":"and","initSearch":true},"flowCenterParam":{},"sortParams":[]}
    }).then(res => {
      if (res.status === 200 && res.data.code === 200) {
        this.setState({ num: res.data.data.total })
      }
    })
  }

  componentDidMount() {
    this.loadData();
  }

  render() {

    const { OriginCom, ...others } = this.props;
    console.info('others => ', others);
    return <div className={this.prefixCls}>
      <span className={`${this.prefixCls}-num`}>{this.state.num}</span>
      <OriginCom {...others}/>
    </div>
  }

}


export default AvatarCom;