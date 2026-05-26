


import React from 'react';
import axios from 'axios';
import { Spin, Icon } from '@weapp/ui';

export default class CustWfStatus extends React.Component {

  prefixCls = 'ecode-cust-wf-status';
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: {}
    }
  }

  /**
   * 加载状态总数
   */
  loadData = () => {
    this.setState({ loading: true });
    const { commonParam = {} } = weappWorkflow.getActiveFlowPageSDK().baseStore;
    const { 
      isTest, authSignatureStr, authStr, fixedNodeId,
      beAgentId, isAgent, userCurrentNodeId, isCreate,
      identityType, identityId, pageSize, current, isfirst,
      status, workflowId, requestId, targetId
    } = commonParam;
    axios({
      url: '/api/workflow/core/flowPage/getRequestStatusCount',
      method: 'get',
      params: {
        isTest, authSignatureStr, authStr, fixedNodeId,
        beAgentId, isAgent, userCurrentNodeId, isCreate,
        identityType, identityId, pageSize, current, isfirst,
        status, workflowId, requestId, targetId
      }
    }).then(res => {  
      if (res.status === 200 && res.data.code === 200) {
        this.setState({ data: res.data.data });
      }
    }).finally(() => this.setState({ loading: false }))
  }

  componentDidMount() {
    this.loadData();
  }

  render() {  

    const { loading, data = {} } = this.state;

    return <div className={this.prefixCls}>
      <div className={`${this.prefixCls}-title`}>流程状态</div>
      <Spin spinning={loading}>
        <div className={`${this.prefixCls}-list`}>
          <div className={`${this.prefixCls}-item item-allCount`}>
            <div className={`${this.prefixCls}-logo`}>
              <Icon size="lg" name="Icon-Total-person-time" />
            </div>
            <div className={`${this.prefixCls}-span`}>
              <div className={`${this.prefixCls}-val`}>{data.allCount || 0}</div>
              <div className={`${this.prefixCls}-unit`}>总人次</div>
            </div>
          </div>
          <div className={`${this.prefixCls}-item item-allSubmittedCount`}>
            <div className={`${this.prefixCls}-logo`}>
              <Icon size="lg" name="Icon-correct02" />
            </div>
            <div className={`${this.prefixCls}-span`}>
              <div className={`${this.prefixCls}-val`}>{data.allSubmittedCount || 0}</div>
              <div className={`${this.prefixCls}-unit`}>已操作</div>
            </div>
          </div>
          <div className={`${this.prefixCls}-item item-allNoSubmittedCount`}>
            <div className={`${this.prefixCls}-logo`}>
              <Icon size="lg" name="Icon-remind02" />
            </div>
            <div className={`${this.prefixCls}-span`}>
              <div className={`${this.prefixCls}-val`}>{data.allNoSubmittedCount || 0}</div>
              <div className={`${this.prefixCls}-unit`}>未操作</div>
            </div>
          </div>
          <div className={`${this.prefixCls}-item item-allViewedCount`}>
            <div className={`${this.prefixCls}-logo`}>
              <Icon size="lg" name="Icon-Viewed" />
            </div>
            <div className={`${this.prefixCls}-span`}>
              <div className={`${this.prefixCls}-val`}>{data.allViewedCount || 0}</div>
              <div className={`${this.prefixCls}-unit`}>已查看</div>
            </div>
          </div>
          <div className={`${this.prefixCls}-item item-allNoViewedCount`}>
            <div className={`${this.prefixCls}-logo`}>
              <Icon size="lg" name="Icon-help" />
            </div>
            <div className={`${this.prefixCls}-span`}>
              <div className={`${this.prefixCls}-val`}>{data.allNoViewedCount || 0}</div>
              <div className={`${this.prefixCls}-unit`}>未查看</div>
            </div>
          </div>
        </div>
      </Spin>
    </div>

  }

}
