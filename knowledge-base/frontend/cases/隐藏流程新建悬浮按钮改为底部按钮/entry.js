


import { regOvProps, history } from '@weapp/utils';


regOvProps('weappUi', 'MMenu', props => {

  if (props.weId === '3rdcst_oxa9w7_af1w56_6rw4jw_7pgnmp') {
    if (Array.isArray(props.data)) {
      props.data.push({
        content: "新建审批",
        icon: "Icon-add-to01",
        id : "newflow"
      });

      let oldChange = props.onChange;
      props.onChange = (val) => {
        if (val == 'newflow') {
          const btn = document.querySelector('.weapp-workflow-m-list .ui-m-quick-menu-start-btn .ui-icon');
          btn.click();
        } else {
          oldChange?.(val);
        }
      }
    }
  }

  return props;
});
