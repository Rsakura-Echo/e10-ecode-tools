import { regOvProps, request } from '@weapp/utils';


regOvProps('weappUi', 'Button', (props) => {
  console.log(props)
  if(props.weId === "f56o40_9d1m87_yqqr5r_i2ubc9_cihdnd_6n3gm4_t03ihg@0_xomsa1@0") {
    const _onClick = props.onClick

    props.onClick = () => {
      const { confirm } = window.weappUi.Dialog;
      confirm({
        content: '确认提交本流程吗？',
        onOk: () => {
          console.log('OK');
          request({
            method: 'get',
            url: '/api/my/common/renderCount',
          }).then(res => {
            alert('提交成功！')
          })
          // _onClick()
        },
        onCancel: () => {
          console.log('Cancel');
        },
        destroy: () => {
          console.log('组件销毁了')
        }
      });
    }
  }
  return props;
}, 0);