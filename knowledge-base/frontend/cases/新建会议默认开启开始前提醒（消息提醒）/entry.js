// 添加响应拦截器
//以下是一些参数说明：
//remindType : 提醒方式，2 短信，3邮件，6 系统消息提醒
//remindCountCircle : 循环提醒次数，一般默认1
//remindTimeSingle : 提醒时间 （"0", "正点";
//"1", "5分钟前";
//"2", "10分钟前";
//"3", "15分钟前";
//"4", "30分钟前";
//"5",  "1小时前";
//"6",  "2小时前";
//"7",  "1天前";
//"8", "2天前";
//"9", "自定义";） 一般默认3 ，提前15分钟即可。
axios.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  

  if (response && response.config && (response.config.url == '/api/meeting/detail/getMeetingNewRemindFields' ||
    response.config.url == '/api/app/meeting/detail/getMeetingNewRemindFields')) {
    let requestData = {};
    if(response && response.config && response.config.data){
      requestData = JSON.parse(response.config.data)    
    }
    console.log('----',requestData)
    if(requestData && requestData.operateType && requestData.operateType == 'ADD'){
      if (response.data && response.data.data &&
        response.data.data.newRemindSetDataListStart) {
        const newRemind = response.data.data.newRemindSetDataListStart
        newRemind[0]['remindCountCircle'] = 1
        newRemind[0]['remindType'] = ['6']
        newRemind[0]['remindTimeSingle'] = '3'
       
        
        
        response.data.data.newRemindSetDataListStart = newRemind
      }
      if (response.data && response.data.data &&
        response.data.data.newRemindSetDataListEnd) {
        const newRemind = response.data.data.newRemindSetDataListEnd
        newRemind[0]['remindCountCircle'] = 1
        newRemind[0]['remindType'] = ['6']
        newRemind[0]['remindTimeSingle'] = '3'
       
        
        
        response.data.data.newRemindSetDataListEnd = newRemind
      }
      if (response.data && response.data.data &&
        response.data.data.newRemindFieldFormOnlyStart) {
        const itemsTemp = response.data.data.newRemindFieldFormOnlyStart.weaForm.items
        itemsTemp['remindBeforeStart']['value'] = true
        response.data.data.newRemindFieldFormOnlyStart.weaForm.items = itemsTemp
      }
      if (response.data && response.data.data &&
        response.data.data.newRemindFieldFormOnlyEnd) {
        const itemsTemp = response.data.data.newRemindFieldFormOnlyEnd.weaForm.items
        itemsTemp['remindBeforeEnd']['value'] = true
        response.data.data.newRemindFieldFormOnlyEnd.weaForm.items = itemsTemp
      }
    }
    console.log('response==========2', response)
    
  }
  
  // 对响应数据做点什么
  return response;
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  return Promise.reject(error);
});



// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  

  if (response && response.config && (response.config.url == '/api/meeting/detail/getMeetingDetailField' ||
    response.config.url == '/api/app/meeting/detail/getMeetingDetailField')) {
      let requestData = {};
      if(response && response.config && response.config.params){
        requestData = response.config.params
      }
      
    if (response.data && response.data.data &&
      response.data.data.meetingFields &&
      response.data.data.meetingFields.items) {
        if(requestData && requestData.operateType && requestData.operateType == 'ADD'){
          const items = response.data.data.meetingFields.items
          let itemsTemp = items
          Object.keys(items).forEach(_key => {
            if (_key == 'remindBeforeStart') {
              let _item = items[_key]
              _item = {
                  ..._item,
                  value: 1,
                }
              itemsTemp['remindBeforeStart'] = _item
            }
            if (_key == 'remindBeforeEnd') {
              let _item = items[_key]
              _item = {
                  ..._item,
                  value: 1,
                }
              itemsTemp['remindBeforeEnd'] = _item
            }
            if (_key == 'remindImmediately') {
              let _item = items[_key]
              _item = {
                  ..._item,
                  value: true,
                }
              itemsTemp['remindImmediately'] = _item
            }
            if (_key == 'remindToCreater') {
              let _item = items[_key]
              _item = {
                  ..._item,
                  value: ['1'],
                }
              itemsTemp['remindToCreater'] = _item
            }
          })
          response.data.data.meetingFields.items = itemsTemp
        }
      
    }
    console.log('response==========3', response)
  }
  
  // 对响应数据做点什么
  return response;
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  return Promise.reject(error);
});