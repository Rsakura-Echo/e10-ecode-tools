import * as DEV_CONFIG from './config/config';

//展示默认的搜索条件
axios.interceptors.response.use((response) => {
		const { config,data,status } = response;
		const { url } = config;
   
		if (status == 200 && url.indexOf('/api/workflow/list/searchad/getListSearchAdWithForm') > -1 ) {
        const workflowid = JSON.parse(config.data).searchAdWorkflowid;
        const wfConfig = DEV_CONFIG['showField_'+workflowid];

        if(wfConfig){
          let data1 = data.data.layout[0];
          data.data.layout[1].map(fielddata => {
            const fid = fielddata.id;

            //控制默认查询条件范围
            if(wfConfig.indexOf(fid) > -1){
              let groupId = 'commonGroup';
              let fielddata2 = {...fielddata,groupId,hide:false,custom:false};
              
              data1.push(fielddata2);
            }
          })
          
          data.data.layout[0] = data1;  

        }
           

        //console.log("data==>",data.data);
		}
		return response;
	}, function (error) {
		console.info('接口请求出错啦', error);
	});