
import React from 'react';
import { Dialog, Form, Button, FormStore } from '@weapp/ui';

export default class AddDialog extends React.Component {

  formStore = new FormStore();

  constructor(props) {
    super(props);
    this.state = {}
  }

  handleClose = () => {
    this.props.onClose?.();
  }

  handleRefresh() {
    // 获取当前流程字段数据
    const weForm = WeFormSDK.getWeFormInstance();
    // 获取所有字段
    const doms = document.querySelectorAll('[data-style="weapp-form-widget"]');
    for (let i = 0; i < doms.length; i++) {

    }
    // this.formStore.ini
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.visible === true) {
      this.handleRefresh();
    }
  }

  render() {

    const { visible } = this.props;

    return <Dialog
      title={'添加模板数据'}
      closable
      destroyOnClose
      scale
      draggable
      mask
      maskClosable
      top="10%"
      width={'500px'}
      icon={'Icon-N-Applysettings'}
      visible={visible}
      onClose={this.handleClose}
      buttons={[<Button onClick={this.handleRefresh} >刷新</Button>]}
      footer={[
        <Button onClick={this.handleClose}>取消</Button>,
        <Button type="primary" onClick={this.handleRefresh}>确认</Button>
      ]}
    >
      <Form store={this.formStore} />
    </Dialog>
  }

}