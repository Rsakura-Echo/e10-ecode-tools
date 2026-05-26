
import React from 'react';
import { Dialog, Form, FormStore, Button } from '@weapp/ui';
class AddFormModal extends React.Component {

  formStore = new FormStore();

  constructor(props) {
    super(props);
    this.state = {

    };
  }
  
  handleClose = () => {
    this.props.onClose && this.props.onClose();
  }

  handleSubmit = () => { // 提交数据
    this.props.onSubmit && this.props.onSubmit();
  }

  componentDidMount() { // 组件渲染完成之后把form挂载出去
    const { onMount } = this.props;
    onMount && onMount(this.formStore);
  }

  render() {

    const { visible } = this.props;

    return <Dialog
      title="新增数据"
      closable destroyOnClose scale
      draggable mask maskClosable
      className="ecode-case-tablewith-excel-dialog"
      wrapClassName="ecode-case-tablewith-excel-dialog-wrap"
      height="auto" top="10%"
      visible={visible}
      onClose={this.handleClose}
      footer={[
        <Button onClick={this.handleClose}>取消</Button>,
        <Button type="primary" onClick={this.handleSubmit}>确定</Button>
      ]}
    >
      <Form store={this.formStore} />
    </Dialog>
  }

}

export default AddFormModal;
