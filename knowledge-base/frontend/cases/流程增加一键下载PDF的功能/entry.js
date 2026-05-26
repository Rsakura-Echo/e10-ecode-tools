import axios from 'axios';
import { regOvProps} from '@weapp/utils';
import {downloadZip,downloadPdf,makeSyncRequestWithTimeout} from './util/index';

const downLoadPdfBtn = { menutype: 'CUSTOM', title: '下载Pdf', orderid: 0, istop: 1 };

axios.interceptors.response.use((response) => {
  const {config={}} = response;
  const {url = ""} = config;
  try{
    if(url.startsWith('/api/workflow/core/flowPage/getRightMenu')){
      const {rightMenus=[]} = response?.data?.data; 
      let hasRight = false;
      rightMenus.map(item=>{
        const {menutype=''} = item;
        if(menutype == "PRINT"){
          hasRight = true;
        }
      })
      if(hasRight){
        rightMenus?.push(downLoadPdfBtn);
      }
    }
  }catch(e){
    console.error("【"+url+"】接口拦截业务异常~~",e)
  }
  return response;
}, function (error) {
  console.info('接口请求出错啦', error);
});


const ovFlowPagePropsFn = (props) => {
  regOvProps('weappUi', 'Button', (btnProps) => {
    const title = btnProps["title"];
    if (title && title == "下载Pdf") {
      btnProps.onClick = () => {
        downloadPdf();
      }
    }
    return btnProps;
  }, 0); 
  //可实现原组件props复写
  return props;
}


// 对流程详情pc端生效
regOvProps('weappWorkflow', 'FPMainTab', ovFlowPagePropsFn, 0);