
import { regOvProps } from '@weapp/utils';


const FieldDataArr = [ // 重置的字段
  'dxwb_ctqipy',
  'dxwb_mqer12',
  'fj_4bfjav',
  'fj_4ikfrv',
  'ryxz_dnzc31',
  'bmxz_25gi0v'
] 

regOvProps('weappUi', 'Title', props => {
  if (props.weId === 'f56o40_9d1m87_xk40pb_86j9zh_l62wzb_6n3gm4_0yfg0p_pnhv5o') {
    if (Array.isArray(props.buttons) && Array.isArray(props.buttons[0])) {
      const { weappUi } = window;
      const { Button, Dialog } = weappUi;
      props.buttons[0].splice(0, 0, <Button onClick={() => {
        if ('WeFormSDK' in window) {
          const weFormSdk = window.WeFormSDK.getWeFormInstance();
          for (let i = 0; i < FieldDataArr.length; i++) {
            const key = FieldDataArr[i];
            const fieldid = weFormSdk.convertFieldNameToId(key);
            console.info(key, fieldid);
            if (fieldid) {
              weFormSdk.changeFieldValue(fieldid, { value: '' })
            }
          }
        } else {
          Dialog.message({ type: 'error', content: '获取表单SDK失败' });
        }
      }} >重置</Button>)
    }
  }
  return props;
});
