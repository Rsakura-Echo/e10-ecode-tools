import { dayjs } from '@weapp/utils';

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  
  if (response && response.config && (response.config.url == '/api/meeting/detail/getMeetingDetailField' ||
    response.config.url == '/api/app/meeting/detail/getMeetingDetailField')) {
    if (response.data && response.data.data &&
      response.data.data.meetingFields &&
      response.data.data.meetingFields.items) {
        //----版本1 控制组件的开始时间的最小时间为当前时间---start
      const items = response.data.data.meetingFields.items
      let itemsTemp = items
      Object.keys(items).forEach(_key => {
        if (_key == 'beginDatetime') {
          let _item = items[_key]
          _item = {
              ..._item,
              minDate: new Date(),
            }
          itemsTemp['beginDatetime'] = _item
        }
      })
      response.data.data.meetingFields.items = itemsTemp
      //----版本1---end
    }

    // ----版本2---start
    if(window.MeetingFrom){
      let needRegister = true;
      const newEventListFunc = window.MeetingFrom.newEventListFunc
      if(newEventListFunc && newEventListFunc.length > 0){
        newEventListFunc.forEach((_item)=>{
          if(_item['funcName'] && _item['funcName'] == 'chkBeginDateTimeIsValid'){
            needRegister = false;
          }
        })
        if(needRegister){
          async function chkBeginDateTimeIsValid (params){
            let beginDatetime = params['beginDatetime']
            if(new Date(beginDatetime).getTime() < new Date().getTime()){
              weappUi.Dialog.confirm({
                mask: true,
                onOk: () => {
                  ;
                },
                title: '信息确认',
                content: '开始时间小于当前时间，请重新选择！',
              })
              return 'false'
            }
            return 'true'

          }
          MeetingFrom.registerCheckEvent(chkBeginDateTimeIsValid,'chkBeginDateTimeIsValid')
        }
      }
    }
    
  }
  // 对响应数据做点什么
  return response;
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  return Promise.reject(error);
});