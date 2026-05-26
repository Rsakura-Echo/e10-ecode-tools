

import React from 'react';
import { Button, Dialog, Qrcode } from '@weapp/ui';

class SignCom extends React.Component {


  prefixCls = "ecode-meeting-sign"
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      qrCode: ''
    }
  }

  handleClose = () => {
    this.setState({ visible: false });
  }

  queryCode = (meetingId) => {
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

  render() {

    const { visible, qrCode } = this.state;
    const { record } = this.props;

    return <div>
      <Button size="small" onClick={e => {
        e.stopPropagation();
        this.setState({ visible: true });
        this.queryCode(record.id);
      }}>二维码签到</Button>
      <Dialog
        title={`会议-[${record.name}]`}
        closable
        destroyOnClose
        scale
        draggable
        mask
        maskClosable
        top="10%"
        width={'500px'}
        visible={visible}
        onClose={this.handleClose}
        buttons={[
          <Button onClick={() => this.queryCode(record.id)} >刷新</Button>
        ]}
      >
        <div className={`${this.prefixCls}-code`}>
          { qrCode && <Qrcode level="H" url={qrCode} size={168}/> }
        </div>
      </Dialog>
    </div>
  }

}

export default SignCom;
