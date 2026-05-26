
import React from 'react';
import axios from 'axios';
import { Dialog } from '@weapp/ui';

const SsoButton = () => {

  const handleSsoClick = async () => {
    const res = await axios({
      url: '/api/ecode/serverless/func/exec', method: 'post', data: {
        token: 'CFK42K121372617113J',
        funcId: '747145604703019008'
      }
    });
    if (res.status == 200 && res.data.code) {
      console.info(res.data);
      const funcRes = res.data.data;
      if (funcRes.code == 200) {
        window.open(funcRes.data.url);
      } else {
        Dialog.message({ type: 'error', content: funcRes.msg });
      }
    }
  }

  return <div className="sso-button" onClick={handleSsoClick}>
    进入E9
  </div>
}

export default SsoButton;