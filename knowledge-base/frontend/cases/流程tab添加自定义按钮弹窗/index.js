

import React from 'react';
import { Dialog } from '@weapp/ui';

class CustTabBtn extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false
    }
  }

  render() {
    return <div onClick={(e) => {
      this.setState({ open: true });
      e.stopPropagation();
      e.preventDefault();
    }}>
      CustBtn
      <Dialog
        visible={this.state.open}
        onClose={() => {
          this.setState({ open: false });
        }}
        closable={true}
      >
        Dialog
      </Dialog>
    </div>
  }

}


export default CustTabBtn;