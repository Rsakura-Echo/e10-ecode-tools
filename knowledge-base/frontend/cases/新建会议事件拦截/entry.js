


import { regOvProps } from '@weapp/utils';


regOvProps('weappUi', 'Button', props => {

  if (props.weId === '903dhc_leid4e_794hn9_5vk7h7_bec7mf') {
    let oldClick = props.onClick;
    props.onClick = () => window?.weappUi?.Dialog.confirm?.({
      content: '请选择会议使用系统',
      height: 220,
      onOk: () => {
        oldClick?.();
      },
      okText: 'OA系统创建',
      onCancel: () => { // 第三方
        window.open('https://eteams.cn');
      },
      cancelText: '第三方系统创建'
    });
  }

  return props;

});



