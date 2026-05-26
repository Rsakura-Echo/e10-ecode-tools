
import { regOvProps } from '@weapp/utils';

const dataKey = 'mxb_3ovstl';

regOvProps('weappUi', 'Layout', props => {

  if (props.weId === 'qjuo8q_texgmn_w3eew9_texgmn_pphlde_pk6qdu' && window.WeFormSDK) {
    const weFormSDK = WeFormSDK.getWeFormInstance();
    const dtId = weFormSDK.convertFieldNameToId(dataKey, 'main', true);

    weFormSDK.registerCheckEvent(`${WeFormSDK.OPER_DELROW}${dtId}`, (ok, fail) => {
      weappUi.Dialog.confirm({
        title: 'ecode-删除明细',
        content: `是否确认删除当前明细行记录`,
        bottom: 200, top: '20%', height: 180,
        onOk: () => ok(),
        onCancel: () => fial()
      })
    });

  }
  return props;

});
