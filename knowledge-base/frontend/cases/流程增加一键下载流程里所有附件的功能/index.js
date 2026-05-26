export const downloadZip = (keepSign="1")=> {
  let wfsdk = weappWorkflow.getCurrentFlowPageSDK();
  let commonParam = wfsdk?.baseStore?.commonParam || {};
  wfsdk.showMessage("压缩包开始下载，请耐心等待...",1,2)
  wfsdk.baseStore.setLoading(true);

  window.weappUtils.request({
      url: `/api/secondev/workflow/getEbConfig`,
      method: 'POST',
      data:{
      "requestId": commonParam?.requestId,
      "userId": commonParam?.currentUser?.userId,
      "nodeId": commonParam?.userCurrentNodeId,
      "keepSign": keepSign,
      "workflowId": commonParam?.workflowId,
      "tenantKey": commonParam?.currentUser?.tenantKey
    },
  }).then(ebConfigData=>{
    const {fieldMap={},pdfFileId=""} = ebConfigData?.data || {};
    let fileIdArr = [];
    let zipDefaultName = "";
    if(ebConfigData?.data&&ebConfigData?.data?.status&&Object.keys(fieldMap).length>0){
      const weFormSdk = window.WeFormSDK.getWeFormInstance();
      const {fjfield='',bhfield='',zipname=''} = fieldMap;
      let fjArr = fjfield.split("|");
      //2.收集表单附件字段的文件ID信息
      fjArr.map(fields=>{
        let fieldArr = fields.split("#");
        if(fieldArr.length == 2){
          let tabKey = fieldArr[0];
          let fieldnames = fieldArr[1];
          let fieldNameArr = fieldnames.split(",");
          fieldNameArr.map(fieldName=>{
            let fieldMark = "";
            if("main" != tabKey){
              //明细表，需转换
              const detailMark = weFormSdk.convertFieldNameToId(tabKey);
              fieldMark = weFormSdk.convertFieldNameToId(fieldName, detailMark);
              let rowIds = weFormSdk.getDetailAllRowIndexStr(detailMark);
              let allRowIdArr = rowIds.split(",");
              allRowIdArr.map(rowId=>{
                addFileId(weFormSdk,`${fieldMark}_${rowId}`,fileIdArr);
              })
            }else{
              fieldMark = weFormSdk.convertFieldNameToId(fieldName);
              addFileId(weFormSdk,fieldMark,fileIdArr);
            }
          })
        }
      })

      //3.封装压缩包名称
      const bhFieldMark = weFormSdk.convertFieldNameToId(bhfield);
      zipDefaultName = weFormSdk.getFieldValue(bhFieldMark);

      if(zipname!=''){
        let mainField = extractFields(zipname);
        let fieldValMap = {};
        mainField.map(fieldName=>{
          let fieldMark = weFormSdk.convertFieldNameToId(fieldName);
          let fieldVal = weFormSdk.getFieldObj(fieldMark);
          if(fieldVal.specialObj&&fieldVal.specialObj.length>0){
            let showName = "";
            fieldVal.specialObj.map(item=>{
              showName+=item?.name+",";
            })
            fieldValMap[fieldName] = showName==''?'':showName.substring(0,showName.length-1);
          }else if(fieldVal.value&&fieldVal.value!=''){
            fieldValMap[fieldName] = fieldVal.value;
          }else{
            fieldValMap[fieldName] = "";
          }
        })
        zipDefaultName = replaceFields(zipname,fieldValMap);
      }
    }

    //4.获取表单PDF文件ID
    if(pdfFileId!=''&&pdfFileId!='0'){
      fileIdArr.push(pdfFileId);
    }

    //5.文件ID去重
    let fileIdSet = [...new Set(fileIdArr)];
    if(fileIdSet.length == 0){
      wfsdk.baseStore.setLoading(false);
      wfsdk.showMessage("暂未获取到需要下载的文件",1,1);
      return;
    }

    //6.执行压缩包下载
    batchDownLoadWork(fileIdSet,zipDefaultName,wfsdk);
  })
  
}




/**
 * 批量下载任务
 */
const batchDownLoadWork = (fileIdArr,zipName,wfsdk) => {
  let fileIds = fileIdArr.join(",");//所有文件ID
  let startTime = new Date().getTime();
  //请求下载进度方法
  const getDownloadProcess = (uuid)=>{
    weappUtils.request({
      url: `/api/file/batchDownloadPercent`,
      method: 'GET',
      params:{"uuid":uuid},
    }).then((res)=>{
        const {code=0,data={}} = res;
        if(code===200){
          const {fileId=""} = data;
          if(fileId){
            //实际批量下载地址URL
            let downloadUrl = window.location.origin+"/api/file/remotedownload/"+fileId+"/upload/true";
            let endTime = new Date().getTime();
            console.log("下载共计耗时:"+(endTime-startTime));
            window.open(encodeURI(downloadUrl));
            wfsdk.baseStore.setLoading(false);
            setTimeout(function(){
              //提示下载成功标识
              window.WeFormSDK.showMessage("压缩包下载成功!", 1, 2)
            },1000)
          }else {
            getDownloadProcess(uuid)
          }
        }
    })
  }
  //发起批量下载请求
  weappUtils.request({
    url: `/api/file/batchDownloadByFileIds`,
    method: 'GET',
    params:{"module":WeaForm.formProps.module,"fileIds":fileIds,zipName:zipName},
  }).then(res=>{
      const {code=0,data={}} = res;
      if(code===200){
        const {data:key=""} = data;
        getDownloadProcess(key)
      }else{
        window.WeFormSDK.showMessage('文档服务下载接口异常:'+res['message'],1,2);
      }
  })
}



/**
 * 字段值替换
 */
const replaceFields = (str, fieldValMap) => {  
  const regex = /\$([^$]+)\$/g;  
  return str.replace(regex, (match, p1) => {  
      return fieldValMap[p1] || match;
  });  
}  

/**
 * 追加附件文件ID
 */
const addFileId=(weFormSdk,fieldMark,fileIdArr)=>{
  let fjVal = weFormSdk.getFieldValue(fieldMark);
  if(fjVal!=''){
    if(fjVal.includes(",")){
      fileIdArr.concat(fjVal.split(","));
    }else{
      fileIdArr.push(fjVal);
    }
  }
}

/**
 * 解析出表单字段名数据,示例数据：$fieldname1$-$fieldname2$
 * 结果：["fieldnam1","fieldname2"]
 */
const extractFields = (str) => {  
    // 使用正则表达式匹配以$开头和结尾的字符串  
    const regex = /\$([^$]+)\$/g;  
    const matches = [];  
    let match;  
    // 使用exec循环查找所有匹配项  
    while ((match = regex.exec(str)) !== null) {  
        matches.push(match[1]); // match[1] 是捕获组，提取结果  
    }
    return matches; // 返回匹配到的所有字符串数组  
}


/**
 * 真正的获取表单PDF文件ID的方法
 */
const getFormPdfFileId = (commonParam) =>{
  let pdfFileData = makeSyncRequestWithTimeout({url:'/api/secondev/workflow/getFormPdfFileId',method:'POST',reqData:JSON.stringify({
    "requestId": commonParam?.requestId,
    "userId": commonParam?.currentUser?.userId,
    "nodeId": commonParam?.userCurrentNodeId,
    "keepSign": "1"
  })});
  return pdfFileData;
}

/**
 * 同步接口请求
 */
export const makeSyncRequestWithTimeout = (params, timeout = 5000) => {
  var xhr = new XMLHttpRequest();
  const timeoutId = setTimeout(() => {
    xhr.abort();
    console.error('Request timed out after ' + timeout + 'ms');
    return {}; // 返回默认超时结果
  }, timeout);

  xhr.open(params.method, params.url, false);
  xhr.setRequestHeader("Content-Type", 'application/json;charset=utf-8')

  try {
    xhr.send(params.reqData);

    if (xhr.readyState === 4 && xhr.status === 200) {
      clearTimeout(timeoutId); // 如果请求已完成且成功，清除超时
      var response = JSON.parse(xhr.responseText);
      return response;
    } else if (xhr.status !== 200) {
      clearTimeout(timeoutId); // 请求失败，清除超时并记录错误
      console.error('Error occurred: ' + xhr.statusText);
    }
  } catch (e) {
    clearTimeout(timeoutId); // 请求过程中出错，清除超时并记录错误
    console.error('Request failed:', e);
  }

  // 超时未完成的请求，返回默认超时结果
  return {};
};
