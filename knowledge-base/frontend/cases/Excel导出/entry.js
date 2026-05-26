import React from 'react';
import { regOvProps,regOvComponent  } from '@weapp/utils';
import { urlSetting } from './config/config';
import { asyncImport } from '@weapp/ecodesdk';

const CustomBatchExport = React.lazy(() => asyncImport('${appId}', 'customBatchExport'));

//增加导出Excel按钮
axios.interceptors.response.use((response) => {
		const { config,data,status } = response;
		const { url } = config;
		if (__needDev() && status == 200 && url.indexOf('/api/workflow/list/button/getRequestListButton') > -1 ) {
				let {quickButton = []} = data.data;
        quickButton.push({id:'exportExcel',content:'导出Excel',buttonType:'default'});    
		}
		return response;
	}, function (error) {
		console.info('接口请求出错啦', error);
	}
);

//Excel导出按钮注册事件
regOvProps("weappUi", "Button", (props) => {
    if(__needDev() && props.title == '导出Excel'){
        props.onClick = function(){
          //获取总数量
          const exportUrl = __getExportUrl();
          const {totalUrl,dataUrl} = exportUrl;

          //获取所有数据 
          axios.post(totalUrl, {...window.__data})
              .then(function (response) {
                const {status,data} = response;
                if(status == 200){
                  const total = data.data.total;

                  if(total <= 0){
                    weappUi.Dialog.message({
                        type: 'info',
                        content: '没有可导出的数据！'
                    });
                  }else{
                    weappUi.Dialog.confirm({
                        mask: true,
                        okText: '确定',
                        content: '导出提示: 是否确认将'+total+'条流程进行导出？',
                        onOk: execExportFunc
                    })
                  }
                                
                  
                  function execExportFunc(){
                      let randomNum = Math.ceil(Math.random() * 10000);
                      axios.post("/api/workflow/list/export/preExportFile", {randomNum})
                        .then(function(response){
                              if(!response.data.status){
                                  weappUi.Dialog.message({
                                        type: 'error',
                                        content: response.data.msg
                                    });
                              }else{
                                var taskid = response.data.data;
                                                

                                //展示下载组件
                                window.$devThis.setState({visible:true});

                                //执行导出任务
                                axios.post("/api/secondev/workflow/doExport", {...window.__data,exportExcel:1,customDisplayPage: {current: 1, size : total},dataUrl,taskid,fileName:'批量导出Excel',_total:total,_customPagesize:1000,_wczz:1})
                                .then(function (response) {
                                  const {status,data} = response;
                                  if(status == 200){
                                      if(!data.status){
                                        weappUi.Dialog.message({
                                            type: 'error',
                                            content: '导出数据失败！'
                                        });
                                        window.$devThis.setState({visible: false, exportBizIds: []});
                                      }else{
                                        let exportBizIds = [];
                                        exportBizIds.push(taskid);
                                        window.$devThis.setState({exportBizIds:exportBizIds});
                                      }
                                  }else{
                                    weappUi.Dialog.message({
                                        type: 'error',
                                        content: '导出数据失败！'
                                    });
                                    window.$devThis.setState({visible: false, exportBizIds: []});
                                  }
                                });  
                              }                            
                        });
                      
                  }
                  
                }
              }).catch(function (error) {
                console.log(error);
              }
          );

          
        }
    }
    return props;
}, 0);

//引入下载组件
regOvComponent('weappWorkflow', 'WfLListViewComp', (Com) => {
  return React.forwardRef((props, ref) => {
    if(__needDev()){
      return (
        <React.Suspense fallback={() => {}}>
          <CustomBatchExport 
            ref={ref} 
          />
          <Com {...props} />
        </React.Suspense>
      )
    }
    return <Com {...props} />
  });
}, 1);


//默认以自定义查询的方式 打开列表
axios.interceptors.request.use((config) => {
  if(__needDev()){
    try {
      let { url, data, params } = config;  

      const exportUrl = __getExportUrl();
      const {dataUrl,totalUrl} = exportUrl; 
      
      if(url.indexOf(dataUrl) > -1 || url.indexOf(totalUrl) > -1){  //请求数据接口的时候，拼接自定义查询参数

        const {exportExcel = 0} = data;
    
        if(exportExcel == 1){//导出excel        
          //
        }else{//普通查询        
          data.params.queryId = window.__queryId;                
          Object.assign(data, { queryId:window.__queryId,queryByConditionId:false,initSearch:false} || {});        
          window.__data = data;
        }
        return config;

    
      }
    } catch (e) {
      console.error('通用全局请求拦截异常 => ', e);
    }
  }
  return config;
});


/**
 * 是否需要使用本开发
 */
function __needDev(){
  var result = false; 
  var _locationUrl = location.href;
  urlSetting.map(_urlSetting => {
    if(_locationUrl.indexOf(_urlSetting.url) > -1){
      result = true;
    }
  })
 
  return result;
}


function __getExportUrl(){
  var result = {};
  var _locationUrl = location.href;
  
  var staticStr = '/workflow/list/';
  var _idx = _locationUrl.indexOf(staticStr);
  _locationUrl = _locationUrl.substring(_idx + staticStr.length);
  var _idx2 = _locationUrl.indexOf('?');
  var domain = _locationUrl.substring(0,_idx2);

  var _str =  domain.charAt(0).toUpperCase() + domain.slice(1);


  result.totalUrl = '/api/workflow/list/total/get' + _str + 'ListTotal';
  result.dataUrl = '/api/workflow/list/data/get' + _str + 'ListData';

  //console.log(result);

  return result;
}