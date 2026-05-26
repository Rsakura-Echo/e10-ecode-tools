

import React from 'react';
import { Button, Dialog } from '@weapp/ui';

export default class ButtonCom extends React.Component {


  openCreateWf = () => { 
    if ('ebdfListSdk' in window) {
      const datas = ebdfListSdk.getListDatas();
      const ids = ebdfListSdk.getCheckIds();
      if (ids.length === 0) {
        Dialog.message({ type: 'error', content: '请选择数据' });
      } else if (ids.length > 1) {
        Dialog.message({ type: 'error', content: '请选择一条数据' });
      } else { // 
        const data = datas.find(x => ids.includes(x.ebrecord_rowkey));
        // 拼接参数创建流程
        // 获取会议编号
        const hybh = data.field_19;
        window.open('/sp/workflow/flowpage/fullCreate/770547202209382400?field3506260700722776180=' + hybh);
      }
    } else {
      Dialog.message({ type: 'error', content: '建模SDK初始化尚未完成，请稍后再试' })
    }
  }

  render() {
    return <Button onClick={this.openCreateWf}>
      创建会议流程
    </Button>
  }
}
