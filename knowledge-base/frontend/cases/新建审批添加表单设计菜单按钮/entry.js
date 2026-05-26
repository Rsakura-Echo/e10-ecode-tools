
import { regOvProps } from '@weapp/utils';


regOvProps('weappUi', 'Title', props => {
  if (props.weId === 'f56o40_9d1m87_xk40pb_86j9zh_l62wzb_6n3gm4_0yfg0p_pnhv5o') {
    if (Array.isArray(props.buttons) && Array.isArray(props.buttons[0])) {
      const { weappUi } = window;
      const { Button, Dialog } = weappUi;
      props.buttons[0].splice(0, 0, <Button onClick={() => {
        if ('WeaForm' in window) {
          const { form } = window.WeaForm.getFormData();
          const { id } = form;
          window.open(`/sp/workflow/formdesigner?wfSymbol=workflow&type=edit&formId=${id}&module=workflow&layoutMultiId=&entrance=formManager`);
        } else {
          Dialog.message({ type: 'error', content: '获取表单SDK失败' });
        }
      }} >表单设计</Button>)
    }
  }
  return props;
});
