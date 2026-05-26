import { getLabel  } from '@weapp/utils';


axios.interceptors.response.use((response) => {
		const { config,status,data } = response;
		let { url } = config;
    let {code} = data;
    let data2 = data.data;

    
		if ( status == 200 && (url.indexOf('/api/workflow/core/form/core/saveFormData') > -1 )) {

        const{simpleDetails = [],conflictDetails = []} = data2;
        const wffpSdk = window.weappWorkflow.getFlowPageSDK();

        //=================【项目配置 Start】=============
        const refresh_label = '-1048914619588304899';//刷新按钮 标签
        const content_label = '-1048914619588304899';//提醒内容 标签
        //=================【项目配置 End】=============

        if(code == 500 && (simpleDetails.length > 0 || conflictDetails.length > 0)){

          //调用接口，保存意见
          const remark = wffpSdk.getSignRemark(false);
          let _params = {requestId:wffpSdk.getBaseParam().requestId,remark};
          axios.post("/api/secondev/workflow/doSaveWf", _params).then(function(response){});

          //屏蔽标准的提醒
          data.msg = '';
          data.code = 500;
          data.data.simpleDetails = [];
          data.data.conflictDetails = [];

          //移动端，屏蔽toast提示
          if(window.WeFormSDK.isMobile()){
            window.__toastInterval = setInterval(function(){
              var toasts = document.querySelectorAll(".ui-m-toast");  
    
              toasts.forEach(function(toast) {  
                  toast.style.display = 'none';  
              });
            },10)
          }
          

          //展示确认框
          window.WeFormSDK.showConfirm(getLabel(content_label,'其他用户已提交，点击刷新后获取最新数据'), 
            function(){
              location.reload();
            },
            function(){
              if(window.WeFormSDK.isMobile())
                clearInterval(window.__toastInterval);
            },
            {
              okText:getLabel(refresh_label,'刷新')
            }
          );    
        }

        
		}
    return response;
	}, function (error) {
		console.info('接口请求出错啦', error);
	});

