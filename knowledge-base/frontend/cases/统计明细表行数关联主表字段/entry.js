

import { regOvProps } from '@weapp/utils';

regOvProps('weappUi', 'Layout', props => {

  if (props.weId === 'qjuo8q_texgmn_w3eew9_texgmn_pphlde_pk6qdu' && window.WeFormSDK) {
    const weFormSDK = WeFormSDK.getWeFormInstance();
    const dtId = weFormSDK.convertFieldNameToId('mxb_0xv3jf', 'main', true);
    const targetFieldId = weFormSDK.convertFieldNameToId('sz_9nqf0r', 'main', true);

    const calcNums = () => { // 重新获取明细行总数，赋值给主表字段
      // 获取明细总行数
      const nums = weFormSDK.getDetailRowCount(dtId);
      console.info('总行数 => {}', nums);
      weFormSDK.changeFieldValue(targetFieldId, {
        value: nums
      })
    }
    console.info('添加钩子')
    weFormSDK.registerAction(`${WeFormSDK.ACTION_ADDROW}${dtId}`, (index) => {
      console.info('添加明细行 => ', index);
      calcNums();
    });

    weFormSDK.registerAction(`${WeFormSDK.ACTION_DELROW}${dtId}`, (index) => {
      console.info('删除明细行 => ', index);
      calcNums();
    });

  }
  return props;

});
