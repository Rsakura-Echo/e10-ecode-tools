import { regOvProps, request } from '@weapp/utils';

regOvProps("weappUi","MMenu",(props)=>{
  // 过滤人员
  if(TEAMS.currentUser.employeeId != 'xxxxxxxx'){
    props.data = props.data.filter((_item)=>{
      return _item.id != 'reportMenu'
    })
  }
  
  return props;
})