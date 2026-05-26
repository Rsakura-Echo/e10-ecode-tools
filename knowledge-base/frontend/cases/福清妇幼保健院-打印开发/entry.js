import { regOvProps } from '@weapp/utils';

let isFirst = true;
const ovFlowPagePropsFn = (props) => {
  //debugger;
    const { pathname = '' } = location || {};

    if (pathname.indexOf('/printMainPage/workflow') > -1 || pathname.indexOf('/printMainPage/ebuildercard') > -1 || pathname.indexOf('/printMainPage/ebuilderform') > -1) {   
        
        //=========项目配置 Start==========
        //配置需要支持的流程，以及每页显示的明细行数，行高等信息
        // 左侧那串数字是workflowid，支持配置多流程
        let configParam = {
          "1053673353285763161":{pageSize:5,rowheight:50}, //pageSize：每页显示明细行数  rowheight：每行明细高度
          "1011515388717334531":{pageSize:13}, //pageSize：每页显示明细行数  rowheight：每行明细高度
		  "1053673353285763161":{pageSize:5,rowheight:50},
        };


        //eb配置
        // 左侧那串数字是appid，支持配置多流程
        let configParam_eb = {
          "1009213952117604353":{pageSize:5,rowheight:50}, //pageSize：每页显示明细行数  rowheight：每行明细高度
        };
        //=========项目配置 End==========

        let config = {};
        let needDev = false;
        let isWf = true;
        if(pathname.indexOf('/printMainPage/ebuilderform') > -1){ //eb打印
          const {appId = ''} = props;
          if(configParam_eb[appId]){
            needDev = true;
            config = configParam_eb[appId];
            isWf = false;
          }
        }else{ // 流程打印
          const wffpSdk = window.weappWorkflow.getFlowPageSDK();
          const {workflowId = ''} = wffpSdk.getBaseParam();
          if(configParam[workflowId]){
            needDev = true;
            config = configParam[workflowId];
          }
        }

        if(isFirst && needDev){
          //页面加载完成后，再执行
          window.ebuilderSDK?.getPageSDK()?.on('formReady',(args)=>{
              isFirst = false;
              var containerElement; //页面对象
debugger;
              if(isWf){
                containerElement = document.getElementsByClassName('wffp-print-page')[0];
              }else{
                containerElement = document.getElementsByClassName('weapp-ebdf-card-print')[0]
              }

              
              var pageSize = config.pageSize;
              var rowheight = config.rowheight;
              var trCount = containerElement.querySelector(".excelTableView-content table").querySelectorAll('tr .weapp-form-detail-table-row').length;
              //alert(trCount);
              var pageCount = parseInt(trCount/pageSize,10); 
              if(trCount % pageSize > 0)
                pageCount++;

              //插入每页框架
              var insertHtml = ''; 
              for (var i = 2; i <= pageCount; i++) {  
                  insertHtml += "<div style='height: 0px; break-after: page;'></div><div class='wffp-print-page' id='container" + i + "'>aaaaaaaaaa</div>";  
              }                 
              containerElement.insertAdjacentHTML('afterend', insertHtml);

              //给每页插入内容，并隐藏对应的明细行
              var ct = '';  
              for (var i = 1; i <= pageCount; i++) { 
                  var pageElement = containerElement;
                  if (i > 1) {  
                      ct = i.toString(); 
                      pageElement = document.getElementById('container' + ct);
                      // 获取第一个 #container 的样式并应用到其他 #container + ct 上  
                      var containerStyle = containerElement.getAttribute('style');  
                      if (pageElement) {  
                          pageElement.setAttribute('style', containerStyle);  
                          // 获取第一个 #container 的 HTML 并应用到其他 #container + ct 上  
                          pageElement.innerHTML = containerElement.innerHTML;  
                      }  
                  }

                  //右上角插入 页码
                  try{
                    pageElement.querySelector("td[name='pageInfo']").innerHTML = "第" + i + "/" + pageCount + "页";
                  }catch(e){}
                
                  //隐藏合计行
                  try{
                      if(i < pageCount)
                        pageElement.querySelector("tr .countTr").style.display = 'none'; // 隐藏行 ;
                      else
                        pageElement.querySelector("tr .countTr").style.display = ''; 
                  }catch(e){}

                  var _start = (i - 1) * pageSize;  
                  var _end = _start + pageSize;  
                  console.log(_start + "--" + _end + '--' + ct);  
                
                  var _index = 0;  
                  var table = pageElement.querySelector(".excelTableView-content table");  
                  if (table) {  
                      var rows = table.getElementsByTagName('tr');  
                      for (var j = 0; j < rows.length; j++) {  
                          var row = rows[j];  
                          if (row.classList.contains('weapp-form-detail-table-row')) {  
                              if (i === 1) {  
                                  // 设置行高和单元格内子元素的最大高度及溢出隐藏
                                  row.style.height = rowheight + 'px';  
                                  var cells = row.getElementsByTagName('td');  
                                  for (var k = 0; k < cells.length; k++) {  
                                      var cellChildren = cells[k].children;  
                                      for (var l = 0; l < cellChildren.length; l++) {  
                                          cellChildren[l].style.maxHeight = rowheight + 'px';  
                                          cellChildren[l].style.overflow = 'hidden';  
                                      }  
                                  }  
                              }  
                
                              if (_index >= _start && _index < _end) {  
                                  row.style.display = 'table-row'; // 显示行  
                              } else {  
                                  row.style.display = 'none'; // 隐藏行  
                              }  
                              _index++;  
                          }  
                      }  
                  }  
              }           
          });
        }
        
    }

  return props;
}

//流程打印
regOvProps('weappWorkflow', 'FPWeaForm', ovFlowPagePropsFn, 0);

//eb打印
regOvProps('weappEbdfpage', 'CardDetailPrint', ovFlowPagePropsFn, 0);