

import React from 'react';
import { corsImport, dayjs } from '@weapp/utils';
import axios from 'axios';
import { Dialog, Button, Timeline, Icon } from '@weapp/ui';

const prefixCls = `workflow-line-sign`;
class CustWfChart extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      page: 1,
      pageSize: 50,
      requestId: '',
      authSignatureStr: '',
      authStr: '',
    }
  }

  loadData = async (page) => { // 根据分页加载审批意见数据
    const { pageSize, requestId, authSignatureStr, authStr } = this.state;
    try {
      const res = await axios({
        url: '/api/workflow/core/common/comment/commentPage',
        method: 'post',
        data: {
          pageNo: page,
          pageSize, targetId: requestId,
          "module": "workflow",
          foldCommentList: true,
          queryChildren: true,
          authSignatureStr, authStr,
          datatype: 0, allowReplyReqLog: false
        }
      });
      if (res.status === 200) {
        const resData = res.data;
        const { code, data: pageData, msg } = resData;
        if (code === 200) {
          const { result = [] } = pageData.page;
          const { data = [] } = this.state;
          this.setState({ page, data: [...data, ...result] });
          if (data.hasNext) {
            return true;
          }
        } else {
          Dialog.message({ type: 'error', content: msg });
        }
        return false;
      }
    } catch (err) {
      console.info(err);
      Dialog.message({ type: 'error', content: '请求线性意见图异常' });
      return false;
    }
  }

  loadAllData = async () => { // 加载所有审批意见数据
    this.setState({ data: [], page: 1 }, () => {
      this.loadData(1);
    })
  }

  componentDidMount() {
    corsImport('@weapp/workflow').then(esm => {
      const wfSdk = esm.getCurrentFlowPageSDK();
      // 获取流程基础参数数据
      const { authSignatureStr, authStr, requestId } = wfSdk.getBaseParam();
      this.setState({
        authSignatureStr, authStr, requestId
      }, () => this.loadAllData());
    }).catch(err => {
      console.error(err);
      Dialog.message({ type: 'error', content: 'weappWorkflow corsImport error' });
    });
  }

  renderCard = (x) => { // 渲染意见卡片信息
  // <div className="sign-card-info-dept">部门</div>
    return <div className="sign-card">
      <div dangerouslySetInnerHTML={{ __html: x.originContent }}></div>
      <div className="sign-card-info">
        
        <div className="sign-card-info-person">{x.commentor.name}</div>
        <div className="sign-card-info-client">来自 {x.client}</div>
      </div>
    </div>
  }

  render() {

    const { Com, ...others } = this.props;
    const { data = [] } = this.state;
    return <Com
      bindKey={'wf_flowpage_main'}
      key='cust_line_sign' dataId='cust_line_sign'
      {...others}
    >
      <div className={`${prefixCls}-body`}>
        <div className={`${prefixCls}-opt`}>
          <Button onClick={() => this.loadAllData()} >刷新意见图</Button>
        </div>
        <div className={`${prefixCls}-line`}>
          <Timeline
            datas={data.map(x => {
              return {
                dotStyle: {
                  width: '24px',
                  height: '24px',
                  border: 'none',
                  background: '#52C41A'
                },
                dot: () => <Icon style={{color: "#fff"}} name="Icon-complete" /> ,
                dotBottom: () => dayjs(x.addTime).format('YYYY-MM-DD HH:mm:ss'),
                rightChildren: () => this.renderCard(x)
              }
            })}
          />
        </div>
      </div>
    </Com>
  }

}

export default CustWfChart;