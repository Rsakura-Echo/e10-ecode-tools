



import { regOvProps } from '@weapp/utils';


function checkUser() {
  return ['4185033700327153289'].includes(window?.TEAMS?.currentUser?.id);
}

const idArr = [ // 屏蔽的id
  'menu_recycle', // 审批的回收站
  'wfc_setting', // 审批的设置
] 

regOvProps('weappUi', 'Menu', props => {
  if (props.weId === 'gzfscz_91zmqz'
   && checkUser()) {
    props.data = props.data.filter(d => !idArr.includes(d.id));
  }
  return props;
});



