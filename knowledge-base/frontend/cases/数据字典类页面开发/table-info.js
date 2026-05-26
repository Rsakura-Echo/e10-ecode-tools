
import React from 'react';
import { Dialog } from '@weapp/ui'

class TableInfoModel extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  handleClose = () => {
    this.props.onClose && this.props.onClose();
  }

  render() {

    const { visible, data, title, prefixCls } = this.props;

    return <Dialog
      visible={visible}
      onClose={this.handleClose}
      title={title}
      closable
      destroyOnClose
      scale
      draggable
      mask
      height={"75%"}
      maskClosable
      icon="Icon--Import-and-export"
    >
      <div className={`${prefixCls}-body`}>
        <div className={`${prefixCls}-header`}>
          
        </div>
        <div className={`${prefixCls}-data`}>

        </div>
      </div>
    </Dialog>
  }

}

export default TableInfoModel;
