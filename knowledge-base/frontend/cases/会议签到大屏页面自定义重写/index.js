
import React from 'react';

import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { Spin, Dialog, Qrcode } from '@weapp/ui';

class MeetingSign extends React.Component {


  prefixCls = "ecode-cust-meeting-sign";
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      meetingId: '',
      loading: false,
      info: {},
      qrCode: '',
      signData: {}
    }
  }

  /**
   * 获取会议信息
   */
  loadData = (meetingId) => {
    this.setState({ loading: true });
    axios({
      url: '/api/meeting/detail/getMeetingDetailInfo',
      method: 'post',
      data: { meetingid: meetingId, signFlag: '' }
    }).then(res => {
      if (res.status === 200 && res.data.code === 200) {
        this.setState({ info: res.data.data });
      } else {
        Dialog.message({ content: res.data?.msg || '请求失败', type: 'error' });
      }
    }).finally(() => this.setState({ loading: false }))
  } 

  /**
   * 获取二维码信息
   */
  qrCode = (meetingId) => {
    axios({
      url: '/api/meeting/sign/getQrCode',
      method: 'post',
      data: { meetingid: meetingId, signFlag: '' }
    }).then(res => {
      if (res.status === 200 && res.data.code === 200) {
        this.setState({ qrCode: res.data.data.QrCode });
      }
    })
  }

  loadSignData = (meetingId) => {
    axios({
      url: '/api/meeting/sign/getScreenSignData',
      method: 'post',
      data: { meetingid: meetingId, signFlag: '', init: true }
    }).then(res => {
      if (res.status === 200 && res.data.code === 200) {
        this.setState({ signData: res.data.data });
      }
    })
  }

  checkIsId = (meetingId) => {
    if (!meetingId) return false;
    // 判断是否为18位数字
    return /^[0-9]{18}$/.test(meetingId);
  }

  componentDidMount() {
    const { meetingId } = this.props.match.params;
    if (!this.checkIsId(meetingId)) {
      this.setState({ error: '会议ID参数错误', loading: false });
    } else {
      this.loadData(meetingId);
      this.qrCode(meetingId);
      this.loadSignData(meetingId);
      setInterval(() => this.loadSignData(meetingId), 3000);
      this.setState({ meetingId, error: '' })
    }
  }


  render() {

    const { error, loading, info, qrCode, signData = {} } = this.state;
    const { list = [] } = signData;
    if (error) {
      return <div className={this.prefixCls}>
        <div className={`${this.prefixCls}-error-msg`}>{error}</div>
      </div>
    }
    return <div className={this.prefixCls}>
      <Spin spinning={loading}>
        <div className={`${this.prefixCls}-content`}>
          <div className={`${this.prefixCls}-title`}>{info.name}</div>
          <div className={`${this.prefixCls}-body`}>
            <div className={`${this.prefixCls}-code`}>
              { qrCode && <Qrcode level="H" url={qrCode} size={168}/> }
            </div>
            <div className={`${this.prefixCls}-info`}>
              <div className={`${this.prefixCls}-info-item`}>
                应到 {signData.count || 0} 人
              </div>
              <div className={`${this.prefixCls}-info-item`}>
                实到 {signData.doSign || 0} 人
              </div>
              <div className={`${this.prefixCls}-info-item`}>
                未到 {signData.unSign || 0} 人
              </div>
            </div>
            <div className={`${this.prefixCls}-list`}>
              <div className={`${this.prefixCls}-item item-title`}>
                <div className={`${this.prefixCls}-item-header`}></div>
                <div className={`${this.prefixCls}-item-name`}>姓名</div>
                <div className={`${this.prefixCls}-item-dept`}>部门</div>
                <div className={`${this.prefixCls}-item-time`}>签到时间</div>
              </div>
              {
                list.map(x => {
                  return <div className={`${this.prefixCls}-item`}>
                    <div className={`${this.prefixCls}-item-header`}></div>
                    <div className={`${this.prefixCls}-item-name`}>{x.name}</div>
                    <div className={`${this.prefixCls}-item-dept`}>{x.org}</div>
                    <div className={`${this.prefixCls}-item-time`}>{x.signtime}</div>
                  </div>
                })
              }
            </div>
          </div>
        </div>
      </Spin>
    </div>
  }

}



export default withRouter(MeetingSign);