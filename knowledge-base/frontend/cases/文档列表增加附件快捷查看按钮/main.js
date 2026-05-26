
import AttachListDialog from './index';
import React from 'react';
import { Provider } from 'mobx-react';
import { Button } from '@weapp/ui';

import attachDialogStore from './store';

export default class Main extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: false
    }
  }

  open = () => {
    this.setState({ visible: true });
  }

  render() {

    const { doc } = this.props;
    const { docAttachments = [] } = doc || {};
    return <Provider attachDialogStore={attachDialogStore} >
      <Button size={"small"} onClick={this.open}>查看附件 ({docAttachments.length})</Button>
      <AttachListDialog onClose={() => {
        this.setState({ visible: false });
      }} visible={this.state.visible} {...this.props} />
    </Provider>
  }

}


export { default as attachDialogStore } from './store';