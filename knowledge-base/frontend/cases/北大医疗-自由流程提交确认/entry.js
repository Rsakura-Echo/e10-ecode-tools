import { regOvProps } from '@weapp/utils';

let isFirst = true;
const ovFlowPagePropsFn = (props) => {

    const wffpSdk = window.weappWorkflow.getFlowPageSDK();
    isFirst && wffpSdk.ready(() => {        
        wffpSdk.registerInterceptEvent('BeforeDoSubmit', (successFn,failFn,params) => {
          debugger;
            if(window.__hasCheck && window.__hasCheck == true){
              //用户点击确认后，不需要再次弹窗
              successFn();
            }else{
              const { approvalData} = params;
              const {operateNodeInfo = []} = approvalData!;

              if(operateNodeInfo.length == 0){
                successFn();
              }else{
                  let linkStr = '';
                  operateNodeInfo.map(freeNode => {
                      const{ccOperatorInfos = [],nodeAddOperators = [],signType} = freeNode;
                      //拼接操作者
                      let opStr = '';
                      let separator = '|';
                      if(signType === '0')
                        separator = '/';
                      else if(signType === '2')
                        separator = ',';

                      nodeAddOperators.map(op => {
                        opStr += separator + op.name;
                      })

                      if(opStr != '')
                        opStr = opStr.substring(1);

                      //拼接抄送人
                      let ccOpStr = '';
                      ccOperatorInfos.map(op => {
                        ccOpStr += "§" + op.name;
                      })

                      //拼接节点字符串
                      linkStr += '→' + opStr + ccOpStr;
                  })

                  if(linkStr != '')
                    linkStr = linkStr.substring(1);

                  linkStr = linkStr ;
                  

                  //修改提示字体大小
                  if(!window.WeFormSDK.isMobile()){
                    window.__fontInterval = setInterval(function(){                  
                      var elements = document.querySelectorAll(".ui-confirm-body.ui-confirm-body-auto.ui-confirm-body-center");  
                      elements.forEach(function(element) {  
                          element.style.fontSize = '15px';  
                      }); 
                    },10)
                  }

                  window.WeFormSDK.showConfirm(linkStr, 
                    function(){
                      window.__hasCheck = true;
                      successFn();
                    },
                    function(){
                      clearInterval(window.__fontInterval);
                      window.__hasCheck = false;
                      failFn();
                    },{
                      okText:'确认并提交',
                      cancelText:'修改审批链',
                      title:'审批链确认'
                    }
                  ); 
                }
            }          
        })
    });
    
    isFirst = false;
    window.__hasCheck = false;
    return props;
}

// 对流程详情pc端生效
regOvProps('weappWorkflow', 'FPMainTab', ovFlowPagePropsFn, 0);

// 对流程详情移动端生效
regOvProps('weappWorkflow', 'MFPMainTab', ovFlowPagePropsFn, 0);
