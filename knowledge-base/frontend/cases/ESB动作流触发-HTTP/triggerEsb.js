import { request } from '@weapp/utils';

request({
  method: 'post',
  url: '/api/esb/server/event/triggerActionFlow',
  data: {
    customParams: { mainTable: {} },
    moduleSource: 'ecode',
    esbFlowId: '846583664090419200',  // 动作流 ID
  },
}).then(res => {
  if (res.resultCode && res.resultCode == '200') {
    // 成功
  }
});
