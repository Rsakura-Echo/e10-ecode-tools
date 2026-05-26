import { regOvComponent } from '@weapp/utils';

const timeInterval = 60;       //设置自动保存间隔，单位秒
let isRun = false;

const ovFlowPagePropsFn = (Com) => {  
  return React.forwardRef((props, ref) => {
    const { isCreate, workflowId, reqeustId, apiModule } = props.baseParam || {};
    const wffpSdk = window.weappWorkflow?.getFlowPageSDK();

    if(!isCreate && wffpSdk && !isRun){

      if(wffpSdk.doSilentSave && typeof(wffpSdk.doSilentSave) === 'function'){
        setInterval(function(){
          wffpSdk.doSilentSave(()=>{},{needLoading:false});       //静默保存
        },timeInterval*1000)
      }     

      isRun = true;
    }

    return <Com ref={ref} {...props} />;
  });
}




// 对流程详情pc端生效
regOvComponent('weappWorkflow', 'FPMainTab', ovFlowPagePropsFn, 0);


