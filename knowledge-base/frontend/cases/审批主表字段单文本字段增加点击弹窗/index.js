

import { Button, Dialog } from '@weapp/ui';
import React from 'react';


class ModalBtn extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: false
    }
  }

  render() {
    return <>
      <Button onClick={() => this.setState({ visible: true })} >弹窗</Button>
      <Dialog
        title="弹窗"
        visible={this.state.visible}
        onClose={() => this.setState({ visible: false })}
        closable
        destroyOnClose
        scale
        draggable
        mask
        maskClosable
      >
        弹窗内容
      </Dialog>
    </>
  }

}

export default ModalBtn


