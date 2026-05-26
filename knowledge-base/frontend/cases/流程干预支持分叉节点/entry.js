import { regOvComponent,regOvProps } from '@weapp/utils';
import axios from 'axios';
import { asyncImport } from '@weapp/ecodesdk';
import InterveneStore from './store/InterveneStore';

const appendResponseData = {
  '/api/workflow/list/check/getMonitorListCheck': {
    'btn': {key:'interveneToNode',text:'并行节点干预',index: 3, visible: true, outer: false, onlyIcon: 0}
  }
}

let isBrcNode = false;

/**
 * 拦截请求
 */
axios.interceptors.request.use((request) => {
  try {  
    //console.log('wcq::request=',request);
    const {url =''} = request;
    if (url == '/api/workflow/list/check/getMonitorListCheck') { // 路径前缀匹配
      console.log("wcq:::request=",request);
      const requestid = request?.headers?.flowrequestid;
      axios.post('/api/secondev/workflow/devIntervenor/isBrcNode',{requestId:requestid}).then((result)=>{
        console.log("wcq::result=",result);
        isBrcNode = result?.data?.data?.isBrcNode;
        return request;       
      })      
    }else
      return request;
  } catch (e) {
    console.error('通用全局请求拦截异常 => ', e);
  }
  return request;
});


/**
 * 定义响应拦截
 * 可以给响应结果附加结果，也可以进行错误统一处理
 */
axios.interceptors.response.use((response) => {
  let { config,data } = response;
  let { url } = config;
  for (const k of Object.keys(appendResponseData)) {
    if (url.startsWith(k)) { // 路径前缀匹配
       console.log("wcq:::response",response);
      if (appendResponseData[k] && data.code == 200) {
        if(data['data']['operates'] && isBrcNode){
          
          data['data']['operates'].push(appendResponseData[k]['btn']);
          data['data']['operatesPermission']['0'].push({disabled:false,visible:true});

          config['data'] = data;
          response['config'] = config;
        }
      }
    }
  }
  return response;
}, function (error) {
  console.info('接口请求出错啦', error);
  return error;
});



regOvProps('weappUi','Menu',(props)=>{
  const {className,data=[]} = props;
  if(data.length>0){
    const {onItemClick } = props;
    //console.log(props);
    if(onItemClick){
        props.onItemClick = (id,item,e)=>{
        //console.log(id,item,e);
        // debugger;
            const {key} = item;
            if(key=="interveneToNode"){
                window.$interveneDialogThis.showDialog();
            }else{
                onItemClick(id,item,e);
            } 
        }
    }
  }
  return props;
},0)


const InterveneDialog = React.lazy(() => asyncImport('${appId}', 'InterveneDialog'));

regOvComponent('weappWorkflow', 'WfLListViewComp', (Com) => {  
  return React.forwardRef((props, ref) => {
    
    if(props.dimension == 'monitor'){
      //interveneStore = new InterveneStore();
      return (
        <React.Suspense fallback={() => {}}>
            <div>
              <Com ref={ref} {...props} />;
              <InterveneDialog  />
            </div>
        </React.Suspense>
      )
    
    }else{
      return <Com ref={ref} {...props} />;
    }      
    
  });
}, 1);
