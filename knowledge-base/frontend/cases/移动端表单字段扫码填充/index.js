

import React from 'react';
import { Icon, Dialog } from '@weapp/ui';
import { weappSDK } from '@weapp/utils';
const prefixCls = `ecode-scan-com`;

export default class ScanCom extends React.Component {


  nativeRun = (api, options) => 
    weappSDK.checkApi(api).then(() => weappSDK.invoke(api, { ...options })
    .catch((err) => {
      console.log(err);
    })).catch(() => {
    if (options.fail) {
      options.fail();
    }
  });


  handleClick = () => {
    this.nativeRun('scanQRCode', { needResult: 1 }).then(res => {
      const weForm = WeFormSDK.getWeFormInstance();
      weForm.changeFieldValue(`field${this.props.fieldId}`, { value: res.resultStr });
    });
  }

  render() {
    return <div className={prefixCls} onClick={this.handleClick}>
      <Icon size="lg" name="Icon-N-Code-scanning-setting" />
    </div>
  }

}
