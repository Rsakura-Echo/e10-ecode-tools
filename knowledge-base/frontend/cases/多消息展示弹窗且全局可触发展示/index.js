


import React from 'react';
import { Dialog, Alert } from '@weapp/ui';

class MsgModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: false
    }
  }

  changeMsgModal = (status) => {
    this.setState({ visible: status });
  }

  componentDidMount() {
    window.changeMsgModal = this.changeMsgModal;
  }

  handleClose = () => {
    this.changeMsgModal(false);
  }

  render() {

    const { visible } = this.state;

    return <Dialog
      title="多消息展示面板"
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
    >
      <Alert message="Success Text" type="success" />
      <br />
      <Alert message="Info Text" type="info" />
      <br />
      <Alert message="Warning Text" type="warning" />
      <br />
      <Alert message="Error Text" type="error" />
    </Dialog>
  }

}

export default MsgModal;
