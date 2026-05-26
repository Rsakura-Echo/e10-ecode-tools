/**
 * 下载表单PDF文件
 */
export const downloadPdf = ()=> {
  let wfsdk = weappWorkflow.getCurrentFlowPageSDK();
  let commonParam = wfsdk?.baseStore?.commonParam || {};
  wfsdk.showMessage("表单转PDF文件下载中，请耐心等待...",1,2);
  wfsdk.baseStore.setLoading(true);
  window.weappUtils.request({
      url: `/api/secondev/workflow/getFormPdfFileId`,
      method: 'POST',
      data:{
      "requestId": commonParam?.requestId,
      "userId": commonParam?.currentUser?.userId,
      "nodeId": commonParam?.userCurrentNodeId,
      "keepSign": "1"
    },
  }).then(res=>{
    const {data={}} = res
    const {status=false,pdfFileId=''} = data;
    if(status&&pdfFileId!='' &&pdfFileId!='0'){
      window.open('/api/file/remotedownload/'+pdfFileId+'/token/true');
    }else{
      wfsdk.showMessage("表单转PDF下载失败！",2)
    }
    wfsdk.baseStore.setLoading(false);
    wfsdk.showMessage("下载完成！",3,1);
  })
}



