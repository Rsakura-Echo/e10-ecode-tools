axios.interceptors.response.use((response) => {
		const { config={},data,status } = response;
		const { url } = config;
    // console.log("url",url);
		if ( status == 200 && (url.indexOf('/api/workflow/list/data/getDraftListData/batch/batchSubmit') > -1 || url.indexOf('/api/workflow/list/data/getTodoListData/batch/batchSubmit') > -1)) { 
        
        //=====项目配置 Start=====
        // isshow：是否显示（true/false）
        // width：列宽（百分比）
        let columnConfig = {
          "requestnameTitle":{"isshow":true,"width":"50%"}, //流程名称
          "currentnode":{"isshow":false,"width":"25%"},//当前节点
          "creatername":{"isshow":true,"width":"25%"},//发起人
          "createdatetime":{"isshow":true,"width":"25%"}//发起时间
        };
        //=====项目配置 End=====
        
        let columns = data.data.columns;
        if(data.data.columns){
            let columnsNew = [];
            columns.map(column => {
              let dataIndex = column.dataIndex;
              if(columnConfig[dataIndex].isshow){
                column.width = columnConfig[dataIndex].width;
                columnsNew.push(column);
              }
            })
            data.data.columns = columnsNew;
        }
		}
		return response;
	}, function (error) {
		console.info('接口请求出错啦', error);
	}
);

/*
axios.interceptors.response.use((response) => {
		const { config,data,status } = response;
		const { url } = config;
    console.log("url",url);
		if ( status == 200 && url.indexOf('/api/workflow/core/flowPage/loadFrameParam') > -1 ) { 
        
        let customTabConfig = data.data.customTabConfig;
        if(data.data.customTabConfig){
            let customTabConfigNew = [];
            customTabConfig.map(tab => {
             
              tab.tabName = tab.tabName + "(2)";
              customTabConfigNew.push(tab);
            })
            data.data.customTabConfig = customTabConfigNew;
        }

        let tabConfig = data.data.tabConfig;
        if(data.data.tabConfig){
            let tabConfigNew = [];
            tabConfig.map(tab => {
             
              tab.content = tab.content + "(2)";
              tabConfigNew.push(tab);
            })
            data.data.tabConfig = tabConfigNew;
        }
		}
		return response;
	}, function (error) {
		console.info('接口请求出错啦', error);
	}
);

axios.interceptors.request.use((config) => {
    
  let { url, data } = config;  
      
     //拦截创建流程接口
     if(url == '/api/workflow/core/common/queryRelevance/showRelevance'){
       data.otherParam.authSignatureStr = '';
       data.otherParam.authStr = '';

       console.log("data",data);
     }
   
  return config;
});*/