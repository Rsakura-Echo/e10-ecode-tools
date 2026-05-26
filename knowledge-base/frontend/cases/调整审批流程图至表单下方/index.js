

import React from 'react';

import { Spin, HrmCard } from '@weapp/ui';
import {  getLabel, corsImport, appInfo } from '@weapp/utils';
import ReactDOM from 'react-dom';
import {inject, observer, Provider} from 'mobx-react';

import axios from 'axios';


class CustWfChart extends React.Component {

  prefixCls = "ecode-cust-wf-chart"
  constructor(props) {
    super(props);

    this.state = {
      showOperatorPanel: false,
      operatePanelPos: {leftX: 0, leftY: 0},
      loadingFlag: false, //流程图加载的标志
      data: {}
    }
  }

  /**
   * 加载流程图数据
   */
  loadData = () => {
    this.setState({ loadingFlag: true });
    const { commonParam = {} } = weappWorkflow.getActiveFlowPageSDK().baseStore;
    axios({
      url: '/api/workflow/core/forecast/getForecastDetail',
      method: 'post',
      data: commonParam
    }).then(res => {
      if (res.status === 200 && res.data.code === 200) {
        this.setState({ data: res.data.data });
      }
    }).finally(() => this.setState({ loadingFlag: false }))
  }

  componentDidMount() {
    this.loadData();
  }


  render() {
    const { loadingFlag, data } = this.state;
    const { nodeInfo = [] } = data;
    return <div className={this.prefixCls}>
      <Spin weId={`${this.props.weId || ''}_702ufz`} spinning={loadingFlag}>
        <div className={`${this.prefixCls}-list`}>
          <div className={`${this.prefixCls}-title`}>审批流程图</div>
          {
            nodeInfo.map((x, index) => {

              const isLast = index === nodeInfo.length - 1;
              const isPass = x.nodeStatusEnum == "PASSED";
              const color = x.nodeColor || '#ccc';
              return <div className={`${this.prefixCls}-item`}>
                <div className={`${this.prefixCls}-item-box`} style={{ borderColor: color }}>
                  <div className={`${this.prefixCls}-nodename`}>{x.nodeName}</div>
                  <div className={`${this.prefixCls}-name`} style={{ background: color }}>
                    <HrmCard 
                      weId={`${this.props.weId || ''}_4kl2ah@`} 
                      id={x.creator} module="bs/hrm" type={"inside"} isColumn
                    ><span style={{ cursor: 'pointer' }}>{x.nodeOperatorName}</span></HrmCard>
                  </div>
                </div>
                { !isLast && <div className={`${this.prefixCls}-item-line ${isPass ? 'passed-active' : ''}`}></div> }
              </div>
            })
          }
        </div>
      </Spin>
    </div>


  }

}


export default CustWfChart;
