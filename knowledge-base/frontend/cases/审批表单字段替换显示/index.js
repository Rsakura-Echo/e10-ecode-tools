


import React from 'react';
import { Icon, Dialog } from '@weapp/ui';

/**
 * 替换原有的字段展示
 */
class CustFormDate extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: false
    }
  }


  render() {
    const { visible } = this.state;
    const { OriginCom, ...others } = this.props;
    return <div className="cust-form-date">
      <Icon style={{ width: 24, height: 24 }} name="Icon-add-to02" onClick={() => this.setState({ visible: true })}/>
      <Dialog
        visible={visible}
        title="日期字段填写"
        onClose={() => this.setState({ visible: false })}
        closable
        destroyOnClose
        scale
        draggable
        mask
        maskClosable
        top="10%"
        width={'500px'}
        icon={'Icon-ecode'}
      >
        <OriginCom {...others} />
      </Dialog>
    </div>
  }

}

export default CustFormDate;
